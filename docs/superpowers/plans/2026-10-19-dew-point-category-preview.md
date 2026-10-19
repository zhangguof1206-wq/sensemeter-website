# 露点分类与英文摘要本地预览实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为用户制作可审核的俄英露点分类预览，补全英文 HMP3、MDM300 摘要；不发布、不修改 Optidew。

**Architecture:** 分类内容独立于现有产品数据库，分类组件引用原图片/型号/链接，只显示核实过的用途。两个英文摘要通过精确 slug/locale 覆盖接入原元数据函数，其他文案回退保持不变。RU/EN 分类路由复用一个展示组件，目录和导航仅加入一个已存在的分类入口。

**Tech Stack:** 现有 Next.js 15、React 19、TypeScript、Tailwind 3、Node 原生测试。

## 范围与证据

- 用户已确认本地预览范围。当前本地分支 `codex/dew-point-preview`，基线 `986a218`，未创建额外工作区。
- 使用已复核 `docs/content/measurement-category-copy-proposal-2026-10-13.json` 的露点段落，不导入尚未批准的其他两个分类。
- 九项产品：Easidew 34/M12、DMT143/DMT143L、DMT153、Pura、Easidew PRO I.S.、Easidew PRO XP、Easidew Online、SF82 Online、MDM300/MDM300 I.S.。
- 本轮不展示数值范围、精度、压力或认证清单，不直接复制原卡片前三项参数；原产品文件及现有应用正文完全保持。
- 新路径：`/catalog/dew-point-instruments`、`/en/catalog/dew-point-instruments`。其他分类返回 404。
- 不修改首页、配件、联系页、表单、邮件或生产服务器，不上传搜索经营数据、不推送本地代码。

## Task 1: 先建立失败测试

**Files:** Create `scripts/check-measurement-category.test.mjs`。

- [x] 测试分类数据与已批准 JSON 逐字段相同，九项 slug 全在现有目录，Optidew 不在推荐中。
- [x] 测试三组有稳定唯一锚点、两语言齐全、卡片不含未经核实数值参数，未知分类查找返回 undefined。
- [x] 测试英文摘要仅覆盖两个 slug；俄语和其余产品均返回 undefined，摘要为完整句且不超过编辑预算。
- [x] 测试 RU/EN 路由、notFound、元数据读取、目录/导航入口与 sitemap 的结构接入。
- [x] Run: `node --no-warnings --experimental-strip-types --test scripts/check-measurement-category.test.mjs`。先出现四项预期模块缺失断言，实施后转绿；再补充真实元数据调用测试，共五项通过。

测试通过分类导出接口读取真实数据：

```js
const category = getMeasurementCategory("dew-point-instruments");
assert.equal(category.productGroups.flatMap(group => group.slugs).length, 9);
assert.equal(getMeasurementCategory("unknown"), undefined);
assert.equal(getProductSeoDescription("ru", "mdm300"), undefined);
```

## Task 2: 独立内容与元数据覆盖

**Files:** Create `src/data/measurement-categories.ts`, `src/data/product-seo-descriptions.ts`; Modify `src/lib/seo.ts`。

- [x] 新建仅包含已批准露点类别的 typed 数据，补充三组稳定 id 与九款用途短句，不重复产品图片/规格数据库。
- [x] 核对本地对应 PDF 的产品身份；扫描版不能因提取为空就认为缺少资料。发现版本数值冲突只记录，不扩大至修改原规格。
- [x] 英文摘要精确采用已批准草案，范围仅 HMP3 与 MDM300。
- [x] 原 `productMetadata` 中 description 使用以下空值回退方式；title、canonical、图片及其他产品不变：

```ts
const description = getProductSeoDescription(locale, product.slug) ?? trimDescription(
  locale === "ru"
    ? `${product.overview.ru} Запросите цену, наличие и PDF datasheet у SenseMeter.`
    : `${product.overview.en} Request pricing, availability and PDF datasheet from SenseMeter.`
);
```

## Task 3: 分类展示与入口

**Files:** Create `src/components/catalog/measurement-category-page.tsx`, `src/components/catalog/measurement-category-links.tsx`, `src/app/catalog/[category]/page.tsx`, `src/app/en/catalog/[category]/page.tsx`; Modify `src/components/site.tsx`, `src/components/catalog/catalog-nav-dropdown.tsx`, `src/app/sitemap.ts`, `package.json`。

