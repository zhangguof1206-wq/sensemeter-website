# RUS METER .ru 产品询价网站

这是 RUS METER 的正式网站项目，使用 Next.js、TypeScript、Tailwind CSS 和 Netlify Forms。

## 本地运行

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:3000
```

如果 `npm install` 下载较慢，可以切换 npm 镜像源：

```bash
npm config set registry https://registry.npmmirror.com
npm install
```

## 目录说明

- `src/data/catalog.ts`：15 个产品、分类和场景图片的数据源。
- `public/assets/products`：产品图片。
- `public/datasheets`：PDF datasheet。
- `public/logo.png`：原始 Logo。
- `public/logo-header.png`：页眉裁切版 Logo。
- `src/components/site.tsx`：网站主要页面组件。

## Netlify 部署

1. 把 `website` 文件夹提交到 GitHub 仓库。
2. Netlify 连接该 GitHub 仓库。
3. Build command 使用：

```bash
npm run build
```

4. Publish directory 使用：

```text
.next
```

5. Netlify 会通过 `@netlify/plugin-nextjs` 处理 Next.js 项目。

## RFQ 表单

RFQ 表单使用 Netlify Forms，表单名为：

```text
rfq
```

部署到 Netlify 后，在 Netlify 后台的 Forms / Notifications 中，把通知邮箱设置为当前测试邮箱。当前页面展示的测试邮箱为：

```text
zhangguof1206@gmail.com
```

当前页面展示的 Phone / WhatsApp / Telegram 为：

```text
(+852) 6555 3946
```

购买域名并开通正式公司邮箱后，请同时修改 `src/lib/i18n.ts` 里的 `contactEmail` 和 Netlify Forms / Notifications 收件邮箱。

## 后期替换 PDF

把新的 PDF 放到：

```text
public/datasheets
```

然后在 `src/data/catalog.ts` 中确认每个产品的 `pdf` 文件名与真实文件名一致。

## 后期添加产品

在 `src/data/catalog.ts` 的 `products` 数组中新增产品对象，并把对应图片和 PDF 分别放入：

```text
public/assets/products
public/datasheets
```
