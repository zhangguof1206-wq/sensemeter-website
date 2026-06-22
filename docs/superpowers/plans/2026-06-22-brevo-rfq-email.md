# Brevo RFQ Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a configurable RFQ email delivery provider so the site can send through Brevo API now and switch back to SMTP later.

**Architecture:** Keep the existing RFQ form and `/api/rfq-email` route unchanged. Update `src/lib/rfq-email.ts` so `EMAIL_PROVIDER=brevo` sends through Brevo's HTTPS API, while `EMAIL_PROVIDER=smtp` keeps the existing nodemailer SMTP path.

**Tech Stack:** Next.js API route, TypeScript, built-in `fetch`, nodemailer for SMTP fallback.

---

### Task 1: Add Provider Switch

**Files:**
- Modify: `src/lib/rfq-email.ts`

- [ ] Read `EMAIL_PROVIDER` from environment.
- [ ] Default to `smtp` to preserve existing behavior.
- [ ] Route `brevo` to a Brevo API sender and `smtp` to the current nodemailer sender.

### Task 2: Add Brevo API Sender

**Files:**
- Modify: `src/lib/rfq-email.ts`

- [ ] Require `BREVO_API_KEY`, `RFQ_FROM_EMAIL`, and `RFQ_TO_EMAIL`.
- [ ] POST to `https://api.brevo.com/v3/smtp/email`.
- [ ] Use the RFQ customer's email as `replyTo`.
- [ ] Throw a clear error when Brevo returns a non-2xx response.

### Task 3: Update Configuration Docs

**Files:**
- Modify: `.env.example`
- Modify: `README.md`

- [ ] Document Brevo variables.
- [ ] Document how to switch back to SMTP.

### Task 4: Verify

**Files:**
- No source changes.

- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Confirm the build completes without TypeScript or Next.js errors.
