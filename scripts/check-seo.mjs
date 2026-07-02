import { readFileSync } from "node:fs";
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
    name: "product page renders Product JSON-LD",
    pass: () => {
      const component = read("src/components/site.tsx");
      const seo = read("src/lib/seo.ts");
      return component.includes('type="application/ld+json"') && component.includes("productJsonLd") && seo.includes('"@type": "Product"');
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
    name: "sitemap does not use generation time as lastModified",
    pass: () => !read("src/app/sitemap.ts").includes("new Date()")
  },
  {
    name: "Yandex Metrica counter is installed",
    pass: () => {
      const layout = read("src/app/layout.tsx");
      return layout.includes("110136437") && layout.includes("mc.yandex.ru/metrika/tag.js") && layout.includes("ym(${yandexMetricaId}");
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
  },  {
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




