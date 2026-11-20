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
const { getInstrumentSpecifications } = load("src/data/instrument-specifications");
const normalize = value => value.replace(/\s+/g, " ").trim();
const pilotModels = {
  "easidew-pro-is": ["525 barg", "450 barg", "138 barg", "12–28 V DC", "±2 °C", "1.27 kg"],
  "easidew-pro-xp": ["450 barg", "132 barg", "14–28 V DC", "±2 °C", "1.6 kg", "2.4 kg"],
  mdm300: ["350 barg", "±2 °C", "−70", "IP66", "8 MB"]
};

test("key models show the verified limits and variant values before the PDF section", () => {
  for (const [slug, expected] of Object.entries(pilotModels)) {
    const product = products.find(item => item.slug === slug);
    const groupCounts = [];
    for (const locale of ["en", "ru"]) {
      const dom = new JSDOM(renderToStaticMarkup(React.createElement(ProductPage, { locale, product })));
      const document = dom.window.document;
      const section = document.getElementById(`${slug}-specifications`);
      const documents = document.getElementById(`${slug}-documents`);
      assert.ok(section.compareDocumentPosition(documents) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
      assert.equal(section.querySelectorAll("h3").length, 4, `${locale}/${slug}: grouped headings`);
      const tables = [...section.querySelectorAll("table")];
      const counts = tables.map(table => table.querySelectorAll('tbody tr:has(th[scope="row"])').length);
      assert.equal(tables.length, 4);
      assert.ok(counts.reduce((sum, count) => sum + count, 0) >= 16);
      groupCounts.push(counts);
      for (const value of expected) assert.ok(normalize(section.textContent).includes(value), `${locale}/${slug}: ${value}`);
      const versions = document.getElementById(`${slug}-versions`);
      if (slug === "mdm300") {
        const flowRow = [...versions.querySelectorAll("tbody tr")].find(row => row.textContent.includes("0.2–1.2"));
        assert.ok(flowRow);
        assert.match(flowRow.cells[1].textContent, /0\.2–1\.2/);
        assert.match(flowRow.cells[2].textContent, /0\.2–0\.5/);
      } else if (slug === "easidew-pro-xp") {
        assert.doesNotMatch(section.textContent, /525 barg|12–28 V DC|32\.9/);
      }
      dom.window.close();
    }
    assert.deepEqual(groupCounts[0], groupCounts[1]);
  }
});

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
      const sheet = getInstrumentSpecifications(product.slug, locale);
      assert.ok(sheet, product.slug);
      const specifications = document.getElementById(`${product.slug}-specifications`);
      const tables = [...specifications.querySelectorAll("table")];
      const navigation = document.querySelector(`nav:has(a[href="#${product.slug}-overview"])`);
      const applications = document.getElementById(`${product.slug}-applications`);
      const applicationLink = navigation.querySelector(`a[href="#${product.slug}-applications"]`);
      const applicationLabel = locale === "ru" ? "Применение" : "Applications";
      assert.equal(applicationLink?.textContent, applicationLabel, product.slug);
      assert.equal(applications?.querySelector("h2")?.textContent, applicationLabel, product.slug);
      assert.deepEqual([...applications.querySelectorAll("li")].map(li => li.textContent), product.applications[locale]);
      assert.ok(!navigation.querySelector(`a[href="#${product.slug}-selection"]`), product.slug);
      assert.ok(specifications.compareDocumentPosition(applications) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
      assert.ok(!specifications.querySelector("ul, a"), `${product.slug}: no public source list`);
      assert.equal(tables.length, sheet.groups.length, product.slug);
      assert.ok(sheet.source.revision || sheet.source.label, product.slug);
      if (product.slug === "optidew-hz") {
        assert.equal(tables.length, 0);
        assert.match(body, /401\/501/);
        assert.doesNotMatch(body, /120 °C|0[.,]15/u);
        assert.match(specifications.textContent, /Pending model verification|Исполнение уточняется/u);
        assert.doesNotMatch(product.overview[locale], /hydrocarbon dew.point|углеводородн/iu);
      } else {
        assert.ok(!specifications.querySelector("p"), `${product.slug}: no standalone specification notes`);
        assert.ok(tables.length >= 2, product.slug);
        const rows = tables.flatMap(table => [...table.querySelectorAll("tbody tr")]);
        assert.ok(rows.length >= 8, product.slug);
        assert.deepEqual(rows.map(row => [...row.cells].map(cell => normalize(cell.textContent))), sheet.groups.flatMap(group => group.rows.map(row => [normalize(row.label), normalize(row.value)])), product.slug);
      }
      if (product.slug === "dmt143-dmt143l") {
        const operating = [...specifications.querySelectorAll("tr")].find(row => row.cells[0]?.textContent.startsWith("DMT143L:") && /operating pressure|рабочее давление/i.test(row.textContent));
        assert.match(operating.cells[1].textContent, /^0–20\s/u);
        assert.match(operating.cells[1].textContent, /50\s/u);
      }
      if (product.slug !== "mdm300") {
        assert.ok(!document.querySelector('[id$="-versions"]'), product.slug);
        assert.ok(!document.querySelector('img[src*="mdm300-gallery"]'), product.slug);
      }
      const prefix = locale === "en" ? "/en" : "";
      const quote = document.querySelector(`a[href="${prefix}/contact?model=${encodeURIComponent(product.model)}"]`);
      assert.ok(quote, product.slug);
      assert.ok(quote.closest("[data-product-detail]"));
      const pdfLinks = [...document.querySelectorAll("a")].filter(a => a.getAttribute("href") === pdfPath(product.pdf));
      assert.equal(pdfLinks.length, 1, product.slug);
      assert.ok(pdfLinks[0].closest(`#${product.slug}-documents`));
      assert.ok(pdfLinks[0].classList.contains("btn-primary"));
      assert.ok(document.querySelector(`[data-product-detail] a[href="#${product.slug}-specifications"].btn-outline`));
      for (const anchor of document.querySelectorAll('a[href^="#"]:not([href="#"])')) assert.ok(document.getElementById(anchor.getAttribute("href").slice(1)), `${product.slug}: ${anchor.href}`);
      for (const link of getProductApplicationLinks(product.slug)) assert.ok(document.querySelector(`a[href="${prefix}${link.path}"]`), product.slug);
      assert.ok(existsSync(new URL(`../public/datasheets/${product.pdf}`, import.meta.url)));
      assert.doesNotMatch(body, /AI-assisted illustrations|Add to Cart|Buy Now|В корзину/);
      assert.ok(!document.querySelector("figure figcaption"));
      dom.window.close();
    }
  });
}

