# SenseMeter SEO 页面完整修改稿

整理日期：2026-10-19。状态：供审核，未批准实施、未上线。
本稿合并已完成专业性复核的 10 月 13 日草案；本轮已重新核对当前本地文件，基线提交为 `3049f78`。这不是 10 月 19 日全站抓取或排名复测报告。

## 目录

- [一、修改范围与定位](#一修改范围与定位)
- [二、全站入口与内链的具体改动](#二全站入口与内链的具体改动)
- [三、三类分类页完整正文](#三三类分类页完整正文)
- [四、22 个产品的完整标题与摘要](#四22-个产品的完整标题与摘要)
- [五、Optidew 正文修正完整草案](#五optidew-正文修正完整草案)
- [六、技术 SEO 修改要求](#六技术-seo-修改要求)
- [七、实施顺序与验收](#七实施顺序与验收)
- [八、依据和限制](#八依据和限制)

## 一、修改范围与定位

本站定位：多品牌工业测量仪器和配件供应、资料查看、工程采购询价。不是品牌制造商官网，也不是面向个人消费者的在线支付商城。

| 页面/模块 | 本次拟修改 | 本次不修改 |
| --- | --- | --- |
| 三类仪表分类 | 新增三个分类、俄英共六个正式路径，完整文案见第三部分 | 不批量创建近义词、城市、品牌组合页面 |
| 22 个现有仪表产品 | 俄英标题与摘要共 44 组，21 项按元数据范围审核，Optidew 单独保留门槛 | 不重写其余 21 项正文、H1、规格和认证 |
| Optidew | 提供显示名、概述、特点、应用及选型信息的条件修正稿 | 不直接将型号替换成 401/501，不新增 Condumax 产品 |
| 总目录与导航 | 增加三类入口，保留品牌筛选与原产品路径；总目录简介换为简短采购说明 | 不删除品牌入口、不改变型号搜索含义 |
| 首页 | 仅增加三类文字链接，保留原品牌区和应用区 | 不重做首页视觉，不改首页主标题和核心供货说明 |
| 现有五个应用页 | 增加返回对应分类的相关链接 | 不把应用页改成分类页，不修改近期已验收正文 |
| 配件、关于我们、联系与法律页 | 保持现状 | 不改配件目录、业务身份、邮件配置、隐私页索引策略 |
| 技术 SEO | canonical、语言关联、新增 sitemap 路径、真实更新日期和面包屑 | 不添加虚构价格、评价、库存，不承诺 FAQ 富结果 |

三类分类页服务“寻找一类仪表”的采购需求；应用页回答“某工况怎么测”；产品页回答“某型号有什么用途和配置”。相同专业词可以自然出现，但不把三个页面写成同一篇文章。

### 关键词与页面职责

以下为内容主题和采购意图种子，不是经过当日搜索量、难度或排名工具验证的关键词清单，不填虚构数据。

| 分类 | 俄语主题词 | 英语主题词 | 页面职责 |
| --- | --- | --- | --- |
| 露点与气体水分 | измерители точки росы；датчики точки росы；влажность газа | dew point instruments; dew point transmitters; gas moisture | 按变送器、连续监测和便携检查找产品 |
| 温湿度 | приборы для измерения влажности и температуры；зонды влажности | humidity and temperature instruments; humidity probes | 按探头、变送器、手持仪及连接条件找产品 |
| 氧分析 | анализаторы кислорода；переносные анализаторы кислорода；следовой кислород | oxygen analyzers; portable oxygen analyzers; trace oxygen | 按便携、连续气体监测和手套箱任务找产品 |

不另外建立 GPR1500、GPR 1500、GPR-1500 三个页面。拼写变体在原型号页自然说明即可，不堆叠到标题中。

### 风格约束

- 保留现有导航、页宽、真实产品图、白底图片区域、深色文字、红色主要按钮和小圆角。
- 分类页使用紧凑标题与简介；类型入口和产品列表在前，选型条件、应用、FAQ 在后，不增加巨大营销横幅。
- 不照搬厂家原文，不使用“我们的工厂/传感器”等制造商口吻，不虚构授权、俄罗斯库存、交期或校准能力。
- 新卡片显示型号、品牌、准确用途和原产品链接。数值参数没有对应型号、条件和资料版本依据时先不显示。
- 不直接用现有卡片的前三条参数作为新分类内容，以免复制系列参数的歧义。
- 本稿没有完成俄语母语编辑审读或手机/桌面视觉验收；文案批准后仍需预览检查。

## 二、全站入口与内链的具体改动

### 2.1 顶部“目录”菜单

保留原“仪表”“配件”，在两者之间加入三个分类。每个入口只链接对应语言的正式路径，不跳到另一种语言。

| 顺序 | RU 标签 | EN 标签 | RU 目标路径 |
| --- | --- | --- | --- |
| 1 | Приборы | Instruments | /catalog |
| 2 | Точка росы и влага в газе | Dew Point and Gas Moisture | /catalog/dew-point-instruments |
| 3 | Влажность и температура | Humidity and Temperature | /catalog/humidity-temperature-instruments |
| 4 | Анализаторы кислорода | Oxygen Analyzers | /catalog/oxygen-analyzers |
| 5 | Комплектующие | Accessories | /accessories |

菜单容器允许长俄语标签换行，不能为容纳新入口缩成难以阅读的小字；手机菜单同样提供入口。

### 2.2 首页新增入口

在原品牌区附近增加一个简洁文字链接区，不替换现有品牌卡片：

- RU 区标题：Подбор по измеряемому параметру
- EN 区标题：Browse by Measurement
- 三个链接标签和路径沿用上表三个分类，不另写宣传文案。
- 不加入新背景图、滚动轮播、数据战报或客户评价。

### 2.3 总目录简介与入口

保留原目录 H1、产品排序、搜索、MICHELL/ROTRONIC/VAISALA/AII 品牌筛选。分类入口与品牌筛选分区显示，避免把“品牌”和“测量类别”混为一个筛选含义。

RU 新简介：

Выберите прибор по измеряемому параметру или бренду. В карточке модели доступны описание, технические данные и PDF. Для запроса предложения укажите условия измерения и требуемое исполнение.

EN 新简介：

Browse instruments by measurement or brand. Each product page includes an overview, technical information and a PDF. Include your measurement conditions and required configuration when requesting a quote.

新增入口区标题：

- RU：По измеряемому параметру
- EN：By Measurement

三个入口仍使用上表标签和正式路径。新路径不是 `?category=` 品牌筛选的替代品。

### 2.4 分类、应用和产品之间的链接

| 现有应用路径 | 增加的相关分类 |
| --- | --- |
| /applications/compressed-air-dew-point | /catalog/dew-point-instruments |
| /applications/natural-gas-moisture-monitoring | /catalog/dew-point-instruments |
| /applications/industrial-humidity-monitoring | /catalog/humidity-temperature-instruments |
| /applications/climate-chamber-humidity | /catalog/humidity-temperature-instruments |
| /applications/glove-box-oxygen-analysis | /catalog/oxygen-analyzers |

应用页只新增一个相关分类链接，不把现有正文重复复制到分类页。

分类页的产品链接使用原 `/products/<slug>`；英语加 `/en`。现有产品页可增加所属分类的返回链接，链接名称沿用分类导航标签，不重写正文。Optidew 在命名和正文一致性修正获批前不新增分类推荐链接。

分类询价只链接 `/contact` 或 `/en/contact`，不传入系统未支持的分类参数。产品页原型号带入询价流程保持不变。

## 三、三类分类页完整正文

下列文字为每页拟发布的完整新增内容，不再另写长篇 SEO 文章。中文说明、字段名、审核提示及链接表中的备注不放到网站正文。

每页顺序：面包屑 → H1/简介 → 产品类型锚点 → 分组产品 → 四项选型条件 → 相关应用 → 两条 FAQ → 询价按钮。
产品图片继续引用现有目录图片；不新造产品照片。每项卡片的型号作为 H3，分组标签作为 H2。

### 3.1 露点与气体水分仪表

#### 俄语完整内容

正式路径：`/catalog/dew-point-instruments`

Title：Измерители точки росы и влажности газа | SenseMeter

Meta description：Датчики, онлайн-гигрометры и переносные приборы для измерения точки росы и влаги в газе. Michell и Vaisala: подбор и запрос цены.

面包屑：Главная → Каталог → Точка росы и влага в газе

H1：Приборы для измерения точки росы и влажности газа

Приборы для контроля сухости сжатого воздуха и технологических газов. Выберите преобразователь для постоянного измерения, систему с индикацией или переносной гигрометр для проверки нескольких точек. Диапазон, давление и условия отбора пробы согласуются для конкретной модели.

产品类型锚点：

- Преобразователи и датчики：`#transmitters`
- Системы постоянного контроля：`#online`
- Переносные измерения：`#portable`

产品卡片清单（图片和详细资料链接保持原有资源；用途短句不替代规格表）：

| 分组 H2 | 型号 H3 | 品牌 | 用途短句 | 详情路径 |
| --- | --- | --- | --- | --- |
| Преобразователи и датчики | Easidew 34 / Easidew M12 | Michell | преобразователи точки росы | /products/easidew-34-m12 |
| Преобразователи и датчики | DMT143 / DMT143L | VAISALA | датчики точки росы | /products/dmt143-dmt143l |
| Преобразователи и датчики | DMT153 | VAISALA | преобразователь точки росы | /products/dmt153 |
| Преобразователи и датчики | Pura | Michell | преобразователь следовой влажности газа | /products/pura-transmitter |
| Преобразователи и датчики | Easidew PRO I.S. | Michell | искробезопасный датчик точки росы | /products/easidew-pro-is |
| Преобразователи и датчики | Easidew PRO XP | Michell | взрывозащищенный датчик точки росы | /products/easidew-pro-xp |
| Системы постоянного контроля | Easidew Online | Michell | система контроля точки росы | /products/easidew-online |
| Системы постоянного контроля | SF82 Online | Michell | гигрометр для контроля точки росы | /products/sf82-online |
| Переносные измерения | MDM300 / MDM300 I.S. | Michell | портативный гигрометр точки росы | /products/mdm300 |

H2：Что учесть при выборе прибора

- Состав газа и требуемый диапазон точки росы по воде
- Давление в линии и в точке измерения, условия отбора пробы
- Постоянное измерение или переносная проверка
- Выходной сигнал, монтаж и требования к исполнению для опасной зоны

H2：Области применения

- Промышленные измерители точки росы для сжатого воздуха：`/applications/compressed-air-dew-point`
- Анализаторы влажности газа для промышленных процессов：`/applications/natural-gas-moisture-monitoring`

H2：Частые вопросы

H3：Как выбрать онлайн-прибор или переносной гигрометр?

Онлайн-прибор нужен для постоянного контроля одной линии, переносной гигрометр удобен для проверок нескольких точек. Окончательный выбор зависит от газа, давления и требований к измерению.

H3：Почему нужно указать давление в точке измерения?

Точка росы по воде зависит от давления газа. При измерении после снижения давления результат нельзя напрямую сравнивать с точкой росы в линии. Укажите давление в линии и в точке измерения, а также условия, к которым относится требуемое значение.

询价按钮：Запросить предложение

按钮链接：`/contact`
#### 英语完整内容

正式路径：`/en/catalog/dew-point-instruments`

Title：Dew-Point and Gas Moisture Instruments | SenseMeter

Meta description：Dew-point transmitters, online hygrometers and portable instruments from Michell and Vaisala. Explore product types and request a quotation.

面包屑：Home → Product Catalog → Dew Point and Gas Moisture

H1：Dew-Point and Gas Moisture Instruments

Instruments for monitoring dryness in compressed air and process gases. Choose a transmitter for continuous measurement, a monitoring system with a display, or a portable hygrometer for checks at multiple points. Range, pressure and sampling conditions must match the selected model.

产品类型锚点：

- Transmitters and Sensors：`#transmitters`
- Continuous Monitoring Systems：`#online`
- Portable Measurements：`#portable`

产品卡片清单（图片和详细资料链接保持原有资源；用途短句不替代规格表）：

| 分组 H2 | 型号 H3 | 品牌 | 用途短句 | 详情路径 |
| --- | --- | --- | --- | --- |
| Transmitters and Sensors | Easidew 34 / Easidew M12 | Michell | Dew-Point Transmitters | /en/products/easidew-34-m12 |
| Transmitters and Sensors | DMT143 / DMT143L | VAISALA | Dew-Point Transmitters | /en/products/dmt143-dmt143l |
| Transmitters and Sensors | DMT153 | VAISALA | Dew-Point Transmitter | /en/products/dmt153 |
| Transmitters and Sensors | Pura | Michell | Trace Moisture Transmitter | /en/products/pura-transmitter |
| Transmitters and Sensors | Easidew PRO I.S. | Michell | Intrinsically Safe Dew-Point Transmitter | /en/products/easidew-pro-is |
| Transmitters and Sensors | Easidew PRO XP | Michell | Explosion-Proof Dew-Point Transmitter | /en/products/easidew-pro-xp |
| Continuous Monitoring Systems | Easidew Online | Michell | Dew-Point Monitoring System | /en/products/easidew-online |
| Continuous Monitoring Systems | SF82 Online | Michell | Online Dew-Point Hygrometer | /en/products/sf82-online |
| Portable Measurements | MDM300 / MDM300 I.S. | Michell | Portable Dew-Point Hygrometer | /en/products/mdm300 |

H2：What to consider when selecting an instrument

- Gas composition and required water dew-point range
- Line pressure, measurement pressure and sampling conditions
- Continuous measurement or portable checks
- Output signal, mounting and any hazardous-area requirements

H2：Related Applications

- Compressed air dew point meters for testing and monitoring：`/en/applications/compressed-air-dew-point`
- Natural gas moisture and dew point monitoring：`/en/applications/natural-gas-moisture-monitoring`

H2：Frequently Asked Questions

H3：Should I choose an online instrument or a portable hygrometer?

An online instrument provides continuous monitoring at one line, while a portable hygrometer supports checks at multiple points. The final choice depends on gas, pressure and measurement requirements.

H3：Why specify the pressure at the measurement point?

Water dew point depends on gas pressure. A reading taken after pressure reduction cannot be compared directly with the line-pressure dew point. Specify both pressures and the pressure to which your required dew-point value refers.

询价按钮：Request a Quote

按钮链接：`/en/contact`

审核备注：Optidew 未列入本分类的首批九款产品。第五部分单独批准后再决定是否增加冷镜仪表分组，不将其误放为烃露点分析仪。

### 3.2 工业温湿度仪表

#### 俄语完整内容

正式路径：`/catalog/humidity-temperature-instruments`

Title：Приборы для измерения влажности и температуры | SenseMeter

Meta description：Зонды, преобразователи и ручные приборы влажности и температуры Rotronic и Vaisala. Подбор для промышленных задач и запрос цены.

面包屑：Главная → Каталог → Влажность и температура

H1：Приборы для измерения влажности и температуры

Зонды, преобразователи и ручные приборы для измерения относительной влажности и температуры. Выберите тип прибора для интеграции в систему мониторинга, установки в процессе или переносной проверки. Условия среды, монтаж и совместимость подключения проверяются для конкретного исполнения.

产品类型锚点：

- Зонды влажности и температуры：`#probes`
- Преобразователи для систем контроля：`#transmitters`
- Ручные приборы：`#handheld`

产品卡片清单（图片和详细资料链接保持原有资源；用途短句不替代规格表）：

| 分组 H2 | 型号 H3 | 品牌 | 用途短句 | 详情路径 |
| --- | --- | --- | --- | --- |
| Зонды влажности и температуры | HC2A Series | ROTRONIC | зонды влажности и температуры | /products/hc2a-series |
| Зонды влажности и температуры | HC2A-IC / HC2A-IM / HC2A-IE | ROTRONIC | промышленные зонды влажности | /products/hc2a-industrial |
| Зонды влажности и температуры | HMP3 | VAISALA | промышленный зонд влажности и температуры | /products/hmp3-hmpx |
| Преобразователи для систем контроля | HygroFlex1 | ROTRONIC | преобразователь влажности и температуры | /products/hygroflex1 |
| Преобразователи для систем контроля | HMT310 | VAISALA | преобразователь влажности и температуры | /products/hmt310 |
| Преобразователи для систем контроля | HMT370EX | VAISALA | искробезопасный датчик влажности | /products/hmt370ex |
| Ручные приборы | HP31 / HP32 | ROTRONIC | ручные приборы влажности и температуры | /products/hp31-hp32 |

H2：Что учесть при выборе прибора

- Диапазоны температуры и относительной влажности, риск конденсации
- Монтаж в помещении, воздуховоде или процессе и воздействие загрязнений
- Питание, выходной сигнал и совместимость с существующей системой
- Требования к калибровке, документации и исполнению для опасной зоны

H2：Области применения

- Промышленные датчики влажности и температуры：`/applications/industrial-humidity-monitoring`
- Измерение влажности в лабораториях и климатических камерах：`/applications/climate-chamber-humidity`

H2：Частые вопросы

H3：Всегда ли зонду нужен отдельный преобразователь?

Нет. Некоторые зонды имеют собственный цифровой или аналоговый выход и могут подключаться к совместимой системе напрямую. Отдельный преобразователь может понадобиться для индикации или другого интерфейса. Проверьте питание, протокол и совместимость выбранной модели.

H3：Какие данные нужны для подбора?

Укажите температуру, диапазон влажности, условия среды, место установки и нужный сигнал. Для замены существующего прибора добавьте модель и данные подключения.

询价按钮：Запросить предложение

按钮链接：`/contact`
#### 英语完整内容

正式路径：`/en/catalog/humidity-temperature-instruments`

Title：Industrial Humidity and Temperature Instruments | SenseMeter

Meta description：Humidity and temperature probes, transmitters and handheld meters from Rotronic and Vaisala. Explore product types and request a quotation.

面包屑：Home → Product Catalog → Humidity and Temperature

H1：Industrial Humidity and Temperature Instruments

Probes, transmitters and handheld instruments for measuring relative humidity and temperature. Select a product type for monitoring-system integration, process installation or portable checks. Environmental conditions, mounting and connection compatibility must match the chosen configuration.

产品类型锚点：

- Humidity and Temperature Probes：`#probes`
- Monitoring Transmitters：`#transmitters`
- Handheld Instruments：`#handheld`

产品卡片清单（图片和详细资料链接保持原有资源；用途短句不替代规格表）：

| 分组 H2 | 型号 H3 | 品牌 | 用途短句 | 详情路径 |
| --- | --- | --- | --- | --- |
| Humidity and Temperature Probes | HC2A Series | ROTRONIC | Humidity and Temperature Probes | /en/products/hc2a-series |
| Humidity and Temperature Probes | HC2A-IC / HC2A-IM / HC2A-IE | ROTRONIC | Industrial Humidity Probes | /en/products/hc2a-industrial |
| Humidity and Temperature Probes | HMP3 | VAISALA | Industrial Humidity and Temperature Probe | /en/products/hmp3-hmpx |
| Monitoring Transmitters | HygroFlex1 | ROTRONIC | Humidity and Temperature Transmitter | /en/products/hygroflex1 |
| Monitoring Transmitters | HMT310 | VAISALA | Humidity and Temperature Transmitter | /en/products/hmt310 |
| Monitoring Transmitters | HMT370EX | VAISALA | Intrinsically Safe Humidity Transmitter | /en/products/hmt370ex |
| Handheld Instruments | HP31 / HP32 | ROTRONIC | Handheld Humidity and Temperature Meters | /en/products/hp31-hp32 |

H2：What to consider when selecting an instrument

- Temperature and relative humidity ranges, including condensation risk
- Room, duct or process mounting and exposure to contaminants
- Power supply, output signal and existing-system compatibility
- Calibration, documentation and any hazardous-area requirements

H2：Related Applications

- Industrial humidity and temperature monitoring：`/en/applications/industrial-humidity-monitoring`
- Climate chamber humidity and temperature measurement：`/en/applications/climate-chamber-humidity`

H2：Frequently Asked Questions

H3：Does a probe always need a separate transmitter?

No. Some probes have their own digital or analog output and can connect directly to a compatible system. A separate transmitter may be needed for a display or a different interface. Check the selected model's power supply, protocol and compatibility.

H3：What information is needed for selection?

Provide temperature, humidity range, environmental conditions, mounting location and required signals. For a replacement, include the existing model and connection details.

询价按钮：Request a Quote

按钮链接：`/en/contact`

### 3.3 氧分析仪

#### 俄语完整内容

正式路径：`/catalog/oxygen-analyzers`

Title：Промышленные и переносные анализаторы кислорода | SenseMeter

Meta description：Анализаторы кислорода AII для промышленных газов, переносных проверок и перчаточных боксов. Выбор ppm или процентного диапазона и запрос цены.

面包屑：Главная → Каталог → Анализаторы кислорода

H1：Анализаторы кислорода для промышленных газов

Анализаторы для контроля кислорода в промышленных газах и инертных средах. Выберите переносной прибор, анализатор для постоянного контроля или решение для перчаточного бокса. Требуемый диапазон, состав газа и условия отбора пробы проверяются для выбранной модели.

产品类型锚点：

- Переносные анализаторы：`#portable`
- Промышленный контроль газов：`#process`
- Перчаточные боксы：`#glove-box`

产品卡片清单（图片和详细资料链接保持原有资源；用途短句不替代规格表）：

| 分组 H2 | 型号 H3 | 品牌 | 用途短句 | 详情路径 |
| --- | --- | --- | --- | --- |
| Переносные анализаторы | GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500 | AII | переносные анализаторы O2 | /products/gpr-1000-1100-2000-3500 |
| Промышленный контроль газов | GPR-1500 | AII | анализатор следового кислорода | /products/gpr-1500 |
| Промышленный контроль газов | GPR-1900 / GPR-2900 | AII | панельные анализаторы кислорода | /products/gpr-1900-2900 |
| Промышленный контроль газов | GPR-1600 / GPR-2600 / GPR-3100 | AII | анализаторы кислорода | /products/gpr-1600-2600-3100 |
| Перчаточные боксы | GPR-1500 GB / GPR-2500 GB | AII | анализаторы O2 для перчаточных боксов | /products/gpr-1500gb-2500gb |

H2：Что учесть при выборе анализатора

- Ожидаемая концентрация кислорода, диапазон и требуемая точность
- Состав фонового газа, давление и расход пробы
- Переносная проверка, постоянный контроль или перчаточный бокс
- Совместимость сенсора, выходные сигналы и условия установки

H2：Области применения

- Промышленные анализаторы кислорода для контроля чистоты газа：`/applications/glove-box-oxygen-analysis`

H2：Частые вопросы

H3：Подойдет ли один анализатор для ppm и процентных концентраций?

Не обязательно. В серии могут быть разные модели для следового кислорода, процентных концентраций и контроля чистоты кислорода. Выбор единиц на дисплее сам по себе не меняет возможностей сенсора. Укажите ожидаемую концентрацию и требуемую точность.

H3：Можно ли выбрать анализатор только по диапазону?

Нет. Также необходимо учитывать состав газа, условия пробы, монтаж сенсора и совместимость выходных сигналов. Эти данные помогают подобрать подходящее исполнение.

询价按钮：Запросить предложение

按钮链接：`/contact`
#### 英语完整内容

正式路径：`/en/catalog/oxygen-analyzers`

Title：Industrial and Portable Oxygen Analyzers | SenseMeter

Meta description：AII oxygen analyzers for industrial gases, portable checks and glove boxes. Explore ppm or percent measurement needs and request a quotation.

面包屑：Home → Product Catalog → Oxygen Analyzers

H1：Oxygen Analyzers for Industrial Gases

Analyzers for oxygen monitoring in industrial gases and inert atmospheres. Choose a portable instrument, a continuous process analyzer or a glove-box solution. Measurement range, background gas and sampling conditions must be reviewed for the selected model.

产品类型锚点：

- Portable Analyzers：`#portable`
- Industrial Gas Monitoring：`#process`
- Glove Boxes：`#glove-box`

产品卡片清单（图片和详细资料链接保持原有资源；用途短句不替代规格表）：

| 分组 H2 | 型号 H3 | 品牌 | 用途短句 | 详情路径 |
| --- | --- | --- | --- | --- |
| Portable Analyzers | GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500 | AII | Portable Oxygen Analyzers | /en/products/gpr-1000-1100-2000-3500 |
| Industrial Gas Monitoring | GPR-1500 | AII | Trace Oxygen Analyzer | /en/products/gpr-1500 |
| Industrial Gas Monitoring | GPR-1900 / GPR-2900 | AII | Panel Oxygen Analyzers | /en/products/gpr-1900-2900 |
| Industrial Gas Monitoring | GPR-1600 / GPR-2600 / GPR-3100 | AII | Industrial Oxygen Analyzers | /en/products/gpr-1600-2600-3100 |
| Glove Boxes | GPR-1500 GB / GPR-2500 GB | AII | Glove Box Oxygen Analyzers | /en/products/gpr-1500gb-2500gb |

H2：What to consider when selecting an analyzer

- Expected oxygen concentration, range and required accuracy
- Background gas composition, sample pressure and flow
- Portable checks, continuous monitoring or a glove box
- Sensor compatibility, output signals and installation conditions

H2：Related Applications

- Glove box and glovebox oxygen analysis：`/en/applications/glove-box-oxygen-analysis`

H2：Frequently Asked Questions

H3：Can one analyzer cover both ppm and percent concentrations?

Not necessarily. A series may include different models for trace oxygen, percent concentrations and oxygen purity. Changing display units does not change the sensor's measurement capability. Specify the expected concentration and required accuracy.

H3：Can I select an analyzer based only on its range?

No. Gas composition, sample conditions, sensor installation and output compatibility also matter. Provide these details to help select a suitable configuration.

询价按钮：Request a Quote

按钮链接：`/en/contact`

## 四、22 个产品的完整标题与摘要

下表述按页面逐项给出俄英新内容。每项列出 RU/EN 正式路径；原标题对应的模板问题不在正文中展示。

规则：

- Title 已包含一次 ` | SenseMeter`；实现时不得在布局层重复追加。
- description 是独立摘要，不再把 overview 加上统一询价句后在句中截断。
- 155 字符是本草案的编辑预算，不是 Google 的排名规则，也不保证搜索结果采用或完整显示。
- Open Graph 的标题和摘要跟随相同语言的新值，图片继续使用对应仪器图，不改成通用广告图。
- 除 Optidew 的条件修正外，H1/显示型号、正文、参数、PDF 和询价流程保持原有内容。
- Easidew PRO I.S. 英文标题含站名为 72 字符，GPR GB 俄语标题为 74 字符，属于长度复查提醒，不强行截掉用途或手套箱术语。

### 4.1 Easidew PRO I.S.

用途说明：本安型露点变送器。

RU 路径：`/products/easidew-pro-is`

EN 路径：`/en/products/easidew-pro-is`

RU Title：Easidew PRO I.S. - искробезопасный датчик точки росы | SenseMeter

RU description：Easidew PRO I.S. для измерения точки росы в газах и технологических средах. Подбор исполнения, документация и запрос цены у SenseMeter.

EN Title：Easidew PRO I.S. - Intrinsically Safe Dew-Point Transmitter | SenseMeter

EN description：Easidew PRO I.S. dew-point transmitter for process gases. Review the required configuration, documentation and request a quotation.

### 4.2 Easidew 34 / Easidew M12

用途说明：用于干燥机和工艺气体的紧凑型露点变送器。

RU 路径：`/products/easidew-34-m12`

EN 路径：`/en/products/easidew-34-m12`

RU Title：Easidew 34 / M12 - преобразователи точки росы | SenseMeter

RU description：Easidew 34 и Easidew M12 для контроля точки росы в осушителях и технических газах. Подбор подключения, документы и запрос цены.

EN Title：Easidew 34 / M12 - Dew-Point Transmitters | SenseMeter

EN description：Easidew 34 and Easidew M12 dew-point transmitters for dryers and process gases. Review connections, documentation and request pricing.

### 4.3 Easidew Online

用途说明：连续露点监测系统。

RU 路径：`/products/easidew-online`

EN 路径：`/en/products/easidew-online`

RU Title：Easidew Online - система контроля точки росы | SenseMeter

RU description：Easidew Online для постоянного контроля точки росы в сухих газах и сжатом воздухе. Дисплей, сигналы, документация и запрос цены.

EN Title：Easidew Online - Dew-Point Monitoring System | SenseMeter

EN description：Easidew Online for continuous dew-point monitoring in dry gases and compressed air. Explore display, signals, documents and request pricing.

### 4.4 Easidew PRO XP

用途说明：防爆型工艺露点变送器。

RU 路径：`/products/easidew-pro-xp`

EN 路径：`/en/products/easidew-pro-xp`

RU Title：Easidew PRO XP - взрывозащищенный датчик точки росы | SenseMeter

RU description：Easidew PRO XP для измерения точки росы в природном и технологическом газе. Подбор исполнения и условий отбора пробы, документы и цена по запросу.

EN Title：Easidew PRO XP - Explosion-Proof Dew-Point Transmitter | SenseMeter

EN description：Easidew PRO XP dew-point transmitter for natural and process gases. Review configuration, sampling requirements, documents and request a quote.

### 4.5 GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500

用途说明：便携式氧分析仪系列。

RU 路径：`/products/gpr-1000-1100-2000-3500`

EN 路径：`/en/products/gpr-1000-1100-2000-3500`

RU Title：GPR-1000/1100/2000/3500 - переносные анализаторы O2 | SenseMeter

RU description：Переносные анализаторы GPR-1000/1100/2000/3500. Модель выбирается для следового кислорода, процентных концентраций или чистоты O2. Цена по запросу.

EN Title：GPR-1000/1100/2000/3500 - Portable Oxygen Analyzers | SenseMeter

EN description：GPR-1000/1100/2000/3500 portable oxygen analyzers. Model choice depends on trace, percent or oxygen-purity measurement needs. Request a quote.

审核门槛：系列覆盖不等于每个型号共用量程；实际供货版本、测量范围和校准范围分别核实。

已记录的官方依据：[资料 1](https://www.processsensing.com/docs/datasheet/Portable-Oxygen-Analyzers-99963-UK-datasheet-v3-1.pdf)。资料不确认库存或供货。

### 4.6 GPR-1500

用途说明：工业微量氧分析仪。

RU 路径：`/products/gpr-1500`

EN 路径：`/en/products/gpr-1500`

RU Title：GPR-1500 - анализатор следового кислорода | SenseMeter

RU description：GPR-1500 для анализа следового кислорода в чистых газах и инертных средах. Применение, документация и запрос цены у SenseMeter.

EN Title：GPR-1500 - Trace Oxygen Analyzer | SenseMeter

EN description：GPR-1500 trace oxygen analyzer for clean gases and inert atmospheres. Explore applications, documentation and request a quotation.

### 4.7 GPR-1500 GB / GPR-2500 GB

用途说明：手套箱氧分析仪系列。

RU 路径：`/products/gpr-1500gb-2500gb`

EN 路径：`/en/products/gpr-1500gb-2500gb`

RU Title：GPR-1500 GB / 2500 GB - анализаторы O2 для перчаточных боксов | SenseMeter

RU description：GPR-1500 GB и GPR-2500 GB для контроля кислорода в перчаточных боксах. Подбор сенсора и подключения, документация и цена по запросу.

EN Title：GPR-1500 GB / 2500 GB - Glove Box Oxygen Analyzers | SenseMeter

EN description：GPR-1500 GB and GPR-2500 GB for oxygen monitoring in glove boxes. Review sensor installation, documentation and request a quotation.

### 4.8 GPR-1600 / GPR-2600 / GPR-3100

用途说明：工业气体氧分析仪系列。

RU 路径：`/products/gpr-1600-2600-3100`

EN 路径：`/en/products/gpr-1600-2600-3100`

RU Title：GPR-1600/2600/3100 - анализаторы кислорода | SenseMeter

RU description：GPR-1600, GPR-2600 и GPR-3100 для анализа кислорода в промышленных газах. Выбор диапазона и конфигурации, документы и запрос цены.

EN Title：GPR-1600/2600/3100 - Industrial Oxygen Analyzers | SenseMeter

EN description：GPR-1600, GPR-2600 and GPR-3100 oxygen analyzers for industrial gases. Review measurement range, configuration, documents and request pricing.

### 4.9 GPR-1900 / GPR-2900

用途说明：面板式氧分析仪系列。

RU 路径：`/products/gpr-1900-2900`

EN 路径：`/en/products/gpr-1900-2900`

RU Title：GPR-1900 / 2900 - панельные анализаторы кислорода | SenseMeter

RU description：GPR-1900 и GPR-2900 для контроля кислорода в газовых системах. Панельная установка, удаленный сенсор, документация и запрос цены.

EN Title：GPR-1900 / 2900 - Panel Oxygen Analyzers | SenseMeter

EN description：GPR-1900 and GPR-2900 oxygen analyzers for gas monitoring systems. Review panel installation, remote sensors, documents and request pricing.

### 4.10 HC2A-IC / HC2A-IM / HC2A-IE

用途说明：工业温湿度探头系列。

RU 路径：`/products/hc2a-industrial`

EN 路径：`/en/products/hc2a-industrial`

RU Title：HC2A-IC/IM/IE - промышленные зонды влажности | SenseMeter

RU description：HC2A-IC, HC2A-IM и HC2A-IE для измерения влажности и температуры в промышленных условиях. Подбор зонда, документация и запрос цены.

EN Title：HC2A-IC/IM/IE - Industrial Humidity Probes | SenseMeter

EN description：HC2A-IC, HC2A-IM and HC2A-IE probes for industrial humidity and temperature measurement. Review probe selection, documents and request pricing.

### 4.11 HC2A Series

用途说明：温湿度探头系列。

RU 路径：`/products/hc2a-series`

EN 路径：`/en/products/hc2a-series`

RU Title：HC2A Series - зонды влажности и температуры | SenseMeter

RU description：Rotronic HC2A Series для измерения влажности и температуры в системах мониторинга и климатических камерах. Документация и запрос цены.

EN Title：HC2A Series - Humidity and Temperature Probes | SenseMeter

EN description：Rotronic HC2A Series humidity and temperature probes for monitoring systems and climate chambers. Explore documentation and request a quote.

### 4.12 HP31 / HP32

用途说明：手持温湿度仪。

RU 路径：`/products/hp31-hp32`

EN 路径：`/en/products/hp31-hp32`

RU Title：HP31 / HP32 - ручные приборы влажности и температуры | SenseMeter

RU description：HP31 и HP32 для проверок влажности и температуры с записью данных. HP31 со встроенным зондом, HP32 со сменными зондами. Подбор и запрос цены.

EN Title：HP31 / HP32 - Handheld Humidity and Temperature Meters | SenseMeter

EN description：HP31 and HP32 handheld humidity and temperature meters with data logging. HP31 has a fixed probe; HP32 uses interchangeable probes. Request a quote.

已记录的官方依据：[资料 1](https://www.processsensing.com/docs/datasheet/59073E_HP31-HP32.pdf)。资料不确认库存或供货。

### 4.13 MDM300 / MDM300 I.S.

用途说明：便携露点湿度计，保留近期页面内容。

RU 路径：`/products/mdm300`

EN 路径：`/en/products/mdm300`

RU Title：MDM300 - портативный гигрометр точки росы | SenseMeter

RU description：MDM300 и MDM300 I.S. для переносных измерений точки росы в сжатом воздухе и газах. Подбор версии и отбора пробы, документы и запрос цены.

EN Title：MDM300 - Portable Dew-Point Hygrometer | SenseMeter

EN description：MDM300 and MDM300 I.S. for portable dew-point checks in compressed air and gases. Review version, sampling needs, documents and request pricing.

### 4.14 Optidew-HZ

用途说明：基于已找到的官方资料准备冷镜湿度仪文案；现有 -HZ 命名及正文需一并审核。

RU 路径：`/products/optidew-hz`

EN 路径：`/en/products/optidew-hz`

RU Title：Optidew - гигрометр с охлаждаемым зеркалом | SenseMeter

RU description：Michell Optidew для измерения точки росы и влажности в промышленных условиях и лабораториях. Подбор исполнения, документы и запрос цены.

EN Title：Optidew - Chilled-Mirror Hygrometer | SenseMeter

EN description：Michell Optidew chilled-mirror hygrometer for industrial humidity control and laboratory measurements. Review documents and request a quotation.

审核门槛：本项暂停应用：标题和摘要必须与第五部分显示名及正文修正一起批准，不能仅改 meta 而留下烃露点正文。

已记录的官方依据：[资料 1](https://www.processsensing.com/en-us/products/optidew-chilled-mirror-hygrometer.htm)；[资料 2](https://assets.dwyeromega.com/manuals-do/MI_Optidew_97551-v4-3.pdf)；[资料 3](https://www.processsensing.com/docs/datasheet/Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf)。资料不确认库存或供货。

### 4.15 SF82 Online

用途说明：在线露点监测仪。

RU 路径：`/products/sf82-online`

EN 路径：`/en/products/sf82-online`

RU Title：SF82 Online - гигрометр для контроля точки росы | SenseMeter

RU description：SF82 Online для контроля точки росы в сжатом воздухе и осушителях. Пробоотборная система, сигналы, документация и запрос цены.

EN Title：SF82 Online - Online Dew-Point Hygrometer | SenseMeter

EN description：SF82 Online dew-point hygrometer for compressed air and dryers. Review the sampling system, output signals, documents and request pricing.

### 4.16 Pura

用途说明：高纯气体微量水分变送器。

RU 路径：`/products/pura-transmitter`

EN 路径：`/en/products/pura-transmitter`

RU Title：Pura - преобразователь следовой влажности газа | SenseMeter

RU description：Michell Pura для измерения следовой влажности в высокочистых газах. Подбор подключения и выходного сигнала, документы и запрос цены.

EN Title：Pura - Trace Moisture Transmitter | SenseMeter

EN description：Michell Pura trace moisture transmitter for ultra-high-purity gases. Review process connections, output signals, documents and request pricing.

### 4.17 HygroFlex1

用途说明：HVAC 温湿度变送器。

RU 路径：`/products/hygroflex1`

EN 路径：`/en/products/hygroflex1`

RU Title：HygroFlex1 - преобразователь влажности и температуры | SenseMeter

RU description：HygroFlex1 для измерения влажности и температуры в HVAC и системах контроля воздуха. Подбор исполнения, документация и запрос цены.

EN Title：HygroFlex1 - Humidity and Temperature Transmitter | SenseMeter

EN description：HygroFlex1 humidity and temperature transmitter for HVAC and air monitoring systems. Review configuration, documentation and request pricing.

### 4.18 HMT370EX

用途说明：本安型温湿度变送器，突出主用途而非仅写露点。

RU 路径：`/products/hmt370ex`

EN 路径：`/en/products/hmt370ex`

RU Title：HMT370EX - искробезопасный датчик влажности | SenseMeter

RU description：Vaisala HMT370EX для влажности и температуры в опасных зонах. Подбор зонда и исполнения по требованиям объекта. Документы и цена по запросу.

EN Title：HMT370EX - Intrinsically Safe Humidity Transmitter | SenseMeter

EN description：Vaisala HMT370EX humidity and temperature transmitter for hazardous areas. Probe and configuration selection for site requirements. Request a quote.

审核门槛：本安为官方家族定位，不等于本站已核实具体供货配置及安装符合性；证书和安装条件需对应核验。

已记录的官方依据：[资料 1](https://www.vaisala.com/en/products/instruments-sensors-and-other-measurement-devices/instruments-industrial-measurements/humidity-normal-or-wet-conditions/hmt370ex)。资料不确认库存或供货。

### 4.19 HMT310

用途说明：工业温湿度变送器，修正按品牌套用的用途标题。

RU 路径：`/products/hmt310`

EN 路径：`/en/products/hmt310`

RU Title：HMT310 - преобразователь влажности и температуры | SenseMeter

RU description：Vaisala HMT310 для измерения влажности и температуры в промышленных процессах. Подбор зонда и монтажа, документация и запрос цены.

EN Title：HMT310 - Humidity and Temperature Transmitter | SenseMeter

EN description：Vaisala HMT310 humidity and temperature transmitter for industrial processes. Review probe and mounting options, documents and request a quotation.

### 4.20 HMP3

用途说明：工业温湿度探头，保留近期页面及原网址。

RU 路径：`/products/hmp3-hmpx`

EN 路径：`/en/products/hmp3-hmpx`

RU Title：HMP3 - промышленный зонд влажности и температуры | SenseMeter

RU description：Vaisala HMP3: зонд влажности и температуры с Modbus RTU по RS-485. Прямое подключение к совместимой системе или через Indigo. Цена по запросу.

EN Title：HMP3 - Industrial Humidity and Temperature Probe | SenseMeter

EN description：Vaisala HMP3 humidity and temperature probe with Modbus RTU over RS-485. Connect to a compatible system directly or via Indigo. Request a quote.

已记录的官方依据：[资料 1](https://www.vaisala.com/en/products/instruments-sensors-and-other-measurement-devices/instruments-industrial-measurements/hmp3)。资料不确认库存或供货。

### 4.21 DMT153

用途说明：OEM 露点变送器。

RU 路径：`/products/dmt153`

EN 路径：`/en/products/dmt153`

RU Title：DMT153 - преобразователь точки росы | SenseMeter

RU description：Vaisala DMT153 для контроля точки росы в сухом воздухе, осушителях и OEM-системах. Подбор подключения, документы и запрос цены.

EN Title：DMT153 - Dew-Point Transmitter | SenseMeter

EN description：Vaisala DMT153 dew-point transmitter for dry air, dryers and OEM systems. Review connection requirements, documentation and request pricing.

### 4.22 DMT143 / DMT143L

用途说明：紧凑型露点变送器系列。

RU 路径：`/products/dmt143-dmt143l`

EN 路径：`/en/products/dmt143-dmt143l`

RU Title：DMT143 / DMT143L - датчики точки росы | SenseMeter

RU description：DMT143 и DMT143L для контроля точки росы в осушителях и сухих газах. Подбор места установки и исполнения, документы и запрос цены.

EN Title：DMT143 / DMT143L - Dew-Point Transmitters | SenseMeter

EN description：DMT143 and DMT143L dew-point transmitters for dryers and dry gases. Review installation and configuration requirements, documents and request pricing.

## 五、Optidew 正文修正完整草案

状态：单独审核，未获准替换正式内容。官方资料支持冷镜湿度用途，未支持原有 Optidew-HZ 名称与烃露点定位。不能把“未找到后缀依据”写成“该型号在任何时期都不存在”。

保留 RU `/products/optidew-hz`、EN `/en/products/optidew-hz`，不通过改 URL 解决显示名问题。不将现有页面自动替换为 401、501 或 Condumax II。

### 5.1 统一显示名与资料

- 拟用显示名/H1：Optidew。仅在用户批准从未核实的 -HZ 名称改为官方家族名后应用。
- 品牌：Michell。
- 图片：保留 `assets/products/Michell_Instruments_Optidew.png`，预览时核对其确为对应产品图片。
- RU 图片替代文字：Michell Optidew - гигрометр с охлаждаемым зеркалом
- EN 图片替代文字：Michell Optidew chilled-mirror hygrometer
- PDF 保留 `Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf`。
- 搜索标题、description 直接使用第四部分 Optidew 项，不另加互相矛盾的表述。
- 不通过链接官方资料暗示 SenseMeter 是授权经销商。

### 5.2 俄语正文替换稿

H2：Обзор продукта

Michell Optidew - гигрометр с охлаждаемым зеркалом для измерения точки росы и влажности. Прибор применяется для промышленного контроля влажности и лабораторных измерений. Для подбора укажите условия измерения и требуемое исполнение.

H2：Особенности

- Измерение точки росы методом охлаждаемого зеркала.
- Исполнение и интерфейсы выбираются по документации модели.
- Документация для уточнения конфигурации перед заказом.

H2：Области применения

- Промышленный контроль влажности.
- Лабораторные измерения.
- Контроль условий в климатических камерах.

H2：Данные для подбора

- Требуемый диапазон точки росы и точность.
- Температура, давление и состав измеряемой среды.
- Способ установки и необходимые интерфейсы.
- Исполнение, количество и требования к документации.

按钮：Запросить предложение

### 5.3 英语正文替换稿

H2：Product Overview

Michell Optidew is a chilled-mirror hygrometer for dew-point and humidity measurement in industrial humidity control and laboratory work. Include your measurement conditions and required configuration when requesting a quotation.

H2：Features

- Dew-point measurement using a chilled mirror.
- Configuration and interfaces selected against model documentation.
- Product documents for configuration review before ordering.

H2：Applications

- Industrial humidity control.
- Laboratory measurements.
- Climate chamber monitoring.

H2：Selection Information

- Required dew-point range and accuracy.
- Temperature, pressure and sample composition.
- Mounting arrangement and required interfaces.
- Configuration, quantity and documentation requirements.

按钮：Request a Quote

### 5.4 必须同时清理的旧内容

不能只替换 overview；原 highlights、applications、metadata、卡片用途、图片文字及相关应用链接里的“烃露点”表述也要一起查清。

原参数区的统一范围、精度、屏幕尺寸和接口不能直接视为任何供货配置均具备。批准修正后，如没有具体配置依据，先不展示该数值参数块；保留官方 PDF 与上述选型信息，不能把“待核实”占位字样作为产品规格发布。

询价继续使用现有页面入口，显示名获批为 Optidew 后确认该名称能正确带入联系页和邮件。不能自动向客户承诺 401/501 的库存、交期、认证或标准附件。

官方依据：[Optidew 产品页](https://www.processsensing.com/en-us/products/optidew-chilled-mirror-hygrometer.htm)、[官方手册](https://assets.dwyeromega.com/manuals-do/MI_Optidew_97551-v4-3.pdf)、[对应数据表](https://www.processsensing.com/docs/datasheet/Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf)。

## 六、技术 SEO 修改要求

### 6.1 新增的六个正式路径

| 分类 | RU 完整网址 / self-canonical | EN 完整网址 / self-canonical |
| --- | --- | --- |
| Dew Point and Gas Moisture | https://sensemeter.ru/catalog/dew-point-instruments | https://sensemeter.ru/en/catalog/dew-point-instruments |
| Humidity and Temperature | https://sensemeter.ru/catalog/humidity-temperature-instruments | https://sensemeter.ru/en/catalog/humidity-temperature-instruments |
| Oxygen Analyzers | https://sensemeter.ru/catalog/oxygen-analyzers | https://sensemeter.ru/en/catalog/oxygen-analyzers |

每组俄英路径相互关联：

- `ru-RU` 指向同分类俄语路径。
- `en` 指向同分类英语路径。
- `x-default` 指向同分类俄语路径，与当前站点约定一致。
- 新分类不能 canonical 到总目录、首页或应用页；链接语言不能串页。
- 新页发布时可索引、返回 200；未知分类返回真正的 404，而不是伪装成成功的空列表。
- 私有本地预览不提交索引；如果使用公网审核环境，单独防止预览环境被索引，不能把其 noindex 带到正式站。

### 6.2 sitemap 与更新日期

- 正式上线后，六个分类路径加入现有 sitemap，不删除产品、应用或配件路径。
- 不把搜索结果、品牌筛选和页面内锚点组合批量加入 sitemap。
- 把现有全组统一固定日期改为可按实际重要内容变化维护的日期。未变化页面不统一刷新成上线当天。
- 新分类使用真实发布时间；老页面仅有重大正文、结构化数据或链接变动时据实更新，不把本稿整理日期冒充上线日期。
- 不通过每天刷新 lastmod、调整 priority 或频繁重交 sitemap 宣称提升排名。[Google sitemap 说明](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

### 6.3 标题、摘要和页面一致性

当前产品元数据使用部分型号覆盖加品牌类别回退，并对 overview 拼接询价句后截取。拟增加经审核的独立产品文案，旧函数仅对未配置项保留回退。

具体示例：HMT310 不再因 VAISALA 品牌回退而只强调“湿度和露点”；新标题明确温湿度主用途。Optidew 则不能只改搜索标题而保留烃露点正文。

标题和 description 的准确性、页面一致性优先于长度打分。搜索引擎可能重写标题和摘要，不承诺展示完全相同。[Google 标题说明](https://developers.google.com/search/docs/appearance/title-link)、[摘要说明](https://developers.google.com/search/docs/appearance/snippet)

### 6.4 结构化数据、图片和 HTML

- 新分类添加与可见导航一致的 BreadcrumbList：主页 → 总目录 → 对应分类。
- 继续使用现有产品面包屑；若未来加入分类层，必须和可见面包屑同步，不能只改隐藏标记。
- 分类卡片中的图片 alt 使用准确型号，宽高或稳定比例防止加载时挤动布局，保留已有清晰产品图。
- 原有可下载 PDF 路径不改，不给 PDF 与产品页强行设置相同 canonical。
- 可见 FAQ 保留为用户内容；不以商业 FAQ 标记承诺 Google 富结果。
- 不添加虚构 Product Offer、库存、价格、评分、评价数量或 LocalBusiness 俄罗斯地址。

### 6.5 工程边界

以下为后续实施职责划分，不是本轮已完成的代码：

- 三类内容和产品归类：独立分类数据。
- 分类渲染：独立共享组件，由 RU/EN 路由调用。
- 产品标题与摘要：独立覆盖表，由现有元数据函数读取。
- 产品图片、型号及 PDF：继续引用原目录，不复制出第二套产品库。
- 导航、目录入口：小范围接入，不继续扩大现有共享站点文件。
- Optidew 的显示名/正文修正：独立变更，单独验收，不能混入元数据修改自动应用。

## 七、实施顺序与验收

### 7.1 顺序

1. 审核本稿文案与改动边界；Optidew 显示名及正文另作明确确认。
2. 为分类卡片核对参数。首批只显示有依据的型号、用途、品牌和图片，不为等参数而捏造数值。
3. 实现三类俄英分类页和导航/目录/相关应用入口，保持旧路径可访问。
4. 应用已批准产品的标题和摘要；Optidew 未批准则保留暂停状态，不能默认为通过。
5. 完成桌面和手机预览、构建与自动检查，再安排服务器预发布。
6. 正式切换成功后再更新 sitemap、检查抓取和申请必要页面重抓；本轮没有执行这些动作。

### 7.2 验收清单

| 检查项 | 通过标准 |
| --- | --- |
| 产品覆盖 | 首批分类分别 9、7、5 项，共 21 项；Optidew 未丢失而是有明确暂停记录 |
| 双语 | 六个分类路径内容完整；标题、导航、按钮及询价路径按当前语言输出 |
| 元数据 | 44 组新标题/摘要有完整审核稿；21 项可按元数据范围应用，Optidew 受门槛约束；不重复站名、不截句 |
| 参数 | 系列不冒充单型号，范围、精度、附件、认证有适用条件与来源；不能继承未经核验的前三条参数 |
| 页面 | 320/390 像素手机和 1280/1440 像素桌面实测无横向溢出、文字遮挡或图片失真；产品列表可找到 |
| 链接 | 原 22 个产品与原五个应用路径保留；分类、语言切换、PDF、联系和型号带入正常 |
| 索引 | 六个新路径 200、self-canonical、相互语言关联、可索引；未知分类 404 |
| sitemap | 新六路径出现，原路径仍保留；lastmod 与实际内容变化相符 |
| 回归 | 品牌筛选、型号搜索、配件目录、隐私页及原邮件流程不受影响 |
| 发布 | 有预发布验证和可用旧版回退；不能以本地构建成功代替公网验证 |

上述是未来验收标准，不是本轮已通过的浏览器、服务器或询盘测试。

### 7.3 上线后怎么判断效果

记录真实上线日期，然后分别观察新分类与现有产品的搜索曝光、点击、非品牌查询、落地页及询盘来源。优先比较上线后 14/28 天与相同长度的此前窗口，考虑数据延迟和样本量；不能把测试表单、SEO 广告或所有访问都当有效采购线索。

需要 Google Search Console 与 Yandex Webmaster 的新报告才可判断变化。本轮没有新的搜索成效导出，不宣称曝光增长，也不能从竞品排名推断其广告投入。

## 八、依据和限制

- 三类正文与产品元数据来自本地已复核的两个 JSON 草案，内容包不另造一套互相冲突的主数据。
- 专业性依据与风险详见 [专业性复核记录](seo-copy-professional-review-2026-10-13.zh-CN.md)；Optidew 原始证据见 [官方资料核验](optidew-official-source-check-2026-10-13.zh-CN.md)。
- 本轮重新核对了本地目录、应用路径、导航、元数据生成和 sitemap 文件，并查阅 Google 官方标题、摘要、sitemap 说明及 Optidew 官方用途。
- 其他 21 项的全部参数、安全认证、供货能力未在本轮全面重查；俄语母语审读、真实页面布局与公网预发布仍待实施阶段完成。
- 不声称进行了全网查重；外部网站仅用于核实专业事实及信息组织思路，不复刻其整页文章或商业身份。
- 本文件只交付完整拟修改内容，没有修改业务页面、服务器配置、邮件参数或代理设置，没有提交搜索引擎索引请求。
