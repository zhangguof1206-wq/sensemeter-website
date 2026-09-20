# SenseMeter Sitewide International Supply Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove Russia-only sales wording from all marketing, SEO and structured-data surfaces while preserving accurate Russian legal language and the existing RFQ email workflow.

**Architecture:** Keep localized visible copy in `src/lib/i18n.ts`, application-specific copy in the four existing application data modules, route metadata in the two homepage route files, and organization JSON-LD in `src/lib/seo.ts`. Update the existing content checks so they enforce international supply language and reject destination-limiting phrases outside legal content.

**Tech Stack:** Next.js 15, TypeScript, Node.js validation scripts, npm release checks.

---

## File Map

- Modify `scripts/check-seo.mjs`: replace Russia-only SEO assertions with international-supply and no-single-country assertions.
- Modify `scripts/check-i18n.mjs`: verify the new Russian and English homepage positioning.
- Modify `src/app/page.tsx`: update Russian homepage metadata.
- Modify `src/app/en/page.tsx`: update English homepage metadata.
- Modify `src/lib/i18n.ts`: update visible Russian and English homepage hero copy.
- Modify `src/data/applications/compressed-air-dew-point.ts`: update RU metadata and RU/EN supply CTA copy.
- Modify `src/data/applications/natural-gas-moisture-monitoring.ts`: update RU metadata and RU/EN supply CTA copy.
- Modify `src/data/applications/industrial-humidity-monitoring.ts`: update RU metadata and RU/EN supply CTA copy.
- Modify `src/data/applications/glove-box-oxygen-analysis.ts`: update RU metadata and RU/EN supply CTA copy.
- Modify `src/lib/seo.ts`: remove the Russia-only `areaServed` value from the sales contact.
- Preserve `src/lib/legal.ts`: its four Russia references describe legal and cross-border data-processing context.

### Task 1: Change the regression checks first

**Files:**
- Modify: `scripts/check-seo.mjs:71-113`
- Modify: `scripts/check-i18n.mjs:105-123`

- [ ] **Step 1: Update the Russian commercial-query requirements**

In `scripts/check-seo.mjs`, replace the destination-specific phrases in `requiredPhrases` with the international supply phrase:

```js
const requiredPhrases = [
  "промышленный измеритель точки росы",
  "преобразователь точки росы",
  "анализатор влажности газа",
  "промышленный датчик влажности",
  "промышленный анализатор кислорода",
  "международная поставка из китая",
  "международную доставку",
  "таможенное оформление"
];
```

- [ ] **Step 2: Add a check that marketing sources do not restrict sales to Russia**

Replace the current Russia-only organization check with these two checks:

```js
{
  name: "Commercial copy does not restrict international supply to Russia",
  pass: () => {
    const source = [
      read("src/app/page.tsx"),
      read("src/app/en/page.tsx"),
      read("src/lib/i18n.ts"),
      readApplicationContent(),
      read("src/lib/seo.ts")
    ].join("\n").toLocaleLowerCase("ru-RU");
    const forbiddenPhrases = [
      "для россии",
      "для российских предприятий",
      "из китая в россию",
      "from china to russia",
      "customers in russia",
      'name: "russia"'
    ];
    return forbiddenPhrases.every((phrase) => !source.includes(phrase));
  }
},
{
  name: "Organization sales contact keeps supported languages without a single-country area",
  pass: () => {
    const seo = read("src/lib/seo.ts");
    return seo.includes('availableLanguage: ["ru", "en"]') &&
      !seo.includes("areaServed:") &&
      !seo.includes('name: "Russia"');
  }
},
```

- [ ] **Step 3: Update the homepage localization check**

Replace the China-to-Russia check in `scripts/check-i18n.mjs` with:

```js
{
  name: "homepage copy states international supply from China in both languages",
  pass: () => {
    const ru = copy.ru.heroText;
    const en = copy.en.heroText;
    return [
      "из Китая",
      "международным заказчикам",
      "международную доставку",
      "страны назначения",
      "коммерческом предложении"
    ].every((phrase) => ru.includes(phrase)) && [
      "from China",
      "international customers",
      "international delivery",
      "destination country",
      "quotation"
    ].every((phrase) => en.includes(phrase));
  }
},
```

