import type { Locale } from "@/data/catalog";
import type { getInstrumentSpecifications } from "@/data/instrument-specifications";
import { DetailSpecTable, detailFocus } from "./detail-layout";

type Specifications = NonNullable<ReturnType<typeof getInstrumentSpecifications>>;

export function InstrumentSpecifications({ locale, specifications }: { locale: Locale; specifications: Specifications }) {
  const { source, references, note, groups } = specifications;
  const sources = [source, ...references];

  return (
    <>
      {note ? <p className="mt-4 border-l-2 border-accent bg-[#f4f7fa] px-4 py-3 text-sm leading-6 text-ink">{note}</p> : null}
      <div className="space-y-7">
        {groups.map(group => (
          <div className="mt-6" key={group.key}>
            <h3 className="break-words text-base font-bold text-steel">{group.title}</h3>
            <DetailSpecTable locale={locale} label={group.title} rows={group.rows} />
          </div>
        ))}
      </div>
      <ul className="mt-5 space-y-1 break-words text-sm leading-6 text-muted">
        {sources.map(({ label, revision, pages, url }) => {
          const text = [label, revision, pages && `${locale === "ru" ? "стр." : "pp."} ${pages}`].filter(Boolean).join(" · ");
          return (
            <li key={text}>
              {locale === "ru" ? "Источник: " : "Source: "}
              {url ? <a className={`underline underline-offset-2 hover:text-accent ${detailFocus}`} href={url} target="_blank" rel="noreferrer">{text}</a> : text}
            </li>
          );
        })}
      </ul>
    </>
  );
}
