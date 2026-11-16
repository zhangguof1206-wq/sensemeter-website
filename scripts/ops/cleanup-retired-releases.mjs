import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { CURRENT, NPM_CACHE, PRIVATE_CONFIG, RETIRED, ROLLBACK, SOURCE, runCleanup } from "./retired-release-plan.mjs";

export function parseMode(args) {
  if (!args.length) return false;
  if (args.length === 1 && args[0] === "--apply") return true;
  throw new Error("USAGE: node cleanup-retired-releases.mjs [--apply]");
}

function command(file, args, timeout = 15000) {
  try { return execFileSync(file, args, {encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout,maxBuffer:16*1024*1024}).trim(); }
  catch { throw new Error(`CHECK_FAILED: ${file} command; no captured private output displayed`); }
}

export function parsePrivateJson(text, label) {
  try {return JSON.parse(text);} catch {throw new Error(`CHECK_FAILED: invalid JSON in ${label}`);}
}
const json = path => parsePrivateJson(readFileSync(path, "utf8"), path);
const sizeKiB = path => existsSync(path) ? Number(command("du", ["-sk", "--", path], 60000).split(/\s+/)[0]) : 0;
export function isOrdinaryDirectory(path, inspect = {lstat:lstatSync,realpath:realpathSync}) {
  let stat;
  try {stat=inspect.lstat(path);} catch(error) {if(error.code === "ENOENT") return true;throw error;}
  return stat.isDirectory() && !stat.isSymbolicLink() && inspect.realpath(path) === path;
}
const git = (path, ...args) => command("git", ["-C",path,...args]);
const kept = path => ({path,realPath:realpathSync(path),revision:git(path,"rev-parse","HEAD"),built:existsSync(path+"/.next/BUILD_ID") && statSync(path+"/.next/BUILD_ID").size > 0});
const normalizeApp = app => {
  const e=app.pm2_env ?? app;
  return {name:app.name ?? e.name,cwd:e.pm_cwd,script:e.pm_exec_path,status:e.status,args:e.args};
};

function processReferences() {
  const references=[];
  for (const pid of readdirSync("/proc").filter(name=>/^\d+$/.test(name))) {
    for (const field of ["cwd","exe","cmdline"]) {
      try {
        const value=field === "cmdline" ? readFileSync(`/proc/${pid}/${field}`,"utf8") : realpathSync(`/proc/${pid}/${field}`);
        for (const path of RETIRED) if (field === "cmdline" ? value.split("\0").some(arg=>arg.includes(path)) : value === path || value.startsWith(path+"/")) references.push({path,source:`process ${pid}`});
      } catch(error) {
        if (!["ENOENT","ESRCH"].includes(error.code)) throw new Error(`CHECK_FAILED: process visibility ${pid}/${field}`);
      }
    }
  }
  return references;
}

