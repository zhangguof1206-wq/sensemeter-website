import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { compressedAirDewPoint as page } from "../src/data/applications/compressed-air-dew-point.ts";

const samplingCopy = JSON.parse(readFileSync(new URL("../docs/content/english-sampling-copy-2026-10-29.json", import.meta.url), "utf8"));

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

test("the English sampling FAQ is unique and does not promise included accessories", () => {
  assert.equal(page.content.en.faqs.length, 7);
  assert.deepEqual(page.content.en.faqs[6], samplingCopy.samplingFaq);
  assert.equal(page.content.en.faqs.filter(item => item.question === samplingCopy.samplingFaq.question).length, 1);
  assert.match(page.content.en.faqs[6].answer, /should not be assumed to be included unless it is listed in the quotation/);
});

test("all fields outside the approved Russian copy and English testing guidance remain unchanged", () => {
  const snapshot = structuredClone(page);
  delete snapshot.content.ru.lead;
  delete snapshot.content.ru.selectionTitle;
  snapshot.content.ru.faqs[1] = null;
  delete snapshot.content.en.overviewText;
  delete snapshot.content.en.faqs[0].answer;
  snapshot.content.en.faqs = snapshot.content.en.faqs.slice(0, 4);
  const hash = createHash("sha256").update(JSON.stringify(snapshot)).digest("hex");
  assert.equal(hash, "1b8b551c7e1f1973b2a45610dc3ee874223d3ed0dda1e5540ce2b4344c7342eb");
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

const escapeHtml = text => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

for (const locale of ["ru", "en"]) test(`real ${locale} SSR renders content and matching FAQ structured-data answers`, () => {
  const copy = page.content[locale];
  const resolved = { ...page, locale, copy };
  const html = renderToStaticMarkup(React.createElement(ApplicationPage, {
    page: resolved, languagePath: `${locale === "ru" ? "/en" : ""}/applications/compressed-air-dew-point`
  }));
  assert.ok(html.includes(escapeHtml(copy.lead)));
  const headings = tag => [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>(.*?)</${tag}>`, "g"))].map(match => match[1]);
  assert.ok(headings("h2").includes(escapeHtml(copy.selectionTitle)));
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const faq = jsonLd.find(item => item["@type"] === "FAQPage");
  assert.equal(faq.mainEntity.length, copy.faqs.length);
  for (const [index, item] of copy.faqs.entries()) {
    assert.ok(headings("h3").includes(escapeHtml(item.question)));
    assert.ok(html.includes(`>${escapeHtml(item.answer)}</p>`));
    assert.equal(faq.mainEntity[index].name, item.question);
    assert.equal(faq.mainEntity[index].acceptedAnswer.text, item.answer);
  }
});
