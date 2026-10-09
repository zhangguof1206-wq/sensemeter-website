import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { setTimeout as sleep } from "node:timers/promises";
import { compressedAirDewPoint } from "../../src/data/applications/compressed-air-dew-point.ts";

// Remote CI was authorized; never use this entry point to bypass local browser restrictions.
if (process.env.GITHUB_ACTIONS !== "true") throw new Error("Run browser verification in the authorized GitHub workflow.");
const base = new URL(process.env.SEO_PREFILL_BASE_URL || "http://127.0.0.1:3220");
assert.equal(base.protocol, "http:");
assert.equal(base.hostname, "127.0.0.1");
assert.ok(base.port && !base.username && !base.password && base.pathname === "/" && !base.search && !base.hash);
const output = "artifacts/seo-tools/local/rfq-prefill";
await mkdir(output, { recursive: true });
let occupied = false;
try { await fetch(base, { signal: AbortSignal.timeout(1000) }); occupied = true; } catch { /* No existing server. */ }
if (occupied) throw new Error("Refusing to reuse an occupied verification port.");
const require = createRequire(new URL("../../tools/seo/package.json", import.meta.url));
const puppeteer = require("puppeteer-core");
const executablePath = process.env.CHROME_PATH || ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"].find(existsSync);
if (!executablePath) throw new Error("No installed CI browser found.");
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "-p", base.port], { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
let logs = "";
server.stdout.on("data", (data) => { logs = (logs + data).slice(-12000); });
server.stderr.on("data", (data) => { logs = (logs + data).slice(-12000); });
server.on("error", (error) => { logs += error.message; });
let browser;
const results = [];
let failure;
try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error("Verification server exited before readiness.");
    try {
      if ((await fetch(new URL("/contact", base), { signal: AbortSignal.timeout(2000) })).ok) { ready = true; break; }
    } catch { /* Wait for this owned process, not an unrelated server. */ }
    await sleep(500);
  }
  assert.ok(ready, "Verification server did not become ready.");
  browser = await puppeteer.launch({ executablePath, headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  for (const viewport of [{ name: "desktop", width: 1440, height: 1000 }, { name: "mobile", width: 390, height: 844 }]) {
    for (const locale of ["ru", "en"]) {
      const page = await browser.newPage();
      await page.setViewport(viewport);
      const sent = [];
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const url = new URL(request.url());
        // Mock both POSTs so no inquiry, archive or third-party analytics leaves the test.
        if (url.origin !== base.origin) return void request.abort();
        if (request.method() === "POST") {
          if (!["/api/rfq-email", "/__forms.html"].includes(url.pathname)) return void request.abort();
          if (url.pathname === "/api/rfq-email") sent.push(Object.fromEntries(new URLSearchParams(request.postData())));
          return void request.respond({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
        }
        void request.continue();
      });
      const contact = `${locale === "en" ? "/en" : ""}/contact`;
      const model = "MDM300 / MDM300 I.S.";
      const params = new URLSearchParams({ application: compressedAirDewPoint.slug, model });
      await page.goto(new URL(`${contact}?${params}`, base).href, { waitUntil: "networkidle0" });
      assert.equal(await page.$eval("#application", (el) => el.value), compressedAirDewPoint.content[locale].title);
      assert.equal(await page.$eval("#productModel", (el) => el.value), model);
      assert.ok(await page.$eval("#application", (el) => !el.readOnly && !el.disabled));
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "Contact page overflows viewport.");
      await page.screenshot({ path: `${output}/${locale}-${viewport.name}.png`, fullPage: true });
      const edited = `${locale}-${viewport.name} customer application`;
      await page.click("#application", { clickCount: 3 });
      await page.keyboard.press("Backspace");
      await page.type("#application", edited);
      await page.type("#email", "customer@example.invalid");
      await page.click('input[name="Personal Data Consent"]');
      await Promise.all([page.waitForNavigation({ waitUntil: "domcontentloaded" }), page.click('main form[name="rfq-main"] button[type="submit"]')]);
      assert.equal(sent.length, 1);
      assert.equal(sent[0].Application, edited);
      assert.equal(sent[0]["Product Model"], model);
      assert.equal(new URL(page.url()).pathname, `${locale === "en" ? "/en" : ""}/thank-you`);
      for (const query of ["", "?application=unknown", "?application=compressed-air-dew-point&application=climate-chamber-humidity"]) {
        await page.goto(new URL(`${contact}${query}`, base).href, { waitUntil: "networkidle0" });
        assert.equal(await page.$eval("#application", (el) => el.value), "");
      }
      if (locale === "ru") {
        await page.goto(new URL(compressedAirDewPoint.path, base).href, { waitUntil: "networkidle0" });
        const text = await page.$eval("main", (el) => el.textContent);
        for (const faq of compressedAirDewPoint.content.ru.faqs) {
          assert.ok(text.includes(faq.question) && text.includes(faq.answer), "Missing visible RU FAQ content.");
        }
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), "RU application overflows viewport.");
        await page.screenshot({ path: `${output}/ru-dew-point-${viewport.name}.png`, fullPage: true });
      }
      results.push({ locale, viewport: viewport.name, prefill: true, editable: true, modelPreserved: true, mockedSubmit: true, invalidFallbacks: 3 });
      await page.close();
    }
  }
} catch (error) {
  failure = error.message;
  process.exitCode = 1;
  console.error(error);
} finally {
  await browser?.close();
  if (server.exitCode === null) {
    server.kill("SIGTERM");
    await Promise.race([once(server, "exit"), sleep(5000)]);
  }
  await writeFile(`${output}/server.log`, logs);
  await writeFile(`${output}/result.json`, JSON.stringify({ checkedAt: new Date().toISOString(), passed: !failure && results.length === 4, scope: "isolated build; all form POSTs mocked; no real email sent", results, ...(failure ? { failure } : {}) }, null, 2));
}
if (!failure) console.log("RU/EN desktop/mobile prefill, edits, model and mocked submission verified.");
