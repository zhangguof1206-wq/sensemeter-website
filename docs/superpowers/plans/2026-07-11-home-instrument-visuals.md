# Home Instrument Visuals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage clearly represent industrial measurement instruments by pairing every brand logo with a real product background and replacing the generic factory hero video with a close-up instrument-and-pipeline video.

**Architecture:** Keep the existing homepage grid and video component. Extend category data with a representative instrument image, layer that image and the transparent-looking logo inside the card media area, and replace the local MP4 contents while preserving the current resilient poster and reduced-motion fallback.

**Tech Stack:** Next.js 15, React, TypeScript, Tailwind CSS, local WebP/MP4 assets, Playwright visual verification.

---

### Task 1: Lock the visual requirements in the UI check

**Files:**
- Modify: `scripts/check-ui.mjs`

- [ ] Add assertions that all four categories define `backgroundImage`, the homepage renders a `brand-instrument-background` layer and a `brand-logo` layer, and the video records Pexels source `5571842`.
- [ ] Run `npm run check:ui` and confirm it fails because these layers and source marker are not implemented yet.

### Task 2: Add representative instruments behind brand logos

**Files:**
- Modify: `src/data/catalog.ts`
- Modify: `src/components/site.tsx`

- [ ] Extend `Category` with `backgroundImage: string`.
- [ ] Map MICHELL, ROTRONIC, VAISALA and AII to their existing real product images.
- [ ] Render the product image as a low-contrast cover layer and the brand logo above it without a separate white badge.
- [ ] Run `npm run check:ui` and confirm the card assertions pass.

### Task 3: Replace the generic factory video

**Files:**
- Replace: `public/assets/video/industrial-manufacturing-hero.mp4`
- Modify: `src/components/site.tsx`

- [ ] Download Pexels video 5571842, a close-up industrial pressure gauge mounted on a pipe.
- [ ] Transcode it to a web-ready, muted H.264 MP4 with `faststart` and no audio stream.
- [ ] Add `data-video-source="pexels-5571842"` to the hero video for source traceability.
- [ ] Run `npm run check:ui` and confirm all visual requirements pass.

### Task 4: Verify production behavior and responsive layout

**Files:**
- Verify only; no planned source changes.

- [ ] Run `npm run typecheck`, `npm run check:seo`, and `npm run build`.
- [ ] Start the local production preview on port 3011.
- [ ] Use Playwright screenshots at desktop and mobile widths to confirm the video reads as instrumentation, logos have no mismatched background blocks, and card text remains unobstructed.
- [ ] Confirm the served MP4 is `video/mp4`, changes frames during playback, and contains zero audio streams.
