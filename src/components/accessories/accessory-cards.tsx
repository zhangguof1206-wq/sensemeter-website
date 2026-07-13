import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";
import { AccessorySpecTable } from "./accessory-specs";

export function AccessoryCategoryCard({ category, locale }: { category: AccessoryCategory; locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <Link className="card group flex h-full flex-col overflow-hidden transition hover:border-accent/50 hover:shadow-lg" href={localizedPath(locale, `/accessories/${category.slug}`)}>
      <div className="grid aspect-[4/3] place-items-center overflow-hidden border-b border-line bg-[#eef2f5] p-5">
        <img className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]" src={category.image} alt={category.title[locale]} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-black">{category.title[locale]}</h3>
        <p className="mt-2 text-sm font-bold uppercase text-accent">{c.modelsAvailable}</p>
        <div className="mt-4">
          <AccessorySpecTable specs={category.specs.slice(0, 3)} locale={locale} compact />
        </div>
        <span className="btn btn-outline mt-auto w-full !border-accent !text-accent">{c.viewCategory}</span>
      </div>
    </Link>
  );
}

export function AccessoryProductCard({ product, locale }: { product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${product.categorySlug}/${product.slug}`;
  return (
    <Link className="card group flex h-full flex-col overflow-hidden transition hover:border-accent/50 hover:shadow-lg" href={localizedPath(locale, path)}>
      <div className="grid aspect-[4/3] place-items-center overflow-hidden border-b border-line bg-[#eef2f5] p-4">
        <img className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]" src={product.image} alt={product.title[locale]} />
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
