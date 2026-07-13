import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryPageHeading } from "./accessory-page-heading";
import { accessoryBreadcrumbJsonLd } from "@/lib/seo";

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-black">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => <li className="rounded border border-line bg-[#f7fafc] px-4 py-3 leading-6" key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export function AccessoryDetailPage({ category, product, locale }: { category: AccessoryCategory; product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${category.slug}/${product.slug}`;
  const rfqHref = localizedPath(locale, "/contact") + `?accessory=${encodeURIComponent(product.title[locale])}`;
  const structuredData = accessoryBreadcrumbJsonLd(locale, category, product);
  return (
    <PageShell locale={locale} active="accessories" languagePath={localizedPath(oppositeLocale(locale), path)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <AccessoryPageHeading title={product.title[locale]} lead={product.summary[locale]} image={product.image} />
      <section className="section">
        <div className="section-narrow grid gap-8 lg:grid-cols-[1fr_380px]">
          <article className="card p-6 md:p-8">
            <DetailList title={c.selectionTitle} items={product.selection[locale]} />
            <DetailList title={c.compatibleTitle} items={product.compatibleWith[locale]} />
            <section>
              <h2 className="text-2xl font-black">{c.customizationTitle}</h2>
              <p className="mt-4 text-lg leading-8 text-muted">{product.customization[locale]}</p>
            </section>
          </article>
          <aside className="card h-fit overflow-hidden">
            <div className="grid aspect-square place-items-center bg-[#eef2f5] p-5">
              <img className="h-full w-full object-contain" src={product.image} alt={product.title[locale]} />
            </div>
            <div className="p-6">
              <p className="text-sm leading-6 text-muted">{c.imageDisclaimer}</p>
              <div className="mt-5 grid gap-3">
                <Link className="btn btn-primary" href={rfqHref}>{c.requestAccessory}</Link>
                <Link className="btn btn-outline" href={localizedPath(locale, `/accessories/${category.slug}`)}>{c.backCategory}</Link>
                <Link className="btn btn-outline" href={localizedPath(locale, "/accessories")}>{c.backOverview}</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="bg-steel px-5 py-10 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black">{c.serviceTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-200">{c.serviceText}</p>
        </div>
      </section>
    </PageShell>
  );
}
