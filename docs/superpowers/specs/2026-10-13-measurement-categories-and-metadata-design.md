# 三类仪表分类页与产品搜索文案设计草案

日期：2026-10-13。
状态：供用户审核。用户已同意推进结构和文案准备，不等于批准修改业务页面或正式发布。

## 目标和本轮交付

让不知道品牌或型号、只知道测量需求的客户找到对应仪表，同时使现有产品的搜索标题和摘要更准确、完整。

- 三类分类页的职责、URL、结构、俄英双语文案与产品归类。
- 现有 22 个仪表产品的俄英搜索标题、摘要草案，共 44 组；其中 21 个可进入用户审核，Optidew-HZ 一项需先确认供应商资料。
- 本轮只写审核文档和文案数据，不创建网站路由、修改正式文案、上线或申请索引。

## 方案选择

| 方案 | 收益 | 代价或风险 | 建议 |
| --- | --- | --- | --- |
| 新增三个按测量任务组织的分类页，保留品牌筛选与现有应用页 | 承接通用品类采购需求，同时保护现有 URL 和页面职责 | 需维护少量新增文案及内链 | 推荐 |
| 将现有应用页改成产品分类入口 | 新增页面少 | 采购需求与应用说明混合，可能影响已有页面表达 | 不推荐 |
| 为品牌、型号、用途和近义词组合批量生成分类页 | 表面覆盖面大 | 重复内容、维护负担和筛选 URL 膨胀 | 不采用 |

本草案采用第一种结构，尚待用户审核具体文案。

## 页面职责和网址

| 分类 | RU 网址 | EN 网址 | 主要回答的问题 |
| --- | --- | --- | --- |
| 露点与气体水分仪表 | `/catalog/dew-point-instruments` | `/en/catalog/dew-point-instruments` | 有哪些在线、便携或变送器类仪表可供选择？ |
| 工业温湿度仪表 | `/catalog/humidity-temperature-instruments` | `/en/catalog/humidity-temperature-instruments` | 需要探头、变送器还是手持仪表？ |
| 氧分析仪 | `/catalog/oxygen-analyzers` | `/en/catalog/oxygen-analyzers` | 需要便携、工业气体连续监测还是手套箱方案？ |

分类页提供采购范围、仪表类型、简短选型条件与相关页面入口，不复制应用页的工程说明。
应用页继续讲压缩空气、气体水分、工业湿度、气候箱和工业氧分析等场景；产品页继续承接型号和具体配置需求。

保留 `/catalog`、其现有品牌筛选、所有产品和应用网址。不给 GPR1500/GPR 1500 等拼写变体另建页面，也不新建与现有氧分析应用内容相似的页面。

## 每个分类页的结构

1. 页面标题与简短简介：直接说明仪表类别，不做营销式大横幅。
2. 仪表类型入口：用页面内链接定位到不同组，不产生可索引筛选组合。
3. 按类型组织的现有产品卡片：使用现有产品图、型号、品牌和必要参数，链接回原产品详情。
4. 四项选型条件：提供采购前需要确认的信息，不做型号比较矩阵。
5. 相关应用入口：链接现有应用页，而不复制它们的正文。
6. 两项真实采购 FAQ：回答类型选择和询价信息问题。
7. “请求选型和价格”入口：使用现有联系页。未知型号时不强制客户先选型号。

沿用当前视觉风格和产品图，不重新设计首页、不生成新产品照片。产品列表应在页面前部可发现，长型号允许换行；桌面和手机均需检查。

## 分类文案摘要

完整俄英文字保存在 `docs/content/measurement-category-copy-proposal-2026-10-13.json`，作为权威草案；人类阅读版在同目录 `measurement-category-copy-review-2026-10-13.zh-CN.md`，由 JSON 生成，避免两处手工维护产生差异。

### 露点与气体水分

