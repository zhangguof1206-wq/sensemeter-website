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
- [x] 自动浏览器核查曾因权限被拒绝，未更换浏览器、端口或使用其他方式绕过；该结果不作为自动视觉验收通过的依据。
- [x] 复核 diff，并进行独立只读代码审查：未发现可操作问题。交付独立本地分支，不推送、创建 PR 或发布；中文提交结果以 Git 记录为准。
- [x] 2026-10-29 用户手动启动同一地址的预览，确认可以查看，随后明确回复“文案通过”。此项为人工内容验收，不代表自动跨设备视觉检查已经完成。

## 发布前复核（2026-10-29）

- 以内容提交 `02e4ed3` 为候选，重新核对相对部署基线 `dd64c71` 的改动：运行时仅两处获批英文文案；目录、布局、俄语和询盘行为未变。
- 重新运行全部 49 项回归，全部通过；8 组站点检查及 TypeScript 检查全部通过。测试使用模拟数据，不提交询盘或发送邮件。
- 用户正在使用本地预览，本次不重建或覆盖正在服务的 `.next`。生产构建及 postbuild 的通过记录来自该内容提交之前的实施验收，不声称本次重新构建。
- 本次新增内容仅为验收记录，不修改已经通过的页面内容。保留本地分支；推送、创建合并请求、合并及服务器发布均未执行，需后续授权。

## 预览地址

- http://127.0.0.1:3242/en/applications/compressed-air-dew-point （查看最后一条 FAQ）
- http://127.0.0.1:3242/en/products/mdm300 （查看 What to specify for selection 第三项）

## 验证边界

测试与预览通过只能证明本地候选内容及业务可用，不证明 Google 已抓取、建立索引、提高排名或增加曝光。真实上线日期及站点地图日期准确性应在以后批准的发布步骤中处理。

## 实际发布记录（2026-10-29）

- [x] 用户在预览及本地验收后，分别授权推送、创建合并请求、合并及服务器发布。GitHub 连接权限不足的写操作由用户手动完成；[PR #3](https://github.com/zhangguof1206-wq/sensemeter-website/pull/3) 已合并，固定版本为 `9dc71ab5baf211a859b8af8b7981c2d3d401d5f9`。
- [x] PR 的安全扫描和 SEO 回归检查通过；[合并后主分支回归](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/40811047668) 也通过。检查通过不等于搜索增长。
- [x] 用户截图确认当前生产基线为 `dd64c71`，PM2 单实例 fork、`/usr/bin/npm`、`/usr/bin/node`，参数 `start -- -p 3000`；私有配置存在。先创建独立目录 `/var/www/sensemeter-website-release-20261029-063710-9dc71ab`，构建、postbuild、类型检查完成，未在准备阶段切换网站。
- [x] 用户截图确认临时入口的 21 页 SEO、两处英文文案及 FAQ JSON-LD、询盘 GET 检查通过，输出 `PREVIEW_OK`、`NO_EMAIL_SENT`、`NOT_SWITCHED`。
- [x] 用户截图确认备份成功，私密恢复目录为 `/root/sensemeter-config/switch-20261029-064812-9dc71ab`。切换前复核配置校验和、当前旧进程 PID、固定版本及配置链接；保留旧目录和原启动方式，不把备份 JSON 或环境值写入仓库。
- [x] 用户截图确认正式切换后，本机及公网分别通过 21 页 SEO、英文文案及询盘 GET 检查，PM2 保存成功，输出 `UPGRADE_OK`、`CURRENT_VERSION=9dc71ab`、正确运行目录。实际部署时间为 `2026-10-29T06:58:28Z`，北京时间 14:58:28。未触发实际回滚，不将本地模拟恢复测试称为线上恢复实测。
- [x] 助手于 `2026-10-29T07:01:08.819Z` 独立复查两个已修改的正式英文 URL：均 HTTP 200、无现有规则下的索引信号错误，新文案与第七条 FAQ 的正文/结构化数据一致；robots、sitemap 正常，询盘 GET 为 405。报告为 `artifacts/seo-tools/deployed-9dc71ab-20261029/public-content-check.json`。本次仅 GET，没有发送邮件，不是额外浏览器视觉验收。
- [ ] 对两个实际变更的英文 URL 各请求一次重新索引，记录接收结果；不重复提交未改动的俄语页面或联系页参数变体。当前尚无本轮索引请求、新版抓取时间、排名或曝光增长证据。

本节仅补充部署事实与证据，不修改页面或发布版本，不需要因记录更新再次部署。后续以这两个英文 URL 的同口径查询、曝光、点击和有效询盘观察效果，不把技术验收计为增长结果。
