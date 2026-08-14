# SenseMeter 应用页工业化视觉改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 5 个俄文和 5 个英文应用详情页统一改造成已确认的工业图片型布局，同时保留当前顶部、URL、SEO 元信息、应用事实、推荐产品与询价路径。

**Architecture:** 使用一个共享页面组合器和五个职责单一的展示组件；每个应用主题在独立数据文件中成对维护 RU/EN 内容。五个俄文静态路由和英文动态路由都只负责读取数据、生成 metadata 和渲染共享页面，避免继续维护约 1500 行重复俄文页面代码。

**Tech Stack:** Next.js 15 App Router、React 19、TypeScript、Tailwind CSS、Next Image、现有 Node 检查脚本、Chrome/Playwright 本地视觉验收、Ubuntu VPS / PM2 人工发布。

---

## 文件结构

**新增：**

- `src/data/applications/types.ts`：应用页的数据合同。
- `src/data/applications/index.ts`：按 slug 和 locale 读取内容并导出静态参数。
- `src/data/applications/industrial-humidity-monitoring.ts`：工业湿度 RU/EN 内容与图片。
- `src/data/applications/compressed-air-dew-point.ts`：压缩空气露点 RU/EN 内容与图片。
- `src/data/applications/glove-box-oxygen-analysis.ts`：手套箱氧分析 RU/EN 内容与图片。
- `src/data/applications/natural-gas-moisture-monitoring.ts`：天然气湿度 RU/EN 内容与图片。
- `src/data/applications/climate-chamber-humidity.ts`：环境试验箱 RU/EN 内容与图片。
- `src/components/applications/application-page.tsx`：共享页面组合器。
- `src/components/applications/application-hero.tsx`：首屏、面包屑和首屏摘要。
- `src/components/applications/application-scenarios.tsx`：应用价值说明与非对称场景图片网格。
- `src/components/applications/application-selection.tsx`：深色工程选型区和 RFQ 参数清单。
- `src/components/applications/application-products.tsx`：应用页专用推荐产品组合。
- `src/components/applications/application-faq.tsx`：FAQ、图片询价和最终 CTA。

**修改：**

- `src/app/applications/*/page.tsx`：五个俄文路由改为轻量包装页。
- `src/app/en/applications/[slug]/page.tsx`：英文动态路由切换到新的双语数据入口。
- `src/app/globals.css`：应用页图片动效、锚点偏移和减少动态效果规则。
- `src/lib/seo.ts`：新增应用页面包屑 JSON-LD，并更新应用页修改日期。
- `scripts/check-application-pages.mjs`：检查共享结构、双语数据、图片、路由和可见标签。
- `scripts/check-application-backlinks.mjs`：从新的应用数据文件读取推荐产品关系。

**删除：**

- `src/components/application-page.tsx`：由新的 `components/applications/` 组件组替代。
- `src/data/application-page-content.ts`：由五个配对双语数据文件替代。

## Task 1: 建立改版合同检查和现有基线

**Files:**
- Modify: `scripts/check-application-pages.mjs`
- Modify: `scripts/check-application-backlinks.mjs`

- [ ] **Step 1: 记录当前基线**

Run:

```powershell
npm run check:applications
npm run check:application-links
npm run check:ui
npm run check:i18n
npm run typecheck
```

Expected: 五项均以 `passed` 或退出码 `0` 结束。

- [ ] **Step 2: 将应用页检查改为新架构合同**

在 `scripts/check-application-pages.mjs` 中保留五个 slug 列表，并把旧的 `recommendedSlugs`、`faqJsonLd` 必须存在于俄文路由文件中的检查替换为以下合同：

```js
const requiredComponentFiles = [
  "application-page.tsx",
  "application-hero.tsx",
  "application-scenarios.tsx",
  "application-selection.tsx",
  "application-products.tsx",
  "application-faq.tsx"
];

const requiredSectionNames = [
  "ApplicationHero",
  "ApplicationScenarios",
  "ApplicationSelection",
  "ApplicationProducts",
  "ApplicationFaq"
];
```

