import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const siteUrl = "https://sensemeter.ru";
const catalog = readFileSync(join(root, "src", "data", "catalog.ts"), "utf8");
const productSlugs = [...catalog.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const accessoryCategorySlugs = ["sensor-protection", "sintered-filter-elements", "sample-gas-filters", "flow-control-accessories"];
const accessoryCategoryPaths = ["/accessories", ...accessoryCategorySlugs.map((slug) => "/accessories/" + slug)];
const accessoryProductPaths = accessoryCategorySlugs.flatMap((category) => {
  const source = readFileSync(join(root, "src", "data", "accessories", category + ".ts"), "utf8");
  return [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => "/accessories/" + category + "/" + match[1]);
});

const ruPriorityPages = ["/", "/catalog", "/about", "/contact"];
const ruApplicationPages = ["/applications/industrial-humidity-monitoring", "/applications/compressed-air-dew-point", "/applications/glove-box-oxygen-analysis", "/applications/natural-gas-moisture-monitoring", "/applications/climate-chamber-humidity"];
const enPriorityPages = ["/en", "/en/catalog", "/en/about", "/en/contact"];
const enApplicationPages = ruApplicationPages.map((path) => "/en" + path);
const ruAccessoryPages = [...accessoryCategoryPaths, ...accessoryProductPaths];
const enAccessoryPages = ruAccessoryPages.map((path) => "/en" + path);
const optionalLegalPages = [
  "/privacy",
  "/personal-data-consent",
  "/cookie-policy",
  "/en/privacy",
  "/en/personal-data-consent",
  "/en/cookie-policy"
];

const absolute = (path) => siteUrl + path;
const printSection = (title, urls) => {
  console.log(title);
  for (const url of urls) console.log(url);
  console.log("");
};

const ruProductPages = productSlugs.map((slug) => absolute("/products/" + slug));
const enProductPages = productSlugs.map((slug) => absolute("/en/products/" + slug));
const groups = [
  ["1. RU priority pages", ruPriorityPages.map(absolute)],
  ["2. RU application pages", ruApplicationPages.map(absolute)],
  ["3. RU product pages", ruProductPages],
  ["4. RU accessory pages", ruAccessoryPages.map(absolute)],
  ["5. EN priority pages", enPriorityPages.map(absolute)],
  ["6. EN application pages", enApplicationPages.map(absolute)],
  ["7. EN product pages", enProductPages],
  ["8. EN accessory pages", enAccessoryPages.map(absolute)],
  ["9. Optional legal pages", optionalLegalPages.map(absolute)]
];

console.log("SenseMeter Yandex URL submission list");
console.log("Total sitemap URLs: " + groups.reduce((sum, [, urls]) => sum + urls.length, 0));
console.log("Products: " + productSlugs.length);
console.log("Applications per language: " + ruApplicationPages.length);
console.log("Accessories per language: " + ruAccessoryPages.length);
console.log("");

for (const [title, urls] of groups) printSection(title, urls);
