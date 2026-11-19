import type { Locale } from "@/data/catalog";
import { accessoryCategories } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { accessoryOverviewCopy } from "@/data/accessory-overview";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryCategoryCard } from "./accessory-cards";

export function AccessoriesIndexPage({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  const overview = accessoryOverviewCopy[locale];
  const requestItems = locale === "ru"
    ? ["Прибор или узел", "Газ или рабочая среда", "Размеры и материал", "Тип соединения или резьбы", "Тонкость фильтрации или расход", "Требуемое количество"]
    : ["Instrument or assembly", "Gas or process medium", "Dimensions and material", "Connection or thread type", "Filtration rating or flow", "Required quantity"];
  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), "/accessories")}>
      <section className="border-b border-line bg-[#eef2f6] px-5 py-8 md:px-10 md:py-10" data-accessory-overview-heading>
        <div className="section-narrow">
          <span className="mb-4 block h-0.5 w-10 bg-accent" aria-hidden="true" data-brand-rule />
          <h1 className="break-words text-[30px] font-bold leading-tight text-steel md:text-[32px]">{c.overviewTitle}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{overview.intro}</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="section-narrow">
          <div className="grid grid-cols-1 gap-x-7 gap-y-0 md:grid-cols-2 xl:grid-cols-3" data-accessory-categories>
            {accessoryCategories.map((category) => <AccessoryCategoryCard category={category} locale={locale} key={category.slug} />)}
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-[#eef2f6] px-5 py-10 md:px-10" id="accessory-selection-notes">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black">{c.informationTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{overview.selectionLead}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {requestItems.map((item) => (
              <li className="min-w-0 border-l-2 border-accent px-4 py-2 font-semibold" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