检查内容必须包括：

- `src/components/applications/application-page.tsx` 使用 `PageShell` 和五个区块组件。
- 每个 `src/data/applications/<slug>.ts` 同时包含 `ru`、`en`、`recommendedSlugs`、`heroImage`、`scenarioImage` 和 `ctaImage`。
- 五个俄文路由使用 `getApplicationPage(slug, "ru")`、`ApplicationPage` 和 `/en/applications/<slug>`。
- 英文动态路由继续包含 `generateStaticParams`、`generateMetadata` 和 `ApplicationPage`。
- 旧的 `src/components/application-page.tsx` 与 `src/data/application-page-content.ts` 不再存在。
- 俄文数据中不出现可见的 `Application overview`、`Selection path`、`Recommended products`、`Common questions`。
- 所有数据中引用的 `/assets/application-*` 文件在 `public` 中存在。

- [ ] **Step 3: 更新反向链接检查的数据来源**

在 `scripts/check-application-backlinks.mjs` 中将每个俄文路由文件的解析位置改为对应数据文件：

```js
const applicationDataFile = join(root, "src", "data", "applications", `${page}.ts`);
const pageSource = readFileSync(applicationDataFile, "utf8");
const pathMatch = pageSource.match(/path:\s*"([^"]+)"/);
const slugBlockMatch = pageSource.match(/recommendedSlugs:\s*\[([^\]]+)\]/s);
```

继续要求每个推荐产品在 `src/data/application-links.ts` 中反向链接到对应应用页。

- [ ] **Step 4: 运行检查并确认按预期失败**

Run:

```powershell
npm run check:applications
npm run check:application-links
```

Expected: `check:applications` 因新组件和新数据文件尚未创建而 FAIL；`check:application-links` 因新数据文件尚未创建而 FAIL。此时不提交代码。

## Task 2: 建立配对双语应用数据

**Files:**
- Create: `src/data/applications/types.ts`
- Create: `src/data/applications/index.ts`
- Create: `src/data/applications/industrial-humidity-monitoring.ts`
- Create: `src/data/applications/compressed-air-dew-point.ts`
- Create: `src/data/applications/glove-box-oxygen-analysis.ts`
- Create: `src/data/applications/natural-gas-moisture-monitoring.ts`
- Create: `src/data/applications/climate-chamber-humidity.ts`

- [ ] **Step 1: 定义严格数据合同**

在 `src/data/applications/types.ts` 创建以下类型，不使用可选字段隐藏内容缺失：

```ts
import type { Locale } from "@/data/catalog";

export type ApplicationScenario = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

export type LocalizedApplicationPage = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  title: string;
  lead: string;
  primaryButton: string;
  secondaryButton: string;
  breadcrumbs: { home: string; applications: string };
  heroFacts: Array<{ title: string; text: string }>;
  overviewTitle: string;
  overviewText: string;
  scenariosTitle: string;
  scenariosLead: string;
  scenarios: ApplicationScenario[];
  selectionTitle: string;
  selectionLead: string;
  selectionCards: Array<{ title: string; text: string }>;
  rfqTitle: string;
  rfqPoints: string[];
  productsEyebrow: string;
  productsTitle: string;
  productsLead: string;
  productLinkLabel: string;
  faqsEyebrow: string;
  faqsTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  advisorTitle: string;
  advisorText: string;
  advisorButton: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaButton: string;
};

export type ApplicationPageRecord = {
  slug: string;
  path: string;
  heroImage: string;
  scenarioImage: string;
  ctaImage: string;
  recommendedSlugs: string[];
  content: Record<Locale, LocalizedApplicationPage>;
};
```

- [ ] **Step 2: 按应用主题迁移现有内容**

每个数据文件导出一个 `ApplicationPageRecord`。内容来源固定如下，不重新创作技术事实：

