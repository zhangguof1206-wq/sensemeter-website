import assert from "node:assert/strict";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const load = createComponentLoader();
const { accessoryProducts } = load("src/data/accessories/index.ts");
const { RfqForm } = load("src/components/rfq-form.tsx");

test("accessory details survive the RU and EN contact route into editable quotation text", async () => {
  for (const locale of ["ru", "en"]) {
    const { default: Page } = load(`src/app/${locale === "en" ? "en/" : ""}contact/page.tsx`);
    for (const product of accessoryProducts) {
      const accessory = `${product.model} ${product.title[locale]}`;
      const element = await Page({ searchParams: Promise.resolve({ accessory }) });
      const dom = new JSDOM(renderToStaticMarkup(element));
      const form = dom.window.document.querySelector('form[name="rfq-main"][action]');
      assert.ok(form);
      assert.equal(form.querySelector('select[name="Product Model"]').value, "Other");
      const message = form.querySelector('textarea[name="Message"]');
      assert.ok(message.value.includes(accessory), product.slug);
      assert.ok(!message.readOnly && !message.disabled);
      dom.window.close();
    }
  }
});

test("only known single accessory labels are accepted and normal instrument selection is unchanged", () => {
  const { getRfqAccessoryLabel } = load("src/lib/rfq-accessory.ts");
  const product = accessoryProducts[0];
  const label = `${product.model} ${product.title.en}`;
  assert.equal(getRfqAccessoryLabel(label, "en", accessoryProducts), label);
  for (const value of [undefined, "", "unknown", [label], "<script>bad</script>"]) assert.equal(getRfqAccessoryLabel(value, "en", accessoryProducts), undefined);
  const dom = new JSDOM(renderToStaticMarkup(React.createElement(RfqForm, { locale: "en", model: "MDM300 / MDM300 I.S." })));
  assert.equal(dom.window.document.querySelector('select[name="Product Model"]').value, "MDM300 / MDM300 I.S.");
  assert.equal(dom.window.document.querySelector('textarea[name="Message"]').value, "");
  dom.window.close();
});
