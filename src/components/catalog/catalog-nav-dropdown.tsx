import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { localizedPath } from "@/lib/i18n";

type CatalogNavDropdownProps = {
  locale: Locale;
  active: boolean;
};

const copy = {
  ru: {
    label: "Каталог",
    instruments: "Приборы",
    instrumentsHint: "Датчики, анализаторы и измерительные системы",
    accessories: "Комплектующие",
    accessoriesHint: "Фильтры, корпуса, соединители и запасные части"
  },
  en: {
    label: "Product Catalog",
    instruments: "Instruments",
    instrumentsHint: "Sensors, analyzers and measurement systems",
    accessories: "Accessories",
    accessoriesHint: "Filters, housings, connectors and spare parts"
  }
} satisfies Record<Locale, Record<string, string>>;

export function CatalogNavDropdown({ locale, active }: CatalogNavDropdownProps) {
  const labels = copy[locale];
  const items = [
    {
      title: labels.instruments,
      hint: labels.instrumentsHint,
      href: localizedPath(locale, "/catalog")
    },
    {
      title: labels.accessories,
      hint: labels.accessoriesHint,
      href: localizedPath(locale, "/accessories")
    }
  ];

  return (
    <div className="catalog-dropdown group relative">
      <Link
        aria-haspopup="true"
        className={`inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold transition hover:bg-white/10 focus:bg-white/10 focus:outline-none ${
          active ? "bg-white/10" : ""
        }`}
        href={localizedPath(locale, "/catalog")}
      >
        {labels.label}
        <span className="text-[11px] text-slate-300 transition group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true">
          ▾
        </span>
      </Link>

      <div className="catalog-dropdown-panel invisible absolute left-0 top-full z-50 w-[310px] pt-2 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="border border-line bg-white p-2 text-slate-900 shadow-2xl">
          {items.map((item) => (
            <Link
              className="grid gap-1 border-l-2 border-transparent px-4 py-3 transition hover:border-accent hover:bg-[#f4f7fa] focus:border-accent focus:bg-[#f4f7fa] focus:outline-none"
              href={item.href}
              key={item.href}
            >
              <span className="text-sm font-black">{item.title}</span>
              <span className="text-xs leading-5 text-muted">{item.hint}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