| 数据文件 | 俄文来源 | 英文来源 |
| --- | --- | --- |
| `industrial-humidity-monitoring.ts` | `src/app/applications/industrial-humidity-monitoring/page.tsx` | 旧 `application-page-content.ts` 同 slug 项 |
| `compressed-air-dew-point.ts` | `src/app/applications/compressed-air-dew-point/page.tsx` | 旧 `application-page-content.ts` 同 slug 项 |
| `glove-box-oxygen-analysis.ts` | `src/app/applications/glove-box-oxygen-analysis/page.tsx` | 旧 `application-page-content.ts` 同 slug 项 |
| `natural-gas-moisture-monitoring.ts` | `src/app/applications/natural-gas-moisture-monitoring/page.tsx` | 旧 `application-page-content.ts` 同 slug 项 |
| `climate-chamber-humidity.ts` | `src/app/applications/climate-chamber-humidity/page.tsx` | 旧 `application-page-content.ts` 同 slug 项 |

每个 `scenarios` 固定为 5 项：优先使用现有 overview、3 个 highlight 和一个安装或服务场景；每项文字只能由同页现有文字压缩组合。四个 `selectionCards` 必须保持现有 process cards 的顺序；`rfqPoints` 原样保留。

- [ ] **Step 3: 固定现有图片和推荐产品关系**

使用以下项目内图片，不新增外部资源：

| slug | heroImage | scenarioImage | ctaImage |
| --- | --- | --- | --- |
| `industrial-humidity-monitoring` | `/assets/application-industrial-humidity-monitoring-v2.png` | `/assets/application-humidity-lab-user.png` | `/assets/application-humidity-lab-user.png` |
| `compressed-air-dew-point` | `/assets/application-gas-processing.png` | `/assets/application-compressed-air-user.png` | `/assets/application-compressed-air-user.png` |
| `glove-box-oxygen-analysis` | `/assets/application-gas-manufacturing.png` | `/assets/application-glove-box-user.png` | `/assets/application-glove-box-user.png` |
| `natural-gas-moisture-monitoring` | `/assets/application-gas-processing.png` | `/assets/application-natural-gas-inline.png` | `/assets/application-natural-gas-cta.png` |
| `climate-chamber-humidity` | `/assets/application-climate-chamber-lab.png` | `/assets/application-climate-chamber-inline.png` | `/assets/application-climate-chamber-lab.png` |

`recommendedSlugs` 逐项复制当前页面值，保持顺序不变。

- [ ] **Step 4: 创建读取入口并检查类型**

`src/data/applications/index.ts` 显式导入五个记录并导出：

```ts
export const applicationPages = [
  industrialHumidityMonitoring,
  compressedAirDewPoint,
  gloveBoxOxygenAnalysis,
  naturalGasMoistureMonitoring,
  climateChamberHumidity
];

export function getApplicationPage(slug: string, locale: Locale) {
  const page = applicationPages.find((item) => item.slug === slug);
  return page ? { ...page, locale, copy: page.content[locale] } : undefined;
}

export type ResolvedApplicationPage = NonNullable<ReturnType<typeof getApplicationPage>>;
```

Run: `npm run typecheck`

Expected: PASS；新数据暂未接入路由，不改变现有页面。

## Task 3: 实现共享工业化页面组件

**Files:**
- Create: `src/components/applications/application-page.tsx`
- Create: `src/components/applications/application-hero.tsx`
- Create: `src/components/applications/application-scenarios.tsx`
- Create: `src/components/applications/application-selection.tsx`
- Create: `src/components/applications/application-products.tsx`
- Create: `src/components/applications/application-faq.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 创建共享页面组合器**

`ApplicationPage` 接收 `ResolvedApplicationPage`，继续将 `PageShell` 作为唯一外层。`ApplicationJsonLd` 作为 `application-page.tsx` 内部私有函数，不再增加单独文件：

```tsx
<PageShell locale={page.locale} active="catalog" languagePath={languagePath}>
  <ApplicationJsonLd page={page} />
  <ApplicationHero page={page} />
  <ApplicationScenarios page={page} />
  <ApplicationSelection page={page} />
  <ApplicationProducts page={page} products={recommendedProducts} />
  <ApplicationFaq page={page} />
