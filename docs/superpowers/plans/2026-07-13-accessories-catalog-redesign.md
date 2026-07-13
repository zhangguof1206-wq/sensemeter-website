# Accessories Catalog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move accessories under the product catalog and turn the existing accessory pages into a compact, specification-led industrial catalog with neutral SenseMeter model codes.

**Architecture:** Keep existing accessory URLs and split data by the four existing category files. Extend the typed data model with localized specification rows, applications and related product references; keep rendering in focused accessory components and reuse one catalog switch on instrument and accessory pages.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Node-based repository checks, Playwright browser QA.

---

### Task 1: Lock the navigation and data requirements with failing checks

**Files:**
- Modify: `scripts/check-ui.mjs`
- Modify: `scripts/check-accessories.mjs`

- [ ] **Step 1: Add navigation ownership checks**

Require `site.tsx` to exclude a standalone accessories navigation item, require accessory pages to use `active="catalog"`, and require a shared `ProductCatalogSwitch` on both catalog and accessory overview pages.

- [ ] **Step 2: Add technical data checks**

Require every accessory product to contain one `SM-` model, at least three localized specification rows, localized applications and related product slugs. Require every category to contain localized range specifications.

- [ ] **Step 3: Run checks and verify RED**

Run:

```bash
npm run check:ui
npm run check:accessories
```

Expected: both commands fail because the standalone navigation and the old shallow data structure still exist.

### Task 2: Extend the accessory data model and public facts

**Files:**
- Modify: `src/data/accessories/types.ts`
- Modify: `src/data/accessories/categories.ts`
- Modify: `src/data/accessories/sensor-protection.ts`
- Modify: `src/data/accessories/sintered-filter-elements.ts`
- Modify: `src/data/accessories/sample-gas-filters.ts`
- Modify: `src/data/accessories/flow-control-accessories.ts`

- [ ] **Step 1: Add reusable localized specification types**

Add:

```ts
export type LocalizedSpec = {
  label: LocalizedText;
  value: LocalizedText;
};

export type AccessoryProduct = {
  model: string;
  specs: LocalizedSpec[];
  applications: LocalizedList;
  relatedSlugs: string[];
  // existing fields remain
};
```

Add `specs: LocalizedSpec[]` to `AccessoryCategory` for category-level ranges.

- [ ] **Step 2: Assign neutral catalog model families**

Use these exact model prefixes:

```text
SM-PG-* probe guards and housings
SM-SF-* sintered filter elements
SM-GF-* sample and process gas filters
SM-FR-* flow restrictors and gas-line fittings
```

Each of the 24 products receives a unique model.

- [ ] **Step 3: Add factual specification rows**

Use only defensible public ranges and product-specific structure, including:

```text
Sintered media: 304 / 316 / 316L; 0.1-120 um; up to 600 C subject to configuration
Filter discs: diameter 2-500 mm; thickness 1-100 mm
Filter cups: configurable ID, OD and height; 316 / 316L and special alloys
Gas filters: 316L housings; particle grades selected from 0.003-120 um; VCR or tube connections by model
Flow restrictors: 316L; selected by inlet pressure and target flow; 1/4 in VCR on high-purity versions
```

Do not import supplier brand, contact, delivery, capacity or promotional claims.

- [ ] **Step 4: Run accessory checks and verify data GREEN**

Run `npm run check:accessories`.

Expected: technical data checks pass; UI ownership check remains red until Task 3.

### Task 3: Merge accessories into Product Catalog navigation

**Files:**
- Create: `src/components/catalog/product-catalog-switch.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/components/accessories/accessories-index-page.tsx`
- Modify: `src/components/accessories/accessory-category-page.tsx`
- Modify: `src/components/accessories/accessory-detail-page.tsx`
- Modify: `src/data/accessories/copy.ts`

- [ ] **Step 1: Build the shared catalog switch**

Create a two-option control that links to localized `/catalog` and `/accessories` routes and marks either `instruments` or `accessories` active.

- [ ] **Step 2: Remove standalone navigation ownership**

Delete the accessories item from `PageShell` navigation and remove `"accessories"` from the active union. Render all accessory pages with `active="catalog"`.

- [ ] **Step 3: Place the switch on both catalog views**

Render `ProductCatalogSwitch active="instruments"` near the top of `CatalogPage` and `active="accessories"` on the accessory overview. Add compact Russian and English labels for instruments and accessories.

- [ ] **Step 4: Run UI check and verify GREEN**

Run `npm run check:ui`.

Expected: no standalone accessory navigation, both catalog views provide the segmented entry, and accessory pages belong to the product catalog navigation state.

### Task 4: Redesign the homepage and overview as technical catalog surfaces

**Files:**
- Modify: `src/components/accessories/accessories-home-section.tsx`
- Modify: `src/components/accessories/accessory-cards.tsx`
- Modify: `src/components/accessories/accessories-index-page.tsx`

- [ ] **Step 1: Replace large category cards on the homepage**

Use four dense category rows/cards containing a representative image, category name, three category range specs and two or three `SM-` model codes. Preserve a single clear link to all accessories.

- [ ] **Step 2: Enrich the overview cards**

Show category specifications, six-model availability and the representative image. Add an RFQ preparation checklist below the category grid.

- [ ] **Step 3: Keep responsive dimensions stable**

Use fixed image aspect ratios, bounded grid tracks and no horizontal scroll at 390 px width.

### Task 5: Redesign category and detail pages around specifications

**Files:**
- Modify: `src/components/accessories/accessory-page-heading.tsx`
- Modify: `src/components/accessories/accessory-category-page.tsx`
- Modify: `src/components/accessories/accessory-detail-page.tsx`
- Modify: `src/components/accessories/accessory-cards.tsx`

- [ ] **Step 1: Add category range table**

Render the category's localized specification rows before the six product cards.

- [ ] **Step 2: Add model-led product cards**

Each card displays `product.model`, localized name, first three specification values and a detail link.

- [ ] **Step 3: Add a procurement detail layout**

Render model and RFQ action in the heading, a structured specification table, customization, typical applications, information-to-provide checklist and up to three related accessories.

- [ ] **Step 4: Keep representative-image disclaimer**

Do not add supplier or SenseMeter logos to accessory images.

### Task 6: Verify SEO, localization and complete the change

**Files:**
- Modify: `scripts/check-seo.mjs` only if a new assertion is needed
- Modify: `scripts/check-i18n.mjs` only if a new assertion is needed

- [ ] **Step 1: Run the complete automated suite**

```bash
npm run check:accessories
npm run check:seo
npm run check:i18n
npm run check:applications
npm run check:application-links
npm run check:yandex-urls
npm run check:catalog
npm run check:ui
npm run typecheck
npm run build
```

Expected: all commands exit 0 and the build pre-renders all RU and EN accessory pages.

- [ ] **Step 2: Run desktop and mobile browser QA**

Check `/`, `/catalog`, `/accessories`, one category page and one detail page in RU and EN at desktop and 390 px mobile widths. Confirm no overflow, no separate accessories navigation, readable parameter tables and working language links.

- [ ] **Step 3: Commit the complete implementation**

```bash
git add -A
git commit -m "将配件并入产品目录并完善技术参数"
```

Do not push or deploy.

