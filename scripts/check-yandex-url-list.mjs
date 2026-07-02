import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const scriptPath = join(root, "scripts", "list-yandex-urls.mjs");

if (!existsSync(scriptPath)) {
  console.error("FAIL scripts/list-yandex-urls.mjs exists");
  process.exit(1);
}

const catalog = readFileSync(join(root, "src", "data", "catalog.ts"), "utf8");
const productSlugs = [...catalog.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const applicationPaths = ["/applications/industrial-humidity-monitoring", "/applications/compressed-air-dew-point", "/applications/glove-box-oxygen-analysis", "/applications/natural-gas-moisture-monitoring", "/applications/climate-chamber-humidity"];
const output = execFileSync(process.execPath, [scriptPath], { cwd: root, encoding: "utf8" });

const urls = output.split(/\r?\n/).map((line) => line.trim()).filter((line) => line.startsWith("https://sensemeter.ru"));
const expectedCount = 14 + applicationPaths.length * 2 + productSlugs.length * 2;
const requiredUrls = [
  "https://sensemeter.ru/",
  "https://sensemeter.ru/catalog",
  "https://sensemeter.ru/about",
  "https://sensemeter.ru/contact",
  "https://sensemeter.ru/en",
  "https://sensemeter.ru/en/catalog",
  "https://sensemeter.ru/en/about",
  "https://sensemeter.ru/en/contact",
  "https://sensemeter.ru/privacy",
  "https://sensemeter.ru/en/privacy",
  ...applicationPaths.map((path) => "https://sensemeter.ru" + path),
  ...applicationPaths.map((path) => "https://sensemeter.ru/en" + path)
];

for (const slug of productSlugs) {
  requiredUrls.push("https://sensemeter.ru/products/" + slug);
  requiredUrls.push("https://sensemeter.ru/en/products/" + slug);
}

const checks = [
  { name: "Yandex URL list has no duplicate URLs", pass: new Set(urls).size === urls.length },
  { name: "Yandex URL list includes " + expectedCount + " sitemap URLs", pass: urls.length === expectedCount },
  { name: "Yandex URL list includes every core, application and product URL", pass: requiredUrls.every((url) => urls.includes(url)) },
  {
    name: "Yandex URL list labels manual submission order",
    pass: output.includes("1. RU priority pages") && output.includes("2. RU application pages") && output.includes("3. RU product pages") && output.includes("4. EN priority pages") && output.includes("5. EN application pages") && output.includes("6. EN product pages") && output.includes("7. Optional legal pages")
  },
  { name: "Yandex URL list excludes noindex thank-you pages", pass: !output.includes("/thank-you") }
];

let failures = 0;
for (const check of checks) {
  if (check.pass) console.log("OK " + check.name);
  else {
    failures += 1;
    console.error("FAIL " + check.name);
  }
}

if (failures) {
  console.error("Yandex URL list check failed: " + failures + " issue(s) found.");
  process.exit(1);
}
console.log("Yandex URL list check passed.");
