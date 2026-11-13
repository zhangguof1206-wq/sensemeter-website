import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const load = createComponentLoader();
const { accessoryCategories, accessoryProducts, getAccessoryCategory } = load("src/data/accessories/index.ts");
const { accessoryCopy } = load("src/data/accessories/copy.ts");
const { AccessoriesIndexPage } = load("src/components/accessories/accessories-index-page.tsx");
const { AccessoryCategoryPage } = load("src/components/accessories/accessory-category-page.tsx");
const { AccessoryDetailPage } = load("src/components/accessories/accessory-detail-page.tsx");
const { AccessoryProductCard } = load("src/components/accessories/accessory-cards.tsx");
const { AccessoriesHomeSection } = load("src/components/accessories/accessories-home-section.tsx");
const { ProductPage } = load("src/components/site.tsx");
const { products } = load("src/data/catalog.ts");
const overviewPath = "src/data/accessory-overview.ts";
const overview = existsSync(new URL(`../${overviewPath}`, import.meta.url)) ? load(overviewPath) : {};
const text = node => node?.textContent.trim();

function checkMarkup(Component, props, check) {
  const dom = new JSDOM(renderToStaticMarkup(React.createElement(Component, props)));
  try { check(dom.window.document); } finally { dom.window.close(); }
}

for (const locale of ["ru", "en"]) {
  test(`${locale}: overview has one concise introduction, inset short labels and a separate technical selection band`, () => {
    checkMarkup(AccessoriesIndexPage, { locale }, document => {
      const heading = document.querySelector("[data-accessory-overview-heading]");
      assert.ok(heading, "Overview needs its own compact heading composition");
      assert.equal(text(heading.querySelector("h1")), accessoryCopy[locale].overviewTitle);
      const lead = text(heading.querySelector("p"));
      assert.ok(heading.querySelector("p").classList.contains("text-slate-600"), "Text on the tinted band needs stronger contrast");
      assert.ok(lead.length < 100, "Move the long selection instructions away from the first heading");
      assert.ok(!heading.textContent.includes(accessoryCopy[locale].overviewLead));
      assert.ok(heading.querySelector("[data-brand-rule]"));
      assert.equal(typeof overview.getAccessoryCategoryDisplay, "function");
      const cards = [...document.querySelector("[data-accessory-categories]").children];
      cards.forEach((card, index) => {
        const display = overview.getAccessoryCategoryDisplay(accessoryCategories[index], locale);
        assert.equal(text(card.querySelector("h2")), display.title);
        assert.equal(text(card.querySelector("p")), display.summary);
        assert.ok(display.title.length <= 30 && display.summary.length <= 75);
        for (const row of card.querySelectorAll("h2, p, [data-accessory-card-action]")) assert.ok(row.classList.contains("px-6"));
        assert.ok(card.classList.contains("grid-rows-subgrid"));
        assert.ok(card.classList.contains("row-span-4"));
        assert.ok(card.classList.contains("mb-8") && !card.classList.contains("h-full"));
      });
      const selection = document.getElementById("accessory-selection-notes");
      assert.ok(selection?.querySelector("p"));
      assert.ok(selection.querySelectorAll("li").length >= 6);
    });
  });

  test(`${locale}: all product cards lock square and landscape images outside normal layout flow`, () => {
    for (const product of accessoryProducts) {
      checkMarkup(AccessoryProductCard, { product, locale }, document => {
        const card = document.querySelector("a[data-accessory-product]");
        const frame = card.querySelector("[data-accessory-media]");
        assert.ok(frame, `Missing fixed media stage: ${product.slug}`);
        for (const name of ["relative", "aspect-[3/2]", "w-full"]) assert.ok(frame.classList.contains(name));
        const image = frame.querySelector("img");
        for (const name of ["absolute", "inset-0", "h-full", "w-full", "object-contain"]) assert.ok(image.classList.contains(name));
        assert.ok(card.classList.contains("grid-rows-subgrid") && card.classList.contains("row-span-6"));
        assert.ok(card.classList.contains("mb-8") && !card.classList.contains("h-full"));
        assert.equal(card.children.length, 4, "Media, heading, three-row specs and action must participate in shared tracks");
        const specs = card.querySelector("dl");
        assert.ok(specs.classList.contains("grid-rows-subgrid") && specs.classList.contains("row-span-3"));
        const rows = [...specs.children];
        assert.equal(rows.length, 3);
        rows.forEach((row, index) => {
          assert.equal(text(row.querySelector("dt")), product.specs[index].label[locale]);
          assert.equal(text(row.querySelector("dd")), product.specs[index].value[locale]);
        });
        assert.equal(text(card.querySelector("h3")), product.title[locale]);
        assert.equal(text(card.querySelector("[data-accessory-card-action]")), accessoryCopy[locale].viewAccessory);
        assert.doesNotMatch(card.outerHTML, /line-clamp|object-cover|hover:scale|hover:shadow/);
      });
    }
  });

  test(`${locale}: category headings and accessory detail heroes have restrained accessory-only surfaces`, () => {
    for (const category of accessoryCategories) {
      checkMarkup(AccessoryCategoryPage, { category, locale, products: accessoryProducts.filter(product => product.categorySlug === category.slug) }, document => {
        const heading = document.querySelector("h1").closest("section");
        assert.ok(heading.classList.contains("bg-[#eef2f6]"));
        assert.ok(heading.querySelector("p.text-slate-600"));
        assert.ok(heading.querySelector("[data-brand-rule]"));
        const image = heading.querySelector("img");
        assert.ok(image.parentElement.classList.contains("border"));
        const grid = document.querySelector("[data-accessory-products]");
        for (const name of ["gap-y-0", "md:grid-cols-2", "xl:grid-cols-3"]) assert.ok(grid.classList.contains(name));
      });
    }
    for (const product of accessoryProducts) {
      checkMarkup(AccessoryDetailPage, { category: getAccessoryCategory(product.categorySlug), product, locale }, document => {
        const hero = document.querySelector("[data-product-detail]");
        assert.ok(hero.classList.contains("bg-[#eef2f6]"));
        assert.ok(hero.classList.contains("[&_.text-muted]:text-slate-600"));
        const image = hero.querySelector("img");
        assert.ok(image.closest("[data-accessory-detail-image]")?.classList.contains("border"));
        for (const section of document.querySelectorAll('[id^="accessory-"]')) {
          assert.ok(section.classList.contains("[&>h2]:border-l-2"));
        }
        for (const card of document.querySelectorAll("[data-accessory-product]")) {
          for (const name of ["gap-y-0", "md:grid-cols-2", "xl:grid-cols-3"]) assert.ok(card.parentElement.classList.contains(name));
        }
      });
    }
  });
}

