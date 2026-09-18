# Russia Industrial Instrumentation SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变产品目录布局、现有路由和功能的前提下，让 SenseMeter 首页及四个应用页准确覆盖俄罗斯工业仪表采购搜索，并明确从中国向俄罗斯供货的真实业务模式。

**Architecture:** 继续使用现有 Next.js 元数据、双语文案对象和应用页数据模型，不新增页面或展示组件。先扩展本地 SEO/i18n 检查形成可执行的内容合同，再修改首页、四个应用页和 Organization JSON-LD，最后执行全套自动检查与桌面/移动端本地预览。

**Tech Stack:** Next.js 15、React、TypeScript、Node.js 内容检查脚本、Schema.org JSON-LD、Git

---

## File Map

- `scripts/check-seo.mjs`: 锁定俄罗斯目标关键词、供货事实、禁止声明和结构化数据要求。
- `scripts/check-i18n.mjs`: 锁定中俄跨境供货事实的俄英双语一致性。
- `src/app/page.tsx`: 俄语首页 title 与 description。
- `src/app/en/page.tsx`: 英语首页 title 与 description。
- `src/lib/i18n.ts`: 首页 H1、首屏说明及可见商业定位。
- `src/data/applications/compressed-air-dew-point.ts`: 工业露点仪与露点变送器搜索意图。
- `src/data/applications/natural-gas-moisture-monitoring.ts`: 气体湿度分析仪搜索意图。
- `src/data/applications/industrial-humidity-monitoring.ts`: 工业湿度传感器搜索意图。
- `src/data/applications/glove-box-oxygen-analysis.ts`: 工业氧分析仪搜索意图。
- `src/lib/seo.ts`: Organization 销售联系点的俄罗斯服务市场声明。

### Task 1: 建立会失败的俄罗斯市场 SEO 内容合同

**Files:**
- Modify: `scripts/check-seo.mjs`
- Modify: `scripts/check-i18n.mjs`

- [ ] **Step 1: 在 SEO 检查中加入目标词、供货事实与禁止声明**

在 `scripts/check-seo.mjs` 的 `checks` 数组中加入以下检查：

```js
{
  name: "Russian industrial pages cover target commercial queries",
  pass: () => {
    const source = [
      read("src/app/page.tsx"),
      read("src/lib/i18n.ts"),
      readApplicationContent()
    ].join("\n");
    const requiredPhrases = [
      "промышленный измеритель точки росы",
      "преобразователь точки росы",
      "анализатор влажности газа",
      "промышленный датчик влажности",
      "промышленный анализатор кислорода",
      "из Китая в Россию",
      "международную доставку",
      "таможенное оформление"
    ];
    return requiredPhrases.every((phrase) => source.toLocaleLowerCase("ru-RU").includes(phrase));
  }
},
{
  name: "Russian market copy avoids unsupported local-presence claims",
  pass: () => {
    const source = [read("src/lib/i18n.ts"), readApplicationContent()].join("\n").toLocaleLowerCase("ru-RU");
    const forbiddenPhrases = [
      "официальный дистрибьютор",
      "склад в россии",
      "в наличии в россии",
      "российское юридическое лицо",
      "гарантированный срок доставки"
    ];
    return forbiddenPhrases.every((phrase) => !source.includes(phrase));
  }
},
{
  name: "Organization sales contact declares Russia as the served market",
  pass: () => {
    const seo = read("src/lib/seo.ts");
    return seo.includes('areaServed: {') &&
      seo.includes('"@type": "Country"') &&
      seo.includes('name: "Russia"') &&
      seo.includes('availableLanguage: ["ru", "en"]');
  }
}
```

- [ ] **Step 2: 在 i18n 检查中加入跨境供货双语一致性**

在 `scripts/check-i18n.mjs` 的 `checks` 数组中加入：

```js
{
  name: "homepage copy states the confirmed China-to-Russia supply model in both languages",
  pass: () => {
    const ru = copy.ru.heroText;
    const en = copy.en.heroText;
    return [
      "из Китая в Россию",
      "международную доставку",
      "таможенное оформление",
      "коммерческом предложении"
    ].every((phrase) => ru.includes(phrase)) && [
      "from China to Russia",
      "international delivery",
      "customs clearance",
      "quotation"
    ].every((phrase) => en.includes(phrase));
  }
}
```

- [ ] **Step 3: 运行检查并确认它们按预期失败**

Run:

```powershell
npm run check:seo
npm run check:i18n
```

Expected: `check:seo` 至少报告目标查询或 `areaServed` 缺失；`check:i18n` 报告跨境供货双语文案缺失。现有其他检查不得出现新的异常。

