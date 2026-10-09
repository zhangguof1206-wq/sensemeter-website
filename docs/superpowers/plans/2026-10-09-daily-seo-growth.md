# SenseMeter 每日曝光增长实施计划

> **For agentic workers:** 使用 executing-plans 按检查点推进。此计划是每日闭环的扩展方案，未通过“诊断已绿”来缩小曝光增长目标。

**Goal:** 利用 GitHub 开源脚本与每日证据评估，发现并实施能增加商业搜索曝光和询盘机会的优化，持续验证结果。

**Architecture:** 复用已验收的 SiteOne、Unlighthouse、Lighthouse CI 和轻量线上巡检器。每日轻量巡检负责故障发现，每周浏览器/全站报告补充覆盖；本对话每日任务读取报告和用户提供的 Search Console 数据进行决策。代码修改经过测试及中文提交，VPS 发布仍走现有受控流程，区分已提交与已上线。

**Tech Stack:** 现有 Node.js 巡检器、GitHub Actions、Codex 每日 heartbeat、用户 GSC 导出。暂不引入 Docker、新付费服务或额外 API 密钥。

## 数据与设计

- [x] 核对当前工作树及现有工作流；目前只有每周线上巡检，没有每日计划。
- [x] 重新查询 GitHub 官方项目，复用现有三个已验收工具，不安装来源不明的“自动排名”脚本。
- [x] 分析用户 2026-09-09 至 2026-10-06 的 GSC 原始导出，保留真实日期与维度口径。
- [x] 重新验证 16 个重点页面及气候箱、联系入口的实际线上索引信号。
- [x] 建立 `docs/seo-daily-growth-log.zh-CN.md` 作为日期、决策、改动、验证、上线状态记录。
- [ ] 用户确认提出的 09:15 轻量检查、10:00 评估安排；复杂页面改版仍先确认设计。

## 每日执行能力

修改范围：`.github/workflows/live-seo-monitor.yml`、`scripts/check-live-seo.mjs`、`scripts/lib/live-seo-audit.mjs`、相关测试及中文指南。保留现有依赖边界。

- [ ] 先加失败测试：每日与每周任务频率分离；重点覆盖中英文联系/气候箱/HMP3；报告缺失或抓取失败不能标为正常。
- [ ] 允许巡检器同时输出 Markdown 和结构化 JSON，为每日读取和后续同口径比较保留依据；不写入原始用户报表、不把询盘内容公开提交。
- [ ] 增加每日低负载调度；SiteOne 和 Unlighthouse 保持每周或显式手动运行，避免每天重型扫描。
- [ ] 更新使用指南，明确 GitHub 排队延迟、30 天附件保存及本地每日任务的运行条件。
- [ ] 运行配置及巡检测试，中文提交并推送，手动验证一次轻量 GitHub 检查，不用意图代替运行证据。
- [ ] 应用权限恢复后创建/核验本对话每日 heartbeat；本次创建被审批限制拦截，没有有效任务 ID，不可绕过。

## 优化与验收

- [ ] 第一轮优先检查俄语露点应用的真实选型内容缺口、查询对应页面和相关内链。先形成小范围方案供用户确认，保留 URL、canonical、hreflang 与事实准确性。
- [ ] 对近期已上线的露点、MDM300、HMP3 保留 14-28 天观察窗口，避免每日重写。
- [ ] 结合实际部署与数据可用日期，取得上线后同口径 GSC 数据；记录曝光、点击、CTR、页面/国家趋势，并记录实际有效询盘。
- [ ] 没有提升时继续评估意图、内容、内链、覆盖面和有效行业提及；不以单次分数或小样本高 CTR 认定目标已实现。

来源：[SiteOne](https://github.com/janreges/siteone-crawler)、[Unlighthouse](https://github.com/harlan-zw/unlighthouse)、[Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)。框架之外不会使用刷流量、群发外链、批量低价值文章或无依据参数；[Google 垃圾内容政策](https://developers.google.com/search/docs/essentials/spam-policies) 不允许为了操纵排名而规模化制造低价值内容。
