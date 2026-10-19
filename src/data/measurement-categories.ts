import type { LocalizedText } from "./catalog";

type CategoryCopy = {
  title: string;
  h1: string;
  description: string;
  intro: string;
  selectionHeading: string;
  selectionItems: string[];
  faq: { question: string; answer: string }[];
  ctaLabel: string;
};

export type MeasurementCategory = {
  slug: string;
  path: string;
  navLabel: LocalizedText;
  ru: CategoryCopy;
  en: CategoryCopy;
  productGroups: { id: string; label: LocalizedText; slugs: string[] }[];
  pendingProductSlugs: string[];
  relatedApplicationPaths: string[];
  contactPath: string;
  cardPurposes: Record<string, LocalizedText>;
  lastModified: string;
};

export const measurementCategories: MeasurementCategory[] = [
  {
    "slug": "dew-point-instruments",
    "path": "/catalog/dew-point-instruments",
    "navLabel": {
      "ru": "Точка росы и влага в газе",
      "en": "Dew Point and Gas Moisture"
    },
    "ru": {
      "title": "Измерители точки росы и влажности газа",
      "h1": "Приборы для измерения точки росы и влажности газа",
      "description": "Датчики, онлайн-гигрометры и переносные приборы для измерения точки росы и влаги в газе. Michell и Vaisala: подбор и запрос цены.",
      "intro": "Приборы для контроля сухости сжатого воздуха и технологических газов. Выберите преобразователь для постоянного измерения, систему с индикацией или переносной гигрометр для проверки нескольких точек. Диапазон, давление и условия отбора пробы согласуются для конкретной модели.",
      "selectionHeading": "Что учесть при выборе прибора",
      "selectionItems": [
        "Состав газа и требуемый диапазон точки росы по воде",
        "Давление в линии и в точке измерения, условия отбора пробы",
        "Постоянное измерение или переносная проверка",
        "Выходной сигнал, монтаж и требования к исполнению для опасной зоны"
      ],
      "faq": [
        {
          "question": "Как выбрать онлайн-прибор или переносной гигрометр?",
          "answer": "Онлайн-прибор нужен для постоянного контроля одной линии, переносной гигрометр удобен для проверок нескольких точек. Окончательный выбор зависит от газа, давления и требований к измерению."
        },
        {
          "question": "Почему нужно указать давление в точке измерения?",
          "answer": "Точка росы по воде зависит от давления газа. При измерении после снижения давления результат нельзя напрямую сравнивать с точкой росы в линии. Укажите давление в линии и в точке измерения, а также условия, к которым относится требуемое значение."
        }
      ],
      "ctaLabel": "Запросить предложение"
    },
    "en": {
      "title": "Dew-Point and Gas Moisture Instruments",
      "h1": "Dew-Point and Gas Moisture Instruments",
      "description": "Dew-point transmitters, online hygrometers and portable instruments from Michell and Vaisala. Explore product types and request a quotation.",
      "intro": "Instruments for monitoring dryness in compressed air and process gases. Choose a transmitter for continuous measurement, a monitoring system with a display, or a portable hygrometer for checks at multiple points. Range, pressure and sampling conditions must match the selected model.",
      "selectionHeading": "What to consider when selecting an instrument",
      "selectionItems": [
        "Gas composition and required water dew-point range",
        "Line pressure, measurement pressure and sampling conditions",
        "Continuous measurement or portable checks",
        "Output signal, mounting and any hazardous-area requirements"
      ],
      "faq": [
        {
          "question": "Should I choose an online instrument or a portable hygrometer?",
          "answer": "An online instrument provides continuous monitoring at one line, while a portable hygrometer supports checks at multiple points. The final choice depends on gas, pressure and measurement requirements."
        },
        {
          "question": "Why specify the pressure at the measurement point?",
          "answer": "Water dew point depends on gas pressure. A reading taken after pressure reduction cannot be compared directly with the line-pressure dew point. Specify both pressures and the pressure to which your required dew-point value refers."
        }
      ],
      "ctaLabel": "Request a Quote"
    },
    "productGroups": [
      {
        "id": "transmitters",
        "label": {
          "ru": "Преобразователи и датчики",
          "en": "Transmitters and Sensors"
        },
        "slugs": [
          "easidew-34-m12",
          "dmt143-dmt143l",
          "dmt153",
          "pura-transmitter",
          "easidew-pro-is",
          "easidew-pro-xp"
        ]
      },
      {
        "id": "online",
        "label": {
          "ru": "Системы постоянного контроля",
          "en": "Continuous Monitoring Systems"
        },
        "slugs": [
          "easidew-online",
          "sf82-online"
        ]
      },
      {
        "id": "portable",
        "label": {
          "ru": "Переносные измерения",
          "en": "Portable Measurements"
        },
        "slugs": [
          "mdm300"
        ]
      }
    ],
    "pendingProductSlugs": [
      "optidew-hz"
    ],
    "relatedApplicationPaths": [
      "/applications/compressed-air-dew-point",
      "/applications/natural-gas-moisture-monitoring"
    ],
    "contactPath": "/contact",
    "cardPurposes": {
      "easidew-34-m12": {
        "ru": "преобразователи точки росы",
        "en": "Dew-Point Transmitters"
      },
      "dmt143-dmt143l": {
        "ru": "датчики точки росы",
        "en": "Dew-Point Transmitters"
      },
      "dmt153": {
        "ru": "преобразователь точки росы",
        "en": "Dew-Point Transmitter"
      },
      "pura-transmitter": {
        "ru": "преобразователь следовой влажности газа",
        "en": "Trace Moisture Transmitter"
      },
      "easidew-pro-is": {
        "ru": "искробезопасный датчик точки росы",
        "en": "Intrinsically Safe Dew-Point Transmitter"
      },
      "easidew-pro-xp": {
        "ru": "взрывозащищенный датчик точки росы",
        "en": "Explosion-Proof Dew-Point Transmitter"
      },
      "easidew-online": {
        "ru": "система контроля точки росы",
        "en": "Dew-Point Monitoring System"
      },
      "sf82-online": {
        "ru": "гигрометр для контроля точки росы",
        "en": "Online Dew-Point Hygrometer"
      },
      "mdm300": {
        "ru": "портативный гигрометр точки росы",
        "en": "Portable Dew-Point Hygrometer"
      }
    },
    "lastModified": "2026-10-19"
  }
];

export function getMeasurementCategory(slug: string) {
  return measurementCategories.find(category => category.slug === slug);
}
