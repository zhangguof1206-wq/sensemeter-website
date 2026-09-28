# MDM300 Product Page Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing bilingual MDM300 product page for verified model searches, portable dew-point buyer intent, and qualified RFQs without creating a duplicate landing page.

**Architecture:** Keep product-specific public copy in `src/data/catalog.ts` and add one optional `selectionInputs` field to the shared `Product` type. The shared product component conditionally renders that field, while existing metadata mapping supplies a precise MDM300 product type. A repository SEO check protects the required bilingual content and rendering contract.

**Tech Stack:** Next.js 15, React 19, TypeScript, Node.js validation scripts, Tailwind CSS.

---

### Task 1: Add the failing MDM300 content contract

**Files:**
- Modify: `scripts/check-seo.mjs`

- [ ] **Step 1: Add a focused failing check**

Add a check that reads `src/data/catalog.ts`, `src/components/site.tsx`, `src/lib/i18n.ts`, and `src/lib/seo.ts`. Require the following signals:

```js
{
  name: "MDM300 page separates product variants and collects RFQ inputs",
  pass: () => {
    const catalog = read("src/data/catalog.ts");
    const component = read("src/components/site.tsx");
    const i18n = read("src/lib/i18n.ts");
    const seo = read("src/lib/seo.ts");
    const requiredCatalogCopy = [
      "selectionInputs?: LocalizedList",
      "MDM300: T95 to -60 deg Cdp in up to 15 minutes",
      "MDM300 I.S.: T95 to -60 deg Cdp in up to 30 minutes",
      "MDM300: up to 48 hours of typical use",
      "MDM300 I.S.: up to 24 hours of typical use",
      "Gas type and measurement units",
      "Ordinary or intrinsically safe version"
    ];

    return requiredCatalogCopy.every((phrase) => catalog.includes(phrase)) &&
      component.includes("product.selectionInputs") &&
      i18n.includes('selectionInputs: "What to specify for selection"') &&
      i18n.includes('selectionInputs: "Что указать для подбора"') &&
      seo.includes('"mdm300": { ru: "портативный гигрометр точки росы", en: "portable dew-point hygrometer" }');
  }
}
```

- [ ] **Step 2: Run the check and verify RED**

Run: `npm run check:seo`

Expected: the new `MDM300 page separates product variants and collects RFQ inputs` check fails because the optional field and new content do not exist yet.

### Task 2: Implement the minimal bilingual product-page change

**Files:**
- Modify: `src/data/catalog.ts`
- Modify: `src/components/site.tsx`
- Modify: `src/lib/i18n.ts`
- Modify: `src/lib/seo.ts`

- [ ] **Step 1: Extend the product type**

Add the optional field without changing existing products:

```ts
export type Product = {
  slug: string;
  model: string;
  category: CategoryId;
  brand: string;
  image: string;
  pdf: string;
  featured?: boolean;
  overview: LocalizedText;
  params: LocalizedList;
  highlights: LocalizedList;
  applications: LocalizedList;
  selectionInputs?: LocalizedList;
};
```

- [ ] **Step 2: Replace only the MDM300 bilingual content**

Update the MDM300 record with manufacturer-supported copy. Keep exact variant distinctions:

```ts
overview: {
  ru: "Портативный гигрометр точки росы MDM300 / MDM300 I.S. для быстрых выборочных измерений в сжатом воздухе и природном газе. Запросите цену, наличие и коммерческое предложение.",
  en: "Portable MDM300 / MDM300 I.S. dew-point hygrometer for rapid spot checks in compressed air and natural gas. Request price, availability and a quotation for MDM300."
},
params: {
  ru: [
    "Точность точки росы +/-1 deg C в диапазоне -60...+20 deg Cdp",
    "MDM300: T95 до -60 deg Cdp не более 15 минут",
    "MDM300 I.S.: T95 до -60 deg Cdp не более 30 минут",
    "Рабочее давление до 350 barg"
  ],
  en: [
    "Dew-point accuracy +/-1 deg C from -60 to +20 deg Cdp",
    "MDM300: T95 to -60 deg Cdp in up to 15 minutes",
    "MDM300 I.S.: T95 to -60 deg Cdp in up to 30 minutes",
    "Operating pressure up to 350 barg"
  ]
},
highlights: {
  ru: [
    "MDM300: до 48 часов типичной работы между зарядками",
    "MDM300 I.S.: до 24 часов типичной работы между зарядками",
    "Переносной корпус IP66 / NEMA 4",
    "Регистрация данных и настраиваемые принадлежности для отбора проб"
  ],
  en: [
    "MDM300: up to 48 hours of typical use",
    "MDM300 I.S.: up to 24 hours of typical use",
    "IP66 / NEMA 4 portable enclosure",
    "Data logging and configurable sampling accessories"
  ]
},
applications: {
  ru: [
    "Переработка природного газа, трубопроводы и контроль точки росы",
    "Контроль адсорбционных осушителей сжатого воздуха",
    "Нефтехимия, промышленные и медицинские газы"
  ],
  en: [
    "Natural gas processing, pipelines and dew-point spot checks",
    "Monitoring desiccant dryers for compressed air",
    "Petrochemical, industrial gas and medical gas applications"
  ]
},
selectionInputs: {
  ru: [
    "Тип газа и требуемые единицы измерения",
    "Рабочее давление и ожидаемый диапазон точки росы",
    "Обычная или искробезопасная версия",
    "Подключение к пробе, принадлежности для отбора и количество"
  ],
  en: [
    "Gas type and measurement units",
    "Working pressure and expected dew-point range",
    "Ordinary or intrinsically safe version",
    "Sample connection, sampling accessories and quantity"
  ]
}
```

