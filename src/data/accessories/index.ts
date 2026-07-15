import { accessoryCategories } from "./categories";
import { customSinteredFilterProducts } from "./custom-sintered-filter-elements";
import { flowControlProducts } from "./flow-control-accessories";
import { gasDiffuserProducts } from "./gas-diffusers";
import { sensorProtectionProducts } from "./sensor-protection";
import { sinteredFilterCupProducts } from "./sintered-filter-cups";
import { sinteredMicroporousAccessoryProducts } from "./sintered-microporous-accessories";
import type { AccessoryCategorySlug } from "./types";

export type { AccessoryCategory, AccessoryCategorySlug, AccessoryProduct } from "./types";
export { accessoryCategories } from "./categories";

export const accessoryProducts = [
  ...customSinteredFilterProducts,
  ...sinteredMicroporousAccessoryProducts,
  ...sinteredFilterCupProducts,
  ...gasDiffuserProducts,
  ...sensorProtectionProducts,
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
