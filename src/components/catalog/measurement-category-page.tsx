import Link from "next/link";
import { PageShell } from "@/components/site";
import { applicationPages } from "@/data/applications";
import { assetPath, findProduct, type Locale } from "@/data/catalog";
import type { MeasurementCategory } from "@/data/measurement-categories";
import { localizedPath, oppositeLocale, t } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export function MeasurementCategoryPage({ category, locale }: { category: MeasurementCategory; locale: Locale }) {
  const copy = category[locale];
  const labels = t(locale);
  const catalogLabel = locale === "ru" ? "Каталог" : "Product Catalog";
  const productCount = category.productGroups.reduce((count, group) => count + group.slugs.length, 0);
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "ru" ? "Главная" : "Home", item: absoluteUrl(localizedPath(locale, "/")) },
      { "@type": "ListItem", position: 2, name: catalogLabel, item: absoluteUrl(localizedPath(locale, "/catalog")) },
      { "@type": "ListItem", position: 3, name: category.navLabel[locale], item: absoluteUrl(localizedPath(locale, category.path)) }
    ]
  };

  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), category.path)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
      <header className="border-b border-line bg-white px-[18px] py-7 md:px-10 md:py-9">
        <div className="section-narrow">
          <nav aria-label={locale === "ru" ? "Навигационная цепочка" : "Breadcrumb"} className="mb-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
            <Link className="hover:text-accent" href={localizedPath(locale, "/")}>{locale === "ru" ? "Главная" : "Home"}</Link>
            <span aria-hidden="true">/</span>
            <Link className="hover:text-accent" href={localizedPath(locale, "/catalog")}>{catalogLabel}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">{category.navLabel[locale]}</span>
          </nav>
          <h1 className="max-w-4xl break-words text-[28px] font-bold leading-tight text-ink md:text-[36px]">{copy.h1}</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted">{copy.intro}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm font-semibold text-muted">{productCount} {locale === "ru" ? "приборов" : "instruments"}</span>
            <Link className="btn btn-primary text-center" href={localizedPath(locale, category.contactPath)}>{copy.ctaLabel}</Link>
          </div>
        </div>
      </header>

      <section className="section !py-7">
        <div className="section-narrow">
          <nav aria-label={locale === "ru" ? "Типы приборов" : "Instrument Types"} className="mb-8 flex flex-wrap gap-x-7 gap-y-2 border-b border-line pb-4">
            {category.productGroups.map(group => (
              <a className="border-b-2 border-accent py-2 text-sm font-bold text-ink hover:text-accent" href={`#${group.id}`} key={group.id}>{group.label[locale]}</a>
            ))}
          </nav>
          {category.productGroups.map(group => (
            <section className="mb-10 scroll-mt-52" id={group.id} key={group.id}>
              <h2 className="mb-5 text-2xl font-bold text-ink">{group.label[locale]}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.slugs.map(slug => {
                  const product = findProduct(slug);
                  if (!product) return null;
                  const href = localizedPath(locale, `/products/${slug}`);
                  return (
                    <article className="card flex h-full min-w-0 flex-col overflow-hidden !shadow-sm" data-product-slug={slug} key={slug}>
                      <Link aria-label={`${labels.details}: ${product.model}`} className="grid h-44 shrink-0 place-items-center border-b border-line bg-white p-5" href={href}>
                        <img alt={product.model} className="h-32 w-full object-contain" height={160} src={assetPath(product.image)} width={280} />
                      </Link>
                      <div className="flex flex-1 flex-col p-5">
                        <p className="mb-2 text-xs font-bold uppercase text-emerald-700">{product.brand}</p>
                        <h3 className="break-words text-lg font-bold leading-6 text-ink"><Link className="hover:text-accent" href={href}>{product.model}</Link></h3>
                        <p className="mb-5 mt-3 text-sm leading-6 text-muted">{category.cardPurposes[slug][locale]}</p>
                        <Link className="btn btn-primary mt-auto text-center" href={href}>{labels.details}<span className="sr-only">: {product.model}</span></Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="section border-y border-line bg-white !py-9">
        <div className="section-narrow grid gap-9 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-ink">{copy.selectionHeading}</h2>
            <ul className="mt-5 space-y-3 pl-5 text-muted [&>li]:list-disc">
              {copy.selectionItems.map(item => <li className="pl-1 leading-7" key={item}>{item}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-ink">{locale === "ru" ? "Области применения" : "Related Applications"}</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {category.relatedApplicationPaths.map(path => {
                const application = applicationPages.find(page => page.path === path);
                return application ? <li key={path}><Link className="block py-4 font-semibold leading-7 text-ink hover:text-accent" href={localizedPath(locale, path)}>{application.content[locale].title}</Link></li> : null;
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="section !py-10">
        <div className="section-narrow">
          <h2 className="mb-5 text-2xl font-bold text-ink">{locale === "ru" ? "Частые вопросы" : "Frequently Asked Questions"}</h2>
          <div className="divide-y divide-line border-y border-line">
            {copy.faq.map(faq => (
              <details className="group py-4" key={faq.question}>
                <summary className="cursor-pointer py-1 pr-3 font-bold leading-7 text-ink marker:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">{faq.question}</summary>
                <p className="mt-3 max-w-4xl leading-7 text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
            <Link className="font-semibold text-ink underline decoration-line underline-offset-4 hover:text-accent" href={localizedPath(locale, "/catalog")}>{labels.backCatalog}</Link>
            <Link className="btn btn-primary text-center" href={localizedPath(locale, category.contactPath)}>{copy.ctaLabel}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
