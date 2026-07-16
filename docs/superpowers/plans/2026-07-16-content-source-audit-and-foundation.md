# SenseMeter Content Source Audit and Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a traceable, testable source-coverage gate for all 22 instruments and 36 representative accessories before any RU/EN technical copy is expanded.

**Architecture:** Keep source policy, inventory parsing, validation, reporting, and website content separate. A checked-in JSON manifest records evidence status per technical field; small Node scripts compare it with the live catalog, generate a Chinese gap report, and block the later launch plan while any required field still needs user material. This phase does not alter public page copy, routes, sitemap, or deployment settings.

**Tech Stack:** Next.js 15, TypeScript 5.7, Node.js 20 built-in test runner, JSON data files, existing local manufacturer PDFs and selection workbooks.

---

## Scope and phase boundary

The approved design covers three sequential deliverables. They remain separate plans so each produces a working, reviewable result:

1. **This plan:** source inventory, evidence audit, missing-material report, and a launch-blocking validator.
2. **Next plan after the source gate is resolved:** split the oversized catalog data, write the verified 22-instrument and 36-accessory RU/EN content, and update the page components.
3. **Final plan:** Yandex indexing changes, application-route migration, legal-page `noindex`, sitemap/IndexNow, automated crawl, browser and image QA, then the user's local preview approval.

The executor must stop at Task 6 when the generated report contains any missing material. Public content implementation must not begin until the user supplies or explicitly approves the listed evidence.

## File structure

- Create `src/data/content-sources/field-rules.json`: the single field checklist for instruments and accessories.
- Create `src/data/content-sources/manifest.json`: generated inventory plus manually audited source status for all 58 entities.
- Create `scripts/content-sources/lib.mjs`: inventory parsing, manifest seeding, and validation only.
- Create `scripts/content-sources/content-source.test.mjs`: unit tests for parsing, evidence validation, and launch blocking.
- Create `scripts/content-sources/seed.mjs`: one-time safe manifest creation; it refuses to overwrite an audit.
- Create `scripts/content-sources/check.mjs`: structure and launch-gate command.
- Create `scripts/content-sources/report.mjs`: Chinese missing-material report generator.
- Create `docs/content-sources/content-gaps.zh-CN.md`: generated user-facing evidence request list.
- Modify `package.json`: expose the four content-source commands.

### Task 1: Record the clean baseline

**Files:**
- Read: `package.json`
- Read: `src/data/catalog.ts`
- Read: `src/data/accessories/index.ts`
- Read: `src/data/accessories/*.ts`

- [ ] **Step 1: Confirm the repository is clean**

Run: `git status --short`

Expected: no output.

- [ ] **Step 2: Run the existing safety checks before adding the gate**

Run:

```powershell
npm run check:catalog
npm run check:accessories
npm run check:seo
npm run check:yandex-urls
npm run check:applications
npm run check:application-links
npm run check:i18n
npm run typecheck
```

Expected: every command exits with code `0`. Preserve the first failing command's complete output if the baseline has drifted; diagnose it before continuing.

- [ ] **Step 3: Confirm the exact live inventory counts**

Run:

```powershell
$productCount = (Select-String -Path 'src/data/catalog.ts' -Pattern '^\s{4}slug:').Count
$accessoryFiles = @(
  'custom-sintered-filter-elements.ts',
  'sintered-microporous-accessories.ts',
  'sintered-filter-cups.ts',
  'gas-diffusers.ts',
  'sensor-protection.ts',
  'flow-control-accessories.ts'
)
$accessoryCount = 0
foreach ($file in $accessoryFiles) {
  $accessoryCount += (Select-String -Path (Join-Path 'src/data/accessories' $file) -Pattern '^\s{4}slug:').Count
}
"instruments=$productCount accessories=$accessoryCount"
```

Expected: `instruments=22 accessories=36`.

### Task 2: Add the field rules and test-driven validator

**Files:**
- Create: `src/data/content-sources/field-rules.json`
- Create: `scripts/content-sources/content-source.test.mjs`
- Create: `scripts/content-sources/lib.mjs`

- [ ] **Step 1: Add the exact field policy**

Create `src/data/content-sources/field-rules.json`:

