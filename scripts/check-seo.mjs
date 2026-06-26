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
    name: "priority product pages include commercial Yandex keywords",
    pass: () => {
      const catalog = read("src/data/catalog.ts").toLowerCase();
      const requiredKeywords = [
        "цена",
        "наличие",
        "коммерческое предложение",
        "датчик точки росы",
        "анализатор кислорода",
        "датчик влажности",
        "опасных зон",
        "сжатого воздуха"
      ];
      return requiredKeywords.every((keyword) => catalog.includes(keyword));
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
