# SenseMeter 外贸型首页与目录体验 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在保留 SenseMeter 现有配色和工业视频首屏的前提下，完成采购导向首页、产品目录下拉导航、可信实力模块、采购型产品卡、询价增强和配件页面修正。

**Architecture:** 将过大的 `src/components/site.tsx` 中首页和目录职责拆到 `home/`、`navigation/`、`catalog/` 三个目录，`PageShell` 继续负责全站框架。双语首页文案集中到 `src/data/home-content.ts`，采购表单字段继续通过 `src/lib/i18n.ts` 管理。配件本批只修正导航归属、图片显示和重复模块；缺少真实型号资料的新配件大类采用询价型入口，不虚构产品详情。

**Tech Stack:** Next.js 15 App Router、React 19、TypeScript、Tailwind CSS、现有 Node 检查脚本、Playwright 浏览器验收。

---

## 文件结构

**新增：**

- `src/components/navigation/catalog-menu.tsx`：可键盘和触摸操作的产品目录下拉菜单。
- `src/components/home/home-page.tsx`：首页组合入口。
- `src/components/home/brand-category-grid.tsx`：四品牌主要类别。
- `src/components/home/capability-note.tsx`：一句话能力说明。
- `src/components/home/strength-section.tsx`：四段交错式实力模块。
- `src/components/catalog/catalog-page.tsx`：目录筛选与产品列表。
- `src/components/catalog/product-card.tsx`：采购导向产品卡。
- `src/components/documents/document-download.tsx`：可信 PDF 下载组件。
- `src/data/home-content.ts`：俄英首页与实力模块文案、图片映射。
- `scripts/check-trade-redesign.mjs`：本次改版合同检查。

**修改：**

- `src/components/site.tsx`：保留 `PageShell`、详情页和通用页面，接入下拉菜单并移除首页、目录实现。
- `src/app/page.tsx`、`src/app/en/page.tsx`：改用新的首页组件。
- `src/app/catalog/page.tsx`、`src/app/en/catalog/page.tsx`：改用新的目录组件。
- `src/lib/i18n.ts`：英雄说明、实力、询价和文档状态文案。
- `src/components/rfq-form.tsx`：采购字段、预填、发送状态与替代联系。
- `src/components/accessories/accessories-index-page.tsx`：删除重复服务带和正文切换框。
- `src/components/accessories/accessory-cards.tsx`：统一配件图片容器。
- `src/components/accessories/accessory-category-page.tsx`：统一产品图和询价入口。
- `src/components/accessories/accessory-detail-page.tsx`：统一产品图和文档提示。
- `src/app/globals.css`：下拉菜单、交错模块和减少动态效果规则。
- `scripts/check-ui.mjs`、`scripts/check-i18n.mjs`、`scripts/check-accessories.mjs`、`scripts/check-seo.mjs`：更新自动检查。
- `package.json`：增加 `check:trade-redesign`。

## Task 1: 建立失败检查与基线

**Files:**
- Create: `scripts/check-trade-redesign.mjs`
- Modify: `package.json`
- Modify: `scripts/check-ui.mjs`

- [ ] **Step 1: 写入改版合同检查**

创建 `scripts/check-trade-redesign.mjs`，检查明确的代码边界和禁止项：

