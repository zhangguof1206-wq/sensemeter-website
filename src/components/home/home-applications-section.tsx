import Link from "next/link";
import { applicationScenes, assetPath, type ApplicationScene, type Locale } from "@/data/catalog";
import { localizedPath, t } from "@/lib/i18n";

const applicationSceneLinks: Record<ApplicationScene["id"], string> = {
  compressedAir: "/applications/compressed-air-dew-point",
  gas: "/applications/natural-gas-moisture-monitoring",
  industrialHumidity: "/applications/industrial-humidity-monitoring",
  lab: "/applications/climate-chamber-humidity",
  oxygen: "/applications/glove-box-oxygen-analysis"
};

const sceneLayout: Record<ApplicationScene["id"], string> = {
  compressedAir: "md:col-span-1 lg:col-span-4",
  gas: "md:col-span-1 lg:col-span-4",
  industrialHumidity: "md:col-span-1 lg:col-span-4",
  lab: "md:col-span-1 lg:col-span-7",
  oxygen: "md:col-span-2 lg:col-span-5"
};

export function HomeApplicationsSection({ locale }: { locale: Locale }) {
  const c = t(locale);

  return (
    <section className="application-anchor bg-[#f4f7fa] py-16 sm:py-20" id="applications">
      <div className="section-narrow home-section-reveal px-4 sm:px-6 lg:px-0">
        <div className="application-section-heading mb-10 grid gap-6 border-b border-line pb-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end lg:gap-12">
          <div className="border-l-4 border-accent pl-5">
            <p className="text-xs font-black uppercase text-accent">{c.applicationEyebrow}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">{c.applicationTitle}</h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end">{c.applicationLead}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          {applicationScenes.map((scene) => (
            <Link
              className={`${sceneLayout[scene.id]} home-application-card group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent`}
              href={localizedPath(locale, applicationSceneLinks[scene.id])}
              key={scene.id}
            >
              <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-slate-200">
                <img
                  alt={scene.title[locale]}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={assetPath(scene.image)}
                  style={{ objectPosition: scene.imagePosition }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-xs font-black uppercase text-accent">{scene.category[locale]}</p>
                <h3 className="mt-2 text-xl font-black leading-tight text-[#182434]">{scene.title[locale]}</h3>
                <p className="mb-6 mt-3 line-clamp-2 text-muted">{scene.text[locale]}</p>
                <span className="application-card-action mt-auto inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-[3px] bg-accent px-4 py-3 text-sm font-black text-white transition-colors group-hover:bg-accent-dark">
                  {c.viewApplication}
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
