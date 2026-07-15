import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { homeAccessoryProducts } from "@/data/home-accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";

export function AccessoriesHomeSection({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <section className="section bg-[#e9eef4]">
      <div className="section-narrow home-section-reveal grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="max-w-xl">
          <h2 className="text-3xl font-black">{c.homeTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-muted">{c.homeLead}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-3">
          {homeAccessoryProducts.map((product) => (
            <Link
              className="home-accessory-tile group flex h-full flex-col overflow-hidden rounded-[6px] border border-line bg-white shadow-sm transition duration-300 hover:border-accent/45 hover:shadow-md"
              href={localizedPath(locale, `/accessories/${product.categorySlug}/${product.slug}`)}
              key={`${product.categorySlug}-${product.slug}`}
            >
              <div className="grid aspect-[4/3] place-items-center border-b border-line bg-[#e9eef4] p-3 transition duration-300">
                <img
                  className="max-h-[98%] max-w-[98%] object-contain drop-shadow-sm transition duration-300 group-hover:scale-[1.03]"
                  src={product.image}
                  alt={product.title[locale]}
                />
              </div>
              <div className="flex min-h-[76px] items-center justify-center px-3 py-4">
                <h3 className="text-center text-base font-bold leading-6 text-ink">{product.title[locale]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
