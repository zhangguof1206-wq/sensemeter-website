import type { Locale } from "@/data/catalog";
import type { AccessoryProduct } from "@/data/accessories/types";

export function getRfqAccessoryLabel(value: string | string[] | undefined, locale: Locale, products: AccessoryProduct[]) {
  if (typeof value !== "string" || !value) return undefined;
  return products.some(product => `${product.model} ${product.title[locale]}` === value) ? value : undefined;
}
