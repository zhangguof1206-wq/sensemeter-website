import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryProductCard } from "./accessory-cards";
import { AccessoryPageHeading } from "./accessory-page-heading";
import { AccessorySpecTable } from "./accessory-specs";

export function AccessoryCategoryPage({ category, products, locale }: { category: AccessoryCategory; products: AccessoryProduct[]; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${category.slug}`;
  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), path)}>
      <AccessoryPageHeading eyebrow={c.availableTitle} title={category.title[locale]} lead={category.intro[locale]} image={category.image} />
      <section className="section">
        <div className="section-narrow">
          <div className="mb-10 grid gap-6 border-y border-line py-7 lg:grid-cols-[260px_1fr]">
            <div>
              <p className="eyebrow !text-slate-500">{c.categoryRangeTitle}</p>
              <p className="mt-3 leading-7 text-muted">{category.summary[locale]}</p>
            </div>
            <AccessorySpecTable specs={category.specs} locale={locale} />
          </div>
          <div className="mb-10 grid gap-5 lg:grid-cols-[260px_1fr]">
            <div>
              <p className="eyebrow !text-slate-500">{c.specificationsTitle}</p>
              <h2 className="mt-3 text-2xl font-black text-ink">{category.technicalNotes.title[locale]}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {category.technicalNotes.items.map((item) => (
                <article className="border border-line bg-white p-5 shadow-sm" key={item.title[locale]}>
                  <h3 className="text-lg font-black leading-6 text-ink">{item.title[locale]}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{item.text[locale]}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mb-12 border-y border-line py-6">
            <h2 className="text-2xl font-black text-ink">{c.selectionTitle}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.requestItems[locale].map((item, index) => (
                <li className="border-l-2 border-accent bg-white px-4 py-3 text-sm font-bold text-ink shadow-sm" key={item}>
                  <span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-black">{c.availableTitle}</h2>
            <Link className="btn btn-outline" href={localizedPath(locale, "/accessories")}>{c.backOverview}</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <AccessoryProductCard product={product} locale={locale} key={product.slug} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
