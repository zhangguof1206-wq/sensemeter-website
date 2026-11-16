# Homepage Accessory Category Images

Date: 2026-11-13. Approved scope: redesign the homepage accessory section and its six category images, keeping the existing palette, catalog, detail pages and technical data unchanged. Local preview only.

## Use and Limits

- These are AI-assisted category illustrations derived from the repository's existing accessory photographs, not new manufacturer photographs, drawings, or evidence of specifications.
- Initial approval covered `AccessoriesHomeSection` only. In the 2026-11-13 follow-up, the user approved reusing these six images on accessory overview/category pages. Three full-source edits are also reused for matching product presentation, as documented in `accessory-products.md`. Raw source images remain unchanged.
- Geometry references are limited to visible source forms. No new dimensions, connections, certifications, materials or performance claims are inferred from the images.
- The probe protection illustration retains the complete source assembly. It does not establish that the assembly is supplied with an individual guard.
- Six outputs were individually inspected for complete subjects, white backgrounds, no text/marks, coherent light and useful composition. Original photographs remain available for product inspection.
- All images were generated with the built-in image tool using `transparent_background: false`. No external image API, account or API key was used.
- Output PNGs remain in the generated-image folder for this task. Delivery WebP conversion preserves 1536 x 1024 pixels, with Sharp quality 90 and effort 6. No resizing, compositing or source-photo overwrite was performed during conversion.

## Sources and Outputs

All source paths are relative to `public/assets/accessories/`. All delivery paths are relative to `public/assets/home-accessories/`.

| Category | Geometry source | Delivery | PNG identifier | WebP bytes |
| --- | --- | --- | --- | ---: |
| Custom filter elements | `filter-custom-microporous-uniform.webp` | `custom-sintered-v1.webp` | `exec-c42ec9d4-2eeb-4681-9a6f-de1590eeeff2.png` | 191956 |
| Microporous metal parts | `filter-face-seal-disc-uniform.webp` | `microporous-metal-v1.webp` | `exec-47bd686e-fa38-4b5d-817a-e3f120612257.png` | 83196 |
| Sintered filter cups | `filter-industrial-cartridge-uniform.webp` | `filter-cups-v1.webp` | `exec-331f3b3a-8410-4c34-96b4-7feff12024d7.png` | 179440 |
| Gas diffusers | `flow-damping-fitting-uniform.webp` | `gas-diffusers-v1.webp` | `exec-5a45894e-608c-4cdd-b482-a3118564af53.png` | 67182 |
| Probe protection | `sensor-g14-home.webp` | `probe-protection-v1.webp` | `exec-8feb0eb8-c456-43b3-bd60-76e0c77762db.png` | 44968 |
| Flow restrictors | `flow-porous-restrictor-uniform.webp` | `flow-restrictors-v1.webp` | `exec-df1f2567-65a5-4f5e-91ea-c757c075813f.png` | 36782 |

For images 2-6, the second reference was the generated custom-filter image (`exec-c42ec9d4-2eeb-4681-9a6f-de1590eeeff2.png`), for background and lighting only. Their first reference remained the respective original geometry source. No product from the style image was requested in another category.

## Complete Generation Prompts

### 1. Custom Filter Elements

```text
Create ONE refined landscape 3:2 industrial catalog category photograph, output 1536x1024. EDIT TARGET / product appearance reference: the attached existing photograph of assorted stainless sintered filter parts. This is a precise product-photo edit, not a new invented product design. Select only THREE already-visible representative objects from that image: the tall hollow porous cylindrical tube near the rear middle, one broad flat round porous disc from the foreground, and one short porous cup visible in the collection. Preserve their visible geometry, porous stainless material, edges and viewing angles; remove every other part. Recompose these three with orderly generous separation on a pure white seamless background. Clear unified product family composition, larger upright cylindrical piece at back-right, short cup at front-left and disc at front-middle, whole objects visible, group occupies about 75% of image width and 72% of height, roughly 10% clear margin, no overlaps hiding openings. Premium but restrained industrial product photography: bright neutral softbox from upper left, fine realistic sintered texture, natural silver metal, controlled specular highlights, subtle soft contact shadows, sharp clean edges. Avoid grey/blue color cast and overexposed blown metal. This image is a homepage category illustration, not a dimensional diagram or proof of specifications. Do not create new threads, new fittings, holes, connectors or internal/cutaway construction. No text, labels, logo, certification marks, people, tools, rulers, scenery, props, border, gradient, collage panel, or decoration. Keep this visual system consistent with a set of six white-background technical product images. Negative constraints: social media UI, screenshot, watermark, messy background, distorted text, phone frame, app interface.
```

### 2. Microporous Metal Parts

```text
ONE landscape 3:2 1536x1024 homepage category product photograph for microporous metal parts. FIRST IMAGE is the EDIT TARGET and sole product geometry reference: existing silver flange-mounted porous tubes and filter discs. SECOND IMAGE is STYLE ONLY: its white background, neutral bright softbox illumination, clean silver material treatment and restrained contact shadows; do not copy its objects. Select THREE exact visible forms from the first image: one tall porous tube on a polished circular flange, the large front-facing circular polished rim with porous center, and one small round low filter disc. Remove all other pieces. Preserve the recognizable geometry, visible proportions, flange edge, porous insert and view angles of the source. Keep complete objects, generously separated and optically balanced, tall tube back-right and two circular pieces front-left/center. Product group occupies about75% width and72% height with clear margins. Premium neutral technical studio photography on pure white seamless background, realistic fine metallic pores, polished rim reflections kept controlled, no blue/grey wash, crisp readable silhouettes when reduced to a 350px-wide website tile. No new thread, holes, ports, structure, cross-sections, scale references, text, logos, annotations, packaging, props, scenery, frames, gradients or design decoration. This is an overview category illustration, not a dimensional or certification document. Negative constraints: social media UI, screenshot, watermark, messy background, distorted text, phone frame, app interface.
```

