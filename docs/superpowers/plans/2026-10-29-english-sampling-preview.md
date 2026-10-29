# 英文取样问答与 MDM300 安全边界本地预览

**Goal:** 实施用户确认的两处英文内容，保留现有设计、导航、网址、标题、摘要、型号、图片和询盘行为。只本地预览、测试与中文提交，不推送、不发布。

**Architecture:** 复用应用页的 FAQ 数据及既有正文/JSON-LD 渲染；将 MDM300 说明放到现有 `selectionInputs.en[2]`，不改被目录和推荐卡片复用的 overview，不增加组件或通用数据结构。文案审稿记录不作为运行时依赖。

**Tech Stack:** Next.js 15、React 19、TypeScript、Node 原生测试。

## 范围与依据

- 用户已确认两处内容的本地预览，原稿见 `docs/content/english-sampling-copy-2026-10-29.json`。
- 独立分支 `codex/english-sampling-preview`，基于已知部署基线 `dd64c71`；不携带周度 SEO 依赖修复分支改动，不触碰无关 `tmp/`。
- `/en/applications/compressed-air-dew-point`：保留现有六条 FAQ，末尾追加一条取样配置问答。
- `/en/products/mdm300`：仅替换第三条英文选型说明，保持选型列表四项及其余数据不变。
- 不动俄语、DMT143、HMP3、Optidew、元数据、日期策略、共享样式及服务器。当前只是本地预览，不能把修改日写成真实发布日。
- 取样附件不是通用标配承诺；本安版本须按具体审批条件与现场分类选择，不能推断通用气体适用性。

原厂依据：

- https://www.processsensing.com/en-us/products/mdm-sampling-system.htm
- https://www.processsensing.com/en-us/products/mdm300-portable-hygrometer.htm?id=mdm300-portable-hygrometer

## 任务

### 1. 基线与隔离

- [x] 检查现有分支、工作区与数据复用位置；共享 overview 不改。
- [x] 建立独立本地分支；两份现有内容测试 12 项全部通过。

### 2. 回归先行

- [x] 新增精确文案测试：英文 FAQ 共七项且新增问答唯一；MDM300 使用区域句子精确落在既有选型项。
- [x] 扩展旧保护：保留原六条 FAQ 内容，实际 RU/EN 渲染的 FAQ 结构化数据与正文逐项匹配。
- [x] 对旧产品快照仅归一化本轮允许变化的一个字符串；不直接替换整体哈希以掩盖其他变更。
- [x] 运行新测试：12 项通过、2 项按预期因缺少新增文案失败，无环境或导入错误。

### 3. 实施

- [x] `src/data/applications/compressed-air-dew-point.ts` 只追加英文 FAQ。
- [x] `src/data/catalog.ts` 只替换 MDM300 英文第三条 selectionInputs。
- [x] `scripts/check-seo.mjs` 原要求旧短句；在复现单项失败后改为要求明确的安全区及审批条件说明，保留其余型号与询盘检查。
- [x] 源码 diff 及与 `dd64c71` 的完整数据比对通过，除批准的两个位置外数据一致；目录/应用卡片、其他语言和产品字段不变。

### 4. 验收与交付

- [x] 全部 49 项回归、8 项站点检查命令、TypeScript、生产构建及 postbuild 通过。
- [x] 启动仅监听 `127.0.0.1:3242` 的预览；两条英文路径、两条俄语路径及俄英目录六页 HTTP 核对通过。
- [x] 新增问答真实 HTML 与 FAQ JSON-LD 七项逐项一致；MDM300 说明只出现在预期详情页。询盘接口仅 GET 返回 405，未提交表单或发送邮件。
- [x] 浏览器核查尝试因用户权限被拒绝，未更换浏览器、端口或使用其他方式绕过；视觉核查由用户手动完成，不能称为已通过。
- [x] 复核 diff，并进行独立只读代码审查：未发现可操作问题。交付独立本地分支，不推送、创建 PR 或发布；中文提交结果以 Git 记录为准。
- [ ] 用户手动查看预览并确认文案与视觉效果；该步骤不在自动验收结果中。

## 预览地址

- http://127.0.0.1:3242/en/applications/compressed-air-dew-point （查看最后一条 FAQ）
- http://127.0.0.1:3242/en/products/mdm300 （查看 What to specify for selection 第三项）

## 验证边界

测试与预览通过只能证明本地候选内容及业务可用，不证明 Google 已抓取、建立索引、提高排名或增加曝光。真实上线日期及站点地图日期准确性应在以后批准的发布步骤中处理。
