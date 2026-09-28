# SenseMeter Organic Exposure Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve qualified Google exposure for SenseMeter's strongest English query cluster and add a weekly production SEO monitor without installing software on the live VPS.

**Architecture:** Keep the existing application-page routes, shared components, canonical URLs, hreflang, and sitemap structure unchanged. Refine only the English compressed-air content record, then add a dependency-free Node.js live audit with pure parsing/audit functions, a small CLI, tests, and a scheduled GitHub Actions workflow.

**Tech Stack:** Next.js 15, TypeScript content records, Node.js 20 built-in test runner and fetch API, GitHub Actions.

---

### Task 1: Protect the high-intent compressed-air query cluster

**Files:**
- Modify: `scripts/check-application-pages.mjs`
- Modify: `src/data/applications/compressed-air-dew-point.ts`

- [x] **Step 1: Add a failing content-intent check**

Extend `scripts/check-application-pages.mjs` so the English block for `compressed-air-dew-point` must retain these buyer-intent phrases:

```js
const compressedAirEnglish = read("src/data/applications/compressed-air-dew-point.ts")
  .split("en:")[1]
  ?.toLowerCase() || "";

for (const phrase of [
  "compressed air dew point meters",
  "portable dew point meter",
  "online dew point transmitter",
  "dryer testing"
]) {
  if (!compressedAirEnglish.includes(phrase)) {
    fail(`compressed-air English copy preserves buyer intent: ${phrase}`);
  }
}
```

- [x] **Step 2: Run the check and verify it fails**

Run: `npm run check:applications`

Expected: FAIL for the missing high-intent English phrases.

- [x] **Step 3: Refine the English application copy**

Update only `content.en` in `src/data/applications/compressed-air-dew-point.ts`:

- Lead metadata and H1 with `compressed air dew point meters` while retaining testing and monitoring.
- Distinguish portable testing from online continuous monitoring in the hero facts and selection cards.
- Explain dryer outlet testing, pressure dew point, sampling, alarms, and logging using facts already present in the page.
- Keep all product recommendations, routes, Russian copy, technical specifications, and RFQ behavior unchanged.

- [x] **Step 4: Run application, SEO, and localization checks**

Run:

```powershell
npm run check:applications
npm run check:seo
npm run check:i18n
```

Expected: all commands exit 0.

### Task 2: Build a dependency-free live SEO monitor

**Files:**
- Create: `scripts/lib/live-seo-audit.mjs`
- Create: `scripts/check-live-seo.mjs`
- Create: `scripts/check-live-seo.test.mjs`
- Modify: `package.json`

- [x] **Step 1: Write failing unit tests**

Create Node built-in tests covering:

```js
test("accepts an indexable localized page with canonical and hreflang", () => {});
test("reports noindex, canonical, hreflang and H1 failures", () => {});
test("audits robots, sitemap and monitored pages through an injected fetch", async () => {});
```

The tests must import `auditHtmlPage` and `runLiveSeoAudit` from the not-yet-created library.

- [x] **Step 2: Run the tests and verify they fail**

Run: `node scripts/check-live-seo.test.mjs`

Expected: FAIL because `scripts/lib/live-seo-audit.mjs` does not exist.

- [x] **Step 3: Implement the audit library**

Create `scripts/lib/live-seo-audit.mjs` with:

```js
export const monitoredPaths = [
  "/",
  "/en",
  "/catalog",
  "/en/catalog",
  "/applications/compressed-air-dew-point",
  "/en/applications/compressed-air-dew-point",
  "/applications/natural-gas-moisture-monitoring",
  "/en/applications/natural-gas-moisture-monitoring",
  "/applications/industrial-humidity-monitoring",
  "/en/applications/industrial-humidity-monitoring",
  "/applications/glove-box-oxygen-analysis",
  "/en/applications/glove-box-oxygen-analysis",
  "/products/mdm300",
  "/en/products/mdm300",
  "/en/products/hmp3-hmpx",
  "/en/products/gpr-1500"
];
```

The implementation must validate HTTP status, title, meta description, canonical, indexability, one H1, `ru-RU`/`en`/`x-default` alternates, robots sitemap declaration, and sitemap coverage. Title and description length observations are warnings; missing or contradictory indexation signals are failures.

- [x] **Step 4: Implement the CLI and package commands**

Create `scripts/check-live-seo.mjs` to accept `SEO_AUDIT_BASE_URL`, `--base-url`, and `--output`, print a Markdown report, write the optional report file, and return a non-zero exit code only for critical issues.

Add:

```json
"check:live-seo": "node scripts/check-live-seo.mjs --output artifacts/live-seo-report.md",
"test:live-seo": "node scripts/check-live-seo.test.mjs"
```

- [x] **Step 5: Run unit and live checks**

Run:

```powershell
npm run test:live-seo
npm run check:live-seo
```

Expected: tests pass and a report is written to `artifacts/live-seo-report.md`. Any real production issue must be reported and diagnosed rather than hidden.

### Task 3: Schedule the monitor and document the operating routine

**Files:**
- Create: `.github/workflows/live-seo-monitor.yml`
- Create: `docs/seo-operations-runbook.zh-CN.md`

- [x] **Step 1: Add the weekly GitHub Actions workflow**

Create a read-only workflow that runs every Monday at `02:15 UTC` and supports manual dispatch. It checks out the repository, uses Node.js 20, runs the live audit, always uploads the Markdown report, appends it to the job summary, and fails only after preserving the report.

- [x] **Step 2: Add the Chinese operating runbook**

Document:

- What the automation checks and what it cannot do.
- How to run it manually in GitHub.
- How to read green and failed results.
- The monthly GSC routine: compare the latest 28 days with the previous 28 days, then review queries and pages.
- The rule that code checks do not prove deployment or Google indexing.
- The manual production deployment gate.

- [x] **Step 3: Validate workflow structure and tracked files**

Run:

```powershell
npm run test:live-seo
npm run check:applications
npm run check:seo
npm run check:i18n
npm run typecheck
npm run build
git status --short
```

Expected: all checks pass and only the planned files plus the generated local report are changed.

### Task 4: Review and commit the completed unit

**Files:**
- Review all files changed by Tasks 1-3.

- [x] **Step 1: Review the diff for scope and factual accuracy**

Confirm that no Russian copy, product specifications, routes, canonical logic, sitemap logic, VPS configuration, or deployment behavior changed.

- [x] **Step 2: Remove generated report from the commit if appropriate**

Keep the generated report as verification evidence unless it is intentionally ignored; do not commit transient output that will churn every week.

- [x] **Step 3: Commit in Chinese**

```powershell
git add .github/workflows/live-seo-monitor.yml docs/seo-operations-runbook.zh-CN.md docs/superpowers/plans/2026-09-28-organic-exposure-automation.md package.json scripts/check-application-pages.mjs scripts/check-live-seo.mjs scripts/check-live-seo.test.mjs scripts/lib/live-seo-audit.mjs src/data/applications/compressed-air-dew-point.ts
git commit -m "优化：提升露点页面搜索意图并增加SEO自动巡检"
```

Expected: one complete, deployable local commit. Do not push or deploy without the user's manual release confirmation.
