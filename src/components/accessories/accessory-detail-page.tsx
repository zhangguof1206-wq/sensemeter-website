import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { getAccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { accessoryBreadcrumbJsonLd } from "@/lib/seo";
import { AccessoryPageHeading } from "./accessory-page-heading";
import { AccessoryProductCard } from "./accessory-cards";
import { AccessorySpecTable } from "./accessory-specs";

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="text-2xl font-black">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <li className="border-l-2 border-accent bg-[#f7fafc] px-4 py-3 leading-6" key={item}>
            <span className="mr-2 text-sm font-black text-accent">{String(index + 1).padStart(2, "0")}</span>{item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AccessoryDetailPage({ category, product, locale }: { category: AccessoryCategory; product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${category.slug}/${product.slug}`;
  const rfqHref = localizedPath(locale, "/contact") + `?accessory=${encodeURIComponent(`${product.model} ${product.title[locale]}`)}`;
  const structuredData = accessoryBreadcrumbJsonLd(locale, category, product);
  const relatedProducts = product.relatedSlugs
    .map((slug) => getAccessoryProduct(category.slug, slug))
    .filter((item): item is AccessoryProduct => Boolean(item))
    .slice(0, 3);

  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), path)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <AccessoryPageHeading
        eyebrow={product.model}
        title={product.title[locale]}
        lead={product.summary[locale]}
        image={product.image}
        actionHref={rfqHref}
        actionLabel={c.requestAccessory}
      />
      <section className="section">
        <div className="section-narrow grid gap-8 lg:grid-cols-[380px_1fr]">
          <aside className="card h-fit overflow-hidden lg:sticky lg:top-32">
            <div className="grid aspect-square place-items-center bg-[#eef2f5] p-5">
              <img className="h-full w-full object-contain" src={product.image} alt={product.title[locale]} />
            </div>
            <div className="p-6">
              <p className="text-xs font-black uppercase text-accent">{product.model}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{c.imageDisclaimer}</p>
              <div className="mt-5 grid gap-3">
                <Link className="btn btn-primary" href={rfqHref}>{c.requestAccessory}</Link>
                <Link className="btn btn-outline" href={localizedPath(locale, `/accessories/${category.slug}`)}>{c.backCategory}</Link>
              </div>
            </div>
          </aside>

          <article className="grid gap-10">
            <section className="card p-6 md:p-8">
              <h2 className="text-2xl font-black">{c.specificationsTitle}</h2>
              <div className="mt-5">
                <AccessorySpecTable specs={product.specs} locale={locale} />
              </div>
            </section>
            <DetailList title={c.informationTitle} items={product.selection[locale]} />
            <DetailList title={c.applicationsTitle} items={product.applications[locale]} />
            <section className="border-y border-line py-7">
              <h2 className="text-2xl font-black">{c.customizationTitle}</h2>
              <p className="mt-4 text-lg leading-8 text-muted">{product.customization[locale]}</p>
            </section>
          </article>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="border-t border-line bg-[#eef2f5] px-5 py-12 md:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-black">{c.relatedTitle}</h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => <AccessoryProductCard product={item} locale={locale} key={item.slug} />)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-steel px-5 py-10 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black">{c.serviceTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-200">{c.serviceText}</p>
        </div>
      </section>
    </PageShell>
  );
}
