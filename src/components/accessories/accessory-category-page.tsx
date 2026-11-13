import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryProductCard } from "./accessory-cards";
import { AccessoryPageHeading } from "./accessory-page-heading";
import { AccessorySpecTable } from "./accessory-specs";
import { getAccessoryCategoryImage } from "@/data/accessory-images";

export function AccessoryCategoryPage({ category, products, locale }: { category: AccessoryCategory; products: AccessoryProduct[]; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${category.slug}`;
  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), path)}>
      <AccessoryPageHeading eyebrow={c.nav} title={category.title[locale]} lead={category.intro[locale]} image={getAccessoryCategoryImage(category)} actionHref={localizedPath(locale, "/accessories")} actionLabel={c.backOverview} />
      <section className="section">
        <div className="section-narrow">
          <h2 className="mb-7 text-2xl font-bold text-steel">{c.availableTitle}</h2>
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3" data-accessory-products>
            {products.map((product) => <AccessoryProductCard product={product} locale={locale} key={product.slug} />)}
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-[#f4f7fa] px-5 py-10 md:px-10 md:py-12" id="accessory-technical-information">
        <div className="section-narrow space-y-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-12">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-steel">{c.categoryRangeTitle}</h2>
              <p className="mt-4 leading-7 text-muted">{category.summary[locale]}</p>
            </div>
            <AccessorySpecTable specs={category.specs} locale={locale} />
          </div>
          <div className="border-t border-line pt-8">
            <h2 className="text-2xl font-bold text-steel">{category.technicalNotes.title[locale]}</h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {category.technicalNotes.items.map((item) => (
                <article className="min-w-0 border-l-2 border-accent pl-5" key={item.title[locale]}>
                  <h3 className="break-words text-lg font-bold leading-7 text-ink">{item.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text[locale]}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="border-t border-line pt-8">
            <h2 className="text-2xl font-bold text-steel">{c.selectionTitle}</h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
              {category.requestItems[locale].map((item) => (
                <li className="min-w-0 border-l-2 border-accent px-4 py-2 text-sm font-semibold text-ink" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
