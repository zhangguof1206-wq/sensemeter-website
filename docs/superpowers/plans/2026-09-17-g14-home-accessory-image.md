# G1/4 Probe Guard Homepage Image Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a homepage-only, correctly framed product image for the G1/4 probe guard without changing its catalog or detail-page imagery.

**Architecture:** The canonical accessory data remains unchanged. The small homepage reference list gains an optional image override, so presentation-specific assets stay local to the homepage rather than leaking into catalog data. A deterministic image composition preserves the source product pixels on the card's existing background color.

**Tech Stack:** Next.js 15, TypeScript, Node-based integrity checks, Pillow for deterministic WebP composition.

---

### Task 1: Define the homepage image contract

**Files:**
- Modify: `scripts/check-accessories.mjs`
- Test: `scripts/check-accessories.mjs`

- [ ] **Step 1: Write the failing check**

Update homepage reference parsing so an optional third tuple value is treated as a homepage image override. Require the G1/4 reference to use `/assets/accessories/sensor-g14-home.webp`, require that file to exist, and require the homepage component to use one uniform `object-cover` rule without the sensor-protection exception.

- [ ] **Step 2: Run the check to verify it fails**

Run: `npm run check:accessories`

Expected: FAIL because the homepage override and its image do not exist yet.

### Task 2: Create and integrate the homepage-only asset

**Files:**
- Create: `public/assets/accessories/sensor-g14-home.webp`
- Modify: `src/data/home-accessories.ts`
- Modify: `src/components/accessories/accessories-home-section.tsx`

- [ ] **Step 1: Generate the deterministic image**

Use Pillow to read `sensor-g14-uniform.webp`, isolate the non-background product region without changing its pixels, scale it proportionally to about 78% of a 1200 x 640 canvas, and center it on RGB `(233, 238, 243)`.

- [ ] **Step 2: Add the data override**

Extend the homepage tuple shape with an optional third value and return `{ ...product, image: homeImage ?? product.image }`. Add `/assets/accessories/sensor-g14-home.webp` only to the G1/4 reference.

- [ ] **Step 3: Use uniform card image fitting**

Replace the category conditional in `accessories-home-section.tsx` with the same `object-cover` class used by every homepage accessory.

- [ ] **Step 4: Run the focused check**

Run: `npm run check:accessories`

Expected: all accessory checks report `OK` and finish with `Accessory check passed.`

### Task 3: Verify behavior and visual output

**Files:**
- Verify: `public/assets/accessories/sensor-g14-home.webp`
- Verify: `src/data/home-accessories.ts`
- Verify: `src/components/accessories/accessories-home-section.tsx`

- [ ] **Step 1: Run static verification**

Run: `npm run typecheck && npm run check:ui && npm run check:accessories`

Expected: all commands exit successfully.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: Next.js build exits with code 0.

- [ ] **Step 3: Inspect desktop and mobile previews**

Open the homepage at approximately 1366 px and 768 px widths. Confirm the full product is visible, the image background is continuous, and text remains in its own lower panel.

- [ ] **Step 4: Commit the complete change**

Run: `git add docs/superpowers public/assets/accessories/sensor-g14-home.webp scripts/check-accessories.mjs src/data/home-accessories.ts src/components/accessories/accessories-home-section.tsx && git commit -m "优化：首页探头保护帽产品图"`
