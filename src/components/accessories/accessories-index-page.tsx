import type { Locale } from "@/data/catalog";
import { accessoryCategories } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath, oppositeLocale } from "@/lib/i18n";
import { PageShell } from "@/components/site";
import { AccessoryCategoryCard } from "./accessory-cards";
import { AccessoryPageHeading } from "./accessory-page-heading";

export function AccessoriesIndexPage({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  const requestItems = locale === "ru"
    ? ["Прибор или узел", "Газ или рабочая среда", "Размеры и материал", "Интерфейс или резьба", "Точность фильтрации или расход", "Требуемое количество"]
    : ["Instrument or assembly", "Gas or process medium", "Dimensions and material", "Connection or thread", "Filtration grade or flow", "Required quantity"];
  return (
    <PageShell locale={locale} active="catalog" languagePath={localizedPath(oppositeLocale(locale), "/accessories")}>
      <AccessoryPageHeading title={c.overviewTitle} lead={c.overviewLead} />
      <section className="section">
        <div className="section-narrow">
          <div className="grid grid-cols-1 gap-x-7 gap-y-10 md:grid-cols-2 xl:grid-cols-3" data-accessory-categories>
            {accessoryCategories.map((category) => <AccessoryCategoryCard category={category} locale={locale} key={category.slug} />)}
          </div>
        </div>
      </section>
      <section className="border-y border-line bg-[#eef2f5] px-5 py-10 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black">{c.informationTitle}</h2>
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
