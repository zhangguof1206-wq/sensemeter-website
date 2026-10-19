import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import test from "node:test";
import { products } from "../src/data/catalog.ts";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = path => existsSync(new URL(`../${path}`, import.meta.url));
const approved = JSON.parse(read("docs/content/measurement-category-copy-proposal-2026-10-13.json")).categories[0];

async function data() {
  assert.ok(exists("src/data/measurement-categories.ts"), "Approved measurement category module is missing");
  return import("../src/data/measurement-categories.ts");
}

test("one approved bilingual category preserves its copy and nine existing product URLs", async () => {
  const { measurementCategories, getMeasurementCategory } = await data();
  assert.equal(measurementCategories.length, 1);
  const category = getMeasurementCategory(approved.slug);
  for (const field of ["slug", "path", "navLabel", "ru", "en", "relatedApplicationPaths", "contactPath"]) {
    assert.deepEqual(category[field], approved[field], field);
  }
  const slugs = category.productGroups.flatMap(group => group.slugs);
  assert.deepEqual(slugs, approved.productGroups.flatMap(group => group.slugs));
  assert.equal(new Set(slugs).size, 9);
  assert.ok(!slugs.includes("optidew-hz"));
  for (const slug of slugs) {
    const product = products.find(product => product.slug === slug);
    assert.ok(product, slug);
    assert.ok(exists(`public/${product.image}`));
    assert.ok(exists(`public/datasheets/${product.pdf}`));
    for (const locale of ["ru", "en"]) assert.ok(category.cardPurposes[slug][locale]);
  }
  assert.equal(getMeasurementCategory("unknown"), undefined);
  assert.equal(getMeasurementCategory("oxygen-analyzers"), undefined);
});

test("groups have stable anchors and category cards expose no copied specification arrays", async () => {
  const { measurementCategories } = await data();
  const category = measurementCategories[0];
  assert.equal(new Set(category.productGroups.map(group => group.id)).size, 3);
  assert.deepEqual(category.productGroups.map(group => group.id), ["transmitters", "online", "portable"]);
  for (const group of category.productGroups) assert.ok(group.label.ru && group.label.en);
  const source = read("src/components/catalog/measurement-category-page.tsx");
  assert.ok(!source.includes("product.params"));
  assert.ok(source.includes("<PageShell"));
  assert.ok(source.includes("<details"));
  assert.ok(source.includes("<summary"));
  assert.ok(source.includes("localizedPath"));
  assert.ok(source.includes("category.contactPath"));
});

test("only the two approved English product descriptions override the existing fallback", async () => {
  assert.ok(exists("src/data/product-seo-descriptions.ts"), "Scoped product description module is missing");
  const { getProductSeoDescription } = await import("../src/data/product-seo-descriptions.ts");
  const proposal = JSON.parse(read("docs/content/product-seo-copy-proposal-2026-10-13.json"));
  for (const product of products) {
    assert.equal(getProductSeoDescription("ru", product.slug), undefined);
    const value = getProductSeoDescription("en", product.slug);
    if (["hmp3-hmpx", "mdm300"].includes(product.slug)) {
      assert.equal(value, proposal.products.find(row => row.slug === product.slug).description.en);
      assert.ok(value.length <= 155 && value.endsWith("."));
      assert.ok(!value.includes("..."));
    } else assert.equal(value, undefined, product.slug);
  }
  assert.equal(getProductSeoDescription("en", "constructor"), undefined);
  assert.ok(read("src/lib/seo.ts").includes("getProductSeoDescription(locale, product.slug) ?? trimDescription("));
});

test("both category routes, menu, catalog and sitemap are connected without publishing other categories", async () => {
  await data();
  for (const prefix of ["", "en/"]) {
    const source = read(`src/app/${prefix}catalog/[category]/page.tsx`);
    for (const token of ["generateStaticParams", "generateMetadata", "getMeasurementCategory", "notFound", "staticPageMetadata", "<MeasurementCategoryPage"]) assert.ok(source.includes(token), token);
  }
  assert.ok(read("src/components/catalog/catalog-nav-dropdown.tsx").includes("measurementCategories"));
  assert.ok(read("src/components/site.tsx").includes("<MeasurementCategoryLinks locale={locale}"));
  assert.ok(read("src/app/sitemap.ts").includes("measurementCategoryPages"));
});

test("real metadata preserves all old fields except the two English descriptions", async () => {
  const hooks = registerHooks({
    resolve(specifier, context, nextResolve) {
      if (specifier.startsWith("@/")) {
        return nextResolve(new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href, context);
      }
      return nextResolve(specifier, context);
    }
  });
  try {
    const { productMetadata, staticPageMetadata, languageAlternates } = await import("../src/lib/seo.ts");
    const { getProductSeoDescription } = await import("../src/data/product-seo-descriptions.ts");
    const { measurementCategories } = await data();
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
      const category = measurementCategories[0];
      const result = staticPageMetadata({ locale, path: category.path, ...category[locale] });
      assert.equal(result.title, category[locale].title);
      assert.equal(result.description, category[locale].description);
      assert.equal(result.alternates.canonical, `${locale === "en" ? "/en" : ""}${category.path}`);
      assert.deepEqual(result.alternates.languages, languageAlternates(category.path));
    }
  } finally {
    hooks.deregister();
  }
});
