import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const load = createComponentLoader();
const data = load("src/data/accessories/index.ts");
const { localizedPath } = load("src/lib/i18n.ts");
const { AccessoriesIndexPage } = load("src/components/accessories/accessories-index-page.tsx");
const { AccessoryCategoryPage } = load("src/components/accessories/accessory-category-page.tsx");
const { AccessoryDetailPage } = load("src/components/accessories/accessory-detail-page.tsx");
const resolverPath = "src/data/accessory-images.ts";
const visuals = existsSync(new URL(`../${resolverPath}`, import.meta.url)) ? load(resolverPath) : {};
const categoryNames = ["custom-sintered", "microporous-metal", "filter-cups", "gas-diffusers", "probe-protection", "flow-restrictors"];
const retainedSources = new Set(["/assets/accessories/filter-316l-powder-uniform.webp", "/assets/accessories/sensor-outdoor-vented-uniform.webp"]);
const expectedProductImage = image => retainedSources.has(image) ? image : image.replace("/assets/accessories/", "/assets/accessory-products/").replace("-uniform.webp", "-v2.webp");
const text = node => node?.textContent.trim();

function withDocument(Component, props, check) {
  const dom = new JSDOM(renderToStaticMarkup(React.createElement(Component, props)));
  try { check(dom.window.document); } finally { dom.window.close(); }
}

test("presentation resolvers cover the six categories and 18 sources without changing raw data or fallback paths", () => {
  assert.equal(typeof visuals.getAccessoryCategoryImage, "function");
  assert.equal(typeof visuals.getAccessoryProductImage, "function");
  assert.equal(data.accessoryCategories.length, 6);
  assert.equal(data.accessoryProducts.length, 36);
  const before = JSON.stringify(data);
  data.accessoryCategories.forEach((category, index) => {
    assert.equal(visuals.getAccessoryCategoryImage(category), `/assets/home-accessories/${categoryNames[index]}-v1.webp`);
  });
  const sources = new Set(data.accessoryProducts.map(product => product.image));
  assert.equal(sources.size, 18);
  const targets = [...sources].map(image => visuals.getAccessoryProductImage(image));
  assert.equal(new Set(targets).size, 18);
  assert.equal(targets.filter(image => image.startsWith("/assets/accessory-products/")).length, 16);
  assert.equal(targets.filter(image => retainedSources.has(image)).length, 2);
  for (const image of sources) assert.equal(visuals.getAccessoryProductImage(image), expectedProductImage(image));
  assert.equal(visuals.getAccessoryProductImage("/assets/unknown.webp"), "/assets/unknown.webp");
  assert.equal(visuals.getAccessoryCategoryImage({ slug: "unknown", image: "/assets/unknown.webp" }), "/assets/unknown.webp");
  for (const slug of ["toString", "__proto__", "constructor"]) {
    assert.equal(visuals.getAccessoryCategoryImage({ slug, image: "/assets/unknown.webp" }), "/assets/unknown.webp");
  }
  assert.equal(JSON.stringify(data), before);
});

