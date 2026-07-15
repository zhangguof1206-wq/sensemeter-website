import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";
import { AccessorySpecTable } from "./accessory-specs";

export function AccessoryCategoryCard({ category, locale }: { category: AccessoryCategory; locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <Link className="card group flex h-full flex-col overflow-hidden bg-white transition hover:border-accent/50 hover:shadow-lg" href={localizedPath(locale, `/accessories/${category.slug}`)}>
      <div className="grid aspect-[4/3] place-items-center border-b border-line bg-[#e9eef4] p-4">
        <img className="accessory-category-image max-h-[94%] max-w-[94%] object-contain transition duration-300 group-hover:scale-[1.02]" src={category.image} alt={category.title[locale]} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-black leading-6">{category.title[locale]}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{category.summary[locale]}</p>
        <p className="mt-auto pt-4 text-sm font-bold uppercase text-accent">{c.viewCategory}</p>
      </div>
    </Link>
  );
}

export function AccessoryProductCard({ product, locale }: { product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${product.categorySlug}/${product.slug}`;
  return (
    <Link className="card group flex h-full flex-col overflow-hidden transition hover:border-accent/50 hover:shadow-lg" href={localizedPath(locale, path)}>
      <div className="grid aspect-[4/3] place-items-center overflow-hidden border-b border-line bg-[#e9eef4] p-4">
        <img className="accessory-product-image max-h-[94%] max-w-[94%] object-contain transition duration-300 group-hover:scale-[1.02]" src={product.image} alt={product.title[locale]} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-black uppercase text-accent">{product.model}</p>
        <h3 className="text-lg font-black leading-6">{product.title[locale]}</h3>
        <div className="mt-4">
          <AccessorySpecTable specs={product.specs.slice(0, 3)} locale={locale} compact />
        </div>
        <span className="btn btn-outline mt-auto w-full !border-accent !text-accent">{c.viewAccessory}</span>
      </div>
    </Link>
  );
}
