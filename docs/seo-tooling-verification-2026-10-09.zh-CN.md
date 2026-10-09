# 首次验证记录

## 本地证据

- 网站 `npm run build` 成功，静态页面生成 162 个。SEO、应用页、应用内链、UI、语言一致性检查及现有线上巡检器测试通过。
- `build:release` 在本机的 Yandex URL 检查阶段受子进程权限限制，未完整跑通；未据此宣称完整发布检查通过。GitHub 回归工作流会重新执行完整命令。
- SiteOne 2.5.1 在新生产构建 `http://127.0.0.1:3219` 完成 HTML 扫描，共 288 个 URL，均返回 HTTP 200，未发现 404。
- 全部可收录页面有标题、描述和 canonical；全部扫描页面有且只有一个主标题。
- 6 个 noindex 页面是中英文隐私、个人数据同意和 Cookie 政策页，属于已有预期设计。感谢页没有被普通链接发现，不在此次全站抓取的覆盖范围内。
- 报告出现正式域名 canonical 与本地地址不同、外链跳过、HTTP 环境安全等告警，这是本地验证限制，不是线上问题结论。
- 联系页带不同询盘参数的 URL 被工具识别为重复标题/描述，需结合归一化 canonical 判断，不应生成大量不同联系页面。
- Unlighthouse 与 Lighthouse CI 的本机运行遭遇 Chrome/子进程启动 EPERM，不能计为浏览器检查通过；将用 GitHub 独立环境验证。

本地完整报告保存在未提交的 `artifacts/seo-tools/local/`，以免把环境相关诊断混入生产代码。工具依赖单独锁定，未改变网站生产依赖或表单邮件配置。扫描没有提交任何询盘。

## 自动运行

新增配置：每周全站和重点页面线上诊断、代码更新时六个产品/应用页 Lighthouse 检查、报告附件保存 30 天。线上报告与运行结果以 GitHub Actions 为准；本地报告不代表排名、曝光或询盘改善。

## 首次 GitHub 运行

- [线上巡检 37869860473](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/37869860473) 成功：原有巡检 16/16 页面通过；SiteOne 完成 288 URL；Unlighthouse 完成全部 10 个重点页面，报告已保存。
- [代码回归 37869839451](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/37869839451) 的完整 `build:release`、12 次浏览器采集和报告保存成功，但六页的原生描述断言失败，不能将此运行记为通过。
- 失败报告的 Lighthouse 12.6.1 网络 User-Agent 没有 `Chrome-Lighthouse`。该版本的 MetaElements 只读取 `head meta`；本仓库 Next.js 15.5.19 的 HTML 限制机器人名单包含 `Chrome-Lighthouse`，否则允许流式元信息进入 body。先前带该标识的 HTML 检查能读取 head 描述。修正为保留移动端模拟、补充检查器标识，未降低缺失描述的失败规则，也未修改网站页面。
- 补上真正的 `src/**` 工作流触发范围。新增回归测试覆盖机器人识别和 push/PR 触发范围。
- 初次本地浏览器访问未获允许，未绕过；随后用户明确同意 GitHub 自动检查，修正已推送，并完成以下独立测试构建验证。

## 修正后验收（2026-10-09）

- 修正提交：`c628f05c4a47f2a1f2829606e1dc003868a73613`。推送前再次运行 10 项工具测试和 5 项现有巡检测试，全部通过。
- [GitHub 回归运行 37891940006](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/37891940006) 成功：安装、测试、完整 `build:release`、浏览器检查、报告保存全部完成。
- 六个中英文露点应用、MDM300、HMP3 页面各检查两次，共 12 份报告。逐份核对 `is-crawlable`、`document-title`、`meta-description`、`http-status-code`，全部得分 1；`assertion-results.json` 为空，没有断言失败或阈值警告。
- 此检查器分支下俄文页面 SEO 分数为 100，英文页面为 92；这些分数只代表测试构建的诊断，不是 Google 排名、收录率或线上内容更新结果。
- [下载验收报告](https://github.com/zhangguof1206-wq/sensemeter-website/actions/runs/37891940006/artifacts/11598960560)，保存至 2026-11-08。下载后核对 ZIP SHA256：`cbd9f1f64e06ad6fced17e7554db4469a75f625e1871bd0d274ce64073567dd6`。
- 未修改 VPS、网站页面、分析配置或询盘邮件，未发送测试询盘。工具配置在 GitHub 运行，无需部署到网站服务器。

## 线上报告的优先事项

- SiteOne 的 6 个 noindex URL 仍是中英文法律政策页。要判断用户截图的 Search Console 告警是否误伤商业页面，必须取得该告警的受影响 URL，不能只凭通知移除 noindex。
- 10 页移动端实验室性能分数为 75-100，联系页及部分 MDM300/HMP3 产品页为 75；先检查这些询盘入口的最大内容绘制与图片加载，不把一次实验室分数当作真实用户速度。
- 英文页面的额外 SEO 扣分包括 Cookie 政策链接文字 `Learn more` 缺少描述性；属于小范围可读性改进，不是曝光增长的主要策略。
- 最佳实践 77 分的部分扣分来自现有 Yandex 第三方 Cookie。未为了分数删除分析工具；隐私与同意配置需另行结合实际部署检查。
- 上述为首次诊断线索，未在本次自动工具接入中修改生产内容、分析配置或询盘流程。
