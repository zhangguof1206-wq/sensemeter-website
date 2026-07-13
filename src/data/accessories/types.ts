import type { Locale } from "@/data/catalog";

export type AccessoryCategorySlug =
  | "sensor-protection"
  | "sintered-filter-elements"
  | "sample-gas-filters"
  | "flow-control-accessories";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type AccessoryCategory = {
  slug: AccessoryCategorySlug;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  image: string;
};

export type AccessoryProduct = {
  slug: string;
  categorySlug: AccessoryCategorySlug;
  title: LocalizedText;
  summary: LocalizedText;
  image: string;
  selection: LocalizedList;
  compatibleWith: LocalizedList;
  customization: LocalizedText;
};
