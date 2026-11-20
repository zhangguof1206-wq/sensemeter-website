import assert from "node:assert/strict";
import test from "node:test";
import { existsSync } from "node:fs";

const url = new URL("./retired-release-plan.mjs", import.meta.url);
const module = existsSync(url) ? await import(url) : {};
const makePlan = (...args) => {
  assert.equal(typeof module.createCleanupPlan, "function", "Missing guarded release cleanup planner");
  return module.createCleanupPlan(...args);
};
const root = "/var/www/";
const retired = ["20260820", "20260821-5e2344b", "20260901-e0a7979", "20260918-094748-8268420", "20260920-061938-8121976", "20260928-091404-f3542ea", "20260928-102909-317c669", "20260929-055145-bbfeab7", "20261009-075046-57ba273", "20261021-015104-dd64c71"].map(name => root + "sensemeter-website-release-" + name);
const current = root + "sensemeter-website-release-20261102-085730-a4c5644";
const rollback = root + "sensemeter-website-release-20261029-063710-9dc71ab";
const repo = root + "sensemeter-website-new";

function evidence() {
  return {
    repository: { path: repo, realPath: repo, origin: "https://github.com/zhangguof1206-wq/sensemeter-website.git" },
    current: { path: current, realPath: current, revision: "a4c5644b280f15ea5cf54e32c6478dc90e44f624", built: true },
    rollback: { path: rollback, realPath: rollback, revision: "9dc71ab5baf211a859b8af8b7981c2d3d401d5f9", built: true },
    configExists: true,
    apps: [{ name: "sensemeter-website", status: "online", cwd: current, script: "/usr/bin/npm" }],
    savedApps: [{ name: "sensemeter-website", cwd: current, script: "/usr/bin/npm" }],
    directories: retired.map((path, i) => ({ path, realPath: path, directory: true, symlink: false, packageName: "sensemeter-ru-website", dirty: false, gitRoot: path, registered: i > 6, sizeKiB: 700000 })),
    references: [], mounts: ["/", "/proc"],
    cacheSafe: true, cacheKiB: 500000
  };
}

test("only the ten explicitly retired releases are selected; running, rollback and source paths stay", () => {
  const e = evidence(), before = JSON.stringify(e);
  const plan = makePlan(e);
  assert.deepEqual(plan.releases.map(x => x.path), retired);
  assert.deepEqual(plan.keep, [repo, current, rollback]);
  assert.equal(plan.estimatedKiB, 7500000);
  assert.equal(JSON.stringify(e), before);
  assert.ok(plan.releases.every(x => !plan.keep.includes(x.path)));
  assert.equal(plan.releases.filter(x => x.registered).length, 3);
});

test("missing retired directories are skipped without inventing replacement targets", () => {
  const e = evidence(); e.directories.pop();
  assert.equal(makePlan(e).releases.length, 9);
});

for (const [name, mutate] of [
  ["changed running version", e => {e.current.revision = "unknown";}],
  ["changed rollback version", e => {e.rollback.revision = "unknown";}],
  ["missing current build", e => {e.current.built = false;}],
  ["missing private config", e => {e.configExists = false;}],
  ["source repository symlink", e => {e.repository.realPath = "/other";}],
  ["wrong source origin", e => {e.repository.origin = "https://example.com/other.git";}],
  ["unexpected active cwd", e => {e.apps[0].cwd = rollback;}],
  ["website offline", e => {e.apps[0].status = "stopped";}],
  ["duplicate website processes", e => {e.apps.push({...e.apps[0]});}],
  ["saved restart cwd differs", e => {e.savedApps[0].cwd = retired[0];}],
  ["dirty retired repository", e => {e.directories[0].dirty = true;}],
  ["unknown project directory", e => {e.directories[0].packageName = "other";}],
  ["retired symlink", e => {e.directories[0].symlink = true;}],
  ["retired real path outside allowlist", e => {e.directories[0].realPath = "/etc";}],
  ["non-directory target", e => {e.directories[0].directory = false;}],
  ["unexpected nested repository root", e => {e.directories[0].gitRoot = repo;}],
  ["unknown deletion target", e => {e.directories.push({...e.directories[0], path: "/root/sensemeter-config"});}],
  ["nested mounted filesystem", e => {e.mounts.push(retired[0]+"/uploads");}],
  ["candidate itself mounted", e => {e.mounts.push(retired[0]);}],
  ["active process reference", e => {e.references.push({path: retired[0]+"/node_modules", source: "process"});}],
  ["nginx reference", e => {e.references.push({path: retired[0], source: "nginx"});}],
  ["other PM2 app reference", e => {e.apps.push({name:"other",cwd:retired[0],script:"/usr/bin/node"});}],
  ["saved other-app script reference", e => {e.savedApps.push({name:"other",cwd:"/root",script:retired[0]+"/server.js"});}],
  ["unsafe npm cache path", e => {e.cacheSafe = false;}]
]) test(`cleanup refuses ${name}`, () => {
  const e = evidence(); mutate(e);
  assert.throws(() => makePlan(e), /CLEANUP_REFUSED/);
});

