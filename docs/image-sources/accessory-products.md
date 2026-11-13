# Accessory Product Presentation Images

Date: 2026-11-13. The user approved a local-only refresh of all accessory overview, category and detail pages in both languages, with category art reused from the new homepage and source-based product-image cleanup.

## Delivered Scope

- Six category illustrations are reused from `public/assets/home-accessories/`, on overview and category pages only.
- Sixteen accepted source-specific edits are delivered separately in `public/assets/accessory-products/*-v2.webp`. Thirteen were edited in this task; three previously accepted edits were reused after checking their exact source subjects (the damping fitting with two inserts, complete green-capped sensor assembly, and parallel restrictor pair).
- Two sources remain unchanged and continue to use their original URLs: `filter-316l-powder-uniform.webp` and `sensor-outdoor-vented-uniform.webp`. The built-in image tool rejected these outputs. No alternate tool, concealed transformation, or replacement geometry was used to bypass those rejections.
- Thirty-six product records still share the same 18 original source identities. The presentation resolver maps only the 16 accepted source edits, and safely falls back to original images for the retained two and unknown sources. It does not modify raw catalog data.
- All original asset files remain intact. The accepted images are presentation illustrations, not new manufacturer photographs, dimensional drawings, certifications, or evidence of rated performance.

## Review and Technical Limits

Every original was visually inspected before editing. Accepted outputs were checked for recognizable original subjects, arrangement, component count for simple groups, visible connections, colors and complete silhouettes where the original is complete. Fine pore structure, dimensions and threads must still be confirmed from actual supplier information, not inferred from retouched pixels.

`filter-nano-disc` is an existing cropped macro view: the edit retains that close-up composition within a white landscape canvas rather than inventing complete unseen parts. Multi-part assortments remain representative product-family images, not statements that every pictured component is included. The existing localized supply-confirmation text remains in the detail selection information.

The three reused edits retain their complete corresponding source subjects. Other category illustrations that intentionally select fewer source parts are not substituted for product images.

## Prompt and File Manifest

`accessory-products.json` records each source, final repository path, generated PNG path, complete prompt or reference to the previously recorded complete prompt, and the two retained-source decisions. All edits use the built-in image tool with an opaque background. No external provider or API key was used.

Accepted images were converted to WebP with Sharp quality 90 and effort 6, retaining 1536 x 1024 pixels. No source-photo edits or creative compositing were performed by the conversion command. The six category prompts remain recorded in `home-accessories.md`.

## Approval and Verification

This is a local preview, not a production release. Asset format and dimensions, local delivery, source mapping and original-file preservation are checked before committing. Real desktop/mobile browser rendering still needs user preview confirmation because saved browser access restrictions remain in force.
