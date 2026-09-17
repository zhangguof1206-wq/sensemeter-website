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
        <div className="max-w-xl lg:sticky lg:top-28" data-home-reveal>
          <p className="home-editorial-eyebrow">{c.nav}</p>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{c.homeTitle}</h2>
          <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{c.homeLead}</p>
          <Link
            className="btn btn-primary mt-7 w-fit"
            href={localizedPath(locale, "/accessories")}
          >
            {c.overviewTitle}<span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-accessory-matrix grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
          {homeAccessoryProducts.map((product, index) => (
            <Link
              className={`home-accessory-entry home-reveal-delay-${index % 3} group flex min-h-[248px] flex-col border-b border-r border-line bg-white/35`}
              data-home-reveal
              href={localizedPath(locale, `/accessories/${product.categorySlug}/${product.slug}`)}
              key={`${product.categorySlug}-${product.slug}`}
            >
              <div className="home-accessory-image relative h-40 overflow-hidden bg-[#e9eef3] shrink-0">
                <img
                  className="absolute inset-0 block h-full w-full object-cover mix-blend-multiply"
                  src={product.image}
                  alt={product.title[locale]}
                />
              </div>
              <div className="home-accessory-copy relative z-10 flex min-h-20 flex-1 items-start border-t border-line bg-white px-4 py-4 sm:px-5">
                <h3 className="text-sm font-bold leading-6 text-ink sm:text-base">{product.title[locale]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
