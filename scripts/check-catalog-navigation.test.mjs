import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

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
