# SenseMeter 全站国际供货定位文案设计

## 背景

当前俄语主页使用“для российских предприятий”和“из Китая в Россию”，英文主页也使用“from China to Russia”。四个应用专题页和组织结构化数据中也存在相同的单一国家限制。这与实际业务不完全一致：SenseMeter 从中国发货，可以服务俄罗斯客户，也可以根据目的地为其他国家客户提供国际供货。

全站代码审计发现 24 处俄罗斯地域表达：20 处属于营销、SEO 或结构化数据，4 处属于隐私和跨境数据处理的俄罗斯法律语境。

## 目标

- 主页不再暗示“只向俄罗斯销售”。
- 保留“从中国供货”这一真实商业信息。
- 用中性、专业的方式说明可面向国际客户交付。
- 不声明未证实的全球仓储、本地实体、独家代理或覆盖国家数量。

## 修改范围

修改以下内容：

1. 俄语主页 H1 与首屏说明文字。
2. 英文主页 H1 与首屏说明文字。
3. 俄语主页 SEO 标题和描述。
4. 英文主页 SEO 标题和描述。
5. 四个应用专题页的俄语 SEO 描述、俄语底部询价说明和英文底部询价说明。
6. 组织结构化数据中的俄罗斯单一国家服务范围。

不修改产品目录、产品页面、询价表单、邮件发送逻辑、法律正文和部署配置。

## 最终文案

### 俄语主页

H1：

> Промышленные датчики и анализаторы для промышленных предприятий

首屏说明：

> SenseMeter поставляет из Китая промышленное измерительное оборудование и комплектующие международным заказчикам: измерители и преобразователи точки росы, анализаторы влажности газа и кислорода, датчики влажности и температуры. Помогаем подобрать модель и совместимые комплектующие, согласовать интеграцию в панели и шкафы, а также OEM- и проектные закупки. В коммерческом предложении подтверждаем наличие и сроки поставки; международную доставку, таможенное оформление и распределение расходов согласовываем с учетом страны назначения и выбранной клиентом схемы.

SEO 标题：

> SenseMeter — промышленные датчики и анализаторы

SEO 描述：

> Измерители точки росы, анализаторы влажности газа и кислорода, промышленные датчики влажности. Подбор и международная поставка из Китая.

### 英文主页

H1：

> Industrial sensors and analyzers for industrial applications

首屏说明：

> SenseMeter supplies industrial measurement instruments and accessories from China to international customers: dew point meters and transmitters, gas moisture and oxygen analyzers, and humidity and temperature sensors. We support model selection, compatible accessories, instrument panel and cabinet integration, and OEM or project procurement. Product availability and lead times are confirmed in each quotation; international delivery, customs clearance and cost allocation are agreed for the destination country and the customer's selected arrangement.

SEO 标题：

> SenseMeter — industrial sensors and analyzers

SEO 描述：

> Dew point meters, gas moisture and oxygen analyzers, and industrial humidity sensors selected and supplied internationally from China.

## 应用专题页统一规则

涉及以下四个页面：

- 压缩空气露点；
- 天然气与工艺气体水分；
- 工业湿度监测；
- 手套箱与纯气体氧分析。

俄语 SEO 描述统一使用对应产品和应用关键词，并将结尾改为：

> Подбор и международная поставка из Китая.

俄语底部询价说明保留各页面原有的选型条件，供货部分统一表达为：

> Условия международной поставки из Китая, доставки и таможенного оформления согласуем в коммерческом предложении с учетом страны назначения.

英文底部询价说明保留各页面原有的选型条件，供货部分统一表达为：

> We will quote international supply from China, with delivery and customs responsibilities agreed for the destination country.

这些句子作为统一语义模板使用，各页面仍保留气体、压力、量程、安装、流量或输出等自身选型信息，不把应用页改成重复文案。

## 结构化数据

删除销售联系点中仅指向 `Russia` 的 `areaServed` 字段。暂不写入“Worldwide”或国家清单，避免把“可按目的地国际供货”夸大为“能够覆盖所有国家”。可见页面文案负责表达国际供货能力。

## 保留的俄罗斯法律语境

`src/lib/legal.ts` 中四处“俄罗斯联邦/俄罗斯市场”用于说明俄罗斯用户的数据处理和跨境传输风险。这些内容不是销售范围声明，应保留，不参与营销文案统一。

## SEO 与业务取舍

- 主页不再直接强化“Russia”关键词，换取更准确的国际业务定位。
- `.ru` 域名、俄语内容和俄罗斯相关应用页面仍会向搜索引擎提供俄罗斯市场信号。
- 主页继续保留露点仪、气体水分分析仪、氧分析仪和工业湿度传感器等核心产品词。
- 应用页继续保留俄语技术关键词，但不再把供货目的地限定为俄罗斯。

## 验收标准

- 俄语和英文主页首屏均不再出现只向俄罗斯供货的表达。
- 页面明确表达从中国向国际客户供货。
- 主页及四个应用专题页的 SEO 描述与可见供货定位一致。
- 组织结构化数据不再把服务范围限定为俄罗斯。
- 全站剩余的俄罗斯地域表达只存在于确有必要的法律语境。
- 页面布局、按钮、导航、目录、询价和邮件功能不发生改变。
- 项目现有检查与生产构建通过。
