import { getAccessoryProduct } from "@/data/accessories";

type HomeAccessoryRef = readonly [categorySlug: string, productSlug: string, homeImage?: string];

const homeAccessoryRefs: readonly HomeAccessoryRef[] = [
  ["custom-sintered-filter-elements", "custom-sintered-filter-cartridge"],
  ["sintered-microporous-accessories", "micro-porous-filter-disc"],
  ["sintered-filter-cups", "standard-sintered-filter-cup"],
  ["gas-diffusers", "stainless-gas-diffuser-head"],
  ["sensor-protection", "g14-threaded-probe-guard", "/assets/accessories/sensor-g14-home.webp"],
  ["flow-control-accessories", "porous-metal-flow-restrictor"]
] as const;

export const homeAccessoryProducts = homeAccessoryRefs.map(([categorySlug, productSlug, homeImage]) => {
  const product = getAccessoryProduct(categorySlug, productSlug);
  if (!product) throw new Error(`Missing homepage accessory: ${categorySlug}/${productSlug}`);
  return { ...product, image: homeImage ?? product.image };
});