```js
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const files = {
  shell: "src/components/site.tsx",
  home: "src/components/home/home-page.tsx",
  content: "src/data/home-content.ts",
  menu: "src/components/navigation/catalog-menu.tsx",
  catalog: "src/components/catalog/catalog-page.tsx",
  productCard: "src/components/catalog/product-card.tsx",
  rfq: "src/components/rfq-form.tsx",
  accessories: "src/components/accessories/accessories-index-page.tsx"
};

const missing = Object.values(files).filter((path) => !existsSync(join(root, path)));
const failures = [];
if (missing.length) failures.push(`missing files: ${missing.join(", ")}`);

if (!missing.length) {
  const shell = read(files.shell);
  const home = read(files.home);
  const content = read(files.content);
  const menu = read(files.menu);
  const catalog = read(files.catalog);
  const rfq = read(files.rfq);
  const accessories = read(files.accessories);
  if (!shell.includes("<CatalogMenu")) failures.push("catalog dropdown missing");
  if (shell.includes("export function HomePage")) failures.push("HomePage still coupled to site.tsx");
  if (!home.includes("<StrengthSection")) failures.push("strength section missing");
  if (!content.includes("Product availability and lead times are confirmed with each quotation.")) failures.push("approved hero copy missing");
  if (!content.includes('id: "supply"') || !content.includes('id: "afterSales"')) failures.push("strength copy incomplete");
  if (!menu.includes('localizedPath(locale, "/catalog")') || !menu.includes('localizedPath(locale, "/accessories")')) failures.push("catalog destinations incomplete");
  if (catalog.includes("ProductCatalogSwitch")) failures.push("catalog page switch remains");
  if (accessories.includes("ProductCatalogSwitch") || accessories.includes("AccessoryServiceBand")) failures.push("accessory duplication remains");
  if (!rfq.includes('name="Preferred Trade Terms"') || !rfq.includes('name="Telegram"')) failures.push("RFQ procurement fields missing");
  if (rfq.includes("WhatsApp")) failures.push("unsupported WhatsApp copy remains");
}

if (failures.length) {
  failures.forEach((failure) => console.error(`FAIL ${failure}`));
  process.exit(1);
}
console.log("Trade redesign check passed.");
```

- [ ] **Step 2: 注册检查命令**

在 `package.json` 的 scripts 中加入：

```json
"check:trade-redesign": "node scripts/check-trade-redesign.mjs"
```

- [ ] **Step 3: 运行失败检查**

Run: `npm run check:trade-redesign`

Expected: FAIL，至少报告缺少 `home-page.tsx`、`catalog-menu.tsx` 和 `home-content.ts`。

- [ ] **Step 4: 记录现有基线**

Run:

```powershell
npm run check:ui
npm run check:i18n
npm run check:accessories
npm run typecheck
```

Expected: 四项现有检查全部 PASS。

- [ ] **Step 5: 提交失败检查**

```powershell
git add package.json scripts/check-trade-redesign.mjs scripts/check-ui.mjs
git commit -m "增加外贸型首页改版检查"
```

## Task 2: 产品目录下拉导航

**Files:**
- Create: `src/components/navigation/catalog-menu.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/components/catalog/product-catalog-switch.tsx`（完成迁移后删除）
- Modify: `src/components/accessories/accessories-index-page.tsx`
- Test: `scripts/check-ui.mjs`

- [ ] **Step 1: 在 UI 检查中定义下拉菜单行为**

更新 `scripts/check-ui.mjs`，要求 `PageShell` 使用 `CatalogMenu`，目录菜单同时包含 `/catalog` 和 `/accessories`，正文页面不再使用 `ProductCatalogSwitch`。

```js
{
  name: "product catalog uses one accessible dropdown",
  pass: () => {
    const menu = read("src/components/navigation/catalog-menu.tsx");
    const accessories = read("src/components/accessories/accessories-index-page.tsx");
    return source.includes("<CatalogMenu") &&
      menu.includes("<details") &&
      menu.includes('localizedPath(locale, "/catalog")') &&
      menu.includes('localizedPath(locale, "/accessories")') &&
      !source.includes("ProductCatalogSwitch") &&
      !accessories.includes("ProductCatalogSwitch");
  }
}
```

- [ ] **Step 2: 运行检查并确认失败**

Run: `npm run check:ui`

Expected: FAIL `product catalog uses one accessible dropdown`。

- [ ] **Step 3: 创建目录菜单组件**

`src/components/navigation/catalog-menu.tsx` 使用原生 `details/summary`，避免额外客户端状态：

