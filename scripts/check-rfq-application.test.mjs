import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import { compressedAirDewPoint } from "../src/data/applications/compressed-air-dew-point.ts";
import { climateChamberHumidity } from "../src/data/applications/climate-chamber-humidity.ts";
import { industrialHumidityMonitoring } from "../src/data/applications/industrial-humidity-monitoring.ts";
import { naturalGasMoistureMonitoring } from "../src/data/applications/natural-gas-moisture-monitoring.ts";
import { gloveBoxOxygenAnalysis } from "../src/data/applications/glove-box-oxygen-analysis.ts";
import { readRfqFields } from "../src/lib/rfq-email.ts";

const pages = [compressedAirDewPoint, climateChamberHumidity, industrialHumidityMonitoring, naturalGasMoistureMonitoring, gloveBoxOxygenAnalysis];
const require = createRequire(import.meta.url);
const { outputText } = ts.transpileModule(readFileSync(new URL("../src/components/rfq-form.tsx", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
});
const module = { exports: {} };
// Render the real form; only adapt Next's link and TS path aliases for Node.
const formRequire = (id) => {
  if (id === "@/data/catalog") return require("../src/data/catalog.ts");
  if (id === "@/lib/i18n") return require("../src/lib/i18n.ts");
  if (id === "next/link") return ({ children, ...props }) => React.createElement("a", props, children);
  return require(id);
};
new Function("require", "module", "exports", outputText)(formRequire, module, module.exports);
const { RfqForm } = module.exports;

test("real RU and EN forms prefill an editable Application field", () => {
  for (const locale of ["ru", "en"]) {
    const application = compressedAirDewPoint.content[locale].title;
    const html = renderToStaticMarkup(React.createElement(RfqForm, { locale, application }));
    const input = html.match(/<input\b[^>]*name="Application"[^>]*>/)?.[0];
    assert.ok(input);
    assert.ok(input.includes(`value="${application}"`), `Missing ${locale} application default`);
    assert.doesNotMatch(input, /readonly|disabled/i);
  }
});

test("normal contact form remains blank and model preselection survives", () => {
  const model = "MDM300 / MDM300 I.S.";
  const html = renderToStaticMarkup(React.createElement(RfqForm, { locale: "en", model }));
  const input = html.match(/<input\b[^>]*name="Application"[^>]*>/)?.[0];
  assert.ok(input);
  assert.doesNotMatch(input, /value="[^"]+"/);
  assert.ok(html.includes(`value="${model}" selected=""`));
});

test("only known single application slugs resolve to existing localized titles", async () => {
  const { getRfqApplicationTitle } = await import("../src/lib/rfq-application.ts");
  for (const page of pages) {
    for (const locale of ["ru", "en"]) {
      assert.equal(getRfqApplicationTitle(page.slug, locale, pages), page.content[locale].title);
    }
  }
  for (const value of [undefined, "", "unknown", "<script>alert(1)</script>", " compressed-air-dew-point ", [compressedAirDewPoint.slug], [compressedAirDewPoint.slug, climateChamberHumidity.slug]]) {
    assert.equal(getRfqApplicationTitle(value, "en", pages), undefined);
  }
});

test("the existing email reader keeps customer edits to Application", () => {
  const fields = readRfqFields(new URLSearchParams({
    Email: "customer@example.invalid", Application: "My dryer installation", Message: "Please quote",
  }).toString());
  assert.equal(fields.Application, "My dryer installation");
  assert.equal(fields.Message, "Please quote");
});
