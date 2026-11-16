export const SOURCE = "/var/www/sensemeter-website-new";
export const CURRENT = "/var/www/sensemeter-website-release-20261102-085730-a4c5644";
export const ROLLBACK = "/var/www/sensemeter-website-release-20261029-063710-9dc71ab";
export const PRIVATE_CONFIG = "/root/sensemeter-config/website.env";
export const NPM_CACHE = "/root/.npm";
export const RETIRED = Object.freeze([
  "20260820", "20260821-5e2344b", "20260901-e0a7979",
  "20260918-094748-8268420", "20260920-061938-8121976",
  "20260928-091404-f3542ea", "20260928-102909-317c669",
  "20260929-055145-bbfeab7", "20261009-075046-57ba273",
  "20261021-015104-dd64c71"
].map(name => `/var/www/sensemeter-website-release-${name}`));

export const within = (path, directory) => typeof path === "string" && (path === directory || path.startsWith(directory + "/"));
const requireSafe = (condition, reason) => { if (!condition) throw new Error(`CLEANUP_REFUSED: ${reason}`); };

export function createCleanupPlan(evidence) {
  const e = evidence;
  requireSafe(e.repository.path === SOURCE && e.repository.realPath === SOURCE, "source repository path changed");
  requireSafe(e.repository.origin === "https://github.com/zhangguof1206-wq/sensemeter-website.git", "unexpected source repository");
  for (const [info, path, revision] of [
    [e.current, CURRENT, "a4c5644b280f15ea5cf54e32c6478dc90e44f624"],
    [e.rollback, ROLLBACK, "9dc71ab5baf211a859b8af8b7981c2d3d401d5f9"]
  ]) requireSafe(info.path === path && info.realPath === path && info.revision === revision && info.built, `retained version changed: ${path}`);
  requireSafe(e.configExists, "private configuration missing");
  const app = e.apps.filter(app => app.name === "sensemeter-website");
  const saved = e.savedApps.filter(app => app.name === "sensemeter-website");
  requireSafe(app.length === 1 && app[0].status === "online" && app[0].cwd === CURRENT, "running website changed");
  requireSafe(saved.length === 1 && saved[0].cwd === CURRENT, "saved startup configuration differs");
  requireSafe(e.cacheSafe, "npm cache location is not the expected ordinary directory");
  requireSafe(new Set(e.directories.map(item => item.path)).size === e.directories.length, "duplicate cleanup target");
  const references = [...e.references, ...e.apps.flatMap(app => [{path:app.cwd,source:"PM2"},{path:app.script,source:"PM2"}]), ...e.savedApps.flatMap(app => [{path:app.cwd,source:"PM2 startup"},{path:app.script,source:"PM2 startup"}])];
  for (const item of e.directories) {
    requireSafe(RETIRED.includes(item.path), `unknown cleanup target: ${item.path}`);
    requireSafe(item.directory && !item.symlink && item.realPath === item.path, `unsafe directory: ${item.path}`);
    requireSafe(item.packageName === "sensemeter-ru-website", `unknown project: ${item.path}`);
    requireSafe(!item.dirty && (!item.gitRoot || item.gitRoot === item.path), `repository has local changes or unexpected root: ${item.path}`);
    requireSafe(!e.mounts.some(path => within(path, item.path)), `mounted filesystem: ${item.path}`);
    requireSafe(!references.some(ref => within(ref.path, item.path)), `directory still referenced: ${item.path}`);
  }
  return {
    keep: [SOURCE, CURRENT, ROLLBACK],
    releases: e.directories.map(item => ({path:item.path,registered:item.registered,sizeKiB:item.sizeKiB})),
    estimatedKiB: e.cacheKiB + e.directories.reduce((sum,item) => sum + item.sizeKiB, 0)
  };
}

export async function runCleanup({apply = false, collect, remove, cleanCache, health, report}) {
  const plan = createCleanupPlan(await collect());
  report({event:"plan",plan});
  if (!apply) return plan;
  await health();
  let removed = 0;
  // Recheck live references and path identity immediately before every destructive action.
  for (const item of plan.releases) {
    const fresh = createCleanupPlan(await collect({measure:false}));
    const target = fresh.releases.find(target => target.path === item.path);
    if (!target) continue;
    await remove(target);
    removed++;
    report({event:"removed",path:target.path});
  }
  createCleanupPlan(await collect({measure:false}));
  await cleanCache();
  createCleanupPlan(await collect({measure:false}));
  await health();
  report({event:"complete",removed});
  return plan;
}
