import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const applicationPaths = [
  "/applications/industrial-humidity-monitoring",
  "/applications/compressed-air-dew-point",
  "/applications/glove-box-oxygen-analysis",
  "/applications/natural-gas-moisture-monitoring",
  "/applications/climate-chamber-humidity"
];

const applicationPages = applicationPaths.map((path) => {
  const slug = path.split("/").at(-1);
  return {
    path,
    slug,
    pageFile: join(root, "src", "app", "applications", slug, "page.tsx"),
    requiredText: [slug, "recommendedSlugs", "faqJsonLd"]
  };
});

const enApplicationRoute = join(root, "src", "app", "en", "applications", "[slug]", "page.tsx");
const contentFile = join(root, "src", "data", "application-page-content.ts");
const sitemap = readFileSync(join(root, "src", "app", "sitemap.ts"), "utf8");
const yandexList = readFileSync(join(root, "scripts", "list-yandex-urls.mjs"), "utf8");
const sitemapIncludesEnApplications = sitemap.includes('"/en" + path') || sitemap.includes("applicationPaths.flatMap");
const yandexListIncludesEnApplications = yandexList.includes("enApplicationPages");
const requiredEnglishImages = {
  "industrial-humidity-monitoring": [
    "inlineImage: \"assets/application-industrial-humidity-monitoring-v2.png\"",
    "ctaImage: \"assets/application-humidity-lab-user.png\""
  ],
  "compressed-air-dew-point": [
    "inlineImage: \"assets/application-gas-processing.png\"",
    "ctaImage: \"assets/application-compressed-air-user.png\""
  ],
  "glove-box-oxygen-analysis": [
    "inlineImage: \"assets/application-gas-manufacturing.png\"",
    "ctaImage: \"assets/application-glove-box-user.png\""
  ],
  "natural-gas-moisture-monitoring": [
    "inlineImage: \"assets/application-natural-gas-inline.png\"",
    "ctaImage: \"assets/application-natural-gas-cta.png\""
  ],
  "climate-chamber-humidity": [
    "inlineImage: \"assets/application-climate-chamber-inline.png\"",
    "ctaImage: \"assets/application-climate-chamber-lab.png\""
  ]
};

let failures = 0;

for (const page of applicationPages) {
  if (!existsSync(page.pageFile)) {
    console.error(`FAIL ${page.path} page file exists`);
    failures += 1;
    continue;
  }

  const source = readFileSync(page.pageFile, "utf8");
  for (const text of page.requiredText) {
    if (!source.includes(text)) {
      console.error(`FAIL ${page.path} includes ${text}`);
      failures += 1;
    }
  }

  if (!source.includes(`/en${page.path}`)) {
    console.error(`FAIL ${page.path} language switch points to EN application page`);
    failures += 1;
  }

  if (source.includes("languages: false")) {
    console.error(`FAIL ${page.path} keeps EN alternates enabled`);
    failures += 1;
  }

  if (!sitemap.includes(page.path) || !sitemapIncludesEnApplications) {
    console.error(`FAIL sitemap includes RU and EN ${page.path}`);
    failures += 1;
  }

  if (!yandexList.includes(page.path) || !yandexListIncludesEnApplications) {
    console.error(`FAIL Yandex URL list includes RU and EN ${page.path}`);
    failures += 1;
  }
}

if (!existsSync(enApplicationRoute)) {
  console.error("FAIL EN dynamic application route exists");
  failures += 1;
} else {
  const enRoute = readFileSync(enApplicationRoute, "utf8");
  if (!enRoute.includes("generateStaticParams") || !enRoute.includes("generateMetadata") || !enRoute.includes("ApplicationPage")) {
    console.error("FAIL EN dynamic application route renders localized application pages with metadata");
    failures += 1;
  }
}

if (!existsSync(contentFile)) {
  console.error("FAIL application page content data exists");
  failures += 1;
} else {
  const content = readFileSync(contentFile, "utf8");
  for (const page of applicationPages) {
    const requiredImages = requiredEnglishImages[page.slug] || [];
    for (const requiredImage of requiredImages) {
      if (!content.includes(requiredImage)) {
        console.error(`FAIL English ${page.path} uses the same application images as the RU page`);
        failures += 1;
      }
    }
    if (!content.includes(page.slug) || !content.includes(`path: "${page.path}"`)) {
      console.error(`FAIL application content includes ${page.path}`);
      failures += 1;
    }
  }
}

if (failures) {
  console.error(`Application page check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("Application page check passed.");


