import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/data/catalog";

export type DetailSpec = { label?: string; value: string; condition?: string };
type DetailLink = { label: string; href?: string };
export const detailHeading = "text-2xl font-bold leading-tight text-ink";
export const detailFocus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type HeroProps = {
  locale: Locale;
  breadcrumbs: DetailLink[];
  eyebrow?: DetailLink;
  title: string;
  subtitle?: string;
  summary?: string;
  facts: DetailSpec[];
  actions: ReactNode;
  media: ReactNode;
  note?: string;
  surface?: "plain" | "accessory";
};

export function DetailHero({ locale, breadcrumbs, eyebrow, title, subtitle, summary, facts, actions, media, note, surface = "plain" }: HeroProps) {
  return (
    <section className={`${surface === "accessory" ? "border-b border-line bg-[#eef2f6] [&_.text-muted]:text-slate-600" : "bg-white"} px-5 pb-10 pt-6 md:px-10 md:pb-12`} data-product-detail>
      <div className="section-narrow">
        <nav className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted" aria-label={locale === "ru" ? "Навигационная цепочка" : "Breadcrumb"}>
          {breadcrumbs.map((item, index) => (
            <span className="inline-flex min-w-0 items-center gap-3" key={`${index}-${item.label}`}>
              {index ? <span aria-hidden="true">/</span> : null}
              {item.href ? <Link className={`break-words py-1 hover:text-accent ${detailFocus}`} href={item.href}>{item.label}</Link> : <span className="break-words text-ink" aria-current="page">{item.label}</span>}
            </span>
          ))}
        </nav>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="min-w-0 lg:col-start-2 lg:row-start-1">
            {eyebrow ? eyebrow.href ? <Link className={`inline-flex min-h-8 items-center text-sm font-bold text-accent ${detailFocus}`} href={eyebrow.href}>{eyebrow.label}</Link> : <p className="text-sm font-bold text-accent">{eyebrow.label}</p> : null}
            <h1 className="mt-3 break-words text-[32px] font-bold leading-tight text-steel [overflow-wrap:anywhere] md:text-4xl">{title}</h1>
            {subtitle ? <p className="mt-3 text-xl font-semibold leading-7 text-ink">{subtitle}</p> : null}
            {summary ? <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{summary}</p> : null}
            {facts.length ? (
              <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-line py-5">
                {facts.map((fact, index) => (
                  <div className="min-w-0" key={`${index}-${fact.label ?? fact.value}`}>
                    <dt className={fact.label ? "text-sm font-semibold text-muted" : "sr-only"}>{fact.label ?? `${locale === "ru" ? "Параметр" : "Parameter"} ${index + 1}`}</dt>
                    <dd className={`mt-2 break-words font-bold text-steel [overflow-wrap:anywhere] ${fact.value.length > 60 ? "text-sm leading-6" : "text-xl leading-7"}`}>
                      {fact.value}
                      {fact.condition ? <span className="mt-1 block text-xs font-normal leading-5 text-muted">{fact.condition}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">{actions}</div>
            {note ? <p className="mt-4 text-sm leading-6 text-muted">{note}</p> : null}
          </div>
          <figure className="min-w-0 lg:col-start-1 lg:row-start-1">{media}</figure>
        </div>
      </div>
    </section>
  );
}

export function DetailNavigation({ locale, sections }: { locale: Locale; sections: { id: string; label: string }[] }) {
  return (
    <nav className="border-y border-line bg-[#f4f7fa] px-5 md:px-10" aria-label={locale === "ru" ? "Информация об изделии" : "Product information"}>
      <div className="section-narrow flex flex-wrap gap-x-7 gap-y-1 py-2">
        {sections.map(section => <a className={`inline-flex min-h-11 items-center border-b-2 border-transparent text-sm font-bold hover:border-accent hover:text-accent ${detailFocus}`} href={`#${section.id}`} key={section.id}>{section.label}</a>)}
      </div>
    </nav>
  );
}

export function DetailSection({ id, title, children, className = "" }: { id?: string; title: string; children: ReactNode; className?: string }) {
  return <section className={`scroll-mt-64 border-t border-line pt-8 xl:scroll-mt-28 ${className}`} id={id}><h2 className={detailHeading}>{title}</h2>{children}</section>;
}

export function DetailSpecTable({ locale, rows, label }: { locale: Locale; rows: DetailSpec[]; label?: string }) {
  return (
    <table aria-label={label} className={`${label ? "mt-2" : "mt-5"} w-full table-fixed border-collapse text-left text-sm leading-6`}>
      <thead className="bg-[#f4f7fa] text-steel"><tr><th className="w-2/5 break-words p-3 font-semibold" scope="col">{locale === "ru" ? "Параметр" : "Parameter"}</th><th className="break-words p-3 font-semibold" scope="col">{locale === "ru" ? "Значение и условия" : "Value and conditions"}</th></tr></thead>
      <tbody>{rows.map((row, index) => (
        <tr className="border-b border-line" key={`${index}-${row.value}`}>
          {row.label ? <th className="break-words p-3 align-top font-semibold [overflow-wrap:anywhere]" scope="row">{row.label}</th> : null}
          <td className="break-words p-3 align-top text-muted [overflow-wrap:anywhere]" colSpan={row.label ? undefined : 2}>{row.value}</td>
        </tr>
      ))}</tbody>
    </table>
  );
}

export function DetailList({ items }: { items: string[] }) {
  return <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-muted">{items.map(item => <li className="break-words" key={item}>{item}</li>)}</ul>;
}