```tsx
import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { localizedPath } from "@/lib/i18n";

export function CatalogMenu({ locale, active }: { locale: Locale; active: boolean }) {
  const labels = locale === "ru"
    ? { title: "Каталог", instruments: "Приборы", accessories: "Комплектующие и расходные материалы" }
    : { title: "Product Catalog", instruments: "Instruments", accessories: "Accessories & Consumables" };

  return (
    <details className="catalog-menu relative">
      <summary className={`catalog-menu-trigger ${active ? "bg-white/10" : ""}`}>{labels.title}</summary>
      <div className="catalog-menu-panel">
        <Link href={localizedPath(locale, "/catalog")}>{labels.instruments}</Link>
        <Link href={localizedPath(locale, "/accessories")}>{labels.accessories}</Link>
      </div>
    </details>
  );
}
```

`summary` 保留可见焦点样式和足够移动点击高度；展开状态完全依赖原生 `details` 行为。

- [ ] **Step 4: 接入 PageShell 并移除正文切换框**

`src/components/site.tsx` 的 nav 数组不再包含 catalog 普通链接，在 Home 之后插入：

```tsx
<CatalogMenu locale={locale} active={active === "catalog"} />
```

从 `CatalogPage` 和 `AccessoriesIndexPage` 删除 `ProductCatalogSwitch`，删除不再使用的 `src/components/catalog/product-catalog-switch.tsx`。

- [ ] **Step 5: 添加下拉样式**

在 `src/app/globals.css` 增加稳定尺寸和焦点规则：

```css
.catalog-menu summary { list-style: none; cursor: pointer; }
.catalog-menu summary::-webkit-details-marker { display: none; }
.catalog-menu-panel { position: absolute; top: calc(100% + .35rem); left: 0; z-index: 50; min-width: 17rem; border: 1px solid #d8e0e8; background: #fff; color: #172231; box-shadow: 0 14px 30px rgba(15, 31, 46, .18); }
.catalog-menu-panel a { display: block; padding: .85rem 1rem; }
.catalog-menu-panel a:hover, .catalog-menu-panel a:focus-visible { background: #eef2f5; outline: none; }
```

- [ ] **Step 6: 验证并提交**

Run:

```powershell
npm run check:ui
npm run check:trade-redesign
npm run typecheck
```

Expected: UI 下拉检查 PASS；trade check 仍因首页文件未创建而 FAIL；typecheck PASS。

```powershell
git add src/components/navigation src/components/site.tsx src/components/accessories/accessories-index-page.tsx src/components/catalog/product-catalog-switch.tsx src/app/globals.css scripts/check-ui.mjs
git commit -m "将产品目录改为下拉导航"
```

## Task 3: 拆分首页并应用确认文案

**Files:**
- Create: `src/data/home-content.ts`
- Create: `src/components/home/home-page.tsx`
- Create: `src/components/home/brand-category-grid.tsx`
- Create: `src/components/home/capability-note.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/en/page.tsx`
- Modify: `src/lib/i18n.ts`
- Test: `scripts/check-i18n.mjs`

- [ ] **Step 1: 增加双语合同检查**

在 `scripts/check-i18n.mjs` 中检查英语英雄原文完整存在，俄语包含 `наличие`、`сроки поставки` 和 `коммерческого предложения`，并禁止 `factory direct`、`патент`、`24/7`。

- [ ] **Step 2: 运行并确认失败**

Run: `npm run check:i18n`

Expected: FAIL approved homepage procurement copy。

- [ ] **Step 3: 创建首页内容模型**

`src/data/home-content.ts` 定义：

