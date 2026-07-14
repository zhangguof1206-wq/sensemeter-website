"use client";

import type { Locale } from "@/data/catalog";
import { localizedPath } from "@/lib/i18n";

type CatalogView = "instruments" | "accessories";

const labels: Record<Locale, Record<CatalogView, string>> = {
  ru: { instruments: "Приборы", accessories: "Комплектующие" },
  en: { instruments: "Instruments", accessories: "Accessories" }
};

const ariaLabels: Record<Locale, string> = {
  ru: "Раздел каталога",
  en: "Catalog section"
};

export function ProductCatalogSwitch({ locale, active }: { locale: Locale; active: CatalogView }) {
  const items: Array<{ id: CatalogView; href: string }> = [
    { id: "instruments", href: localizedPath(locale, "/catalog") },
    { id: "accessories", href: localizedPath(locale, "/accessories") }
  ];

  return (
    <label className="inline-flex flex-col gap-2 text-sm font-bold text-slate-600">
      <span>{ariaLabels[locale]}</span>
      <select
        aria-label={ariaLabels[locale]}
        className="min-w-64 border border-line bg-white px-4 py-3 text-base font-black text-ink shadow-sm outline-none transition focus:border-accent"
        defaultValue={active}
        onChange={(event) => {
          const selected = items.find((item) => item.id === event.currentTarget.value);
          if (selected) window.location.href = selected.href;
        }}
      >
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {labels[locale][item.id]}
          </option>
        ))}
      </select>
    </label>
  );
}
