import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const load = createComponentLoader();
const { products, pdfPath } = load("src/data/catalog.ts");
const { getProductApplicationLinks } = load("src/data/application-links.ts");
const { ProductPage } = load("src/components/site.tsx");
const normalize = value => value.replace(/\s+/g, " ").trim();

for (const locale of ["ru", "en"]) {
  test(`all ${locale} instruments use the approved detail structure and preserve content`, () => {
    for (const product of products) {
      const dom = new JSDOM(renderToStaticMarkup(React.createElement(ProductPage, { locale, product })));
      const document = dom.window.document;
      const body = normalize(document.body.textContent);
      assert.ok(document.querySelector("[data-product-detail]"), product.slug);
      assert.equal(document.querySelectorAll("h1").length, 1, product.slug);
      assert.equal(document.querySelector("h1").textContent, product.model);
      for (const fact of document.querySelectorAll('[data-product-detail] dl > div')) assert.ok(fact.querySelector("dt") && fact.querySelector("dd"), `${product.slug}: key facts need an accessible label`);
      for (const value of [product.overview[locale], ...product.highlights[locale], ...product.applications[locale], ...(product.selectionInputs?.[locale] ?? [])]) assert.ok(body.includes(normalize(value)), `${product.slug}: ${value}`);
      if (product.slug !== "mdm300") {
        const rows = [...document.querySelectorAll(`#${product.slug}-specifications tbody tr`)];
        for (const value of product.params[locale]) assert.ok(rows.some(row => normalize([...row.children].map(cell => cell.textContent).join(": ")) === normalize(value)), `${product.slug}: ${value}`);
        assert.ok(!document.querySelector('[id$="-versions"]'), product.slug);
        assert.ok(!document.querySelector('img[src*="mdm300-gallery"]'), product.slug);
      }
      const prefix = locale === "en" ? "/en" : "";
      const quote = document.querySelector(`a[href="${prefix}/contact?model=${encodeURIComponent(product.model)}"]`);
      assert.ok(quote, product.slug);
      assert.ok(quote.closest("[data-product-detail]"));
      const pdfLinks = [...document.querySelectorAll("a")].filter(a => a.getAttribute("href") === pdfPath(product.pdf));
      assert.equal(pdfLinks.length, 2, product.slug);
      assert.ok(pdfLinks[0].classList.contains("btn-outline"));
      assert.ok(pdfLinks[1].classList.contains("btn-primary"));
      for (const anchor of document.querySelectorAll('a[href^="#"]:not([href="#"])')) assert.ok(document.getElementById(anchor.getAttribute("href").slice(1)), `${product.slug}: ${anchor.href}`);
      for (const link of getProductApplicationLinks(product.slug)) assert.ok(document.querySelector(`a[href="${prefix}${link.path}"]`), product.slug);
      assert.ok(existsSync(new URL(`../public/datasheets/${product.pdf}`, import.meta.url)));
      assert.doesNotMatch(body, /AI-assisted illustrations|Add to Cart|Buy Now|В корзину/);
      assert.ok(!document.querySelector("figure figcaption"));
      dom.window.close();
    }
  });
}

test("parameter display adaptation is lossless and optional sections remain conditional", () => {
  const { getInstrumentDetails } = load("src/data/product-details.ts");
  for (const product of products.filter(p => p.slug !== "mdm300")) {
    for (const locale of ["ru", "en"]) {
      const details = getInstrumentDetails(locale, product);
      assert.equal(details.specifications.length, product.params[locale].length);
      assert.deepEqual(details.specifications.map(row => row.label ? `${row.label}: ${row.value}` : row.value), product.params[locale]);
      assert.ok(details.productType);
      assert.ok(!details.versionRows);
    }
  }
});

test("existing product data and SEO generation are not changed by a layout-only migration", () => {
  const source = readFileSync(new URL("../src/components/site.tsx", import.meta.url), "utf8");
  assert.match(source, /<InstrumentProductDetail locale=\{locale\} product=\{product\}/);
  assert.match(source, /<ProductDwellGoal slug=\{product\.slug\} model=\{product\.model\}/);
  assert.doesNotMatch(source, /product\.slug === "mdm300"/);
});
