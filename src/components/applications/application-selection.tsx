import type { ResolvedApplicationPage } from "@/data/applications";

export function ApplicationSelection({ page }: { page: ResolvedApplicationPage }) {
  const { copy } = page;

  return (
    <section className="bg-[#102235] px-5 py-20 text-white md:px-10 md:py-24">
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
