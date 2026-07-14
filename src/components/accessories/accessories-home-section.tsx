import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { homeAccessoryProducts } from "@/data/home-accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";

export function AccessoriesHomeSection({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <section className="section bg-[#e9eef4]">
      <div className="section-narrow">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow !text-slate-500">{c.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black">{c.homeTitle}</h2>
          <p className="mt-3 text-lg leading-8 text-muted">{c.homeLead}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-3">
          {homeAccessoryProducts.map((product) => (
            <Link
              className="group block"
              href={localizedPath(locale, `/accessories/${product.categorySlug}/${product.slug}`)}
              key={`${product.categorySlug}-${product.slug}`}
            >
              <div className="grid aspect-[4/3] place-items-center border border-line bg-white p-4 shadow-sm transition group-hover:border-accent/50 group-hover:shadow-md">
                <img
                  className="max-h-[92%] max-w-[92%] object-contain transition duration-300 group-hover:scale-[1.03]"
                  src={product.image}
                  alt={product.title[locale]}
                />
              </div>
              <h3 className="mt-3 text-center text-base font-bold leading-6 text-ink">{product.title[locale]}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
