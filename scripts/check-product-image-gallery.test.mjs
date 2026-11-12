import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React, { act } from "react";
import ts from "typescript";
import { JSDOM } from "jsdom";

const require = createRequire(import.meta.url);
const path = "../src/components/products/product-image-gallery.tsx";

function loadGallery() {
  const url = new URL(path, import.meta.url);
  assert.ok(existsSync(url), "Missing the product image carousel component");
  const { outputText } = ts.transpileModule(readFileSync(url, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }
  });
  const module = { exports: {} };
  const galleryRequire = id => id === "next/image"
    ? ({ priority, fill, ...props }) => React.createElement("img", props)
    : require(id);
  new Function("require", "module", "exports", outputText)(galleryRequire, module, module.exports);
  return module.exports;
}

async function setup(t, { reducedMotion = false, count = 3 } = {}) {
  const { ProductImageGallery } = loadGallery();
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { pretendToBeVisual: true });
  const previous = new Map();
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const listeners = new Set();
  const media = { matches: reducedMotion, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  dom.window.matchMedia = () => media;
  let hidden = false;
  Object.defineProperty(dom.window.document, "hidden", { configurable: true, get: () => hidden });
  t.mock.timers.enable({ apis: ["setInterval"] });
  dom.window.setInterval = (...args) => globalThis.setInterval(...args);
  dom.window.clearInterval = id => globalThis.clearInterval(id);
  const { createRoot } = require("react-dom/client");
  const root = createRoot(dom.window.document.getElementById("root"));
  const slides = Array.from({ length: count }, (_, i) => ({ src: `/image-${i}.png`, alt: `Product ${i}`, width: 1536, height: 1024 }));
  await act(async () => root.render(React.createElement(ProductImageGallery, { slides, locale: "en" })));
  function hoverEvent(entered, pointerType) {
    const region = dom.window.document.querySelector('[aria-roledescription="carousel"]');
    const event = new dom.window.MouseEvent(entered ? "pointerover" : "pointerout", { bubbles: true, relatedTarget: dom.window.document.body });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    region.dispatchEvent(event);
    region.dispatchEvent(new dom.window.MouseEvent(entered ? "mouseover" : "mouseout", { bubbles: true, relatedTarget: dom.window.document.body }));
  }
  t.after(async () => {
    await act(async () => root.unmount());
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  return {
    document: dom.window.document,
    region: () => dom.window.document.querySelector('[aria-roledescription="carousel"]'),
    current: () => dom.window.document.querySelector('[role="group"][aria-hidden="false"] img')?.alt,
    tick: async ms => act(async () => t.mock.timers.tick(ms)),
    click: async label => act(async () => {
      const button = dom.window.document.querySelector(`button[aria-label="${label}"]`);
      assert.ok(button, label);
      button.click();
    }),
    hover: async entered => act(async () => hoverEvent(entered, "mouse")),
    touchHover: async () => act(async () => hoverEvent(true, "touch")),
    setHidden: async value => act(async () => { hidden = value; dom.window.document.dispatchEvent(new dom.window.Event("visibilitychange")); }),
    setReducedMotion: async value => act(async () => { media.matches = value; for (const listener of listeners) listener(); })
  };
}

test("the gallery advances every 3000 ms and loops back to the first image", async t => {
  const fixture = await setup(t);
  assert.equal(fixture.current(), "Product 0");
  await fixture.tick(2999);
  assert.equal(fixture.current(), "Product 0");
  await fixture.tick(1);
  assert.equal(fixture.current(), "Product 1");
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 2");
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 0");
});

test("pause and resume control automatic advancement", async t => {
  const fixture = await setup(t);
  await fixture.click("Pause slideshow");
  await fixture.tick(6000);
  assert.equal(fixture.current(), "Product 0");
  await fixture.click("Play slideshow");
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 1");
});

test("previous, next and thumbnails select an image and stop autoplay", async t => {
  const fixture = await setup(t);
  await fixture.click("Previous image");
  assert.equal(fixture.current(), "Product 2");
  await fixture.tick(6000);
  assert.equal(fixture.current(), "Product 2");
  await fixture.click("Next image");
  assert.equal(fixture.current(), "Product 0");
  await fixture.click("Show image 2: Product 1");
  assert.equal(fixture.current(), "Product 1");
  assert.equal(fixture.document.querySelector('button[aria-pressed="true"]')?.getAttribute("aria-label"), "Show image 2: Product 1");
});

test("hover and hidden pages suspend playback without accumulating elapsed slides", async t => {
  const fixture = await setup(t);
  await fixture.hover(true);
  await fixture.tick(9000);
  assert.equal(fixture.current(), "Product 0");
  await fixture.hover(false);
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 1");
  await fixture.setHidden(true);
  await fixture.tick(9000);
  assert.equal(fixture.current(), "Product 1");
  await fixture.setHidden(false);
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 2");
});

test("reduced motion disables autoplay while manual selection remains available", async t => {
  const fixture = await setup(t, { reducedMotion: true });
  await fixture.tick(6000);
  assert.equal(fixture.current(), "Product 0");
  await fixture.click("Next image");
  assert.equal(fixture.current(), "Product 1");
  await fixture.setReducedMotion(false);
  await fixture.click("Play slideshow");
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 2");
});

test("touch-generated compatibility mouse events do not prevent resuming autoplay", async t => {
  const fixture = await setup(t);
  await fixture.touchHover();
  await fixture.click("Next image");
  assert.equal(fixture.current(), "Product 1");
  await fixture.click("Play slideshow");
  await fixture.tick(3000);
  assert.equal(fixture.current(), "Product 2");
});

test("a single-image gallery does not start automatic playback", async t => {
  const fixture = await setup(t, { count: 1 });
  await fixture.tick(9000);
  assert.equal(fixture.current(), "Product 0");
  assert.equal(fixture.document.querySelectorAll("button").length, 0);
});

test("an empty gallery renders no controls or slide", async t => {
  const fixture = await setup(t, { count: 0 });
  await fixture.tick(9000);
  assert.equal(fixture.region(), null);
  assert.equal(fixture.current(), undefined);
  assert.equal(fixture.document.querySelectorAll("button").length, 0);
});

test("keyboard focus on a thumbnail stops automatic advancement", async t => {
  const fixture = await setup(t);
  await act(async () => fixture.document.querySelector('button[aria-pressed="true"]').focus());
  await fixture.tick(6000);
  assert.equal(fixture.current(), "Product 0");
});

test("three distinct local MDM300 images have matching dimensions and translated descriptions", () => {
  const url = new URL("../src/data/mdm300-gallery.ts", import.meta.url);
  assert.ok(existsSync(url), "Missing MDM300 gallery image data");
  const { getMdm300GallerySlides } = require("../src/data/mdm300-gallery.ts");
  for (const locale of ["ru", "en"]) {
    const slides = getMdm300GallerySlides(locale);
    assert.equal(slides.length, 3);
    assert.equal(new Set(slides.map(image => image.src)).size, 3);
    for (const slide of slides) {
      const buffer = readFileSync(new URL(`../public${slide.src}`, import.meta.url));
      assert.equal(buffer.readUInt32BE(16), slide.width);
      assert.equal(buffer.readUInt32BE(20), slide.height);
      assert.ok(slide.alt.length > 8);
    }
  }
});
