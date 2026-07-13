import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { accessoryCategories } from "@/data/accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";
import { AccessoryCategoryCard } from "./accessory-cards";

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
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {accessoryCategories.map((category) => <AccessoryCategoryCard category={category} locale={locale} key={category.slug} />)}
        </div>
      </div>
    </section>
  );
}
