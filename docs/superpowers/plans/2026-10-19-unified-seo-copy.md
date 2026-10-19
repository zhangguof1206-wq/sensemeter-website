# 统一 SEO 文案实施计划

> **For agentic workers:** Use executing-plans task by task. 用户已在统一分析清单后授权继续；本地实施，不推送、不发布。

**Goal:** 在现有供应商询价网站结构内提升已有查询与正文的匹配，修正英文类型标题、完整摘要及 DMT153 参数。

**Architecture:** 复用现有产品数据、局部元数据覆盖和应用文案。只增加五个英文类型覆盖及五个英文摘要，不改变通用截断策略、路由、组件、CSS、导航或询盘流程。按允许字段排除后的基线摘要验证其余数据不变。

**Tech Stack:** TypeScript、Next.js、React 静态渲染、Node 原生测试。

## 设计与范围

- 基线：`bcf17b5`，复用 `codex/dew-point-preview`。无关 `tmp/` 不动。
- 保留已完成的三处俄语压缩空气文案与 HMP3、MDM300 英文摘要，合并为后续单次发布候选。
- 英文压缩空气页：只改 `overviewText`、首条 FAQ 回答，追加压力基准和稳定性两条 FAQ；标题、摘要、H1、产品、图片、RFQ 参数及其余段落不变。
- 五款英文产品：DMT153、Easidew 34/M12、Easidew PRO I.S.、Easidew PRO XP、HP31/HP32。只改类型标题和摘要；俄语元数据保留原回退。
- DMT153：只替换英文 `params` 和 `highlights`，保留四行参数、三条特点。明确校准范围、两档精度、绝对压力、输出及非防爆/介质限制。
- 俄语气体水分页：只改第一张选型卡的说明和既有安装 FAQ 回答，增加介质兼容性边界，不承诺通用耐腐蚀能力。
- Optidew 产品、相关烃露点表述及推荐关系仍冻结；不悄悄换型号或用途。气候箱、配件、收录策略及 canonical 保持不变。
- 不新增已取消的露点分类，不给合规页解除 noindex，不删除询盘参数，不上传搜索经营数据。
- 逐字段文案与测试期望集中记录在 `docs/content/seo-unified-copy-2026-10-19.json`，它不是运行时依赖。

## Task 1: 资料核对与回归先行

- [x] 核对 Vaisala B212905EN-B、M213149EN-B；压力为 0–50 bar absolute，校准范围 -80 至 -20 °C Td/f，两档精度不得合并成全量程 ±2 °C。不要把响应时间测试条件当作精度条件。
- [x] 核对 Easidew 34/M12、PRO I.S.、PRO XP 与 Rotronic HP31/HP32 原厂资料；摘要不增加库存、交期、授权或市场承诺。
- [x] 新建逐字段文案及 `scripts/check-unified-seo-copy.test.mjs`，验证真实元数据、完整句、DMT153 参数、气体边界和数据保护。
- [x] 执行新测试，旧实现产生四项预期断言失败，两项保护字段检查通过。

## Task 2: 实施并同步既有检查

- [x] `src/lib/seo.ts`：让类型覆盖支持单语言键；加入五个仅英文类型，不改变其他型号或俄语回退。
- [x] `src/data/product-seo-descriptions.ts`：加入五个英文摘要；保留已有两个摘要。
- [x] `src/data/catalog.ts`：只替换 DMT153 英文参数和特点，型号、PDF、俄语及其他产品不变。
- [x] 两个应用数据文件：仅实施上面的允许字段，保证 FAQ 正文与 JSON-LD 同源。
- [x] 更新旧保护测试：放行本轮明确允许的英文段落和新增问答，保留其他字段摘要约束；不简单将完整新页面的哈希替换为新值。
- [x] 将产品摘要测试扩至七款明确覆盖，继续验证其余产品和全部俄语回退。
- [x] 扩展实际组件静态渲染测试至 RU/EN，验证两种语言正文与 FAQ 结构化数据一致。
- [x] `package.json` 注册 `test:unified-seo-copy`。

## Task 3: 验收、审查与本地提交

- [x] 全部十个测试文件、46 项测试通过，包括内容、目录、元数据、询盘及审核工具回归；未发邮件。
- [x] SEO、产品/配件完整性、应用与反向内链、UI、i18n、Yandex 网址清单共八项检查通过。
- [x] TypeScript 与生产构建通过，项目 postbuild 成功。
- [x] 已复核 diff，独立只读代码审查未发现新增问题，并逐项对比 22 款产品的真实元数据：全部俄语不变，英文仅指定五款变化。原有 Optidew 问题未改。
- [x] 已更新执行结果和文案验收清单；提交方式限定为中文本地提交，记录以 Git 历史为准。不推送、不合并、不发布。

页面链接的 DMT153 PDF 为图像型，文本抽取为空；已在本地渲染第 2 页并视觉核对其技术表及脚注，与新增参数一致。首轮绿色验证中 HP31/HP32 的类型标题偏长，采用原厂惯用的简洁 `handheld humidity meter`，温度功能保留在摘要中。

面向用户的合并文案清单：`docs/content/seo-unified-copy-review-2026-10-19.zh-CN.md`。私人搜索报表与检测日志仍在忽略目录，不进入提交。

浏览器此前拒绝本地 origin 权限，本轮不绕过；静态渲染及构建不是浏览器视觉验收。本轮不改设计，不以新增 FAQ 的结构化数据承诺 Google 富结果。不另启无人验收的临时服务器。

## 运行命令

在 website 根目录使用 `D:/yangj/node.exe`：

```powershell
& 'D:\yangj\node.exe' --no-warnings --experimental-strip-types --test scripts/check-unified-seo-copy.test.mjs
& 'D:\yangj\node.exe' --no-warnings --experimental-strip-types --test scripts/check-*test.mjs
& 'D:\yangj\node.exe' node_modules/typescript/bin/tsc --noEmit
& 'D:\yangj\node.exe' node_modules/next/dist/bin/next build
& 'D:\yangj\node.exe' scripts/copy-netlify-forms.mjs
git diff --check
```

检查脚本逐个运行，具体为 `check-seo.mjs`、`check-catalog-integrity.mjs`、`check-accessories.mjs`、`check-application-pages.mjs`、`check-application-backlinks.mjs`、`check-ui.mjs`、`check-i18n.mjs`、`check-yandex-url-list.mjs`。测试日志存本地忽略目录。

## 资料依据

- https://docs.vaisala.com/v/u/B212905EN-B/en-US
- https://docs.vaisala.com/r/M213149EN-B/en-US/GUID-E001C439-A175-4715-AE90-CBEEF8DD101C
- https://www.vaisala.com/en/expert-article/beyond-dew-point-value-how-ensure-high-quality-dry-compressed-air-your-process
- https://www.processsensing.com/en-us/products/easidew-34-dew-point-transmitter.htm
- https://www.processsensing.com/docs/datasheet/Easidew_Transmitters_97554_EN_Datasheet.pdf
- https://www.processsensing.com/en-us/products/easidew-pro-is.htm
- https://www.processsensing.com/en-us/products/easidew-pro-xp.htm
- https://www.processsensing.com/docs/datasheet/59073E_HP31-HP32.pdf

## 发布边界

本地检查通过只代表待发布版本业务可用，不代表已提升曝光。统一清单验收后另获发布确认，才推送和更新服务器。记录真实部署日期，再比较完整同口径的 14/28 天相关查询曝光、点击和页面表现。
