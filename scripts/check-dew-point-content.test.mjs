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

test("URL, recommended models, titles and the complete English copy remain unchanged", () => {
  assert.equal(page.slug, "compressed-air-dew-point");
  assert.equal(page.path, "/applications/compressed-air-dew-point");
  assert.deepEqual(page.recommendedSlugs, ["easidew-34-m12", "easidew-online", "sf82-online", "dmt143-dmt143l", "mdm300"]);
  assert.equal(page.content.ru.metaTitle, "Промышленный измеритель и преобразователь точки росы");
  assert.equal(createHash("sha256").update(JSON.stringify(page.content.en)).digest("hex"), "b65e2fc320482d7579afd4e0d6969d1d042e7c4046f6b905d108e7b48e48572b");
});
