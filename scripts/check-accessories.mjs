import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const categoryFiles = [
  "custom-sintered-filter-elements",
  "sintered-microporous-accessories",
  "sintered-filter-cups",
  "gas-diffusers",
  "sensor-protection",
  "flow-control-accessories"
];

const checks = [];
const productSlugs = [];
const uniformAccessoryBackground = "bg-[#e9eef4]";
const usesUniformImageAsset = (image) => image.endsWith("-uniform.webp");

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
    name: `${category} has 6 local cache-safe uniform accessory images`,
    pass: images.length === 6 && images.every((image) => usesUniformImageAsset(image) && existsSync(join(root, "public", "assets", "accessories", image)))
  });
  checks.push({
    name: `${category} uses 6 distinct product images`,
    pass: images.length === 6 && new Set(images).size === 6
  });
}

const categoriesSource = read("src/data/accessories/categories.ts");
const categoryImages = [...categoriesSource.matchAll(/image:\s*"\/assets\/accessories\/([^"]+\.webp)"/g)].map((match) => match[1]);
const accessoryAssetFiles = readdirSync(join(root, "public", "assets", "accessories")).filter((file) => file.endsWith(".webp"));
const legacyAccessoryAssetFiles = accessoryAssetFiles.filter((file) => !usesUniformImageAsset(file));
checks.push({ name: "accessory catalog contains 36 products", pass: productSlugs.length === 36 });
checks.push({
  name: "accessory asset directory keeps only uniform browser-safe webp images",
  pass: accessoryAssetFiles.length >= 24 && legacyAccessoryAssetFiles.length === 0
});
checks.push({
  name: "accessory overview categories use 6 distinct representative images",
  pass: categoryImages.length === 6 && new Set(categoryImages).size === 6 && categoryImages.every(usesUniformImageAsset)
});
checks.push({
  name: "all accessory categories include localized specification ranges",
  pass: (categoriesSource.match(/specs:\s*\[/g) || []).length === 6
});
checks.push({
  name: "all accessory categories include technical notes and quotation inputs",
  pass: (categoriesSource.match(/technicalNotes:\s*\{/g) || []).length === 6 &&
    (categoriesSource.match(/requestItems:\s*\{/g) || []).length === 6
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
const getProductImage = (category, slug) => {
  const source = read(`src/data/accessories/${category}.ts`);
  const marker = `slug: "${slug}"`;
  const start = source.indexOf(marker);
  if (start === -1) return null;
  const nextProduct = source.indexOf("\n  {", start + marker.length);
  const block = source.slice(start, nextProduct === -1 ? source.length : nextProduct);
  const image = block.match(/image:\s*"([^"]+)"/);
  return image ? image[1] : null;
};
const homeRefs = [...homeAccessoryData.matchAll(/\["([^"]+)",\s*"([^"]+)"\]/g)].map((match) => ({
  category: match[1],
  slug: match[2]
}));
const homeImages = homeRefs.map(({ category, slug }) => getProductImage(category, slug)).filter(Boolean);
checks.push({
  name: "homepage accessory data contains exactly 6 representative products",
  pass: homeRefs.length === 6 &&
    categoryFiles.every((category) => homeAccessoryData.includes(`"${category}"`)) &&
    homeAccessoryData.includes("getAccessoryProduct")
});
checks.push({
  name: "homepage representative accessories use 6 distinct images",
  pass: homeImages.length === 6 && new Set(homeImages).size === 6
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
    homeSection.includes("home-accessory-image") &&
    homeSection.includes("object-cover") &&
    homeSection.includes("localizedPath(locale, `/accessories/${product.categorySlug}/${product.slug}`)")
});
checks.push({
  name: "homepage accessory images use stable sizing and containment",
  pass: homeSection.includes("home-accessory-image") &&
    homeSection.includes("home-accessory-image relative h-40 overflow-hidden bg-[#e9eef3]") &&
    homeSection.includes("absolute inset-0 block h-full w-full mix-blend-multiply") &&
    homeSection.includes('product.categorySlug === "sensor-protection"') &&
    homeSection.includes('? "object-contain" : "object-cover"') &&
    homeSection.includes("home-accessory-copy relative z-10") &&
    !homeSection.includes("h-28") &&
    !homeSection.includes("drop-shadow") &&
    !homeSection.includes("hover:scale") &&
    !homeSection.includes("max-h-32")
});
checks.push({
  name: "homepage accessories use an open technical matrix",
  pass: homeSection.includes("home-accessory-matrix") &&
    homeSection.includes("border-l border-t border-line") &&
    homeSection.includes("home-accessory-entry") &&
    homeSection.includes("home-accessory-copy") &&
    homeSection.includes("border-t border-line bg-white") &&
    homeSection.includes("btn btn-primary") &&
    !homeSection.includes('className="mt-5 text-sm font-bold') &&
    !homeSection.includes("rounded-") &&
    !homeSection.includes("shadow")
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
    !catalogNavDropdown.includes("group-focus-within:visible") &&
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
const accessoryDetailPage = read("src/components/accessories/accessory-detail-page.tsx");
const accessoryCopySource = [
  "src/data/accessories/copy.ts",
  "src/data/accessories/categories.ts",
  ...categoryFiles.map((category) => `src/data/accessories/${category}.ts`)
].map((path) => read(path)).join("\n");

checks.push({
  name: "accessory overview hero uses a catalog-style industrial background",
  pass: accessoriesIndex.includes('const accessoriesHeroImage = "/assets/application-gas-processing.png"') &&
    accessoriesIndex.includes("image={accessoriesHeroImage}") &&
    !accessoriesIndex.includes("image={accessoryCategories[0].image}") &&
    !accessoriesIndex.includes("accessories-hero-background.webp") &&
    existsSync(join(root, "public", "assets", "application-gas-processing.png"))
});
checks.push({
  name: "accessory overview hero uses a clean dark overlay without duplicate product panels",
  pass: accessoryHeading.includes("opacity-60") &&
    accessoryHeading.includes("rgba(20, 31, 42, 0.5)") &&
    !accessoryHeading.includes("rgba(20, 31, 42, 0.18)")
});
checks.push({
  name: "accessory overview omits the duplicate service band before the footer",
  pass: !accessoriesIndex.includes("AccessoryServiceBand") &&
    !accessoryCategoryPage.includes("AccessoryServiceBand") &&
    !accessoriesIndex.includes("requestCustom") &&
    !accessoriesIndex.includes("serviceTitle") &&
    !accessoriesIndex.includes("serviceText") &&
    !accessoriesIndex.includes('className="bg-steel px-5 py-10 text-white md:px-10"')
});
checks.push({
  name: "accessory category pages include technical notes and quotation inputs",
  pass: accessoryCategoryPage.includes("category.technicalNotes.items.map") &&
    accessoryCategoryPage.includes("category.requestItems[locale].map") &&
    accessoryCategoryPage.includes("c.selectionTitle")
});
checks.push({
  name: "accessory category cards use a view-more call to action",
  pass: accessoryCards.includes("c.viewCategory") &&
    !accessoryCards.includes("c.modelsAvailable") &&
    !accessoryCategoryPage.includes("c.modelsAvailable") &&
    accessoryCopySource.includes('viewCategory: "View more"') &&
    !accessoryCopySource.includes("catalog variants")
});
checks.push({
  name: "accessory overview uses compact category cards with contained images",
  pass: accessoriesIndex.includes("lg:grid-cols-3") &&
    !accessoriesIndex.includes("ProductCatalogSwitch") &&
    accessoryCards.includes("category.summary[locale]") &&
    accessoryCards.includes("aspect-[4/3]") &&
    accessoryCards.includes("accessory-product-image") &&
    accessoryCards.includes("accessory-category-image max-h-[94%] max-w-[94%] object-contain") &&
    accessoryCards.includes("accessory-product-image max-h-[94%] max-w-[94%] object-contain") &&
    accessoryCards.includes(`${uniformAccessoryBackground} p-4`) &&
    !accessoryCards.includes("mix-blend-multiply") &&
    !accessoryCards.includes("h-full w-full object-contain") &&
    !accessoryCards.includes("bg-[#eef2f5]") &&
    !accessoryCards.includes("category.specs.slice(0, 3)")
});
checks.push({
  name: "accessory detail image panel uses the same neutral product treatment",
  pass: accessoryDetailPage.includes(`${uniformAccessoryBackground} p-4`) &&
    accessoryDetailPage.includes("accessory-detail-image max-h-[94%] max-w-[94%] object-contain") &&
    !accessoryDetailPage.includes("mix-blend-multiply") &&
    !accessoryDetailPage.includes("grid aspect-square place-items-center bg-[#eef2f5]") &&
    !accessoryDetailPage.includes('className="h-full w-full object-contain"')
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
    "316L",
    "0.1-120",
    "uniform",
    "drawing",
    "oxygen",
    "nitrogen"
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
  pass: yandexList.includes("accessoryCategoryPaths") && yandexList.includes("accessoryProductPaths") &&
    categoryFiles.every((category) => yandexList.includes(category))
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
