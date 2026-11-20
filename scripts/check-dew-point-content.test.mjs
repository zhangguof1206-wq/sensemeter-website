import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { compressedAirDewPoint as page } from "../src/data/applications/compressed-air-dew-point.ts";

test("RU copy explains pressure and atmospheric dew point without treating readings as interchangeable", () => {
  const faq = page.content.ru.faqs.find((item) => item.question.includes("атмосферном давлении"));
  assert.ok(faq, "Missing pressure/atmospheric dew point explanation");
  assert.match(faq.answer, /нельзя напрямую сравнивать/);
  assert.match(faq.answer, /давление у сенсора/);
});

test("RU sampling advice requires stable readings and model-specific conditions", () => {
  const faq = page.content.ru.faqs.find((item) => item.question.includes("стабильность показаний"));
  assert.ok(faq, "Missing sampling and stabilization advice");
  assert.match(faq.answer, /герметичность/);
  assert.match(faq.answer, /руководством прибора/);
  assert.match(faq.answer, /дождитесь стабилизации/);
  assert.match(faq.answer, /зависят от модели/);
});

test("RFQ inputs distinguish line and sensor pressure and pressure basis in both languages", () => {
  const ru = page.content.ru.rfqPoints.join(" ");
  const en = page.content.en.rfqPoints.join(" ");
  assert.match(ru, /давление в линии и давление у датчика/);
  assert.match(ru, /избыточное или абсолютное/);
  assert.match(ru, /диапазон точки росы и давление, при котором он задан/);
  assert.match(en, /line pressure and pressure at the sensor/);
  assert.match(en, /gauge or absolute/);
  assert.match(en, /dew point range and the pressure to which it applies/);
});

test("URL, recommended models, titles and English sections outside the approved testing guidance remain unchanged", () => {
  assert.equal(page.slug, "compressed-air-dew-point");
  assert.equal(page.path, "/applications/compressed-air-dew-point");
  assert.deepEqual(page.recommendedSlugs, ["easidew-34-m12", "easidew-online", "sf82-online", "dmt143-dmt143l", "mdm300"]);
  assert.equal(page.content.ru.metaTitle, "Промышленный измеритель и преобразователь точки росы");
  const english = structuredClone(page.content.en);
  delete english.overviewText;
  delete english.faqs[0].answer;
  english.faqs = english.faqs.slice(0, 4);
  // Updated for the reviewed pressure checklist and quotation wording.
  assert.equal(createHash("sha256").update(JSON.stringify(english)).digest("hex"), "06fbdb90a08cbb7d8187846a3297939f32e7010f8084747a6499cfa4504600ca");
});
