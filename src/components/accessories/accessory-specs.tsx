import type { Locale } from "@/data/catalog";
import type { LocalizedSpec } from "@/data/accessories/types";

export function AccessorySpecTable({ specs, locale, compact = false }: { specs: LocalizedSpec[]; locale: Locale; compact?: boolean }) {
  return (
    <dl className={`border-t border-line ${compact ? "text-sm" : "text-base"}`}>
      {specs.map((spec) => (
        <div className={`grid border-b border-line ${compact ? "gap-1 py-2" : "gap-2 py-3 sm:grid-cols-[160px_1fr]"}`} key={`${spec.label.en}-${spec.value.en}`}>
          <dt className="font-bold text-slate-500">{spec.label[locale]}</dt>
          <dd className="font-semibold text-ink">{spec.value[locale]}</dd>
        </div>
      ))}
    </dl>
  );
}
