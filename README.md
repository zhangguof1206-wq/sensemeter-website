# Sensemeter .ru Product RFQ Website

This is the official website project for the Sense / Sensemeter product catalog and RFQ website.

Stack:
- Next.js
- TypeScript
- Tailwind CSS
- Netlify
- Netlify Forms
- Netlify Functions for RFQ email delivery

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main Files

- `src/data/catalog.ts`: product categories, product data, images and PDF filenames.
- `src/lib/i18n.ts`: Russian and English website copy.
- `src/lib/legal.ts`: privacy, personal data consent and cookie policy copy.
- `src/components/site.tsx`: page structure and shared layout.
- `src/components/rfq-form.tsx`: RFQ form.
- `netlify/functions/rfq-email.ts`: RFQ email delivery endpoint.
- `public/assets/products`: product images.
- `public/datasheets`: product PDF datasheets.
- `public/logo-header.png`: header logo.

## RFQ Form

The RFQ form does two things:

1. Saves a backup submission in Netlify Forms using the form name `rfq-main`.
2. Calls `/api/rfq-email` to send the RFQ email to the configured mailbox.

Netlify Forms may classify some test submissions as spam. For production, email delivery should be verified through SMTP environment variables.

## Netlify Environment Variables

For test email delivery:

```text
NEXT_PUBLIC_SITE_URL=https://sensemeter.ru
RFQ_TO_EMAIL=zhangguof1206@gmail.com
RFQ_FROM_EMAIL=zhangguof1206@gmail.com
RFQ_SMTP_HOST=smtp.gmail.com
RFQ_SMTP_PORT=465
RFQ_SMTP_USER=zhangguof1206@gmail.com
RFQ_SMTP_PASS=your-gmail-app-password
```

After the formal company mailbox is ready, replace the RFQ email and SMTP variables with the company mailbox settings.

## Netlify Build

Build command:

```bash
npm run build
```

Publish directory:

```text
.next
```

## Updating PDFs

Place PDF files in:

```text
public/datasheets
```

Then confirm that each product's `pdf` value in `src/data/catalog.ts` exactly matches the real filename.

## Adding Products Later

Add a new product object to the `products` array in `src/data/catalog.ts`, then place the corresponding image and PDF in:

```text
public/assets/products
public/datasheets
```

Run checks before publishing:

```bash
npm run typecheck
npm run build
```