```json
{
  "schemaVersion": 1,
  "statuses": ["verified", "needsUserMaterial", "notApplicable"],
  "sourcePriority": [
    "user-approved",
    "manufacturer-datasheet",
    "verified-selection-sheet",
    "manufacturer-website"
  ],
  "instrumentFields": [
    { "id": "productIdentity", "labelZh": "产品身份与适用型号" },
    { "id": "measurementPrinciple", "labelZh": "测量原理" },
    { "id": "measurementRange", "labelZh": "测量范围" },
    { "id": "accuracy", "labelZh": "精度与重复性" },
    { "id": "responseTime", "labelZh": "响应时间" },
    { "id": "processConditions", "labelZh": "过程压力、温度与流量条件" },
    { "id": "outputsInterfaces", "labelZh": "输出与通信接口" },
    { "id": "powerSupply", "labelZh": "供电要求" },
    { "id": "mechanicalConnection", "labelZh": "机械与过程连接" },
    { "id": "enclosureIngress", "labelZh": "外壳材质与防护等级" },
    { "id": "approvalsHazardousArea", "labelZh": "认证与危险区域适用性" },
    { "id": "operatingConditions", "labelZh": "工作与存储环境" },
    { "id": "applicationFit", "labelZh": "典型应用与选型边界" },
    { "id": "datasheet", "labelZh": "厂家数据表" }
  ],
  "accessoryFields": [
    { "id": "representativeIdentity", "labelZh": "代表性结构与内部型号属性" },
    { "id": "materialOptions", "labelZh": "可选材料" },
    { "id": "poreFiltrationRange", "labelZh": "孔径或过滤精度范围" },
    { "id": "dimensions", "labelZh": "尺寸范围" },
    { "id": "connectionOptions", "labelZh": "连接方式" },
    { "id": "pressureTemperature", "labelZh": "压力与温度边界" },
    { "id": "mediaCompatibility", "labelZh": "介质兼容性" },
    { "id": "customizationBoundary", "labelZh": "定制能力与限制" },
    { "id": "quotationInputs", "labelZh": "报价所需输入" },
    { "id": "applicationFit", "labelZh": "典型应用与选型边界" },
    { "id": "qualityDocumentation", "labelZh": "可提供的质量文件" },
    { "id": "imageRepresentation", "labelZh": "图片仅为代表性结构的说明" }
  ]
}
```

- [ ] **Step 2: Write the failing tests**

Create `scripts/content-sources/content-source.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  createSeedManifest,
  parseAccessorySource,
  parseInstrumentSource,
  validateManifest
} from "./lib.mjs";

const rules = {
  schemaVersion: 1,
  statuses: ["verified", "needsUserMaterial", "notApplicable"],
  sourcePriority: ["user-approved", "manufacturer-datasheet"],
  instrumentFields: [{ id: "measurementRange", labelZh: "测量范围" }],
  accessoryFields: [{ id: "materialOptions", labelZh: "可选材料" }]
};

const inventory = {
  instruments: [{
    slug: "probe-a",
    model: "Probe A",
    category: "BRAND",
    brand: "Brand",
    pdf: "probe-a.pdf"
  }],
  accessories: [{
    slug: "disc-a",
    categorySlug: "filter-discs",
    model: "SM-FD-A",
    dataFile: "filter-discs.ts"
  }]
};

test("parses the public instrument inventory", () => {
  const source = `export const products = [
    { slug: "probe-a", model: "Probe A", category: "BRAND", brand: "Brand", image: "a.webp", pdf: "probe-a.pdf" }
  ] as Product[];`;
  assert.deepEqual(parseInstrumentSource(source), inventory.instruments);
});

test("parses one active accessory data file", () => {
  const source = `export const products = [
    { slug: "disc-a", categorySlug: "filter-discs", model: "SM-FD-A" }
  ];`;
  assert.deepEqual(parseAccessorySource(source, "filter-discs.ts"), inventory.accessories);
});

test("seed manifest is structurally valid but blocks launch", () => {
  const manifest = createSeedManifest(inventory, rules, "2026-07-16T00:00:00.000Z");
  assert.deepEqual(validateManifest(manifest, inventory, rules, "structure"), []);
  assert.match(
    validateManifest(manifest, inventory, rules, "launch").join("\n"),
    /probe-a.*measurementRange.*needsUserMaterial/
  );
});

test("verified fields require a valid source and locator", () => {
  const manifest = createSeedManifest(inventory, rules, "2026-07-16T00:00:00.000Z");
  manifest.instruments[0].fields.measurementRange = {
    status: "verified",
    sourceRefs: [{ sourceId: "missing-source", locator: "p. 2" }],
    note: ""
  };
  assert.match(
    validateManifest(manifest, inventory, rules, "structure").join("\n"),
    /unknown source missing-source/
  );
});

test("notApplicable requires an explicit reason", () => {
  const manifest = createSeedManifest(inventory, rules, "2026-07-16T00:00:00.000Z");
  manifest.accessories[0].fields.materialOptions = {
    status: "notApplicable",
    sourceRefs: [],
    note: ""
  };
  assert.match(
    validateManifest(manifest, inventory, rules, "structure").join("\n"),
    /notApplicable requires a note/
  );
});
```

