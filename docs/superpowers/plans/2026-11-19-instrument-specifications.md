# Instrument Specifications

**Scope:** Review all 22 instrument listings in Russian and English; the condition of each model's primary technical sources determines which specs may be shown. Keep the catalogue navigation, product URLs, gallery and quote links. Preserve existing metadata unless it makes an unsupported model claim. Do not replace, edit or upload manufacturer PDFs. Do not change accessory pages.

## Steps

- [x] Trace the current detail table to the four catalog summary fields and the MDM300 override. Identify model-specific discrepancies before changing data.
- [x] Match the MDM300 attachment to the existing site PDF by SHA-256. Read the instrument-specific columns and published test conditions from all three manufacturer's PDFs.
- [x] Regression check reproduced the missing groups before implementation; the other 36 gallery tests passed.
- [x] Map all product slugs to small bilingual per-family data modules. Require group and row parity for both locales, verified source references, model differences and explicit qualification when a PDF does not cover the exact named model.
- [x] Render the specs in the existing detail page, before downloads. Correct misleading summaries where verified; do not present a related model's specifications as confirmed.
- [x] Run the existing regression suite, static checks and production build. Verify all 44 local routes, representative desktop/mobile widths, document and quote links without sending email. Leave the local preview available; no production switch.

## Source Decisions

- Easidew PRO I.S.: `MI_EasidewPRO-IS.pdf`, 97208 V10.7 (04/2024), pp. 2-3. [Current manufacturer sheet](https://www.processsensing.com/docs/datasheet/Michell_Instruments_Easidew_PRO_IS_Datasheet.pdf) specifies 525 barg; [older manual v16.5](https://www.processsensing.com/docs/manual/Michell_Instruments_Easidew_PRO_I.S._Manual_v16-5.pdf), Appendix A, lists 450 barg. Show the two source values with revision context and do not assign a higher rating to an unverified unit. Keep gases and PRO LQ I.S. liquid configuration distinct.
- Easidew PRO XP: `MI_EasidewPRO-XP_EN.pdf`, 97459 V6.8 (03/2025), pp. 2-3; [manufacturer manual v6.7](https://www.processsensing.com/docs/manual/Michell_Instruments_Easidew_PRO_XP_Manual.pdf), Appendix A. 450 barg nominal maximum and 132 barg in installations requiring Canadian CRN. Use the Celsius repeatability in the manufacturer table, not its erroneous Fahrenheit conversion. Keep gas and PRO XP LQ liquid configurations distinct.
- MDM300: `MI_MDM300_EN-v9-7.pdf`, 97156 V9.7 (02/2023), pp. 1, 3. File matches the supplied attachment. Distinguish common performance and the standard/I.S. operating, sampling and certification differences. Do not infer external input or other variant features from the retailer's family-level prose.
- DwyerOmega is the presentation reference. Its product copy can differ from its own datasheets; use original wording and manufacturer data for technical values.
- Optidew-HZ: the linked PDF is for Optidew 401/501. Preserve the route and original PDF, label that document as a family reference and withhold unsupported HZ measurements. Remove the unsupported hydrocarbon claim and related recommendation pending an exact manufacturer model/order code.
- DMT143/DMT143L: the stored DMT143 PDF does not cover DMT143L. Use Vaisala's M211435EN-L for labeled DMT143L rows; 20 bar absolute is the operating limit, whereas 50 bar is mechanical durability. No shared working-pressure assumption.

## Verification

- 21 listings now show four groups of detailed data: 465 parameter rows per locale (17–28 per listing), plus the separate MDM300 variant comparison. The remaining listing, Optidew-HZ, shows the source mismatch and verification status instead of invented rows.
- The final local build generated 162 static pages and passed TypeScript, all eight static check groups, and 181 regression tests. Existing accessory parameters and layouts passed regression checks without content edits.
- Read-only HTTP verification on the production-mode local preview covered all 44 instrument routes, their locale/canonical, rendered parameter rows, quote links and 22 original PDF destinations. RFQ GET returned 405; no data was submitted or email sent.
- Checked the Easidew PRO I.S. specifications anchor and visible table at a desktop width of 1366 px. Checked GPR portable, MDM300 and DMT143/DMT143L at a 390 px simulated viewport; no horizontal overflow or clipped table cells. The local preview listens only on loopback and was not deployed.
