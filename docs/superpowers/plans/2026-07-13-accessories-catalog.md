# Accessories Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual accessories catalog with four category pages and twenty-four detailed accessory pages, connected from the homepage and RFQ flow.

**Architecture:** Keep accessories separate from branded instruments. Store shared types and categories in `src/data/accessories/`, split products into four category files, and render them through focused accessory components and dynamic Next.js routes. Generate sitemap and Yandex entries from the same data.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, local WebP assets, Playwright, existing Node checks.

---

### Task 1: Add failing catalog integrity checks

**Files:**
- Create: `scripts/check-accessories.mjs`
- Modify: `package.json`

- [ ] Check that four category slugs exist, each category has exactly six products, all twenty-four slugs are unique, every product has RU/EN content, and every local image exists.
- [ ] Check that RU/EN overview, category and detail routes exist and that sitemap and Yandex scripts include accessories.
- [ ] Run `npm run check:accessories` and verify it fails before implementation.

### Task 2: Build the accessory data model

**Files:**
- Create: `src/data/accessories/types.ts`
- Create: `src/data/accessories/categories.ts`
- Create: `src/data/accessories/sensor-protection.ts`
- Create: `src/data/accessories/sintered-filter-elements.ts`
- Create: `src/data/accessories/sample-gas-filters.ts`
- Create: `src/data/accessories/flow-control-accessories.ts`
- Create: `src/data/accessories/index.ts`

- [ ] Define localized category and product types with title, summary, image, selection fields, applications, customization and service points.
- [ ] Add four categories and six procurement-focused products per category.
- [ ] Export lookup helpers that return `null` for unknown categories or products.
- [ ] Run `npm run check:accessories` and verify the data assertions pass while route assertions still fail.

### Task 3: Prepare local product images

**Files:**
- Create: `public/assets/accessories/*.webp`

- [ ] Download the selected representative source images to a temporary folder.
- [ ] Remove source branding and marketing text and normalize the background without adding any replacement logo.
- [ ] Export twenty-four optimized WebP images and four category images.
- [ ] Verify all images open, have stable dimensions and contain no source-brand text.

### Task 4: Implement focused accessory components and routes

**Files:**
- Create: `src/components/accessories/accessory-cards.tsx`
- Create: `src/components/accessories/accessories-home-section.tsx`
- Create: `src/components/accessories/accessories-index-page.tsx`
- Create: `src/components/accessories/accessory-category-page.tsx`
- Create: `src/components/accessories/accessory-detail-page.tsx`
- Create: `src/app/accessories/page.tsx`
- Create: `src/app/accessories/[category]/page.tsx`
- Create: `src/app/accessories/[category]/[slug]/page.tsx`
- Create: `src/app/en/accessories/page.tsx`
- Create: `src/app/en/accessories/[category]/page.tsx`
- Create: `src/app/en/accessories/[category]/[slug]/page.tsx`
- Modify: `src/components/site.tsx`

- [ ] Add the four-category section after the brand section on the homepage.
- [ ] Implement overview and category pages with concise supply, customization and after-sales messaging.
- [ ] Implement detail pages with selection fields, compatible instruments, customization, image disclaimer and RFQ CTA.
- [ ] Add static params, not-found handling and language switching for every dynamic route.

### Task 5: Add metadata and indexing

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `scripts/list-yandex-urls.mjs`
- Modify: `scripts/check-yandex-url-list.mjs`
- Modify: `scripts/check-seo.mjs`

- [ ] Add accessory metadata and breadcrumb helpers.
- [ ] Add the overview, four category paths and twenty-four detail paths in both languages to sitemap.
- [ ] Add dedicated RU and EN accessory groups to the Yandex submission list.
- [ ] Run SEO and Yandex checks and verify all accessory URLs are included once.

### Task 6: Verify and commit

**Files:**
- Verify all modified and created files.

- [ ] Run `npm run check:accessories`, `npm run check:ui`, `npm run check:seo`, `npm run check:i18n`, `npm run check:yandex-urls`, `npm run typecheck`, and `npm run build`.
- [ ] Start the local production preview on port 3011 and capture desktop and mobile Playwright screenshots.
- [ ] Inspect category and detail pages for image branding, text fit, responsive layout and RFQ links.
- [ ] Commit the complete feature with a Chinese commit message.