- [x] 分组组件使用现有 PageShell；紧凑标题、面包屑、三组锚点和九项图片卡片，随后选型、应用、FAQ、询价。
- [x] 卡片只显示原型号、品牌、用途和详情入口；图像稳定高度，不嵌套卡片，不添加营销横幅或动画依赖。
- [x] FAQ 使用可访问的 details/summary；无商业 FAQ 富结果承诺，无新增客户可见操作指南。
- [x] RU/EN 动态路由使用 `generateStaticParams`、`getMeasurementCategory`、`staticPageMetadata`、`notFound`。每页 self-canonical，并用既有 languageAlternates。
- [x] 目录品牌筛选保持原义；独立新增露点入口。顶部菜单仅增加露点项，长标签可换行。
- [x] sitemap 增加两个路径；此新增内容的日期由固定内容版本维护，不使用每天变化的当前时间；不重置其他页面日期。
- [x] 注册 `test:measurement-category`。不编辑持续集成、自动部署或 Yandex 提交清单。

## Task 4: 验证、预览、提交

**Files:** Update 本计划执行记录；临时报告仅写 `artifacts/seo-tools/`。

- [x] 新测试转绿，检查 TypeScript：`node node_modules/typescript/bin/tsc --noEmit`。
- [x] 执行现有 SEO、目录、应用、内链、UI、i18n 检查及露点/RFQ测试；不发送邮件。
- [x] `node node_modules/next/dist/bin/next build` 成功；命令退出 0，构建输出确认两个新路由及 164 页生成，日志保留在忽略目录。
- [x] 使用空闲本机端口启动预览，只绑定 127.0.0.1；不要停止未知进程，不改生产服务。
- [ ] HTTP 实测两个分类均 200，两个未知分类 404；canonical/hreflang/面包屑/九款产品/FAQ/询价入口/两摘要正确。
- [x] 比较基线：原产品数据库、应用正文、俄语摘要及非目标产品元数据未变。
- [ ] 通过当前允许的浏览器检查桌面/手机布局与图片、切换语言、产品及询价链接；若浏览器权限或视口控制受限，明确记录，不绕过、不宣称视觉验收通过。
- [x] `git diff --check` 与 staged 检查通过，再以中文提交完整功能；不推送、不合并至 main、不发布。
- [x] 交付入口已准备：俄语 `http://127.0.0.1:3241/catalog/dew-point-instruments`、英语 `http://127.0.0.1:3241/en/catalog/dew-point-instruments`。须先手动启动服务，视觉和 HTTP 检查仍待确认。曝光增长仍需真实上线后的搜索数据，不标记总体目标完成。

## 执行记录

- Task 1-3 已完成。五项新测试通过，原有相关检查及 TypeScript 通过，生产构建成功。
- 资料核对：六份 PDF 可提取文字；DMT143、DMT153、Pura 三份扫描资料已渲染首页并人工核实产品身份。Easidew PRO I.S. 旧目录压力数值与本地 PDF 版本不一致，未在新分类页引入该数值，也未扩大范围修改旧规格。
- 代码复核发现加宽菜单的窄屏越界风险。最终采用最小补丁：保持原 `group relative` 与 `left-0 top-full` 的连续悬停路径，手机维持原 `w-44`，仅 640px 以上使用 `sm:w-72`；旧 UI 检查增加响应式宽度和新分类入口检查，原配件入口验证保留。未引入新的菜单状态或客户端依赖。
- 离线基线对比：44 个产品语言元数据对象，除两款英文的 description/openGraph.description 外完全一致；原 148 项 sitemap 对象不变，只新增两个分类地址。构建产物 sitemap 共 150 项。
- 本地预览在 127.0.0.1:3241 启动并记录 Ready，但执行环境在命令结束后回收后台进程，未保持运行。交付时需用户在自己的终端启动并保持窗口打开：`npm --prefix "C:\Users\yangj\Desktop\MICHELL 温湿度器\website" start -- -H 127.0.0.1 -p 3241`。启动及构建日志保存在忽略目录 `artifacts/seo-tools/dew-point-preview/`。
- 浏览器打开本地预览时被明确拒绝权限，因此停止自动浏览器操作，不切换其他浏览器或使用间接访问绕过。未执行 HTTP 实测、截图、桌面/手机视觉和交互验收；以上两项继续保持未勾选，交由用户打开本地链接审核。不将源码检查或构建成功称作视觉验收。
- 未推送、未合并 main、未发布、未发送邮件。总体曝光目标仍需后续发布后的真实搜索数据验证。