- RU 搜索标题：`Измерители точки росы и влажности газа`
- RU H1：`Приборы для измерения точки росы и влажности газа`
- EN 搜索标题与 H1：`Dew-Point and Gas Moisture Instruments`
- 内容要点：在线变送器、带显示的连续监测系统、便携检查各自服务什么需求；气体、露点范围、压力和取样条件需要确认。
- 现有应用：压缩空气露点、天然气及工艺气体水分。

产品组：

- 变送器和传感器：Easidew 34/M12、DMT143/DMT143L、DMT153、Pura、Easidew PRO I.S.、Easidew PRO XP。
- 连续监测系统：Easidew Online、SF82 Online。
- 便携测量：MDM300/MDM300 I.S.。
- Optidew-HZ 先标记待确认，不进入新分类卡片。不删除或改写其现有网址。

### 工业温湿度

- RU 搜索标题：`Промышленные приборы влажности и температуры`
- RU H1：`Промышленные датчики и приборы влажности и температуры`
- EN 搜索标题与 H1：`Industrial Humidity and Temperature Instruments`
- 内容要点：探头、变送器和手持仪表的使用角色；安装环境、冷凝风险、系统接口和校准资料需要确认。
- 现有应用：工业湿度、实验室及气候箱。

产品组：

- 探头：HC2A Series、HC2A-IC/IM/IE、HMP3。
- 变送器：HygroFlex1、HMT310、HMT370EX。
- 手持仪表：HP31/HP32。

### 氧分析

- RU 搜索标题：`Промышленные и переносные анализаторы кислорода`
- RU H1：`Анализаторы кислорода для промышленных газов`
- EN 搜索标题：`Industrial and Portable Oxygen Analyzers`
- EN H1：`Oxygen Analyzers for Industrial Gases`
- 内容要点：便携检查、固定工业气体监测、手套箱三种入口；ppm/百分比需求、背景气体、取样和信号条件需要确认。
- 现有应用：`/applications/glove-box-oxygen-analysis`，俄语内容已涵盖工业气体氧分析，直接复用。

产品组：

- 便携：GPR-1000/1100/2000/3500。
- 工业气体监测：GPR-1500、GPR-1900/2900、GPR-1600/2600/3100。
- 手套箱：GPR-1500 GB/GPR-2500 GB。

## 产品标题和摘要的规则

权威草案：`docs/content/product-seo-copy-proposal-2026-10-13.json`。
人类阅读版：`docs/content/product-seo-copy-review-2026-10-13.zh-CN.md`，从该 JSON 生成。

- 标题使用“型号或系列 + 主要仪表用途”，不再只按品牌套用类别。
- 搜索标题中的 ` | SenseMeter` 只追加一次；草案数据不重复包含后缀。
- 完整型号继续保留在原页面 H1、正文和必要摘要中。长系列的搜索标题可紧凑显示，不能因此删除对应产品网址或误称单一型号。
- 摘要由每个产品独立编辑，包含主要用途和一个清晰的询价方向；不直接截取正文再追加重复询价句。
- 草案摘要控制在现有 155 字符编辑预算内，不在句中切断。155 不是搜索引擎排名规则，也不保证实际搜索摘要不被重写。
- Easidew PRO I.S. 英文标题加站名后为 72 字符，保留准确用途而不机械缩写；长度仅供编辑复查，不当作索引错误。
- 不在本轮修改量程、压力、精度、认证、产品页 H1 或现有正文，不加入未经核实的库存、交期、授权或俄罗斯仓库声明。
- MDM300、HMP3 等近期页面保留正文与询盘流程；准备草案不等于必须立即全部发布。
- HMT310、HMT370EX 以温湿度为主要用途表达；不否定它们可能提供露点等其他参数。
- Pura 明确为高纯气体微量水分方向，不只写通用“露点仪表”。

## Optidew-HZ 事实确认项

当前页面称其测量烃露点，但链接的 `Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf` 与公开厂商 Optidew 页面介绍冷镜湿度/水露点仪表，本轮未找到支持 Optidew-HZ 烃露点版本的对应资料。
这不能直接证明供应商不存在定制型号；需要用户提供正式型号或供应商资料。