```ts
import type { Locale } from "@/data/catalog";

export type StrengthItem = {
  id: "supply" | "selection" | "verification" | "afterSales";
  number: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
};

export type HomeContent = {
  heroText: string;
  capabilityNote: string;
  strengthEyebrow: string;
  strengthTitle: string;
  strengthItems: StrengthItem[];
};

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    heroText: "SenseMeter supplies industrial measurement instruments and accessories for humidity, dew point, oxygen and temperature measurement. We support model selection, compatible accessory combinations, instrument panel and cabinet integration, and OEM or project procurement. Product availability and lead times are confirmed with each quotation.",
    capabilityNote: "Accessories supply, model selection based on customer parameters, and instrument panel or cabinet integration are available upon request.",
    strengthEyebrow: "SUPPLY AND PROJECT SUPPORT",
    strengthTitle: "Reliable procurement support",
    strengthItems: []
  },
  ru: {
    heroText: "SenseMeter поставляет промышленные измерительные приборы и комплектующие для контроля влажности, точки росы, кислорода и температуры. Мы помогаем с подбором моделей, совместимых комплектующих, интеграцией приборов в панели и шкафы управления, а также с OEM- и проектными закупками. Наличие и сроки поставки подтверждаются в каждом коммерческом предложении.",
    capabilityNote: "По запросу доступны поставка комплектующих, подбор модели по параметрам заказчика и интеграция приборов в панели или шкафы управления.",
    strengthEyebrow: "ПОСТАВКА И ПОДДЕРЖКА ПРОЕКТОВ",
    strengthTitle: "Надёжная поддержка закупок",
    strengthItems: []
  }
};
```

Task 4 填充 `strengthItems`，本任务先建立类型和英雄文案。

- [ ] **Step 4: 拆分首页组件**

把现有 `HomePage` 从 `site.tsx` 移到 `src/components/home/home-page.tsx`，保留视频、遮罩、按钮、四品牌卡和 `CardCarousel`。英雄正文改用 `homeContent[locale].heroText`。

创建 `BrandCategoryGrid` 包装现有四品牌 grid；创建 `CapabilityNote` 输出一段不带卡片的简短能力说明。

- [ ] **Step 5: 更新路由导入**

`src/app/page.tsx` 和 `src/app/en/page.tsx` 改为：

```ts
import { HomePage } from "@/components/home/home-page";
```

`site.tsx` 导出 `PageShell`，并删除首页专属 import 和实现。

- [ ] **Step 6: 验证并提交**

Run:

```powershell
npm run check:i18n
npm run check:ui
npm run typecheck
```

Expected: 全部 PASS。

```powershell
git add src/data/home-content.ts src/components/home src/components/site.tsx src/app/page.tsx src/app/en/page.tsx src/lib/i18n.ts scripts/check-i18n.mjs
git commit -m "拆分首页并更新外贸业务文案"
```

## Task 4: 四项交错式实力模块

**Files:**
- Create: `src/components/home/strength-section.tsx`
- Modify: `src/data/home-content.ts`
- Modify: `src/components/home/home-page.tsx`
- Modify: `src/app/globals.css`
- Test: `scripts/check-trade-redesign.mjs`

- [ ] **Step 1: 扩展检查以禁止夸大声明**

在 `scripts/check-trade-redesign.mjs` 添加：

```js
const forbidden = ["factory direct", "厂家直销", "88", "888", "24/7", "customer service center", "собственный калибровочный"];
if (forbidden.some((term) => content.toLowerCase().includes(term.toLowerCase()))) failures.push("unverified strength claim found");
```

- [ ] **Step 2: 运行并确认 StrengthSection 缺失**

Run: `npm run check:trade-redesign`

Expected: FAIL `strength section missing`。

- [ ] **Step 3: 填充四项已批准内容**

在 `home-content.ts` 为 RU/EN 分别填充 `supply`、`selection`、`verification`、`afterSales`。图片仅使用已有真实产品和配件素材：

```ts
const strengthImages = {
  supply: "/assets/products/MI_EasidewPRO-IS.png",
  selection: "/assets/products/RT_HC2A_Industrial_Humidity_Probes.png",
  verification: "/assets/products/VA_DMT143-DMT143L.png",
  afterSales: "/assets/accessories/gas-filter-compressed-air.webp"
} as const;
```

英文四项正文必须对应已批准事实：供应按报价确认、依据参数与制造商资料选型、订单阶段核对规格与文件、交付后提供替换配件和保修期问题处理。

- [ ] **Step 4: 创建交错模块**

`StrengthSection` 使用稳定的两列 grid，不嵌套卡片：

