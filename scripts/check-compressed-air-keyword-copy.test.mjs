import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { compressedAirDewPoint as page } from "../src/data/applications/compressed-air-dew-point.ts";

const approved = {
  lead: "Датчик точки росы для сжатого воздуха контролирует сухость воздуха после осушителя и в пневмолинии. Для непрерывного контроля применяют преобразователи, для проверки нескольких точек подходят переносные гигрометры.",
  selectionTitle: "Как выбрать датчик точки росы для осушителя",
  question: "Где устанавливают датчик точки росы в компрессорной?",
  answer: "При контроле сжатого воздуха датчик устанавливают в линии после осушителя или перед критическим потребителем. Измеряют точку росы сжатого воздуха, а не влажность воздуха помещения. Монтаж, давление у сенсора и расход пробы выбирают по руководству конкретной модели."
};

test("RU lead and selection heading match the approved application-focused copy", () => {
  assert.equal(page.content.ru.lead, approved.lead);
  assert.equal(page.content.ru.selectionTitle, approved.selectionTitle);
});

test("the existing installation FAQ distinguishes process air from room humidity", () => {
  assert.equal(page.content.ru.faqs.length, 6);
  assert.deepEqual(page.content.ru.faqs[1], { question: approved.question, answer: approved.answer });
  assert.equal(page.content.ru.faqs.filter(item => item.question === approved.question).length, 1);
});

test("every field outside the three approved copy locations remains unchanged", () => {
  const snapshot = structuredClone(page);
  delete snapshot.content.ru.lead;
  delete snapshot.content.ru.selectionTitle;
  snapshot.content.ru.faqs[1] = null;
  const hash = createHash("sha256").update(JSON.stringify(snapshot)).digest("hex");
  assert.equal(hash, "527f4804d05b6f915e892bc0d1e84d9723498634e198240ec268a3415e9115b9");
});

const require = createRequire(import.meta.url);
const dependencies = {
  "@/lib/i18n": require("../src/lib/i18n.ts"),
  "@/data/catalog": require("../src/data/catalog.ts"),
  "next/link": ({ children, ...props }) => React.createElement("a", props, children),
  "next/image": ({ fill, priority, ...props }) => React.createElement("img", props),
  "@/components/site": { PageShell: ({ children }) => React.createElement("main", null, children) },
  "@/lib/seo": { applicationBreadcrumbJsonLd: () => ({ "@type": "BreadcrumbList" }) },
  "@/components/applications/application-scenarios": { ApplicationScenarios: () => null },
  "@/components/applications/application-products": { ApplicationProducts: () => null }
};

// Render the real edited content and JSON-LD, without a browser or Next request context.
function loadComponent(name) {
  const source = readFileSync(new URL(`../src/components/applications/${name}.tsx`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
  });
  const module = { exports: {} };
  new Function("require", "module", "exports", outputText)(id => dependencies[id] ?? require(id), module, module.exports);
  return module.exports;
}

for (const name of ["application-hero", "application-selection", "application-faq"]) {
  dependencies[`@/components/applications/${name}`] = loadComponent(name);
}
const { ApplicationPage } = loadComponent("application-page");

test("real SSR renders the approved text and a matching FAQ structured-data answer", () => {
  const resolved = { ...page, locale: "ru", copy: page.content.ru };
  const html = renderToStaticMarkup(React.createElement(ApplicationPage, {
    page: resolved, languagePath: "/en/applications/compressed-air-dew-point"
  }));
  assert.ok(html.includes(approved.lead));
  const headings = tag => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>(.*?)</${tag}>`, "g"))].map(match => match[1]);
  assert.ok(headings("h2").includes(approved.selectionTitle));
  assert.ok(headings("h3").includes(approved.question));
  assert.ok(html.includes(`>${approved.answer}</p>`));
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faq = jsonLd.find(item => item["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, 6);
  assert.equal(faq.mainEntity[1].name, approved.question);
  assert.equal(faq.mainEntity[1].acceptedAnswer.text, approved.answer);
});