test("overview copy is presentation-only and falls back safely without changing raw catalog values", () => {
  assert.equal(typeof overview.getAccessoryCategoryDisplay, "function");
  const before = JSON.stringify(accessoryCategories);
  for (const locale of ["ru", "en"]) {
    for (const category of accessoryCategories) overview.getAccessoryCategoryDisplay(category, locale);
    const unknown = { slug: "unknown", title: { ru: "Тест", en: "Test" }, summary: { ru: "Описание", en: "Summary" } };
    assert.deepEqual(overview.getAccessoryCategoryDisplay(unknown, locale), { title: unknown.title[locale], summary: unknown.summary[locale] });
  }
  assert.equal(JSON.stringify(accessoryCategories), before);
});

test("instrument detail surfaces keep their existing white default", () => {
  assert.ok(products.length > 0);
  for (const locale of ["ru", "en"]) {
    checkMarkup(ProductPage, { locale, product: products[0] }, document => {
      assert.ok(document.querySelector("[data-product-detail]").classList.contains("bg-white"));
      assert.equal(document.querySelector("[data-accessory-detail-image]"), null);
    });
  }
});

test("homepage accessory media uses the same out-of-flow image positioning", () => {
  for (const locale of ["ru", "en"]) {
    checkMarkup(AccessoriesHomeSection, { locale }, document => {
      const frames = [...document.querySelectorAll(".home-accessory-image")];
      assert.equal(frames.length, 6);
      for (const frame of frames) {
        assert.ok(frame.classList.contains("relative"));
        assert.ok(frame.querySelector("img").classList.contains("absolute"));
      }
    });
  }
});
