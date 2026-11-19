import type { Locale } from "@/data/catalog";
import type { getInstrumentSpecifications } from "@/data/instrument-specifications";
import { DetailSpecTable } from "./detail-layout";

type Specifications = NonNullable<ReturnType<typeof getInstrumentSpecifications>>;

export function InstrumentSpecifications({ locale, specifications }: { locale: Locale; specifications: Specifications }) {
  const { groups } = specifications;
  if (!groups.length) {
    return <p className="mt-4 text-base text-ink">{locale === "ru" ? "Исполнение уточняется" : "Pending model verification"}</p>;
  }

  return (
    <div className="mt-6 space-y-7">
      {groups.map(group => (
        <div key={group.key}>
          <h3 className="break-words text-base font-bold text-steel">{group.title}</h3>
          <DetailSpecTable locale={locale} label={group.title} rows={group.rows} />
        </div>
      ))}
    </div>
  );
}
