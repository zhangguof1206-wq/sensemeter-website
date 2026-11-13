import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";
import { AccessorySpecTable } from "./accessory-specs";
import { getAccessoryCategoryImage, getAccessoryProductImage } from "@/data/accessory-images";

const cardFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const imageSizes = "(min-width: 1280px) 380px, (min-width: 768px) 45vw, 90vw";

export function AccessoryCategoryCard({ category, locale }: { category: AccessoryCategory; locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <Link className={`group flex h-full min-w-0 flex-col border-b border-line bg-white pb-5 ${cardFocus}`} href={localizedPath(locale, `/accessories/${category.slug}`)}>
      <div className="aspect-[3/2] w-full bg-white">
        <Image className="accessory-category-image h-full w-full object-contain" src={getAccessoryCategoryImage(category)} alt={category.title[locale]} width={1536} height={1024} sizes={imageSizes} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-5">
        <h2 className="break-words text-xl font-bold leading-7 text-steel group-hover:text-accent">{category.title[locale]}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">{category.summary[locale]}</p>
        <p className="mt-auto pt-4 text-sm font-bold text-accent">{c.viewCategory}<span className="ml-2" aria-hidden="true">→</span></p>
      </div>
    </Link>
  );
}

export function AccessoryProductCard({ product, locale }: { product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${product.categorySlug}/${product.slug}`;
  return (
    <Link className={`group flex h-full min-w-0 flex-col border-b border-line bg-white pb-5 ${cardFocus}`} href={localizedPath(locale, path)} data-accessory-product>
      <div className="aspect-[3/2] w-full bg-white">
        <Image className="accessory-product-image h-full w-full object-contain" src={getAccessoryProductImage(product.image)} alt={product.title[locale]} width={1536} height={1024} sizes={imageSizes} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col pt-5">
        <p className="text-sm font-bold text-accent">{product.model}</p>
        <h3 className="mt-2 break-words text-lg font-bold leading-7 text-steel group-hover:text-accent">{product.title[locale]}</h3>
        <div className="mt-4">
          <AccessorySpecTable specs={product.specs.slice(0, 3)} locale={locale} compact />
        </div>
        <span className="mt-auto pt-5 text-sm font-bold text-accent">{c.viewAccessory}<span className="ml-2" aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
