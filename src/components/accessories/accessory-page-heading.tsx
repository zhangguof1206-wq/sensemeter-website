import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  lead: string;
  image?: string;
  eyebrow?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function AccessoryPageHeading({ title, lead, image, eyebrow, actionHref, actionLabel }: Props) {
  return (
    <section className="border-b border-line bg-[#eef2f6] px-5 py-9 md:px-10 md:py-12">
      <div className={`section-narrow grid items-center gap-8 ${image ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12" : ""}`}>
        <div className="min-w-0">
          <span className="mb-4 block h-0.5 w-10 bg-accent" aria-hidden="true" data-brand-rule />
          {eyebrow ? <p className="text-sm font-bold text-accent">{eyebrow}</p> : null}
          <h1 className="mt-3 max-w-4xl break-words text-[30px] font-bold leading-tight text-steel [overflow-wrap:anywhere] md:text-4xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">{lead}</p>
          {actionHref && actionLabel ? <Link className="btn btn-primary mt-6 max-w-full text-center" href={actionHref}>{actionLabel}</Link> : null}
        </div>
        {image ? (
          <div className="relative aspect-[3/2] min-w-0 border border-line bg-white" data-accessory-media>
            <Image className="absolute inset-0 block h-full w-full object-contain p-3" src={image} alt={title} width={1536} height={1024} sizes="(min-width: 1280px) 500px, (min-width: 1024px) 43vw, 90vw" priority />
          </div>
        ) : null}
      </div>
    </section>
  );
}