因此：

- 保留现有网址与页面，不在本轮未经确认自动改写。
- 产品文案清单保留一项中性草案并明确 `needs-supplier-confirmation`，不当作可直接应用文案。
- 新分类暂不推荐该型号，不把未经证实的“烃露点”复制到任何新简介、FAQ 或卡片。
- 其他 21 个产品及三个类别的审核继续，不因单项资料问题阻止所有工作。

## 后续实施边界

用户审核后另写实施计划，遵循已有应用和配件模块的模式：

- 分类数据与展示组件分别负责内容和渲染，RU/EN 路由复用一个展示组件。
- 产品搜索文案独立于产品正文数据，元数据函数读取经批准的文案；没有覆盖项的产品保持既有回退。
- 现有 `src/components/catalog/catalog-nav-dropdown.tsx` 及总目录增加三条清晰入口，不改变品牌筛选含义、不重构整个共享站点文件。
- 首批不额外创建知识中心、资料库、购物车、型号对比或新的表单字段；这些仍属于后续整站阶段。
- 新分类各自 self-canonical，提供 RU/EN/x-default 语言关联；品牌筛选继续合并到原总目录。
- 新分类的 6 个语言 URL 加入 sitemap，维护真实的重要内容更新日期，不每天刷新日期。
- 分类询价先链接现有 `/contact` 或 `/en/contact`，不传未受支持的分类参数或伪造型号。产品询价保持现有型号参数。
- FAQ 只作为可读内容，不为商业站宣称 Google FAQ 富结果，也不新增虚构价格或库存的结构化数据。

## 审核和后续验收条件

- 草案覆盖现有 22 个产品，无重复或不存在的 slug；每个归属于一个主要测量组。
- 新分类的当前可审核产品为 9 个露点/水分、7 个温湿度、5 个氧分析；另 1 个 Optidew-HZ 明确待确认，不悄悄丢失。
- 两语言字段齐全，产品组与元数据组一致，所有相关应用和联系路径已存在。
- 所有摘要为完整句子，无省略号截断；人工检查意义，不以长度检查代替事实审核。
- 实施后再验证路由、内部链接、canonical、hreflang、sitemap、旧品牌筛选及未知分类的 404；检查桌面/手机布局与询盘型号保留。
- 构建、浏览器预览和服务器发布均未在本轮执行，不能把草案校验通过称为网站上线或曝光增长。

## 来源与审核状态

本地依据：现有产品目录、应用数据、元数据函数、导航及 10 月 13 日正式站检查。

- [HMT310 厂商产品定位](https://www.vaisala.com/en/products/instruments-sensors-and-other-measurement-devices/instruments-industrial-measurements/hmt310)
- [HMT370EX 厂商产品定位](https://www.vaisala.com/en/products/instruments-sensors-and-other-measurement-devices/instruments-industrial-measurements/humidity-normal-or-wet-conditions/hmt370ex)
- [Optidew 厂商产品页](https://www.processsensing.com/en-us/products/optidew-chilled-mirror-hygrometer.htm)
- [Optidew 对应数据表](https://www.processsensing.com/docs/datasheet/Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf)
- [Pura 厂商产品定位](https://www.processsensing.com/en-us/products/pura-trace-moisture-transmitter.htm)
- [Easidew PRO I.S. 厂商产品定位](https://www.processsensing.com/en-us/products/easidew-pro-is.htm)
- [便携 GPR 系列厂商资料](https://www.processsensing.com/docs/datasheet/Portable-Oxygen-Analyzers-99963-UK-datasheet-v3-1.pdf)
- [HygroFlex1 厂商产品定位](https://www.processsensing.com/en-us/products/hygroflex1-hf1-hvac-transmitter.htm)
- [HP31/HP32 厂商资料](https://www.processsensing.com/docs/datasheet/59073E_HP31-HP32.pdf)

文案核对不等于全面确认每个现有产品参数；具体配置和安全认证仍需对应供应商资料。审核通过前，本草案不得被直接导入正式网站。
