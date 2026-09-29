# HMP3 产品页曝光与询盘优化设计

## 目标

优化现有俄文和英文 HMP3 产品页，在不改变已收录 URL 的前提下，提高页面与 HMP3 采购型搜索意图的匹配度，并让潜在客户能够提交信息更完整的询盘。

## 页面范围

- 俄文页面：`/products/hmp3-hmpx`
- 英文页面：`/en/products/hmp3-hmpx`
- 保留现有 slug，避免拆分历史曝光和索引信号。
- 页面主产品名称统一为 `HMP3`。
- `HMPX` 仅作为 Vaisala 产品系列或订货语境中的辅助词保留，不与 HMP3 并列作为主关键词。

## 信息来源

页面只使用以下可核实资料：

- 项目内数据表：`public/datasheets/VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf`
- Vaisala 官方 HMP3 产品页：`https://www.vaisala.com/en/products/instruments-sensors-and-other-measurement-devices/instruments-industrial-measurements/hmp3`
- Vaisala 官方 HMP3 技术文档：`https://docs.vaisala.com/r/M212022EN-M/en-US/GUID-55780E45-224F-43B5-BA61-C9310B6176DE`

不得编造库存、价格、交期、认证或未在上述来源中出现的性能参数。

## 搜索意图

### 英文主词

- Vaisala HMP3
- HMP3 humidity and temperature probe
- industrial humidity and temperature probe
- Modbus humidity temperature probe

### 俄文主词

- Vaisala HMP3
- датчик влажности и температуры HMP3
- промышленный датчик влажности и температуры
- датчик влажности Modbus RS-485

关键词应自然出现在标题、摘要和正文中，不堆砌重复词。

## 内容设计

### 页面名称与摘要

- 页面标题和 H1 聚焦 `Vaisala HMP3`。
- 摘要首先说明产品类型、适用环境和核心采购价值。
- 英文和俄文描述保持语义一致，但采用各自语言的自然采购表达。

### 可核实参数

- 相对湿度测量范围：0 至 100 %RH，在最高 +95 °C 露点条件下。
- 相对湿度精度：在 +23 °C、0 至 90 %RH 条件下最高 ±0.8 %RH。
- 温度测量范围：-40 至 +120 °C。
- 温度精度：最高 ±0.1 °C。
- 数字输出：非隔离 RS-485。
- 协议：Modbus RTU。
- 探头主体防护等级：IP66。
- 支持 Vaisala Indigo 系列变送器和 Insight PC 软件。
- 传感器与过滤器可在现场维护或更换，具体配置按工况确认。

条件性参数必须保留适用条件，不能写成所有工况下均成立。

### 应用场景

- 工业 HVAC。
- 洁净室。
- 环境试验箱和气候箱。
- 喷漆房。
- 一般工业过程中的温湿度监测。

### 询盘输入

页面在现有询盘按钮之前展示采购方应提供的信息：

- 应用环境和被测介质。
- 温度与湿度范围。
- 单独使用 RS-485 Modbus，或连接 Indigo 变送器。
- 探头线缆长度。
- 安装方式与过滤器需求。
- 数量和收货国家或地区。

这些字段用于提高询盘质量，不在产品页新增复杂表单或额外业务流程。

## 技术实现

- 沿用 `src/data/catalog.ts` 的产品数据结构和 `selectionInputs` 字段。
- 沿用现有产品页组件，不增加 HMP3 专属组件。
- 在 `src/lib/seo.ts` 中调整 HMP3 的产品类型词，生成聚焦 HMP3 的元数据。
- 在现有 SEO 检查脚本中增加 HMP3 回归规则，覆盖主词、关键参数、询盘输入和旧 slug 保留。
- 不改变路由、询盘 API、站点地图结构和其他产品页面行为。

## 验收标准

- 英文和俄文页面继续使用现有 URL 并返回成功状态。
- 页面标题、H1、摘要和结构化数据以 HMP3 为主产品。
- 页面包含上述可核实参数、应用场景、PDF 下载和询盘入口。
- 页面展示完整的选型询盘输入。
- canonical 和 hreflang 仍指向正确的中英文页面。
- SEO 检查、链接检查、类型检查、构建和本地页面检查全部通过。
- 页面在桌面端和移动端无明显溢出、重叠或内容截断。

## 不在本次范围

- 新建 `/products/hmp3` 路由或重定向旧页面。
- 新增 HMP3 广告落地页。
- 修改询盘邮件服务、服务器配置或部署方式。
- 扩展到其他 Vaisala HMP 系列产品。
