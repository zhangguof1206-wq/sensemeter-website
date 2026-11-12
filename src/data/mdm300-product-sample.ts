import type { Locale } from "@/data/catalog";

type DetailCopy = {
  productType: string;
  summary: string;
  breadcrumb: string;
  navigation: string;
  sections: { overview: string; specifications: string; versions: string; selection: string; documents: string };
  facts: { label: string; value: string; condition: string }[];
  valueHeading: string;
  parameterHeading: string;
  specifications: { label: string; value: string }[];
  versionRows: { label: string; standard: string; intrinsicallySafe: string }[];
  safetyNote: string;
  samplingNote: string;
  conditionsNote: string;
  documentTitle: string;
  documentMeta: string;
};

export const mdm300ProductSampleCopy = {
  ru: {
    productType: "Портативные гигрометры точки росы",
    summary: "Выборочные измерения точки росы в сжатом воздухе и природном газе. Обычное и искробезопасное исполнения для разных условий эксплуатации.",
    breadcrumb: "Навигационная цепочка",
    navigation: "Информация о MDM300",
    sections: {
      overview: "Обзор", specifications: "Технические параметры", versions: "Исполнения",
      selection: "Подбор и комплектация", documents: "Техническая документация"
    },
    facts: [
      { label: "Точность точки росы", value: "±1 °C", condition: "от -60 до +20 °Cdp" },
      { label: "Рабочее давление", value: "до 350 barg", condition: "с учетом схемы отбора проб" }
    ],
    valueHeading: "Значение и условия",
    parameterHeading: "Параметр",
    specifications: [
      { label: "Точность точки росы", value: "±1 °C в диапазоне от -60 до +20 °Cdp" },
      { label: "Рабочее давление", value: "До 350 barg" },
      { label: "Защита корпуса", value: "IP66 / NEMA 4" }
    ],
    versionRows: [
      { label: "T95 до -60 °Cdp", standard: "Не более 15 минут", intrinsicallySafe: "Не более 30 минут" },
      { label: "Типичная работа между зарядками", standard: "До 48 часов", intrinsicallySafe: "До 24 часов" },
      { label: "Условия установки", standard: "Для безопасных зон", intrinsicallySafe: "Для опасных зон после проверки условий сертификации конкретного прибора" }
    ],
    safetyNote: "Обычный MDM300 предназначен для безопасных зон. Применение MDM300 I.S. в опасной зоне требует проверки классификации зоны и условий сертификации конкретного прибора, совместимости газа и схемы отбора проб.",
    samplingNote: "Принадлежности и схема отбора проб подтверждаются в коммерческом предложении. Наличие принадлежности на фотографии не означает ее включение в поставку.",
    conditionsNote: "Время отклика и результаты зависят от условий измерения и отбора проб. Полные условия и ограничения приведены в технической документации.",
    documentTitle: "MDM300 / MDM300 I.S. — технические данные",
    documentMeta: "Английский · PDF"
  },
  en: {
    productType: "Portable dew-point hygrometers",
    summary: "Dew-point spot checks in compressed air and natural gas. Standard and intrinsically safe versions for different operating environments.",
    breadcrumb: "Breadcrumb",
    navigation: "MDM300 product information",
    sections: {
      overview: "Overview", specifications: "Technical specifications", versions: "Model versions",
      selection: "Selection and configuration", documents: "Technical documents"
    },
    facts: [
      { label: "Dew-point accuracy", value: "±1 °C", condition: "from -60 to +20 °Cdp" },
      { label: "Operating pressure", value: "Up to 350 barg", condition: "subject to sampling arrangement" }
    ],
    valueHeading: "Value and conditions",
    parameterHeading: "Parameter",
    specifications: [
      { label: "Dew-point accuracy", value: "±1 °C from -60 to +20 °Cdp" },
      { label: "Operating pressure", value: "Up to 350 barg" },
      { label: "Enclosure rating", value: "IP66 / NEMA 4" }
    ],
    versionRows: [
      { label: "T95 to -60 °Cdp", standard: "Up to 15 minutes", intrinsicallySafe: "Up to 30 minutes" },
      { label: "Typical use between charges", standard: "Up to 48 hours", intrinsicallySafe: "Up to 24 hours" },
      { label: "Installation environment", standard: "Safe areas", intrinsicallySafe: "Hazardous areas subject to the specific unit's approval conditions" }
    ],
    safetyNote: "The standard MDM300 is for safe-area use. For hazardous-area use, check the area classification and the specific MDM300 I.S. unit's approval conditions, gas compatibility and sampling arrangement.",
    samplingNote: "Sampling accessories and the sampling arrangement are confirmed in the quotation. An accessory shown in the photograph should not be assumed to be included.",
    conditionsNote: "Response time and readings depend on measurement and sampling conditions. Refer to the technical documentation for the full conditions and limitations.",
    documentTitle: "MDM300 / MDM300 I.S. — technical data",
    documentMeta: "English · PDF"
  }
} satisfies Record<Locale, DetailCopy>;
