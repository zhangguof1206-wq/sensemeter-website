import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const componentPath = "src/components/accessories/accessories-home-section.tsx";
const load = createComponentLoader();
const { AccessoriesHomeSection } = load(componentPath);
const { homeAccessoryCategories } = load("src/data/home-accessories.ts");
const { getAccessoryCategory } = load("src/data/accessories/index.ts");
const { accessoryCopy } = load("src/data/accessories/copy.ts");
const { localizedPath } = load("src/lib/i18n.ts");
const { HomePage } = load("src/components/site.tsx");
const expectedCategories = [
  ["custom-sintered-filter-elements", "custom-sintered", "Фильтроэлементы под заказ", "Custom filter elements"],
  ["sintered-microporous-accessories", "microporous-metal", "Микропористые элементы", "Microporous metal parts"],
  ["sintered-filter-cups", "filter-cups", "Фильтрующие стаканы", "Sintered filter cups"],
  ["gas-diffusers", "gas-diffusers", "Газовые диффузоры", "Gas diffusers"],
  ["sensor-protection", "probe-protection", "Защита зондов", "Probe protection"],
  ["flow-control-accessories", "flow-restrictors", "Ограничители расхода", "Flow restrictors"]
];
const imagePath = name => `/assets/home-accessories/${name}-v1.webp`;

function withHomepage(locale, check) {
  const dom = new JSDOM(renderToStaticMarkup(React.createElement(AccessoriesHomeSection, { locale })));
  try {
    check(dom.window.document);
  } finally {
    dom.window.close();
  }
}

test("homepage data contains only six validated category identities, short titles and dedicated images", () => {
  assert.ok(Array.isArray(homeAccessoryCategories), "Export homeAccessoryCategories instead of product references");
  assert.equal(homeAccessoryCategories.length, 6);
  assert.equal(new Set(homeAccessoryCategories.map(category => category.slug)).size, 6);
  assert.equal(new Set(homeAccessoryCategories.map(category => category.image)).size, 6);
  homeAccessoryCategories.forEach((category, index) => {
    const [slug, image, ru, en] = expectedCategories[index];
    assert.deepEqual(Object.keys(category).sort(), ["image", "slug", "title"]);
    assert.ok(getAccessoryCategory(category.slug), `Missing existing category: ${category.slug}`);
    assert.equal(category.slug, slug);
    assert.equal(category.image, imagePath(image));
    assert.deepEqual(category.title, { ru, en });
    for (const title of Object.values(category.title)) {
      assert.ok(title.length <= 32, `Category title is too long: ${title}`);
      assert.doesNotMatch(title, /SM-|G1\/4|316L|\d/);
    }
  });
});

