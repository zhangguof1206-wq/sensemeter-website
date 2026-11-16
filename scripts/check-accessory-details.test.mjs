import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";

const componentPath = "src/components/accessories/accessory-detail-page.tsx";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
let fixture;

async function getFixture() {
  fixture ??= import("./lib/component-test-loader.mjs").then(({ createComponentLoader }) => {
    const load = createComponentLoader();
    return {
      ...load("src/data/accessories/index.ts"),
      ...load("src/data/accessories/copy.ts"),
      ...load("src/data/accessory-images.ts"),
      ...load("src/lib/i18n.ts"),
      ...load("src/lib/seo.ts"),
      ...load(componentPath)
    };
  });
  return fixture;
}

async function forEveryDetail(check) {
  const data = await getFixture();
  assert.ok(data.accessoryProducts.length > 0, "The live accessory catalog must not be empty");
  for (const locale of ["ru", "en"]) {
    for (const product of data.accessoryProducts) {
      const category = data.getAccessoryCategory(product.categorySlug);
      assert.ok(category, `Missing category for ${product.slug}`);
      const element = data.AccessoryDetailPage({ category, product, locale });
      const dom = new JSDOM(renderToStaticMarkup(element));
      try {
        check({ ...data, document: dom.window.document, element, category, product, locale });
      } catch (error) {
        error.message = `${locale}/${category.slug}/${product.slug}: ${error.message}`;
        throw error;
      } finally {
        dom.window.close();
      }
    }
  }
}

const text = node => node?.textContent.trim();
const items = section => [...section.querySelectorAll("li")].map(text);
const requiredSection = (document, id) => {
  const section = document.getElementById(`accessory-${id}`);
  assert.ok(section, `Missing ${id} section`);
  return section;
};

test("accessory details delegate presentation to the shared professional layout", () => {
  const source = read(componentPath);
  for (const component of ["DetailHero", "DetailNavigation", "DetailSection", "DetailSpecTable", "DetailList", "ProductVisual"]) {
    assert.match(source, new RegExp(`<${component}\\b`), `Missing shared ${component}`);
  }
  assert.doesNotMatch(source, /AccessoryPageHeading|AccessorySpecTable|function DetailList/);
  assert.match(source, /background="bg-white"/);
});

test("every live accessory retains its exact localized identity, overview and complete specification table", async () => {
  await forEveryDetail(({ document, product, locale, getAccessoryProductImage }) => {
    const headings = document.querySelectorAll("h1");
    assert.equal(headings.length, 1);
    assert.equal(text(headings[0]), product.model);
    assert.ok(document.body.textContent.includes(product.title[locale]));
    assert.equal(text(requiredSection(document, "overview").querySelector("p")), product.summary[locale]);
    const table = requiredSection(document, "specifications").querySelector("table");
    assert.ok(table, "Specifications must use the shared semantic table");
    assert.equal(table.querySelectorAll('thead th[scope="col"]').length, 2);
    const rows = [...table.querySelectorAll("tbody tr")].map(row => {
      const label = row.querySelector('th[scope="row"]');
      const value = row.querySelector("td");
      assert.ok(label && value, "Every original specification needs a row label and value");
      return { label: text(label), value: text(value) };
    });
    assert.deepEqual(rows, product.specs.map(spec => ({ label: spec.label[locale], value: spec.value[locale] })));
    const hero = headings[0].closest("section");
    assert.ok(hero);
    assert.ok(hero.textContent.includes(product.summary[locale]));
    assert.ok(hero.textContent.includes(product.title[locale]));
    const facts = [...hero.querySelectorAll("dl > div")].map(fact => ({ label: text(fact.querySelector("dt")), value: text(fact.querySelector("dd")) }));
    assert.deepEqual(facts, product.specs.slice(0, 2).map(spec => ({ label: spec.label[locale], value: spec.value[locale] })));
    const image = [...hero.querySelectorAll("img")].find(image => image.getAttribute("src") === getAccessoryProductImage(product.image));
    assert.ok(image, "The hero must use the presentation image matched to the original source");
    assert.equal(image.getAttribute("alt"), product.title[locale]);
    assert.equal(hero.querySelectorAll("img").length, 1, "Do not duplicate the single accessory image");
    assert.equal(hero.querySelectorAll("figcaption").length, 0);
  });
});

