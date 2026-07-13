import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryProductCard } from "./accessory-cards";
import { AccessoryPageHeading } from "./accessory-page-heading";
import { AccessoryServiceBand } from "./accessories-index-page";

export function AccessoryCategoryPage({ category, products, locale }: { category: AccessoryCategory; products: AccessoryProduct[]; locale: Locale }) {
  const c = accessoryCopy[locale];
  const path = `/accessories/${category.slug}`;
  return (
    <PageShell locale={locale} active="accessories" languagePath={localizedPath(oppositeLocale(locale), path)}>
      <AccessoryPageHeading title={category.title[locale]} lead={category.intro[locale]} image={category.image} />
      <section className="section">
        <div className="section-narrow">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-black">{c.availableTitle}</h2>
            <Link className="btn btn-outline" href={localizedPath(locale, "/accessories")}>{c.backOverview}</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <AccessoryProductCard product={product} locale={locale} key={product.slug} />)}
          </div>
        </div>
      </section>
      <AccessoryServiceBand locale={locale} />
    </PageShell>
  );
}
