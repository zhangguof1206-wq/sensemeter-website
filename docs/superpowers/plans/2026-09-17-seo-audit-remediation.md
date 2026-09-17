# SenseMeter SEO Audit Remediation Plan

**Goal:** Apply the high-confidence technical fixes from the 2026-09-17 audit without changing the catalog layout or inventing product claims.

## Scope

1. Give the six legal pages explicit, unique metadata and keep them out of search indexes and the sitemap.
2. Render Organization and WebSite JSON-LD as a single standards-friendly graph with stable entity IDs.
3. Shorten the two homepage titles and the one overlong English application description.
4. Move large homepage brand, application, and logo images to `next/image` with responsive sizes and lazy loading.
5. Reduce the mobile Cookie banner footprint so it does not cover the primary hero action.
6. Keep the existing product catalog layout and avoid unverified Product/Offer fields.

## Verification

- Extend `scripts/check-seo.mjs` before implementation and observe the new checks fail.
- Run `npm run check:seo`, `npm run check:yandex-urls`, `npm run check:ui`, `npm run typecheck`, and `npm run build`.
- Sample generated RU/EN HTML for robots, canonical, hreflang, JSON-LD, titles, and optimized image markup.
- Preview the homepage at desktop and mobile widths before committing.

## Deferred Work Requiring Evidence

- Product and accessory content expansion needs verified datasheets, manufacturer sources, and Search Console/Yandex demand data.
- Product schema will be added only for a selected, source-verified pilot and will not contain invented offers, stock, ratings, SKUs, or certifications.
- Server HTTP/2 and production image-transfer measurements require a later deployment and server configuration pass.
