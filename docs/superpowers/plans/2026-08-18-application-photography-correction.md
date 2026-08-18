# Application Photography Correction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove repeated application-page photography and replace it with a credible industrial layout using one unique hero image, two unique field photographs, and three text-led technical scenarios per application theme.

**Architecture:** Keep the existing shared application-page component boundary and localized data files. Move photo ownership out of localized scenario records into a fixed three-image media contract, render only two photographic scenario blocks, and render the remaining use cases as technical rows. Remove decorative image reuse from the selection, FAQ, and final CTA sections.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Next Image, Node-based source checks, generated photorealistic raster assets optimized to WebP.

---

### Task 1: Add the no-duplicate photography contract

**Files:**
- Modify: `scripts/check-application-pages.mjs`
- Test: `npm run check:applications`

- [ ] **Step 1: Add failing source checks**

Require every application data file to declare `scenarioImages` with exactly two assets, require the hero and scenario paths to be unique, and reject legacy `scenarioImage` or `ctaImage` fields. Require `ApplicationScenarios` to render photo scenarios and technical scenarios separately. Reject `Image` usage in `ApplicationSelection` and `ApplicationFaq`.

- [ ] **Step 2: Run the check and verify the expected failure**

Run: `npm run check:applications`

Expected: FAIL because the current data repeats `heroImage`, `scenarioImage`, and `ctaImage`, while the current selection and FAQ components reuse those assets.

### Task 2: Produce credible per-theme media

**Files:**
- Create: `public/assets/applications/natural-gas-moisture-monitoring/hero.webp`
- Create: `public/assets/applications/natural-gas-moisture-monitoring/sample-conditioning.webp`
- Create: `public/assets/applications/natural-gas-moisture-monitoring/field-verification.webp`
- Create the same `hero.webp`, `process-installation.webp`, and `field-verification.webp` pattern under the other four application slug directories.

- [ ] **Step 1: Generate one distinct scene per required role**

Use a separate photorealistic industrial prompt for each asset. Reject text, logos, watermarks, cinematic fog, impossible pipework, duplicated instruments, unsafe connections, and futuristic equipment.

- [ ] **Step 2: Inspect every source image**

Verify that each subject matches its application, visible equipment geometry is plausible, people use credible PPE where present, and no image is reused within a page.

- [ ] **Step 3: Optimize accepted sources**

Convert the accepted 1536 by 1024 PNG files to WebP at a visually lossless web quality, retaining the original aspect ratio. Keep each page asset below 500 KB where practical.

### Task 3: Replace the localized scenario model

**Files:**
- Modify: `src/data/applications/types.ts`
- Modify: `src/data/applications/industrial-humidity-monitoring.ts`
- Modify: `src/data/applications/compressed-air-dew-point.ts`
- Modify: `src/data/applications/glove-box-oxygen-analysis.ts`
- Modify: `src/data/applications/natural-gas-moisture-monitoring.ts`
- Modify: `src/data/applications/climate-chamber-humidity.ts`

- [ ] **Step 1: Define the fixed media and scenario contracts**

```ts
export type ApplicationPhotoScenario = {
  title: string;
  text: string;
  imageAlt: string;
};

export type ApplicationTechnicalScenario = {
  title: string;
  text: string;
  criterion: string;
};

export type ApplicationPageRecord = {
  heroImage: string;
  scenarioImages: [string, string];
  // Existing route, product, and localized content fields remain.
};
```

- [ ] **Step 2: Reshape all five paired RU/EN content records**

Each locale must contain two `photoScenarios`, three `technicalScenarios`, and a localized `criterionLabel`. Preserve existing factual claims, routes, recommended product slugs, metadata, FAQ content, and RFQ copy.

- [ ] **Step 3: Run type checking**

Run: `npm run typecheck`

Expected: FAIL only in components that still consume the legacy scenario shape.

### Task 4: Implement the approved layout

**Files:**
- Modify: `src/components/applications/application-scenarios.tsx`
- Modify: `src/components/applications/application-selection.tsx`
- Modify: `src/components/applications/application-faq.tsx`
- Modify: `src/components/applications/application-page.tsx` only if prop wiring changes are required
- Modify: `src/app/globals.css` only for shared image-hover or anchor behavior

- [ ] **Step 1: Render two photographic evidence blocks**

Map the two localized photo scenarios to the two fixed scenario images. Use an asymmetric desktop layout and a single-column mobile fallback. Every image uses `next/image`, meaningful localized alt text, stable aspect ratios, and responsive `sizes`.

- [ ] **Step 2: Render three technical scenario rows**

Display each remaining scenario as number, title, purpose, and selection criterion. Do not add decorative or repeated photos.

- [ ] **Step 3: Remove decorative image reuse**

Use a solid dark selection section. Use a text-led advisor panel in FAQ and a solid final CTA band. Keep the existing CTA destinations and labels.

- [ ] **Step 4: Verify the photography contract passes**

Run: `npm run check:applications`

Expected: `Application page check passed.`

### Task 5: Verify behavior, SEO, and visuals

**Files:**
- Test: all modified application data, components, routes, and assets

- [ ] **Step 1: Run the release verification suite**

Run: `npm run build:release`

Expected: SEO, Yandex URL, application, backlink, UI, i18n, type, lint, and production-build checks all pass.

- [ ] **Step 2: Inspect all ten application URLs**

Verify five RU and five EN routes return 200, contain one H1, load all images, retain the correct language, and have no horizontal overflow.

- [ ] **Step 3: Capture desktop and mobile evidence**

Capture the natural-gas page at 1440 px and 390 px widths, then spot-check the other four themes. Confirm that no page-level photo is repeated and the header remains unchanged.

### Task 6: Clean and commit

**Files:**
- Remove: generated PNG sources, rejected variants, temporary HTML, browser profiles, screenshots not needed for final review, and `.next`
- Keep: optimized production WebP assets, source code, data, checks, and final review screenshots outside the repository

- [ ] **Step 1: Verify repository scope**

Run: `git diff --check && git status --short`

Expected: only website source, optimized production assets, checks, and this plan are present.

- [ ] **Step 2: Commit the complete correction**

```bash
git add -A
git commit -m "修正应用页重复图片并更新工业实拍素材"
```

