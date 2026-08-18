import Image from "next/image";
import type { ResolvedApplicationPage } from "@/data/applications";

export function ApplicationScenarios({ page }: { page: ResolvedApplicationPage }) {
  const { copy } = page;

  return (
    <>
      <section className="bg-white px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[360px_64px_1fr] md:gap-10">
          <h2 className="text-3xl font-black leading-tight text-accent md:text-right md:text-4xl">{copy.overviewTitle}</h2>
          <div className="relative hidden h-32 place-items-center md:grid" aria-hidden="true">
            <span className="absolute inset-y-0 left-1/2 w-px bg-steel" />
            <span className="relative grid h-7 w-7 rotate-45 place-items-center bg-steel"><span className="h-1.5 w-1.5 rounded-full bg-white" /></span>
          </div>
          <p className="max-w-[68ch] text-base leading-8 text-muted md:text-lg">{copy.overviewText}</p>
        </div>
      </section>

      <section className="bg-[#f4f6f8] px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_420px] md:items-end">
            <h2 className="max-w-3xl text-3xl font-black leading-tight md:text-4xl">{copy.scenariosTitle}</h2>
            <p className="text-sm leading-7 text-muted md:text-base">{copy.scenariosLead}</p>
          </div>

          <div className="grid gap-7 lg:grid-cols-[1.35fr_.85fr]">
            {copy.photoScenarios.map((scenario, index) => (
              <article className="group overflow-hidden border-b-[3px] border-accent bg-white" key={scenario.title}>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 lg:h-[390px] lg:aspect-auto">
                  <Image
                    fill
                    loading="lazy"
                    sizes={index === 0 ? "(min-width: 1024px) 58vw, 90vw" : "(min-width: 1024px) 36vw, 90vw"}
                    className="application-scene-image object-cover"
                    src={page.scenarioImages[index]}
                    alt={scenario.imageAlt}
                  />
                </div>
                <div className="min-h-[128px] p-6 md:p-7">
                  <h3 className="text-xl font-black">{scenario.title}</h3>
                  <p className="mt-2 max-w-[68ch] text-sm leading-6 text-muted">{scenario.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-400">
            {copy.technicalScenarios.map((scenario, index) => (
              <article className="grid gap-3 border-b border-slate-400 py-6 md:grid-cols-[54px_230px_1fr_280px] md:items-center md:gap-6" key={scenario.title}>
                <span className="text-xs font-black text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-black">{scenario.title}</h3>
                <p className="text-sm leading-6 text-muted">{scenario.text}</p>
                <div className="border-l border-slate-300 pl-5 text-sm leading-6 text-steel">
                  <strong className="mb-1 block text-xs uppercase text-ink">{copy.criterionLabel}</strong>
                  {scenario.criterion}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