for (const locale of ["ru", "en"]) {
  test(`${locale}: overview presents six contained category artworks with correct destinations`, () => {
    withDocument(AccessoriesIndexPage, { locale }, document => {
      assert.equal(document.querySelectorAll("h1").length, 1);
      const grid = document.querySelector("[data-accessory-categories]");
      assert.ok(grid, "Missing clean category grid");
      for (const name of ["grid-cols-1", "md:grid-cols-2", "xl:grid-cols-3"]) assert.ok(grid.classList.contains(name));
      const cards = [...grid.children];
      assert.equal(cards.length, 6);
      cards.forEach((card, index) => {
        const category = data.accessoryCategories[index];
        assert.equal(card.getAttribute("href"), localizedPath(locale, `/accessories/${category.slug}`));
        assert.equal(text(card.querySelector("h2, h3")), category.title[locale]);
        assert.equal(card.querySelector("h2, h3").tagName, "H2", "Overview categories follow the page H1 without skipping a heading level");
        assert.ok(card.textContent.includes(category.summary[locale]));
        const image = card.querySelector("img");
        assert.equal(image.getAttribute("src"), `/assets/home-accessories/${categoryNames[index]}-v1.webp`);
        assert.equal(image.getAttribute("width"), "1536");
        assert.equal(image.getAttribute("height"), "1024");
        assert.ok(image.classList.contains("object-contain"));
        assert.equal(image.getAttribute("alt"), category.title[locale]);
        assert.doesNotMatch(card.outerHTML, /hover:scale|hover:shadow|bg-\[#e9eef4\]/);
      });
      assert.equal(document.querySelectorAll("main img[aria-hidden='true']").length, 0, "Avoid decorative photo-background headings");
    });
  });

  test(`${locale}: every category shows its six products before complete technical information`, () => {
    for (const category of data.accessoryCategories) {
      const products = data.getAccessoryProductsByCategory(category.slug);
      withDocument(AccessoryCategoryPage, { category, products, locale }, document => {
        assert.equal(text(document.querySelector("h1")), category.title[locale]);
        const grid = document.querySelector("[data-accessory-products]");
        assert.ok(grid, "Products must have a distinct section before technical information");
        const cards = [...grid.children];
        assert.equal(cards.length, 6);
        cards.forEach((card, index) => {
          const product = products[index];
          assert.equal(card.getAttribute("href"), localizedPath(locale, `/accessories/${category.slug}/${product.slug}`));
          assert.ok(card.textContent.includes(product.model));
          assert.ok(card.textContent.includes(product.title[locale]));
          assert.equal(card.querySelector("img").getAttribute("src"), expectedProductImage(product.image));
          assert.doesNotMatch(card.outerHTML, /hover:scale|hover:shadow|bg-\[#e9eef4\]/);
        });
        const technical = document.getElementById("accessory-technical-information");
        assert.ok(technical);
        assert.ok(grid.compareDocumentPosition(technical) & 4);
        assert.ok(technical.textContent.includes(category.summary[locale]));
        for (const spec of category.specs) {
          assert.ok(technical.textContent.includes(spec.label[locale]));
          assert.ok(technical.textContent.includes(spec.value[locale]));
        }
        for (const item of category.technicalNotes.items) {
          assert.ok(technical.textContent.includes(item.title[locale]));
          assert.ok(technical.textContent.includes(item.text[locale]));
        }
        for (const item of category.requestItems[locale]) assert.ok(technical.textContent.includes(item));
        assert.ok(document.body.textContent.includes(category.intro[locale]));
      });
    }
  });

  test(`${locale}: all detail heroes use source-specific white product visuals while preserving original identity`, () => {
    for (const product of data.accessoryProducts) {
      const category = data.getAccessoryCategory(product.categorySlug);
      withDocument(AccessoryDetailPage, { category, product, locale }, document => {
        const hero = document.querySelector("[data-product-detail]");
        assert.equal(text(hero.querySelector("h1")), product.model);
        const image = hero.querySelector("img");
        assert.equal(image.getAttribute("src"), expectedProductImage(product.image));
        assert.equal(image.getAttribute("alt"), product.title[locale]);
        assert.ok(image.parentElement.classList.contains("bg-white"));
        assert.equal(hero.querySelectorAll("img").length, 1);
        assert.equal(hero.querySelectorAll("figcaption").length, 0);
        assert.ok(hero.querySelector('a[href*="?accessory="]'));
      });
    }
  });
}

test("refined images are separate local assets and every original remains available", () => {
  for (const image of new Set(data.accessoryProducts.map(product => product.image))) {
    assert.ok(existsSync(new URL(`../public${image}`, import.meta.url)), `Original missing: ${image}`);
    const edited = expectedProductImage(image);
    assert.ok(existsSync(new URL(`../public${edited}`, import.meta.url)), `Retouched image missing: ${edited}`);
  }
});

test("presentation does not hardcode technical data or alter SEO and tracking", () => {
  for (const path of [resolverPath, "src/components/accessories/accessory-page-heading.tsx", "src/components/accessories/accessory-cards.tsx"]) {
    if (!existsSync(new URL(`../${path}`, import.meta.url))) continue;
    const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /generateMetadata|metadataBase|reachGoal|ym\(|fetch\(|316L|\d+\s*мкм/);
  }
});
