import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const appsDir = join(root, "src", "app", "applications");
const mappingPath = join(root, "src", "data", "application-links.ts");
const productPagePath = join(root, "src", "components", "site.tsx");

const applicationPages = [
  "industrial-humidity-monitoring",
  "compressed-air-dew-point",
  "glove-box-oxygen-analysis",
  "natural-gas-moisture-monitoring",
  "climate-chamber-humidity"
];

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error("FAIL " + message);
};

if (!existsSync(mappingPath)) {
  fail("src/data/application-links.ts exists");
} else {
  const mappingSource = readFileSync(mappingPath, "utf8");
  for (const page of applicationPages) {
    const pageSource = readFileSync(join(appsDir, page, "page.tsx"), "utf8");
    const pagePathMatch = pageSource.match(/const pagePath = "([^"]+)"/);
    const slugBlockMatch = pageSource.match(/const recommendedSlugs = \[([^\]]+)\]/s);

    if (!pagePathMatch) {
      fail(page + " declares pagePath");
      continue;
    }
    if (!slugBlockMatch) {
      fail(page + " declares recommendedSlugs");
      continue;
    }

    const applicationPath = pagePathMatch[1];
    const slugs = [...slugBlockMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
    for (const slug of slugs) {
      if (!mappingSource.includes(`"${slug}"`) || !mappingSource.includes(applicationPath)) {
        fail(slug + " links back to " + applicationPath);
      }
    }
  }
}

const productPageSource = readFileSync(productPagePath, "utf8");
if (!productPageSource.includes("getProductApplicationLinks")) {
  fail("product page renders application backlinks");
}
if (!productPageSource.includes("relatedApplications")) {
  fail("product page has localized related application heading");
}

const requiredHomeLinks = [
  "/applications/compressed-air-dew-point",
  "/applications/natural-gas-moisture-monitoring",
  "/applications/industrial-humidity-monitoring",
  "/applications/climate-chamber-humidity",
  "/applications/glove-box-oxygen-analysis"
];
for (const link of requiredHomeLinks) {
  if (!productPageSource.includes(link)) {
    fail("home application cards link to application pages");
    break;
  }
}

if (failures) {
  console.error("Application backlink check failed: " + failures + " issue(s) found.");
  process.exit(1);
}

console.log("Application backlink check passed.");
