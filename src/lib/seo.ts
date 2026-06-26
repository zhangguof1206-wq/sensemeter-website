import type { Metadata } from "next";
import { assetPath, pdfPath, type Locale, type Product } from "@/data/catalog";
import { localizedPath } from "@/lib/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sensemeter.ru";
export const siteName = "SenseMeter";
export const defaultLastModified = "2026-06-24";

const categoryNames: Record<Product["category"], Record<Locale, string>> = {
  MICHELL: { ru: "датчик точки росы", en: "dew-point instrument" },
  ROTRONIC: { ru: "датчик влажности и температуры", en: "humidity and temperature instrument" },
  VAISALA: { ru: "датчик влажности и точки росы", en: "humidity and dew-point instrument" },
  AII: { ru: "анализатор кислорода", en: "oxygen analyzer" }
};

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function localizedCanonical(locale: Locale, path: string) {
  return localizedPath(locale, path);
}

export function languageAlternates(path: string) {
  return {
    "ru-RU": absoluteUrl(localizedPath("ru", path)),
    en: absoluteUrl(localizedPath("en", path)),
    "x-default": absoluteUrl(localizedPath("ru", path))
  };
}

function trimDescription(text: string, maxLength = 155) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trim()}...`;
}

export function staticPageMetadata({
  locale,
  path,
  title,
  description,
  image = "/logo-header.png"
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = localizedCanonical(locale, path);
  const url = absoluteUrl(canonical);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path)
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [{ url: absoluteUrl(image), alt: siteName }]
    }
  };
}

export function productMetadata(locale: Locale, product: Product): Metadata {
  const path = `/products/${product.slug}`;
  const category = categoryNames[product.category][locale];
  const title = locale === "ru" ? `${product.model} - ${category}` : `${product.model} - ${category}`;
  const description = trimDescription(
    locale === "ru"
      ? `${product.overview.ru} Запросите цену, наличие и PDF datasheet у SenseMeter.`
      : `${product.overview.en} Request pricing, availability and PDF datasheet from SenseMeter.`
  );
  const image = absoluteUrl(assetPath(product.image));

  return {
    title,
    description,
    alternates: {
      canonical: localizedCanonical(locale, path),
      languages: languageAlternates(path)
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url: absoluteUrl(localizedCanonical(locale, path)),
      siteName,
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      images: [{ url: image, alt: product.model }]
    }
  };
}

export function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      legalName: "SINOETM TECH LTD",
      url: absoluteUrl("/"),
      logo: absoluteUrl("/logo-header.png"),
      email: "sales@sensemeter.ru",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@sensemeter.ru",
        availableLanguage: ["ru", "en"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: absoluteUrl("/"),
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/catalog")}?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];
}

export function breadcrumbJsonLd(locale: Locale, product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "ru" ? "Главная" : "Home",
        item: absoluteUrl(localizedCanonical(locale, "/"))
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "ru" ? "Каталог" : "Product Catalog",
        item: absoluteUrl(localizedCanonical(locale, "/catalog"))
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.model,
        item: absoluteUrl(localizedCanonical(locale, `/products/${product.slug}`))
      }
    ]
  };
}

export function productJsonLd(locale: Locale, product: Product) {
  const path = localizedCanonical(locale, `/products/${product.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.model,
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    category: product.category,
    description: product.overview[locale],
    image: absoluteUrl(assetPath(product.image)),
    url: absoluteUrl(path),
    additionalProperty: product.params[locale].map((value) => ({
      "@type": "PropertyValue",
      name: "Specification",
      value
    })),
    subjectOf: {
      "@type": "DigitalDocument",
      name: `${product.model} datasheet`,
      url: absoluteUrl(pdfPath(product.pdf))
    }
  };
}