test("selection, compatibility, customization and applications preserve the live accessory data", async () => {
  await forEveryDetail(({ document, product, locale, accessoryCopy }) => {
    const selection = requiredSection(document, "selection");
    assert.deepEqual(items(selection), product.selection[locale]);
    assert.equal(text(selection.querySelector("p")), accessoryCopy[locale].imageDisclaimer);
    assert.deepEqual(items(requiredSection(document, "applications")), product.applications[locale]);
    assert.deepEqual(items(requiredSection(document, "compatibility")), product.compatibleWith[locale]);
    assert.equal(text(requiredSection(document, "customization").querySelector("p")), product.customization[locale]);
    const disclaimerParagraphs = [...document.querySelectorAll("p")].filter(paragraph => text(paragraph) === accessoryCopy[locale].imageDisclaimer);
    assert.equal(disclaimerParagraphs.length, 1);
    assert.ok(selection.contains(disclaimerParagraphs[0]), "Supply confirmation belongs only in selection, not under the image");
  });
});

test("the shared page navigation targets only real unframed content sections after the hero", async () => {
  await forEveryDetail(({ document }) => {
    const hero = document.querySelector("h1").closest("section");
    const article = document.querySelector("article");
    const aside = document.querySelector("aside");
    assert.ok(article && aside);
    assert.equal(article.parentElement, aside.parentElement, "Main content and the selection aside must share the body grid");
    for (const id of ["overview", "specifications", "applications"]) assert.ok(article.contains(requiredSection(document, id)));
    for (const id of ["selection", "customization", "compatibility"]) assert.ok(aside.contains(requiredSection(document, id)));
    assert.equal(document.querySelectorAll("article .card, aside.card, aside .card").length, 0);
    assert.equal(hero.querySelectorAll(".card").length, 0);
    const anchors = [...document.querySelectorAll('nav a[href^="#accessory-"]')];
    assert.equal(anchors.length, 6);
    const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
    assert.equal(new Set(ids).size, ids.length, "Section IDs must be unique");
    for (const anchor of anchors) {
      const id = anchor.getAttribute("href").slice(1);
      const section = document.getElementById(id);
      assert.ok(section, `Broken navigation target: ${id}`);
      assert.ok(anchor.closest("nav").getAttribute("aria-label"));
      assert.ok(hero.compareDocumentPosition(anchor) & 4, "Navigation must follow the hero");
      assert.ok(anchor.compareDocumentPosition(section) & 4, "Navigation must precede its content");
    }
  });
});

test("optional empty accessory sections never create dead navigation targets or related bands", async () => {
  const data = await getFixture();
  for (const locale of ["ru", "en"]) {
    const product = {
      ...data.accessoryProducts[0],
      applications: { ru: [], en: [] },
      compatibleWith: { ru: [], en: [] },
      customization: { ru: "", en: "" },
      relatedSlugs: []
    };
    const category = data.getAccessoryCategory(product.categorySlug);
    const dom = new JSDOM(renderToStaticMarkup(React.createElement(data.AccessoryDetailPage, { category, product, locale })));
    try {
      const { document } = dom.window;
      for (const id of ["applications", "compatibility", "customization"]) {
        assert.equal(document.getElementById(`accessory-${id}`), null);
        assert.equal(document.querySelector(`a[href="#accessory-${id}"]`), null);
      }
      assert.equal(document.querySelectorAll('nav a[href^="#accessory-"]').length, 3);
      assert.ok(![...document.querySelectorAll("h2")].some(heading => text(heading) === data.accessoryCopy[locale].relatedTitle));
    } finally {
      dom.window.close();
    }
  }
});

