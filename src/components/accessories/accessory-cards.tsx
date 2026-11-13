import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";
import { AccessorySpecTable } from "./accessory-specs";
import { getAccessoryCategoryImage, getAccessoryProductImage } from "@/data/accessory-images";
import { getAccessoryCategoryDisplay } from "@/data/accessory-overview";

const cardFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const imageSizes = "(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw";

export function AccessoryCategoryCard({ category, locale }: { category: AccessoryCategory; locale: Locale }) {
  const c = accessoryCopy[locale];
  const display = getAccessoryCategoryDisplay(category, locale);
  return (
    <Link className={`group row-span-4 mb-8 grid min-w-0 grid-rows-subgrid gap-y-0 border border-line bg-white ${cardFocus}`} href={localizedPath(locale, `/accessories/${category.slug}`)}>
      <div className="relative aspect-[3/2] w-full border-b border-line bg-white" data-accessory-media>
        <Image className="accessory-category-image absolute inset-0 block h-full w-full object-contain p-3" src={getAccessoryCategoryImage(category)} alt={category.title[locale]} width={1536} height={1024} sizes={imageSizes} />
      </div>
      <h2 className="min-w-0 break-words px-6 pt-5 text-xl font-bold leading-7 text-steel group-hover:text-accent">{display.title}</h2>
      <p className="min-w-0 px-6 pt-3 text-sm leading-6 text-muted">{display.summary}</p>
      <span className="flex min-h-16 items-center justify-between gap-4 px-6 py-5 text-sm font-bold text-accent" data-accessory-card-action>{c.viewCategory}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></span>
    </Link>
  );
}

export function AccessoryProductCard({ product, locale }: { product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${product.categorySlug}/${product.slug}`;
  return (
    <Link className={`group row-span-6 mb-8 grid min-w-0 grid-rows-subgrid gap-y-0 border border-line bg-white ${cardFocus}`} href={localizedPath(locale, path)} data-accessory-product>
      <div className="relative aspect-[3/2] w-full border-b border-line bg-white" data-accessory-media>
        <Image className="accessory-product-image absolute inset-0 block h-full w-full object-contain p-3" src={getAccessoryProductImage(product.image)} alt={product.title[locale]} width={1536} height={1024} sizes={imageSizes} />
      </div>
      <div className="min-w-0 px-5 pb-4 pt-5">
        <p className="text-sm font-bold text-accent">{product.model}</p>
        <h3 className="mt-2 break-words text-lg font-bold leading-7 text-steel group-hover:text-accent">{product.title[locale]}</h3>
      </div>
      <AccessorySpecTable specs={product.specs.slice(0, 3)} locale={locale} compact />
      <span className="flex min-h-16 items-center justify-between gap-4 px-5 py-5 text-sm font-bold text-accent" data-accessory-card-action>{c.viewAccessory}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></span>
    </Link>
  );
}
