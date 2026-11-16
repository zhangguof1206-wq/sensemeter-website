# Retired Release Cleanup Plan

**Goal:** Reclaim the ten obsolete releases identified in the user's server inventory while retaining the running a4c5644 release, the preceding 9dc71ab rollback and the source repository. The inventory estimates approximately 7 GiB in retired releases and 0.5 GiB in npm cache.

**Architecture:** A standalone, dependency-free Ubuntu cleanup command collects live evidence and passes it to a pure allowlist-based planner. Default operation is read-only. Explicit apply mode repeats all checks before each removal, uses Git for registered worktrees, and refuses active references, dirty repositories, symlinks, nested mounts, unexpected project markers or changed running/rollback versions. No wildcard deletion, configuration/password output or wholesale log deletion.

**Files:** `scripts/ops/retired-release-plan.mjs` defines the fixed scope and safety policy; `scripts/ops/cleanup-retired-releases.mjs` collects server evidence and runs check/apply; `scripts/ops/cleanup-retired-releases.test.mjs` exercises the guards without touching real release directories.

## Steps

- [x] Add failing tests for the exact ten-directory allowlist, retained paths, active/saved PM2 and Nginx/process references, dirty/unknown directories, mounts, symlinks and explicit apply mode.
- [x] Implement the planner and Ubuntu-only collector with fail-closed error reporting. Do not print captured PM2 environments or Nginx configuration.
- [x] Revalidate immediately before each removal; stop on errors. Remove registered worktrees without force and remove only verified standalone archives. Clear npm cache through npm, never by deleting /root/.npm wholesale.
- [x] Run safety tests and existing website regressions; inspect the scoped diff. The combined suite passed all 154 tests and all eight existing static checks passed; no website runtime file changed.
- [x] Commit in Chinese and push the initial helper (`4290bb8`) without changing the fixed frontend release candidate ad66f19.
- [x] Give the user a pinned default-check helper extraction command. Its real server run refused a referenced directory; no files were deleted.

## Boundaries

- Keep `/var/www/sensemeter-website-new`, `/var/www/sensemeter-website-release-20261102-085730-a4c5644`, `/var/www/sensemeter-website-release-20261029-063710-9dc71ab` and `/root/sensemeter-config`.
- Do not remove `/var/log` or the 16 KiB apt archive directory. Old root-only historical recovery metadata is small and is not a deletion target; recovery into removed releases will no longer be possible.
- Direct SSH authentication is unavailable; the user executes the checked helper manually. No password request or browser-permission workaround.

## Verification

- Observed expected red tests before the planner and command entry existed, and before adding the dangling-symlink identity guard.
- All 33 cleanup safety tests passed; both command modules passed Node syntax checking. Invalid private JSON is reported without echoing its contents.
- The initial helper was executed in check mode on Ubuntu and refused the referenced 20260820 directory. No remote file has been removed and no process has been stopped.

## Evidence-Led Follow-Up

The user's process/file diagnostic confirms six orphan `next-server` processes (PPID 1), all outside the current PM2 process tree: 509725/3100, 515150/3101, 584722/3102, 792307/3103, 881579/3199 and 882673/3201. Nginx backend ports contain only 3000; the current PM2 process is 1222792 at the retained a4c5644 release. The nine dirty retired repositories show only `?? .env.production.local`; current and rollback directories also contain that untracked config, but remain protected and untouched.

- [x] Add failing tests for exact process identity/port/parent checks, PID reuse, PM2/Nginx protections, no SIGKILL and fresh checks before each SIGTERM.
- [x] Extend check/apply with a preflight for these six exact previews only. Unknown process references must still refuse deletion. Check website health first; stop previews gracefully and confirm they exit before any release removal.
- [x] Permit only the exact untracked config status after verifying an ordinary small file or a symlink to the existing private config. Back up configs to a new root-only directory, verify bytes, and detach only the backed-up untracked entry before normal Git worktree removal. All other local changes remain blockers; never use force removal.
- [x] Run combined cleanup and website tests, syntax/static checks, and inspect the scoped diff. The combined suite passes 180/180 tests; eight static checks and four module syntax checks pass. Git integration confirms an untracked config can be backed up before ordinary worktree removal.
- [x] Keep the safety update confined to operations scripts and this plan; website runtime files remain unchanged. Commit and push as the final handoff step.
- [x] Supply the pinned explicit-apply command with its destructive scope explained. The user's server screenshots show six orphan previews stopped and all ten allowlisted old releases removed. The helper's final health fetch failed, so `CLEANUP_OK` was not printed; a subsequent server check confirmed PM2 online, local/public `/contact` HTTP 200 and 11 GiB free disk. The separate website release was then deployed successfully, with its own production checks recorded in the product/accessory release plan.
