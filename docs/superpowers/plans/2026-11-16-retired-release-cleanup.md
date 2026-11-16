# Retired Release Cleanup Plan

**Goal:** Reclaim the ten obsolete releases identified in the user's server inventory while retaining the running a4c5644 release, the preceding 9dc71ab rollback and the source repository. The inventory estimates approximately 7 GiB in retired releases and 0.5 GiB in npm cache.

**Architecture:** A standalone, dependency-free Ubuntu cleanup command collects live evidence and passes it to a pure allowlist-based planner. Default operation is read-only. Explicit apply mode repeats all checks before each removal, uses Git for registered worktrees, and refuses active references, dirty repositories, symlinks, nested mounts, unexpected project markers or changed running/rollback versions. No wildcard deletion, configuration/password output or wholesale log deletion.

**Files:** `scripts/ops/retired-release-plan.mjs` defines the fixed scope and safety policy; `scripts/ops/cleanup-retired-releases.mjs` collects server evidence and runs check/apply; `scripts/ops/cleanup-retired-releases.test.mjs` exercises the guards without touching real release directories.

## Steps

- [x] Add failing tests for the exact ten-directory allowlist, retained paths, active/saved PM2 and Nginx/process references, dirty/unknown directories, mounts, symlinks and explicit apply mode.
- [x] Implement the planner and Ubuntu-only collector with fail-closed error reporting. Do not print captured PM2 environments or Nginx configuration.
- [x] Revalidate immediately before each removal; stop on errors. Remove registered worktrees without force and remove only verified standalone archives. Clear npm cache through npm, never by deleting /root/.npm wholesale.
- [x] Run safety tests and existing website regressions; inspect the scoped diff. The combined suite passed all 154 tests and all eight existing static checks passed; no website runtime file changed.
- [ ] Commit in Chinese and push the helper without changing the fixed frontend release candidate ad66f19.
- [ ] Give the user a pinned helper extraction command for the existing Ubuntu session. Report cleanup success/free space only after actual execution evidence; no remote cleanup has happened during helper development.

## Boundaries

- Keep `/var/www/sensemeter-website-new`, `/var/www/sensemeter-website-release-20261102-085730-a4c5644`, `/var/www/sensemeter-website-release-20261029-063710-9dc71ab` and `/root/sensemeter-config`.
- Do not remove `/var/log` or the 16 KiB apt archive directory. Old root-only historical recovery metadata is small and is not a deletion target; recovery into removed releases will no longer be possible.
- Direct SSH authentication is unavailable; the user executes the checked helper manually. No password request or browser-permission workaround.

## Verification

- Observed expected red tests before the planner and command entry existed, and before adding the dangling-symlink identity guard.
- All 33 cleanup safety tests passed; both command modules passed Node syntax checking. Invalid private JSON is reported without echoing its contents.
- The helper has not been executed on Ubuntu and no remote file has been removed. Its default output ends with `CHECK_ONLY_OK / NO_FILES_DELETED`; only explicit `--apply` removes verified targets and clears cache.