for (const locale of ["ru", "en"]) {
  test(`${locale}: the composed homepage includes exactly one six-category showcase`, () => {
    const dom = new JSDOM(renderToStaticMarkup(React.createElement(HomePage, { locale })));
    try {
      const document = dom.window.document;
      assert.equal(document.querySelectorAll(".home-accessory-matrix").length, 1);
      const entries = [...document.querySelectorAll(".home-accessory-matrix > a")];
      assert.deepEqual(entries.map(entry => entry.getAttribute("href")),
        expectedCategories.map(([slug]) => localizedPath(locale, `/accessories/${slug}`)));
      assert.equal(entries.filter(entry => entry.querySelector("img")).length, 6);
    } finally {
      dom.window.close();
    }
  });

  test(`${locale}: six entries link to existing categories, not individual products`, () => {
    withHomepage(locale, document => {
      const entries = [...document.querySelectorAll("a.home-accessory-entry")];
      assert.equal(entries.length, 6);
      assert.equal(document.querySelectorAll("a").length, 7);
      assert.equal(new Set(entries.map(entry => entry.getAttribute("href"))).size, 6);
      entries.forEach((entry, index) => {
        const [slug, , ru, en] = expectedCategories[index];
        assert.equal(entry.getAttribute("href"), localizedPath(locale, `/accessories/${slug}`));
        assert.equal(entry.querySelector("h3")?.textContent, locale === "ru" ? ru : en);
        assert.equal(entry.querySelector("img")?.getAttribute("alt"), locale === "ru" ? ru : en);
        assert.equal(entry.querySelectorAll("a, button, table").length, 0);
      });
    });
  });

  test(`${locale}: heading, introduction and existing red overview CTA precede the entire grid`, () => {
    withHomepage(locale, document => {
      const matrix = document.querySelector(".home-accessory-matrix");
      const heading = document.querySelector("h2");
      const intro = [...document.querySelectorAll("p")].find(node => node.textContent === accessoryCopy[locale].homeLead);
      const overview = document.querySelector("a.btn-primary");
      assert.ok(matrix && heading && intro && overview);
      assert.equal(heading.textContent, accessoryCopy[locale].homeTitle);
      assert.equal(overview.getAttribute("href"), localizedPath(locale, "/accessories"));
      assert.ok(overview.textContent.includes(accessoryCopy[locale].overviewTitle));
      assert.ok(overview.classList.contains("btn"));
      for (const node of [heading, intro, overview]) {
        assert.ok(node.compareDocumentPosition(matrix) & 4, "Intro and CTA must appear before the grid");
        assert.ok(!matrix.contains(node));
      }
      assert.equal(heading.closest("[data-home-reveal]")?.parentElement, matrix.parentElement);
      for (const node of document.querySelectorAll("[class]")) {
        assert.doesNotMatch(node.className, /sticky|360px|grid-cols-\[/);
      }
    });
  });

  test(`${locale}: photos reserve 3:2 space with explicit Next image dimensions and no cropping or blending`, () => {
    withHomepage(locale, document => {
      const frames = [...document.querySelectorAll(".home-accessory-image")];
      assert.equal(frames.length, 6);
      frames.forEach((frame, index) => {
        assert.ok(frame.classList.contains("aspect-[3/2]"));
        const image = frame.querySelector("img");
        assert.ok(image);
        assert.equal(image.getAttribute("src"), imagePath(expectedCategories[index][1]));
        assert.equal(image.getAttribute("width"), "1536");
        assert.equal(image.getAttribute("height"), "1024");
        assert.ok(image.classList.contains("object-contain"));
        assert.ok(image.classList.contains("w-full"));
        assert.ok(image.classList.contains("h-full"));
        assert.match(image.getAttribute("sizes") ?? "", /640px/);
        assert.match(image.getAttribute("sizes") ?? "", /1024px/);
        assert.match(image.getAttribute("sizes") ?? "", /(?:3[0-9](?:\.\d+)?vw|3[0-9]{2}px)/);
        assert.doesNotMatch(`${frame.className} ${image.className}`, /object-cover|mix-blend|overflow-hidden|scale|h-40|max-h-/);
      });
    });
  });

  test(`${locale}: open responsive entries retain reveal and keyboard-focus hooks`, () => {
    withHomepage(locale, document => {
      const matrix = document.querySelector(".home-accessory-matrix");
      assert.ok(matrix);
      for (const className of ["grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3"]) {
        assert.ok(matrix.classList.contains(className), `Missing responsive grid: ${className}`);
      }
      const entries = [...matrix.children];
      assert.equal(entries.length, 6);
      entries.forEach((entry, index) => {
        assert.equal(entry.tagName, "A");
        assert.ok(entry.hasAttribute("data-home-reveal"));
        assert.ok(entry.classList.contains(`home-reveal-delay-${index % 3}`));
        assert.ok(entry.querySelector(".home-accessory-copy"));
        assert.notEqual(entry.getAttribute("tabindex"), "-1");
      });
      for (const node of [matrix, ...matrix.querySelectorAll("[class]")]) {
        assert.doesNotMatch(node.className, /(?:^|\s)(?:\S*:)?(?:card|rounded\S*|shadow\S*|drop-shadow\S*|hover:scale\S*)(?:\s|$)/);
      }
    });
  });
}

test("homepage uses next/image without inline styles, metadata or new interactions", () => {
  const source = readFileSync(new URL(`../${componentPath}`, import.meta.url), "utf8");
  assert.match(source, /import Image from "next\/image"/);
  assert.match(source, /<Image\b/);
  assert.doesNotMatch(source, /<img\b|<style\b|<script\b|metadata|generateMetadata|onClick|fetch\(/);
});

test("all six dedicated homepage assets exist and the previous probe image remains available", () => {
  const missing = expectedCategories.map(([, image]) => imagePath(image))
    .filter(image => !existsSync(new URL(`../public${image}`, import.meta.url)));
  assert.deepEqual(missing, [], "Parent-generated homepage images must be present before integration");
  assert.ok(existsSync(new URL("../public/assets/accessories/sensor-g14-home.webp", import.meta.url)));
});