test("prefix lookalikes do not count as a directory descendant", () => {
  const e = evidence();
  e.references.push({path: retired[0]+"-other",source:"process"});
  assert.equal(makePlan(e).releases.length, 10);
});

test("apply runner defaults to check mode, never performs unapproved actions", async () => {
  assert.equal(typeof module.runCleanup, "function");
  const calls = [];
  await module.runCleanup({ collect: () => evidence(), remove: (...args)=>calls.push(args), cleanCache:()=>calls.push("cache"), report:()=>{}, health:()=>calls.push("health") });
  assert.deepEqual(calls, []);
});

test("apply runner refreshes evidence before each deletion and stops on drift", async () => {
  assert.equal(typeof module.runCleanup, "function");
  let scans = 0; const removed = [];
  await assert.rejects(() => module.runCleanup({
    apply:true,
    collect:()=>{const e=evidence();if(++scans===3)e.references.push({path:retired[1],source:"process"});return e;},
    remove: item=>removed.push(item.path), cleanCache:()=>assert.fail("Cache cleanup after drift"), report:()=>{}, health:()=>{}
  }));
  assert.deepEqual(removed,[retired[0]]);
});

test("apply keeps archives and worktrees distinct, cleans cache last and verifies health", async () => {
  assert.equal(typeof module.runCleanup, "function");
  const calls=[];
  await module.runCleanup({apply:true,collect:()=>evidence(),remove:item=>calls.push(item.registered?"git":"archive"),cleanCache:()=>calls.push("cache"),health:()=>calls.push("health"),report:()=>{}});
  assert.deepEqual(calls,["health",...retired.map((_,i)=>i>6?"git":"archive"),"cache","health"]);
});

test("command mode is read-only by default and rejects unknown or duplicate flags", async () => {
  const cliUrl = new URL("./cleanup-retired-releases.mjs", import.meta.url);
  const cli = existsSync(cliUrl) ? await import(cliUrl) : {};
  assert.equal(typeof cli.parseMode, "function", "Missing safe cleanup entry point");
  assert.equal(cli.parseMode([]), false);
  assert.equal(cli.parseMode(["--apply"]), true);
  for (const args of [["--force"], ["/var/www"], ["--apply", "--apply"], ["--apply", "--force"]]) assert.throws(() => cli.parseMode(args));
});

test("cache and archive identity checks reject dangling symlinks rather than treating them as missing", async () => {
  const cli = await import("./cleanup-retired-releases.mjs");
  assert.equal(typeof cli.isOrdinaryDirectory, "function");
  const inspect = {
    lstat:()=>({isDirectory:()=>false,isSymbolicLink:()=>true}),
    realpath:()=>assert.fail("Do not resolve a symlink as a cleanup root")
  };
  assert.equal(cli.isOrdinaryDirectory("/example", inspect), false);
  assert.equal(cli.isOrdinaryDirectory("/example", {lstat:()=>{throw Object.assign(new Error(),{code:"ENOENT"});}}), true);
  assert.throws(()=>cli.isOrdinaryDirectory("/example", {lstat:()=>{throw Object.assign(new Error(),{code:"EACCES"});}}));
});

