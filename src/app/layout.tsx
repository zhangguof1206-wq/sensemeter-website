import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { absoluteUrl, languageAlternates, siteJsonLd, siteName, siteUrl } from "@/lib/seo";

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

const yandexMetricaId = 110136437;
const siteStructuredData = siteJsonLd();

function YandexMetrica() {
  return (
    <>
      <Script
        id="yandex-metrica"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${yandexMetricaId}", "ym");
            ym(${yandexMetricaId}, "init", {
              ssr: true,
              webvisor: true,
              clickmap: true,
              ecommerce: "dataLayer",
              accurateTrackBounce: true,
              trackLinks: true
            });
          `
        }}
      />
      <noscript>
        <div>
          <img src={`https://mc.yandex.ru/watch/${yandexMetricaId}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
        </div>
      </noscript>
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Script
          id="site-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c") }}
        />
        <YandexMetrica />
        {children}
      </body>
    </html>
  );
}
