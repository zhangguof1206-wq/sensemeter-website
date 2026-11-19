import type { Locale, Product } from "./catalog";
import { mdm300ProductSampleCopy } from "./mdm300-product-sample";

const types: Record<string, { ru: string; en: string }> = {
  "easidew-pro-is": { ru: "Искробезопасный датчик точки росы", en: "Intrinsically safe dew-point transmitter" },
  "easidew-34-m12": { ru: "Компактные датчики точки росы", en: "Compact dew-point transmitters" },
  "easidew-online": { ru: "Система непрерывного контроля точки росы", en: "Online dew-point measurement system" },
  "easidew-pro-xp": { ru: "Взрывозащищенный датчик точки росы", en: "Explosion-proof dew-point transmitter" },
  "gpr-1000-1100-2000-3500": { ru: "Портативные анализаторы кислорода", en: "Portable oxygen analyzers" },
  "gpr-1500": { ru: "Преобразователь следового кислорода", en: "Trace oxygen transmitter" },
  "gpr-1500gb-2500gb": { ru: "Анализаторы кислорода для перчаточных боксов", en: "Glove-box oxygen analyzers" },
  "gpr-1600-2600-3100": { ru: "Промышленные анализаторы кислорода", en: "Industrial oxygen analyzers" },
  "gpr-1900-2900": { ru: "Промышленные анализаторы кислорода", en: "Industrial oxygen analyzers" },
  "hc2a-industrial": { ru: "Промышленные зонды влажности и температуры", en: "Industrial humidity and temperature probes" },
  "hc2a-series": { ru: "Зонды влажности и температуры", en: "Humidity and temperature probes" },
  "hp31-hp32": { ru: "Портативные измерители влажности и температуры", en: "Handheld humidity and temperature meters" },
  "optidew-hz": { ru: "Прибор для измерения точки росы", en: "Dew-point instrument" },
  "sf82-online": { ru: "Система непрерывного контроля точки росы", en: "Online dew-point measurement system" },
  "pura-transmitter": { ru: "Датчик точки росы и следовой влажности", en: "Dew-point and trace moisture transmitter" },
  "hygroflex1": { ru: "Датчик влажности и температуры", en: "Humidity and temperature transmitter" },
  "hmt370ex": { ru: "Датчик влажности и температуры для опасных зон", en: "Humidity and temperature transmitter for hazardous areas" },
  "hmt310": { ru: "Датчик влажности и температуры", en: "Humidity and temperature transmitter" },
  "hmp3-hmpx": { ru: "Промышленный зонд влажности и температуры", en: "Industrial humidity and temperature probe" },
  "dmt153": { ru: "Датчик низкой точки росы", en: "Low dew-point transmitter" },
  "dmt143-dmt143l": { ru: "Миниатюрные датчики точки росы", en: "Miniature dew-point transmitters" }
};

export const productDetailCopy = {
  ru: {
    sections: { overview: "Обзор", specifications: "Технические параметры", versions: "Исполнения", selection: "Подбор и комплектация", documents: "Техническая документация" },
    documentMeta: "PDF",
    documentType: "технические данные",
    selection: ["Применение и измеряемый газ или среда", "Диапазон измерений и рабочие условия", "Выход, подключение, количество и страна поставки"]
  },
  en: {
    sections: { overview: "Overview", specifications: "Technical specifications", versions: "Model versions", selection: "Selection and configuration", documents: "Technical documents" },
    documentMeta: "PDF",
    documentType: "technical data",
    selection: ["Application and measured gas or medium", "Required measuring range and operating conditions", "Output, process connection, quantity and delivery country"]
  }
};

export function getInstrumentDetails(locale: Locale, product: Product) {
  const copy = productDetailCopy[locale];
  const sample = product.slug === "mdm300" ? mdm300ProductSampleCopy[locale] : undefined;
  const referenceOnly = product.slug === "optidew-hz";
  const orderCodes = product.slug === "gpr-1500" || product.slug === "gpr-1000-1100-2000-3500";
  const documentType = orderCodes ? (locale === "ru" ? "коды заказа" : "order codes") : copy.documentType;
  const documentModel = product.slug === "dmt143-dmt143l" ? "DMT143" : product.model;
  const specifications = product.params[locale].map(text => {
    const separator = text.indexOf(": ");
    return separator > 0 ? { label: text.slice(0, separator), value: text.slice(separator + 2) } : { value: text };
  });
  return {
    ...copy,
    productType: sample?.productType ?? types[product.slug]?.[locale] ?? product.category,
    summary: sample?.summary,
    facts: sample?.facts ?? specifications.slice(0, 2),
    specifications,
    versionRows: sample?.versionRows,
    safetyNote: sample?.safetyNote,
    samplingNote: sample?.samplingNote,
    documentTitle: referenceOnly
      ? (locale === "ru" ? "Optidew 401/501 — справочная спецификация серии" : "Optidew 401/501 — reference series datasheet")
      : (sample?.documentTitle ?? `${documentModel} — ${documentType}`),
    downloadLabel: referenceOnly ? (locale === "ru" ? "PDF серии 401/501" : "401/501 series PDF") : undefined,
    documentMeta: sample?.documentMeta ?? copy.documentMeta,
    selectionInputs: product.selectionInputs?.[locale] ?? copy.selection
  };
}
