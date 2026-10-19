import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import test from "node:test";
import { products } from "../src/data/catalog.ts";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("only the seven approved English descriptions override the existing fallback", async () => {
  const { getProductSeoDescription } = await import("../src/data/product-seo-descriptions.ts");
  const proposal = JSON.parse(read("docs/content/product-seo-copy-proposal-2026-10-13.json"));
  const batch = JSON.parse(read("docs/content/seo-unified-copy-2026-10-19.json"));
  const approved = new Map(batch.englishProducts.map(row => [row.slug, row.description]));
  for (const slug of ["hmp3-hmpx", "mdm300"]) {
    approved.set(slug, proposal.products.find(row => row.slug === slug).description.en);
  }
  for (const product of products) {
    assert.equal(getProductSeoDescription("ru", product.slug), undefined);
    const value = getProductSeoDescription("en", product.slug);
    if (approved.has(product.slug)) {
      assert.equal(value, approved.get(product.slug));
      assert.ok(value.length <= 155 && value.endsWith("."));
      assert.ok(!value.includes("..."));
    } else assert.equal(value, undefined, product.slug);
  }
  assert.equal(getProductSeoDescription("en", "constructor"), undefined);
});

test("real product metadata keeps RU and all other product description fallbacks", async () => {
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      if (specifier.startsWith("@/")) {
        return nextResolve(new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, context);
      }
      return nextResolve(specifier, context);
    }
  });
  try {
    const { productMetadata, languageAlternates } = await import("../src/lib/seo.ts");
    const { getProductSeoDescription } = await import("../src/data/product-seo-descriptions.ts");
    for (const locale of ["ru", "en"]) {
      for (const product of products) {
        const result = productMetadata(locale, product);
        const original = locale === "ru"
          ? `${product.overview.ru} Запросите цену, наличие и PDF datasheet у SenseMeter.`
          : `${product.overview.en} Request pricing, availability and PDF datasheet from SenseMeter.`;
        const fallback = original.length > 155 ? `${original.slice(0, 152).trim()}...` : original;
        assert.equal(result.description, getProductSeoDescription(locale, product.slug) ?? fallback);
        assert.equal(result.openGraph.description, result.description);
        const path = `/products/${product.slug}`;
        assert.equal(result.alternates.canonical, `${locale === "en" ? "/en" : ""}${path}`);
        assert.deepEqual(result.alternates.languages, languageAlternates(path));
      }
    }
  } finally {
    hooks.deregister();
  }
});
