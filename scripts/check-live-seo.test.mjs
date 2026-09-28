import assert from "node:assert/strict";
import test from "node:test";

import {
  auditHtmlPage,
  formatMarkdownReport,
  runLiveSeoAudit
} from "./lib/live-seo-audit.mjs";

const baseUrl = "https://sensemeter.ru";

function validHtml(path, title = "SenseMeter industrial measurement solutions") {
  return `<!doctype html>
  <html lang="en">
    <head>
      <title>${title}</title>
      <meta name="description" content="Industrial measurement instruments for humidity, dew point and oxygen applications with model selection support.">
      <meta name="robots" content="index,follow">
      <link rel="canonical" href="${baseUrl}${path}">
      <link rel="alternate" hreflang="ru-RU" href="${baseUrl}/">
      <link rel="alternate" hreflang="en" href="${baseUrl}/en">
      <link rel="alternate" hreflang="x-default" href="${baseUrl}/">
    </head>
    <body><h1>${title}</h1></body>
  </html>`;
}

test("accepts an indexable localized page with canonical and hreflang", () => {
  const result = auditHtmlPage({
    baseUrl,
    path: "/en",
    status: 200,
    html: validHtml("/en")
  });

  assert.deepEqual(result.issues, []);
  assert.equal(result.signals.canonical, `${baseUrl}/en`);
  assert.equal(result.signals.h1Count, 1);
});

test("treats the homepage canonical with or without a trailing slash as equivalent", () => {
  const html = validHtml("/").replace(`${baseUrl}/\"`, `${baseUrl}\"`);
  const result = auditHtmlPage({ baseUrl, path: "/", status: 200, html });

  assert.equal(result.issues.some((entry) => entry.code === "CANONICAL_MISMATCH"), false);
});

test("reports noindex, canonical, hreflang and H1 failures", () => {
  const html = `<!doctype html><html><head>
    <title>Compressed air dew point meters</title>
    <meta name="description" content="Portable and online dew point meters for compressed air dryer testing and continuous monitoring.">
    <meta name="robots" content="noindex,nofollow">
    <link rel="canonical" href="${baseUrl}/wrong-page">
    <link rel="alternate" hreflang="en" href="${baseUrl}/en/wrong-page">
  </head><body><h1>One</h1><h1>Two</h1></body></html>`;

  const result = auditHtmlPage({
    baseUrl,
    path: "/en/applications/compressed-air-dew-point",
    status: 200,
    html
  });
  const codes = new Set(result.issues.map((issue) => issue.code));

  assert.equal(codes.has("NOINDEX"), true);
  assert.equal(codes.has("CANONICAL_MISMATCH"), true);
  assert.equal(codes.has("HREFLANG_MISSING"), true);
  assert.equal(codes.has("H1_COUNT"), true);
});

test("audits robots, sitemap and monitored pages through an injected fetch", async () => {
  const routes = ["/", "/en"];
  const responses = new Map([
    [`${baseUrl}/robots.txt`, "User-agent: *\nAllow: /\nSitemap: https://sensemeter.ru/sitemap.xml\n"],
    [`${baseUrl}/sitemap.xml`, "<urlset><url><loc>https://sensemeter.ru/</loc></url><url><loc>https://sensemeter.ru/en</loc></url></urlset>"],
    [`${baseUrl}/`, validHtml("/")],
    [`${baseUrl}/en`, validHtml("/en")]
  ]);
  const fetchImpl = async (url) => {
    const body = responses.get(String(url));
    return new Response(body || "Not found", { status: body ? 200 : 404 });
  };

  const report = await runLiveSeoAudit({ baseUrl, routes, fetchImpl });
  const markdown = formatMarkdownReport(report);

  assert.equal(report.passed, true);
  assert.equal(report.pages.length, 2);
  assert.match(markdown, /2 pages passed/);
  assert.match(markdown, /robots\.txt: pass/);
  assert.match(markdown, /sitemap\.xml: pass/);
});

test("retries transient failures and limits page request concurrency", async () => {
  const routes = ["/", "/en", "/catalog", "/en/catalog"];
  const attempts = new Map();
  let activeRequests = 0;
  let maximumActiveRequests = 0;
  const fetchImpl = async (url) => {
    const key = String(url);
    attempts.set(key, (attempts.get(key) || 0) + 1);
    activeRequests += 1;
    maximumActiveRequests = Math.max(maximumActiveRequests, activeRequests);
    await new Promise((resolve) => setTimeout(resolve, 5));
    activeRequests -= 1;

    if (key === `${baseUrl}/en` && attempts.get(key) <= 2) {
      throw new Error("temporary connection failure");
    }
    if (key.endsWith("/robots.txt")) {
      return new Response(`User-agent: *\nSitemap: ${baseUrl}/sitemap.xml\n`, { status: 200 });
    }
    if (key.endsWith("/sitemap.xml")) {
      const entries = routes.map((path) => `<url><loc>${new URL(path, `${baseUrl}/`)}</loc></url>`).join("");
      return new Response(`<urlset>${entries}</urlset>`, { status: 200 });
    }
    return new Response(validHtml(new URL(key).pathname), { status: 200 });
  };

  const report = await runLiveSeoAudit({
    baseUrl,
    routes,
    fetchImpl,
    concurrency: 2,
    retryDelayMs: 0
  });

  assert.equal(report.passed, true);
  assert.equal(attempts.get(`${baseUrl}/en`), 3);
  assert.equal(maximumActiveRequests <= 2, true);
});
