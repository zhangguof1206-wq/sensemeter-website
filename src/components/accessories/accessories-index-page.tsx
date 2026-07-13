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
  return (
    <PageShell locale={locale} active="accessories" languagePath={localizedPath(oppositeLocale(locale), "/accessories")}>
      <AccessoryPageHeading title={c.overviewTitle} lead={c.overviewLead} image={accessoryCategories[0].image} />
      <section className="section">
        <div className="section-narrow grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {accessoryCategories.map((category) => <AccessoryCategoryCard category={category} locale={locale} key={category.slug} />)}
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
