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

function ApplicationTextLink({ label }: { label: string }) {
  return (
    <span className="application-action mt-5 inline-flex min-h-10 items-center border border-[#173963] px-4 py-2 text-sm font-bold text-[#173963] transition-colors hover:bg-[#173963] hover:text-white group-hover:bg-[#173963] group-hover:text-white group-focus-visible:bg-[#173963] group-focus-visible:text-white">
      {label}<span className="ml-2" aria-hidden="true">→</span>
    </span>
  );
}

export function HomeApplicationsSection({ locale }: { locale: Locale }) {
  const c = t(locale);
  const feature = applicationScenes[0];
  const sideScenes = applicationScenes.slice(1, 3);
  const lowerScenes = applicationScenes.slice(3);

  if (!feature) return null;

  return (
    <section className="application-anchor bg-white py-16 sm:py-20 lg:py-24" id="applications">
      <div className="section-narrow home-section-reveal px-4 sm:px-6 lg:px-0">
        <div className="application-section-heading mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-end lg:gap-16" data-home-reveal>
          <div>
            <p className="home-editorial-eyebrow">{c.applicationEyebrow}</p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{c.applicationTitle}</h2>
          </div>
          <p className="text-base leading-7 text-muted sm:text-lg">{c.applicationLead}</p>
        </div>

        <div className="application-editorial-grid grid gap-10 lg:grid-cols-[1.18fr_.82fr] lg:grid-rows-2 lg:gap-x-12">
          <Link
            className="application-feature group lg:row-span-2"
            data-home-reveal
            href={localizedPath(locale, applicationSceneLinks[feature.id])}
          >
            <img
              alt={feature.title[locale]}
              className="aspect-[16/11] w-full object-cover lg:h-[570px] lg:aspect-auto"
              src={assetPath(feature.image)}
              style={{ objectPosition: feature.imagePosition }}
            />
            <p className="mt-5 text-xs font-bold uppercase text-accent">{feature.category[locale]}</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight">{feature.title[locale]}</h3>
            <p className="mt-3 max-w-2xl leading-7 text-muted">{feature.text[locale]}</p>
            <ApplicationTextLink label={c.viewApplication} />
          </Link>

          {sideScenes.map((scene, index) => (
            <Link
              className={`application-side group home-reveal-delay-${index + 1} grid gap-6 border-b border-line pb-8 sm:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[44%_minmax(0,1fr)]`}
              data-home-reveal
              href={localizedPath(locale, applicationSceneLinks[scene.id])}
              key={scene.id}
            >
              <img
                alt={scene.title[locale]}
                className="aspect-[16/10] h-full min-h-44 w-full object-cover"
                src={assetPath(scene.image)}
                style={{ objectPosition: scene.imagePosition }}
              />
              <div>
                <p className="text-xs font-bold uppercase text-accent">{scene.category[locale]}</p>
                <h3 className="mt-2 text-xl font-bold leading-tight">{scene.title[locale]}</h3>
                <p className="mt-3 leading-7 text-muted">{scene.text[locale]}</p>
                <ApplicationTextLink label={c.viewApplication} />
              </div>
            </Link>
          ))}
        </div>

        <div className="application-lower-grid mt-12 grid gap-10 pt-2 lg:grid-cols-2 lg:gap-12 lg:border-t lg:border-line lg:pt-10">
          {lowerScenes.map((scene, index) => (
            <Link
              className={`home-reveal-delay-${index} group grid gap-6 sm:grid-cols-[260px_minmax(0,1fr)]`}
              data-home-reveal
              href={localizedPath(locale, applicationSceneLinks[scene.id])}
              key={scene.id}
            >
              <img
                alt={scene.title[locale]}
                className="aspect-[16/10] h-full min-h-48 w-full object-cover"
                src={assetPath(scene.image)}
                style={{ objectPosition: scene.imagePosition }}
              />
              <div>
                <p className="text-xs font-bold uppercase text-accent">{scene.category[locale]}</p>
                <h3 className="mt-2 text-xl font-bold leading-tight">{scene.title[locale]}</h3>
                <p className="mt-3 leading-7 text-muted">{scene.text[locale]}</p>
                <ApplicationTextLink label={c.viewApplication} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
