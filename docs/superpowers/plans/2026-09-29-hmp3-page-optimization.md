# HMP3 Product Page Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing bilingual HMP3 product page for precise HMP3 searches and qualified RFQs while preserving its indexed URL.

**Architecture:** Keep the existing `/products/hmp3-hmpx` route and shared product-page component. Replace only the HMP3 catalog record with manufacturer-supported bilingual content, keep HMPX as a secondary series term, and strengthen the existing SEO type mapping. A focused repository check protects the main product name, verified specifications, buyer inputs, and unchanged slug.

**Tech Stack:** Next.js 15, React 19, TypeScript, Node.js validation scripts, Tailwind CSS.

---

### Task 1: Add the failing HMP3 content contract

**Files:**
- Modify: `scripts/check-seo.mjs`

- [ ] **Step 1: Add a focused failing check**

Add this check after the existing MDM300 contract:

```js
{
  name: "HMP3 page focuses the model and collects qualified RFQ inputs",
  pass: () => {
    const catalog = read("src/data/catalog.ts");
    const seo = read("src/lib/seo.ts");
    const requiredCatalogCopy = [
      'slug: "hmp3-hmpx"',
      'model: "HMP3"',
      "Vaisala HMP3 industrial humidity and temperature probe",
      "Request price, availability and a quotation for HMP3.",
      "Relative humidity accuracy up to +/-0.8 %RH at +23 deg C (0-90 %RH)",
      "Temperature measurement range -40 to +120 deg C",
      "Modbus RTU over RS-485",
      "IP66 probe body",
      "Application environment and measured gas",
      "Standalone RS-485 Modbus or Indigo transmitter",
      "Cable length, mounting, filter, quantity and delivery country"
    ];

    return requiredCatalogCopy.every((phrase) => catalog.includes(phrase)) &&
      seo.includes('"hmp3-hmpx": { ru: "промышленный датчик влажности и температуры", en: "industrial humidity and temperature probe" }');
  }
}
```

- [ ] **Step 2: Run the check and verify RED**

Run: `npm run check:seo`

Expected: `HMP3 page focuses the model and collects qualified RFQ inputs` fails because the existing model name, specifications, buyer inputs, and SEO type do not satisfy the new contract.

### Task 2: Implement the bilingual HMP3 content

**Files:**
- Modify: `src/data/catalog.ts`
- Modify: `src/lib/seo.ts`
- Modify: `scripts/check-seo.mjs`

- [ ] **Step 1: Focus the existing catalog record on HMP3**

Keep `slug: "hmp3-hmpx"`, the image, and the PDF path. Change the model and bilingual content to:

```ts
model: "HMP3",
overview: {
  ru: "Vaisala HMP3 - промышленный датчик влажности и температуры для HVAC, чистых помещений, окрасочных камер и климатических камер. Поддерживает Modbus RTU по RS-485 и совместим с преобразователями Indigo. Запросите цену, наличие и коммерческое предложение на HMP3.",
  en: "Vaisala HMP3 industrial humidity and temperature probe for HVAC, cleanrooms, paint booths and environmental chambers. Supports Modbus RTU over RS-485 and works with Indigo transmitters. Request price, availability and a quotation for HMP3."
},
params: {
  ru: [
    "Диапазон относительной влажности 0-100 %RH при максимальной точке росы +95 deg C",
    "Точность относительной влажности до +/-0.8 %RH при +23 deg C (0-90 %RH)",
    "Диапазон измерения температуры -40...+120 deg C",
    "Точность температуры до +/-0.1 deg C"
  ],
  en: [
    "Relative humidity range 0-100 %RH at a maximum dew point of +95 deg C",
    "Relative humidity accuracy up to +/-0.8 %RH at +23 deg C (0-90 %RH)",
    "Temperature measurement range -40 to +120 deg C",
    "Temperature accuracy up to +/-0.1 deg C"
  ]
},
highlights: {
  ru: [
    "Modbus RTU по RS-485 для автономного подключения",
    "Корпус зонда IP66 для промышленной эксплуатации",
    "Совместимость с преобразователями Vaisala Indigo и программой Insight",
    "Сменные в полевых условиях сенсор и фильтр для обслуживания по месту установки"
  ],
  en: [
    "Modbus RTU over RS-485 for standalone connectivity",
    "IP66 probe body for industrial environments",
    "Compatible with Vaisala Indigo transmitters and Insight software",
    "Field-replaceable sensor and filter for on-site maintenance"
  ]
},
applications: {
  ru: [
    "Промышленные HVAC и установки обработки воздуха",
    "Чистые помещения и климатические камеры",
    "Окрасочные камеры и общепромышленные процессы"
  ],
  en: [
    "Industrial HVAC and air handling units",
    "Cleanrooms and environmental chambers",
    "Paint booths and general industrial processes"
  ]
},
selectionInputs: {
  ru: [
    "Условия применения и измеряемый газ",
    "Ожидаемые диапазоны температуры и влажности",
    "Автономный RS-485 Modbus или преобразователь Indigo",
    "Длина кабеля, монтаж, фильтр, количество и страна поставки"
  ],
  en: [
    "Application environment and measured gas",
    "Expected temperature and humidity ranges",
    "Standalone RS-485 Modbus or Indigo transmitter",
    "Cable length, mounting, filter, quantity and delivery country"
  ]
}
```

