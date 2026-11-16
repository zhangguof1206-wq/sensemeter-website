import type { AccessoryCategory } from "@/data/accessories";
import type { Locale } from "@/data/catalog";

type DisplayCopy = Readonly<{ title: string; summary: string }>;

export const accessoryOverviewCopy: Record<Locale, { intro: string; selectionLead: string }> = {
  ru: {
    intro: "Фильтрующие элементы, защита зондов и компоненты газовых линий.",
    selectionLead: "При подборе учитываются прибор, рабочая среда, давление, расход, соединение, класс фильтрации или размер пор, допустимый перепад давления и количество."
  },
  en: {
    intro: "Filter elements, probe protection and gas-line components.",
    selectionLead: "Selection considers the instrument, process medium, pressure, flow, connection, filtration grade or pore size, allowable pressure drop and quantity."
  }
};

const categoryDisplay: Partial<Record<AccessoryCategory["slug"], Record<Locale, DisplayCopy>>> = {
  "custom-sintered-filter-elements": {
    ru: { title: "Фильтроэлементы под заказ", summary: "Диски, трубки и другие формы по чертежу или образцу." },
    en: { title: "Custom filter elements", summary: "Discs, tubes and custom shapes made to a drawing or sample." }
  },
  "sintered-microporous-accessories": {
    ru: { title: "Микропористые элементы", summary: "Компактные вставки, диски и трубки для приборных узлов." },
    en: { title: "Microporous metal parts", summary: "Compact inserts, discs and tubes for instrument assemblies." }
  },
  "sintered-filter-cups": {
    ru: { title: "Фильтрующие стаканы", summary: "Пористые стаканы и патроны для защиты и фильтрации." },
    en: { title: "Sintered filter cups", summary: "Porous cups and cartridges for protection and filtration." }
  },
  "gas-diffusers": {
    ru: { title: "Газовые диффузоры", summary: "Пористые элементы для распределения газа и аэрации." },
    en: { title: "Gas diffusers", summary: "Porous elements for gas distribution and aeration." }
  },
  "sensor-protection": {
    ru: { title: "Защита зондов", summary: "Колпачки и корпуса для зондов влажности и точки росы." },
    en: { title: "Probe protection", summary: "Caps and housings for humidity and dew-point probes." }
  },
  "flow-control-accessories": {
    ru: { title: "Ограничители расхода", summary: "Компоненты для пробоотбора и регулирования потока газа." },
    en: { title: "Flow restrictors", summary: "Components for sampling and gas-flow control." }
  }
};

export function getAccessoryCategoryDisplay(category: Pick<AccessoryCategory, "slug" | "title" | "summary">, locale: Locale): DisplayCopy {
  const display = Object.hasOwn(categoryDisplay, category.slug) ? categoryDisplay[category.slug] : undefined;
  return display?.[locale] ?? { title: category.title[locale], summary: category.summary[locale] };
}