</PageShell>
```

推荐产品必须通过 `recommendedSlugs` 从 `products` 读取，并过滤不存在的型号；不得复制产品参数到应用数据。

- [ ] **Step 2: 实现首屏并保留原顶部**

`application-hero.tsx` 使用 `next/image` 的 `fill`、`priority` 和 `sizes="100vw"`。首屏结构固定为：可见面包屑、eyebrow、H1、lead、两个按钮和两项 `heroFacts`。禁止在此组件创建 header、nav、语言切换或搜索框。

关键布局类：

```tsx
<section className="relative isolate min-h-[560px] overflow-hidden bg-[#102235] text-white">
  <Image fill priority sizes="100vw" className="object-cover" ... />
  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,28,45,.94)_0%,rgba(10,28,45,.72)_52%,rgba(10,28,45,.18)_100%)]" />
  <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 md:px-10">
    {/* breadcrumb, copy and actions */}
  </div>
</section>
```

- [ ] **Step 3: 实现价值说明和非对称场景网格**

`application-scenarios.tsx` 分为两个语义 section。价值说明桌面使用 `grid-cols-[360px_64px_1fr]`，移动端改为单列并隐藏纯装饰分隔符。场景区桌面使用三列，第一项跨两行；图片分别使用稳定的 `aspect-ratio` 或明确高度。场景项使用 `<article>`，图片 alt 来自数据，不把应用场景写成客户案例。

- [ ] **Step 4: 实现深色工程选型区**

`application-selection.tsx` 使用一张右侧背景图和左侧深蓝渐隐层。四个 selection card 使用二维网格，RFQ 参数清单位于卡片下方并保持可见文本。移动端背景覆盖全区、遮罩提高到不低于 `rgba(16,34,53,.9)`，所有卡片单列显示。

- [ ] **Step 5: 实现应用页专用产品组合**

`application-products.tsx` 不改通用 `ProductCard`。第 1 个产品作为 feature，第 2、3 个作为横向重点项，第 4、5 个作为简洁产品项；少于 5 个产品时使用数组切片自然收缩，不渲染空容器。图片通过 `assetPath(product.image)` 读取，名称、品牌和参数读取 `Product` 数据。

用于规格摘要的代码固定为：

```tsx
const specs = product.params[locale].slice(0, 3);
```

所有产品项链接到 `localizedPath(locale, `/products/${product.slug}`)`。

- [ ] **Step 6: 实现 FAQ、图片询价和最终 CTA**

`application-faq.tsx` 用语义 `<section>` 输出全部问题和答案，右侧 advisor 使用 `ctaImage`。页面末尾 CTA 链接到：

```ts
localizedPath(locale, "/contact") + `?application=${page.slug}`
```

FAQ 不使用默认折叠，确保答案在服务端 HTML 中可见。

- [ ] **Step 7: 添加有限的应用页样式**

`src/app/globals.css` 只添加以下样式职责：锚点滚动偏移、场景图片轻微 hover、产品图片 hover，以及 reduced-motion 关闭变化。不添加视差、自动轮播或依赖 viewport 宽度的字体缩放。

```css
.application-anchor { scroll-margin-top: 96px; }
.application-scene-image,
.application-product-image { transition: transform .28s ease; }
@media (hover: hover) { .group:hover .application-scene-image, .group:hover .application-product-image { transform: scale(1.025); } }
@media (prefers-reduced-motion: reduce) { .application-scene-image, .application-product-image { transition: none; transform: none !important; } }
```

Run: `npm run typecheck`

Expected: PASS。

## Task 4: 迁移俄英路由和结构化数据

**Files:**
- Modify: `src/app/applications/industrial-humidity-monitoring/page.tsx`
- Modify: `src/app/applications/compressed-air-dew-point/page.tsx`
- Modify: `src/app/applications/glove-box-oxygen-analysis/page.tsx`
- Modify: `src/app/applications/natural-gas-moisture-monitoring/page.tsx`
- Modify: `src/app/applications/climate-chamber-humidity/page.tsx`
- Modify: `src/app/en/applications/[slug]/page.tsx`
- Modify: `src/lib/seo.ts`
- Delete: `src/components/application-page.tsx`
- Delete: `src/data/application-page-content.ts`

- [ ] **Step 1: 新增应用面包屑 JSON-LD**

在 `src/lib/seo.ts` 增加 `applicationBreadcrumbJsonLd(locale, path, title)`，输出 Home、Applications、当前应用三层；URL 使用 `localizedCanonical` 和 `absoluteUrl`。将 `applicationPageLastModified` 更新为 `2026-08-14`。

- [ ] **Step 2: 迁移五个俄文路由**

每个俄文 `page.tsx` 只保留 metadata 和页面调用。压缩空气页面的最终结构作为五页统一模板：

```tsx
import { ApplicationPage } from "@/components/applications/application-page";
import { getApplicationPage } from "@/data/applications";
import { staticPageMetadata } from "@/lib/seo";

