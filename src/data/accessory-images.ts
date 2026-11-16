import type { AccessoryCategory } from "@/data/accessories";

const categoryImages: Partial<Record<AccessoryCategory["slug"], string>> = {
  "custom-sintered-filter-elements": "/assets/home-accessories/custom-sintered-v1.webp",
  "sintered-microporous-accessories": "/assets/home-accessories/microporous-metal-v1.webp",
  "sintered-filter-cups": "/assets/home-accessories/filter-cups-v1.webp",
  "gas-diffusers": "/assets/home-accessories/gas-diffusers-v1.webp",
  "sensor-protection": "/assets/home-accessories/probe-protection-v1.webp",
  "flow-control-accessories": "/assets/home-accessories/flow-restrictors-v1.webp"
};

// Only accepted edits are mapped; other sources keep their original photographs.
const productImageStems = [
  "filter-custom-microporous", "filter-face-seal-disc", "filter-shaped-element",
  "filter-industrial-cartridge", "filter-nano-disc",
  "flow-threaded-analytical", "flow-damping-fitting", "flow-precision-orifice",
  "flow-fitting-limiter", "sensor-g14", "sensor-m30-conical", "sensor-flat-tip",
  "sensor-pointed", "sensor-high-temperature",
  "flow-porous-restrictor", "flow-high-purity"
];
const productImages = new Map(productImageStems.map(stem => [
  `/assets/accessories/${stem}-uniform.webp`, `/assets/accessory-products/${stem}-v2.webp`
]));

export function getAccessoryCategoryImage(category: Pick<AccessoryCategory, "slug" | "image">) {
  return (Object.hasOwn(categoryImages, category.slug) ? categoryImages[category.slug] : undefined) ?? category.image;
}

export function getAccessoryProductImage(source: string) {
  return productImages.get(source) ?? source;
}
