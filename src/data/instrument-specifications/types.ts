export type LocalizedText = { en: string; ru: string };

export type SpecRow = { label: LocalizedText; value: LocalizedText };

export const specificationGroups = {
  measurement: { en: "Measurement performance", ru: "Метрологические характеристики" },
  electrical: { en: "Power, signals and data", ru: "Питание, сигналы и данные" },
  operating: { en: "Operating conditions", ru: "Условия эксплуатации" },
  mechanical: { en: "Installation, housing and protection", ru: "Монтаж, корпус и защита" }
} satisfies Record<string, LocalizedText>;

export type SpecificationSource = { revision: string; pages: string; url?: string; label?: string };

export type SpecificationSheet = {
  source: SpecificationSource;
  references?: SpecificationSource[];
  groups: Partial<Record<keyof typeof specificationGroups, SpecRow[]>>;
  note?: LocalizedText;
};

export function r(enLabel: string, ruLabel: string, enValue: string, ruValue = enValue): SpecRow {
  return { label: { en: enLabel, ru: ruLabel }, value: { en: enValue, ru: ruValue } };
}
