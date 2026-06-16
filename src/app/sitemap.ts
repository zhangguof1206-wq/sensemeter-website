import type { MetadataRoute } from "next";
import { products } from "@/data/catalog";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sensemeter.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/catalog", "/about", "/contact", "/privacy", "/personal-data-consent", "/cookie-policy"];
  const ruPages = staticPaths.map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date()
  }));
  const enPages = staticPaths.map((path) => ({
    url: `${baseUrl}/en${path}`,
    lastModified: new Date()
  }));
  const productPages = products.flatMap((product) => [
    { url: `${baseUrl}/products/${product.slug}`, lastModified: new Date() },
    { url: `${baseUrl}/en/products/${product.slug}`, lastModified: new Date() }
  ]);

  return [...ruPages, ...enPages, ...productPages];
}