test("malformed private process JSON never leaks environment contents into the error", async () => {
  const cli = await import("./cleanup-retired-releases.mjs");
  assert.equal(typeof cli.parsePrivateJson,"function");
  assert.throws(()=>cli.parsePrivateJson('{"token":"PRIVATE_VALUE",','saved PM2'),error=>error.message === "CHECK_FAILED: invalid JSON in saved PM2" && !error.message.includes("PRIVATE_VALUE"));
  assert.deepEqual(cli.parsePrivateJson('[{"name":"website"}]','PM2'),[{name:"website"}]);
});

test("only the exact untracked environment entry may proceed with verified private backup", () => {
  const e=evidence();
  Object.assign(e.directories[0],{dirty:true,gitStatus:"?? .env.production.local\0",environment:{exists:true,safe:true}});
  const item=makePlan(e).releases[0];
  assert.equal(item.untrackedEnvironment,true);
  for(const status of [" M .env.production.local\0","?? .env.production.local\0?? notes.txt\0"," M src/page.tsx\0"]) {
    e.directories[0].gitStatus=status;
    assert.throws(()=>makePlan(e),/CLEANUP_REFUSED/);
  }
  e.directories[0].gitStatus="?? .env.production.local\0";
  e.directories[0].environment.safe=false;
  assert.throws(()=>makePlan(e),/CLEANUP_REFUSED/);
});

const previewUrl=new URL("./retired-preview-processes.mjs",import.meta.url);
const preview=existsSync(previewUrl)?await import(previewUrl):{};
const expectedPreviews=[
  [509725,retired[0],3100],[515150,retired[1],3101],[584722,retired[2],3102],
  [792307,retired[3],3103],[881579,retired[5],3199],[882673,retired[6],3201]
];
function previewEvidence() {
  const e=evidence();e.apps[0].pid=1222792;e.nginxPorts=[3000];
  e.previewProcesses=expectedPreviews.map(([pid,cwd,port])=>({pid,cwd,ports:[port],ppid:1,exe:"/usr/bin/node",name:"next-server (v15)",startTicks:String(pid*100),exclusive:true,unixListener:false}));
  e.references=expectedPreviews.map(([pid,path])=>({path,source:`process ${pid}`}));
  return e;
}
const previewPlan=e=>{
  assert.equal(typeof preview.prepareRetiredCleanup,"function","Missing verified preview-stop policy");
  return preview.prepareRetiredCleanup(e);
};

test("preflight selects exactly the six observed orphan previews without weakening deletion guards", () => {
  const e=previewEvidence();
  const plan=previewPlan(e);
  assert.deepEqual(plan.previews.map(p=>[p.pid,p.cwd,p.ports[0]]),expectedPreviews);
  assert.equal(plan.cleanup.releases.length,10);
  assert.throws(()=>makePlan(e),/CLEANUP_REFUSED/);
});
for(const [name,mutate] of [
  ["changed cwd",e=>{e.previewProcesses[0].cwd=current;}],
  ["non-orphan parent",e=>{e.previewProcesses[0].ppid=20;}],
  ["unknown executable",e=>{e.previewProcesses[0].exe="/bin/bash";}],
  ["non-Next process",e=>{e.previewProcesses[0].name="PM2 daemon";}],
  ["wrong or extra port",e=>{e.previewProcesses[0].ports.push(3000);}],
  ["shared listening socket",e=>{e.previewProcesses[0].exclusive=false;}],
  ["unix listening socket",e=>{e.previewProcesses[0].unixListener=true;}],
  ["Nginx backend reference",e=>{e.nginxPorts.push(3100);}],
  ["PM2 managed PID",e=>{e.apps[0].pid=509725;}],
  ["unknown process reference",e=>{e.references.push({path:retired[0],source:"process 999"});}],
  ["symlink reference",e=>{e.references.push({path:retired[0],source:"/var/www symlink"});}],
  ["unknown PID",e=>{e.previewProcesses[0].pid=999;}]
])test(`preview preflight refuses ${name}`,()=>{
  const e=previewEvidence();mutate(e);
  assert.throws(()=>previewPlan(e),/CLEANUP_REFUSED|PREVIEW_REFUSED/);
});

