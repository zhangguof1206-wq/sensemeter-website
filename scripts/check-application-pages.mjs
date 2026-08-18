import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const applicationSlugs = [
  "industrial-humidity-monitoring",
  "compressed-air-dew-point",
  "glove-box-oxygen-analysis",
  "natural-gas-moisture-monitoring",
  "climate-chamber-humidity"
];
const componentNames = [
  "ApplicationHero",
  "ApplicationScenarios",
  "ApplicationSelection",
  "ApplicationProducts",
  "ApplicationFaq"
];
const componentFiles = [
  "application-page.tsx",
  "application-hero.tsx",
  "application-scenarios.tsx",
  "application-selection.tsx",
  "application-products.tsx",
  "application-faq.tsx"
];
const ruVisibleEnglishLabels = [
  "Application overview",
  "Selection path",
  "Recommended products",
  "Common questions"
];

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error(`FAIL ${message}`);
};

for (const file of componentFiles) {
  if (!existsSync(join(root, "src", "components", "applications", file))) {
    fail(`shared application component exists: ${file}`);
  }
}

const pageComponentPath = "src/components/applications/application-page.tsx";
if (existsSync(join(root, pageComponentPath))) {
  const pageComponent = read(pageComponentPath);
  if (!pageComponent.includes("<PageShell")) fail("shared application page preserves PageShell header and footer");
  for (const name of componentNames) {
    if (!pageComponent.includes(`<${name}`)) fail(`shared application page renders ${name}`);
  }
  if (!pageComponent.includes('"@type": "FAQPage"')) fail("shared application page renders FAQPage JSON-LD");
  if (!pageComponent.includes("applicationBreadcrumbJsonLd")) fail("shared application page renders breadcrumb JSON-LD");
}

const scenarioComponent = read("src/components/applications/application-scenarios.tsx");
for (const token of ["copy.photoScenarios", "copy.technicalScenarios", "page.scenarioImages", "copy.criterionLabel"]) {
  if (!scenarioComponent.includes(token)) fail(`application scenarios render ${token}`);
}

for (const imageFreeComponent of ["application-selection.tsx", "application-faq.tsx"]) {
  const source = read(`src/components/applications/${imageFreeComponent}`);
  if (source.includes("<Image") || source.includes("page.heroImage") || source.includes("page.scenarioImage") || source.includes("page.ctaImage")) {
    fail(`${imageFreeComponent} does not reuse application photography`);
  }
}

for (const slug of applicationSlugs) {
  const dataPath = `src/data/applications/${slug}.ts`;
  const ruRoutePath = `src/app/applications/${slug}/page.tsx`;
  if (!existsSync(join(root, dataPath))) {
    fail(`paired application data exists: ${slug}`);
    continue;
  }

  const data = read(dataPath);
  for (const token of ["content:", "ru:", "en:", "recommendedSlugs:", "heroImage:", "scenarioImages:", "photoScenarios:", "technicalScenarios:", "criterionLabel:"]) {
    if (!data.includes(token)) fail(`${slug} data includes ${token}`);
  }
  for (const legacyToken of ["const scenarioImage", "ctaImage:"]) {
    if (data.includes(legacyToken)) fail(`${slug} data removes legacy ${legacyToken}`);
  }

  const expectedAssetPrefix = `/assets/applications/${slug}/`;
  const pageImages = [...data.matchAll(/"(\/assets\/applications\/[^"']+\.webp)"/g)].map((match) => match[1]);
  const uniquePageImages = new Set(pageImages);
  if (pageImages.length !== 3 || uniquePageImages.size !== 3) {
    fail(`${slug} references exactly three unique production photos`);
  }
  for (const image of uniquePageImages) {
    if (!image.startsWith(expectedAssetPrefix)) fail(`${slug} owns its application photography: ${image}`);
    if (!existsSync(join(root, "public", image.slice(1)))) fail(`${slug} image exists: ${image}`);
  }
  for (const label of ruVisibleEnglishLabels) {
    const ruBlock = data.split("ru:")[1]?.split("en:")[0] || "";
    if (ruBlock.includes(label)) fail(`${slug} Russian content translates visible label ${label}`);
  }

  if (!existsSync(join(root, ruRoutePath))) {
    fail(`Russian route exists: ${slug}`);
    continue;
  }
  const route = read(ruRoutePath);
  if (!route.includes(`const slug = "${slug}"`)) fail(`${slug} Russian route declares slug`);
  if (!route.includes('getApplicationPage(slug, "ru")')) fail(`${slug} Russian route reads RU data`);
  if (!route.includes("<ApplicationPage")) fail(`${slug} Russian route renders shared page`);
  if (!route.includes("`/en${page.path}`")) fail(`${slug} Russian route links to EN equivalent`);
}

const enRoutePath = "src/app/en/applications/[slug]/page.tsx";
if (!existsSync(join(root, enRoutePath))) {
  fail("English dynamic application route exists");
} else {
  const enRoute = read(enRoutePath);
  for (const token of ["generateStaticParams", "generateMetadata", 'getApplicationPage(slug, "en")', "<ApplicationPage", "languagePath={page.path}"]) {
    if (!enRoute.includes(token)) fail(`English application route includes ${token}`);
  }
}

if (existsSync(join(root, "src", "components", "application-page.tsx"))) fail("legacy shared application component is removed");
if (existsSync(join(root, "src", "data", "application-page-content.ts"))) fail("legacy English-only application data is removed");

const sitemap = read("src/app/sitemap.ts");
const yandexList = read("scripts/list-yandex-urls.mjs");
for (const slug of applicationSlugs) {
  const path = `/applications/${slug}`;
  if (!sitemap.includes(path)) fail(`sitemap includes ${path}`);
  if (!yandexList.includes(path)) fail(`Yandex URL list includes ${path}`);
}

if (failures) {
  console.error(`Application page check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("Application page check passed.");
