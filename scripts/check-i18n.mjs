import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const { copy } = require("../src/lib/i18n.ts");
const { products } = require("../src/data/catalog.ts");
const root = process.cwd();
const aboutContentPath = join(root, "src", "data", "about.ts");
const readOptional = (path) => {
  const fullPath = join(root, path);
  return existsSync(fullPath) ? readFileSync(fullPath, "utf8") : "";
};

const checks = [
  {
    name: "About editorial content is complete and aligned across locales",
    pass: () => {
      if (!existsSync(aboutContentPath)) return false;
      const { aboutContent } = require("../src/data/about.ts");
      const ru = aboutContent.ru;
      const en = aboutContent.en;
      const enText = JSON.stringify(en);
      const ruText = JSON.stringify(ru);
      const enCriteria = ["medium", "range", "installation", "output", "operating conditions"];
      const ruCriteria = ["среду", "диапазон", "монтаж", "выходной сигнал", "условия эксплуатации"];
      return ru.domains.length === en.domains.length &&
        ru.introBody === copy.ru.aboutBody[0] &&
        en.introBody === copy.en.aboutBody[0] &&
        ru.supportSteps.length === en.supportSteps.length &&
        ru.environments.length === en.environments.length &&
        ru.domains.length === 3 &&
        ru.supportSteps.length === 4 &&
        ru.environments.length === 3 &&
        enCriteria.every((phrase) => enText.includes(phrase)) &&
        ruCriteria.every((phrase) => ruText.includes(phrase)) &&
        !/[А-Яа-яЁё]/.test(enText);
    }
  },
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
    name: "RFQ and catalog copy includes practical selection criteria",
    pass: () => {
      const enText = `${copy.en.heroText} ${copy.en.catalogLead} ${copy.en.contactLead} ${copy.en.emailNote}`;
      const ruText = `${copy.ru.heroText} ${copy.ru.catalogLead} ${copy.ru.contactLead} ${copy.ru.emailNote}`;
      const enRequired = [
        "measurement instruments and accessories",
        "model selection",
        "instrument panel and cabinet integration",
        "availability and lead times",
        "measurement range",
        "process medium",
        "pressure",
        "output/interface",
        "installation method"
      ];
      const ruRequired = [
        "измерительные приборы и комплектующие",
        "подбор модели",
        "интеграцию в панели и шкафы",
        "наличие и сроки поставки",
        "диапазон измерения",
        "рабочую среду",
        "давление",
        "выходной сигнал",
        "способ монтажа"
      ];
      return enRequired.every((phrase) => enText.includes(phrase)) && ruRequired.every((phrase) => ruText.includes(phrase));
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
  },
  {
    name: "English routes render html lang as en",
    pass: () => {
      const layout = readOptional("src/app/layout.tsx");
      const middleware = readOptional("src/middleware.ts");
      return middleware.includes("x-pathname") &&
        layout.includes("headers") &&
        layout.includes('pathname === "/en"') &&
        layout.includes('startsWith("/en/")') &&
        layout.includes("<html lang={htmlLang}");
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
