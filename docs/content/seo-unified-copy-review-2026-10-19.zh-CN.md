# SEO 合并批次文案验收清单

状态：本地待验收，未推送、未上线。不改网页设计、仪器/配件导航、现有网址、图片或询盘流程。

## 本次新增的英文产品标题与摘要

标题只在原有页面上修改搜索类型，站名由现有模板追加一次；页面 H1 和型号不变。

### DMT153

标题：DMT153 - low dew-point transmitter

摘要：Vaisala DMT153 low dew-point transmitter for dry gases, with RS-485 Modbus RTU and analog outputs. Specify pressure and connection for a quote.

### Easidew 34 / Easidew M12

标题：Easidew 34 / Easidew M12 - dew-point transmitter

摘要：Michell Easidew 34 and M12 dew-point transmitters for compressed air dryers and dry gases. Specify connector, pressure and output for a quote.

### Easidew PRO I.S.

标题：Easidew PRO I.S. - intrinsically safe transmitter

摘要：Michell Easidew PRO I.S. intrinsically safe dew-point transmitter for gas moisture measurement. Specify gas, pressure and approval needs for a quote.

### Easidew PRO XP

标题：Easidew PRO XP - explosion-proof transmitter

摘要：Michell Easidew PRO XP explosion-proof dew-point transmitter for process gases. Specify gas, pressure and hazardous-area requirements for a quote.

### HP31 / HP32

标题：HP31 / HP32 - handheld humidity meter

摘要：Rotronic HygroPalm HP31 and HP32 handheld humidity and temperature meters. Specify fixed or interchangeable probe requirements for a quote.

## DMT153 既有参数区

- 校准露点/霜点范围：-80 至 -20 °C Td/f，不把非校准范围当成校准能力。
- 精度：-80 至 -40 °C Td/f 为 ±2 °C；-40 至 -20 °C Td/f 为 ±3 °C。页面明确提示还要查阅资料中的气体温度适用区间。
- 工艺压力：0–50 bar 绝对压力，不写成表压。
- 输出：RS-485 Modbus RTU，以及模拟电压/电流输出。
- 既有特点区说明传感器清除/自校准、Indigo/Insight 连接，以及非防爆、其他化学介质需厂家审核、不适用于纯二氧化碳或六氟化硫的限制。

已直接渲染并检查页面所链接的本地 B212905EN-B PDF 第 2 页，参数与该资料一致。未更换 PDF 或参数展示组件。

## 英文压缩空气露点页

保留搜索标题、摘要、H1、五款推荐产品和原有选型结构。改动仅限既有测量概述和问答：

- 概述明确选测点、选预期干燥范围、核对传感器压力，并在同一压力基准上与工艺要求比较。
- 原有“How do I test dew point in compressed air?”回答增加检查泄漏、按手册吹扫、等压力/流量/读数稳定后记录露点、传感器压力、测点及时间的步骤。
- 追加“What is the difference between pressure dew point and atmospheric dew point?”，说明泄压后的读数不能直接与管线压力露点比较。
- 追加“How do I obtain a stable compressed air dew point reading?”，说明取样路径、冷凝、死端和稳定条件，不套用适用于所有仪器的统一流量或等待时间。

问答从 4 条变为 6 条，继续使用原有组件。结构化数据与页面正文共用同一份数据，不承诺 Google FAQ 富结果展示。

## 俄语气体水分页

原第一张选型卡改为：

Укажите состав газа, концентрации агрессивных компонентов, примеси, давление и температуру. Совместимость сенсора, уплотнений и пробоотборной системы с конкретной средой подтверждают по документации производителя.

原安装问答回答改为：

Способ установки зависит от давления, температуры, состава газа и требований безопасности. Для газов с агрессивными компонентами сначала проверяют совместимость сенсора, уплотнений и материалов пробоотбора по документации производителя. Взрывозащита не означает химическую стойкость к любой среде; необходимость фильтрации и подготовки пробы определяют отдельно.

含义：需要明确侵蚀性组分及浓度，逐项检查传感器、密封件和取样材料的兼容性；防爆能力不能当作通用耐化学腐蚀能力。没有新增“适用全部腐蚀性气体”的承诺。

## 合并保留的已完成内容

- 俄语压缩空气露点页三处文案：首段、干燥机选型标题、压缩机房安装问答。
- 英文 HMP3 完整摘要：Vaisala HMP3 humidity and temperature probe with Modbus RTU over RS-485. Connect to a compatible system directly or via Indigo. Request a quote.
- 英文 MDM300 完整摘要：MDM300 and MDM300 I.S. for portable dew-point checks in compressed air and gases. Review version, sampling needs, documents and request pricing.

## 未改动与仍需单独处理的项目

- 不新增露点分类，不动气候箱页、配件规格及现有收录策略；询盘参数及语言切换保留。
- Optidew 产品、烃露点表述、推荐关系和型号保持原状。原厂依据与现有描述的不一致是明确冻结的既存问题，不能视为本轮已修复，也不应在发布时宣称全站专业问题已清零。
- 本次改动不能证明曝光已增长。确认统一批次并实际发布后，记录部署日期，再观察完整同口径的 14/28 天数据。

原厂资料链接和验证范围见 [实施计划](../superpowers/plans/2026-10-19-unified-seo-copy.md)；逐字段原文见 [文案数据](seo-unified-copy-2026-10-19.json)。
