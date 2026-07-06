import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { applicationPageLastModified, corePageLastModified, defaultLastModified, productPageLastModified, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const corePaths = ["", "/catalog", "/about", "/contact"];
  const legalPaths = ["/privacy", "/personal-data-consent", "/cookie-policy"];
  const applicationPaths = ["/applications/industrial-humidity-monitoring", "/applications/compressed-air-dew-point", "/applications/glove-box-oxygen-analysis", "/applications/natural-gas-moisture-monitoring", "/applications/climate-chamber-humidity"];
  const ruCorePages = corePaths.map((path) => ({
    url: siteUrl + (path || "/"),
    lastModified: corePageLastModified
  }));
  const enCorePages = corePaths.map((path) => ({
    url: siteUrl + "/en" + path,
    lastModified: corePageLastModified
  }));
  const legalPages = legalPaths.flatMap((path) => [
    {
      url: siteUrl + path,
      lastModified: defaultLastModified
    },
    {
      url: siteUrl + "/en" + path,
      lastModified: defaultLastModified
    }
  ]);
  const applicationPages = applicationPaths.flatMap((path) => [
    { url: siteUrl + path, lastModified: applicationPageLastModified },
    { url: siteUrl + "/en" + path, lastModified: applicationPageLastModified }
  ]);
  const productPages = products.flatMap((product) => [
    { url: siteUrl + "/products/" + product.slug, lastModified: productPageLastModified },
    { url: siteUrl + "/en/products/" + product.slug, lastModified: productPageLastModified }
  ]);

  return [...ruCorePages, ...enCorePages, ...legalPages, ...applicationPages, ...productPages];
}
