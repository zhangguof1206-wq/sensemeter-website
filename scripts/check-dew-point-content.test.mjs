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

test("RFQ inputs distinguish line and sensor pressure and pressure basis", () => {
  const points = page.content.ru.rfqPoints.join(" ");
  assert.match(points, /давление линии и давление у сенсора/);
  assert.match(points, /избыточное или абсолютное/);
  assert.match(points, /давление, к которому относится/);
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
  assert.equal(createHash("sha256").update(JSON.stringify(english)).digest("hex"), "e75c225c2cc45d51fdfe37d5b96d4b57a205d8fa0957d0ca5f5b21d80febc32b");
});
