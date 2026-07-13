import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { accessoryCategories, accessoryProducts } from "@/data/accessories";
import { localizedPath } from "@/lib/i18n";
import { absoluteUrl, accessoryPageLastModified, applicationPageLastModified, corePageLastModified, defaultLastModified, languageAlternates, productPageLastModified } from "@/lib/seo";

type SitemapEntry = MetadataRoute.Sitemap[number];

const sitemapLocales = ["ru", "en"] as const;

function withLanguageAlternates(path: string, lastModified: string): SitemapEntry[] {
  return sitemapLocales.map((locale) => ({
    url: absoluteUrl(localizedPath(locale, path)),
    lastModified,
    alternates: {
      languages: languageAlternates(path)
    }
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const corePaths = ["/", "/catalog", "/about", "/contact"];
  const legalPaths = ["/privacy", "/personal-data-consent", "/cookie-policy"];
  const applicationPaths = ["/applications/industrial-humidity-monitoring", "/applications/compressed-air-dew-point", "/applications/glove-box-oxygen-analysis", "/applications/natural-gas-moisture-monitoring", "/applications/climate-chamber-humidity"];
  const corePages = corePaths.flatMap((path) => withLanguageAlternates(path, corePageLastModified));
  const legalPages = legalPaths.flatMap((path) => withLanguageAlternates(path, defaultLastModified));
  const applicationPages = applicationPaths.flatMap((path) => withLanguageAlternates(path, applicationPageLastModified));
  const productPages = products.flatMap((product) => withLanguageAlternates(`/products/${product.slug}`, productPageLastModified));
  const accessoryOverviewPages = withLanguageAlternates("/accessories", accessoryPageLastModified);
  const accessoryCategoryPages = accessoryCategories.flatMap((category) => withLanguageAlternates(`/accessories/${category.slug}`, accessoryPageLastModified));
  const accessoryProductPages = accessoryProducts.flatMap((product) => withLanguageAlternates(`/accessories/${product.categorySlug}/${product.slug}`, accessoryPageLastModified));

  return [...corePages, ...legalPages, ...applicationPages, ...productPages, ...accessoryOverviewPages, ...accessoryCategoryPages, ...accessoryProductPages];
}