- [ ] **Step 3: Run the tests and confirm the intended failure**

Run: `node --test scripts/content-sources/content-source.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `scripts/content-sources/lib.mjs`.

- [ ] **Step 4: Implement the minimal parser, seeder, and validator**

Create `scripts/content-sources/lib.mjs`:

```js
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const ACTIVE_ACCESSORY_FILES = [
  "custom-sintered-filter-elements.ts",
  "sintered-microporous-accessories.ts",
  "sintered-filter-cups.ts",
  "gas-diffusers.ts",
  "sensor-protection.ts",
  "flow-control-accessories.ts"
];

export function parseInstrumentSource(source) {
  const start = source.indexOf("export const products");
  if (start === -1) return [];
  const productSource = source.slice(start);
  const pattern = /\{\s*slug:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*category:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*image:\s*"[^"]+",\s*pdf:\s*"([^"]+)"/g;
  return [...productSource.matchAll(pattern)].map((match) => ({
    slug: match[1],
    model: match[2],
    category: match[3],
    brand: match[4],
    pdf: match[5]
  }));
}

export function parseAccessorySource(source, dataFile) {
  const pattern = /\{\s*slug:\s*"([^"]+)",\s*categorySlug:\s*"([^"]+)",\s*model:\s*"([^"]+)"/g;
  return [...source.matchAll(pattern)].map((match) => ({
    slug: match[1],
    categorySlug: match[2],
    model: match[3],
    dataFile
  }));
}

export function readInventory(root) {
  const instruments = parseInstrumentSource(
    readFileSync(join(root, "src", "data", "catalog.ts"), "utf8")
  );
  const accessories = ACTIVE_ACCESSORY_FILES.flatMap((dataFile) =>
    parseAccessorySource(
      readFileSync(join(root, "src", "data", "accessories", dataFile), "utf8"),
      dataFile
    )
  );
  return { instruments, accessories };
}

function emptyFields(fieldRules, note) {
  return Object.fromEntries(fieldRules.map(({ id }) => [id, {
    status: "needsUserMaterial",
    sourceRefs: [],
    note
  }]));
}

export function createSeedManifest(inventory, rules, updatedAt) {
  return {
    schemaVersion: rules.schemaVersion,
    updatedAt,
    policy: {
      sourcePriority: rules.sourcePriority,
      thirdPartyPagesAreSoleSource: false,
      ruEnNumericClaimsMustMatch: true
    },
    instruments: inventory.instruments.map((item) => ({
      ...item,
      sources: [{
        id: `datasheet:${item.slug}`,
        kind: "manufacturer-datasheet",
        location: `public/datasheets/${item.pdf}`
      }],
      fields: emptyFields(
        rules.instrumentFields,
        "需要核验现有厂家资料并记录准确页码；现有网页文案不作为参数来源。"
      )
    })),
    accessories: inventory.accessories.map((item) => ({
      ...item,
      sources: [],
      fields: emptyFields(
        rules.accessoryFields,
        "需要用户批准的图纸、规格表或书面确认；现有网页文案不作为技术参数来源。"
      )
    }))
  };
}

function entityKey(kind, entity) {
  return kind === "instrument" ? entity.slug : `${entity.categorySlug}/${entity.slug}`;
}

function validateEntity(kind, entity, expected, fieldRules, rules, mode) {
  const errors = [];
  const key = entityKey(kind, entity);
  for (const property of Object.keys(expected)) {
    if (entity[property] !== expected[property]) {
      errors.push(`${kind} ${key}: ${property} differs from live inventory`);
    }
  }

  const allowedSourceKinds = new Set(rules.sourcePriority);
  const sourceIds = new Set();
  for (const source of entity.sources ?? []) {
    if (!source.id || sourceIds.has(source.id)) {
      errors.push(`${kind} ${key}: source ids must be non-empty and unique`);
    }
    sourceIds.add(source.id);
    if (!allowedSourceKinds.has(source.kind)) {
      errors.push(`${kind} ${key}: unsupported source kind ${source.kind}`);
    }
    if (!source.location) {
      errors.push(`${kind} ${key}: source ${source.id} requires a location`);
    }
  }

  const requiredFieldIds = fieldRules.map(({ id }) => id);
  const actualFieldIds = Object.keys(entity.fields ?? {});
  for (const fieldId of requiredFieldIds) {
    if (!actualFieldIds.includes(fieldId)) {
      errors.push(`${kind} ${key}: missing field ${fieldId}`);
      continue;
    }
    const field = entity.fields[fieldId];
    if (!rules.statuses.includes(field.status)) {
      errors.push(`${kind} ${key}: ${fieldId} has invalid status ${field.status}`);
      continue;
    }
    if (field.status === "verified") {
      if (!Array.isArray(field.sourceRefs) || field.sourceRefs.length === 0) {
        errors.push(`${kind} ${key}: ${fieldId} verified requires sourceRefs`);
      }
      for (const ref of field.sourceRefs ?? []) {
        if (!sourceIds.has(ref.sourceId)) {
          errors.push(`${kind} ${key}: ${fieldId} references unknown source ${ref.sourceId}`);
        }
        if (!ref.locator?.trim()) {
          errors.push(`${kind} ${key}: ${fieldId} source locator is required`);
        }
      }
    }
    if (field.status === "notApplicable" && !field.note?.trim()) {
      errors.push(`${kind} ${key}: ${fieldId} notApplicable requires a note`);
    }
    if (field.status === "needsUserMaterial" && !field.note?.trim()) {
      errors.push(`${kind} ${key}: ${fieldId} needsUserMaterial requires a note`);
    }
    if (mode === "launch" && field.status === "needsUserMaterial") {
      errors.push(`${kind} ${key}: ${fieldId} is needsUserMaterial`);
    }
  }
  for (const fieldId of actualFieldIds) {
    if (!requiredFieldIds.includes(fieldId)) {
      errors.push(`${kind} ${key}: unknown field ${fieldId}`);
    }
  }
  return errors;
}

export function validateManifest(manifest, inventory, rules, mode = "structure") {
  const errors = [];
  if (!new Set(["structure", "launch"]).has(mode)) {
    return [`unsupported validation mode ${mode}`];
  }
  if (manifest.schemaVersion !== rules.schemaVersion) {
    errors.push("manifest schemaVersion does not match field rules");
  }
  if (manifest.policy?.thirdPartyPagesAreSoleSource !== false) {
    errors.push("third-party pages must not be accepted as a sole source");
  }
  if (manifest.policy?.ruEnNumericClaimsMustMatch !== true) {
    errors.push("RU and EN numeric claims must use the same verified evidence");
  }
  if (inventory.instruments.length !== 22) {
    errors.push(`live instrument inventory must contain 22 entries, found ${inventory.instruments.length}`);
  }
  if (inventory.accessories.length !== 36) {
    errors.push(`live accessory inventory must contain 36 entries, found ${inventory.accessories.length}`);
  }

  for (const [kind, liveItems, manifestItems, fieldRules] of [
    ["instrument", inventory.instruments, manifest.instruments ?? [], rules.instrumentFields],
    ["accessory", inventory.accessories, manifest.accessories ?? [], rules.accessoryFields]
  ]) {
    const liveMap = new Map(liveItems.map((item) => [entityKey(kind, item), item]));
    const manifestMap = new Map();
    for (const entity of manifestItems) {
      const key = entityKey(kind, entity);
      if (manifestMap.has(key)) errors.push(`${kind} ${key}: duplicate manifest entry`);
      manifestMap.set(key, entity);
    }
    for (const [key, expected] of liveMap) {
      const entity = manifestMap.get(key);
      if (!entity) {
        errors.push(`${kind} ${key}: missing from manifest`);
        continue;
      }
      errors.push(...validateEntity(kind, entity, expected, fieldRules, rules, mode));
    }
    for (const key of manifestMap.keys()) {
      if (!liveMap.has(key)) errors.push(`${kind} ${key}: is not present in live inventory`);
    }
  }
  return errors;
}
```

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `node --test scripts/content-sources/content-source.test.mjs`

Expected: `5` tests pass, `0` fail.

- [ ] **Step 6: Commit the validation foundation**

```powershell
git add src/data/content-sources/field-rules.json scripts/content-sources/lib.mjs scripts/content-sources/content-source.test.mjs
git commit -m "建立内容资料来源校验规则"
```

Expected: one new commit with a clean working tree.

### Task 3: Seed the complete 22 + 36 evidence manifest

**Files:**
- Create: `scripts/content-sources/seed.mjs`
- Create: `src/data/content-sources/manifest.json` by running the seed command

- [ ] **Step 1: Add a safe one-time seed command**

Create `scripts/content-sources/seed.mjs`:

```js
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createSeedManifest, readInventory } from "./lib.mjs";