```tsx
export function StrengthSection({ locale }: { locale: Locale }) {
  const content = homeContent[locale];
  return (
    <section className="section bg-white">
      <div className="section-narrow">
        <p className="eyebrow !text-slate-500">{content.strengthEyebrow}</p>
        <h2 className="mt-3 text-3xl font-black">{content.strengthTitle}</h2>
        <div className="mt-10 space-y-12">
          {content.strengthItems.map((item, index) => (
            <article className="strength-row grid items-center gap-8 lg:grid-cols-2" key={item.id}>
              <div className={index % 2 ? "lg:order-2" : ""}>
                <div className="grid aspect-[16/10] place-items-center overflow-hidden border border-line bg-[#eef2f5] p-8">
                  <img className="h-full w-full object-contain" src={item.image} alt="" />
                </div>
              </div>
              <div className={index % 2 ? "lg:order-1" : ""}>
                <span className="text-6xl font-black text-slate-200">{item.number}</span>
                <h3 className="mt-2 text-2xl font-black">{item.title}</h3>
                <p className="mt-2 font-bold text-accent">{item.subtitle}</p>
                <p className="mt-5 leading-8 text-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: 插入首页并保持 Typical Industrial Use Cases**

首页顺序必须为品牌 grid、`CapabilityNote`、`StrengthSection`、现有应用 `CardCarousel`。删除首页现有大型 `AccessoriesHomeSection`，配件通过下拉目录和一句话能力入口访问，避免首页信息重复。

- [ ] **Step 6: 验证并提交**

Run:

```powershell
npm run check:trade-redesign
npm run check:ui
npm run check:i18n
npm run typecheck
```

Expected: 全部 PASS。

```powershell
git add src/components/home/strength-section.tsx src/components/home/home-page.tsx src/data/home-content.ts src/app/globals.css scripts/check-trade-redesign.mjs
git commit -m "新增真实业务实力交错展示"
```

## Task 5: 采购型目录卡片与可信文档下载

**Files:**
- Create: `src/components/catalog/catalog-page.tsx`
- Create: `src/components/catalog/product-card.tsx`
- Create: `src/components/documents/document-download.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/app/catalog/page.tsx`
- Modify: `src/app/en/catalog/page.tsx`
- Modify: product detail rendering in `src/components/site.tsx`
- Test: `scripts/check-catalog-integrity.mjs`
- Test: `scripts/check-ui.mjs`

- [ ] **Step 1: 写入采购卡片检查**

更新 UI 检查，要求产品卡包含品牌、型号、第一条关键范围、采购支持说明和带型号参数的询价链接；图片和标题仍链接详情页。

- [ ] **Step 2: 运行并确认失败**

Run: `npm run check:ui`

Expected: FAIL procurement product card。

- [ ] **Step 3: 拆分目录和产品卡**

把 `CatalogPage` 移到 `src/components/catalog/catalog-page.tsx`，把 `ProductCard` 移到 `product-card.tsx`。卡片只显示 `product.params[locale][0]` 作为关键范围，并加入：

```tsx
<p className="mt-4 text-sm text-muted">
  {locale === "ru"
    ? "Доступны подбор модели, комплектующие и проектная закупка."
    : "Model selection, accessories and project procurement are available."}
</p>
<Link className="btn btn-primary mt-5 w-full" href={`${localizedPath(locale, "/contact")}?model=${encodeURIComponent(product.model)}`}>
  {c.requestQuote}
