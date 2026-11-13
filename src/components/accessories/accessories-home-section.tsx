import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/data/catalog";
import { homeAccessoryCategories } from "@/data/home-accessories";
import { accessoryCopy } from "@/data/accessories/copy";
import { localizedPath } from "@/lib/i18n";

export function AccessoriesHomeSection({ locale }: { locale: Locale }) {
  const c = accessoryCopy[locale];
  return (
    <section className="section bg-[#f1f4f6]">
      <div className="section-narrow home-section-reveal">
        <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between" data-home-reveal>
          <div className="min-w-0 max-w-3xl">
            <p className="home-editorial-eyebrow">{c.nav}</p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{c.homeTitle}</h2>
            <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{c.homeLead}</p>
          </div>
          <Link
            className="btn btn-primary w-fit max-w-full shrink-0 text-center"
            href={localizedPath(locale, "/accessories")}
          >
            {c.overviewTitle}<span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="home-accessory-matrix grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {homeAccessoryCategories.map((category, index) => (
            <Link
              className={`home-accessory-entry home-reveal-delay-${index % 3} group flex min-w-0 flex-col`}
              data-home-reveal
              href={localizedPath(locale, `/accessories/${category.slug}`)}
              key={category.slug}
            >
              <div className="home-accessory-image aspect-[3/2] w-full bg-white">
                <Image
                  className="block h-full w-full object-contain"
                  src={category.image}
                  alt={category.title[locale]}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 1280px) 372px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                />
              </div>
              <div className="home-accessory-copy flex min-h-16 items-start border-b border-line py-4">
                <h3 className="min-w-0 break-words text-lg font-bold leading-7 text-ink">{category.title[locale]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
