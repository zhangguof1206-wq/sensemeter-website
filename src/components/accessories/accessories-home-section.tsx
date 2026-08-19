import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { homeAccessoryProducts } from "@/data/home-accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";

export function AccessoriesHomeSection({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <section className="section bg-[#f1f4f6]">
      <div className="section-narrow home-section-reveal grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start lg:gap-16">
        <div className="max-w-xl lg:sticky lg:top-28">
          <p className="home-editorial-eyebrow">{c.nav}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{c.homeTitle}</h2>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{c.homeLead}</p>
          <Link
            className="accessory-text-link mt-7 inline-flex border-b border-slate-400 pb-1 text-sm font-bold text-[#173963]"
            href={localizedPath(locale, "/accessories")}
          >
            {c.overviewTitle}&nbsp; →
          </Link>
        </div>
        <div className="home-accessory-matrix grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
          {homeAccessoryProducts.map((product) => (
            <Link
              className="home-accessory-entry group flex min-h-[230px] flex-col border-b border-r border-line bg-white/35 p-4 sm:p-5"
              href={localizedPath(locale, `/accessories/${product.categorySlug}/${product.slug}`)}
              key={`${product.categorySlug}-${product.slug}`}
            >
              <div className="grid h-36 place-items-center p-1">
                <img
                  className="h-full w-full object-contain mix-blend-multiply"
                  src={product.image}
                  alt={product.title[locale]}
                />
              </div>
              <h3 className="mt-5 text-sm font-bold leading-6 text-ink sm:text-base">{product.title[locale]}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
