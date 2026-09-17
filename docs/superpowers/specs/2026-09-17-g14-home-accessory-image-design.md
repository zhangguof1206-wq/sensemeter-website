# G1/4 Probe Guard Homepage Image Design

## Goal

Replace the visually inconsistent homepage image for the G1/4 threaded probe guard while preserving the real product appearance and leaving catalog and detail pages unchanged.

## Approved Direction

- Use the existing `sensor-g14-uniform.webp` as the only product source.
- Do not redraw, invent, retouch, or alter instrument details.
- Create a homepage-only landscape WebP asset on the exact card background color `#e9eef3`.
- Keep the complete instrument visible, centered, and large enough to read at card size.
- Add no text, watermark, decorative shadow, or new objects.

## Composition

- Output size: 1200 x 640 pixels.
- Background: flat `#e9eef3`.
- Product height: approximately 78% of the canvas.
- Product alignment: optical center, with clear space on every side.
- Rendering: preserve the source pixels and aspect ratio.

## Integration

- Add `public/assets/accessories/sensor-g14-home.webp`.
- Allow a homepage accessory reference to provide a homepage-only image override.
- Remove the category-based `object-contain` exception from the homepage card because the new asset already has the correct composition.
- Keep `sensor-g14-uniform.webp` for the accessory catalog, category page, and detail page.

## Acceptance Criteria

- The product is fully visible and does not appear inside a narrow vertical strip.
- The image background is visually continuous with the homepage card background.
- The other five accessory images are unchanged.
- The accessory catalog and product detail page still use the existing square image.
- Accessory checks, type checks, and the production build pass.
- Desktop and mobile screenshots show no image/text overlap or cropping.
