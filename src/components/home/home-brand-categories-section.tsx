import Link from "next/link";
import { assetPath, categories, type Locale } from "@/data/catalog";
import { localizedPath, t } from "@/lib/i18n";

export function HomeBrandCategoriesSection({ locale }: { locale: Locale }) {
  const c = t(locale);

  return (
    <section className="section bg-white">
      <div className="section-narrow home-section-reveal">
        <div className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] lg:items-end lg:gap-16" data-home-reveal>
          <div>
            <p className="home-editorial-eyebrow">{c.categoriesTitle}</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{c.categoriesHeading}</h2>
          </div>
          <p className="text-base leading-7 text-muted sm:text-lg">{c.categoriesLead}</p>
        </div>

        <div className="home-brand-grid grid border-t border-line lg:grid-cols-2">
          {categories.map((category, index) => (
            <Link
              className={`home-brand-entry home-reveal-delay-${index % 2} group grid min-h-[240px] grid-cols-[minmax(0,1fr)_110px] items-center gap-4 overflow-hidden border-b border-line px-0 py-8 sm:grid-cols-[minmax(0,1fr)_190px] sm:gap-8 sm:px-8 ${
                index % 2 === 0 ? "lg:border-r lg:pl-0 lg:pr-10" : "lg:pl-10 lg:pr-0"
              }`}
              data-home-reveal
              href={`${localizedPath(locale, "/catalog")}?category=${category.id}`}
              key={category.id}
            >
              <img
                className="brand-instrument-background col-start-2 row-start-1 h-40 w-full object-contain object-right opacity-75 sm:h-48"
                src={assetPath(category.backgroundImage)}
                alt=""
                aria-hidden="true"
              />
              <div className="col-start-1 row-start-1 min-w-0">
                <img
                  className="brand-logo h-14 w-40 object-contain object-left mix-blend-multiply"
                  src={assetPath(category.image)}
                  alt={`${category.title} logo`}
                />
                <h3 className="mt-6 text-xl font-bold">{category.title}</h3>
                <p className="mt-2 leading-7 text-muted">{category.description[locale]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
