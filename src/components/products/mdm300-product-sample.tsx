import Link from "next/link";
import { pdfPath, type Locale, type Product } from "@/data/catalog";
import { getProductApplicationLinks } from "@/data/application-links";
import { mdm300ProductSampleCopy } from "@/data/mdm300-product-sample";
import { getMdm300GallerySlides } from "@/data/mdm300-gallery";
import { localizedPath, t } from "@/lib/i18n";
import { METRICA_GOALS, MetricaTrackedLink } from "@/components/metrica-goals";
import { ProductImageGallery } from "@/components/products/product-image-gallery";

const sectionSpacing = "scroll-mt-64 border-t border-line pt-8 xl:scroll-mt-28";
const headingStyle = "text-2xl font-bold leading-tight text-ink";
const focusStyle = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function Mdm300ProductSample({ locale, product }: { locale: Locale; product: Product }) {
  const c = t(locale);
  const copy = mdm300ProductSampleCopy[locale];
  const quoteHref = `${localizedPath(locale, "/contact")}?model=${encodeURIComponent(product.model)}`;
  const applicationLinks = getProductApplicationLinks(product.slug);

  function PdfLink({ className, children }: { className: string; children: React.ReactNode }) {
    return (
      <MetricaTrackedLink
        className={`${className} ${focusStyle}`}
        href={pdfPath(product.pdf)}
        target="_blank"
        rel="noreferrer"
        goal={METRICA_GOALS.pdfDownload}
        goalParams={{ slug: product.slug, model: product.model }}
      >
        {children}
      </MetricaTrackedLink>
    );
  }

  return (
    <div className="bg-white">
      <section className="px-5 pb-10 pt-6 md:px-10 md:pb-12">
        <div className="section-narrow">
          <nav className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted" aria-label={copy.breadcrumb}>
            <Link className={`py-1 hover:text-accent ${focusStyle}`} href={localizedPath(locale, "/")}>{c.navHome}</Link>
            <span aria-hidden="true">/</span>
            <Link className={`py-1 hover:text-accent ${focusStyle}`} href={localizedPath(locale, "/catalog")}>{c.navCatalog}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink" aria-current="page">MDM300</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="min-w-0 lg:col-start-2 lg:row-start-1">
              <Link className={`inline-flex min-h-8 items-center text-sm font-bold text-accent ${focusStyle}`} href={`${localizedPath(locale, "/catalog")}?category=MICHELL`}>
                {product.brand}
              </Link>
              <h1 className="mt-3 break-words text-[32px] font-bold leading-tight text-steel md:text-4xl">{product.model}</h1>
              <p className="mt-3 text-xl font-semibold leading-7 text-ink">{copy.productType}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{copy.summary}</p>

              <dl className="mt-6 grid grid-cols-2 gap-x-5 border-y border-line py-5">
                {copy.facts.map(fact => (
                  <div className="min-w-0" key={fact.label}>
                    <dt className="text-sm font-semibold text-muted">{fact.label}</dt>
                    <dd className="mt-2 break-words text-xl font-bold leading-7 text-steel">
                      {fact.value}
                      <span className="mt-1 block text-xs font-normal leading-5 text-muted">{fact.condition}</span>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Link className={`btn btn-primary w-full text-center ${focusStyle}`} href={quoteHref}>{c.requestQuote}</Link>
                <PdfLink className="btn btn-outline w-full text-center">{c.downloadPdf}</PdfLink>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{copy.safetyNote}</p>
            </div>

            <figure className="min-w-0 lg:col-start-1 lg:row-start-1">
              <ProductImageGallery slides={getMdm300GallerySlides(locale)} locale={locale} />
              <figcaption className="mx-auto mt-4 max-w-lg space-y-2 text-xs leading-5 text-muted"><p>{copy.galleryNotice}</p><p>{copy.samplingNote}</p></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <nav className="border-y border-line bg-[#f4f7fa] px-5 md:px-10" aria-label={copy.navigation}>
        <div className="section-narrow flex flex-wrap gap-x-7 gap-y-1 py-2">
          {Object.entries(copy.sections).map(([id, label]) => (
            <a className={`inline-flex min-h-11 items-center border-b-2 border-transparent text-sm font-bold hover:border-accent hover:text-accent ${focusStyle}`} href={`#mdm300-${id}`} key={id}>{label}</a>
          ))}
        </div>
      </nav>

      <div className="px-5 py-10 md:px-10 md:py-14">
        <div className="section-narrow grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <article className="min-w-0 space-y-10">
            <section className="scroll-mt-64 xl:scroll-mt-28" id="mdm300-overview">
              <h2 className={headingStyle}>{c.overview}</h2>
              <p className="mt-4 text-base leading-7 text-muted">{product.overview[locale]}</p>
            </section>

            <section className={sectionSpacing} id="mdm300-specifications">
              <h2 className={headingStyle}>{copy.sections.specifications}</h2>
              <table className="mt-5 w-full table-fixed border-collapse text-left text-sm leading-6">
                <thead className="bg-[#f4f7fa] text-steel">
                  <tr><th className="w-2/5 p-3 font-semibold" scope="col">{copy.parameterHeading}</th><th className="p-3 font-semibold" scope="col">{copy.valueHeading}</th></tr>
                </thead>
                <tbody>
                  {copy.specifications.map(row => (
                    <tr className="border-b border-line" key={row.label}>
                      <th className="break-words p-3 align-top font-semibold" scope="row">{row.label}</th>
                      <td className="break-words p-3 align-top text-muted">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className={sectionSpacing} id="mdm300-versions">
              <h2 className={headingStyle}>{copy.sections.versions}</h2>
              <table className="mt-5 w-full table-fixed border-collapse text-left text-sm leading-6">
                <thead className="bg-[#f4f7fa] text-steel">
                  <tr><th className="w-[34%] break-words p-3 font-semibold" scope="col">{copy.parameterHeading}</th><th className="p-3 font-semibold" scope="col">MDM300</th><th className="p-3 font-semibold" scope="col">MDM300 I.S.</th></tr>
                </thead>
                <tbody>
                  {copy.versionRows.map(row => (
                    <tr className="border-b border-line" key={row.label}>
                      <th className="break-words p-3 align-top font-semibold" scope="row">{row.label}</th>
                      <td className="break-words p-3 align-top text-muted">{row.standard}</td>
                      <td className="break-words p-3 align-top text-muted">{row.intrinsicallySafe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm leading-6 text-muted">{copy.conditionsNote}</p>
            </section>

            <section className="border-t border-line pt-8">
              <h2 className={headingStyle}>{c.applications}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-muted">
                {product.applications[locale].map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </article>

          <aside className="min-w-0 space-y-10 lg:border-l lg:border-line lg:pl-8">
            <section>
              <h2 className={headingStyle}>{c.highlights}</h2>
              <ul className="mt-4 space-y-4 text-sm leading-6 text-muted">
                {product.highlights[locale].map(item => <li className="border-l-2 border-line pl-4" key={item}>{item}</li>)}
              </ul>
            </section>
            <section className={sectionSpacing} id="mdm300-selection">
              <h2 className={headingStyle}>{copy.sections.selection}</h2>
              <ul className="mt-4 list-disc space-y-4 pl-5 text-sm leading-6 text-muted">
                {product.selectionInputs?.[locale].map(item => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </aside>
        </div>

        <section className={`section-narrow mt-12 ${sectionSpacing}`} id="mdm300-documents">
          <h2 className={headingStyle}>{copy.sections.documents}</h2>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-5 border-b border-line pb-6">
            <div className="min-w-0"><p className="font-semibold">{copy.documentTitle}</p><p className="mt-1 text-sm text-muted">{copy.documentMeta}</p></div>
            <PdfLink className="btn btn-primary w-full sm:w-auto">{c.downloadPdf}</PdfLink>
          </div>
        </section>

        <section className="section-narrow mt-12 border-t border-line pt-8">
          <h2 className={headingStyle}>{c.relatedApplications}</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {applicationLinks.map(link => (
              <Link className={`border-l-2 border-accent py-1 pl-5 hover:text-accent ${focusStyle}`} href={localizedPath(locale, link.path)} key={link.path}>
                <span className="block font-semibold">{link.title[locale]}</span>
                <span className="mt-2 block text-sm leading-6 text-muted">{link.description[locale]}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
