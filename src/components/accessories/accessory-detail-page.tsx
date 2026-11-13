import Link from "next/link";
import type { Locale } from "@/data/catalog";
import type { AccessoryCategory, AccessoryProduct } from "@/data/accessories";
import { getAccessoryProduct } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale, t } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { accessoryBreadcrumbJsonLd } from "@/lib/seo";
import {
  DetailHero,
  DetailList,
  DetailNavigation,
  DetailSection,
  DetailSpecTable,
  detailFocus,
  detailHeading
} from "@/components/products/detail-layout";
import { ProductVisual } from "@/components/products/product-visual";
import { getAccessoryProductImage } from "@/data/accessory-images";
import { AccessoryProductCard } from "./accessory-cards";

export function AccessoryDetailPage({ category, product, locale }: { category: AccessoryCategory; product: AccessoryProduct; locale: Locale }) {
  const c = accessoryCopy[locale];
  const siteCopy = t(locale);
  const path = `/accessories/${category.slug}/${product.slug}`;
  const categoryHref = localizedPath(locale, `/accessories/${category.slug}`);
  const rfqHref = localizedPath(locale, "/contact") + `?accessory=${encodeURIComponent(`${product.model} ${product.title[locale]}`)}`;
  const structuredData = accessoryBreadcrumbJsonLd(locale, category, product);
  const specifications = product.specs.map(spec => ({ label: spec.label[locale], value: spec.value[locale] }));
  const hasApplications = product.applications[locale].length > 0;
  const hasCompatibility = product.compatibleWith[locale].length > 0;
  const hasCustomization = Boolean(product.customization[locale]);
  const sections = [
    { id: "accessory-overview", label: siteCopy.overview },
    { id: "accessory-specifications", label: c.specificationsTitle },
    ...(hasApplications ? [{ id: "accessory-applications", label: c.applicationsTitle }] : []),
    { id: "accessory-selection", label: c.informationTitle },
    ...(hasCompatibility ? [{ id: "accessory-compatibility", label: c.compatibleTitle }] : []),
    ...(hasCustomization ? [{ id: "accessory-customization", label: c.customizationTitle }] : [])
  ];
  const relatedProducts = product.relatedSlugs
    .map((slug) => getAccessoryProduct(category.slug, slug))
    .filter((item): item is AccessoryProduct => Boolean(item))
    .slice(0, 3);

  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), path)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="bg-white">
        <DetailHero
          locale={locale}
          breadcrumbs={[
            { label: siteCopy.navHome, href: localizedPath(locale, "/") },
            { label: c.nav, href: localizedPath(locale, "/accessories") },
            { label: category.title[locale], href: categoryHref },
            { label: product.model }
          ]}
          eyebrow={{ label: category.title[locale], href: categoryHref }}
          title={product.model}
          subtitle={product.title[locale]}
          summary={product.summary[locale]}
          facts={specifications.slice(0, 2)}
          actions={(
            <>
              <Link className={`btn btn-primary w-full text-center ${detailFocus}`} href={rfqHref}>{c.requestAccessory}</Link>
              <Link className={`btn btn-outline w-full text-center ${detailFocus}`} href={categoryHref}>{c.backCategory}</Link>
            </>
          )}
          media={<ProductVisual src={getAccessoryProductImage(product.image)} alt={product.title[locale]} locale={locale} background="bg-white" />}
        />
        <DetailNavigation locale={locale} sections={sections} />

        <div className="px-5 py-10 md:px-10 md:py-14">
          <div className="section-narrow grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
            <article className="min-w-0 space-y-10">
              <DetailSection id="accessory-overview" title={siteCopy.overview}>
                <p className="mt-4 text-base leading-7 text-muted">{product.summary[locale]}</p>
              </DetailSection>
              <DetailSection id="accessory-specifications" title={c.specificationsTitle}>
                <DetailSpecTable locale={locale} rows={specifications} />
              </DetailSection>
              {hasApplications ? (
                <DetailSection id="accessory-applications" title={c.applicationsTitle}>
                  <DetailList items={product.applications[locale]} />
                </DetailSection>
              ) : null}
            </article>

            <aside className="min-w-0 space-y-10 lg:border-l lg:border-line lg:pl-8">
              <DetailSection id="accessory-selection" title={c.informationTitle}>
                <DetailList items={product.selection[locale]} />
                <p className="mt-4 text-sm leading-6 text-muted">{c.imageDisclaimer}</p>
              </DetailSection>
              {hasCompatibility ? (
                <DetailSection id="accessory-compatibility" title={c.compatibleTitle}>
                  <DetailList items={product.compatibleWith[locale]} />
                </DetailSection>
              ) : null}
              {hasCustomization ? (
                <DetailSection id="accessory-customization" title={c.customizationTitle}>
                  <p className="mt-4 text-sm leading-6 text-muted">{product.customization[locale]}</p>
                </DetailSection>
              ) : null}
            </aside>
          </div>
        </div>
      </div>

      {relatedProducts.length ? (
        <section className="border-t border-line bg-[#eef2f5] px-5 py-12 md:px-10">
          <div className="mx-auto max-w-7xl">
            <h2 className={detailHeading}>{c.relatedTitle}</h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => <AccessoryProductCard product={item} locale={locale} key={item.slug} />)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-steel px-5 py-10 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold leading-tight">{c.serviceTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-200">{c.serviceText}</p>
        </div>
      </section>
    </PageShell>
  );
}
