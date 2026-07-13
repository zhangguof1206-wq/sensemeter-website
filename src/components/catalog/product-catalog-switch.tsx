import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { localizedPath } from "@/lib/i18n";

type CatalogView = "instruments" | "accessories";

const labels: Record<Locale, Record<CatalogView, string>> = {
  ru: { instruments: "Приборы", accessories: "Комплектующие" },
  en: { instruments: "Instruments", accessories: "Accessories" }
};

export function ProductCatalogSwitch({ locale, active }: { locale: Locale; active: CatalogView }) {
  const items: Array<{ id: CatalogView; href: string }> = [
    { id: "instruments", href: localizedPath(locale, "/catalog") },
    { id: "accessories", href: localizedPath(locale, "/accessories") }
  ];

  return (
    <nav aria-label={locale === "ru" ? "Раздел каталога" : "Catalog section"} className="inline-grid grid-cols-2 border border-line bg-white p-1">
      {items.map((item) => (
        <Link
          aria-current={active === item.id ? "page" : undefined}
          className={`px-5 py-3 text-center text-sm font-black ${active === item.id ? "bg-steel text-white" : "text-ink hover:bg-slate-100"}`}
          href={item.href}
          key={item.id}
        >
          {labels[locale][item.id]}
        </Link>
      ))}
    </nav>
  );
}
