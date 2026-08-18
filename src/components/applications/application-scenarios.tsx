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

      <section className="bg-white px-5 pb-24 md:px-10 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_420px] md:items-end">
            <h2 className="text-3xl font-black leading-tight md:text-4xl">{copy.scenariosTitle}</h2>
            <p className="text-sm leading-7 text-muted md:text-base">{copy.scenariosLead}</p>
          </div>
          <div className="grid gap-x-7 gap-y-8 md:grid-cols-2 lg:grid-cols-[1.15fr_.95fr_.95fr]">
            {copy.scenarios.map((scenario, index) => (
              <article className={`group border-b border-slate-400 pb-6 ${index === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`} key={scenario.title}>
                <div className={`relative overflow-hidden bg-slate-200 ${index === 0 ? "aspect-[4/3] lg:h-[570px] lg:aspect-auto" : "aspect-[16/10]"}`}>
                  <Image fill loading="lazy" sizes={index === 0 ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1024px) 28vw, 90vw"} className="application-scene-image object-cover" src={scenario.image} alt={scenario.imageAlt} />
                </div>
                <h3 className="mt-5 text-xl font-black">{scenario.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{scenario.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
