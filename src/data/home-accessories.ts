import { getAccessoryProduct } from "@/data/accessories";

const homeAccessoryRefs = [
  ["sintered-filter-elements", "industrial-sintered-cartridge"],
  ["sintered-filter-elements", "316l-powder-sintered-element"],
  ["sintered-filter-elements", "face-seal-filter-disc"],
  ["sensor-protection", "g14-threaded-probe-guard"],
  ["sensor-protection", "outdoor-vented-probe-housing"],
  ["flow-control-accessories", "porous-metal-flow-restrictor"]
] as const;

export const homeAccessoryProducts = homeAccessoryRefs.map(([categorySlug, productSlug]) => {
  const product = getAccessoryProduct(categorySlug, productSlug);
  if (!product) throw new Error(`Missing homepage accessory: ${categorySlug}/${productSlug}`);
  return product;
});
