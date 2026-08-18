import Image from "next/image";
import Link from "next/link";
import type { ResolvedApplicationPage } from "@/data/applications";
import { localizedPath } from "@/lib/i18n";

export function ApplicationFaq({ page }: { page: ResolvedApplicationPage }) {
  const { copy, locale } = page;
  const contactHref = `${localizedPath(locale, "/contact")}?application=${page.slug}`;

  return (
    <>
      <section className="bg-white px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_390px] lg:gap-16">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">{copy.faqsTitle}</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {copy.faqs.map((item) => (
                <section className="py-6" key={item.question}>
                  <h3 className="text-lg font-black">{item.question}</h3>
                  <p className="mt-3 max-w-[75ch] leading-7 text-muted">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>
          <aside className="h-fit overflow-hidden border-b-[3px] border-accent bg-[#eef2f5]">
            <div className="relative aspect-[16/10]"><Image fill loading="lazy" sizes="(min-width: 1024px) 390px, 90vw" className="object-cover" src={page.ctaImage} alt={copy.advisorTitle} /></div>
            <div className="p-7">
              <h2 className="text-2xl font-black leading-tight">{copy.advisorTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{copy.advisorText}</p>
              <Link className="btn btn-primary mt-6 w-full whitespace-nowrap" href={contactHref}>{copy.advisorButton}</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#102235] px-5 py-20 text-white md:px-10">
        <Image fill loading="lazy" sizes="100vw" className="-z-20 object-cover" src={page.heroImage} alt="" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-[#102235]/90" />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-4xl">{copy.finalCtaTitle}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{copy.finalCtaText}</p>
          </div>
          <Link className="btn btn-primary shrink-0 whitespace-nowrap" href={contactHref}>{copy.finalCtaButton}</Link>
        </div>
      </section>
    </>
  );
}
