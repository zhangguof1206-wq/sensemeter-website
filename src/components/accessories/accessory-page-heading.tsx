import Link from "next/link";

type Props = {
  title: string;
  lead: string;
  image: string;
  eyebrow?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function AccessoryPageHeading({ title, lead, image, eyebrow, actionHref, actionLabel }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-steel px-5 py-16 text-white md:px-10 md:py-20">
      <img className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" src={image} alt="" aria-hidden="true" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(90deg, rgba(20, 31, 42, 0.96) 0%, rgba(20, 31, 42, 0.88) 45%, rgba(20, 31, 42, 0.62) 72%, rgba(20, 31, 42, 0.5) 100%)" }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        {eyebrow ? <p className="eyebrow !text-slate-300">{eyebrow}</p> : null}
        <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{lead}</p>
        {actionHref && actionLabel ? <Link className="btn btn-primary mt-7" href={actionHref}>{actionLabel}</Link> : null}
      </div>
    </section>
  );
}
