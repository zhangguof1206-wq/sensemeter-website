import type { Locale } from "@/data/catalog";

type DetailCopy = {
  productType: string;
  summary: string;
  breadcrumb: string;
  navigation: string;
  sections: { overview: string; specifications: string; versions: string; selection: string; documents: string };
  facts: { label: string; value: string; condition: string }[];
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
    versionRows: [
      { label: "T95 до -60 °Cdp", standard: "Не более 15 минут", intrinsicallySafe: "Не более 30 минут" },
      { label: "Типичная работа между зарядками", standard: "До 48 часов", intrinsicallySafe: "До 24 часов" },
      { label: "Условия установки", standard: "Для безопасных зон", intrinsicallySafe: "Для опасных зон после проверки условий сертификации конкретного прибора" },
      { label: "Расход через датчик", standard: "0.2–1.2 норм. л/мин", intrinsicallySafe: "0.2–0.5 норм. л/мин" },
      { label: "Материалы в контакте с газом", standard: "Нержавеющая сталь AISI 316L", intrinsicallySafe: "AISI 316L, уплотнение PTFE, боросиликатное стекло, керамика" },
      { label: "Масса", standard: "1.35 кг", intrinsicallySafe: "1.5 кг" },
      { label: "Зарядное устройство", standard: "Автоматическое, в комплекте", intrinsicallySafe: "Автоматическое; не сертифицировано для использования в опасных зонах" },
      { label: "Маркировка и сертификаты", standard: "CE, UKCA", intrinsicallySafe: "ATEX/UKCA, IECEx, TR CU Ex, cQPSus; проверьте маркировку конкретного прибора" }
    ],
    safetyNote: "Обычный MDM300 предназначен для безопасных зон. Применение MDM300 I.S. в опасной зоне требует проверки классификации зоны и условий сертификации конкретного прибора, совместимости газа и схемы отбора проб.",
    samplingNote: "Схема отбора проб и состав принадлежностей подтверждаются в коммерческом предложении.",
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
    versionRows: [
      { label: "T95 to -60 °Cdp", standard: "Up to 15 minutes", intrinsicallySafe: "Up to 30 minutes" },
      { label: "Typical use between charges", standard: "Up to 48 hours", intrinsicallySafe: "Up to 24 hours" },
      { label: "Installation environment", standard: "Safe areas", intrinsicallySafe: "Hazardous areas subject to the specific unit's approval conditions" },
      { label: "Flow across the sensor", standard: "0.2–1.2 Nl/min", intrinsicallySafe: "0.2–0.5 Nl/min" },
      { label: "Gas-wetted materials", standard: "AISI 316L stainless steel", intrinsicallySafe: "AISI 316L, PTFE seal, borosilicate glass, ceramic" },
      { label: "Weight", standard: "1.35 kg", intrinsicallySafe: "1.5 kg" },
      { label: "Charger", standard: "Intelligent charger, included", intrinsicallySafe: "Intelligent charger; not certified for hazardous-area use" },
      { label: "Marking and approvals", standard: "CE, UKCA", intrinsicallySafe: "ATEX/UKCA, IECEx, TR CU Ex, cQPSus; check the exact unit's markings" }
    ],
    safetyNote: "The standard MDM300 is for safe-area use. For hazardous-area use, check the area classification and the specific MDM300 I.S. unit's approval conditions, gas compatibility and sampling arrangement.",
    samplingNote: "Sampling arrangements and supplied accessories are confirmed in the quotation.",
    conditionsNote: "Response time and readings depend on measurement and sampling conditions. Refer to the technical documentation for the full conditions and limitations.",
    documentTitle: "MDM300 / MDM300 I.S. — technical data",
    documentMeta: "English · PDF"
  }
} satisfies Record<Locale, DetailCopy>;