const slug = "compressed-air-dew-point";
const page = getApplicationPage(slug, "ru");
if (!page) throw new Error(`Missing RU application page: ${slug}`);

export const metadata = staticPageMetadata({
  locale: "ru",
  path: page.path,
  title: page.copy.metaTitle,
  description: page.copy.metaDescription,
  image: page.heroImage
});

export default function Page() {
  return <ApplicationPage page={page} languagePath={`/en${page.path}`} />;
}
```

其余四页只替换 slug。现有 title、description、FAQ、推荐产品和 RFQ 文案必须已在对应数据文件中完整迁移后才能删除旧代码。

- [ ] **Step 3: 迁移英文动态路由**

英文路由的 `generateStaticParams` 从 `applicationPages` 生成；metadata 和页面渲染均使用 `getApplicationPage(slug, "en")`。未知 slug 继续调用 `notFound()`，渲染时传入 `languagePath={page.path}`，保证 EN 切换按钮返回对应俄文应用页。

- [ ] **Step 4: 输出一致的 JSON-LD**

`application-page.tsx` 服务端输出两个 script：

- `FAQPage`：严格来自 `page.copy.faqs`。
- `BreadcrumbList`：调用 `applicationBreadcrumbJsonLd(page.locale, page.path, page.copy.title)`。

所有 JSON 继续使用 `.replace(/</g, "\\u003c")`。

- [ ] **Step 5: 删除旧共享文件并验证**

删除旧 `src/components/application-page.tsx` 和 `src/data/application-page-content.ts`，确认全仓无旧导入：

Run:

```powershell
rg -n "@/components/application-page|@/data/application-page-content" src
npm run typecheck
```

Expected: `rg` 无输出；typecheck PASS。

## Task 5: 修复自动检查并验证 SEO/GEO 合同

**Files:**
- Modify: `scripts/check-application-pages.mjs`
- Modify: `scripts/check-application-backlinks.mjs`

- [ ] **Step 1: 运行应用检查**

Run:

```powershell
npm run check:applications
npm run check:application-links
```

Expected: 两项 PASS。若失败，只修复真实的路径、数据、图片、语言或链接问题，不放宽合同来掩盖缺陷。

- [ ] **Step 2: 检查双语和 SEO**

Run:

```powershell
npm run check:i18n
npm run check:seo
npm run check:yandex-urls
```

Expected: 三项 PASS；应用 URL 数量、canonical/hreflang 和 Yandex URL 列表保持不变。

- [ ] **Step 3: 检查目录与推荐产品数据**

Run:

```powershell
npm run check:catalog
npm run check:accessories
```

Expected: 两项 PASS；所有推荐产品 slug 仍可在目录中解析。

## Task 6: 响应式视觉验收和生产构建

**Files:**
- Modify only if verification exposes a real issue: `src/components/applications/*.tsx`, `src/app/globals.css`

- [ ] **Step 1: 启动本地预览**

Run: `npm run dev -- --hostname 127.0.0.1 --port 3012`

Expected: Next.js 在 `http://127.0.0.1:3012` ready；端口占用时使用 3013，并记录实际地址。

- [ ] **Step 2: 检查全部 10 个应用 URL**

逐一访问 5 个俄文 URL 和 `/en` 对应 URL，确认 HTTP 200、图片加载、语言切换、推荐产品链接和询价参数正确。不得把本地 200 描述为线上部署成功。

- [ ] **Step 3: 桌面端截图验收**

Chrome/Playwright 使用 `1440x1100` 截取完整页面，至少保存：

- 俄文压缩空气页面。
- 英文压缩空气页面。
- 俄文天然气页面。

检查顶部完全沿用 `PageShell`、首屏不遮挡、非对称图片网格完整、深色选型区文字可读、产品图片不裁切、FAQ 与 CTA 没有重叠。

- [ ] **Step 4: 移动端截图验收**

使用 `390x844` 检查俄文压缩空气和英文工业湿度页面。浏览器断言：

```js
document.documentElement.scrollWidth === document.documentElement.clientWidth
```

Expected: `true`；按钮文字、俄文长词、产品名称、FAQ 和顶部语言切换均不溢出。

- [ ] **Step 5: 执行完整发布构建**

Run:

```powershell
npm run typecheck
npm run build:release
```

Expected: typecheck PASS；所有 release checks PASS；Next.js production build 和 postbuild 成功。

## Task 7: 提交完整代码并停在发布关口

**Files:**
- All files changed by Tasks 1-6

- [ ] **Step 1: 检查提交范围**

Run:

```powershell
git diff --check
git status --short
git diff --stat
```

Expected: 无空白错误；只包含应用页数据、组件、路由、检查脚本、SEO 日期和应用页 CSS。

- [ ] **Step 2: 提交一个完整可用版本**

中间失败状态不提交。所有检查和构建通过后执行：

```powershell
git add src/app/applications src/app/en/applications src/components/applications src/data/applications src/app/globals.css src/lib/seo.ts scripts/check-application-pages.mjs scripts/check-application-backlinks.mjs
git add -u src/components/application-page.tsx src/data/application-page-content.ts
git commit -m "重构双语应用页工业化视觉布局"
```

Expected: 一个中文提交，提交后工作区 clean。

- [ ] **Step 3: 向用户提供本地验收结果**

提供本地 URL、桌面与移动端截图、检查结果和提交号。明确说明尚未部署服务器。

- [ ] **Step 4: 等待用户批准发布**

用户确认本地页面后，才提供 `/var/www/sensemeter-website-new` 的备份、上传、安装、构建、`pm2 restart sensemeter-website`、`pm2 save` 和线上 HTTP 验证步骤。用户自行登录 Ubuntu VPS 执行；发布前不提交 Yandex 重新抓取。

---

## 实施顺序与提交策略

Tasks 1-6 在同一工作区连续完成，因为数据、路由和检查脚本在迁移中会短暂不同步。为满足“每次提交都完整可用”，不提交中间失败状态；完整检查、生产构建和视觉验收全部通过后，在 Task 7 创建一个中文功能提交。

## 最终自检

- 规格覆盖：保留顶部、10 个双语应用页、工业图片布局、产品区、FAQ、SEO/GEO、移动端和 PM2 人工发布关口均有对应任务。
- 边界明确：不改首页、目录、产品详情、配件页和询价表单字段。
- 数据一致：页面组件只读取应用数据与产品目录，不复制产品规格。
- 无待定项：文件、路由、图片、检查命令、验收尺寸和提交信息均已明确。
