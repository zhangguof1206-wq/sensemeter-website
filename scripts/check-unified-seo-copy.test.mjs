import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import test from "node:test";
import { products } from "../src/data/catalog.ts";
import { getProductSeoDescription } from "../src/data/product-seo-descriptions.ts";
import { compressedAirDewPoint as air } from "../src/data/applications/compressed-air-dew-point.ts";
import { naturalGasMoistureMonitoring as gas } from "../src/data/applications/natural-gas-moisture-monitoring.ts";

const copy = JSON.parse(readFileSync(new URL("../docs/content/seo-unified-copy-2026-10-19.json", import.meta.url), "utf8"));
const samplingCopy = JSON.parse(readFileSync(new URL("../docs/content/english-sampling-copy-2026-10-29.json", import.meta.url), "utf8"));
const hash = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");

test("the five approved English product types and complete descriptions reach real metadata", async () => {
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      return specifier.startsWith("@/")
        ? nextResolve(new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, context)
        : nextResolve(specifier, context);
    }
  });
  try {
    const { productMetadata } = await import("../src/lib/seo.ts");
    for (const expected of copy.englishProducts) {
      const product = products.find(item => item.slug === expected.slug);
      assert.ok(product, expected.slug);
      const metadata = productMetadata("en", product);
      assert.equal(metadata.title, `${product.model} - ${expected.type}`, expected.slug);
      assert.equal(metadata.description, expected.description, expected.slug);
      assert.equal(metadata.openGraph.title, `${metadata.title} | SenseMeter`);
      assert.equal(metadata.openGraph.description, expected.description);
      assert.equal(metadata.alternates.canonical, `/en/products/${product.slug}`);
      assert.ok(`${metadata.title} | SenseMeter`.length <= 65, expected.slug);
      assert.ok(expected.description.length <= 155 && expected.description.endsWith("."));
      assert.ok(!expected.description.includes("..."));
      assert.equal(getProductSeoDescription("ru", product.slug), undefined);
      const ruType = { MICHELL: "датчик точки росы", ROTRONIC: "датчик влажности и температуры", VAISALA: "датчик влажности и точки росы" }[product.category];
      assert.equal(productMetadata("ru", product).title, `${product.model} - ${ruType}`);
    }
  } finally {
    hooks.deregister();
  }
});

test("English compressed-air guidance records pressure basis and model-specific sampling conditions", () => {
  assert.equal(air.content.en.overviewText, copy.compressedAirEn.overviewText);
  assert.equal(air.content.en.faqs[0].answer, copy.compressedAirEn.testingAnswer);
  assert.ok(air.content.en.faqs.length >= 6);
  assert.deepEqual(air.content.en.faqs.slice(4, 6), copy.compressedAirEn.additionalFaqs);
  assert.match(air.content.en.faqs[4].answer, /not directly comparable/);
  assert.match(air.content.en.faqs[5].answer, /no single flow rate or waiting time/);
});

test("MDM300 selection distinguishes safe areas from conditional intrinsically safe use", () => {
  const product = products.find(item => item.slug === "mdm300");
  assert.equal(product.selectionInputs.en.length, 4);
  assert.equal(product.selectionInputs.en[2], samplingCopy.mdm300Safety);
  assert.match(product.selectionInputs.en[2], /standard MDM300 is for safe-area use/);
  assert.match(product.selectionInputs.en[2], /specific unit's approval conditions/);
});

test("DMT153 describes calibrated range, accuracy bands, absolute pressure and compatibility limits", () => {
  const product = products.find(item => item.slug === "dmt153");
  assert.deepEqual(product.params.en, copy.dmt153.params);
  assert.deepEqual(product.highlights.en, copy.dmt153.highlights);
  assert.match(product.params.en[0], /Calibrated.*-80 to -20/);
  assert.match(product.params.en[1], /\+\/-2.*-80 to -40.*\+\/-3.*-40 to -20.*gas-temperature limits/);
  assert.match(product.params.en[2], /0-50 bar absolute/);
  assert.match(product.highlights.en.join(" "), /Not Ex-certified/);
});

test("gas guidance requires chemical compatibility review independently from explosion protection", () => {
  assert.equal(gas.content.ru.selectionCards[0].text, copy.gasRu.selectionText);
  assert.equal(gas.content.ru.faqs[1].answer, copy.gasRu.installationAnswer);
  assert.match(gas.content.ru.faqs[1].answer, /Взрывозащита не означает химическую стойкость/);
});

test("catalog identity and content outside the approved technical corrections stays unchanged", () => {
  const corrected = {
    "easidew-pro-is": ["params", "overview"],
    "easidew-pro-xp": ["params", "overview"],
    "easidew-34-m12": ["overview"],
    "easidew-online": ["params"],
    "gpr-1000-1100-2000-3500": ["params", "highlights"],
    "gpr-1500": ["params", "overview"],
    "gpr-1500gb-2500gb": ["params"],
    "gpr-1600-2600-3100": ["params"],
    "gpr-1900-2900": ["params"],
    "hc2a-industrial": ["params"],
    "hc2a-series": ["params"],
    "hp31-hp32": ["params"],
    "optidew-hz": ["params", "overview", "highlights", "applications", "selectionInputs"],
    "sf82-online": ["params"],
    "pura-transmitter": ["params"],
    "hygroflex1": ["params"],
    "hmt370ex": ["params"],
    "hmt310": ["params"],
    "hmp3-hmpx": ["highlights"],
    "dmt143-dmt143l": ["params"]
  };
  const snapshot = structuredClone(products);
  for (const item of snapshot) {
    for (const key of corrected[item.slug] ?? []) delete item[key];
  }
  const product = snapshot.find(item => item.slug === "dmt153");
  delete product.params;
  delete product.highlights.en;
  snapshot.find(item => item.slug === "mdm300").selectionInputs.en[2] = "Ordinary or intrinsically safe version";
  // Hash from the pre-change catalog after applying the same field mask.
  assert.equal(hash(snapshot), "7c508dc4df6a281dd7993064e91e4b61d7912e47b59e12ee188a350f766e6243");
});

test("the gas page no longer recommends the unverified Optidew-HZ; other content is preserved", () => {
  assert.ok(!gas.recommendedSlugs.includes("optidew-hz"));
  const snapshot = structuredClone(gas);
  delete snapshot.content.ru.selectionCards[0].text;
  delete snapshot.content.ru.faqs[1].answer;
  assert.equal(hash(snapshot), "3d62903a8e6867a4dd22a5d42cc4c37d46b49bcbcb69536a133571cf6dc06ce1");
});

test("GitHub regression includes all approved catalog and copy checks before release", () => {
  const workflow = readFileSync(new URL("../.github/workflows/seo-regression.yml", import.meta.url), "utf8");
  for (const script of ["test:catalog-navigation", "test:product-seo", "test:compressed-air-keywords", "test:unified-seo-copy"]) {
    assert.ok(workflow.includes(`npm run ${script}`), `Missing GitHub check: ${script}`);
  }
});
