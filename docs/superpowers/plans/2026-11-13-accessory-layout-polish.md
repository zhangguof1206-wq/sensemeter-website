# Accessory Layout Polish Plan

## Confirmed Feedback

The user rejected the overview's dense introduction and crowded card copy, identified inconsistent image and text alignment across category listings, and requested more deliberate visual structure on category/detail pages. Keep the current palette, photographs, technical data, routes, SEO metadata, forms and tracking. No push or release.

## Design

- Overview only: concise localized introduction, existing H1 text, a short brand-red rule, short category display names and one-sentence descriptions. Keep the original full category content on category/detail pages; move practical selection requirements to the overview's lower information band.
- Shared accessory cards: an explicitly positioned image inside a relative 3:2 frame, independent of the source image's square or landscape aspect ratio. Use consistent inset spacing and a shared grid-row layout for product headers, three parameter rows and actions, without truncating technical text.
- Category and related-product grids: use subgrid row alignment so the longest title/value determines the corresponding shared track, rather than giving every card arbitrary fixed text heights.
- Category headings and accessory detail heroes: pale steel-grey bands, white bordered image stages and restrained red section markers. Preserve the approved professional detail structure and all technical content. Instrument presentation defaults stay unchanged.
- Preserve both retained original source images. Do not retry rejected edits, swap in unrelated category illustrations, or claim all photographs have identical backgrounds.

## Steps

- [x] Add failing regression tests for image positioning independent of natural dimensions, shared product-card rows, inset text, concise overview copy and accessory-only visual accents.
- [x] Add small presentation-only overview copy data. Refine overview heading and category card copy without changing raw catalog values.
- [x] Fix shared accessory media frames and product card/spec row alignment; check all 36 products in both languages, including square originals, long titles and related cards.
- [x] Add accessory-only bands/frames/section accents, leaving instrument defaults and metadata unchanged.
- [x] Run focused and full tests, static checks, type check, production build, all 86 local-page checks and image endpoints. Review protected-file diffs.
- [ ] Perform real desktop/mobile screenshot checks if local browsing access is granted. Until then, do not report visual acceptance as complete or bypass saved browser restrictions.
- [x] Commit complete functional code with a Chinese message. Keep local preview available without push/deployment.

## Verification Boundaries

DOM/style-contract tests establish structure and rendering constraints, not final pixels. The user has been asked for local browsing access for actual desktop/mobile review. No agent quota retry or browser-permission workaround is part of this plan.

## Progress

- All 121 regression tests and eight static checks passed after the layout changes.
- Production build (162 generated pages), postbuild and TypeScript checking passed.
- Read-only local HTTP checks passed for all 86 accessory routes and both homepages: language, H1, canonical/hreflang, indexability, fixed-media structure, shared card tracks and RFQ destinations. All 24 source images and their optimized endpoints returned valid images. No form was submitted and no email was sent.
- The generated CSS contains the required subgrid spans, fixed image positioning, aspect ratio, zero row gaps, card spacing, stronger hero text contrast and heading accents. This is a CSS-output check, not a rendered pixel check.
- Protected-file review found no changes to raw accessory records, source images, routes, metadata helpers, forms, tracking, the site shell or dependency lockfile. The shared detail hero has an optional accessory surface only; instrument defaults remain unchanged.
- Actual browser access to http://127.0.0.1:3242/accessories was attempted through the normal in-app browser entry point and rejected by the saved origin permission. Screenshot review remains pending; do not use another browser, port, raw automation or native app to circumvent this denial.
- Independent agent review was unavailable because of the current agent usage limit; the parent performed the source/diff review. No independent review or visual acceptance is claimed.
- Local preview rebuilt and restarted at http://127.0.0.1:3242 (process 8244). No push or deployment.
