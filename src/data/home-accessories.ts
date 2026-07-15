import { getAccessoryProduct } from "@/data/accessories";

const homeAccessoryRefs = [
  ["custom-sintered-filter-elements", "custom-sintered-filter-cartridge"],
  ["sintered-microporous-accessories", "micro-porous-filter-disc"],
  ["sintered-filter-cups", "standard-sintered-filter-cup"],
  ["gas-diffusers", "stainless-gas-diffuser-head"],
  ["sensor-protection", "g14-threaded-probe-guard"],
  ["flow-control-accessories", "porous-metal-flow-restrictor"]
] as const;

export const homeAccessoryProducts = homeAccessoryRefs.map(([categorySlug, productSlug]) => {
  const product = getAccessoryProduct(categorySlug, productSlug);
  if (!product) throw new Error(`Missing homepage accessory: ${categorySlug}/${productSlug}`);
  return product;
});
