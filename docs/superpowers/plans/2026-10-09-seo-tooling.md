# SEO 自动诊断实施计划

目标：为 SenseMeter 建立可重复、低负载的 SEO 检查，为曝光与询盘优化提供证据；不承诺工具直接提升排名。

架构：保留现有线上 SEO 巡检；三个开源工具独立安装在 tools/seo，不进入网站运行依赖。SiteOne 检查全站链接和索引信号，Unlighthouse 检查中英文重点询盘页面，Lighthouse CI 检查代码更新后的页面回归。线上扫描运行于 GitHub，不占用 VPS 常驻资源。

技术栈：Node.js 24、SiteOne CLI 2.5.1、Unlighthouse CLI 0.19.1、Lighthouse CI 0.15.1、GitHub Actions。

- [x] 配置独立工具依赖、重点 URL、报告目录和带 SHA256 校验的 SiteOne 安装器。
- [x] 先添加安装与配置测试，再实现工具运行入口；区分本地诊断与线上诊断。
- [x] 扩展每周巡检，添加代码更新时的 Lighthouse CI，保存可下载报告。
- [x] 完成中文使用指南；保留法律页、感谢页的合理 noindex，不盲目移除。
- [ ] 安装工具，构建网站，运行本地诊断与测试；记录限制及发现。
- [ ] 提交完整改动（中文提交信息），推送后核验 GitHub 自动检查状态。

验证：npm run test:seo-tools；npm run test:live-seo；npm run build:release；以新的本地生产构建运行三个工具。报告不上传第三方公共存储，不发送测试询盘，不修改生产邮件配置。只有线上报告才能证明线上实际状态。

交付：工具配置、自动巡检、报告、中文操作指南。用户只需在 GitHub Actions 下载报告；如需修复 GSC 的 noindex 警告，应提供受影响 URL 后再判定。