export function collectEvidence({measure = true} = {}) {
  if (process.platform !== "linux" || process.getuid?.() !== 0) throw new Error("CHECK_FAILED: run only as root on the Ubuntu server");
  const worktrees=new Set(git(SOURCE,"worktree","list","--porcelain","-z").split("\0").filter(field=>field.startsWith("worktree ")).map(field=>field.slice(9)));
  if (!worktrees.has(SOURCE)) throw new Error("CHECK_FAILED: source worktree registry");
  const apps=parsePrivateJson(command("pm2",["jlist"]),"live PM2 list").map(normalizeApp);
  const savedPath=(process.env.PM2_HOME || "/root/.pm2")+"/dump.pm2";
  if (!existsSync(savedPath)) throw new Error("CHECK_FAILED: saved PM2 startup configuration missing");
  const savedApps=json(savedPath).map(normalizeApp);
  const nginx=command("nginx",["-T"]);
  const references=processReferences();
  for (const path of RETIRED) {
    if (nginx.includes(path)) references.push({path,source:"nginx configuration"});
    for (const app of [...apps,...savedApps]) if (JSON.stringify(app.args ?? []).includes(path)) references.push({path,source:"PM2 arguments"});
  }
  for (const entry of readdirSync("/var/www", {withFileTypes:true})) {
    if (!entry.isSymbolicLink()) continue;
    const path="/var/www/"+entry.name;
    if (existsSync(path)) references.push({path:realpathSync(path),source:"/var/www symlink"});
  }
  const directories=[];
  for (const path of RETIRED) {
    let stat;
    try {stat=lstatSync(path);} catch(error) {if(error.code === "ENOENT") continue;throw error;}
    if (!stat.isDirectory() || stat.isSymbolicLink() || realpathSync(path) !== path) throw new Error(`CLEANUP_REFUSED: unsafe directory: ${path}`);
    const hasGit=existsSync(path+"/.git");
    if (hasGit && lstatSync(path+"/.git").isFile() && !worktrees.has(path)) throw new Error(`CLEANUP_REFUSED: unregistered worktree: ${path}`);
    directories.push({
      path,realPath:realpathSync(path),directory:true,symlink:false,
      packageName:json(path+"/package.json").name,
      gitRoot:hasGit ? git(path,"rev-parse","--show-toplevel") : null,
      dirty:hasGit ? Boolean(git(path,"status","--porcelain","--untracked-files=normal")) : false,
      registered:worktrees.has(path),sizeKiB:measure ? sizeKiB(path) : 0
    });
  }
  const mounts=readFileSync("/proc/self/mountinfo","utf8").trim().split("\n").map(line=>line.split(" ")[4].replace(/\\([0-7]{3})/g,(_,octal)=>String.fromCharCode(parseInt(octal,8))));
  return {
    repository:{path:SOURCE,realPath:realpathSync(SOURCE),origin:git(SOURCE,"remote","get-url","origin")},
    current:kept(CURRENT),rollback:kept(ROLLBACK),apps,savedApps,references,mounts,directories,
    configExists:existsSync(PRIVATE_CONFIG) && statSync(PRIVATE_CONFIG).isFile() && statSync(PRIVATE_CONFIG).size>0 && realpathSync(CURRENT+"/.env.production.local") === PRIVATE_CONFIG,
    cacheSafe:isOrdinaryDirectory(NPM_CACHE) && isOrdinaryDirectory(NPM_CACHE+"/_cacache"),
    cacheKiB:measure ? sizeKiB(NPM_CACHE) : 0
  };
}

function removeRelease(item) {
  if (!RETIRED.includes(item.path) || !isOrdinaryDirectory(item.path)) throw new Error("CLEANUP_REFUSED: removal target changed");
  if (item.registered) git(SOURCE,"worktree","remove",item.path);
  else rmSync(item.path,{recursive:true,force:false});
  if (existsSync(item.path)) throw new Error(`CLEANUP_FAILED: directory remains: ${item.path}`);
}

async function health() {
  const response=await fetch("http://127.0.0.1:3000/contact",{redirect:"error",signal:AbortSignal.timeout(10000)});
  if (response.status !== 200) throw new Error("CHECK_FAILED: existing website is not returning HTTP 200");
  await response.arrayBuffer();
}

function report(result) {
  if (result.event === "plan") {
    for (const path of result.plan.keep) console.log("KEEP "+path);
    for (const item of result.plan.releases) console.log(`RETIRED ${item.path} (${item.registered ? "worktree" : "archive"}, ${(item.sizeKiB/1024).toFixed(0)} MiB)`);
    console.log(`ESTIMATED_RELEASE_AND_CACHE_GIB=${(result.plan.estimatedKiB/1024/1024).toFixed(2)}`);
  } else if (result.event === "removed") console.log("REMOVED "+result.path);
  else console.log(`CLEANUP_OK: ${result.removed} retired directories; npm cache cleared; current website HTTP 200; no restart`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const apply=parseMode(process.argv.slice(2));
    await runCleanup({apply,collect:collectEvidence,remove:removeRelease,cleanCache:()=>command("npm",["cache","clean","--force","--cache",NPM_CACHE],120000),health,report});
    if (!apply) console.log("CHECK_ONLY_OK / NO_FILES_DELETED\nApply only after reviewing the listed retired directories: node "+process.argv[1]+" --apply");
  } catch(error) {console.error(error.message);process.exitCode=1;}
}
