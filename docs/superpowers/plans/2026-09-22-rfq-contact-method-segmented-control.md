# RFQ Contact Method Segmented Control Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the truncated contact-method dropdown with a neutral three-segment radio control while keeping the full-width contact-details input and all existing submission behavior.

**Architecture:** Keep the current RFQ form, field names, SMTP handling, hidden Netlify archive form, and compatibility parser. Change only the visible contact-method control in `rfq-form.tsx`, with a static source check protecting its structure and neutral visual treatment.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, project Node-based static checks.

---

## Task 1: Protect the segmented-control structure

**Files:**
- Modify: `scripts/check-ui.mjs`
- Test: `scripts/check-ui.mjs`

- [x] **Step 1: Replace the old dropdown assertions with segmented-control assertions**

Update the RFQ check so it requires the radio group and rejects the old select:

```js
{
  name: "RFQ form uses a neutral segmented contact method control and keeps Other as the final model option",
  pass: () =>
    rfqFormSource.includes('const CONTACT_METHODS = ["Phone", "WhatsApp", "Telegram"] as const;') &&
    rfqFormSource.includes('name="Contact Method"') &&
    rfqFormSource.includes('type="radio"') &&
    rfqFormSource.includes("peer-checked:bg-[#1f3044]") &&
    rfqFormSource.includes("peer-checked:text-white") &&
    rfqFormSource.includes('name="Contact Details"') &&
    rfqFormSource.includes('<option value="Other">Other</option>') &&
    !rfqFormSource.includes('id="contactMethod"') &&
    !rfqFormSource.includes('<select\n              className="min-h-12') &&
    source.includes('<input name="Contact Method" />') &&
    source.includes('<input name="Contact Details" />')
}
```

- [x] **Step 2: Run the UI check and confirm RED**

Run: `npm run check:ui`

Expected: FAIL on the RFQ segmented-control check because the page still uses a `<select>`.

## Task 2: Implement the neutral segmented radio group

**Files:**
- Modify: `src/components/rfq-form.tsx`
- Test: `scripts/check-ui.mjs`

- [x] **Step 1: Add the fixed method list**

Add below the existing form constants:

```ts
const CONTACT_METHODS = ["Phone", "WhatsApp", "Telegram"] as const;
```

- [x] **Step 2: Replace the Contact heading and dropdown**

Replace the visible contact field with:

```tsx
<fieldset className="field min-w-0">
  <legend className="sr-only">{c.formContact}</legend>
  <div
    className="mb-2 grid h-7 grid-cols-3 overflow-hidden rounded border border-line"
    aria-label={c.formContactMethod}
  >
    {CONTACT_METHODS.map((method, index) => (
      <label
        className={`cursor-pointer ${index < CONTACT_METHODS.length - 1 ? "border-r border-line" : ""}`}
        key={method}
      >
        <input className="peer sr-only" name="Contact Method" type="radio" value={method} />
        <span className="flex h-full items-center justify-center px-1 text-xs font-bold text-ink transition-colors peer-checked:bg-[#1f3044] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-[#52657a]">
          {method}
        </span>
      </label>
    ))}
  </div>
  <input
    className="min-h-12 w-full rounded border border-line px-3 py-3"
    id="contactDetails"
    name="Contact Details"
    type="text"
    placeholder={c.formContactDetails}
    aria-label={c.formContactDetails}
  />
</fieldset>
```

This leaves no method selected by default, keeps all values unchanged, and gives the details input the entire column width.

- [x] **Step 3: Run focused checks and confirm GREEN**

Run:

```powershell
npm run check:ui
npm run typecheck
npm run check:rfq-email
```

Expected: all three commands pass.

## Task 3: Verify and preview

**Files:**
- Verify: `src/components/rfq-form.tsx`
- Verify: generated Next.js build output

- [x] **Step 1: Run the release build**

Run: `npm run build:release`

Expected: all SEO, URL, application, UI, i18n, type/build and postbuild steps finish successfully.

- [x] **Step 2: Start the local preview**

Run: `npm run dev -- --port 3012`

- [x] **Step 3: Visually verify the result**

Open `/contact` and `/en/contact` at the default desktop viewport and at `390x844`:

- `Phone`, `WhatsApp`, and `Telegram` replace the Contact title and remain fully visible.
- The details input occupies the full column width below the segmented control.
- The selected method uses dark navy-gray and white, with no red styling.
- No option is selected before interaction.
- Keyboard focus is visible.
- There is no overlap or horizontal overflow.
- `Other` remains the last product-model option.

- [x] **Step 4: Commit the complete change**

Run:

```powershell
git add scripts/check-ui.mjs src/components/rfq-form.tsx docs/superpowers/plans/2026-09-22-rfq-contact-method-segmented-control.md
git commit -m "优化：调整询价表单联系方式选择样式"
```

Do not deploy. Leave the final local preview running for user review.
