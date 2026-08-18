import Image from "next/image";
import Link from "next/link";
import { assetPath, type Product } from "@/data/catalog";
import type { ResolvedApplicationPage } from "@/data/applications";
import { localizedPath } from "@/lib/i18n";

function ProductImage({ product, sizes }: { product: Product; sizes: string }) {
  return <Image fill loading="lazy" sizes={sizes} className="application-product-image object-contain p-7" src={assetPath(product.image)} alt={product.model} />;
}

export function ApplicationProducts({ page, products }: { page: ResolvedApplicationPage; products: Product[] }) {
  const { copy, locale } = page;
  const featured = products[0];
  const highlighted = products.slice(1, 3);
  const compact = products.slice(3);
  if (!featured) return null;

  return (
    <section className="application-anchor bg-[#eef2f5] px-5 py-20 md:px-10 md:py-24" id="recommended-products">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow !text-slate-500">{copy.productsEyebrow}</p>
        <div className="mb-10 max-w-3xl">
          <h2 className="text-3xl font-black leading-tight md:text-4xl">{copy.productsTitle}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{copy.productsLead}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[1.08fr_.92fr]">
          <article className="group grid min-h-[520px] overflow-hidden bg-white lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[310px]"><ProductImage product={featured} sizes="(min-width: 1024px) 32vw, 90vw" /></div>
            <div className="flex flex-col justify-center bg-[#19344f] p-8 text-white md:p-10">
              <span className="text-xs font-black text-emerald-400">{featured.brand}</span>
              <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">{featured.model}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{featured.overview[locale]}</p>
              <ul className="mt-6 divide-y divide-white/20 border-y border-white/20 text-sm">
                {featured.params[locale].slice(0, 3).map((spec) => <li className="py-3" key={spec}>{spec}</li>)}
              </ul>
              <Link className="btn btn-primary mt-7 whitespace-nowrap" href={localizedPath(locale, `/products/${featured.slug}`)}>{copy.productLinkLabel}</Link>
            </div>
          </article>

          <div className="grid gap-7">
            {highlighted.map((product) => (
              <article className="group grid min-h-[245px] overflow-hidden border-b-[3px] border-accent bg-white sm:grid-cols-[42%_58%]" key={product.slug}>
                <div className="relative min-h-[210px] border-b border-line sm:border-b-0 sm:border-r"><ProductImage product={product} sizes="(min-width: 1024px) 18vw, 85vw" /></div>
                <div className="flex flex-col justify-center p-7">
                  <span className="text-xs font-black text-emerald-700">{product.brand}</span>
                  <h3 className="mt-2 text-xl font-black text-[#173163] md:text-2xl">{product.model}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{product.overview[locale]}</p>
                  <Link className="mt-5 text-xs font-black uppercase text-accent" href={localizedPath(locale, `/products/${product.slug}`)}>{copy.productLinkLabel} &gt;</Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {compact.length > 0 ? (
          <div className={`mt-7 grid gap-7 ${compact.length > 1 ? "md:grid-cols-2" : "max-w-xl"}`}>
            {compact.map((product) => (
              <article className="group grid overflow-hidden border-t border-steel bg-white sm:grid-cols-[42%_58%]" key={product.slug}>
                <div className="relative min-h-[230px]"><ProductImage product={product} sizes="(min-width: 768px) 24vw, 85vw" /></div>
                <div className="flex flex-col justify-center p-7">
                  <span className="text-xs font-black text-emerald-700">{product.brand}</span>
                  <h3 className="mt-2 text-xl font-black text-[#173163]">{product.model}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{product.overview[locale]}</p>
                  <Link className="mt-5 text-xs font-black uppercase text-accent" href={localizedPath(locale, `/products/${product.slug}`)}>{copy.productLinkLabel} &gt;</Link>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
