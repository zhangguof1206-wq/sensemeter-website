# 恢复仪器与配件目录实施计划

> **For agentic workers:** Use executing-plans to complete the checklist in order.

**Goal:** 根据用户最新决定撤销露点分类预览，恢复原来的仪器、配件两个入口；保留两款英文产品摘要，不发布。

**Architecture:** 以 `986a218` 为目录 UI 和 sitemap 的恢复基线，只撤销上次分类功能的独立文件和接入。英文摘要模块及 `productMetadata` 覆盖保留，测试分开覆盖目录与摘要，避免删除分类时丢失摘要验证。

**Tech Stack:** 现有 Next.js、React、TypeScript、Node 原生测试；无新增依赖。

## Task 1: 回归测试

- [x] 新建 `scripts/check-catalog-navigation.test.mjs`，用项目既有 TypeScript 转换与 React 服务端渲染方式检查真实菜单：RU/EN 都仅含目录主链接、仪器和配件两个下拉链接。
- [x] 检查目录页、sitemap 不再引入分类模块，新增两条分类路由及分类数据文件已移除。
- [x] 从 `scripts/check-measurement-category.test.mjs` 拆出 `scripts/check-product-seo-descriptions.test.mjs`，保留两款英文摘要和全部产品原回退的真实调用测试；删除旧分类测试。
- [x] 先运行新导航测试，确认现有三入口实现导致预期断言失败。

## Task 2: 精确撤销分类

- [x] 恢复 `src/components/catalog/catalog-nav-dropdown.tsx` 原来的两个下拉项目和 `w-44` 宽度。
- [x] 在 `src/components/site.tsx` 删除分类链接组件的 import 与调用；不改原品牌筛选、搜索、产品卡片或其他页面。
- [x] 从 `src/app/sitemap.ts` 删除两个分类地址接入；原 148 项条目及日期保持。
- [x] 删除两份 `catalog/[category]/page.tsx`、两个 measurement-category 组件和 `src/data/measurement-categories.ts`，不保留可访问的分类孤立页。
- [x] `scripts/check-ui.mjs` 恢复原菜单宽度验证，并验证不再出现分类映射。
- [x] `package.json` 用 `test:catalog-navigation`、`test:product-seo` 替换 `test:measurement-category`；更新上次计划为已撤销，不将历史预览链接称作当前入口。

## Task 3: 验证与交付

- [x] 执行新测试、既有 SEO/目录/配件/应用/内链/UI/i18n 检查、露点正文与 RFQ 回归、类型检查，均不得发送邮件。
- [x] 精确比较基线：菜单、主目录组件和 sitemap 恢复原样；产品和应用数据未动，保留的产品摘要改动只覆盖两款英文。
- [x] 停止本线程持有的 3242 预览会话，完成生产构建，再在空闲本地端口重启；不停止未知服务，不改线上。
- [x] 用户已回复“已经恢复，符合要求”。这是用户手动复核的确认，不是自动截图验收。自动浏览器仍受此前权限拒绝限制，未切换工具绕过。
- [x] 检查变更和暂存差异，以中文提交；不推送、不发布，保留无关 `tmp/`。

## 执行记录

- 用户明确要求恢复之前仪器与配件版本，不新增露点与气体水分类。此前分类预览方案已经被此决定替代。
- 预览会话 5879 已确认存活，用户已确认可打开 3242 预览。上次记录根据进程枚举推断后台进程已退出不充分；本轮 3241 绑定明确返回端口占用，不对其进程归属作推断。
- 导航回归先出现预期的两项断言失败：菜单存在第三个分类链接、目录仍引入分类组件。撤销后两项通过；英文摘要两项测试通过，总计 15 项目录/摘要/露点正文/RFQ 测试通过。
- 八项既有 SEO、目录完整性、配件、应用、内链、UI、i18n、Yandex 清单检查均通过，类型检查通过。
- 恢复文件与基线逐字相同：`src/components/site.tsx`、`src/components/catalog/catalog-nav-dropdown.tsx`、`src/app/sitemap.ts`；原产品和应用数据库无差异。生产构建 sitemap 共 148 项，app-paths-manifest 中没有分类动态路由。
- 首次构建在生成 `.next/types` 子目录时遇到 EPERM；检查父目录并正常创建该生成目录后，重试构建成功。未更改权限或生产配置。
- 原会话 5879 已停止。后台启动曾记录 Ready，但下一独立命令绑定 3242 成功，确认后台服务未持久保留，因此改用本线程前台预览会话 47103，Ready 已确认；用户复核链接为 `/catalog` 和 `/en/catalog`。未访问被拒绝的浏览器 origin，视觉结果等待用户回复。
- 用户随后明确确认目录已经恢复、符合要求。会话 47103 在本次复核结束后关闭；不停止其他未知服务。恢复代码已中文提交，本记录随提交一并归档。线上未变化，曝光目标仍未验证实现。
