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
