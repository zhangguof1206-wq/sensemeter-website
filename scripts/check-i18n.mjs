import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { copy } = require("../src/lib/i18n.ts");
const { products } = require("../src/data/catalog.ts");

const checks = [
  {
    name: "core localized array copy has matching item counts",
    pass: () => {
      const keys = ["aboutBody", "privacyBody"];
      return keys.every((key) => Array.isArray(copy.ru[key]) && Array.isArray(copy.en[key]) && copy.ru[key].length === copy.en[key].length);
    }
  },
  {
    name: "Russian About copy matches the updated English company positioning",
    pass: () => {
      const text = copy.ru.aboutBody.join(" ");
      const required = [
        "ведущая компания",
        "высоконадежных измерительных приборов",
        "Dew Point Meters",
        "Temperature & Humidity Sensors",
        "Oxygen Analyzers",
        "соответствии экологическим требованиям",
        "стабильные, точные и надежные",
        "комплексной документации",
        "послепродажного обслуживания"
      ];
      return copy.ru.aboutBody.length === copy.en.aboutBody.length && required.every((phrase) => text.includes(phrase));
    }
  },
  {
    name: "English About copy remains English",
    pass: () => {
      const text = `${copy.en.aboutLead} ${copy.en.aboutBody.join(" ")}`;
      return text.includes("Sinoetm Tech. Ltd. is a premier company dedicated") &&
        text.includes("Sinoetm aims to be your trusted partner") &&
        !/[А-Яа-яЁё]/.test(text);
    }
  },
  {
    name: "product localized lists have matching item counts",
    pass: () => {
      const listKeys = ["params", "highlights", "applications"];
      return products.every((product) =>
        listKeys.every((key) => Array.isArray(product[key].ru) && Array.isArray(product[key].en) && product[key].ru.length === product[key].en.length)
      );
    }
  }
];

let failures = 0;
for (const check of checks) {
  if (check.pass()) {
    console.log(`OK ${check.name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${check.name}`);
  }
}

if (failures) {
  console.error(`i18n check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("i18n check passed.");