test("preview check mode sends no signals",async()=>{
  assert.equal(typeof preview.stopRetiredPreviews,"function");
  const calls=[];
  await preview.stopRetiredPreviews({collect:()=>previewEvidence(),health:()=>calls.push("health"),sendTerm:()=>calls.push("TERM"),waitForExit:()=>{},report:()=>{}});
  assert.deepEqual(calls,[]);
});
test("PID reuse is refused immediately before a signal",async()=>{
  assert.equal(typeof preview.stopRetiredPreviews,"function");
  let scans=0,signals=0;
  await assert.rejects(()=>preview.stopRetiredPreviews({apply:true,collect:()=>{const e=previewEvidence();if(++scans>1)e.previewProcesses[0].startTicks="999999999";return e;},health:()=>{},sendTerm:()=>signals++,waitForExit:()=>{},report:()=>{}}));
  assert.equal(signals,0);
});
test("all previews must exit gracefully; no later signal follows an exit failure",async()=>{
  assert.equal(typeof preview.stopRetiredPreviews,"function");
  const signals=[];
  await assert.rejects(()=>preview.stopRetiredPreviews({apply:true,collect:()=>previewEvidence(),health:()=>{},sendTerm:p=>signals.push(p.pid),waitForExit:()=>{throw Error("not exited");},report:()=>{}}));
  assert.deepEqual(signals,[509725]);
});

test("successful preview cleanup sends only six verified TERM callbacks and waits for each",async()=>{
  assert.equal(typeof preview.stopRetiredPreviews,"function");
  const exited=new Set(),events=[];
  const collect=()=>{const e=previewEvidence();e.previewProcesses=e.previewProcesses.filter(p=>!exited.has(p.pid));e.references=e.references.filter(r=>!exited.has(Number(r.source.split(" ")[1])));return e;};
  await preview.stopRetiredPreviews({apply:true,collect,health:()=>events.push("health"),sendTerm:p=>events.push("TERM "+p.pid),waitForExit:p=>{events.push("EXIT "+p.pid);exited.add(p.pid);},report:()=>{}});
  assert.deepEqual(events,["health",...expectedPreviews.flatMap(([pid])=>["TERM "+pid,"EXIT "+pid]),"health"]);
});
test("unhealthy production entry prevents any preview termination",async()=>{
  assert.equal(typeof preview.stopRetiredPreviews,"function");
  await assert.rejects(()=>preview.stopRetiredPreviews({apply:true,collect:()=>previewEvidence(),health:()=>{throw Error("unhealthy");},sendTerm:()=>assert.fail("No process may be stopped"),waitForExit:()=>{},report:()=>{}}));
});

test("listener parsing handles whitespace and IPv6 without attributing the production socket to a preview",()=>{
  assert.equal(typeof preview.inspectListeners,"function");
  const tcp=[
    '  LISTEN 0 511 [::]:3100 [::]:* users:(("next-server",pid=509725,fd=21))',
    'LISTEN 0 511 *:3000 *:* users:(("next-server",pid=1222792,fd=21))'
  ];
  assert.deepEqual(preview.inspectListeners(509725,tcp,[]),{ports:[3100],exclusive:true,unixListener:false});
  const shared=['LISTEN 0 511 *:3100 *:* users:(("next-server",pid=509725,fd=21),("other",pid=20,fd=21))'];
  assert.equal(preview.inspectListeners(509725,shared,[]).exclusive,false);
  assert.equal(preview.inspectListeners(509725,tcp,['u_str LISTEN /tmp/example users:(("next-server",pid=509725,fd=2))']).unixListener,true);
});
