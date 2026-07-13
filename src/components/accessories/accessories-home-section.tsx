import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { accessoryCategories, getAccessoryProductsByCategory } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";
import { AccessorySpecTable } from "./accessory-specs";

export function AccessoriesHomeSection({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <section className="section bg-[#e9eef4]">
      <div className="section-narrow">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow !text-slate-500">{c.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black">{c.homeTitle}</h2>
            <p className="mt-3 text-lg leading-8 text-muted">{c.homeLead}</p>
          </div>
          <Link className="btn btn-outline shrink-0" href={localizedPath(locale, "/accessories")}>{c.backOverview}</Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {accessoryCategories.map((category) => {
            const categoryModels = getAccessoryProductsByCategory(category.slug).slice(0, 3).map((product) => product.model);
            return (
              <article className="card grid min-h-[310px] overflow-hidden sm:grid-cols-[180px_1fr]" key={category.slug}>
                <div className="grid min-h-48 place-items-center border-b border-line bg-[#eef2f5] p-4 sm:border-b-0 sm:border-r">
                  <img className="h-full max-h-48 w-full object-contain" src={category.image} alt={category.title[locale]} />
                </div>
                <div className="flex min-w-0 flex-col p-5">
                  <h3 className="text-xl font-black leading-7">{category.title[locale]}</h3>
                  <div className="mt-4">
                    <AccessorySpecTable specs={category.specs.slice(0, 3)} locale={locale} compact />
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-500">{c.modelsLabel}: {categoryModels.join(" / ")}</p>
                  <Link className="btn btn-outline mt-auto w-full !border-accent !text-accent" href={localizedPath(locale, `/accessories/${category.slug}`)}>{c.viewCategory}</Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
