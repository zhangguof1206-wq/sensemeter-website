import type { Metadata } from "next";
import "./globals.css";
import { absoluteUrl, languageAlternates, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SenseMeter - Каталог продукции",
    template: `%s | ${siteName}`
  },
  description: "Промышленные датчики влажности, точки росы и анализаторы кислорода с PDF datasheets и RFQ-запросом.",
  alternates: {
    canonical: "/",
    languages: languageAlternates("/")
  },
  openGraph: {
    title: "SenseMeter - Каталог продукции",
    description: "Промышленные датчики влажности, точки росы и анализаторы кислорода для B2B-запросов.",
    url: absoluteUrl("/"),
    siteName,
    locale: "ru_RU",
    type: "website",
    images: [{ url: absoluteUrl("/logo-header.png"), alt: siteName }]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
