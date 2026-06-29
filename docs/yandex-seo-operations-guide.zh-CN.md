# SenseMeter Yandex SEO 运营手册

更新时间：2026-06-26
适用网站：https://sensemeter.ru
主要工具：Yandex Webmaster、Yandex Metrica、后续 Yandex Direct

## 1. 你每天要看什么

每天只看 10 分钟，不要到处乱点。

### 1.1 Yandex Webmaster

打开 Yandex Webmaster，进入 `https://sensemeter.ru`。

每天看这 3 个位置：

1. `Summary`
   - 目的：看有没有红色严重错误。
   - 正常情况：没有 Critical / 红色错误。
   - 如果看到红色错误：截图发给技术人员或 Codex，不要自己乱改服务器。

2. `Site diagnostics`
   - 目的：看 Yandex 是否发现网站抓取、索引、robots、sitemap 问题。
   - 红色：优先处理。
   - 黄色：可以记录下来，集中每周处理。

3. `Indexing / Pages in search`
   - 目的：看网站被 Yandex 收录的页面数量。
   - 正常趋势：产品页和目录页逐步增加。
   - 如果 2-4 周完全不增加：需要检查 sitemap、页面质量、是否有抓取错误。

### 1.2 Yandex Metrica

打开 Yandex Metrica，进入 SenseMeter 计数器 `110136437`。

每天看这 4 个位置：

1. `Overview`
   - 看访问人数、访问次数、跳出率。
   - 新站前期访问少是正常的，不要因为一天没流量就频繁改网站。

2. `Acquisition`
   - 看用户从哪里来。
   - 重点关注 `Search engines`，这里能看搜索引擎带来的流量。

3. `Goals`
   - 看 `RFQ Submit Success` 是否有转化。
   - 这个目标代表用户成功提交询价表单。

4. `Behavior / Session Replay`
   - 看用户进入网站后有没有卡住。
   - 重点观察：用户是否能找到产品、是否点击 RFQ、是否在表单前离开。

## 2. 每周固定 SEO 工作

建议每周一做一次，时间 30-60 分钟。

### 2.1 检查收录

在 Yandex 搜索框输入：

```text
site:sensemeter.ru
```

你要看：

- 首页是否出现。
- `/catalog` 是否出现。
- 重点产品页是否出现，例如：

```text
site:sensemeter.ru/products/easidew-pro-is
site:sensemeter.ru/products/gpr-1600-2600-3100
site:sensemeter.ru/products/hc2a-industrial
site:sensemeter.ru/products/hmt370ex
```

如果产品页还没有出现，不代表失败。Yandex 新站处理可能需要时间，先继续提交和完善内容。

### 2.2 检查关键词方向

优先关注这些俄语词：

```text
датчик точки росы
анализатор кислорода
датчик влажности
датчик температуры
сжатый воздух
опасные зоны
цена
наличие
коммерческое предложение
```

这些词适合 SenseMeter，因为网站是工业仪器 B2B 询价站。

### 2.3 记录一张简单表

每周记录一次即可：

| 日期 | Yandex 收录页数量 | Metrica 访问量 | 搜索流量 | RFQ 转化 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 2026-06-26 |  |  |  |  |  |

重点不是一天的数字，而是 4-8 周趋势。

## 3. 每次修改网站后怎么提交给 Yandex

只要你做了这些操作，就要提交页面：

- 新增产品。
- 修改产品标题/描述/图片。
- 修改 About、Contact、Catalog 等重要页面。
- 修复图片不显示。

### 3.1 先确认页面能打开

在浏览器打开修改后的页面，例如：

```text
https://sensemeter.ru/en/about
https://sensemeter.ru/en/catalog
https://sensemeter.ru/products/dmt143-dmt143l
```

确认内容和图片正常。

### 3.2 到 Yandex Webmaster 提交重抓取

路径：

```text
Yandex Webmaster -> Indexing -> Reindex pages
```

每次提交这些页面：

```text
https://sensemeter.ru/
https://sensemeter.ru/catalog
https://sensemeter.ru/en/catalog
https://sensemeter.ru/en/about
```

如果是产品页，额外提交对应产品 URL，例如：

```text
https://sensemeter.ru/products/dmt143-dmt143l
https://sensemeter.ru/en/products/dmt143-dmt143l
```

## 4. 如何判断网站 SEO 是否在变好

不要只看排名。新站更应该看这 5 个信号：

1. Yandex Webmaster 红色错误减少。
2. Sitemap 没有错误。
3. 被收录页面数量增加。
4. Metrica 里搜索来源访问增加。
5. RFQ Submit Success 有转化。

如果只有访问，没有 RFQ：说明产品页或表单引导要优化。
如果有产品浏览，但没有表单提交：检查按钮、表单字段、联系方式是否明显。
如果完全没有搜索流量：继续做产品内容、提交页面、积累外部入口。

