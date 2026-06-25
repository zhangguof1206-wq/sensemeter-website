import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";
import { defaultLastModified, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/catalog", "/about", "/contact", "/privacy", "/personal-data-consent", "/cookie-policy"];
  const ruPages = staticPaths.map((path) => ({
    url: `${siteUrl}${path || "/"}`,
    lastModified: defaultLastModified
  }));
  const enPages = staticPaths.map((path) => ({
    url: `${siteUrl}/en${path}`,
    lastModified: defaultLastModified
  }));
  const productPages = products.flatMap((product) => [
    { url: `${siteUrl}/products/${product.slug}`, lastModified: defaultLastModified },
    { url: `${siteUrl}/en/products/${product.slug}`, lastModified: defaultLastModified }
  ]);

  return [...ruPages, ...enPages, ...productPages];
}
