import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const categoryFiles = [
  "sensor-protection",
  "sintered-filter-elements",
  "sample-gas-filters",
  "flow-control-accessories"
];

const checks = [];
const productSlugs = [];

checks.push({
  name: "accessory category definitions exist",
  pass: existsSync(join(root, "src", "data", "accessories", "categories.ts"))
});

for (const category of categoryFiles) {
  const path = `src/data/accessories/${category}.ts`;
  const exists = existsSync(join(root, path));
  checks.push({ name: `${category} data file exists`, pass: exists });
  if (!exists) continue;

  const source = read(path);
  const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
  productSlugs.push(...slugs.map((slug) => ({ category, slug })));
  checks.push({ name: `${category} contains exactly 6 accessories`, pass: slugs.length === 6 });
  checks.push({
    name: `${category} products include RU and EN procurement content`,
    pass: (source.match(/title:\s*\{\s*ru:/g) || []).length === 6 &&
      (source.match(/summary:\s*\{\s*ru:/g) || []).length === 6 &&
      (source.match(/selection:\s*\{\s*ru:/g) || []).length === 6 &&
      (source.match(/compatibleWith:\s*\{\s*ru:/g) || []).length === 6
  });

  const images = [...source.matchAll(/image:\s*"\/assets\/accessories\/([^"]+\.webp)"/g)].map((match) => match[1]);
  checks.push({
    name: `${category} has 6 local accessory images`,
    pass: images.length === 6 && images.every((image) => existsSync(join(root, "public", "assets", "accessories", image)))
  });
}

checks.push({ name: "accessory catalog contains 24 products", pass: productSlugs.length === 24 });
checks.push({
  name: "accessory slugs are unique within their category paths",
  pass: new Set(productSlugs.map(({ category, slug }) => `${category}/${slug}`)).size === productSlugs.length
});

const requiredRoutes = [
  "src/app/accessories/page.tsx",
  "src/app/accessories/[category]/page.tsx",
  "src/app/accessories/[category]/[slug]/page.tsx",
  "src/app/en/accessories/page.tsx",
  "src/app/en/accessories/[category]/page.tsx",
  "src/app/en/accessories/[category]/[slug]/page.tsx"
];
checks.push({ name: "RU and EN accessory routes exist", pass: requiredRoutes.every((path) => existsSync(join(root, path))) });

const sitemap = existsSync(join(root, "src", "app", "sitemap.ts")) ? read("src/app/sitemap.ts") : "";
const yandexList = existsSync(join(root, "scripts", "list-yandex-urls.mjs")) ? read("scripts/list-yandex-urls.mjs") : "";
checks.push({
  name: "sitemap includes accessory overview, categories and products",
  pass: sitemap.includes("accessoryCategories") && sitemap.includes("accessoryProducts") && sitemap.includes("/accessories")
});
checks.push({
  name: "Yandex list includes accessory overview, categories and products",
  pass: yandexList.includes("accessoryCategoryPaths") && yandexList.includes("accessoryProductPaths")
});

let failures = 0;
for (const check of checks) {
  if (check.pass) console.log(`OK ${check.name}`);
  else {
    failures += 1;
    console.error(`FAIL ${check.name}`);
  }
}

if (failures) {
  console.error(`Accessory check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("Accessory check passed.");
