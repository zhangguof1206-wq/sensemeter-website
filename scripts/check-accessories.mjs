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
    name: `${category} products include neutral models and technical data`,
    pass: (source.match(/model:\s*"SM-[A-Z]{2}-[A-Z0-9]+"/g) || []).length === 6 &&
      (source.match(/specs:\s*\[/g) || []).length === 6 &&
      (source.match(/applications:\s*\{\s*ru:/g) || []).length === 6 &&
      (source.match(/relatedSlugs:\s*\[/g) || []).length === 6
  });
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
  name: "all accessory categories include localized specification ranges",
  pass: (read("src/data/accessories/categories.ts").match(/specs:\s*\[/g) || []).length === 4
});
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

const homeSection = read("src/components/accessories/accessories-home-section.tsx");
const homeAccessoryData = read("src/data/home-accessories.ts");
checks.push({
  name: "homepage accessory data contains exactly 6 representative products",
  pass: (homeAccessoryData.match(/\["[^"]+",\s*"[^"]+"\]/g) || []).length === 6 &&
    homeAccessoryData.includes("getAccessoryProduct")
});
checks.push({
  name: "homepage accessory section has no all accessories button",
  pass: !homeSection.includes("backOverview") && !homeSection.includes("/accessories\")}>{c.backOverview}")
});
checks.push({
  name: "homepage accessory section is image-first with concise linked items",
  pass: homeSection.includes("homeAccessoryProducts") &&
    homeSection.includes("grid-cols-2") &&
    homeSection.includes("lg:grid-cols-3") &&
    homeSection.includes("object-contain") &&
    homeSection.includes("localizedPath(locale, `/accessories/${product.categorySlug}/${product.slug}`)")
});
checks.push({
  name: "homepage accessory images use stable sizing and containment",
  pass: homeSection.includes("aspect-[4/3]") &&
    homeSection.includes("bg-white") &&
    homeSection.includes("p-3") &&
    homeSection.includes("h-full w-full object-contain") &&
    !homeSection.includes("max-h-32")
});
checks.push({
  name: "homepage accessory section keeps specs and models off overview cards",
  pass: !homeSection.includes("AccessorySpecTable") &&
    !homeSection.includes("modelsLabel") &&
    !homeSection.includes("category.specs") &&
    !homeSection.includes("viewCategory")
});

const shellSource = read("src/components/site.tsx");
const catalogNavDropdown = existsSync(join(root, "src", "components", "catalog", "catalog-nav-dropdown.tsx"))
  ? read("src/components/catalog/catalog-nav-dropdown.tsx")
  : "";
checks.push({
  name: "catalog selector lives in stable top navigation dropdown",
  pass: shellSource.includes('import { CatalogNavDropdown } from "@/components/catalog/catalog-nav-dropdown"') &&
    shellSource.includes("<CatalogNavDropdown") &&
    catalogNavDropdown.includes("catalog-dropdown-panel") &&
    catalogNavDropdown.includes("group-hover:visible") &&
    catalogNavDropdown.includes("group-focus-within:visible") &&
    catalogNavDropdown.includes("top-full") &&
    catalogNavDropdown.includes("pt-2") &&
    !catalogNavDropdown.includes("mt-2") &&
    catalogNavDropdown.includes('localizedPath(locale, "/catalog")') &&
    catalogNavDropdown.includes('localizedPath(locale, "/accessories")') &&
    !shellSource.includes("catalogDropdownItems") &&
    !shellSource.includes("ProductCatalogSwitch")
});
const accessoriesIndex = read("src/components/accessories/accessories-index-page.tsx");
const accessoryCards = read("src/components/accessories/accessory-cards.tsx");
const accessoryHeading = read("src/components/accessories/accessory-page-heading.tsx");
const accessoryCategoryPage = read("src/components/accessories/accessory-category-page.tsx");
const accessoryCopySource = [
  "src/data/accessories/copy.ts",
  "src/data/accessories/categories.ts",
  ...categoryFiles.map((category) => `src/data/accessories/${category}.ts`)
].map((path) => read(path)).join("\n");
checks.push({
  name: "accessory overview hero uses a dedicated industrial background",
  pass: accessoriesIndex.includes('const accessoriesHeroImage = "/assets/accessories/accessories-hero-background.webp"') &&
    accessoriesIndex.includes("image={accessoriesHeroImage}") &&
    !accessoriesIndex.includes("image={accessoryCategories[0].image}") &&
    existsSync(join(root, "public", "assets", "accessories", "accessories-hero-background.webp"))
});
checks.push({
  name: "accessory overview hero keeps the product background visible",
  pass: accessoryHeading.includes("opacity-70") &&
    accessoryHeading.includes("rgba(20, 31, 42, 0.18)")
});
checks.push({
  name: "accessory category cards use a view-more call to action",
  pass: accessoryCards.includes("c.viewCategory") &&
    !accessoryCards.includes("c.modelsAvailable") &&
    !accessoryCategoryPage.includes("c.modelsAvailable") &&
    accessoryCopySource.includes('viewCategory: "Подробнее"') &&
    accessoryCopySource.includes('viewCategory: "View more"') &&
    !accessoryCopySource.includes("catalog variants") &&
    !accessoryCopySource.includes("вариантов в каталоге")
});
checks.push({
  name: "accessory overview uses compact category cards with contained images",
  pass: accessoriesIndex.includes("lg:grid-cols-4") &&
    !accessoriesIndex.includes("ProductCatalogSwitch") &&
    accessoryCards.includes("category.summary[locale]") &&
    accessoryCards.includes("aspect-[4/3]") &&
    accessoryCards.includes("accessory-product-image") &&
    accessoryCards.includes("max-h-[82%] max-w-[82%] object-contain") &&
    accessoryCards.includes("p-6") &&
    !accessoryCards.includes("h-full w-full object-contain") &&
    !accessoryCards.includes("category.specs.slice(0, 3)")
});

checks.push({
  name: "accessory copy uses professional filtering and gas-line terminology without source brands",
  pass: [
    "pore structure",
    "permeability",
    "pressure drop",
    "backwash",
    "laminar flow",
    "no particle shedding",
    "dead volume",
    "0.003",
    "VCR",
    "структура пор",
    "проницаемость",
    "перепад давления",
    "обратная промывка",
    "ламинарный поток",
    "без выделения частиц",
    "мёртвый объём"
  ].every((phrase) => accessoryCopySource.includes(phrase)) &&
    !["HENGKO", "恒歌", "深圳市恒歌"].some((phrase) => accessoryCopySource.includes(phrase))
});

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
