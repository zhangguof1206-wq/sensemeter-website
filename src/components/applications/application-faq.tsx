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
          <aside className="h-fit border-t-[3px] border-accent bg-[#eef2f5] p-7 md:p-8">
            <h2 className="text-2xl font-black leading-tight">{copy.advisorTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{copy.advisorText}</p>
            <div className="mt-6 border-t border-slate-300 pt-5">
              <h3 className="text-sm font-black">{copy.rfqTitle}</h3>
              <ul className="mt-3 space-y-2 text-xs leading-5 text-muted">
                {copy.rfqPoints.slice(0, 4).map((point) => <li className="flex gap-2" key={point}><span className="mt-2 h-1 w-1 shrink-0 bg-accent" /><span>{point}</span></li>)}
              </ul>
            </div>
            <Link className="btn btn-primary mt-6 w-full whitespace-nowrap" href={contactHref}>{copy.advisorButton}</Link>
          </aside>
        </div>
      </section>

      <section className="bg-[#102235] px-5 py-20 text-white md:px-10">
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
