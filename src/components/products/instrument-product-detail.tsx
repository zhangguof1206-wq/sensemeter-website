import Link from "next/link";
import { assetPath, pdfPath, type Locale, type Product } from "@/data/catalog";
import { getProductApplicationLinks } from "@/data/application-links";
import { getInstrumentDetails } from "@/data/product-details";
import { getInstrumentSpecifications } from "@/data/instrument-specifications";
import { getMdm300GallerySlides } from "@/data/mdm300-gallery";
import { localizedPath, t } from "@/lib/i18n";
import { METRICA_GOALS, MetricaTrackedLink } from "@/components/metrica-goals";
import { DetailHero, DetailNavigation, DetailSection, DetailSpecTable, DetailList, detailFocus, detailHeading } from "./detail-layout";
import { ProductVisual } from "./product-visual";
import { InstrumentSpecifications } from "./instrument-specifications";

export function InstrumentProductDetail({ locale, product }: { locale: Locale; product: Product }) {
  const c = t(locale);
  const copy = getInstrumentDetails(locale, product);
  const specifications = getInstrumentSpecifications(product.slug, locale);
  const id = (section: string) => `${product.slug}-${section}`;
  const sections = [
    { id: id("overview"), label: copy.sections.overview },
    { id: id("specifications"), label: copy.sections.specifications },
    ...(copy.versionRows ? [{ id: id("versions"), label: copy.sections.versions }] : []),
    { id: id("applications"), label: c.applications },
    { id: id("documents"), label: copy.sections.documents }
  ];
  const applicationLinks = getProductApplicationLinks(product.slug);
  const quoteHref = `${localizedPath(locale, "/contact")}?model=${encodeURIComponent(product.model)}`;

  return (
    <div className="bg-white">
      <DetailHero
        locale={locale}
        breadcrumbs={[{ label: c.navHome, href: localizedPath(locale, "/") }, { label: c.navCatalog, href: localizedPath(locale, "/catalog") }, { label: product.model }]}
        eyebrow={{ label: product.brand, href: `${localizedPath(locale, "/catalog")}?category=${product.category}` }}
        title={product.model}
        subtitle={copy.productType}
        summary={copy.summary}
        facts={copy.facts}
        actions={<><Link className={`btn btn-primary w-full text-center ${detailFocus}`} href={quoteHref}>{c.requestQuote}</Link><a className={`btn btn-outline w-full text-center ${detailFocus}`} href={`#${id("specifications")}`}>{copy.sections.specifications}</a></>}
        media={<ProductVisual src={assetPath(product.image)} alt={product.model} locale={locale} slides={product.slug === "mdm300" ? getMdm300GallerySlides(locale) : undefined} />}
        note={copy.safetyNote}
      />
      <DetailNavigation locale={locale} sections={sections} />
      <div className="px-5 py-10 md:px-10 md:py-14">
        <div className="section-narrow grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <article className="min-w-0 space-y-10">
            <DetailSection id={id("overview")} title={c.overview} className="border-t-0 pt-0">
              <p className="mt-4 text-base leading-7 text-muted">{product.overview[locale]}</p>
            </DetailSection>
            <DetailSection id={id("specifications")} title={copy.sections.specifications}>
              {specifications ? <InstrumentSpecifications locale={locale} specifications={specifications} /> : <DetailSpecTable locale={locale} rows={copy.specifications} />}
            </DetailSection>
            {copy.versionRows ? (
              <DetailSection id={id("versions")} title={copy.sections.versions}>
                <table className="mt-5 w-full table-fixed border-collapse text-left text-sm leading-6">
                  <thead className="bg-[#f4f7fa] text-steel"><tr><th className="w-[34%] break-words p-3 font-semibold" scope="col">{locale === "ru" ? "Параметр" : "Parameter"}</th><th className="p-3 font-semibold" scope="col">MDM300</th><th className="p-3 font-semibold" scope="col">MDM300 I.S.</th></tr></thead>
                  <tbody>{copy.versionRows.map(row => <tr className="border-b border-line [&>*]:[overflow-wrap:anywhere]" key={row.label}><th className="break-words p-3 align-top font-semibold" scope="row">{row.label}</th><td className="break-words p-3 align-top text-muted">{row.standard}</td><td className="break-words p-3 align-top text-muted">{row.intrinsicallySafe}</td></tr>)}</tbody>
                </table>
              </DetailSection>
            ) : null}
            <DetailSection id={id("applications")} title={c.applications}><DetailList items={product.applications[locale]} /></DetailSection>
          </article>
          <aside className="min-w-0 space-y-10 lg:border-l lg:border-line lg:pl-8">
            <DetailSection title={c.highlights} className="border-t-0 pt-0"><DetailList items={product.highlights[locale]} /></DetailSection>
            <DetailSection id={id("selection")} title={copy.sections.selection}>
              <DetailList items={copy.selectionInputs} />
              {copy.samplingNote ? <p className="mt-4 text-sm leading-6 text-muted">{copy.samplingNote}</p> : null}
            </DetailSection>
          </aside>
        </div>
        <div className="section-narrow mt-12">
          <DetailSection id={id("documents")} title={copy.sections.documents}>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6">
              <div className="min-w-0"><p className="font-semibold">{copy.documentTitle}</p><p className="mt-1 text-sm text-muted">{copy.documentMeta}</p></div>
              <MetricaTrackedLink className={`btn btn-primary w-full sm:w-auto ${detailFocus}`} href={pdfPath(product.pdf)} target="_blank" rel="noreferrer" goal={METRICA_GOALS.pdfDownload} goalParams={{ slug: product.slug, model: product.model }}>{copy.downloadLabel ?? c.downloadPdf}</MetricaTrackedLink>
            </div>
          </DetailSection>
        </div>
        {applicationLinks.length ? (
          <section className="section-narrow mt-12 border-t border-line pt-8">
            <h2 className={detailHeading}>{c.relatedApplications}</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">{applicationLinks.map(link => <Link className={`border-l-2 border-accent py-1 pl-5 hover:text-accent ${detailFocus}`} href={localizedPath(locale, link.path)} key={link.path}><span className="block font-semibold">{link.title[locale]}</span><span className="mt-2 block text-sm leading-6 text-muted">{link.description[locale]}</span></Link>)}</div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
