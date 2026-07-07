# SenseMeter .ru Product RFQ Website

This is the official website project for the SenseMeter product catalog and RFQ website.

Stack:
- Next.js
- TypeScript
- Tailwind CSS
- Netlify
- Netlify Forms
- Next.js API route for RFQ email delivery

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
- `src/app/api/rfq-email/route.ts`: RFQ email delivery endpoint for Netlify and Ubuntu VPS deployments.
- `src/lib/rfq-email.ts`: RFQ email formatting and delivery logic for Brevo API or SMTP.
- `public/assets/products`: product images.
- `public/datasheets`: product PDF datasheets.
- `public/logo-header.png`: header logo.

## RFQ Form

The RFQ form does two things:

1. Saves a backup submission in Netlify Forms using the form name `rfq-main` when the site is running on Netlify.
2. Calls `/api/rfq-email` to send the RFQ email to the configured mailbox.

Netlify Forms may classify some test submissions as spam. For production, email delivery should be verified through either Brevo API or SMTP environment variables.

## RFQ Email Environment Variables

Recommended current setup for the Ubuntu VPS, using the REG.RU mailbox over SMTP SSL/TLS:

```text
NEXT_PUBLIC_SITE_URL=https://sensemeter.ru
EMAIL_PROVIDER=smtp
RFQ_TO_EMAIL=sales@sensemeter.ru
RFQ_FROM_EMAIL=sales@sensemeter.ru
RFQ_SENDER_NAME=SenseMeter Website
RFQ_SMTP_HOST=mail.hosting.reg.ru
RFQ_SMTP_PORT=465
RFQ_SMTP_USER=sales@sensemeter.ru
RFQ_SMTP_PASS=your-mailbox-password
```

Use the mailbox password or app password for `RFQ_SMTP_PASS`. Do not commit real passwords to git.

REG.RU also publishes these mailbox endpoints:

```text
Webmail: https://webmail.hosting.reg.ru
IMAP SSL/TLS: mail.hosting.reg.ru:993
POP3 SSL/TLS: mail.hosting.reg.ru:995
SMTP SSL/TLS: mail.hosting.reg.ru:465
```

After changing environment variables on Ubuntu VPS, restart the PM2 process with `pm2 restart sensemeter-website --update-env` and save it with `pm2 save`.

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