test("localized RFQ, category destinations, language path and breadcrumb SEO remain unchanged", async () => {
  await forEveryDetail(({ document, element, category, product, locale, localizedPath, oppositeLocale, accessoryBreadcrumbJsonLd, accessoryCopy }) => {
    const path = `/accessories/${category.slug}/${product.slug}`;
    const rfqHref = `${localizedPath(locale, "/contact")}?accessory=${encodeURIComponent(`${product.model} ${product.title[locale]}`)}`;
    const content = document.querySelector("main");
    assert.ok(content);
    const hero = document.querySelector("h1").closest("section");
    const quote = [...hero.querySelectorAll("a")].find(anchor => anchor.getAttribute("href") === rfqHref);
    assert.ok(quote, "The original accessory RFQ must remain in the hero");
    assert.equal(text(quote), accessoryCopy[locale].requestAccessory);
    for (const anchor of content.querySelectorAll('a[href*="/contact"]')) assert.equal(anchor.getAttribute("href"), rfqHref);
    assert.ok([...hero.querySelectorAll("a")].some(anchor => anchor.getAttribute("href") === localizedPath(locale, `/accessories/${category.slug}`) && text(anchor) === accessoryCopy[locale].backCategory));
    assert.equal(element.props.locale, locale);
    assert.equal(element.props.active, "catalog");
    assert.equal(element.props.languagePath, localizedPath(oppositeLocale(locale), path));
    const switchLink = [...document.querySelectorAll("header a")].find(anchor => text(anchor) === oppositeLocale(locale).toUpperCase());
    assert.equal(switchLink?.getAttribute("href"), localizedPath(oppositeLocale(locale), path));
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    assert.equal(scripts.length, 1);
    assert.deepEqual(JSON.parse(scripts[0].textContent), accessoryBreadcrumbJsonLd(locale, category, product));
    assert.equal(content.querySelectorAll('a[href*=".pdf"], a[download], form').length, 0, "Do not invent accessory PDFs or checkout");
    assert.doesNotMatch(document.body.textContent, /Add to Cart|Buy Now|В корзину|AI-assisted illustrations|Иллюстрации подготовлены с помощью ИИ/);
  });
});

test("related accessory cards and service information remain intact in both locales", async () => {
  await forEveryDetail(({ document, category, product, locale, getAccessoryProduct, getAccessoryProductImage, localizedPath, accessoryCopy }) => {
    const related = product.relatedSlugs.map(slug => getAccessoryProduct(category.slug, slug)).filter(Boolean).slice(0, 3);
    const relatedHeading = [...document.querySelectorAll("h2")].find(heading => text(heading) === accessoryCopy[locale].relatedTitle);
    assert.equal(Boolean(relatedHeading), related.length > 0);
    if (relatedHeading) {
      const cards = [...relatedHeading.closest("section").querySelectorAll("a[data-accessory-product]")];
      assert.equal(cards.length, related.length);
      cards.forEach((card, index) => {
        const item = related[index];
        assert.equal(card.getAttribute("href"), localizedPath(locale, `/accessories/${category.slug}/${item.slug}`));
        assert.equal(text(card.querySelector("h3")), item.title[locale]);
        assert.equal(card.querySelector("img").getAttribute("src"), getAccessoryProductImage(item.image));
        assert.ok(card.textContent.includes(item.model));
        for (const spec of item.specs.slice(0, 3)) {
          assert.ok(card.textContent.includes(spec.label[locale]));
          assert.ok(card.textContent.includes(spec.value[locale]));
        }
      });
    }
    const serviceHeading = [...document.querySelectorAll("h2")].find(heading => text(heading) === accessoryCopy[locale].serviceTitle);
    assert.ok(serviceHeading);
    assert.equal(text(serviceHeading.parentElement.querySelector("p")), accessoryCopy[locale].serviceText);
  });
});
