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

- [x] 新建 `scripts/seo/check-rfq-prefill-browser.mjs`，仅在 GitHub 隔离构建地址运行：桌面/移动中英文用途与型号、未知/重复参数回退、用户改写及提交字段；拦截所有 POST，禁止真实邮件发送，保存截图及 JSON。实际远程运行待验收。
- [x] 添加 `test:rfq-application` / `test:rfq-browser`，在既有回归工作流执行单元测试并在构建后验证实际页面。复用独立工具依赖，无新增包。
- [ ] 运行 `npm run test:rfq-application`、`npm run check:rfq-email`、`npm run typecheck`、`npm run build:release`，检查差异，中文提交完整修复。

## 2. 俄语内容

- [ ] 新建 `scripts/check-dew-point-content.test.mjs`：检查压力/常压露点说明、取样/稳定读数说明、询盘压力信息、既有 URL/产品推荐/英文内容保持。
- [ ] 仅增补俄语选型卡、rfqPoints 和 2 个 FAQ。说明“测量压力必须记录；常压读数与管线压力露点不可直接比较；取样、流量与稳定时间按具体型号手册”。不新增任意数字。
- [ ] 运行内容测试及 `check:applications`、`check:application-links`、`check:i18n`、`check:seo`、`typecheck`；中文提交。
- [ ] 推送后核验 GitHub 正式构建、预填浏览器结果与 Lighthouse 结果；更新执行记录。CI 通过不代表 VPS 已上线。
- [ ] 交付两项结果与现有发布流程所需的准确提交版本，不自动改服务器密钥或发真实测试询盘。
