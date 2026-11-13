import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = path => existsSync(new URL(`../${path}`, import.meta.url));
const require = createRequire(import.meta.url);
const module = { exports: {} };
const { outputText } = ts.transpileModule(read("src/components/catalog/catalog-nav-dropdown.tsx"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
});
const menuRequire = id => {
  if (id === "@/lib/i18n") return require("../src/lib/i18n.ts");
  if (id === "next/link") return ({ children, ...props }) => React.createElement("a", props, children);
  return require(id);
};
new Function("require", "module", "exports", outputText)(menuRequire, module, module.exports);
const { CatalogNavDropdown } = module.exports;

test("RU and EN catalog menus contain only instruments and accessories", () => {
  for (const locale of ["ru", "en"]) {
    const html = renderToStaticMarkup(React.createElement(CatalogNavDropdown, { locale, active: true }));
    const prefix = locale === "en" ? "/en" : "";
    const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map(match => match[1]);
    assert.deepEqual(links, [`${prefix}/catalog`, `${prefix}/catalog`, `${prefix}/accessories`]);
    for (const label of locale === "ru" ? ["Приборы", "Комплектующие"] : ["Instruments", "Accessories"]) assert.ok(html.includes(label));
    assert.doesNotMatch(html, /Dew Point and Gas Moisture|Точка росы и влага в газе/);
  }
});

test("the rejected measurement category has no catalog entry, sitemap entry or route", () => {
  assert.doesNotMatch(read("src/components/site.tsx"), /MeasurementCategoryLinks/);
  assert.doesNotMatch(read("src/app/sitemap.ts"), /measurementCategor/);
  for (const path of [
    "src/app/catalog/[category]/page.tsx",
    "src/app/en/catalog/[category]/page.tsx",
    "src/data/measurement-categories.ts",
    "src/components/catalog/measurement-category-links.tsx",
    "src/components/catalog/measurement-category-page.tsx"
  ]) assert.equal(exists(path), false, path);
});

test("catalogs omit the product count while brand and model filters preserve their results", () => {
  const load = createComponentLoader();
  const { CatalogPage } = load("src/components/site.tsx");
  const { products, categories } = load("src/data/catalog.ts");
  for (const locale of ["ru", "en"]) {
    const prefix = locale === "en" ? "/en" : "";
    for (const filters of [{}, ...categories.map(category => ({ category: category.id })), { query: "MDM300" }, { query: "no-such-model" }]) {
      const dom = new JSDOM(renderToStaticMarkup(React.createElement(CatalogPage, { locale, ...filters })));
      try {
        const main = dom.window.document.querySelector("main");
        assert.ok(!/\d+\s+(?:products|продуктов)/iu.test(main.textContent), "The catalog product-count label must be absent");
        const expected = products.filter(product => (!filters.category || product.category === filters.category) && (!filters.query || product.model.toLowerCase().includes(filters.query.toLowerCase())));
        assert.deepEqual([...main.querySelectorAll("article.card h3")].map(heading => heading.textContent), expected.map(product => product.model));
        for (const category of categories) assert.ok(main.querySelector(`a[href="${prefix}/catalog?category=${category.id}"]`));
        assert.ok(main.querySelector(`a[href="${prefix}/catalog"]`));
      } finally {
        dom.window.close();
      }
    }
  }
});
