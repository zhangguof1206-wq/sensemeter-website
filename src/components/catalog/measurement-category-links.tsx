import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { measurementCategories } from "@/data/measurement-categories";
import { localizedPath } from "@/lib/i18n";

export function MeasurementCategoryLinks({ locale }: { locale: Locale }) {
  const title = locale === "ru" ? "По измеряемому параметру" : "By Measurement";
  return (
    <nav aria-label={title} className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-5">
      <span className="text-sm font-semibold text-muted">{title}</span>
      {measurementCategories.map(category => (
        <Link className="border-b-2 border-accent py-2 text-sm font-bold text-ink hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent" href={localizedPath(locale, category.path)} key={category.slug}>
          {category.navLabel[locale]}
        </Link>
      ))}
    </nav>
  );
}
