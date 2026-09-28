# MDM300 产品页曝光与询盘优化设计

## 目标

在保留现有 `/products/mdm300` 和 `/en/products/mdm300` URL 的前提下，提高 MDM300 型号词、MDM300 I.S. 型号词和 portable dew point meter 相关搜索的页面匹配度，并让采购者更容易完成 PDF 查看和询价。

## 依据

- Google Search Console 已出现 `mdm300`、`mdm300-is` 等型号查询，产品页已有曝光和点击。
- 本地厂家资料 `public/datasheets/MI_MDM300_EN-v9-7.pdf` 明确支持 MDM300 与 MDM300 I.S. 的用途、性能、续航、压力、数据记录、采样附件和危险区域信息。
- 厂家资料未提供 SenseMeter 的实时价格、库存或交期，因此这些信息继续通过正式询价确认。

## 方案

### 搜索意图

- 英文主意图：`MDM300`、`MDM300 I.S.`、`portable dew point meter`、`portable dew point hygrometer`。
- 俄文主意图：`MDM300`、`MDM300 I.S.`、`портативный гигрометр точки росы`。
- 页面服务型号采购和技术选型，不扩展成泛科普文章，不创建重复关键词页面。

### 页面内容

1. 重写中英文概述，首先说明这是用于现场点检、服务和调试的便携式露点仪。
2. 在关键参数中分别写清 MDM300 和 MDM300 I.S. 的响应时间与续航差异，避免把两个版本的参数混为一体。
3. 保留并强化厂家确认的共同事实：露点精度、最高工作压力、IP66/NEMA 4、数据记录和采样附件。
4. 新增可选的“询价前请确认”列表，收集气体、工作压力、预计露点范围、普通版或 I.S. 版、采样连接和数量。
5. 保留 PDF 下载、预填型号的询价按钮以及压缩空气和天然气应用页的双向内部链接。

### 代码结构

- 在 `Product` 数据结构中增加可选的 `selectionInputs` 双语列表。
- 通用产品页仅在产品提供该字段时渲染选型信息，不为 MDM300 创建独立页面组件。
- 在 SEO 名称映射中为 MDM300 增加精确的中英文产品类型，使标题更贴近搜索意图。
- MDM300 的公开内容继续集中在 `src/data/catalog.ts`，页面组件只负责展示。

## 不做的事项

- 不修改产品 URL、canonical、hreflang 或现有 PDF 地址。
- 不新增价格、库存、交期、区域代理关系或未由厂家资料支持的技术承诺。
- 不把所有产品页一次性改成 MDM300 的专用结构。
- 不创建新的 portable dew point meter 关键词页面。

## 验收标准

- 中英文页面均包含明确的 MDM300/MDM300 I.S. 版本差异和询价输入项。
- 页面保留 PDF 下载、询价入口和相关应用链接。
- SEO 标题与描述覆盖型号和便携式露点仪意图，且通过现有 SEO 长度检查。
- `npm run check:seo`、`npm run check:application-links`、`npm run check:ui`、`npm run typecheck` 和 `npm run build` 全部通过。
- 页面渲染后不存在布局溢出或移动端内容重叠。