test("each original catalog model has one source-backed specification sheet in both languages", () => {
  for (const product of products) {
    const ru = getInstrumentSpecifications(product.slug, "ru");
    const en = getInstrumentSpecifications(product.slug, "en");
    assert.deepEqual(ru.source, en.source, product.slug);
    assert.deepEqual(ru.references, en.references, product.slug);
    assert.deepEqual(ru.groups.map(group => [group.key, group.rows.length]), en.groups.map(group => [group.key, group.rows.length]), product.slug);
    for (const sheet of [ru, en]) {
      for (const source of [sheet.source, ...sheet.references]) {
        assert.ok(source.label || source.revision, product.slug);
        if (source.url) assert.equal(new URL(source.url).protocol, "https:");
      }
      for (const group of sheet.groups) {
        assert.equal(new Set(group.rows.map(row => row.label)).size, group.rows.length, `${product.slug}/${group.key}`);
        for (const row of group.rows) assert.ok(row.label.trim() && row.value.trim(), product.slug);
      }
    }
  }
  assert.equal(getInstrumentSpecifications("toString", "en"), undefined);
});

test("the product route keeps the common detail page and dwell tracking", () => {
  const source = readFileSync(new URL("../src/components/site.tsx", import.meta.url), "utf8");
  assert.match(source, /<InstrumentProductDetail locale=\{locale\} product=\{product\}/);
  assert.match(source, /<ProductDwellGoal slug=\{product\.slug\} model=\{product\.model\}/);
  assert.doesNotMatch(source, /product\.slug === "mdm300"/);
});
