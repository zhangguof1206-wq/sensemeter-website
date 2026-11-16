import type { Locale } from "@/data/catalog";

const images = [
  {
    src: "/assets/products/mdm300-gallery/overview-ai-v1.png",
    alt: { ru: "MDM300 / MDM300 I.S. — общий вид", en: "MDM300 / MDM300 I.S. — overview" }
  },
  {
    src: "/assets/products/mdm300-gallery/standard-ai-v1.png",
    alt: { ru: "MDM300 с принадлежностями для отбора проб", en: "MDM300 with sampling accessories" }
  },
  {
    src: "/assets/products/mdm300-gallery/intrinsically-safe-ai-v1.png",
    alt: { ru: "MDM300 I.S. — искробезопасное исполнение", en: "MDM300 I.S. — intrinsically safe version" }
  }
];

export function getMdm300GallerySlides(locale: Locale) {
  return images.map(image => ({ src: image.src, alt: image.alt[locale], width: 1536, height: 1024 }));
}
