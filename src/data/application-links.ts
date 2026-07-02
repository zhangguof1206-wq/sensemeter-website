import type { Locale } from "@/data/catalog";

export type ProductApplicationLink = {
  path: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

const applicationPages = {
  compressedAirDewPoint: {
    path: "/applications/compressed-air-dew-point",
    title: {
      ru: "Сжатый воздух и точка росы",
      en: "Compressed air dew point"
    },
    description: {
      ru: "Подбор приборов для контроля точки росы в компрессорных системах, осушителях и сухом воздухе.",
      en: "Instrument selection for dew-point monitoring in compressed air, dryers and dry air systems."
    }
  },
  naturalGasMoisture: {
    path: "/applications/natural-gas-moisture-monitoring",
    title: {
      ru: "Влажность и точка росы газа",
      en: "Gas moisture and dew point"
    },
    description: {
      ru: "Решения для природного и технологического газа, трубопроводов и газоподготовки.",
      en: "Solutions for natural gas, process gas, pipelines and gas treatment systems."
    }
  },
  gloveBoxOxygen: {
    path: "/applications/glove-box-oxygen-analysis",
    title: {
      ru: "Кислород в glove box и газах",
      en: "Glove box and gas oxygen analysis"
    },
    description: {
      ru: "Анализаторы O2 для перчаточных боксов, генераторов азота и контроля чистоты газов.",
      en: "O2 analyzers for glove boxes, nitrogen generators and gas purity monitoring."
    }
  },
  industrialHumidity: {
    path: "/applications/industrial-humidity-monitoring",
    title: {
      ru: "Промышленный контроль влажности",
      en: "Industrial humidity monitoring"
    },
    description: {
      ru: "Датчики влажности и температуры для процессов, воздуховодов, BMS и производственных зон.",
      en: "Humidity and temperature sensors for processes, ducts, BMS and production areas."
    }
  },
  climateChamberHumidity: {
    path: "/applications/climate-chamber-humidity",
    title: {
      ru: "Лаборатории и климатические камеры",
      en: "Laboratories and climate chambers"
    },
    description: {
      ru: "Измерение влажности и температуры в лабораториях, климатических камерах и испытательных установках.",
      en: "Humidity and temperature measurement in laboratories, climate chambers and test systems."
    }
  }
} satisfies Record<string, ProductApplicationLink>;

export const productApplicationLinks: Record<string, ProductApplicationLink[]> = {
  "easidew-34-m12": [applicationPages.compressedAirDewPoint],
  "easidew-online": [applicationPages.compressedAirDewPoint, applicationPages.naturalGasMoisture],
  "sf82-online": [applicationPages.compressedAirDewPoint],
  "dmt143-dmt143l": [applicationPages.compressedAirDewPoint],
  "mdm300": [applicationPages.compressedAirDewPoint, applicationPages.naturalGasMoisture],
  "gpr-1500": [applicationPages.gloveBoxOxygen],
  "gpr-1900-2900": [applicationPages.gloveBoxOxygen],
  "gpr-1500gb-2500gb": [applicationPages.gloveBoxOxygen],
  "gpr-1600-2600-3100": [applicationPages.gloveBoxOxygen],
  "gpr-1000-1100-2000-3500": [applicationPages.gloveBoxOxygen],
  "easidew-pro-is": [applicationPages.naturalGasMoisture],
  "easidew-pro-xp": [applicationPages.naturalGasMoisture],
  "optidew-hz": [applicationPages.naturalGasMoisture],
  "hc2a-series": [applicationPages.industrialHumidity, applicationPages.climateChamberHumidity],
  "hc2a-industrial": [applicationPages.industrialHumidity],
  "hygroflex1": [applicationPages.industrialHumidity, applicationPages.climateChamberHumidity],
  "hmt310": [applicationPages.industrialHumidity, applicationPages.climateChamberHumidity],
  "hmt370ex": [applicationPages.industrialHumidity],
  "hmp3-hmpx": [applicationPages.climateChamberHumidity],
  "hp31-hp32": [applicationPages.climateChamberHumidity]
};

export function getProductApplicationLinks(slug: string) {
  return productApplicationLinks[slug] || [];
}