### Task 2: 优化首页定位和双语商业事实

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/en/page.tsx`
- Modify: `src/lib/i18n.ts`
- Test: `scripts/check-seo.mjs`
- Test: `scripts/check-i18n.mjs`

- [ ] **Step 1: 更新俄语和英语首页元数据**

`src/app/page.tsx` 使用：

```ts
title: "Промышленные датчики и анализаторы для России",
description: "Измерители точки росы, анализаторы влажности газа и кислорода, промышленные датчики влажности. Подбор и поставка из Китая в Россию."
```

`src/app/en/page.tsx` 使用：

```ts
title: "Industrial sensors and analyzers supplied from China",
description: "Dew point meters, gas moisture and oxygen analyzers, and industrial humidity sensors selected in China and supplied to customers in Russia."
```

- [ ] **Step 2: 更新首页 H1 与首屏说明**

在 `src/lib/i18n.ts` 中替换以下字段：

```ts
// ru
heroTitle: "Промышленные датчики и анализаторы для российских предприятий",
heroText:
  "SenseMeter поставляет из Китая в Россию промышленные измерители и преобразователи точки росы, анализаторы влажности газа и кислорода, датчики влажности и температуры. Помогаем выполнить подбор модели, подобрать совместимые комплектующие, согласовать интеграцию в панели и шкафы, а также OEM- и проектные закупки. Наличие и сроки поставки подтверждаем в коммерческом предложении; международную доставку, таможенное оформление и распределение расходов согласовываем по выбранной клиентом схеме.",

// en
heroTitle: "Industrial sensors and analyzers supplied from China to Russia",
heroText:
  "SenseMeter supplies industrial dew point meters and transmitters, gas moisture and oxygen analyzers, and humidity and temperature sensors from China to Russia. We support model selection, compatible accessories, instrument panel and cabinet integration, and OEM or project procurement. Product availability and lead times are confirmed in each quotation; international delivery, customs clearance and cost allocation are agreed according to the customer's selected arrangement.",
