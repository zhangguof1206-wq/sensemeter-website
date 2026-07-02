import Link from "next/link";
import { PageShell, ProductCard } from "@/components/site";
import { assetPath, products, type Locale, type Product } from "@/data/catalog";
import type { ApplicationPageContent } from "@/data/application-page-content";
import { localizedPath } from "@/lib/i18n";

function IndustrialIcon({ name }: { name: ApplicationPageContent["highlights"][number]["icon"] }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded bg-white text-accent shadow-sm ring-1 ring-line" aria-hidden="true">
      {name === "sensor" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 4h10v6H7z" /><path d="M12 10v10" /><path d="M9 20h6" /><path d="M9 7h6" />
        </svg>
      ) : null}
      {name === "duct" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h18" /><path d="M3 16h18" /><path d="M7 8v8" /><path d="M17 8v8" /><circle cx="12" cy="12" r="2" />
        </svg>
      ) : null}
      {name === "signal" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 18h3" /><path d="M10 18h3" /><path d="M16 18h4" /><path d="M6 18V9" /><path d="M12 18V5" /><path d="M18 18v-7" />
        </svg>
      ) : null}
    </span>
  );
}

export function ApplicationPage({ locale, content }: { locale: Locale; content: ApplicationPageContent }) {
  const recommendedProducts = content.recommendedSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <PageShell locale={locale} active="catalog" languagePath={content.path}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section
        className="bg-cover bg-center px-5 py-20 text-white md:px-10 md:py-24"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(20,31,42,.94), rgba(20,31,42,.56)), url('" + content.heroImage + "')" }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">{content.heroEyebrow}</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">{content.title}</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">{content.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href={localizedPath(locale, "/contact") + "?application=" + content.slug}>{content.primaryButton}</Link>
            <a className="btn btn-secondary" href="#recommended-products">{content.secondaryButton}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow space-y-6">
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <section className="card p-7">
              <p className="eyebrow !text-slate-400">{content.overviewEyebrow}</p>
              <h2 className="text-2xl font-black leading-tight md:text-3xl">{content.overviewTitle}</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">{content.overviewText}</p>
            </section>
            <aside className="card p-7">
              <p className="eyebrow !text-slate-400">RFQ checklist</p>
              <h2 className="text-2xl font-black">{content.rfqTitle}</h2>
              <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 text-sm text-muted">
                {content.rfqPoints.map((item) => <li className="flex gap-2" key={item}><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" /><span>{item}</span></li>)}
              </ul>
            </aside>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {content.highlights.map((item) => <div className="card flex h-full gap-4 p-5" key={item.title}><IndustrialIcon name={item.icon} /><div><h3 className="text-lg font-black leading-tight">{item.title}</h3><p className="mt-2 text-sm text-muted">{item.text}</p></div></div>)}
          </section>

          <section className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="bg-[#17212b] p-7 text-white"><p className="eyebrow">Selection path</p><h2 className="text-2xl font-black">{content.processTitle}</h2></div>
                <div className="grid gap-px bg-line sm:grid-cols-2">
                  {content.processCards.map((item, index) => <div className="bg-white p-5" key={item.title}><span className="grid h-9 w-9 place-items-center rounded bg-accent text-sm font-black text-white">{index + 1}</span><h3 className="mt-4 font-black">{item.title}</h3><p className="mt-2 text-sm text-muted">{item.text}</p></div>)}
                </div>
              </div>
              <div className="border-t border-line bg-white lg:border-l lg:border-t-0">
                <img className="h-56 w-full object-cover" src={assetPath(content.inlineImage)} alt={content.overviewTitle} />
                <div className="p-7"><h2 className="text-2xl font-black">{content.solutionsTitle}</h2><div className="mt-5 grid gap-3">{content.solutionTypes.map((item) => <div className="flex gap-3 rounded border border-line bg-[#f7fafc] p-3 text-sm text-muted" key={item}><span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" /><span>{item}</span></div>)}</div></div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="section bg-[#e9eef4]" id="recommended-products">
        <div className="section-narrow"><p className="eyebrow !text-slate-400">Recommended products</p><h2 className="mb-7 text-3xl font-black">Suitable instruments</h2><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{recommendedProducts.map((product) => <ProductCard key={product.slug} locale={locale} product={product} />)}</div></div>
      </section>

      <section className="section">
        <div className="section-narrow grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="card p-7"><p className="eyebrow !text-slate-400">FAQ</p><h2 className="text-3xl font-black">Common questions</h2><div className="mt-6 divide-y divide-line">{content.faqs.map((item) => <section className="py-5" key={item.question}><h3 className="text-lg font-black">{item.question}</h3><p className="mt-2 text-muted">{item.answer}</p></section>)}</div></article>
          <aside className="card h-fit overflow-hidden"><img className="h-48 w-full object-cover" src={assetPath(content.ctaImage)} alt={content.ctaImageAlt} /><div className="p-7"><h2 className="text-2xl font-black">{content.ctaTitle}</h2><p className="mt-3 text-muted">{content.ctaText}</p><Link className="btn btn-primary mt-5 w-full" href={localizedPath(locale, "/contact") + "?application=" + content.slug}>{content.ctaButton}</Link></div></aside>
        </div>
      </section>
    </PageShell>
  );
}