- [ ] **Step 4: Run the checks and confirm the new expectations fail against the old copy**

Run:

```powershell
npm run check:seo
npm run check:i18n
```

Expected: both commands fail on the newly changed international-supply checks. This confirms the checks can detect the current Russia-only content.

### Task 2: Update the homepage visible copy and metadata

**Files:**
- Modify: `src/lib/i18n.ts:25-27,119-121`
- Modify: `src/app/page.tsx:7-8`
- Modify: `src/app/en/page.tsx:7-8`

- [ ] **Step 1: Replace the Russian homepage hero copy**

Use:

```ts
heroTitle: "Промышленные датчики и анализаторы для промышленных предприятий",
heroText:
  "SenseMeter поставляет из Китая промышленное измерительное оборудование и комплектующие международным заказчикам: измерители и преобразователи точки росы, анализаторы влажности газа и кислорода, датчики влажности и температуры. Помогаем подобрать модель и совместимые комплектующие, согласовать интеграцию в панели и шкафы, а также OEM- и проектные закупки. В коммерческом предложении подтверждаем наличие и сроки поставки; международную доставку, таможенное оформление и распределение расходов согласовываем с учетом страны назначения и выбранной клиентом схемы.",
```

- [ ] **Step 2: Replace the English homepage hero copy**

Use:

```ts
heroTitle: "Industrial sensors and analyzers for industrial applications",
heroText:
  "SenseMeter supplies industrial measurement instruments and accessories from China to international customers: dew point meters and transmitters, gas moisture and oxygen analyzers, and humidity and temperature sensors. We support model selection, compatible accessories, instrument panel and cabinet integration, and OEM or project procurement. Product availability and lead times are confirmed in each quotation; international delivery, customs clearance and cost allocation are agreed for the destination country and the customer's selected arrangement.",
```

- [ ] **Step 3: Replace Russian homepage metadata**

Use:

```ts
title: "SenseMeter — промышленные датчики и анализаторы",
description: "Измерители точки росы, анализаторы влажности газа и кислорода, промышленные датчики влажности. Подбор и международная поставка из Китая."
```

- [ ] **Step 4: Replace English homepage metadata**

Use:

```ts
title: "SenseMeter — industrial sensors and analyzers",
description: "Dew point meters, gas moisture and oxygen analyzers, and industrial humidity sensors selected and supplied internationally from China."
```

- [ ] **Step 5: Run the homepage localization check**

Run:

```powershell
npm run check:i18n
```

Expected: PASS. The SEO check may still fail until application copy and JSON-LD are updated.

### Task 3: Update the four application pages

**Files:**
- Modify: `src/data/applications/compressed-air-dew-point.ts:15,65,120`
- Modify: `src/data/applications/natural-gas-moisture-monitoring.ts:15,62,114`
- Modify: `src/data/applications/industrial-humidity-monitoring.ts:15,65,120`
- Modify: `src/data/applications/glove-box-oxygen-analysis.ts:15,62,114`

- [ ] **Step 1: Update compressed-air dew-point copy**

```ts
// content.ru
metaDescription: "Промышленные измерители и преобразователи точки росы для сжатого воздуха, осушителей и сухих газов. Подбор и международная поставка из Китая.",
finalCtaText: "Сопоставим газ, давление, диапазон и способ установки с подходящими моделями. Условия международной поставки из Китая, доставки и таможенного оформления согласуем в коммерческом предложении с учетом страны назначения.",
// content.en
finalCtaText: "We will match the gas, pressure, range and installation method with suitable models, then quote international supply from China, with delivery and customs-clearance responsibilities agreed for the destination country.",
```

- [ ] **Step 2: Update natural-gas moisture copy**

```ts
// content.ru
metaDescription: "Анализаторы влажности газа для природного и технологического газа, трубопроводов и газоподготовки. Подбор и международная поставка из Китая.",
finalCtaText: "Проверим состав газа, давление, диапазон, пробоотбор и требования участка. Условия международной поставки из Китая, доставки и таможенного оформления согласуем в коммерческом предложении с учетом страны назначения.",
// content.en
finalCtaText: "We will review gas composition, pressure, range, sampling and site requirements, then quote international supply from China, with delivery and customs responsibilities agreed for the destination country.",
```

