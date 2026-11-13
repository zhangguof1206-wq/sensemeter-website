import Image from "next/image";
import type { Locale } from "@/data/catalog";
import { ProductImageGallery } from "./product-image-gallery";

type Props = {
  src: string;
  alt: string;
  locale: Locale;
  slides?: { src: string; alt: string; width: number; height: number }[];
  background?: string;
};

export function ProductVisual({ src, alt, locale, slides, background = "bg-white" }: Props) {
  if (slides && slides.length > 1) return <ProductImageGallery slides={slides} locale={locale} label={alt} />;
  return (
    <div className={`relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[470px] ${background}`}>
      <Image className="object-contain p-4" src={slides?.[0]?.src ?? src} alt={alt} fill sizes="(min-width: 1280px) 520px, (min-width: 1024px) 45vw, 90vw" priority />
    </div>
  );
}
