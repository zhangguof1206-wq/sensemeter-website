# Homepage Application Real Photography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页俄文与英文版的“典型工业应用场景”从 AI 感轮播卡片改为五张可核验真实工业摄影组成的编辑式网格，同时保持现有顶部导航、文案含义、详情页路由和其他首页模块不变。

**Architecture:** 新建一个仅负责首页应用场景的服务端组件，由 `site.tsx` 传入语言并渲染；五个场景仍以 `applicationScenes` 为唯一数据源，数据补充分类、构图焦点和图片来源所需字段。图片统一存放在独立目录，授权与处理记录单独成文。现有 `CardCarousel` 在确认无其他引用后移除，避免保留失效交互和客户端代码。

**Tech Stack:** Next.js App Router、React、TypeScript、Tailwind CSS、Sharp、现有 Node 检查脚本、Playwright/浏览器截图验收。

---

## 已确认边界

- 只修改首页 RU/EN 应用场景模块及其五张图片、来源记录和检查脚本。
- 保留现有顶部导航、搜索、语言切换、其他首页模块、页脚和五个详情页。
- 不修改 canonical、hreflang、sitemap、详情页正文与线上服务器。
- 不使用 AI 生成图，不在真实照片里合成传感器或设备。
- 只保留生产所需 WebP、代码和来源记录；下载原图、截图、浏览器配置和转换中间文件全部清理。

## 文件范围

**新增：**

- `src/components/home/home-applications-section.tsx`
- `public/assets/home-applications/compressed-air.webp`
- `public/assets/home-applications/natural-gas.webp`
- `public/assets/home-applications/industrial-humidity.webp`
- `public/assets/home-applications/climate-chamber.webp`
- `public/assets/home-applications/glove-box.webp`
- `docs/image-sources/home-applications.md`

**修改：**

- `src/components/site.tsx`
- `src/data/catalog.ts`
- `src/lib/i18n.ts`
- `src/app/globals.css`
- `scripts/check-ui.mjs`

**条件删除：**

- `src/components/card-carousel.tsx`：仅在全仓库确认无引用后删除。
- 旧首页场景图片：仅删除全仓库确认无其他页面引用的文件。

## Task 1: 先把确认规格转成自动检查

**Files:**

- Modify: `scripts/check-ui.mjs`
- Read: `src/components/site.tsx`
- Read: `src/data/catalog.ts`

- [ ] **Step 1: 将“首页必须使用轮播”的旧检查替换为新结构检查**

读取新组件、数据文件和站点组件：

```js
const homeApplicationsSource = readFileSync(
  join(process.cwd(), "src/components/home/home-applications-section.tsx"),
  "utf8"
);
const catalogSource = readFileSync(join(process.cwd(), "src/data/catalog.ts"), "utf8");
```

新增检查必须覆盖：

```js
{
  name: "home applications use the approved editorial grid",
  ok:
    source.includes('import { HomeApplicationsSection } from "@/components/home/home-applications-section"') &&
    source.includes("<HomeApplicationsSection locale={locale} />") &&
    !source.includes("<CardCarousel ariaLabel={c.applicationTitle}>") &&
    homeApplicationsSource.includes("lg:grid-cols-12") &&
    homeApplicationsSource.includes("lg:col-span-7") &&
    homeApplicationsSource.includes("lg:col-span-5") &&
    homeApplicationsSource.includes("md:col-span-2")
}
```

再增加数据与视觉约束：五个唯一 `.webp` 路径、`category`、`imagePosition`、无 `hover:scale`、无 `hover:shadow-2xl`、旧 AI 图片不再出现在 `applicationScenes` 中。

- [ ] **Step 2: 运行检查并确认它因新组件尚不存在而失败**

```powershell
npm run check:ui
```

Expected: `FAIL`，原因应只指向尚未实现的首页编辑式网格或组件文件；若脚本因文件不存在直接异常，则先让读取逻辑在缺失时返回空字符串，再得到可读失败项。

- [ ] **Step 3: 不提交失败状态**

本任务只建立红灯，不单独提交，确保每个 Git 提交都保持网站可构建、业务可用。

## Task 2: 获取、核验并优化五张真实工业照片

**Files:**

- Create: `public/assets/home-applications/*.webp`
- Create: `docs/image-sources/home-applications.md`
- Temporary only: `%TEMP%\sensemeter-home-applications\*`

- [ ] **Step 1: 使用已确认的候选来源下载原图到临时目录**

固定候选与页面用途：

