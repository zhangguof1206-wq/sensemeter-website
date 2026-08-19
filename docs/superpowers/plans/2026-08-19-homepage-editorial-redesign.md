# Homepage Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将已确认的首页真实浏览器视觉样板落地，保留原动态背景、真实文案与图片，同时减少重复卡片、重字和按钮造成的模板感。

**Architecture:** 首页继续从现有 i18n、catalog、accessories 数据源读取内容。品牌分类提取为独立组件，配件与应用场景在现有组件边界内重排；全局 CSS 只增加首页专用样式，不改变产品详情和应用详情页面的既有视觉行为。

**Tech Stack:** Next.js 15、React 19、TypeScript、Tailwind CSS、现有 Node UI 检查脚本。

---

### Task 1: Add Homepage Editorial UI Contract

**Files:**
- Modify: `scripts/check-ui.mjs`
- Test: `scripts/check-ui.mjs`

- [x] **Step 1: Write the failing checks**

更新首页检查规则，要求：动态视频资源保持不变；首屏使用专用标题和次级文字链接；品牌区为开放式分隔网格；配件区不使用圆角阴影卡片；应用区使用一个主图、两个侧栏条目和两个底部条目，并取消每项红色按钮。

- [x] **Step 2: Run test to verify it fails**

Run: `npm run check:ui`

Expected: FAIL，失败项应指向尚未实现的 editorial 首页结构。

### Task 2: Implement Hero And Brand Categories

**Files:**
- Create: `src/components/home/home-brand-categories-section.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/lib/i18n.ts`
- Modify: `src/app/globals.css`

- [x] **Step 1: Keep the original motion background**

保留 `industrial-measurement-hero.mp4`、poster、autoplay、muted、loop、playsInline 和 reduced-motion fallback，不生成或替换任何素材。

- [x] **Step 2: Implement the calmer hero hierarchy**

将首页标题限制在 54px、700 字重和更舒展行距；保留一个红色主按钮，将询价改为带下划线的文字操作。英雄区下方使用双栏呈现现有完整说明，并增加俄英双语的“Подбор и поставка / Selection and supply”标签。

- [x] **Step 3: Implement the open brand grid**

品牌分类使用四个开放式条目、1px 分隔线、真实品牌 logo 和当前产品图。内容继续读取 `categories`，不得新增产品参数或品牌说明。

### Task 3: Implement Accessories And Applications Editorial Layouts

**Files:**
- Modify: `src/components/accessories/accessories-home-section.tsx`
- Modify: `src/components/home/home-applications-section.tsx`

- [x] **Step 1: Replace accessory cards with a technical matrix**

保留六项现有配件和图片，移除圆角、阴影、hover 抬升；在桌面端使用 3×2 分隔矩阵，移动端降为 2 列，并为整个区块提供一个目录文字链接。

- [x] **Step 2: Replace application cards with an editorial composition**

首项使用大图，第二、三项使用侧栏图文，第四、五项使用底部横向图文。所有类别、标题和说明继续读取 `applicationScenes`；每项仅保留普通文字链接，不再显示红色按钮。

### Task 4: Verify Responsive And Production Behavior

**Files:**
- Test: `scripts/check-ui.mjs`
- Test: whole project

- [x] **Step 1: Run focused checks**

Run: `npm run check:ui`

Expected: `UI check passed.`

- [x] **Step 2: Run TypeScript and production build checks**

Run: `npm run typecheck`

Expected: exit code 0.

Run: `npm run build`

Expected: exit code 0 and all routes generated successfully.

- [x] **Step 3: Render desktop and mobile screenshots**

在 1440px 桌面视口和 390px 移动视口检查动态背景、标题换行、品牌分隔网格、配件矩阵、应用图文以及页脚，确认无溢出、重叠和空白资源。

- [x] **Step 4: Commit complete implementation**

提交范围仅包含计划、首页组件、样式、双语标签和 UI 检查，使用中文提交信息。
