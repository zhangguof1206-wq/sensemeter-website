# RFQ 联系方式选择与 Other 型号选项设计

## 目标

改进俄语和英语联系表单的两个信息缺口：

1. 客户填写号码或用户名时，明确标记该联系方式属于 Phone、WhatsApp 还是 Telegram。
2. 产品目录没有覆盖全部型号时，客户仍可选择 `Other`，并在现有 Application 或 Message 字段中补充说明。

本次修改保留现有表单提交、Netlify 归档、SMTP/Brevo 邮件发送、Yandex Metrica 成功目标和隐私同意流程。

## 联系方式界面

现有单一的 `Phone / WhatsApp / Telegram` 输入区域改为一个紧凑组合字段，位置仍在 Country / City 右侧：

- 顶部显示本地化分组标签：俄语 `Контакт`，英语 `Contact`。
- 左侧或首个控件为下拉框，默认提示分别为 `Выберите способ связи` 和 `Select contact method`。
- 下拉框选项固定为 `Phone`、`WhatsApp`、`Telegram`。
- 第二个控件为号码或用户名输入框，提示分别为 `Номер или имя пользователя` 和 `Number or username`。
- 两个控件均保持可选，不改变 Email 必填规则。
- 桌面端两个控件在同一行显示；窄屏下自然换为上下排列，避免挤压文字。

不增加按联系方式动态校验，因为电话号码、WhatsApp 号码和 Telegram 用户名的格式差异较大，过度限制可能阻止有效询盘。

## 产品型号界面

产品型号下拉框保持现有目录型号顺序，并在末尾增加一个选项：

- 显示文本和提交值均为 `Other`。
- 俄语和英语页面都使用相同的 `Other` 文本。
- 选择 `Other` 后不显示额外输入框。
- 客户可在现有 Application 或 Message 字段中说明未列出的型号或需求。
- 从产品详情页进入联系页时，现有型号预选逻辑保持不变。

## 提交字段与邮件

新表单提交以下稳定字段：

- `Contact Method`
- `Contact Details`
- `Product Model`

邮件正文和 HTML 表格分别显示联系方式类型与联系方式内容，使收件人能够判断一串数字或用户名对应的渠道。

为兼容浏览器缓存中的旧页面，服务端读取联系方式时采用以下顺序：

1. 优先读取新字段 `Contact Details`。
2. 新字段为空时，回退读取旧字段 `Phone / WhatsApp / Telegram`。

旧表单没有 `Contact Method` 时，邮件中的该项显示 `-`，但旧联系方式内容不会丢失。

Netlify 的隐藏表单定义同步增加新字段，避免前端字段与归档字段不一致。

## 文件范围

预计修改：

- `src/components/rfq-form.tsx`
- `src/components/site.tsx`
- `src/lib/i18n.ts`
- `src/lib/rfq-email.ts`
- `scripts/check-rfq-email.test.mjs`
- 必要时补充 `scripts/check-ui.mjs` 或 `scripts/check-i18n.mjs`

不修改产品目录布局、联系页整体布局、邮件服务器环境变量、收件地址或线上 PM2 配置。

## 验收标准

1. 俄语和英语联系页均显示 Phone、WhatsApp、Telegram 下拉选择。
2. 联系方式选择与号码或用户名字段保持可选。
3. 产品型号列表最后一个选项为 `Other`。
4. 选择 `Other` 不产生额外输入框。
5. 新表单邮件分别显示 `Contact Method` 和 `Contact Details`。
6. 旧字段 `Phone / WhatsApp / Telegram` 仍可被服务端读取。
7. RFQ 邮件回归测试、双语检查、界面检查和生产构建全部通过。
8. 本地预览确认后再决定是否部署，设计与实现阶段不直接修改线上服务器。