const root = process.cwd();
const rulesPath = join(root, "src", "data", "content-sources", "field-rules.json");
const manifestPath = join(root, "src", "data", "content-sources", "manifest.json");

if (existsSync(manifestPath)) {
  console.error("Refusing to overwrite the audited content-source manifest.");
  process.exit(1);
}

const rules = JSON.parse(readFileSync(rulesPath, "utf8"));
const inventory = readInventory(root);
if (inventory.instruments.length !== 22 || inventory.accessories.length !== 36) {
  console.error(`Expected 22 instruments and 36 accessories; found ${inventory.instruments.length} and ${inventory.accessories.length}.`);
  process.exit(1);
}

const manifest = createSeedManifest(inventory, rules, new Date().toISOString());
mkdirSync(dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log("Created manifest for 22 instruments and 36 accessories.");
```

- [ ] **Step 2: Generate the manifest once**

Run: `node scripts/content-sources/seed.mjs`

Expected: `Created manifest for 22 instruments and 36 accessories.`

- [ ] **Step 3: Confirm that the overwrite guard works**

Run: `node scripts/content-sources/seed.mjs`

Expected: exit code `1` and `Refusing to overwrite the audited content-source manifest.`

- [ ] **Step 4: Verify the six active accessory files only**

Run:

```powershell
Select-String -Path src/data/content-sources/manifest.json -Pattern 'sintered-filter-elements.ts|sample-gas-filters.ts'
```

Expected: no output. The two unused data files must not enter the 36-item audit or future sitemap.

- [ ] **Step 5: Commit the exact inventory**

```powershell
git add scripts/content-sources/seed.mjs src/data/content-sources/manifest.json
git commit -m "登记五十八项内容资料清单"
```

Expected: one new commit and no untracked manifest files.

### Task 4: Add structural checks, launch gate, and gap reporting

**Files:**
- Create: `scripts/content-sources/check.mjs`
- Create: `scripts/content-sources/report.mjs`
- Modify: `package.json`
- Create: `docs/content-sources/content-gaps.zh-CN.md` by running the report

- [ ] **Step 1: Add the check command**

Create `scripts/content-sources/check.mjs`:

```js
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { readInventory, validateManifest } from "./lib.mjs";

const root = process.cwd();
const modeArg = process.argv.find((arg) => arg.startsWith("--mode="));
const mode = modeArg?.split("=")[1] ?? "structure";
const loadJson = (relativePath) => JSON.parse(readFileSync(join(root, relativePath), "utf8"));
const rules = loadJson("src/data/content-sources/field-rules.json");
const manifest = loadJson("src/data/content-sources/manifest.json");
const inventory = readInventory(root);
const errors = validateManifest(manifest, inventory, rules, mode);

if (errors.length > 0) {
  console.error(`Content source ${mode} check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Content source ${mode} check passed for 22 instruments and 36 accessories.`);
```

- [ ] **Step 2: Add the Chinese gap report command**

Create `scripts/content-sources/report.mjs`:

```js
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { readInventory, validateManifest } from "./lib.mjs";

const root = process.cwd();
const loadJson = (relativePath) => JSON.parse(readFileSync(join(root, relativePath), "utf8"));
const rules = loadJson("src/data/content-sources/field-rules.json");
const manifest = loadJson("src/data/content-sources/manifest.json");
const structuralErrors = validateManifest(manifest, readInventory(root), rules, "structure");

if (structuralErrors.length > 0) {
  console.error("Cannot generate a trustworthy gap report from an invalid manifest:");
  for (const error of structuralErrors) console.error(`- ${error}`);
  process.exit(1);
}

const sections = [];
let gapCount = 0;
for (const [heading, entities, fieldRules, keyOf] of [
  ["仪器", manifest.instruments, rules.instrumentFields, (entity) => `${entity.brand} ${entity.model}`],
  ["配件", manifest.accessories, rules.accessoryFields, (entity) => `${entity.model}（${entity.categorySlug}/${entity.slug}）`]
]) {
  const labels = new Map(fieldRules.map((field) => [field.id, field.labelZh]));
  const rows = [];
  for (const entity of entities) {
    const gaps = Object.entries(entity.fields).filter(([, field]) => field.status === "needsUserMaterial");
    if (gaps.length === 0) continue;
    gapCount += gaps.length;
    rows.push(`### ${keyOf(entity)}`);
    for (const [fieldId, field] of gaps) {
      rows.push(`- ${labels.get(fieldId)}：${field.note}`);
    }
    rows.push("");
  }
  sections.push(`## ${heading}\n\n${rows.length > 0 ? rows.join("\n") : "无缺口。\n"}`);
}

const output = [
  "# SenseMeter 内容资料缺口",
  "",
  `生成时间：${manifest.updatedAt}`,
  "",
  "本报告只列出无法由已批准资料确认的字段。现有网页文案和第三方供应商页面不能单独作为技术参数来源。",
  "",
  `缺口字段总数：${gapCount}`,
  "",
  ...sections
].join("\n");

const reportPath = join(root, "docs", "content-sources", "content-gaps.zh-CN.md");
mkdirSync(dirname(reportPath), { recursive: true });
writeFileSync(reportPath, `${output}\n`, "utf8");
console.log(`Wrote ${gapCount} missing fields to docs/content-sources/content-gaps.zh-CN.md.`);
```

- [ ] **Step 3: Expose the four commands in `package.json`**

Add these entries under `scripts` without removing existing commands:

```json
"test:content-sources": "node --test scripts/content-sources/content-source.test.mjs",
"seed:content-sources": "node scripts/content-sources/seed.mjs",
"check:content-sources": "node scripts/content-sources/check.mjs --mode=structure",
"check:content-launch": "node scripts/content-sources/check.mjs --mode=launch",
"report:content-gaps": "node scripts/content-sources/report.mjs"
```

- [ ] **Step 4: Run the structural check**

Run: `npm run check:content-sources`

Expected: `Content source structure check passed for 22 instruments and 36 accessories.`

- [ ] **Step 5: Prove the launch gate blocks unaudited claims**

Run: `npm run check:content-launch`

Expected: exit code `1`; output contains both `instrument ... is needsUserMaterial` and `accessory ... is needsUserMaterial`.

- [ ] **Step 6: Generate the first exact gap report**

Run: `npm run report:content-gaps`

Expected: the report is created and the printed gap count is greater than `0`.

- [ ] **Step 7: Commit the working gate and report**

```powershell
git add package.json scripts/content-sources/check.mjs scripts/content-sources/report.mjs docs/content-sources/content-gaps.zh-CN.md
git commit -m "增加内容缺口报告与上线门禁"
```

Expected: one new commit. The structure command passes; the launch command intentionally remains blocked until evidence is complete.

### Task 5: Audit the 22 instrument datasheets without copying unsupported claims

**Files:**
- Modify: `src/data/content-sources/manifest.json`
- Regenerate: `docs/content-sources/content-gaps.zh-CN.md`

- [ ] **Step 1: Audit each exact product-to-PDF mapping**

Use the PDF inspection workflow for the following 22 pairs. For text PDFs, inspect both extracted text and rendered pages. For the six image-based PDFs marked below, render every specification page and read it visually; extracted text alone is not acceptable.

| Product slug | Product model | Manufacturer PDF | Visual inspection required |
|---|---|---|---|
| `easidew-pro-is` | Easidew PRO I.S. | `MI_EasidewPRO-IS.pdf` | No |
| `easidew-34-m12` | Easidew 34 / Easidew M12 | `MI_EasidewTransmitters_EN.pdf` | No |
| `easidew-online` | Easidew Online | `MI_EasidewOnline_EN.pdf` | No |
| `easidew-pro-xp` | Easidew PRO XP | `MI_EasidewPRO-XP_EN.pdf` | No |
| `gpr-1000-1100-2000-3500` | GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500 | `AI_GPR-1100-GPR-2000-GPR-3500-v5.pdf` | No |
| `gpr-1500` | GPR-1500 | `AI_GPR-1500-Series-Order-Codes-v4.pdf` | No |
| `gpr-1500gb-2500gb` | GPR-1500 GB / GPR-2500 GB | `AI_GPR-1500GB-2500GB.pdf` | No |
| `gpr-1600-2600-3100` | GPR-1600 / GPR-2600 / GPR-3100 | `AI_GPR1600 2600 3100.pdf` | No |
| `gpr-1900-2900` | GPR-1900 / GPR-2900 | `AI_GPR-1900-Oxygen-Analyzer.pdf` | No |
| `hc2a-industrial` | HC2A-IC / HC2A-IM / HC2A-IE | `RT_HC2A_Industrial_Humidity_Probes.pdf` | No |
| `hc2a-series` | HC2A Series | `RT_59055E_HC2A_datasheet.pdf` | No |
| `hp31-hp32` | HP31 / HP32 | `RT_59073E_HP31-HP32.pdf` | No |
| `mdm300` | MDM300 / MDM300 I.S. | `MI_MDM300_EN-v9-7.pdf` | No |
| `optidew-hz` | Optidew-HZ | `Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf` | No |
| `sf82-online` | SF82 Online | `MI_SF82_Online.pdf` | No |
| `pura-transmitter` | Pura | `Michell_Instruments_Pura_Transmitters_Datasheet.pdf` | Yes |
| `hygroflex1` | HygroFlex1 | `RT_59034E_HygroFlex1.pdf` | Yes |
| `hmt370ex` | HMT370EX | `VA_HMT370EX-Datasheet-B211825EN-K.pdf` | No |
| `hmt310` | HMT310 | `VA_HMT310-Datasheet-B210769EN-J.pdf` | Yes |
| `hmp3-hmpx` | HMP3 / HMPX | `VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf` | Yes |
| `dmt153` | DMT153 | `VA_DMT153-Datasheet-B212905EN-B.pdf` | Yes |
| `dmt143-dmt143l` | DMT143 / DMT143L | `VA_DMT143-Datasheet-B211207EN-L.pdf` | Yes |

- [ ] **Step 2: Apply the evidence-status rules field by field**

For every instrument field in the manifest, use exactly one of these forms:

Verified by a listed source and precise page/table locator:

```json
{
  "status": "verified",
  "sourceRefs": [
    { "sourceId": "datasheet:easidew-pro-is", "locator": "p. 2, Technical specifications" }
  ],
  "note": ""
}
```

Not applicable to that model, with a factual reason:

```json
{
  "status": "notApplicable",
  "sourceRefs": [],
  "note": "The manufacturer datasheet defines a passive probe and does not specify a separate power supply for the probe itself."
}
```

Still requiring user material, naming the exact missing evidence:

```json
{
  "status": "needsUserMaterial",
  "sourceRefs": [],
  "note": "请提供或批准该型号的最新厂家规格页，用于确认危险区域认证的完整编号和适用版本。"
}
```

Do not mark a field `verified` from the current web copy. Do not merge ranges belonging to different model variants. Preserve decimal separators, units, ranges, optional suffixes, and certification identifiers exactly as the source presents them.

- [ ] **Step 3: Cross-check the two existing selection workbooks**

Inspect:

- `温湿度仪-产品资料-260327/MICHELL工业测量产品精简拓客选型表.xlsx`
- `温湿度仪-产品资料-260327/Vaisala工业测量产品选型表.xlsx`

Only add a workbook source with kind `verified-selection-sheet` after confirming its model identity and value against a manufacturer datasheet. A workbook can clarify selection grouping but cannot override a conflicting manufacturer value.

- [ ] **Step 4: Validate and regenerate the report**

Run:

```powershell
npm run check:content-sources
npm run report:content-gaps
```

Expected: the structural check passes. The report retains only precise instrument fields that cannot be supported by the available approved documents.

- [ ] **Step 5: Commit the instrument evidence audit**

```powershell
git add src/data/content-sources/manifest.json docs/content-sources/content-gaps.zh-CN.md
git commit -m "核验二十二项仪器资料来源"
```

Expected: one commit containing evidence metadata only, not rewritten public copy.

### Task 6: Audit the 36 representative accessories and pause for user material

**Files:**
- Modify: `src/data/content-sources/manifest.json`
- Regenerate: `docs/content-sources/content-gaps.zh-CN.md`

- [ ] **Step 1: Enforce the representative-product policy for all six categories**

Audit exactly these category files, six entries each:

- `custom-sintered-filter-elements.ts`
- `sintered-microporous-accessories.ts`
- `sintered-filter-cups.ts`
- `gas-diffusers.ts`
- `sensor-protection.ts`
- `flow-control-accessories.ts`

The `SM-*` model names are internal quotation references, not manufacturer standard part numbers. Product images are examples of structure. Final material, dimensions, connection, pore/filtration performance, pressure, temperature, and compatibility are confirmed in the formal quotation.

- [ ] **Step 2: Remove the current web data as an evidence source**

For any accessory claim that currently exists only in `src/data/accessories/*.ts`, keep the corresponding manifest field as `needsUserMaterial`. The note must name the exact requested artifact and parameter, for example:

```json
{
  "status": "needsUserMaterial",
  "sourceRefs": [],
  "note": "请提供该结构可对外发布的材料清单，以及每种材料对应的介质、温度和腐蚀限制。"
}
```

If the user provides a drawing, specification sheet, quotation template, process capability sheet, or written approval, register it as `user-approved` and record its page, table, drawing number, or message date in `sourceRefs`.

- [ ] **Step 3: Regenerate the exact user request list**

Run:

```powershell
npm run check:content-sources
npm run report:content-gaps
npm run check:content-launch
```

Expected:

- `check:content-sources` passes.
- `report:content-gaps` writes a grouped list by instrument/accessory and field.
- `check:content-launch` exits `1` while any precise user-material request remains.

- [ ] **Step 4: Commit the complete audit report**

```powershell
git add src/data/content-sources/manifest.json docs/content-sources/content-gaps.zh-CN.md
git commit -m "整理配件技术资料缺口"
```

Expected: one commit with a usable, itemized request list.

- [ ] **Step 5: Hard pause and request only the listed evidence**

Send the user the report grouped into practical packages:

1. Instrument fields that remain unsupported after PDF/workbook inspection.
2. Accessory common capability data that can cover multiple representative structures.
3. Product-specific drawings or limits that cannot be generalized.

Ask for the smallest acceptable source type for each package: PDF, Excel, Word, drawing/image, quotation template, or written confirmation. Do not edit public RU/EN technical copy and do not start the Yandex implementation plan while `npm run check:content-launch` fails.

### Task 7: Close the source gate after the user supplies material

**Files:**
- Modify: `src/data/content-sources/manifest.json`
- Regenerate: `docs/content-sources/content-gaps.zh-CN.md`

- [ ] **Step 1: Register each supplied source without changing its claims**

Add each source using one approved kind:

```json
{
  "id": "user-approved:accessory-capability-2026-07-16",
  "kind": "user-approved",
  "location": "user-provided/accessory-capability-sheet-2026-07-16.xlsx"
}
```

If the file is intentionally kept outside the repository, use a non-secret descriptive location such as `user-message:2026-07-16` and never record credentials, private URLs, or customer data.

- [ ] **Step 2: Resolve every reported field**

Change each field to `verified` with a precise source locator, or `notApplicable` with a defensible reason. Never resolve a field merely to make the command pass.

- [ ] **Step 3: Prove the launch gate is green**

Run:

```powershell
npm run test:content-sources
npm run check:content-sources
npm run report:content-gaps
npm run check:content-launch
npm run check:catalog
npm run check:accessories
npm run typecheck
git status --short
```

Expected:

- Unit tests pass.
- Structure and launch checks both pass for `22 instruments and 36 accessories`.
- The report states `缺口字段总数：0` and shows `无缺口。` for instruments and accessories.
- Existing catalog/accessory/type checks pass.
- Only the audited manifest and regenerated report are modified before the final commit.

- [ ] **Step 4: Commit the approved source baseline**

```powershell
git add src/data/content-sources/manifest.json docs/content-sources/content-gaps.zh-CN.md
git commit -m "完成全站技术内容资料核验"
```

Expected: a clean working tree. Only now write the second implementation plan for verified RU/EN content and page components.

## Completion criteria

- The manifest contains exactly 22 current instruments and 36 current accessories.
- Every required field has one allowed status and an explicit evidence trail or reason.
- Third-party supplier pages are never the sole evidence source.
- The two unused accessory data files remain outside the 36-item inventory.
- The structural check passes throughout the audit.
- The launch check blocks public content work until all evidence gaps are resolved.
- No public page copy, URL, sitemap, robots rule, IndexNow file, deployment setting, or production server is changed in this phase.