- [ ] **Step 3: Update industrial-humidity copy**

```ts
// content.ru
metaDescription: "Промышленные датчики влажности для камер, воздуховодов, помещений и технологических процессов. Подбор и международная поставка из Китая.",
finalCtaText: "Сопоставим среду, монтаж, диапазон, точность и выходной сигнал с подходящими моделями. Условия международной поставки из Китая, доставки и таможенного оформления согласуем в коммерческом предложении с учетом страны назначения.",
// content.en
finalCtaText: "We will match the medium, mounting, range, accuracy and output with suitable models, then quote international supply from China, with delivery and customs responsibilities agreed for the destination country.",
```

- [ ] **Step 4: Update oxygen-analysis copy**

```ts
// content.ru
metaDescription: "Промышленные анализаторы кислорода для контроля чистоты газа, перчаточных боксов, генераторов, печей и линий. Международная поставка из Китая.",
finalCtaText: "Сопоставим газовый фон, диапазон O2, давление, расход и пробоотбор с подходящими моделями. Условия международной поставки из Китая, доставки и таможенного оформления согласуем в коммерческом предложении с учетом страны назначения.",
// content.en
finalCtaText: "We will match gas background, O2 range, pressure, flow and sampling with suitable models, then quote international supply from China, with delivery and customs responsibilities agreed for the destination country.",
```

- [ ] **Step 5: Verify the application data remains structurally valid**

Run:

```powershell
npm run check:applications
```

Expected: PASS with no application-page failures.

### Task 4: Remove the Russia-only organization schema field

**Files:**
- Modify: `src/lib/seo.ts:128-138`

- [ ] **Step 1: Remove only the `areaServed` block**

Leave the contact point as:

```ts
contactPoint: {
  "@type": "ContactPoint",
  contactType: "sales",
  email: "sales@sensemeter.ru",
  availableLanguage: ["ru", "en"]
}
```

- [ ] **Step 2: Run the SEO checks**

Run:

```powershell
npm run check:seo
```

Expected: PASS. The commercial source set contains international-supply language and no Russia-only destination phrase.

### Task 5: Verify scope, email safety and production build

**Files:**
- Verify only; do not modify `src/lib/legal.ts`, RFQ components, API routes or email modules.

- [ ] **Step 1: Confirm Russia references remain only in legal content**

Run:

```powershell
$marketingFiles = @(
  "src/app/page.tsx",
  "src/app/en/page.tsx",
  "src/lib/i18n.ts",
  "src/lib/seo.ts",
  "src/data/applications/compressed-air-dew-point.ts",
  "src/data/applications/natural-gas-moisture-monitoring.ts",
  "src/data/applications/industrial-humidity-monitoring.ts",
  "src/data/applications/glove-box-oxygen-analysis.ts"
)
rg -n -i "росси|russia" $marketingFiles
rg -n -i "росси|russia" src/lib/legal.ts
```

Expected: the first search returns no matches; the legal file returns exactly four matches.

- [ ] **Step 2: Run focused checks**

Run:

```powershell
npm run check:i18n
npm run check:seo
npm run check:applications
npm run check:rfq-email
```

Expected: all checks pass; the RFQ email tests report zero failures.

- [ ] **Step 3: Run the production release build**

Run:

```powershell
npm run build:release
```

Expected: all release checks and `next build` complete successfully.

- [ ] **Step 4: Inspect the final diff**

Run:

```powershell
git diff --check
git diff --stat
git status --short
```

Expected: no whitespace errors; only the planned copy, metadata, schema and validation files are changed.

- [ ] **Step 5: Commit the complete verified change**

```powershell
git add scripts/check-seo.mjs scripts/check-i18n.mjs src/app/page.tsx src/app/en/page.tsx src/lib/i18n.ts src/lib/seo.ts src/data/applications/compressed-air-dew-point.ts src/data/applications/natural-gas-moisture-monitoring.ts src/data/applications/industrial-humidity-monitoring.ts src/data/applications/glove-box-oxygen-analysis.ts
git commit -m "优化：统一全站国际供货定位"
```

Do not deploy. Local verification and the Git commit complete this plan.
