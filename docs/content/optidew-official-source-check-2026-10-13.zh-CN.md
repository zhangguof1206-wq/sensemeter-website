# Optidew 官方资料核验

日期：2026-10-13。用户已授权从 DwyerOmega、Michell 等官方来源寻找资料。
本轮只核验资料及更新审核草案，不更改网站或确认实际供货。

## 已找到的对应资料

| 来源 | 能支持的结论 | 读取范围 |
| --- | --- | --- |
| [DwyerOmega 资产域的 Optidew 手册](https://assets.dwyeromega.com/manuals-do/MI_Optidew_97551-v4-3.pdf) | 官方手册说明 Optidew 401/501，并说明通过镜面上的水或冰凝结测量露点/霜点 | 86 页文件的目录、型号、介绍及运行原理章节；没有声称逐页审读 |
| [官方 Optidew 产品页](https://www.processsensing.com/en-us/products/optidew-chilled-mirror-hygrometer.htm) | 厂商把它定位为工业及实验室冷镜湿度仪，介绍 401/501 配置 | 公开产品说明及资料入口 |
| [官方 Optidew 数据表](https://www.processsensing.com/docs/datasheet/Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf) | 描述冷镜湿度仪、工业湿度及实验室应用 | 与当前网站链接的同名本地文件交叉核对 |
| [官方 Condumax II 产品页](https://www.processsensing.com/en-us/products/condumax-ii-hydrocarbon-dew-point-analyzer.htm) | 厂商单独将该产品定位为烃露点分析仪 | 公开产品定位；不因此新增或替换 SenseMeter 的产品 |

网站本地 PDF：`public/datasheets/Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf`。
SHA256：`FEB1B77CB0E3029448B760C70F4AD720BC07534D8A2D41F8380ABD0F39035A65`。

本地 PDF 共 4 页；提取全文并查看第一页渲染图，确认名称及应用；第 2 页列出 401、501 配置。文本未见 hydrocarbon 或 Optidew-HZ，不将这种缺失外推为所有历史或定制型号绝对不存在。

## 当前结论

1. 现有网站所链接的资料对应 Optidew 冷镜湿度仪，支持水露点/湿度用途，不支持当前“烃露点分析仪”的宣传表述。
2. 本轮未从检索到的官方资料找到 `Optidew-HZ` 后缀。不能把它写成已确认的官方型号，也不能声称查遍了厂商全部历史资料。
3. 家族层面的资料已补齐，不需要用户重复上传通用手册。实际供货的具体配置仍应在报价时核实。

## 对审核方案的更新

- 草案搜索标题改用官方家族名称 Optidew，明确冷镜湿度仪用途，不再使用原来的中性占位描述。
- 原 `/products/optidew-hz` 网址继续保留，网址本身不要求与现行显示名称完全一致。
- 若用户同意修正，标题、H1/型号显示、概要、特点和相关应用应一起与官方用途对齐；仅改 meta 而保留“烃露点”正文会产生矛盾。
- 不把 Condumax II 偷换为用户现有产品，不自动增加任何 SKU 或供货承诺。
- 当前仍保留一个应用审核门槛：需要批准现有页面的命名与正文一致性修正。其他 21 个产品及三类分类方案可继续审核，不因这项暂停全部工作。
- 新分类暂不展示 Optidew 卡片；批准家族命名与正文修正后，再纳入冷镜/参考测量类型，不能归入烃露点用途。

## 读取限制

DwyerOmega 主站公开入口与官方资产手册可读取。Michell 美区首页、部分旧分类页在网页工具中读取失败，使用可检索的旧站材料和其现行官方产品/文档来源交叉核对。没有登录、取得供应商私有资料、验证具体交货配置或下载受限文件。

本次没有修改原 PDF、发布页面、请求重新索引或声称曝光增长。
