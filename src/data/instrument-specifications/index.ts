import type { Locale } from "../catalog";
import { aiiSpecifications } from "./aii";
import { easidewProSpecifications } from "./easidew-pro";
import { mdm300Specifications } from "./mdm300";
import { michellOtherSpecifications } from "./michell-other";
import { rotronicSpecifications } from "./rotronic";
import { specificationGroups, type SpecificationSheet } from "./types";
import { vaisalaSpecifications } from "./vaisala";

const sheets: Readonly<Record<string, SpecificationSheet | undefined>> = {
  ...aiiSpecifications,
  ...easidewProSpecifications,
  ...mdm300Specifications,
  ...michellOtherSpecifications,
  ...rotronicSpecifications,
  ...vaisalaSpecifications
};

export function getInstrumentSpecifications(slug: string, locale: Locale) {
  const sheet = Object.hasOwn(sheets, slug) ? sheets[slug] : undefined;
  if (!sheet) return;

  return {
    source: sheet.source,
    references: sheet.references ?? [],
    groups: (Object.keys(specificationGroups) as (keyof typeof specificationGroups)[]).flatMap(key => {
      const rows = sheet.groups[key];
      return rows?.length ? [{
        key,
        title: specificationGroups[key][locale],
        rows: rows.map(row => ({ label: row.label[locale], value: row.value[locale] }))
      }] : [];
    })
  };
}
