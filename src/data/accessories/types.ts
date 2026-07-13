import type { Locale } from "@/data/catalog";

export type AccessoryCategorySlug =
  | "sensor-protection"
  | "sintered-filter-elements"
  | "sample-gas-filters"
  | "flow-control-accessories";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type LocalizedSpec = {
  label: LocalizedText;
  value: LocalizedText;
};

export type AccessoryCategory = {
  slug: AccessoryCategorySlug;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  image: string;
  specs: LocalizedSpec[];
};

export type AccessoryProduct = {
  slug: string;
  categorySlug: AccessoryCategorySlug;
  model: string;
  title: LocalizedText;
  summary: LocalizedText;
  image: string;
  selection: LocalizedList;
  compatibleWith: LocalizedList;
  customization: LocalizedText;
  specs: LocalizedSpec[];
  applications: LocalizedList;
  relatedSlugs: string[];
};
