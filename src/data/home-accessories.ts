import { getAccessoryCategory, type AccessoryCategory } from "@/data/accessories";

type HomeAccessoryCategory = Pick<AccessoryCategory, "slug" | "title" | "image">;

const homeAccessoryConfigs = [
  {
    slug: "custom-sintered-filter-elements",
    title: { ru: "Фильтроэлементы под заказ", en: "Custom filter elements" },
    image: "/assets/home-accessories/custom-sintered-v1.webp"
  },
  {
    slug: "sintered-microporous-accessories",
    title: { ru: "Микропористые элементы", en: "Microporous metal parts" },
    image: "/assets/home-accessories/microporous-metal-v1.webp"
  },
  {
    slug: "sintered-filter-cups",
    title: { ru: "Фильтрующие стаканы", en: "Sintered filter cups" },
    image: "/assets/home-accessories/filter-cups-v1.webp"
  },
  {
    slug: "gas-diffusers",
    title: { ru: "Газовые диффузоры", en: "Gas diffusers" },
    image: "/assets/home-accessories/gas-diffusers-v1.webp"
  },
  {
    slug: "sensor-protection",
    title: { ru: "Защита зондов", en: "Probe protection" },
    image: "/assets/home-accessories/probe-protection-v1.webp"
  },
  {
    slug: "flow-control-accessories",
    title: { ru: "Ограничители расхода", en: "Flow restrictors" },
    image: "/assets/home-accessories/flow-restrictors-v1.webp"
  }
] as const satisfies readonly HomeAccessoryCategory[];

export const homeAccessoryCategories: readonly HomeAccessoryCategory[] = homeAccessoryConfigs.map(({ slug, title, image }) => {
  const category = getAccessoryCategory(slug);
  if (!category) throw new Error(`Missing homepage accessory category: ${slug}`);
  return { slug: category.slug, title, image };
});
