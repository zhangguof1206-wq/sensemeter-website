# 询盘场景与俄语露点实施计划

> 使用 executing-plans 在当前已授权的代码库逐项实施，先测试后修改。保留既有 `tmp/`。

**Goal:** 减少应用询盘重复填写，并补充真正有助于露点选型的俄语信息。

**Architecture:** 服务端应用查询解析为本地化标题；表单仅接收字符串默认值。内容增补沿用现有数据和组件，不新增页面或依赖。

**Tech Stack:** Next.js、TypeScript、React、Node 测试、GitHub 已有 Puppeteer/SEO 工具。

## 1. 场景预填

- [x] 新建 `scripts/check-rfq-application.test.mjs`，对真实应用数据、实际 React 表单渲染和现有邮件字段测试；已观察用途默认值缺失的失败，实现后 4/4 通过。
- [x] 新建 `src/lib/rfq-application.ts`，提供 `getRfqApplicationTitle(value, locale, pages)`：非字符串返回 undefined，仅精确匹配已知 slug，返回 `page.content[locale].title`。
- [x] 联系路由扩展参数类型为 `application?: string | string[]`，调用解析器，向 `ContactPage` 传 `application`；它再传 `RfqForm`。`Field` 新增可选 `defaultValue`，仅用途字段使用它。原有型号路径保持原样。

```tsx
const application = getRfqApplicationTitle(params.application, "ru", applicationPages);
return <ContactPage locale="ru" model={params.model} application={application} />;
// EN 路由采用 "en"；表单以 defaultValue={application} 预填用途。
```

- [x] 新建 `scripts/seo/check-rfq-prefill-browser.mjs`，仅在 GitHub 隔离构建地址运行：桌面/移动中英文用途与型号、未知/重复参数回退、用户改写及提交字段；拦截所有 POST，禁止真实邮件发送，保存截图及 JSON。最终远程运行 `37899137532` 的 4 个场景全部通过。
- [x] 添加 `test:rfq-application` / `test:rfq-browser`，在既有回归工作流执行单元测试并在构建后验证实际页面。复用独立工具依赖，无新增包。
- [x] 运行场景测试 4/4、邮件字段测试 3/3、`typecheck` 通过；本机 `build:release` 在子进程权限处报 EPERM，未当作通过。GitHub 运行 `37898442526` 的 `build:release` 与实际浏览器预填步骤均成功；修复提交 `25cb14a`。

## 2. 俄语内容

- [x] 新建 `scripts/check-dew-point-content.test.mjs`：检查压力/常压露点说明、取样/稳定读数说明、询盘压力信息、既有 URL/产品推荐/英文内容保持；观察 3 项失败后实现，4/4 通过。
- [x] 仅增补俄语选型卡、rfqPoints 和 2 个 FAQ。说明“测量压力必须记录；常压读数与管线压力露点不可直接比较；取样、流量与稳定时间按具体型号手册”。不新增任意数字。
- [x] 内容测试 4/4 及 `check:applications`、`check:application-links`、`check:i18n`、`check:seo`、`typecheck` 通过；内容提交 `e84db64`。
- [x] 推送后核验 GitHub 运行 `37899137532`：正式构建、4 个预填浏览器场景、6 页共 12 次 Lighthouse 检查通过。报告附件 SHA256 与 GitHub 元数据一致；独立读取 JSON 确认抓取允许、标题、描述、HTTP 状态四项全部通过。桌面/手机均验证 5 张推荐产品图片完成解码并有有效尺寸，保存 6 张截图；执行记录已更新。CI 通过不代表 VPS 已上线。
- [x] 记录待发布的准确版本 `57ba2739143818e360790ebf27e9e3fb844c534c`，不自动改服务器密钥或发真实测试询盘。
- [x] 用户已登录并提供服务器只读结果：PM2 在线运行 `bbfeab7`；Node 22.22.3/npm 10.9.8，约 2GiB 可用内存、无 Swap、5.3GiB 可用磁盘，配置文件存在。主仓库 main 干净但落后；新发布目录将检出固定提交，不更新正在运行的目录。
- [x] 用户截图确认独立构建 `57ba273` 完成；目录 `/var/www/sensemeter-website-release-20261009-075046-57ba273`，输出 `PREPARE_OK` 与 `NOT_SWITCHED`。尚未切换 PM2。
- [x] 用户截图确认临时端口 RU/EN 10 个页面请求及邮件接口 GET 拒绝验证完成，输出 `RU_PAGES_OK`、`EN_PAGES_OK`、`PREVIEW_OK`；未发送邮件或切换 PM2。
- [x] 用户确认收到本轮真实测试询盘，并确认 `Application` 的俄语用途正确。没有本轮 API 成功截图或单独的邮件型号字段确认，不混写为独立证据；不要再次发送测试邮件。
- [x] 用户截图确认旧目录在线、args 为 `start -- -p 3000`、fork_mode、解释器 `/usr/bin/node`、脚本 `/usr/bin/npm`，3000 端口监听。未将 `port: null` 误认为没有监听端口。
- [x] 用户执行固定版本切换，截图确认 `LIVE_PAGES_OK`、`UPGRADE_OK`、PM2 保存且 online；正式目录为 `/var/www/sensemeter-website-release-20261009-075046-57ba273`，上线时间 `2026-10-09T08:41:10Z`。回滚未实际触发，不宣称实测恢复成功。
- [x] 助手独立检查正式域名：21 页轻量巡检全部通过、3 项标题长度提醒；另 10 请求确认 RU/EN 内容/用途、完整型号选中及未知/重复参数回退，无真实邮件发送。报告保留在 `artifacts/seo-tools/deployed-57ba273-20261009/`。
- [ ] 用户本轮人工视觉检查、俄语露点主页面索引请求及 14/28 天效果复盘尚待完成；不将发布通过等同曝光或有效询盘增长。
