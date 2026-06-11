# RUS METER .ru 产品询价网站

这是 RUS METER 的正式网站项目，使用 Next.js、TypeScript、Tailwind CSS 和 Netlify 部署。

## 本地运行

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

## 目录说明

- `src/data/catalog.ts`：产品、分类、图片和 PDF 数据。
- `src/lib/i18n.ts`：俄语和英语页面文案。
- `src/components/site.tsx`：页面结构和公共布局。
- `src/components/rfq-form.tsx`：RFQ 表单。
- `netlify/functions/rfq-email.ts`：RFQ 邮件发送接口。
- `public/assets/products`：产品图片。
- `public/datasheets`：PDF datasheet。
- `public/logo-header.png`：页眉 Logo。

## RFQ 表单和邮件

表单会同时做两件事：

1. 保存一份提交记录到 Netlify Forms，表单名为 `rfq-main`。
2. 调用 `/api/rfq-email` 直接发送邮件到业务邮箱。

Netlify Forms 有可能把测试内容判定为 Spam，因此正式收信不要只依赖 Netlify Forms 通知。

## Netlify 环境变量

要让 `/api/rfq-email` 真正发邮件，需要在 Netlify 后台添加以下环境变量：

```text
RFQ_TO_EMAIL=zhangguof1206@gmail.com
RFQ_FROM_EMAIL=zhangguof1206@gmail.com
RFQ_SMTP_HOST=smtp.gmail.com
RFQ_SMTP_PORT=465
RFQ_SMTP_USER=zhangguof1206@gmail.com
RFQ_SMTP_PASS=你的 Gmail 应用专用密码
```

如果后期使用正式公司邮箱，只需要把这些变量改成公司邮箱对应的 SMTP 信息。

## Netlify 部署

Build command：

```bash
npm run build
```

Publish directory：

```text
.next
```

## 后期替换 PDF

把新的 PDF 放到：

```text
public/datasheets
```

然后在 `src/data/catalog.ts` 中确认每个产品的 `pdf` 文件名与真实文件名一致。

## 后期添加产品

在 `src/data/catalog.ts` 的 `products` 数组中新增产品，并把对应图片和 PDF 分别放入：

```text
public/assets/products
public/datasheets
```