| 场景 | 首选来源 | 用途判断 |
| --- | --- | --- |
| 压缩空气 | Wikimedia Commons 的 U.S. Navy 高压空气压缩机检查实拍 | 设备、人员和机房环境均真实 |
| 天然气 | Pexels 4883682 工业炼化装置实拍 | 管道、阀门和处理装置语义明确 |
| 工业湿度 | Pexels 15106927 建筑通风管道实拍 | 风管/HVAC 场景明确 |
| 实验室与环境箱 | DVIDS 6280130 环境试验箱实拍 | 测试设备和现场工作状态真实 |
| 手套箱氧分析 | Pexels 30779842 工业实验室手套箱实拍 | 手套箱主体明确，不伪造氧传感器 |

源页面：

```text
https://commons.wikimedia.org/wiki/File:US_Navy_060623-N-3136P-052_Machinist%27s_Mate_3rd_Class_Jose_Riosreyes_and_Machinist%27s_Mate_Fireman_Corey_McCann_inspect_a_high_pressure_air_compressor_in_the_number_one_auxiliary_machinery_room.jpg
https://www.pexels.com/photo/a-photo-of-an-industrial-business-4883682/
https://www.pexels.com/photo/air-inlets-of-building-ventilation-ducts-15106927/
https://www.dvidshub.net/image/6280130/c5isr-center-works-humvee-environmental-test-chamber
https://www.pexels.com/photo/industrial-lab-equipment-with-glove-box-30779842/
```

每张下载前核对：来源页可打开、作者/机构可识别、许可允许商业网站使用、图片为照片、没有水印、没有无法规避的显著商标、没有容易误导客户的设备标签。

- [ ] **Step 2: 逐张做真实性与场景语义验收**

以原始分辨率检查以下项目：

- 管道、法兰、仪表、人手和结构不存在 AI 式变形。
- 场景与标题一致，不把炼化厂照片写成实验室，不把普通机柜写成气体分析仪。
- 裁成 16:10 后主体仍完整，人物肖像不是视觉中心。
- 若首选图不合格，只能在 Pexels、Wikimedia 公共领域或政府公共领域来源中替换，并在来源记录中写明最终 URL；不得临时改用来源不明图片。

- [ ] **Step 3: 用 Sharp 生成生产版 WebP**

输出尺寸统一为 1600×1000，先只做裁切、尺寸、轻微曝光和 WebP 压缩：

```powershell
node -e "const sharp=require('sharp'); const jobs=[['compressed-air.jpg','compressed-air.webp','attention'],['natural-gas.jpg','natural-gas.webp','centre'],['industrial-humidity.jpg','industrial-humidity.webp','centre'],['climate-chamber.jpg','climate-chamber.webp','centre'],['glove-box.jpg','glove-box.webp','centre']]; Promise.all(jobs.map(([src,out,pos])=>sharp(process.env.TEMP+'/sensemeter-home-applications/'+src).resize(1600,1000,{fit:'cover',position:pos}).modulate({brightness:1.02,saturation:0.95}).webp({quality:82}).toFile('public/assets/home-applications/'+out))).catch(e=>{console.error(e);process.exit(1)})"
```

如果 `attention` 对人物或设备裁切不合理，为该图改成可复现的 `left`、`right`、`north` 或 `south`，并把结果写入来源记录。

- [ ] **Step 4: 检查文件大小、尺寸和视觉一致性**

```powershell
Get-ChildItem public/assets/home-applications/*.webp | Select-Object Name,Length
node -e "const sharp=require('sharp'),fs=require('fs'); Promise.all(fs.readdirSync('public/assets/home-applications').filter(x=>x.endsWith('.webp')).map(async x=>console.log(x,await sharp('public/assets/home-applications/'+x).metadata())))"
```

Expected: 每张 1600×1000，目标大小 100–260 KB。不能为追求体积产生明显色阶、锐化边缘或塑料质感。

- [ ] **Step 5: 建立来源与处理记录**

`docs/image-sources/home-applications.md` 每张必须记录：

```md
## compressed-air.webp
- Scene: Compressed air and dryers
- Source page: ...
- Author / organization: ...
- License: ...
- Retrieved: 2026-08-18
- Changes: Cropped to 16:10, resized to 1600x1000, light exposure adjustment, WebP conversion
- Final asset: public/assets/home-applications/compressed-air.webp
```

Pexels 图片记录 Pexels 许可链接；Wikimedia/DVIDS 图片记录具体公共领域声明和作者/机构。若最终许可要求署名，同时在对应卡片图片下方增加简短可见署名，不把许可义务只藏在仓库文档里。

## Task 3: 扩展场景数据并建立专用组件

**Files:**

