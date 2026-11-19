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
    name: "localized privacy summary has matching item counts",
    pass: () => copy.ru.privacyBody.length === copy.en.privacyBody.length
  },
  {
    name: "both About pages distinguish the company, its China exports and its services",
    pass: () => {
      const { aboutContent: { ru, en } } = require("../src/data/about.ts");
      return ru.heroLead.includes("экспортирует из Китая") && en.heroLead.includes("from China") &&
        ["SINOETM TECH LTD", "разработкой, производством, продажей и обслуживанием", "известных мировых брендов"].every((phrase) => ru.introBody.includes(phrase)) &&
        ["SINOETM TECH LTD", "research and development, manufacturing, sales, and service", "internationally recognized brands"].every((phrase) => en.introBody.includes(phrase)) &&
        !/Dew Point Meters|Temperature & Humidity Sensors|Oxygen Analyzers/.test(ru.introBody);
    }
  },
  {
    name: "Russian catalog and quotation controls use Russian labels",
    pass: () => copy.ru.allProducts === "Все приборы" && copy.ru.navContact === "Контакты" &&
      copy.ru.contactInfoTitle === "Контакты" && copy.ru.submit === "Отправить запрос" &&
      copy.en.navContact === "Contact" && copy.en.contactInfoTitle === "Contact"
  },
  {
    name: "RFQ and catalog copy includes practical selection criteria",
    pass: () => {
      const enText = `${copy.en.heroDetails} ${copy.en.catalogLead} ${copy.en.contactLead} ${copy.en.emailNote}`;
      const ruText = `${copy.ru.heroDetails} ${copy.ru.catalogLead} ${copy.ru.contactLead} ${copy.ru.emailNote}`;
      const enRequired = [
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
        "подобрать модель",
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
    name: "homepage succinctly introduces China exports and the internationally recognized product range",
    pass: () => {
      const { heroLead: ruLead, heroDetails: ruDetails } = copy.ru;
      const { heroLead: enLead, heroDetails: enDetails } = copy.en;
      return ruLead.startsWith("SenseMeter экспортирует из Китая") && enLead.startsWith("SenseMeter exports industrial instruments from China") && [
        "известных мировых брендов",
        "измерители точки росы",
        "преобразователи точки росы",
        "в том числе портативные",
        "датчики и преобразователи температуры и влажности",
        "ручные термогигрометры",
        "системы анализа следовой влаги в газах"
      ].every((phrase) => ruLead.includes(phrase)) && [
        "internationally recognized brands",
        "dew point meters",
        "dew point transmitters",
        "fixed and portable",
        "temperature and humidity transmitters and sensors",
        "handheld thermo-hygrometers",
        "trace moisture analysis systems for gases"
      ].every((phrase) => enLead.includes(phrase)) && [
        "международную доставку",
        "страны назначения",
        "коммерческом предложении"
      ].every((phrase) => ruDetails.includes(phrase)) && [
        "international delivery",
        "destination country",
        "quotation"
      ].every((phrase) => enDetails.includes(phrase));
    }
  },
  {
    name: "RFQ contact controls have complete Russian and English copy",
    pass: () =>
      copy.ru.formContact === "Контакт" &&
      copy.ru.formContactMethod === "Выберите способ связи" &&
      copy.ru.formContactDetails === "Номер или имя пользователя" &&
      copy.en.formContact === "Contact" &&
      copy.en.formContactMethod === "Select contact method" &&
      copy.en.formContactDetails === "Number or username"
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
