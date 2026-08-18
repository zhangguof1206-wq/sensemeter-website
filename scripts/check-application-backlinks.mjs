import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const applicationSlugs = [
  "industrial-humidity-monitoring",
  "compressed-air-dew-point",
  "glove-box-oxygen-analysis",
  "natural-gas-moisture-monitoring",
  "climate-chamber-humidity"
];
const mappingPath = join(root, "src", "data", "application-links.ts");
const productPagePath = join(root, "src", "components", "site.tsx");
const homeApplicationsPath = join(root, "src", "components", "home", "home-applications-section.tsx");
let failures = 0;

const fail = (message) => {
  failures += 1;
  console.error(`FAIL ${message}`);
};

if (!existsSync(mappingPath)) {
  fail("src/data/application-links.ts exists");
} else {
  const mappingSource = readFileSync(mappingPath, "utf8");
  for (const slug of applicationSlugs) {
    const dataPath = join(root, "src", "data", "applications", `${slug}.ts`);
    if (!existsSync(dataPath)) {
      fail(`application data exists for ${slug}`);
      continue;
    }

    const source = readFileSync(dataPath, "utf8");
    const pathMatch = source.match(/path:\s*"([^"]+)"/);
    const recommendedMatch = source.match(/recommendedSlugs:\s*\[([^\]]+)\]/s);
    if (!pathMatch) {
      fail(`${slug} declares path`);
      continue;
    }
    if (!recommendedMatch) {
      fail(`${slug} declares recommendedSlugs`);
      continue;
    }

    const productSlugs = [...recommendedMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    for (const productSlug of productSlugs) {
      if (!mappingSource.includes(`"${productSlug}"`) || !mappingSource.includes(pathMatch[1])) {
        fail(`${productSlug} links back to ${pathMatch[1]}`);
      }
    }
  }
}

const productPageSource = readFileSync(productPagePath, "utf8");
if (!productPageSource.includes("getProductApplicationLinks")) fail("product page renders application backlinks");
if (!productPageSource.includes("relatedApplications")) fail("product page has localized related application heading");
if (!existsSync(homeApplicationsPath)) {
  fail("home applications component exists");
} else {
  const homeApplicationsSource = readFileSync(homeApplicationsPath, "utf8");
  for (const slug of applicationSlugs) {
    if (!homeApplicationsSource.includes(`/applications/${slug}`)) {
      fail("home application cards link to all application pages");
      break;
    }
  }
}

if (failures) {
  console.error(`Application backlink check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("Application backlink check passed.");