</Link>
```

- [ ] **Step 4: 创建文档下载组件**

`DocumentDownload` 仅在 `href` 存在时输出可下载按钮，否则输出索取资料链接：

```tsx
export function DocumentDownload({ locale, model, href }: { locale: Locale; model: string; href?: string }) {
  if (!href) {
    return <Link className="btn btn-outline" href={`${localizedPath(locale, "/contact")}?model=${encodeURIComponent(model)}`}>{locale === "ru" ? "Запросить документацию" : "Request documentation"}</Link>;
  }
  return <a className="btn btn-outline" href={href} download>{locale === "ru" ? `${model} · PDF` : `${model} · PDF datasheet`}</a>;
}
```

详情页原 PDF 按钮替换为该组件，保持现有真实 PDF 路径。

- [ ] **Step 5: 更新路由导入并验证**

`src/app/catalog/page.tsx` 和英文路由改从 `@/components/catalog/catalog-page` 导入。

Run:

```powershell
npm run check:catalog
npm run check:ui
npm run check:seo
npm run typecheck
```

Expected: 全部 PASS。

- [ ] **Step 6: 提交**

```powershell
git add src/components/catalog src/components/documents src/components/site.tsx src/app/catalog/page.tsx src/app/en/catalog/page.tsx scripts/check-catalog-integrity.mjs scripts/check-ui.mjs
git commit -m "优化产品采购信息与文档下载"
```

## Task 6: 增强询价表单与预填

**Files:**
- Modify: `src/components/rfq-form.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/lib/i18n.ts`
- Modify: hidden Netlify form in `src/components/site.tsx`
- Test: `scripts/check-trade-redesign.mjs`
- Test: `scripts/check-i18n.mjs`

- [ ] **Step 1: 扩展表单检查**

要求表单包含 `Product Model`、`Quantity`、`Accessories Required`、`Integration Required`、`Application Requirements`、`Preferred Trade Terms`、`Name`、`Email`、`Telegram`，并禁止 WhatsApp 和 Phone 字段。

- [ ] **Step 2: 运行并确认失败**

Run: `npm run check:trade-redesign`

Expected: FAIL RFQ procurement fields missing 或 unsupported WhatsApp copy remains。

- [ ] **Step 3: 增加布尔选择和采购字段**

在 `RfqForm` 中加入两个 select：

```tsx
<SelectField label={c.formAccessoriesRequired} name="Accessories Required" options={[c.optionNo, c.optionYes]} />
<SelectField label={c.formIntegrationRequired} name="Integration Required" options={[c.optionNo, c.optionYes]} />
<Field label={c.formTradeTerms} name="Preferred Trade Terms" />
<Field label="Telegram" name="Telegram" />
```

把 `Application` 改名为 `Application Requirements`，删除 `Phone / WhatsApp / Telegram` 字段。同步更新 PageShell 隐藏 Netlify 表单，保证归档字段一致。

把现有只能选择仪器的 Product Model `select` 改为带 `datalist` 的自由输入，确保仪器、配件和客户自行填写的型号都能预填：

```tsx
<div>
  <label className="mb-2 block font-bold" htmlFor="product-model">{c.formProductModel}</label>
  <input
    className="w-full rounded border border-line px-3 py-3"
    id="product-model"
    name="Product Model"
    list="product-models"
    defaultValue={model || ""}
  />
  <datalist id="product-models">
    {products.map((product) => <option value={product.model} key={product.slug} />)}
  </datalist>
</div>
```

- [ ] **Step 4: 保持失败内容并提供双渠道**

现有错误状态已经不清空表单；将错误提示补充企业邮箱与 Telegram 文本链接。成功仍跳转 Thank You，发送中禁用按钮并保持原文。

- [ ] **Step 5: 验证预填**

产品和配件询价链接统一使用 `?model=`；俄英 contact route 继续读取 `model` 并传给 `RfqForm` 的 `defaultValue`。

Run:

```powershell
npm run check:trade-redesign
npm run check:i18n
npm run check:ui
npm run typecheck
```

Expected: 全部 PASS。

- [ ] **Step 6: 提交**

```powershell
git add src/components/rfq-form.tsx src/components/site.tsx src/lib/i18n.ts scripts/check-trade-redesign.mjs scripts/check-i18n.mjs
git commit -m "完善采购询价字段与失败提示"
```

## Task 7: 修正现有配件目录

**Files:**
- Modify: `src/components/accessories/accessories-index-page.tsx`
- Modify: `src/components/accessories/accessory-cards.tsx`
- Modify: `src/components/accessories/accessory-category-page.tsx`
- Modify: `src/components/accessories/accessory-detail-page.tsx`
- Modify: `scripts/check-accessories.mjs`

- [ ] **Step 1: 增加图片与重复模块检查**

在 `check-accessories.mjs` 增加源码检查：图片容器必须使用固定 `aspect-[4/3]`、`object-contain` 和至少 `p-6`；总览页不能包含 `AccessoryServiceBand`。

- [ ] **Step 2: 运行并确认失败**

Run: `npm run check:accessories`

Expected: FAIL accessory image presentation 或 duplicate service band。

- [ ] **Step 3: 统一图片容器**

总览、大类和详情页的图片统一使用：

```tsx
<div className="grid aspect-[4/3] place-items-center overflow-hidden border-b border-line bg-[#eef2f5] p-6">
  <img className="h-full max-h-64 w-full object-contain" src={image} alt={alt} />
