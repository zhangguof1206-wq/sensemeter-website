import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const siteUrl = "https://sensemeter.ru";
const catalog = readFileSync(join(root, "src", "data", "catalog.ts"), "utf8");
const productSlugs = [...catalog.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

const ruPriorityPages = ["/", "/catalog", "/about", "/contact"];
const enPriorityPages = ["/en", "/en/catalog", "/en/about", "/en/contact"];
const optionalLegalPages = [
  "/privacy",
  "/personal-data-consent",
  "/cookie-policy",
  "/en/privacy",
  "/en/personal-data-consent",
  "/en/cookie-policy"
];

const absolute = (path) => `${siteUrl}${path}`;
const printSection = (title, urls) => {
  console.log(title);
  for (const url of urls) {
    console.log(url);
  }
  console.log("");
};

const ruProductPages = productSlugs.map((slug) => absolute(`/products/${slug}`));
const enProductPages = productSlugs.map((slug) => absolute(`/en/products/${slug}`));
const groups = [
  ["1. RU priority pages", ruPriorityPages.map(absolute)],
  ["2. RU product pages", ruProductPages],
  ["3. EN priority pages", enPriorityPages.map(absolute)],
  ["4. EN product pages", enProductPages],
  ["5. Optional legal pages", optionalLegalPages.map(absolute)]
];

console.log(`SenseMeter Yandex URL submission list`);
console.log(`Total sitemap URLs: ${groups.reduce((sum, [, urls]) => sum + urls.length, 0)}`);
console.log(`Products: ${productSlugs.length}`);
console.log("");

for (const [title, urls] of groups) {
  printSection(title, urls);
}
