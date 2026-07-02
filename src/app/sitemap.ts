import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { defaultLastModified, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/catalog", "/about", "/contact", "/privacy", "/personal-data-consent", "/cookie-policy"];
  const applicationPaths = ["/applications/industrial-humidity-monitoring", "/applications/compressed-air-dew-point", "/applications/glove-box-oxygen-analysis", "/applications/natural-gas-moisture-monitoring", "/applications/climate-chamber-humidity"];
  const ruPages = staticPaths.map((path) => ({
    url: siteUrl + (path || "/"),
    lastModified: defaultLastModified
  }));
  const enPages = staticPaths.map((path) => ({
    url: siteUrl + "/en" + path,
    lastModified: defaultLastModified
  }));
  const applicationPages = applicationPaths.flatMap((path) => [
    { url: siteUrl + path, lastModified: defaultLastModified },
    { url: siteUrl + "/en" + path, lastModified: defaultLastModified }
  ]);
  const productPages = products.flatMap((product) => [
    { url: siteUrl + "/products/" + product.slug, lastModified: defaultLastModified },
    { url: siteUrl + "/en/products/" + product.slug, lastModified: defaultLastModified }
  ]);

  return [...ruPages, ...enPages, ...applicationPages, ...productPages];
}
