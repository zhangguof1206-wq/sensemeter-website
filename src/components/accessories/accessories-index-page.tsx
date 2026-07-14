import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { accessoryCategories } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryCategoryCard } from "./accessory-cards";
import { AccessoryPageHeading } from "./accessory-page-heading";

export function AccessoriesIndexPage({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  const accessoriesHeroImage = "/assets/accessories/accessories-hero-background.webp";
  const requestItems = locale === "ru"
    ? ["Прибор или узел", "Газ или рабочая среда", "Размеры и материал", "Интерфейс или резьба", "Точность фильтрации или расход", "Требуемое количество"]
    : ["Instrument or assembly", "Gas or process medium", "Dimensions and material", "Connection or thread", "Filtration grade or flow", "Required quantity"];
  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), "/accessories")}>
      <AccessoryPageHeading title={c.overviewTitle} lead={c.overviewLead} image={accessoriesHeroImage} />
      <section className="section">
        <div className="section-narrow">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {accessoryCategories.map((category) => <AccessoryCategoryCard category={category} locale={locale} key={category.slug} />)}
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-[#eef2f5] px-5 py-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black">{c.informationTitle}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {requestItems.map((item, index) => (
              <li className="border-l-2 border-accent bg-white px-4 py-3 font-semibold" key={item}>
                <span className="mr-2 text-accent">{String(index + 1).padStart(2, "0")}</span>{item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <AccessoryServiceBand locale={locale} />
    </PageShell>
  );
}

export function AccessoryServiceBand({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <section className="bg-steel px-5 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl md:flex md:items-center md:justify-between md:gap-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black">{c.serviceTitle}</h2>
          <p className="mt-3 leading-7 text-slate-200">{c.serviceText}</p>
        </div>
        <Link className="btn btn-primary mt-6 shrink-0 md:mt-0" href={localizedPath(locale, "/contact") + "?accessory=custom"}>{c.requestCustom}</Link>
      </div>
    </section>
  );
}
