# SEO 自动诊断使用指南

## 已配置什么

| 工具 | 用途 | 运行方式 |
| --- | --- | --- |
| SiteOne 2.5.1 | 全站标题、链接、状态码、索引信号 | 每周一北京时间 10:15 左右，GitHub 执行 |
| Unlighthouse 0.19.1 | 中英文露点应用、MDM300、HMP3、首页、联系页的移动端诊断 | 同一次每周巡检，单浏览器顺序扫描 |
| Lighthouse CI 0.15.1 | 六个产品/应用页的收录基础检查及体验评分 | main 相关代码更新、PR 或手动启动 |

GitHub 排队可能延迟。依赖独立于网站，无需 VPS 安装 Docker 或常驻监控服务。固定工具版本和依赖锁文件；SiteOne 下载验证 SHA256。报告只作为仓库 Actions 附件保存 30 天，不上传公共报告服务。

全站扫描聚焦 HTML 页面，最多 500 个 URL，不下载图片、脚本或 PDF，避免图片的多个尺寸耗尽额度；图片加载与移动端体验由重点页面的浏览器诊断补充。报告未覆盖的页面、资源和询盘实际送达不能据此判定正常。

## 你如何查看

1. 打开 [仓库 Actions](https://github.com/zhangguof1206-wq/sensemeter-website/actions)。
2. 点击“线上SEO巡检”，再点击最近一次运行。需要立即检查时，点击“Run workflow”，分支选 main，点击绿色按钮。
3. 页面底部 Artifacts 下载 `live-seo-report` 和 `live-seo-tools`，解压。
4. 打开 `siteone.html` 查看全站问题；Unlighthouse 文件夹中的单页 HTML 报告可直接打开，汇总界面如需浏览器服务，用下方本地方法。
5. 查看“SEO代码回归检查”的 `seo-code-regression` 可比较新代码的产品页检查报告。

Actions 报错时先看失败步骤，不要因此直接修改生产配置；请求失败、安装失败和网站内容问题是不同原因。若仓库未开启 Actions，进入 Settings → Actions → General，启用工作流。若组织禁止这些 Actions，需管理员按组织规则允许。

Lighthouse CI 以移动端 `Chrome-Lighthouse` 标识检查框架的非流式元信息分支：Lighthouse 12 只读取 head 中的描述，而 Next.js 可以将普通浏览器的元信息流式输出到 body。此配置只影响检查请求，不修改线上渲染、不降低缺失描述的失败规则。普通访客体验仍以 Unlighthouse 的线上报告为参考，两个工具的体验分数不应直接混为一谈。

## 如何据此提升曝光和询盘

优先级：商业页面出现 noindex、404/5xx、错误 canonical → 缺失或重复标题/描述、坏链接 → 移动端图片与加载体验 → 有曝光但点击少的搜索词及落地页内容 → 成功询盘及回复。

`/privacy`、`/personal-data-consent`、`/cookie-policy`、`/thank-you` 及英文版可以有 noindex。Search Console 的警告应先查看具体 URL，不能把所有 noindex 一律删除。

每周记录 Search Console 最近 28 天与前 28 天的曝光、点击、主要页面和搜索词，并记录有效询盘数。诊断分数不是排名或询盘数量，工具不会自动生成大量文章、刷访问量或自动建立外链。本方案不改变现有询盘邮件设置，也不向表单发送测试询盘。

## 技术人员本地运行

要求 Node.js 24、Chrome/Chromium、Windows x64 或 Linux x64。网站和工具分开安装：

```sh
npm ci
npm run seo:install
npm run test:seo-tools
npm run build:release
npm start -- --hostname 127.0.0.1 --port 3219
```

在另一个终端运行（默认只检查本地，不会误扫线上）：

```sh
npm run seo:siteone
npm run seo:unlighthouse
npm run seo:lighthouse
```

本地报告：`artifacts/seo-tools/local/`。线上报告：`artifacts/seo-tools/live/`。工具运行记录包含时间、地址、退出状态，失败不能算检查通过。若找不到 Chrome，设置 `CHROME_PATH` 为 Chrome 可执行文件路径。

工具使用已经安装的 Chrome，不自动下载浏览器。开发工具的间接依赖仍可能有上游未修复的安全告警；已对可兼容修复的依赖锁定修复版。不要把诊断服务暴露公网或传入不可信代理/压缩包，也不要向巡检工作流注入网站私密邮件配置。GitHub 工作流仅有 contents: read 权限。网站生产依赖没有改变。

Unlighthouse 的汇总界面需要静态网页服务；无需安装额外工具也可直接打开每个页面的 Lighthouse HTML 报告。

线上扫描由 GitHub 工作流统一设置 `SEO_TOOLS_BASE_URL=https://sensemeter.ru`。不得将本地 canonical 指向正式域名的正常现象误判为线上错误。本地报告不能证明线上已抓取、收录或排名提升。

## 来源

- [SiteOne 官方仓库](https://github.com/janreges/siteone-crawler)
- [Unlighthouse 配置说明](https://unlighthouse.dev/api-doc/config)
- [Lighthouse CI 官方配置](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [Next.js 流式元信息说明](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#streaming-metadata)