</div>
```

移除会放大到裁切主体的 `object-cover`、固定过高 `h-*` 和负位移。

- [ ] **Step 4: 删除重复服务带**

从 `AccessoriesIndexPage` 删除 `<AccessoryServiceBand>` 和函数定义，只保留“询价所需资料”清单以及 PageShell 页脚的正式询价入口。

- [ ] **Step 5: 增加六类供应入口但不虚构型号**

在配件总览的真实产品组之外增加一个简洁的“可询价供应范围”列表：传感器与探头、采样系统、过滤器、电缆与连接器、校准与维护耗材、替换零部件。已有详细产品继续链接现有四个技术组；尚无真实型号资料的类别链接到 `/contact?accessory=<category>`，不生成虚构详情页。

- [ ] **Step 6: 验证并提交**

Run:

```powershell
npm run check:accessories
npm run check:seo
npm run check:yandex-urls
npm run typecheck
```

Expected: 全部 PASS，现有 24 个配件和原 URL 保持不变。

```powershell
git add src/components/accessories scripts/check-accessories.mjs
git commit -m "统一配件图片并精简重复询价内容"
```

## Task 8: SEO、构建和 Playwright 验收

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/en/page.tsx`
- Modify: `scripts/check-seo.mjs`
- Modify: `docs/superpowers/plans/2026-07-13-homepage-trade-redesign.md`（仅勾选完成状态）

- [ ] **Step 1: 更新首页 SEO 说明**

俄英首页 description 与已批准供应能力一致，避免旧的“fast RFQ catalog”单一定位；保持 canonical 和 hreflang 路径不变。

- [ ] **Step 2: 运行全部自动检查**

Run:

```powershell
npm run check:trade-redesign
npm run check:seo
npm run check:i18n
npm run check:applications
npm run check:application-links
npm run check:yandex-urls
npm run check:catalog
npm run check:accessories
npm run check:ui
npm run typecheck
npm run build
```

Expected: 所有命令 exit code 0；Next.js 生成全部 RU/EN 产品、应用和配件页面。

- [ ] **Step 3: 启动本地生产预览**

Run: `npm run start -- -p 3011`

Expected: `http://127.0.0.1:3011` 返回 200。

- [ ] **Step 4: Playwright 桌面验收**

在 1440×1100 检查：

- `/` 与 `/en` 视频首屏和批准文案。
- 产品目录下拉菜单的两个入口。
- 四品牌 grid、能力说明、四项实力、Typical Industrial Use Cases 顺序。
- `/catalog` 采购型卡片和询价预填。
- `/accessories` 图片完整显示且无重复深色支持模块。
- 产品详情 PDF 下载或索取资料入口。

Expected: 无 `pageerror`，`scrollWidth === clientWidth`，按钮和图片不重叠。

- [ ] **Step 5: Playwright 移动端验收**

在 390×844 检查相同页面，特别确认下拉菜单触摸展开、交错模块移动端顺序、表单字段和配件图片。

Expected: 无横向溢出、裁切主体或按钮文字溢出。

- [ ] **Step 6: Git 完整性与中文提交**

Run:

```powershell
git diff --check
git status --short
```

Expected: 无空白错误，只有本批预期文件。

```powershell
git add src scripts package.json docs/superpowers/plans/2026-07-13-homepage-trade-redesign.md
git commit -m "完成外贸型首页与采购体验改版"
```

完成后保持本地预览运行，不推送、不部署，等待用户浏览确认。