Do not add exact SenseMeter stock, lead time, distributor status, or unsupported approval promises.

- [ ] **Step 3: Render the optional selection section**

Add the localized heading to both locale dictionaries in `src/lib/i18n.ts`, then render after applications and before related applications:

```tsx
{product.selectionInputs ? (
  <InfoList title={c.selectionInputs} items={product.selectionInputs[locale]} />
) : null}
```

- [ ] **Step 4: Add the precise MDM300 SEO name**

Extend `productSeoNames` in `src/lib/seo.ts`:

```ts
"mdm300": {
  ru: "портативный гигрометр точки росы",
  en: "portable dew-point hygrometer"
}
```

- [ ] **Step 5: Run the focused check and verify GREEN**

Run: `npm run check:seo`

Expected: all SEO checks pass, including the new MDM300 contract.

### Task 3: Verify rendering and release safety

**Files:**
- Verify: `src/data/catalog.ts`
- Verify: `src/components/site.tsx`
- Verify: `src/lib/i18n.ts`
- Verify: `src/lib/seo.ts`
- Verify: `scripts/check-seo.mjs`

- [ ] **Step 1: Run targeted structural checks**

Run:

```powershell
npm run check:application-links
npm run check:ui
npm run typecheck
```

Expected: all commands exit with code `0`.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: Next.js build succeeds and both `/products/mdm300` and `/en/products/mdm300` are generated.

- [ ] **Step 3: Inspect rendered RU and EN pages**

Start the built site on port `3012`:

```powershell
npm start -- -p 3012
```

In a second terminal, fetch the two pages:

```powershell
curl.exe -fsS http://127.0.0.1:3012/en/products/mdm300 -o $env:TEMP/mdm300-en.html
curl.exe -fsS http://127.0.0.1:3012/products/mdm300 -o $env:TEMP/mdm300-ru.html
Select-String -Path $env:TEMP/mdm300-en.html -Pattern "portable dew-point hygrometer","up to 15 minutes","What to specify for selection","MI_MDM300_EN-v9-7.pdf","/en/contact?model="
Select-String -Path $env:TEMP/mdm300-ru.html -Pattern "портативный гигрометр точки росы","не более 15 минут","Что указать для подбора","MI_MDM300_EN-v9-7.pdf","/contact?model="
```

Expected: both requests return HTTP `200`, and every requested phrase is found. Then inspect desktop and mobile screenshots and verify:

- English and Russian pages show the 15/30-minute variant distinction.
- PDF and RFQ links remain present.
- Desktop and mobile screenshots have no overlap or clipped content.

- [ ] **Step 4: Review the diff**

Run:

```powershell
git diff --check
git diff --stat
git status --short
```

Expected: only the plan, SEO check, catalog data, shared product component, translations, and SEO metadata mapping are changed.

- [ ] **Step 5: Commit the complete implementation**

Run:

```powershell
git add docs/superpowers/plans/2026-09-28-mdm300-page-optimization.md scripts/check-seo.mjs src/data/catalog.ts src/components/site.tsx src/lib/i18n.ts src/lib/seo.ts
git commit -m "优化：提升MDM300产品页曝光与询盘转化"
```

Expected: one complete Chinese-language commit and a clean working tree.