- Modify: `src/data/catalog.ts`
- Modify: `src/lib/i18n.ts`
- Create: `src/components/home/home-applications-section.tsx`

- [ ] **Step 1: 精确扩展 `ApplicationScene`，不引入通用页面生成器**

```ts
export type ApplicationScene = {
  id: "compressedAir" | "gas" | "industrialHumidity" | "lab" | "oxygen";
  image: string;
  imagePosition: string;
  category: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
};
```

五个数据项使用新的唯一图片路径，并写入 RU/EN 分类：

```ts
category: { ru: "Точка росы", en: "Dew point" }
```

其余分类依次为：`Влага в газе / Gas moisture`、`Влажность и температура / Humidity and temperature`、`Испытания и калибровка / Testing and calibration`、`Кислород и чистота газа / Oxygen and gas purity`。

- [ ] **Step 2: 增加模块引导语和统一链接文案**

在现有两套字典中新增：

```ts
applicationLead: "Real measurement environments across process lines, utilities and controlled chambers.",
viewApplication: "View application"
```

俄文使用自然行业表达，不直译成营销口号：

```ts
applicationLead: "Реальные условия измерений на технологических линиях, инженерных системах и в испытательных камерах.",
viewApplication: "Смотреть применение"
```

- [ ] **Step 3: 创建首页专用应用场景组件**

组件保留现有五个路由映射，关键结构如下：

```tsx
const applicationSceneLinks: Record<ApplicationScene["id"], string> = {
  compressedAir: "/applications/compressed-air-dew-point",
  gas: "/applications/natural-gas-moisture-monitoring",
  industrialHumidity: "/applications/industrial-humidity-monitoring",
  lab: "/applications/climate-chamber-humidity",
  oxygen: "/applications/glove-box-oxygen-analysis"
};

const sceneLayout: Record<ApplicationScene["id"], string> = {
  compressedAir: "md:col-span-1 lg:col-span-4",
  gas: "md:col-span-1 lg:col-span-4",
  industrialHumidity: "md:col-span-1 lg:col-span-4",
  lab: "md:col-span-1 lg:col-span-7",
  oxygen: "md:col-span-2 lg:col-span-5"
};
```

渲染要求：

```tsx
<section className="bg-[#f4f7fa] py-16 sm:py-20" id="applications">
  <div className="section-narrow">
    <div className="mb-8 max-w-3xl">
      <h2 className="text-3xl font-black">{c.applicationTitle}</h2>
      <p className="mt-3 text-muted">{c.applicationLead}</p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
      {applicationScenes.map((scene) => (
        <Link
          className={`${sceneLayout[scene.id]} group overflow-hidden rounded-[4px] border border-slate-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600`}
          href={localizedPath(locale, applicationSceneLinks[scene.id])}
          key={scene.id}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
            <img
              alt={scene.title[locale]}
              className="absolute inset-0 h-full w-full object-cover"
              src={assetPath(scene.image)}
              style={{ objectPosition: scene.imagePosition }}
            />
          </div>
          <div className="p-5">
            <p className="text-xs font-bold uppercase text-red-700">{scene.category[locale]}</p>
            <h3 className="mt-2 text-xl font-black">{scene.title[locale]}</h3>
            <p className="mt-2 line-clamp-2 text-muted">{scene.text[locale]}</p>
            <span className="mt-5 inline-flex font-bold text-slate-900 group-hover:text-red-700">
              {c.viewApplication} <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>
```

禁止添加图片缩放、自动轮播、大阴影、浮动动画、圆角胶囊或嵌套卡片。

- [ ] **Step 4: 运行类型检查，修正数据联合类型或字典遗漏**

```powershell
npm run typecheck
```

Expected: PASS。

## Task 4: 接入首页并清除旧轮播行为

**Files:**

- Modify: `src/components/site.tsx`
- Modify: `src/app/globals.css`
- Delete if unused: `src/components/card-carousel.tsx`

- [ ] **Step 1: 用专用组件替换 `site.tsx` 中的整段旧应用场景 JSX**

```tsx
import { HomeApplicationsSection } from "@/components/home/home-applications-section";
```

将旧 `<section className="section application-anchor" ...>` 到闭合标签整体替换为：

```tsx
<HomeApplicationsSection locale={locale} />
```

同时删除 `applicationScenes`、`CardCarousel` 和本地 `applicationSceneLinks` 的无用导入/常量。

- [ ] **Step 2: 移除旧卡片悬浮位移样式**

从 `globals.css` 的共享动画选择器中删除 `.home-application-card`，确保新卡片 hover 不上浮、图片不缩放。

