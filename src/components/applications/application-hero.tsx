import Image from "next/image";
import Link from "next/link";
import type { ResolvedApplicationPage } from "@/data/applications";
import { localizedPath } from "@/lib/i18n";

export function ApplicationHero({ page }: { page: ResolvedApplicationPage }) {
  const { copy, locale } = page;
  const contactHref = `${localizedPath(locale, "/contact")}?application=${page.slug}`;

  return (
    <section className="relative isolate overflow-hidden bg-[#102235] text-white">
      <Image fill priority sizes="100vw" className="-z-20 object-cover object-center" src={page.heroImage} alt={copy.title} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,28,45,.95)_0%,rgba(10,28,45,.76)_48%,rgba(10,28,45,.2)_100%)]" />
      <div className="mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-16 md:px-10">
        <div className="max-w-[760px]">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-200" aria-label="Breadcrumb">
            <Link className="hover:text-white" href={localizedPath(locale, "/")}>{copy.breadcrumbs.home}</Link>
            <span aria-hidden="true">/</span>
            <Link className="hover:text-white" href={`${localizedPath(locale, "/")}#applications`}>{copy.breadcrumbs.applications}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{copy.title}</span>
          </nav>
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1 className="max-w-[760px] text-4xl font-black leading-[1.06] sm:text-5xl lg:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-[680px] text-base leading-7 text-slate-100 sm:text-lg">{copy.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary whitespace-nowrap" href={contactHref}>{copy.primaryButton}</Link>
            <a className="btn btn-secondary whitespace-nowrap" href="#recommended-products">{copy.secondaryButton}</a>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl border-t border-white/20 bg-[#102235]/95 sm:grid-cols-2 lg:absolute lg:inset-x-0 lg:bottom-0 lg:ml-auto lg:mr-10 lg:w-[470px] lg:border lg:border-b-0">
        {copy.heroFacts.map((fact) => (
          <div className="px-6 py-4 sm:border-r sm:border-white/15 sm:last:border-r-0" key={fact.title}>
            <strong className="block text-sm">{fact.title}</strong>
            <span className="mt-1 block text-xs text-slate-300">{fact.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
