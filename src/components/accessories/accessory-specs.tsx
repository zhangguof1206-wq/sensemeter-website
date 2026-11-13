import type { Locale } from "@/data/catalog";
import type { LocalizedSpec } from "@/data/accessories/types";

export function AccessorySpecTable({ specs, locale, compact = false }: { specs: LocalizedSpec[]; locale: Locale; compact?: boolean }) {
  return (
    <dl className={compact ? "row-span-3 grid grid-rows-subgrid px-5 text-sm" : "border-t border-line text-base"}>
      {specs.map((spec) => (
        <div className={`grid min-w-0 border-line ${compact ? "content-start gap-1 border-t py-3" : "gap-2 border-b py-3 sm:grid-cols-[160px_1fr]"}`} key={`${spec.label.en}-${spec.value.en}`}>
          <dt className="break-words font-bold text-slate-500">{spec.label[locale]}</dt>
          <dd className="break-words font-semibold text-ink">{spec.value[locale]}</dd>
        </div>
      ))}
    </dl>
  );
}