## 5. 免费 SEO 当前执行计划

### 第 1 阶段：技术基础，已完成

已完成内容：

- Sitemap：`https://sensemeter.ru/sitemap.xml`
- robots.txt 指向 sitemap
- Yandex Metrica 计数器：`110136437`
- RFQ 转化目标：`rfq_submit_success`
- 产品页 Product JSON-LD
- 产品页 BreadcrumbList JSON-LD
- Organization / WebSite JSON-LD
- 重点产品页采购型关键词
- DMT143 / DMT143L 图片路径修复

### 第 2 阶段：产品内容扩展，继续执行

下一批建议优化这些产品页：

```text
/products/easidew-pro-xp
/products/mdm300
/products/dmt153
/products/gpr-1500
/products/gpr-1900-2900
```

每个产品页都要自然包含：

- 产品型号
- 产品类别
- 应用场景
- 关键参数
- 采购意图词：价格、库存、商业报价、datasheet、技术咨询

不要堆关键词。要写成买家能看懂的句子。

### 第 3 阶段：外部免费曝光

可以做这些免费动作：

1. 在公司邮箱签名里加网站链接。
2. Telegram 介绍里加网站链接。
3. 发产品 PDF 时附上对应产品页链接。
4. 给行业客户或供应商资料页增加 SenseMeter 链接。
5. 如果有 LinkedIn / Facebook / Telegram 频道，每周发 1 个产品应用场景。

## 6. 付费 SEO / 广告后续计划

现在先不做付费，但后续可以做。

建议顺序：

1. 先观察 Metrica 2-4 周，确认哪些产品页有人看。
2. 再选择 3-5 个重点产品做 Yandex Direct。
3. 先用小预算测试，不要一开始大额投放。
4. 广告目标不要设置成访问量，要设置成 RFQ 转化。
5. 重点看每条询价成本，而不是只看点击量。

后续付费入口：

- `Yandex Direct -> Campaign Wizard`：适合快速创建广告。
- `Yandex Direct -> Product campaign`：适合产品型推广。
- `Statistics / Reports`：看广告花费、点击、转化。

## 7. 你看到问题时怎么判断优先级

### 必须马上处理

- 网站打不开。
- 表单不能提交。
- Webmaster 有红色 Critical 错误。
- sitemap 打不开。
- 重要产品图片不显示。

### 可以每周处理

- 黄色诊断提示。
- 某些页面暂时没收录。
- 标题或描述想优化。
- 增加新产品关键词。

### 不需要每天焦虑

- 新站短期没有排名。
- Sitemap 还在 processing queue。
- 某个产品页刚提交还没被收录。

## 8. 常用链接

网站：

```text
https://sensemeter.ru
https://sensemeter.ru/sitemap.xml
https://sensemeter.ru/robots.txt
```

重点页面：

```text
https://sensemeter.ru/catalog
https://sensemeter.ru/en/catalog
https://sensemeter.ru/contact
https://sensemeter.ru/en/contact
```

Yandex 工具：

```text
https://webmaster.yandex.com
https://metrica.yandex.com
https://direct.yandex.com
```

## 9. 运营原则

1. 每次只改一批页面，不要一次改太多。
2. 改完先部署，再打开页面检查，再提交 Yandex 重抓取。
3. 看 4-8 周趋势，不看 1 天结果。
4. 免费 SEO 先把产品页做扎实，再考虑付费广告。
5. 所有转化都围绕 RFQ，不围绕单纯访问量。

## 10. 新增商品后如何生成 Yandex 提交清单

以后每次新增商品、修改商品标题、修改商品描述或修复商品图片后，先在本地网站文件夹运行：

```bash
npm run list:yandex-urls
```

你会看到 5 组 URL：

1. `RU priority pages`：俄语首页、目录、关于、联系页，优先提交。
2. `RU product pages`：所有俄语产品页，当前 Yandex 重点提交这一组。
3. `EN priority pages`：英文首页、目录、关于、联系页，第二批提交。
4. `EN product pages`：所有英文产品页，俄语产品页提交完后再提交。
5. `Optional legal pages`：隐私政策、Cookie、个人数据同意页，可选提交。

提交前先运行：

```bash
npm run check:yandex-urls
```

如果看到：

```text
Yandex URL list check passed.
```

说明清单没有重复 URL，也没有漏掉当前产品页。

### 手动提交到 Yandex 的顺序

1. 先复制 `RU product pages` 里还没有提交过的产品页。
2. 打开 `Yandex Webmaster -> Indexing -> Reindex pages`。
3. 每次粘贴 1 个 URL 并提交。
4. 提交后到 `Sent pages` 查看状态。
5. 如果显示 `In queue`，等待即可，不要重复提交。
6. 如果显示 `Request processed`，说明提交请求已经处理。

当前阶段先做免费 SEO，所以优先提交俄语产品页；英文页可以作为第二批继续提交。
