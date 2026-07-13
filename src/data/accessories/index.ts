import { accessoryCategories } from "./categories";
import { flowControlProducts } from "./flow-control-accessories";
import { sampleGasFilterProducts } from "./sample-gas-filters";
import { sensorProtectionProducts } from "./sensor-protection";
import { sinteredFilterProducts } from "./sintered-filter-elements";
import type { AccessoryCategorySlug } from "./types";

export type { AccessoryCategory, AccessoryCategorySlug, AccessoryProduct } from "./types";
export { accessoryCategories } from "./categories";

export const accessoryProducts = [
  ...sensorProtectionProducts,
  ...sinteredFilterProducts,
  ...sampleGasFilterProducts,
  ...flowControlProducts
];

export function getAccessoryCategory(slug: string) {
  return accessoryCategories.find((category) => category.slug === slug) ?? null;
}

export function getAccessoryProductsByCategory(categorySlug: AccessoryCategorySlug) {
  return accessoryProducts.filter((product) => product.categorySlug === categorySlug);
}

export function getAccessoryProduct(categorySlug: string, productSlug: string) {
  return accessoryProducts.find((product) => product.categorySlug === categorySlug && product.slug === productSlug) ?? null;
}
