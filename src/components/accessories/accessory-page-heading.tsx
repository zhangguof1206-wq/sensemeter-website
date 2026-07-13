export function AccessoryPageHeading({ title, lead, image }: { title: string; lead: string; image: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-steel px-5 py-16 text-white md:px-10 md:py-20">
      <img className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" src={image} alt="" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(20,31,42,.96),rgba(20,31,42,.72))]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl">
        <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{lead}</p>
      </div>
    </section>
  );
}
