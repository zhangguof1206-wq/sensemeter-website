import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createComponentLoader } from "./lib/component-test-loader.mjs";
import { products, pdfPath } from "../src/data/catalog.ts";
import { getProductApplicationLinks } from "../src/data/application-links.ts";

const require = createRequire(import.meta.url);
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const componentPath = "src/components/products/mdm300-product-sample.tsx";
const product = products.find(item => item.slug === "mdm300");

const loadTsx = createComponentLoader();

function render(locale) {
  const { Mdm300ProductSample } = loadTsx(componentPath);
  return renderToStaticMarkup(React.createElement(Mdm300ProductSample, { locale, product }));
}

function text(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
}

test("the sample keeps the real RU and EN product content and one model heading", () => {
  for (const locale of ["ru", "en"]) {
    const html = render(locale);
    const body = text(html);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(body.includes(product.model));
    assert.ok(body.includes(product.overview[locale]));
    for (const content of [...product.highlights[locale], ...product.applications[locale], ...product.selectionInputs[locale]]) {
      assert.ok(body.includes(content), `Missing original ${locale} content: ${content}`);
    }
    assert.match(html, /width="1536"/);
    assert.match(html, /height="1024"/);
    assert.doesNotMatch(body, /AI-assisted illustrations|Иллюстрации подготовлены с помощью ИИ/);
    assert.doesNotMatch(body, /Add to Cart|Buy Now|В корзину/);
  }
});

test("the quote and specifications actions appear before the long content", () => {
  assert.ok(existsSync(new URL(`../public/datasheets/${product.pdf}`, import.meta.url)));
  for (const locale of ["ru", "en"]) {
    const html = render(locale);
    const prefix = locale === "en" ? "/en" : "";
    const quote = `${prefix}/contact?model=${encodeURIComponent(product.model)}`;
    assert.ok(html.includes(`href="${quote}"`));
    assert.ok(html.indexOf(`href="${quote}"`) < html.indexOf('id="mdm300-overview"'));
    assert.ok(html.indexOf('href="#mdm300-specifications"') < html.indexOf('id="mdm300-overview"'));
    assert.ok(html.includes(`href="${pdfPath(product.pdf)}"`));
    assert.match(read("src/components/products/instrument-product-detail.tsx"), /METRICA_GOALS\.pdfDownload/);
    assert.match(read("src/components/products/instrument-product-detail.tsx"), /goalParams=\{\{ slug: product\.slug, model: product\.model \}\}/);
    for (const link of getProductApplicationLinks("mdm300")) {
      assert.ok(html.includes(`href="${prefix}${link.path}"`));
    }
  }
});

test("the document PDF action uses the brand fill and stays below the specification table", () => {
  for (const locale of ["ru", "en"]) {
    const html = render(locale);
    const links = [...html.matchAll(/<a\b[^>]*>/g)]
      .map(match => match[0])
      .filter(tag => tag.includes(`href="${pdfPath(product.pdf)}"`));
    assert.equal(links.length, 1);
    assert.match(links[0], /\bbtn-primary\b/);
    assert.ok(html.indexOf(links[0]) > html.indexOf('id="mdm300-documents"'));
  }
});

test("the image caption is removed and configuration guidance stays in selection", () => {
  const { mdm300ProductSampleCopy } = require("../src/data/mdm300-product-sample.ts");
  for (const locale of ["ru", "en"]) {
    const html = render(locale);
    const figure = html.match(/<figure\b[^>]*>[\s\S]*?<\/figure>/)?.[0];
    assert.ok(figure);
    assert.doesNotMatch(figure, /<figcaption\b/);
    const selection = html.slice(html.indexOf('id="mdm300-selection"')).split("</section>")[0];
    assert.ok(text(selection).includes(mdm300ProductSampleCopy[locale].samplingNote));
  }
});

test("technical and version tables retain qualified values without equating the two models", () => {
  for (const locale of ["ru", "en"]) {
    const html = render(locale);
    const body = text(html);
    assert.ok((html.match(/<table\b/g) || []).length >= 2);
    assert.match(html, /scope="col"/);
    assert.match(html, /scope="row"/);
    for (const value of ["350 barg", "IP66", "NEMA 4", "48", "24", "15", "30", "T95"]) assert.ok(body.includes(value));
    assert.match(body, /±1 °C.*-60.*\+20 °Cdp/);
    if (locale === "en") {
      assert.match(body, /standard MDM300 is for safe-area use/);
      assert.match(body, /specific unit's approval conditions/);
      assert.match(body, /sampling.*quotation/i);
    } else {
      assert.match(body, /безопасных зон/);
      assert.match(body, /условий.*сертификац/);
    }
  }
});

test("every in-page navigation target is present in both languages", () => {
  for (const locale of ["ru", "en"]) {
    const html = render(locale);
    for (const id of ["overview", "specifications", "versions", "applications", "documents"]) {
      assert.ok(html.includes(`href="#mdm300-${id}"`));
      assert.ok(html.includes(`id="mdm300-${id}"`));
    }
    assert.ok(!html.includes('href="#mdm300-selection"'));
    assert.ok(html.includes('id="mdm300-selection"'));
    assert.match(html, /aria-label="[^"]+"/);
  }
});

test("all instruments use the approved template while retaining dwell tracking", () => {
  const source = read("src/components/site.tsx");
  assert.doesNotMatch(source, /product\.slug === "mdm300"/);
  assert.match(source, /<InstrumentProductDetail locale=\{locale\} product=\{product\}/);
  assert.match(source, /<ProductDwellGoal slug=\{product\.slug\} model=\{product\.model\}/);
});

test("the real ProductPage keeps MDM300-only versions while unifying all instruments", () => {
  const { ProductPage } = loadTsx("src/components/site.tsx");
  for (const locale of ["ru", "en"]) {
    for (const item of products) {
      const html = renderToStaticMarkup(React.createElement(ProductPage, { locale, product: item }));
      assert.equal(html.includes('id="mdm300-specifications"'), item.slug === "mdm300", `${locale}/${item.slug}`);
      assert.match(html, /data-product-detail/);
      assert.ok(text(html).includes(item.overview[locale]), `${locale}/${item.slug}`);
      assert.equal((html.match(/<h1\b/g) || []).length, 1);
    }
  }
});

test("the version data does not swap response time or battery endurance", () => {
  const { mdm300ProductSampleCopy } = require("../src/data/mdm300-product-sample.ts");
  for (const locale of ["ru", "en"]) {
    const rows = mdm300ProductSampleCopy[locale].versionRows;
    assert.match(rows[0].standard, /15/);
    assert.match(rows[0].intrinsicallySafe, /30/);
    assert.match(rows[1].standard, /48/);
    assert.match(rows[1].intrinsicallySafe, /24/);
  }
});
