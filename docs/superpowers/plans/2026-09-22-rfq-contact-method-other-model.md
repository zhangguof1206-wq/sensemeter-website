# RFQ Contact Method And Other Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the RFQ form identify whether the optional contact detail is a phone number, WhatsApp account, or Telegram account, and add `Other` as the final product-model option without adding another text field.

**Architecture:** Keep the existing client-side submission flow and SMTP delivery. Replace the single ambiguous contact field with two optional fields in the same grid cell, update the hidden Netlify archive form, and normalize old submissions into the new email field names so historical integrations remain readable.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Node test runner, project static checks.

---

## Task 1: Add RFQ field normalization tests

**Files:**
- Modify: `scripts/check-rfq-email.test.mjs`
- Modify: `src/lib/rfq-email.ts`

- [ ] **Step 1: Write failing tests for the new contact fields**

Add tests that import `readRfqFields` and verify:

```js
test("reads the selected contact method and contact details", async () => {
  const { readRfqFields } = await import("../src/lib/rfq-email.ts");
  const fields = readRfqFields(
    "Email=test%40example.com&Contact+Method=WhatsApp&Contact+Details=%2B7+999+000+00+00"
  );

  assert.equal(fields["Contact Method"], "WhatsApp");
  assert.equal(fields["Contact Details"], "+7 999 000 00 00");
});

test("maps the legacy combined contact field into contact details", async () => {
  const { readRfqFields } = await import("../src/lib/rfq-email.ts");
  const fields = readRfqFields(
    "Email=test%40example.com&Phone+%2F+WhatsApp+%2F+Telegram=%40legacy_contact"
  );

  assert.equal(fields["Contact Method"], "");
  assert.equal(fields["Contact Details"], "@legacy_contact");
});
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `npm run check:rfq-email`

Expected: FAIL because `readRfqFields` is not exported and the new fields are not normalized.

- [ ] **Step 3: Implement minimal field normalization**

In `src/lib/rfq-email.ts`:

```ts
export const rfqFieldOrder = [
  "Email",
  "Name",
  "Company",
  "Country / City",
  "Contact Method",
  "Contact Details",
  "Product Model",
  "Quantity",
  "Application",
  "Message",
  "Personal Data Consent"
] as const;

export function readRfqFields(body: string) {
  const params = new URLSearchParams(body);
  const fields = Object.fromEntries(
    Array.from(params.entries()).filter(([key]) => key !== "form-name")
  ) as RfqFields;
  const legacyContact = fields["Phone / WhatsApp / Telegram"];

  fields["Contact Method"] ||= "";
  fields["Contact Details"] ||= legacyContact || "";

  return fields;
}
```

The old combined key remains accepted as input but is omitted from the formatted field order.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `npm run check:rfq-email`

Expected: all RFQ email tests pass.

## Task 2: Update the bilingual form and archive schema

**Files:**
- Modify: `scripts/check-ui.mjs`
- Modify: `scripts/check-i18n.mjs`
- Modify: `src/lib/i18n.ts`
- Modify: `src/components/rfq-form.tsx`
- Modify: `src/components/site.tsx`

- [ ] **Step 1: Add failing static checks**

Make `scripts/check-ui.mjs` read `src/components/rfq-form.tsx` and require:

```js
rfqFormSource.includes('name="Contact Method"')
rfqFormSource.includes('name="Contact Details"')
rfqFormSource.includes('<option value="Phone">Phone</option>')
rfqFormSource.includes('<option value="WhatsApp">WhatsApp</option>')
rfqFormSource.includes('<option value="Telegram">Telegram</option>')
rfqFormSource.includes('<option value="Other">Other</option>')
source.includes('<input name="Contact Method" />')
source.includes('<input name="Contact Details" />')
!source.includes('<input name="Phone / WhatsApp / Telegram" />')
```

Make `scripts/check-i18n.mjs` require both locale objects to contain `formContact`, `formContactMethod`, and `formContactDetails`.

- [ ] **Step 2: Run checks and confirm RED**

Run: `npm run check:ui && npm run check:i18n`

Expected: FAIL because the new controls and copy do not exist yet.

- [ ] **Step 3: Add localized labels**

Replace `formPhone` in `src/lib/i18n.ts` with:

```ts
// Russian
formContact: "Контакт",
formContactMethod: "Выберите способ связи",
formContactDetails: "Номер или имя пользователя",

// English
formContact: "Contact",
formContactMethod: "Select contact method",
formContactDetails: "Number or username",
```

- [ ] **Step 4: Replace the ambiguous visible field**

In `src/components/rfq-form.tsx`, replace the old `Field` with one labeled group. Keep both controls optional and use this responsive layout:

```tsx
<div className="field">
  <label className="mb-2 block font-bold" htmlFor="contactMethod">
    {c.formContact}
  </label>
  <div className="grid gap-2 sm:grid-cols-[minmax(130px,0.8fr)_minmax(0,1.2fr)]">
    <select
      className="min-h-12 w-full rounded border border-line px-3 py-3"
      id="contactMethod"
      name="Contact Method"
      defaultValue=""
      aria-label={c.formContactMethod}
    >
      <option value="">{c.formContactMethod}</option>
      <option value="Phone">Phone</option>
      <option value="WhatsApp">WhatsApp</option>
      <option value="Telegram">Telegram</option>
    </select>
    <input
      className="min-h-12 w-full rounded border border-line px-3 py-3"
      id="contactDetails"
      name="Contact Details"
      type="text"
      placeholder={c.formContactDetails}
      aria-label={c.formContactDetails}
    />
  </div>
</div>
```

Append this after the mapped product options so it is always last:

```tsx
<option value="Other">Other</option>
```

- [ ] **Step 5: Update the hidden archive form**

In `src/components/site.tsx`, replace the old combined contact input with:

```tsx
<input name="Contact Method" />
<input name="Contact Details" />
```

- [ ] **Step 6: Run checks and confirm GREEN**

Run: `npm run check:ui && npm run check:i18n && npm run check:rfq-email`

Expected: all checks pass.

## Task 3: Verify behavior, build, and preview

**Files:**
- Verify: `src/components/rfq-form.tsx`
- Verify: `src/lib/rfq-email.ts`
- Verify: generated Next.js build output

- [ ] **Step 1: Run the complete project checks**

Run: `npm run check`

Expected: all project checks pass.

- [ ] **Step 2: Build the release bundle**

Run: `npm run build:release`

Expected: Next.js production build and postbuild form-copy step finish successfully.

- [ ] **Step 3: Start a local preview**

Run: `npm run dev -- --port 3012`

Keep the process running and open `http://localhost:3012/contact` in the in-app browser.

- [ ] **Step 4: Visually verify RU and EN**

Check `/contact` and `/en/contact` at desktop and mobile widths:
- The contact method selector and contact details input align in one row on desktop and stack on narrow screens.
- Both controls remain optional.
- The method list contains only Phone, WhatsApp, and Telegram.
- `Other` is the final product option.
- No additional product-model text input appears.
- There is no horizontal overflow or overlapping text.

- [ ] **Step 5: Commit the complete feature**

Run:

```bash
git add scripts/check-rfq-email.test.mjs scripts/check-ui.mjs scripts/check-i18n.mjs src/lib/rfq-email.ts src/lib/i18n.ts src/components/rfq-form.tsx src/components/site.tsx
git commit -m "优化：完善询价表单联系方式选择"
```

Do not deploy; leave the verified local preview running for user review.