- [ ] **Step 3: 审计并删除无引用轮播组件**

```powershell
rg -n "CardCarousel|card-carousel" src scripts
```

Expected: 只有检查脚本中的“旧结构不得存在”文本；此时删除 `src/components/card-carousel.tsx`。如果仍有真实运行引用，保留组件并在计划记录中说明引用位置，不能强删。

- [ ] **Step 4: 让自动检查从红灯变绿**

```powershell
npm run check:ui
npm run check:i18n
npm run typecheck
```

Expected: 全部 PASS。

## Task 5: 本地构建与三档视觉验收

**Files:**

- Verify: all changed production files
- Temporary only: screenshots outside repository

- [ ] **Step 1: 生成发布构建**

```powershell
npm run build:release
```

Expected: Next.js build、SEO 检查和 postbuild 全部通过；RU/EN 首页及五个详情页路由仍存在。

- [ ] **Step 2: 在空闲端口启动本地预览**

若 3012 已有本项目预览则复用，否则使用空闲端口：

```powershell
npm run dev -- --port 3012
```

- [ ] **Step 3: 分别验收 1440×1000、768×1024、390×844**

每个尺寸检查：

- 1440：第一行 3 张等宽，第二行 7:5；五张无需轮播全部可见。
- 768：两列，最后一张跨两列，不出现狭窄残列。
- 390：单列，图片和文字无横向溢出。
- 五张照片互不重复，均成功加载，16:10 裁切不伤主体。
- 文字不压图、不溢出；卡片高度视觉协调但不强制所有正文等高。
- 顶部导航、搜索和语言切换与改版前一致。
- 每张卡片分别进入正确 RU/EN 应用详情页。
- 页面没有轮播箭头、自动移动、图片缩放或大阴影。

在浏览器控制台验证：

```js
document.documentElement.scrollWidth === window.innerWidth
```

Expected: 三个尺寸均为 `true`。

- [ ] **Step 4: 检查图片请求与可访问性**

- 五个图片请求均为 200，页面不存在旧 AI 图片请求。
- 图片 `alt` 使用对应语言的场景标题。
- 键盘 Tab 可依次聚焦五张卡片，焦点轮廓清楚。
- 缩小动画设置下没有依赖运动才能理解的内容。

如发现视觉问题，只调整该图片的 `imagePosition`、组件间距或断点跨度，不扩展到其他首页模块。

## Task 6: 清理、复核并提交完整功能

**Files:**

- Delete only: confirmed unused assets and temporary outputs
- Commit: all approved production changes

- [ ] **Step 1: 对五张旧图片逐一做引用审计**

```powershell
rg -n "application-compressed-air-user|application-gas-processing|application-industrial-humidity-monitoring-v2|application-lab-chambers|application-gas-manufacturing" . --glob "!node_modules/**" --glob "!.next/**"
```

只删除零引用旧图。任何仍用于目录页或详情页的图片必须保留。

- [ ] **Step 2: 清理所有临时文件**

删除 `%TEMP%\sensemeter-home-applications`、视觉验收截图和本次生成的浏览器配置；仓库中不得出现原始 JPG、下载页面、脚本草稿、临时截图或重复导出图片。

- [ ] **Step 3: 复跑最终验证**

```powershell
npm run check:ui
npm run check:i18n
npm run typecheck
npm run build:release
git status --short
git diff --check
```

Expected: 四项验证 PASS，`git diff --check` 无输出，工作区只包含本计划列明的生产文件、必要删除和来源记录。

- [ ] **Step 4: 提交一个业务完整的中文提交**

```powershell
git add src/components/home/home-applications-section.tsx src/components/site.tsx src/data/catalog.ts src/lib/i18n.ts src/app/globals.css scripts/check-ui.mjs public/assets/home-applications docs/image-sources/home-applications.md
git add -u
git commit -m "重构首页应用场景并替换真实摄影素材"
```

提交前确认暂存区不含临时文件；提交后再次执行 `git status --short`，Expected: 无输出。

## 完成标准

- RU/EN 首页均显示五张不同、来源可核验的真实工业照片。
- 桌面 3+2 编辑式网格、平板 2+2+1、手机单列均符合确认规格。
- 首页应用场景不再依赖轮播，旧客户端轮播代码在无引用时已删除。
- 五个详情路由、顶部导航和其他首页内容没有行为回归。
- 图片授权、作者/机构、来源、处理方式和最终文件一一对应。
- 所有自动检查、发布构建和三档视觉验收通过。
- 没有部署到线上；本地验收通过后再单独进入 Ubuntu VPS / PM2 发布流程。