### 3. Sintered Filter Cups

```text
Create ONE 1536x1024 landscape3:2 category product photograph of sintered stainless filter cups. FIRST IMAGE: EDIT TARGET, only source for product shapes. SECOND IMAGE: STYLE REFERENCE ONLY for clean white seamless backdrop, neutral silver tones, fine material detail and soft upper-left studio light; do not copy its products. Keep only THREE existing cup forms from the first photo: the taller open porous cylindrical cup near back center, one smaller short open porous cup, and the broad shallow open porous bowl/cup visible front-right. Omit other objects. Preserve the source wall thickness, open-cup silhouettes, visible edges and natural porous surface; no new threads, flanges, cutaway interiors or invented construction. Arrange a tidy family composition, tall cup back-right, broad shallow cup foreground, small cup front-left, with enough separation to see each opening and entire object. Preserve useful original viewing angles rather than inventing unseen sides. Group about75% image width and72% height, with safe white margins. Professionally lit silver sintered metal, precise natural pores without chunky foam texture, crisp object edges, controlled highlights and very subtle contact shadows. On pure white, no blue/grey cast or graphic gradient. It must remain legible at a350px-wide industrial B2B homepage tile. No typography, logo, labels, dimensions, certification marks, people, scenery, additional accessories, pedestal, frame, decorative props, collage panels. This is a category illustration, not a dimensional/technical specification image. Negative constraints: social media UI, screenshot, watermark, messy background, distorted text, phone frame, app interface.
```

### 4. Gas Diffusers

```text
Create ONE 1536x1024 landscape 3:2 homepage category product photograph. FIRST IMAGE is the EDIT TARGET and only geometry reference: a stainless double-threaded hex fitting with two small porous round inserts. SECOND IMAGE is STYLE ONLY, for its pure white seamless background, neutral silver metal, soft upper-left studio light and restrained contact shadows; do not copy those objects. Keep the three existing objects from the first image, preserving the fitting's visible threads, hex body, opening and proportions, and both small inserts' visible shape. Improve only lighting, clarity, spacing and background; do not add holes, ports, connections, cutaways or unseen geometry. Compose the complete larger fitting standing center-right with two existing inserts separately front-left, all fully visible, balanced landscape composition with safe white margins, overall group roughly 75% width and72% height. Precise natural metal texture, controlled bright reflections, fine porous inserts, crisp clear silhouettes when reduced to350px wide, no dark blue/grey wash. No text, labels, logos, specifications, certification marks, extra parts, people, tools, scene, pedestal, border, gradients or decorative props. Category overview illustration only, not technical evidence of dimensions or performance. Negative constraints: social media UI, screenshot, watermark, messy background, distorted text, phone frame, app interface.
```

### 5. Probe Protection

```text
Create ONE 1536x1024 landscape 3:2 homepage category image for probe protection. FIRST IMAGE is the EDIT TARGET and sole geometry reference: the complete existing sensor/probe assembly with a green cap at top, silver connector, ribbed black middle body, threaded silver lower section and porous protective cap at bottom. SECOND IMAGE is STYLE ONLY, neutral clean white backdrop and soft bright studio lighting; do not copy its objects. Precisely preserve the whole assembly's visible silhouette, proportions, connectors, ribs, cap and existing black/green/silver colors, and preserve its current upright front view. Do not separate a made-up standalone guard, create an unseen side, add parts or invent construction. Remove the dull background and rephotograph this same entire assembly on pure white seamless, one clear large centered upright object, complete and not cropped, using around78% image height and ample horizontal whitespace. Sharp precise edges, readable fine porous cap texture, controlled silver highlights, well-defined black housing, natural very soft contact shadow, consistent neutral upper-left studio light, no dark grey/blue color wash. Restrained professional industrial B2B product image, legible at350px-wide tile. No text, labels, logos added, dimensions, certification marks, disconnected parts, cross-sections, people, props, tools, scenery, frame or gradients. This is category overview imagery, not proof of dimensions or specifications. Negative constraints: social media UI, screenshot, watermark, messy background, distorted text, phone frame, app interface.
```

### 6. Flow Restrictors

```text
Create ONE 1536x1024 landscape3:2 homepage category product photograph for flow restrictors. FIRST IMAGE is the EDIT TARGET, sole source of product shapes: two existing polished stainless inline cylindrical restrictors with hex ends and visible female threaded openings. SECOND IMAGE is STYLE ONLY, for pure white seamless background, neutral silver, consistent soft upper-left lighting and subtle contact shadows; do not copy its objects. Keep exactly these TWO original restrictors, preserve their visible geometry, proportions, cylindrical and hex surfaces, existing thread openings and viewing angles. Recompose as a parallel offset pair running diagonally across the center with generous separation so both full silhouettes and openings can be inspected. Group roughly75% width,60% height, clear safe white margins. Remove the old dull cast, make realistic precise polished stainless reflections and crisp edges, retain physical metallic texture and open thread detail without exaggeration. Bright restrained industrial catalog photography, pure white backdrop, no blue/grey wash, professional and easy to read at350px wide. Do not add connectors, fittings, markings, ports, sections, dimensions or other invented structure. No text, labels, logos, certifications, arrows, measurements, people, tools, scenery, props, packaging, pedestal, border or gradient. Category illustration, not dimensional or performance evidence. Negative constraints: social media UI, screenshot, watermark, messy background, distorted text, phone frame, app interface.
```
