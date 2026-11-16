# Accessory Pages Refresh Implementation Plan

**Goal:** Apply the approved professional accessory redesign to the RU/EN overview, six categories and 36 details (86 localized pages), without changing technical facts, URLs, SEO metadata, inquiries or tracking.

**Architecture:** Keep raw accessory data intact. Add a presentation-only image resolver for six approved category images and 18 retouched product images. Reuse the existing detail template and isolate category/overview changes in accessory components; instrument pages and the shared header/footer remain unchanged.

**Tech Stack:** Next.js 15, React 19, existing Tailwind utilities, Next Image, Node test/JSDOM, built-in image editing, Sharp for format conversion only. Work in the existing preview checkout; leave unrelated `tmp/` alone. No push or deployment.

## Approved Design

- Overview: compact industrial heading, six white image-led category entries with readable titles and short existing summaries; responsive 1/2/3 columns, no grey image wash or floating shadows.
- Categories: compact heading and full-subject category illustration; six product entries before parameter ranges, technical notes and quotation requirements. Preserve every technical field and link.
- Details: retain the approved professional product template, model/title, RFQ prefilling, complete specifications, selection notes, related products and conditional sections. Use refined white-background product art with consistent proportions, not decorative image captions or invented technical values.
- Imagery: reuse the six approved homepage category illustrations for overview/category presentation; retouch each of the 18 distinct source images once and preserve existing reuse relationships across 36 product records. Keep product geometry, viewpoint, visible colors, original object count and accessories. Improve only backdrop, light, spacing and scale. Do not invent missing views, components, markings or certification evidence.
- New product images are separate versioned WebP files; original assets remain untouched. Retouched illustrations are presentation material, not new manufacturer proof. Retain the existing supply-confirmation note in selection information.

## File Boundaries

- `src/data/accessory-images.ts`: compact presentation mappings/resolvers only; no raw catalog values.
- `src/components/accessories/accessories-index-page.tsx`, `accessory-category-page.tsx`, `accessory-cards.tsx`, `accessory-page-heading.tsx`, `accessory-detail-page.tsx`: overview/category ordering and accessory-only image consumption. A small accessory-only helper component is acceptable if it removes duplication.
- `scripts/check-accessory-presentation.test.mjs`: all localized overview/category layouts, raw-data integrity, image mapping/fallbacks and shared details invariants.
- `scripts/check-accessory-details.test.mjs`, `scripts/check-accessories.mjs`, `scripts/check-ui.mjs`, `scripts/lib/component-test-loader.mjs`: update superseded presentation checks only, retaining technical, route, inquiry and metadata checks.
- `public/assets/accessory-products/*-v2.webp`: 18 refined source-specific product illustrations.
- `docs/image-sources/accessory-products.md` and generation manifest: original references, exact prompt set, outputs and limitations.
- `package.json`, `.github/workflows/seo-regression.yml`: integrate new regression command.

## Task 1: Regression and Presentation

- [x] Write failing component tests before implementation. Require 6 overview entries, 6 products per category before technical content, localized links, complete original content, white contained images, existing metadata/RFQ and fallback for unknown image paths.
- [x] Run the new test and record expected red failures; do not weaken field/route checks.
- [x] Implement image mappings for `/assets/home-accessories/*-v1.webp` and `/assets/accessory-products/<original stem without -uniform>-v2.webp`. Keep 18-to-36 source reuse exact, with original-image fallback for the two retained sources.
- [x] Implement compact overview/categories and update detail visuals using accessory-only changes. No shared instrument layout or header/footer redesign.
- [x] Run new and existing accessory/home/detail/navigation/inquiry tests; image-existence checks may remain red until Task 2 assets arrive.

## Task 2: Source-Constrained Image Retouching

- [x] Inspect all 18 source images before editing and record individual appearance constraints.
- [x] Use built-in image editing for 13 new accepted outputs and reuse three already accepted source-consistent edits. Each accepted image is 1536 x 1024. Two rejected outputs retain their original sources; they are not reported as retouched.
- [x] Inspect every generated output against its original. Do not accept added/removed structural parts. Retain original framing for the cropped macro source.
- [x] Convert the 16 accepted outputs to versioned WebP with Sharp (quality 90, effort 6); retain originals and generated PNGs.
- [x] Save prompt/source/output manifest and verify image format, dimensions, content and size.

## Task 3: Integration and Verification

- [x] Add `test:accessory-presentation` to package and existing GitHub regression workflow.
- [x] Run full existing regression plus new tests, accessory/UI/i18n/SEO/catalog/application/discovery checks, production build, postbuild and TypeScript checks.
- [x] Verify raw product/category technical data, original source images, route metadata, shared instrument details, forms and tracking have no unintended diff.
- [x] Restart only the owned preview server. Read RU/EN overview, all category/detail paths and all referenced images locally without scripts, tracking or submissions.
- [x] Complete a main-agent spec and code-quality review, fix the resolver fallback and overview heading hierarchy, and rerun affected verification. Independent agent work could not run because the delegated agent reported its usage limit before making any edits; independent review is not claimed.
- [x] Commit the complete functional change using a Chinese message, with no push or publish. Keep preview available for user visual approval.

## Verification Limits

Honor saved browser access restrictions. Do not switch tools/ports to bypass them. Use offline DOM, local read-only HTTP and direct asset inspection. Automated responsive markup tests do not prove desktop/mobile rendering; final browser appearance remains for user preview confirmation.

## Verification Record

- Initial new tests: 8 expected failures, 1 pass before implementation. Prototype-key fallback and heading-level tests were also observed failing before their fixes.
- New presentation tests cover all 86 localized pages; existing detail tests retain complete original specifications, RFQ prefilling, category links, language links and BreadcrumbList checks.
- Full regression: 112 tests, zero failures. Eight static check commands pass.
- First production build identified the pre-existing category type union also includes two legacy slugs. The presentation mapping is correctly partial with original-image fallback; raw category types/routes were not changed. The subsequent production build, postbuild and type check pass.
- Read-only HTTP: all 86 pages return 200 with expected language, one H1, canonical, hreflang, models and RFQ payloads. Product lists precede technical sections on all 12 localized category pages.
- All 24 visible image sources return valid WebP (six category edits, 16 product edits, two originals). The accepted edits remain 1536 x 1024 and below 350000 bytes each. All 16 product-image optimizer endpoints return 640px images.
- No page scripts, tracking, email or form submissions were executed in the local HTTP checks.
- Original accessory/product facts, original images, routes/SEO helpers, instrument components, shared shell, forms and tracking have no diff.
- Local preview: `http://127.0.0.1:3242/accessories` and `/en/accessories`. No push or publication.
