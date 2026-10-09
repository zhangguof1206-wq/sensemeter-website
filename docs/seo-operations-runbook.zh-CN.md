# SenseMeter SEO 自动巡检与增长操作手册

## 目标

这套工作流用于保护 SenseMeter 已经获得的搜索曝光，及时发现会影响收录、排名和询盘页面的技术问题。

它不会刷流量、自动发外链或批量生成文章，也不会直接改变 Google 排名。

## 自动检查内容

GitHub 每天北京时间 09:15 左右自动检查 `https://sensemeter.ru` 的 21 个重点页面；每周一 10:15 左右另做完整诊断：

- 俄语和英语首页、目录页。
- 压缩空气露点、天然气水分、工业湿度、手套箱氧分析及气候箱页面。
- 中英文联系入口；只读取页面，不发送询盘或确认实际邮件送达。
- MDM300、HMP3/HMPX 和 GPR 高意向产品页。
- HTTP 状态、title、meta description、canonical、robots noindex、H1 数量和 hreflang。
- `robots.txt` 是否正常引用 `sitemap.xml`。
- Sitemap 是否包含所有被监控的重点页面。

## 在 GitHub 手动运行

1. 打开 GitHub 上的 `sensemeter-website` 仓库。
2. 点击顶部 `Actions`。
3. 在左侧选择“线上SEO巡检”。
4. 点击右侧 `Run workflow`。
5. 保持分支为 `main`，默认只做轻量检查；需要全站/浏览器诊断才勾选 `full_audit`，再点击绿色 `Run workflow`。
6. 等待运行结束，点开最新任务查看摘要；排队和网络会影响时间。

## 如何解读结果

- 绿色：未发现会阻止索引的技术故障。
- 黄色 warning：标题或描述长度需要人工评估，不代表页面无法收录。
- 红色：打开任务摘要，查看具体页面和错误代码。不要盲目重新提交索引。

巡检报告也会作为 `live-seo-report` 附件保留30天，包括可读 Markdown 和结构化 JSON。它们保存了检查日期、页面范围、问题和实际信号，用于未来比较；下载并留存重要基线，附件到期后不能保证仍可取回。

每日自动检查不等于每日自动决策或网站已经优化。后者需要本对话每日任务实际创建并获得工具权限，再依据搜索数据提出或执行改动。当前不要认为应用每日任务已启用。

## 每月 Google Search Console 复盘

1. 选择“过去28天”并与“先前28天”比较。
2. 先看点击、曝光、CTR 和平均排名的变化。
3. 在“查询”中优先找曝光上升、排名8至30、但点击偏低的商业搜索词。
4. 在“网页”中查找对应URL，一次只优化一个主题集群。
5. 修改上线后观察14至28天，不每天反复改标题或提交收录。

## 当前首要增长页面

`/en/applications/compressed-air-dew-point`

该页面覆盖以下已在 Search Console 出现的真实需求：

- `compressed air dew point testing`
- `dew point meter for compressed air`
- `portable dew point meter for compressed air`
- `compressed air dew point monitor`

优化时保留当前URL、canonical、hreflang和推荐产品。不要为每个近义词分别建立重复页面。

## 重要边界

- 本地检查通过不代表已经发布。
- GitHub Actions 检查通过只代表当时的线上页面技术信号正常，不代表 Google 已经收录或提高排名。
- 修改代码后仍然要经过本地检查、人工确认和 Ubuntu VPS 发布流程。
- Google Ads 只在RFQ提交、Telegram点击等转化追踪验证正常后启动。
