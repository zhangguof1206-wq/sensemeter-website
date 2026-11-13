import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import React, { act } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { JSDOM } from "jsdom";
import { createComponentLoader } from "./lib/component-test-loader.mjs";

const load = createComponentLoader();
const { PageShell } = load("src/components/site.tsx");
const expected = ["https://vk.ru/sensemeter_instruments", "https://t.me/Sensemeter", "mailto:sales@sensemeter.ru"];

test("both shared footers expose only the three approved icon contacts and no floating chat", () => {
  for (const locale of ["ru", "en"]) {
    const dom = new JSDOM(renderToStaticMarkup(React.createElement(PageShell, { locale, active: "home" }, "Content")));
    try {
      const document = dom.window.document;
      const contacts = document.querySelector("footer [data-footer-contacts]");
      assert.ok(contacts, `Missing ${locale} footer contacts`);
      const anchors = [...contacts.querySelectorAll("a")];
      assert.deepEqual(anchors.map(anchor => anchor.getAttribute("href")), expected);
      for (const anchor of anchors) {
        assert.ok(anchor.getAttribute("aria-label"));
        assert.ok(anchor.querySelector("svg, img"), "Each contact needs an icon");
        assert.ok(anchor.classList.contains("h-11") && anchor.classList.contains("w-11"));
        assert.ok(anchor.className.includes("focus-visible:"));
        assert.ok(!anchor.querySelector('[role="tooltip"]'), "Do not display contact tooltips");
        assert.ok(!anchor.hasAttribute("title"), "Do not add a native hover tooltip");
        assert.equal(anchor.textContent, "", "Contact controls display icons only");
      }
      for (const anchor of anchors.slice(0, 2)) {
        assert.equal(anchor.target, "_blank");
        assert.ok(anchor.rel.split(" ").includes("noopener") && anchor.rel.split(" ").includes("noreferrer"));
      }
      assert.ok(!anchors[2].target, "Email should open the configured mail application");
      assert.ok(!document.querySelector('footer a[href$="/contact"]'), "Remove the old footer RFQ link only");
      assert.ok(![...document.querySelectorAll("a")].some(anchor => anchor.className.includes("fixed") && anchor.href.includes("t.me")));
      assert.ok(!document.body.textContent.includes("Chat with us"));
      assert.equal(document.querySelectorAll('footer a[href*="privacy"]').length, 1);
      assert.equal(document.querySelectorAll('footer a[href*="personal-data-consent"]').length, 1);
      assert.equal(document.querySelectorAll('footer a[href*="cookie-policy"]').length, 1);
    } finally { dom.window.close(); }
  }
});

test("VK uses a local static brand asset with no embedded remote code", () => {
  const url = new URL("../public/assets/icons/vk.svg", import.meta.url);
  assert.ok(existsSync(url));
  const svg = readFileSync(url, "utf8");
  assert.match(svg, /viewBox="0 0 24 24"/);
  assert.match(svg, /<path\b/);
  assert.doesNotMatch(svg, /<script|<foreignObject|onload=|href=/i);
});

test("Telegram icon keeps the existing click goal without making external requests", async t => {
  const { FooterContactLinks } = load("src/components/footer-contact-links.tsx");
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { pretendToBeVisual: true });
  const previous = new Map();
  for (const [key, value] of Object.entries({ window: dom.window, document: dom.window.document, navigator: dom.window.navigator, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true })) {
    previous.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
  }
  const events = [];
  dom.window.ym = (...args) => events.push(args);
  const { createRoot } = await import("react-dom/client");
  const root = createRoot(dom.window.document.getElementById("root"));
  t.after(async () => {
    await act(async () => root.unmount());
    dom.window.close();
    for (const [key, descriptor] of previous) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  await act(async () => root.render(React.createElement(FooterContactLinks, { locale: "en" })));
  const telegram = dom.window.document.querySelector(`a[href="${expected[1]}"]`);
  telegram.addEventListener("click", event => event.preventDefault());
  await act(async () => telegram.click());
  assert.deepEqual(events, [[110136437, "reachGoal", "telegram_click", { location: "footer" }]]);
});
