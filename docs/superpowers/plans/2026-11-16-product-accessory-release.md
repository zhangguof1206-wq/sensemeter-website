# Product And Accessory Release Plan

The user approved updating the live website on 2026-11-16 after reopening the local preview. Release the reviewed product-detail, accessory, homepage-accessory and footer-contact changes as one batch. Do not modify unrelated files, technical catalog values, SEO URLs, analytics settings or mail credentials.

## Candidate And Boundaries

- Business candidate: `409da2a90af99afd391a838427c9ca0dcaec0e47`.
- Freshly fetched base: `a4c5644b280f15ea5cf54e32c6478dc90e44f624` (`origin/main`). No intervening main changes were found.
- Untracked `tmp/` is unrelated and must remain unstaged.
- Existing two retained accessory photographs stay unchanged. No rejected image-generation request is retried.
- The saved local-browser permission still prevents actual desktop/mobile screenshot review. The user's release request authorizes continuing the release; do not claim that this missing visual review was completed. Existing GitHub browser regression remains part of the release gate.
- Direct noninteractive SSH authentication failed. The user must run staged Ubuntu commands; do not request passwords or print private environment values.

## Steps

- [x] Refresh repository state and run all 121 regression tests, eight static checks and TypeScript checking.
- [x] Confirm release scope and absence of an existing open PR for this branch.
- [x] Push the candidate and create the release PR; wait for the existing GitHub production-build, RFQ browser and mobile index checks. The integration could not create PRs; the user created PR #4 with the default title.
- [x] Merge only the verified PR head, then record the exact main commit.
- [x] Obtain fresh server resource, PM2 working-directory/revision/start arguments and private-config-existence evidence. Never assume the historical running directory is current.
- [ ] Build the fixed main revision in an independent server worktree. Keep the existing process and configuration unchanged.
- [ ] Verify all instrument/accessory pages, metadata, media, footer destinations and RFQ GET behavior on a temporary loopback port. No real form/email submission.
- [ ] Save root-only old/new PM2 configuration and a failure recovery path, preserving the existing environment and start arguments.
- [ ] Switch only the target website process; check the local production entry and public website before saving PM2 state.
- [ ] Record the actual deployment time, revision, directory and rollback location only after receiving execution evidence and independent public HTTP checks.

## Evidence

- 2026-11-16: local regression 121 passed, zero failures; all eight static groups passed; TypeScript checking passed.
- PR #4 at `04c346d8c2f66c6f586973bccd7264b645de8254` passed GitHub run 43783980112, including build, mocked RU/EN desktop/mobile inquiries and mobile indexing checks. The user merged it into `ad66f19420906289acba4919920bb3faa7b7d9c6`; fetched runtime files match the tested candidate. A separate unauthenticated post-merge Actions lookup was rate-limited; do not claim a new main-branch workflow result.
- Server screenshots confirm Node 22.22.3, npm 10.9.8, approximately 2.0 GiB available memory and 2.8 GiB free disk. One PM2 fork process is online at `/var/www/sensemeter-website-release-20261102-085730-a4c5644`, revision `a4c5644b280f15ea5cf54e32c6478dc90e44f624`, `/usr/bin/npm start -- -p 3000` with `/usr/bin/node`; port 3000 listens and the private config exists.
- Ten obsolete release directories account for approximately 7 GiB; npm cache is 562 MiB. The user requested pruning rather than retaining every historical release. A separate guarded, default-check-only cleanup helper is being prepared before the new build; no remote cleanup has yet been performed.
- No release, server switch, email delivery, visual acceptance or rollback success is claimed by this plan.
