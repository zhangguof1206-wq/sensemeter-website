import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  applicationScenes,
  assetPath,
  categories,
  findProduct,
  pdfPath,
  products,
  type CategoryId,
  type Locale,
  type Product
} from "@/data/catalog";
import { localizedPath, oppositeLocale, t } from "@/lib/i18n";
import { legalCopy, type LegalPageKey } from "@/lib/legal";
import { CookieBanner } from "@/components/cookie-banner";
import { RfqForm } from "@/components/rfq-form";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

const TELEGRAM_URL = "https://t.me/Sensemeter";

type ShellProps = {
  locale: Locale;
  active: "home" | "catalog" | "about" | "contact" | "privacy";
  children: ReactNode;
  languagePath?: string;
};

export function PageShell({ locale, active, children, languagePath }: ShellProps) {
  const c = t(locale);
  const opposite = oppositeLocale(locale);
  const switchHref = languagePath || localizedPath(opposite, "/");

  const nav = [
    ["home", c.navHome, localizedPath(locale, "/")],
    ["catalog", c.navCatalog, localizedPath(locale, "/catalog")],
    ["about", c.navAbout, localizedPath(locale, "/about")],
    ["contact", c.navContact, localizedPath(locale, "/contact")],
    ["privacy", c.navPrivacy, localizedPath(locale, "/privacy")]
  ] as const;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b-[3px] border-accent bg-steel px-5 py-3 text-white shadow-lg md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-3 xl:grid-cols-[auto_1fr_auto]">
          <Link className="flex min-w-[210px] items-center gap-3" href={localizedPath(locale, "/")}>
            <img className="h-11 w-11 rounded-full bg-white object-contain p-0.5" src="/logo-header.png" alt={c.brand} />
            <span>
              <strong className="block text-base leading-tight">{c.brand}</strong>
              <small className="block text-xs text-slate-200">{c.brandLine}</small>
            </span>
          </Link>

          <nav className="flex flex-wrap gap-1 xl:justify-center" aria-label="Primary navigation">
            {nav.map(([key, label, href]) => (
              <Link
                key={key}
                className={`rounded px-2.5 py-2 text-sm transition hover:bg-white/10 ${active === key ? "bg-white/10" : ""}`}
                href={href}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <form className="flex min-w-[220px] flex-1 gap-2" action={localizedPath(locale, "/catalog")}>
              <button className="grid h-10 w-11 place-items-center rounded bg-accent font-bold" type="submit" aria-label={c.searchButton}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <circle cx="11" cy="11" r="6" />
                  <path d="M16 16l5 5" />
                </svg>
              </button>
              <input
                className="min-w-0 flex-1 rounded border border-white/20 bg-white px-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-white focus:ring-2 focus:ring-accent/40"
                name="q"
                type="search"
                placeholder={c.searchPlaceholder}
              />
            </form>
            <div className="flex overflow-hidden rounded border border-white/25">
              <Link className={`px-3 py-2 ${locale === "ru" ? "bg-white/10" : ""}`} href={locale === "ru" ? "#" : switchHref}>
                RU
              </Link>
              <Link className={`px-3 py-2 ${locale === "en" ? "bg-accent" : ""}`} href={locale === "en" ? "#" : switchHref}>
                EN
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <div className="hidden" aria-hidden="true">
        <form name="rfq-main" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="rfq-main" />
          <input type="email" name="Email" required />
          <input name="Name" />
          <input name="Company" />
          <input name="Country / City" />
          <input name="Phone / WhatsApp / Telegram" />
          <input name="Product Model" />
          <input name="Quantity" />
          <input name="Application" />
          <input name="Personal Data Consent" />
          <textarea name="Message" />
        </form>
      </div>

      <footer className="bg-[#141f2a] px-5 py-8 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <strong>{c.brand}</strong>
            <p className="mt-1 text-slate-300">{c.footerLine}</p>
            <p className="mt-3 text-sm text-slate-400">&copy; 2026 SINOETM TECH LTD. All rights reserved.</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
              <Link className="hover:text-white" href={localizedPath(locale, "/privacy")}>
                {c.navPrivacy}
              </Link>
              <Link className="hover:text-white" href={localizedPath(locale, "/personal-data-consent")}>
                {c.navConsent}
              </Link>
              <Link className="hover:text-white" href={localizedPath(locale, "/cookie-policy")}>
                {c.navCookies}
              </Link>
            </div>
          </div>
          <Link className="font-bold" href={localizedPath(locale, "/contact")}>
            {c.requestQuote}
          </Link>
        </div>
      </footer>
      <a
        className="fixed bottom-5 right-5 z-50 flex min-h-12 items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-black text-white shadow-2xl transition hover:bg-accent-dark focus:outline-none focus:ring-4 focus:ring-accent/30 md:bottom-7 md:right-7"
        href={TELEGRAM_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on Telegram"
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M21 4 3 11l7 3 3 7 8-17Z" />
          <path d="m10 14 4-4" />
        </svg>
        <span>Chat with us</span>
      </a>
      <CookieBanner locale={locale} />
    </div>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <PageShell locale={locale} active="home" languagePath={localizedPath(oppositeLocale(locale), "/")}>
      <section
        className="min-h-[640px] bg-cover bg-center px-5 py-24 text-white md:px-10"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,31,42,.92), rgba(20,31,42,.54)), url('/assets/application-gas-processing.png')"
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">{c.heroEyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.04] md:text-7xl">{c.heroTitle}</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">{c.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href={localizedPath(locale, "/catalog")}>
              {c.viewCatalog}
            </Link>
            <Link className="btn btn-secondary" href={localizedPath(locale, "/contact")}>
              {c.requestQuote}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow">
          <h2 className="mb-7 text-3xl font-black">{c.categoriesTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => {
              const count = products.filter((product) => product.category === category.id).length;
              return (
                <Link className="card overflow-hidden transition hover:-translate-y-1" href={`${localizedPath(locale, "/catalog")}?category=${category.id}`} key={category.id}>
                  <div className="relative h-48 overflow-hidden">
                    <img className="h-full w-full object-cover" src={assetPath(category.image)} alt={category.title} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
                    <span className="absolute bottom-4 left-4 border-l-4 border-white bg-accent px-4 py-3 text-xl font-black text-white shadow-xl">
                      {category.title}
                    </span>
                  </div>
                  <div className="flex min-h-[190px] flex-col p-6">
                    <h3 className="text-2xl font-black">{category.title}</h3>
                    <p className="mt-3 text-muted">{category.description[locale]}</p>
                    <span className="mt-auto pt-6 font-black text-accent">
                      {count} {c.products}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[#e9eef4]">
        <div className="section-narrow">
          <p className="eyebrow !text-slate-400">{c.applicationEyebrow}</p>
          <h2 className="mb-7 text-3xl font-black">{c.applicationTitle}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {applicationScenes.map((scene) => (
              <article className="card overflow-hidden" key={scene.id}>
                <img className="h-44 w-full object-cover" src={assetPath(scene.image)} alt={scene.title[locale]} />
                <div className="p-5">
                  <h3 className="text-lg font-black">{scene.title[locale]}</h3>
                  <p className="mt-2 text-muted">{scene.text[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function ProductCard({ locale, product }: { locale: Locale; product: Product }) {
  const c = t(locale);
  const compactSpecs = product.params[locale].slice(0, 3);

  return (
    <article className="card flex h-full flex-col overflow-hidden bg-white">
      <Link className="grid h-52 shrink-0 place-items-center border-b border-line bg-white p-5" href={localizedPath(locale, `/products/${product.slug}`)}>
        <img className="h-full max-h-40 w-full object-contain" src={assetPath(product.image)} alt={product.model} />
      </Link>
      <div className="relative z-10 flex flex-1 flex-col bg-white p-6">
        <div className="mb-2 text-xs font-black uppercase text-emerald-700">{product.category}</div>
        <h3 className="min-h-[3.25rem] text-lg font-black leading-tight text-[#173163]">{product.model}</h3>
        <ul className="product-card-specs mt-5 list-none border-t border-line p-0 text-sm text-slate-700">
          {compactSpecs.map((spec) => (
            <li className="border-b border-line py-3" key={spec}>
              {spec}
            </li>
          ))}
        </ul>
        <Link className="btn btn-primary mt-auto w-full" href={localizedPath(locale, `/products/${product.slug}`)}>
          {c.details}
        </Link>
      </div>
    </article>
  );
}
export function CatalogPage({
  locale,
  category,
  query
}: {
  locale: Locale;
  category?: string;
  query?: string;
}) {
  const c = t(locale);
  const activeCategory = categories.some((item) => item.id === category) ? (category as CategoryId) : undefined;
  const q = (query || "").trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    const matchesQuery = q ? product.model.toLowerCase().includes(q) : true;
    return matchesCategory && matchesQuery;
  });

  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), "/catalog")}>
      <PageHeading title={c.catalogTitle} lead={c.catalogLead} image="/assets/application-gas-processing.png" />
      <section className="section">
        <div className="section-narrow">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Link className={`btn ${!activeCategory ? "btn-primary" : "btn-outline"}`} href={localizedPath(locale, "/catalog")}>
                {c.allProducts}
              </Link>
              <span className="mx-2 h-8 w-px self-center bg-slate-300" aria-hidden="true" />
              {categories.map((item) => (
                <Link
                  className={`btn ${activeCategory === item.id ? "btn-primary" : "btn-outline"}`}
                  href={`${localizedPath(locale, "/catalog")}?category=${item.id}`}
                  key={item.id}
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <strong>
              {filtered.length} {c.products}
            </strong>
          </div>

          {filtered.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} locale={locale} product={product} />
              ))}
            </div>
          ) : (
            <div className="card p-8">{c.noResults}</div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

export function ProductPage({ locale, product }: { locale: Locale; product: Product }) {
  const c = t(locale);
  const languagePath = localizedPath(oppositeLocale(locale), `/products/${product.slug}`);
  const structuredData = [productJsonLd(locale, product), breadcrumbJsonLd(locale, product)];
  return (
    <PageShell locale={locale} active="catalog" languagePath={languagePath}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <PageHeading title={product.model} lead={product.category} image={assetPath(product.image)} />
      <section className="section">
        <div className="section-narrow grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="card p-7">
            <section className="mb-8">
              <h2 className="text-2xl font-black">{c.overview}</h2>
              <p className="mt-3 text-lg text-muted">{product.overview[locale]}</p>
            </section>
            <InfoList title={c.keyParams} items={product.params[locale]} />
            <InfoList title={c.highlights} items={product.highlights[locale]} />
            <InfoList title={c.applications} items={product.applications[locale]} />
          </article>

          <aside className="card h-fit p-6">
            <div className="grid min-h-64 place-items-center bg-white p-4">
              <img className="max-h-72 max-w-full object-contain" src={assetPath(product.image)} alt={product.model} />
            </div>
            <h2 className="mt-5 text-2xl font-black">{product.model}</h2>
            <div className="mt-5 grid gap-3">
              <a className="btn btn-primary" href={pdfPath(product.pdf)} target="_blank" rel="noreferrer">
                {c.downloadPdf}
              </a>
              <Link className="btn btn-outline" href={`${localizedPath(locale, "/contact")}?model=${encodeURIComponent(product.model)}`}>
                {c.requestQuote}
              </Link>
              <Link className="btn btn-outline" href={localizedPath(locale, "/catalog")}>
                {c.backCatalog}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-black">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <PageShell locale={locale} active="about" languagePath={localizedPath(oppositeLocale(locale), "/about")}>
      <PageHeading title={c.aboutTitle} lead={c.aboutLead} image="/assets/application-lab-chambers.png" />
      <section className="section">
        <div className="section-narrow">
          <article className="card p-8">
            <p className="eyebrow !mb-5 !text-slate-400">Sinoetm Tech. Ltd.</p>
            <div className="space-y-5 text-lg leading-8 text-muted">
              {c.aboutBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}

export function ContactPage({ locale, model }: { locale: Locale; model?: string }) {
  const c = t(locale);
  return (
    <PageShell locale={locale} active="contact" languagePath={localizedPath(oppositeLocale(locale), "/contact")}>
      <PageHeading title={c.contactTitle} lead={c.contactLead} image="/assets/application-gas-manufacturing.png" />
      <section className="section">
        <div className="section-narrow grid gap-8 lg:grid-cols-[330px_1fr]">
          <aside className="card h-fit p-7">
            <h2 className="text-2xl font-black">{c.brand}</h2>
            <p className="mt-3 text-muted">{c.emailNote}</p>
            <h3 className="mt-6 text-2xl font-black">{c.contactInfoTitle}</h3>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="font-bold">Email</dt>
                <dd className="text-accent font-bold">{c.contactEmail}</dd>
              </div>
              <div>
                <dt className="font-bold">{c.telegramLabel}</dt>
                <dd className="text-accent font-bold">{c.contactTelegram}</dd>
              </div>
            </dl>
          </aside>

          <RfqForm locale={locale} model={model} />
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label className="mb-2 block font-bold" htmlFor={id}>
        {label}
      </label>
      <input className="w-full rounded border border-line px-3 py-3" id={id} name={name} type={type} required={required} />
    </div>
  );
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  return <LegalContentPage locale={locale} page="privacy" />;
}

export function ConsentPage({ locale }: { locale: Locale }) {
  return <LegalContentPage locale={locale} page="consent" />;
}

export function CookiePolicyPage({ locale }: { locale: Locale }) {
  return <LegalContentPage locale={locale} page="cookies" />;
}

function LegalContentPage({ locale, page }: { locale: Locale; page: LegalPageKey }) {
  const content = legalCopy[locale][page];
  return (
    <PageShell locale={locale} active="privacy" languagePath={localizedPath(oppositeLocale(locale), legalPath(page))}>
      <PageHeading title={content.title} lead={content.lead} />
      <section className="section">
        <article className="section-narrow card space-y-7 p-8">
          <p className="font-bold text-accent">{content.updated}</p>
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-black">{section.title}</h2>
              <div className="mt-3 space-y-3 text-lg text-muted">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </article>
      </section>
    </PageShell>
  );
}

function legalPath(page: LegalPageKey) {
  if (page === "consent") return "/personal-data-consent";
  if (page === "cookies") return "/cookie-policy";
  return "/privacy";
}

export function ThankYouPage({ locale }: { locale: Locale }) {
  const c = t(locale);
  return (
    <PageShell locale={locale} active="contact" languagePath={localizedPath(oppositeLocale(locale), "/thank-you")}>
      <PageHeading title={c.thankYouTitle} lead={c.thankYouLead} />
      <section className="section">
        <div className="section-narrow">
          <Link className="btn btn-primary" href={localizedPath(locale, "/")}>
            {c.navHome}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

function PageHeading({ title, lead, image }: { title: string; lead: string; image?: string }) {
  const style = image ? ({ "--page-image": `url('${image}')` } as CSSProperties) : undefined;
  return (
    <section className={`page-heading ${image ? "page-heading-image" : ""}`} style={style}>
      <h1>{title}</h1>
      <p>{lead}</p>
    </section>
  );
}

export function getProductOrNull(slug: string) {
  return findProduct(slug) || null;
}