```

- [ ] **Step 3: 运行首页内容检查**

Run:

```powershell
npm run check:seo
npm run check:i18n
```

Expected: 双语供货检查通过；SEO 检查仍只因应用页目标词或结构化数据未完成而失败。

### Task 3: 让四个应用页分别承接一个主要工业查询

**Files:**
- Modify: `src/data/applications/compressed-air-dew-point.ts`
- Modify: `src/data/applications/natural-gas-moisture-monitoring.ts`
- Modify: `src/data/applications/industrial-humidity-monitoring.ts`
- Modify: `src/data/applications/glove-box-oxygen-analysis.ts`
- Test: `scripts/check-seo.mjs`
- Test: `scripts/check-application-pages.mjs`
- Test: `scripts/check-application-backlinks.mjs`

- [ ] **Step 1: 优化压缩空气露点页**

在俄语对象中使用：

```ts
metaTitle: "Промышленный измеритель и преобразователь точки росы",
metaDescription: "Промышленные измерители и преобразователи точки росы для сжатого воздуха, осушителей и сухих газов. Подбор и поставка из Китая в Россию.",
title: "Промышленные измерители точки росы для сжатого воздуха",
lead: "Промышленный измеритель точки росы подходит для переносных проверок, а преобразователь точки росы — для постоянного контроля осушителей, пневмолиний и сухих технологических газов.",
selectionTitle: "Как выбрать измеритель или преобразователь точки росы",
productsTitle: "Измерители и преобразователи точки росы",
finalCtaTitle: "Нужен прибор для контроля точки росы?",
finalCtaText: "Сопоставим газ, давление, диапазон и способ установки с подходящими моделями. Поставку из Китая в Россию, международную доставку и поддержку таможенного оформления согласуем в коммерческом предложении.",
```

在英语对象中仅同步商业事实：

```ts
finalCtaText: "We will match the gas, pressure, range and installation method with suitable models, then quote supply from China to Russia with the selected international delivery and customs-clearance arrangement.",
```

- [ ] **Step 2: 优化气体湿度分析页**

在俄语对象中使用：

```ts
metaTitle: "Анализатор влажности газа и точки росы",
metaDescription: "Анализаторы влажности газа для природного и технологического газа, трубопроводов и газоподготовки. Подбор и поставка из Китая в Россию.",
title: "Анализаторы влажности газа для промышленных процессов",
lead: "Анализатор влажности газа контролирует содержание влаги и точку росы в природном и технологическом газе, трубопроводах, системах газоподготовки и опасных зонах.",
selectionTitle: "Как выбрать анализатор влажности газа",
productsTitle: "Анализаторы влажности газа и точки росы",
finalCtaTitle: "Нужен анализатор влажности для газовой системы?",
finalCtaText: "Проверим состав газа, давление, диапазон, пробоотбор и требования участка. Условия поставки из Китая в Россию, международной доставки и таможенного оформления зафиксируем в коммерческом предложении.",
```

在英语对象中使用：

```ts
finalCtaText: "We will review gas composition, pressure, range, sampling and site requirements, then quote supply from China to Russia with the selected delivery and customs responsibilities.",
```

- [ ] **Step 3: 优化工业湿度传感器页**

在俄语对象中使用：

```ts
metaTitle: "Промышленные датчики влажности и температуры",
metaDescription: "Промышленные датчики влажности для камер, воздуховодов, помещений и технологических процессов. Подбор и поставка из Китая в Россию.",
title: "Промышленные датчики влажности и температуры",
lead: "Промышленный датчик влажности обеспечивает стационарный контроль в производственных процессах, климатических камерах, воздуховодах, чистых помещениях и технических системах.",
selectionTitle: "Как выбрать промышленный датчик влажности",
productsTitle: "Промышленные датчики и преобразователи влажности",
finalCtaTitle: "Нужен датчик влажности для ваших условий?",
finalCtaText: "Сопоставим среду, монтаж, диапазон, точность и выходной сигнал с подходящими моделями. Международную доставку из Китая в Россию и поддержку таможенного оформления включим по выбранной заказчиком схеме.",
```

在英语对象中使用：

```ts
finalCtaText: "We will match the medium, mounting, range, accuracy and output with suitable models, then quote supply from China to Russia under the customer's selected delivery and customs arrangement.",
```

- [ ] **Step 4: 优化工业氧分析仪页**

在俄语对象中使用：

```ts
metaTitle: "Промышленный анализатор кислорода для чистых газов",
metaDescription: "Промышленные анализаторы кислорода для контроля чистоты газа, перчаточных боксов, генераторов, печей и линий. Поставка из Китая в Россию.",
title: "Промышленные анализаторы кислорода для контроля чистоты газа",
lead: "Промышленный анализатор кислорода измеряет O2 в инертных и чистых газах, перчаточных боксах, генераторах, печах и производственных линиях.",
selectionTitle: "Как выбрать промышленный анализатор кислорода",
productsTitle: "Промышленные анализаторы кислорода",
finalCtaTitle: "Нужен анализатор кислорода для газовой системы?",
finalCtaText: "Сопоставим газовый фон, диапазон O2, давление, расход и пробоотбор с подходящими моделями. Поставку из Китая в Россию, транспорт и таможенные обязанности согласуем при подготовке предложения.",
```

在英语对象中使用：

```ts
finalCtaText: "We will match gas background, O2 range, pressure, flow and sampling with suitable models, then quote supply from China to Russia with agreed transport and customs responsibilities.",
```

- [ ] **Step 5: 运行应用页检查**

Run:

```powershell
npm run check:applications
npm run check:application-links
npm run check:seo
```

Expected: 应用页结构和内部链接检查通过；SEO 检查只剩 `areaServed`（若尚未执行 Task 4）失败。

### Task 4: 补充准确的 Organization 服务市场结构化数据

**Files:**
- Modify: `src/lib/seo.ts`
- Test: `scripts/check-seo.mjs`

- [ ] **Step 1: 为销售联系点增加俄罗斯服务市场**

将 `contactPoint` 保持为销售联系点，并增加：

```ts
contactPoint: {
  "@type": "ContactPoint",
  contactType: "sales",
  email: "sales@sensemeter.ru",
  areaServed: {
    "@type": "Country",
    name: "Russia"
  },
  availableLanguage: ["ru", "en"]
}
```

不得增加 `LocalBusiness`、俄罗斯地址、本地仓库、库存、固定运费或固定交期。

- [ ] **Step 2: 运行内容与类型检查**

Run:

```powershell
npm run check:seo
npm run check:i18n
npm run check:applications
npm run check:application-links
npm run typecheck
```

Expected: 全部退出码为 `0`，目标查询、商业事实和结构化数据检查全部显示 `OK`。

- [ ] **Step 3: 提交完整可用的 SEO 修改**

```powershell
git add scripts/check-seo.mjs scripts/check-i18n.mjs src/app/page.tsx src/app/en/page.tsx src/lib/i18n.ts src/lib/seo.ts src/data/applications/compressed-air-dew-point.ts src/data/applications/natural-gas-moisture-monitoring.ts src/data/applications/industrial-humidity-monitoring.ts src/data/applications/glove-box-oxygen-analysis.ts
git commit -m "优化：完善俄罗斯工业仪表市场SEO内容"
```

### Task 5: 完整构建和本地视觉验收

**Files:**
- Verify only; no deployment files are modified.

- [ ] **Step 1: 执行生产构建**

Run:

```powershell
npm run build
```

Expected: Next.js production build succeeds，首页和现有应用路由均成功生成。

- [ ] **Step 2: 启动本地预览**

Run:

```powershell
npm run dev -- -p 3012
```

Expected: `http://localhost:3012/` 可访问；若端口已占用，先识别现有进程是否属于当前仓库，再决定复用或改用空闲端口。

- [ ] **Step 3: 检查桌面和移动端页面**

逐一检查以下路由：

```text
/
/en
/applications/compressed-air-dew-point
/applications/natural-gas-moisture-monitoring
/applications/industrial-humidity-monitoring
/applications/glove-box-oxygen-analysis
```

验收尺寸为桌面 `1440x1000` 和移动端 `390x844`。确认 H1、首屏说明和 CTA 无重叠、截断或溢出，原动态背景、产品目录布局、导航、语言切换、RFQ 和 PDF 功能未被改变。

- [ ] **Step 4: 检查最终差异和仓库状态**

Run:

```powershell
git diff --check
git status --short
git log -2 --oneline
```

Expected: `git diff --check` 无输出；工作区干净；最新代码提交为 `优化：完善俄罗斯工业仪表市场SEO内容`。此次工作只完成本地代码和本地验证，不代表线上部署或搜索引擎已收录。
