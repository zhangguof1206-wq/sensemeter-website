import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const checks = [
  {
    name: "root layout defines metadataBase and alternates support",
    pass: () => {
      const source = read("src/app/layout.tsx");
      return source.includes("metadataBase") && source.includes("alternates");
    }
  },
  {
    name: "RU product route exports generateMetadata",
    pass: () => read("src/app/products/[slug]/page.tsx").includes("generateMetadata")
  },
  {
    name: "EN product route exports generateMetadata",
    pass: () => read("src/app/en/products/[slug]/page.tsx").includes("generateMetadata")
  },
  {
    name: "RFQ product pages avoid invalid Google Product rich result markup",
    pass: () => {
      const component = read("src/components/site.tsx");
      const seo = read("src/lib/seo.ts");
      return component.includes('type="application/ld+json"') &&
        component.includes("breadcrumbJsonLd(locale, product)") &&
        !component.includes("productJsonLd") &&
        !seo.includes("function productJsonLd") &&
        !seo.includes('"@type": "Product"');
    }
  },
  {
    name: "root layout renders Organization and WebSite JSON-LD",
    pass: () => {
      const layout = read("src/app/layout.tsx");
      const seo = read("src/lib/seo.ts");
      return layout.includes("siteJsonLd") && seo.includes('"@type": "Organization"') && seo.includes('"@type": "WebSite"');
    }
  },
  {
    name: "product page renders BreadcrumbList JSON-LD",
    pass: () => {
      const component = read("src/components/site.tsx");
      const seo = read("src/lib/seo.ts");
      return component.includes("breadcrumbJsonLd") && seo.includes('"@type": "BreadcrumbList"');
    }
  },
  {
    name: "RU and EN accessory pages expose localized metadata",
    pass: () => {
      const routes = [
        "src/app/accessories/page.tsx",
        "src/app/accessories/[category]/page.tsx",
        "src/app/accessories/[category]/[slug]/page.tsx",
        "src/app/en/accessories/page.tsx",
        "src/app/en/accessories/[category]/page.tsx",
        "src/app/en/accessories/[category]/[slug]/page.tsx"
      ];
      return routes.every((route) => {
        const source = read(route);
        return source.includes("generateMetadata") || source.includes("export const metadata");
      });
    }
  },
  {
    name: "accessory detail pages render BreadcrumbList JSON-LD",
    pass: () => {
      const component = read("src/components/accessories/accessory-detail-page.tsx");
      const seo = read("src/lib/seo.ts");
      return component.includes('type="application/ld+json"') &&
        component.includes("accessoryBreadcrumbJsonLd") &&
        seo.includes("export function accessoryBreadcrumbJsonLd");
    }
  },
  {
    name: "accessory detail metadata includes neutral catalog model",
    pass: () => {
      const ru = read("src/app/accessories/[category]/[slug]/page.tsx");
      const en = read("src/app/en/accessories/[category]/[slug]/page.tsx");
      return [ru, en].every((route) => route.includes("product.model") && route.includes("product.title"));
    }
  },
  {
    name: "sitemap includes all localized accessory routes",
    pass: () => {
      const sitemap = read("src/app/sitemap.ts");
      return sitemap.includes("accessoryOverviewPages") &&
        sitemap.includes("accessoryCategoryPages") &&
        sitemap.includes("accessoryProductPages") &&
        sitemap.includes("accessoryPageLastModified");
    }
  },
  {
    name: "RFQ success sends Yandex Metrica goal",
    pass: () => {
      const form = read("src/components/rfq-form.tsx");
      return form.includes('"reachGoal"') && form.includes('"rfq_submit_success"') && form.includes("reportRfqSubmitSuccess");
    }
  },
  {
    name: "priority product pages include RFQ-ready product search copy",
    pass: () => {
      const catalog = read("src/data/catalog.ts");
      const requiredPhrases = [
        "Intrinsically safe Easidew PRO I.S.",
        "High-accuracy GPR-1600 / GPR-2600 / GPR-3100 oxygen analyzer",
        "Industrial HC2A humidity and temperature sensor",
        "Intrinsically safe HMT370EX humidity and temperature sensor",
        "Request price, availability and a quotation"
      ];
      return requiredPhrases.every((phrase) => catalog.includes(phrase));
    }
  },
  {
    name: "second batch product pages include RFQ-ready search phrases",
    pass: () => {
      const catalog = read("src/data/catalog.ts");
      const requiredPhrases = [
        "Request price, availability and a quotation for Easidew PRO XP",
        "Request price, availability and a quotation for MDM300",
        "Request price, availability and a quotation for DMT153",
        "Request price, availability and a quotation for GPR-1500",
        "Request price, availability and a quotation for GPR-1900 / GPR-2900"
      ];
      return requiredPhrases.every((phrase) => catalog.includes(phrase));
    }
  },
  {
    name: "third batch product pages include RFQ-ready search phrases",
    pass: () => {
      const catalog = read("src/data/catalog.ts");
      const requiredPhrases = [
        "Request price, availability and a quotation for Easidew 34 / Easidew M12",
        "Request price, availability and a quotation for Easidew Online",
        "Request price, availability and a quotation for GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500",
        "Request price, availability and a quotation for GPR-1500 GB / GPR-2500 GB",
        "Request price, availability and a quotation for Optidew-HZ",
        "Request price, availability and a quotation for SF82 Online"
      ];
      return requiredPhrases.every((phrase) => catalog.includes(phrase));
    }
  },  {
    name: "fourth batch product pages include RFQ-ready search phrases",
    pass: () => {
      const catalog = read("src/data/catalog.ts");
      const requiredPhrases = [
        "Request price, availability and a quotation for HC2A Series",
        "Request price, availability and a quotation for HP31 / HP32",
        "Request price, availability and a quotation for Pura",
        "Request price, availability and a quotation for HygroFlex1",
        "Request price, availability and a quotation for HMT310",
        "Request price, availability and a quotation for HMP3 / HMPX",
        "Request price, availability and a quotation for DMT143 / DMT143L"
      ];
      return requiredPhrases.every((phrase) => catalog.includes(phrase));
    }
  },
  {
    name: "English About page uses updated Sinoetm company copy",
    pass: () => {
      const i18n = read("src/lib/i18n.ts");
      return i18n.includes("Sinoetm Tech. Ltd. is a premier company dedicated") &&
        i18n.includes("Sinoetm aims to be your trusted partner");
    }
  },
  {
    name: "thank-you pages are noindex",
    pass: () => {
      const ru = read("src/app/thank-you/page.tsx");
      const en = read("src/app/en/thank-you/page.tsx");
      return ru.includes("robots") && ru.includes("index: false") && en.includes("robots") && en.includes("index: false");
    }
  },
  {
    name: "homepage metadata leads with the SenseMeter brand for Yandex brand search",
    pass: () => {
      const ruHome = read("src/app/page.tsx");
      const enHome = read("src/app/en/page.tsx");
      return ruHome.includes('title: "SenseMeter') &&
        enHome.includes('title: "SenseMeter') &&
        ruHome.includes("SenseMeter") &&
        enHome.includes("SenseMeter");
    }
  },
  {
    name: "Organization JSON-LD exposes brand aliases and confirmed public profile",
    pass: () => {
      const seo = read("src/lib/seo.ts");
      return seo.includes("alternateName") &&
        seo.includes("sensemeter") &&
        seo.includes("SenseMeter.ru") &&
        seo.includes("Sense Meter") &&
        seo.includes("sameAs") &&
        seo.includes("https://t.me/Sensemeter");
    }
  },
  {
    name: "priority model pages have precise SEO type labels",
    pass: () => {
      const seo = read("src/lib/seo.ts");
      return seo.includes("productSeoNames") &&
        seo.includes('"optidew-hz"') &&
        seo.includes("hydrocarbon dew-point analyzer") &&
        seo.includes('"hmp3-hmpx"') &&
        seo.includes("humidity and temperature probe") &&
        seo.includes('"dmt143-dmt143l"') &&
        seo.includes("dew-point transmitter");
    }
  },
  {
    name: "priority model pages link back to matching application pages",
    pass: () => {
      const links = read("src/data/application-links.ts");
      return /"optidew-hz":\s*\[[^\]]*naturalGasMoisture[^\]]*\]/s.test(links) &&
        /"dmt143-dmt143l":\s*\[[^\]]*compressedAirDewPoint[^\]]*\]/s.test(links) &&
        /"hmp3-hmpx":\s*\[[^\]]*industrialHumidity[^\]]*climateChamberHumidity[^\]]*\]/s.test(links);
    }
  },
  {
    name: "sitemap does not use generation time as lastModified",
    pass: () => !read("src/app/sitemap.ts").includes("new Date()")
  },
  {
    name: "sitemap exposes RU and EN hreflang alternates",
    pass: () => {
      const sitemap = read("src/app/sitemap.ts");
      const seo = read("src/lib/seo.ts");
      const sitemapRequiredText = [
        "withLanguageAlternates",
        "languageAlternates(path)",
        "alternates:"
      ];
      const languageRequiredText = [
        '"ru-RU"',
        '"x-default"'
      ];

      return sitemapRequiredText.every((text) => sitemap.includes(text)) &&
        languageRequiredText.every((text) => seo.includes(text));
    }
  },
  {
    name: "Yandex Metrica counter is installed",
    pass: () => {
      const layout = read("src/app/layout.tsx");
      return layout.includes("110136437") && layout.includes("mc.yandex.ru/metrika/tag.js") && layout.includes("ym(${yandexMetricaId}");
    }
  },
  {
    name: "Next config redirects duplicate hosts to canonical domain",
    pass: () => {
      const middleware = read("src/middleware.ts");
      const config = read("next.config.ts");
      return config.includes("redirects()") &&
        config.includes('type: "host"') &&
        config.includes('value: "www.sensemeter.ru"') &&
        config.includes('value: "79.174.90.69"') &&
        config.includes('destination: "https://sensemeter.ru/:path*"') &&
        config.includes("permanent: true") &&
        !middleware.includes("NextResponse.redirect");
    }
  },
  {
    name: "Next config sends HTTPS security headers without forcing subdomains",
    pass: () => {
      const config = read("next.config.ts");
      const requiredHeaders = [
        "poweredByHeader: false",
        "headers()",
        '"Strict-Transport-Security"',
        '"max-age=31536000"',
        '"X-Content-Type-Options"',
        '"nosniff"',
        '"Referrer-Policy"',
        '"strict-origin-when-cross-origin"',
        '"X-Frame-Options"',
        '"SAMEORIGIN"',
        '"Permissions-Policy"',
        '"camera=(), microphone=(), geolocation=()"'
      ];

      return requiredHeaders.every((text) => config.includes(text)) &&
        !config.includes("includeSubDomains") &&
        !config.includes("preload");
    }
  },
  {
    name: "Next config gives static assets and datasheets long-lived cache headers",
    pass: () => {
      const config = read("next.config.ts");
      const requiredText = [
        'source: "/assets/:path*"',
        'source: "/datasheets/:path*"',
        '"Cache-Control"',
        '"public, max-age=2592000, stale-while-revalidate=86400"'
      ];

      return requiredText.every((text) => config.includes(text));
    }
  },
  {
    name: "robots.txt gives Yandex clean tracking-parameter rules",
    pass: () => {
      const robotsRoute = join(root, "src/app/robots.txt/route.ts");
      if (!existsSync(robotsRoute)) return false;

      const robots = readFileSync(robotsRoute, "utf8");
      const requiredText = [
        "User-agent: Yandex",
        "Clean-param:",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "yclid",
        "gclid",
        "fbclid",
        "Sitemap:"
      ];
      return requiredText.every((text) => robots.includes(text));
    }
  },
  {
    name: "Yandex Metrica tracks PDF downloads, Telegram clicks and product dwell",
    pass: () => {
      const component = read("src/components/site.tsx");
      const tracker = read("src/components/metrica-goals.tsx");
      return tracker.includes("reachMetricaGoal") &&
        tracker.includes("pdf_download") &&
        tracker.includes("telegram_click") &&
        tracker.includes("product_page_60s") &&
        component.includes("MetricaTrackedLink") &&
        component.includes("ProductDwellGoal") &&
        component.includes("goal={METRICA_GOALS.pdfDownload}") &&
        component.includes("goal={METRICA_GOALS.telegramClick}");
    }
  },
  {
    name: "product metadata descriptions reserve room for ellipsis",
    pass: () => {
      const seo = read("src/lib/seo.ts");
      return seo.includes("maxLength - 3") && !seo.includes("maxLength - 1");
    }
  },
  {
    name: "catalog product image links have model labels",
    pass: () => {
      const component = read("src/components/site.tsx");
      return component.includes("aria-label={`${c.details}: ${product.model}`}");
    }
  },
  {
    name: "EN application pages exist and keep hreflang alternates",
    pass: () => {
      const enRoute = read("src/app/en/applications/[slug]/page.tsx");
      const content = read("src/data/application-page-content.ts");
      const ruPages = [
        "src/app/applications/industrial-humidity-monitoring/page.tsx",
        "src/app/applications/compressed-air-dew-point/page.tsx",
        "src/app/applications/glove-box-oxygen-analysis/page.tsx",
        "src/app/applications/natural-gas-moisture-monitoring/page.tsx",
        "src/app/applications/climate-chamber-humidity/page.tsx"
      ];

      return enRoute.includes("generateStaticParams") &&
        enRoute.includes("generateMetadata") &&
        content.includes("Industrial humidity and temperature monitoring") &&
        content.includes("Compressed air dew point monitoring") &&
        content.includes("Glove box oxygen analysis") &&
        content.includes("Natural gas moisture monitoring") &&
        content.includes("Climate chamber humidity measurement") &&
        ruPages.every((page) => !read(page).includes("languages: false"));
    }
  },
  {
    name: "first SEO/GEO batch covers confirmed search-console targets",
    pass: () => {
      const applicationContent = read("src/data/application-page-content.ts");
      const catalogPage = read("src/app/catalog/page.tsx");
      const i18n = read("src/lib/i18n.ts");
      const catalog = read("src/data/catalog.ts");
      const requiredText = [
        "Compressed air dew point testing and monitoring",
        "compressed air dew point testing",
        "Recommended instruments for compressed air dew point testing",
        "How do I test dew point in compressed air?",
        "oxygen analyzer for glovebox applications",
        "glovebox",
        "industrial humidity monitoring",
        "промышленные датчики влажности, точки росы и кислородные анализаторы",
        "PDF datasheet",
        "HMP3 / HMPX датчик влажности и температуры",
        "Optidew-HZ анализатор углеводородной точки росы",
        "DMT143 / DMT143L преобразователь точки росы"
      ];

      const haystack = [applicationContent, catalogPage, i18n, catalog].join("\n");
      return requiredText.every((text) => haystack.includes(text));
    }
  },
  {
    name: "metadata titles and descriptions are unique for Yandex",
    pass: () => {
      const catalog = read("src/data/catalog.ts");
      const seo = read("src/lib/seo.ts");
      const applicationContent = read("src/data/application-page-content.ts");
      const staticPages = [
        "src/app/page.tsx",
        "src/app/catalog/page.tsx",
        "src/app/about/page.tsx",
        "src/app/contact/page.tsx",
        "src/app/en/page.tsx",
        "src/app/en/catalog/page.tsx",
        "src/app/en/about/page.tsx",
        "src/app/en/contact/page.tsx",
        "src/app/applications/industrial-humidity-monitoring/page.tsx",
        "src/app/applications/compressed-air-dew-point/page.tsx",
        "src/app/applications/glove-box-oxygen-analysis/page.tsx",
        "src/app/applications/natural-gas-moisture-monitoring/page.tsx",
        "src/app/applications/climate-chamber-humidity/page.tsx"
      ];

      const productMatches = [...catalog.matchAll(/slug: "([^"]+)"[\s\S]*?model: "([^"]+)"[\s\S]*?category: "([^"]+)"[\s\S]*?overview: \{[\s\S]*?en: "([^"]+)"/g)];
      if (productMatches.length < 20) return false;

      const titleValues = [];
      const descriptionValues = [];
      for (const [, slug, model, category, enOverview] of productMatches) {
        if (!slug || !model || !category || !enOverview) return false;
        titleValues.push(`${model} - ${category} industrial instrument`);
        descriptionValues.push(`${enOverview} Request pricing, availability and PDF datasheet from SenseMeter.`.slice(0, 155));
      }

      for (const page of staticPages) {
        const source = read(page);
        const title = source.match(/title: "([^"]+)"/)?.[1];
        const description = source.match(/description:\s*(?:\r?\n\s*)?"([^"]+)"/)?.[1];
        if (!title || !description) return false;
        titleValues.push(title);
        descriptionValues.push(description);
      }

      const applicationMetaTitles = [...applicationContent.matchAll(/metaTitle: "([^"]+)"/g)].map((match) => match[1]);
      const applicationMetaDescriptions = [...applicationContent.matchAll(/metaDescription: "([^"]+)"/g)].map((match) => match[1]);
      if (applicationMetaTitles.length !== 5 || applicationMetaDescriptions.length !== 5) return false;
      titleValues.push(...applicationMetaTitles);
      descriptionValues.push(...applicationMetaDescriptions);

      const unique = (items) => new Set(items).size === items.length;
      return seo.includes("product.model") && unique(titleValues) && unique(descriptionValues);
    }
  }
];

let failures = 0;
for (const check of checks) {
  if (check.pass()) {
    console.log(`OK ${check.name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${check.name}`);
  }
}

if (failures) {
  console.error(`SEO check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("SEO check passed.");