Do not change the slug or add stock, price, delivery-time, distributor, or approval claims.

- [ ] **Step 2: Strengthen the HMP3 metadata type**

Replace the HMP3 mapping in `productSeoNames`:

```ts
"hmp3-hmpx": {
  ru: "промышленный датчик влажности и температуры",
  en: "industrial humidity and temperature probe"
}
```

- [ ] **Step 3: Align older broad SEO assertions**

Update the existing broad checks in `scripts/check-seo.mjs` so they expect the new focused phrases:

```js
"Request price, availability and a quotation for HMP3."
```

and:

```js
"Vaisala HMP3 - промышленный датчик влажности и температуры"
```

Do not weaken unrelated product checks.

- [ ] **Step 4: Run the focused check and verify GREEN**

Run: `npm run check:seo`

Expected: all SEO checks pass, including `HMP3 page focuses the model and collects qualified RFQ inputs`.

### Task 3: Verify release safety and rendered output

**Files:**
- Verify: `src/data/catalog.ts`
- Verify: `src/lib/seo.ts`
- Verify: `scripts/check-seo.mjs`

- [ ] **Step 1: Run structural checks**

Run:

```powershell
npm run check:application-links
npm run check:ui
npm run check:i18n
npm run typecheck
```

Expected: every command exits with code `0`.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: the Next.js build succeeds and both `/products/hmp3-hmpx` and `/en/products/hmp3-hmpx` remain generated.

- [ ] **Step 3: Verify the built bilingual pages**

Start the built site on an unused local port, then check both pages for these markers:

```text
English: Vaisala HMP3, industrial humidity and temperature probe, +/-0.8 %RH, What to specify for selection, VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf
Russian: Vaisala HMP3, промышленный датчик влажности и температуры, +/-0.8 %RH, Что указать для подбора, VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf
```

Expected: both pages return HTTP `200`, canonical URLs retain `hmp3-hmpx`, PDF and RFQ links remain present, and all markers are found.

- [ ] **Step 4: Review the final diff**

Run:

```powershell
git diff --check
git diff --stat
git status --short
```

Expected: only the implementation plan, HMP3 catalog content, HMP3 SEO mapping, and focused SEO checks are changed. Temporary PDF preview files remain untracked and are excluded from the commit.

- [ ] **Step 5: Commit the complete implementation**

Run:

```powershell
git add docs/superpowers/plans/2026-09-29-hmp3-page-optimization.md scripts/check-seo.mjs src/data/catalog.ts src/lib/seo.ts
git commit -m "优化：提升HMP3产品页曝光与询盘转化"
```

Expected: one complete Chinese-language implementation commit. The temporary PDF preview files under `tmp/` are not committed.
