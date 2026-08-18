import Image from "next/image";
import type { ResolvedApplicationPage } from "@/data/applications";

export function ApplicationSelection({ page }: { page: ResolvedApplicationPage }) {
  const { copy } = page;

  return (
    <section className="relative isolate overflow-hidden bg-[#102235] px-5 py-20 text-white md:px-10 md:py-24">
      <Image fill loading="lazy" sizes="100vw" className="-z-20 object-cover object-center" src={page.scenarioImage} alt="" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,34,53,.98)_0%,rgba(16,34,53,.96)_58%,rgba(16,34,53,.3)_100%)]" />
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-2xl text-3xl font-black leading-tight md:text-4xl">{copy.selectionTitle}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{copy.selectionLead}</p>
        <div className="mt-9 grid max-w-3xl border-l border-t border-white/20 sm:grid-cols-2">
          {copy.selectionCards.map((card, index) => (
            <article className="min-h-[172px] border-b border-r border-white/20 bg-[#18334f]/90 p-6" key={card.title}>
              <span className="text-xs font-black text-[#f06b64]">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-black">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-9 max-w-4xl border-t border-white/20 pt-7">
          <h3 className="text-lg font-black">{copy.rfqTitle}</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 text-sm text-slate-300 sm:grid-cols-2">
            {copy.rfqPoints.map((point) => <li className="flex gap-3" key={point}><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#f06b64]" /><span>{point}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
