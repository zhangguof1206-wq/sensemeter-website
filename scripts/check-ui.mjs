import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const source = read("src/components/site.tsx");
const cssSource = read("src/app/globals.css");
const i18nSource = read("src/lib/i18n.ts");
const catalogSource = read("src/data/catalog.ts");
const catalogNavDropdownPath = join(root, "src", "components", "catalog", "catalog-nav-dropdown.tsx");
const catalogNavDropdown = existsSync(catalogNavDropdownPath) ? read("src/components/catalog/catalog-nav-dropdown.tsx") : "";
const homeApplicationsPath = join(root, "src", "components", "home", "home-applications-section.tsx");
const homeApplicationsSource = existsSync(homeApplicationsPath) ? read("src/components/home/home-applications-section.tsx") : "";

const checks = [
  {
    name: "footer copyright starts with copyright symbol",
    pass: () => source.includes("&copy; 2026 SINOETM TECH LTD. All rights reserved.") && !source.includes("婕?2026")
  },
  {
    name: "contact email and Telegram are plain text",
    pass: () => !source.includes("mailto:${c.contactEmail}") && !source.includes('href={TELEGRAM_URL} target="_blank" rel="noreferrer"')
  },
  {
    name: "all pages render floating Telegram chat link",
    pass: () =>
      source.includes("Chat with us") &&
      source.includes('href={TELEGRAM_URL}') &&
      source.includes("fixed bottom-5 right-5") &&
      source.includes('className="hidden sm:inline">Chat with us</span>')
  },
  {
    name: "product catalog cards use compact spec rows",
    pass: () =>
      source.includes("product.params[locale].slice(0, 3)") &&
      source.includes("product-card-specs") &&
      source.includes("lg:grid-cols-3") && !source.includes("xl:grid-cols-4") &&
      !source.includes('<p className="mt-3 text-muted">{product.overview[locale]}</p>')
  },
  {
    name: "home applications use the approved editorial grid",
    pass: () =>
      source.includes('import { HomeApplicationsSection } from "@/components/home/home-applications-section"') &&
      source.includes("<HomeApplicationsSection locale={locale} />") &&
      !source.includes("<CardCarousel ariaLabel={c.applicationTitle}>") &&
      homeApplicationsSource.includes("grid grid-cols-1") &&
      homeApplicationsSource.includes("md:grid-cols-2") &&
      homeApplicationsSource.includes("lg:grid-cols-12") &&
      homeApplicationsSource.includes("lg:col-span-7") &&
      homeApplicationsSource.includes("lg:col-span-5") &&
      homeApplicationsSource.includes("md:col-span-2") &&
      !homeApplicationsSource.includes("hover:scale") &&
      !homeApplicationsSource.includes("hover:shadow-2xl")
  },
  {
    name: "home applications use five unique documented WebP photographs",
    pass: () => {
      const imagePaths = [
        "assets/home-applications/compressed-air.webp",
        "assets/home-applications/natural-gas.webp",
        "assets/home-applications/industrial-humidity.webp",
        "assets/home-applications/climate-chamber.webp",
        "assets/home-applications/glove-box.webp"
      ];
      return imagePaths.every((path) =>
        catalogSource.includes(`image: "${path}"`) && existsSync(join(root, "public", path))
      ) &&
        new Set(imagePaths).size === 5 &&
        catalogSource.includes("imagePosition:") &&
        catalogSource.includes("category:") &&
        !catalogSource.includes('image: "assets/application-compressed-air-user.png"') &&
        !catalogSource.includes('image: "assets/application-gas-processing.png"') &&
        !catalogSource.includes('image: "assets/application-industrial-humidity-monitoring-v2.png"') &&
        !catalogSource.includes('image: "assets/application-lab-chambers.png"') &&
        !catalogSource.includes('image: "assets/application-gas-manufacturing.png"') &&
        existsSync(join(root, "docs", "image-sources", "home-applications.md"));
    }
  },
  {
    name: "home categories use a stable grid with real product images",
    pass: () => {
      return source.includes("home-brand-card") &&
        source.includes("grid gap-5 sm:grid-cols-2 min-[1150px]:grid-cols-4") &&
        !source.includes("<CardCarousel ariaLabel={c.categoriesTitle}>") &&
        !source.includes("<CardCarousel ariaLabel={c.categoriesTitle} autoPlay>") &&
        source.includes("mix-blend-multiply") &&
        source.includes("btn btn-outline mt-auto w-full whitespace-nowrap !border-accent !text-accent") &&
        !source.includes("{count} {c.products}") &&
        !source.includes("category.showcaseProduct") &&
        !source.includes("category.showcaseBullets") &&
        catalogSource.includes('image: "assets/brands/michell.webp"') &&
        catalogSource.includes('image: "assets/brands/rotronic.webp"') &&
        catalogSource.includes('image: "assets/brands/vaisala.webp"') &&
        catalogSource.includes('image: "assets/brands/aii.webp"') &&
        catalogSource.includes('backgroundImage: "assets/products/MI_EasidewPRO-IS.png"') &&
        catalogSource.includes('backgroundImage: "assets/products/RT_HC2A_Industrial_Humidity_Probes.png"') &&
        catalogSource.includes('backgroundImage: "assets/products/VA_DMT143-DMT143L.png"') &&
        catalogSource.includes('backgroundImage: "assets/products/AI_GPR-1900-Oxygen-Analyzer.png"') &&
        source.includes("brand-instrument-background") &&
        source.includes("brand-logo") &&
        source.includes("h-24 w-[68%]") &&
        source.includes("contrast-125") &&
        ["michell.webp", "rotronic.webp", "vaisala.webp", "aii.webp"].every((file) =>
          existsSync(join(root, "public", "assets", "brands", file))
        ) &&
        !catalogSource.includes("showcaseImage:") &&
        !catalogSource.includes("showcaseProduct:") &&
        !catalogSource.includes("showcaseBullets:") &&
        i18nSource.includes("categoriesLead:") &&
        i18nSource.includes("viewCategoryProducts:") &&
        !i18nSource.includes("featuredProduct:");
    }
  },
  {
    name: "accessories belong to Product Catalog navigation",
    pass: () => {
      const sectionPath = join(root, "src", "components", "accessories", "accessories-home-section.tsx");
      if (!existsSync(sectionPath)) return false;
      const section = read("src/components/accessories/accessories-home-section.tsx");
      const indexPage = read("src/components/accessories/accessories-index-page.tsx");
      const categoryPage = read("src/components/accessories/accessory-category-page.tsx");
      const detailPage = read("src/components/accessories/accessory-detail-page.tsx");
      return source.includes('import { AccessoriesHomeSection } from "@/components/accessories/accessories-home-section"') &&
        source.includes("<AccessoriesHomeSection locale={locale} />") &&
        !source.includes('["accessories",') &&
        !source.includes('active: "home" | "catalog" | "accessories"') &&
        [indexPage, categoryPage, detailPage].every((page) => page.includes('active="catalog"')) &&
        source.includes('import { CatalogNavDropdown } from "@/components/catalog/catalog-nav-dropdown"') &&
        source.includes("<CatalogNavDropdown") &&
        catalogNavDropdown.includes("catalog-dropdown-panel") &&
        catalogNavDropdown.includes("group-hover:visible") &&
        !catalogNavDropdown.includes("group-focus-within:visible") &&
        catalogNavDropdown.includes("top-full") &&
        catalogNavDropdown.includes("pt-2") &&
        catalogNavDropdown.includes("w-44") &&
        catalogNavDropdown.includes("text-sm font-black") &&
        !catalogNavDropdown.includes("hint:") &&
        !catalogNavDropdown.includes("item.hint") &&
        !catalogNavDropdown.includes("mt-2") &&
        catalogNavDropdown.includes('localizedPath(locale, "/catalog")') &&
        catalogNavDropdown.includes('localizedPath(locale, "/accessories")') &&
        !source.includes("catalogDropdownItems") &&
        !source.includes("ProductCatalogSwitch") &&
        !indexPage.includes("ProductCatalogSwitch") &&
        section.includes("homeAccessoryProducts") &&
        section.includes("aspect-[4/3]") &&
        section.includes("bg-[#e9eef4] p-3") &&
        section.includes("rounded-[6px] border border-line bg-white shadow-sm") &&
        section.includes("hover:border-accent/45 hover:shadow-md") &&
        section.includes("min-h-[76px]") &&
        section.includes("max-h-[98%] max-w-[98%] object-contain drop-shadow-sm") &&
        !section.includes("mix-blend-multiply") &&
        !section.includes("border border-line bg-[#f7fafc]") &&
        !section.includes("h-full w-full object-contain") &&
        !section.includes("max-h-32") &&
        !section.includes("AccessorySpecTable") &&
        !section.includes("categoryModels") &&
        !section.includes("backOverview");
    }
  },
  {
    name: "home hero uses a muted local industrial video with a static fallback",
    pass: () => {
      return source.includes("hero-industrial-video") &&
        source.includes("autoPlay") &&
        source.includes("muted") &&
        source.includes("loop") &&
        source.includes("playsInline") &&
        source.includes('data-video-source="pexels-5571842"') &&
        source.includes('poster="/assets/video/industrial-measurement-poster.webp"') &&
        source.includes('src="/assets/video/industrial-measurement-hero.mp4"') &&
        existsSync(join(root, "public", "assets", "video", "industrial-measurement-hero.mp4")) &&
        existsSync(join(root, "public", "assets", "video", "industrial-measurement-poster.webp")) &&
        cssSource.includes("prefers-reduced-motion: reduce") &&
        cssSource.includes(".hero-industrial-video");
    }
  },
  {
    name: "home redesign follows design-taste pre-flight essentials",
    pass: () =>
      source.includes("home-hero-shell") &&
      source.includes("home-hero-content") &&
      source.includes("home-section-reveal") &&
      source.includes("home-brand-card") &&
      homeApplicationsSource.includes("home-application-card") &&
      read("src/components/accessories/accessories-home-section.tsx").includes("home-accessory-tile") &&
      !source.includes("home-hero-visual-grid") &&
      !source.includes("md:text-7xl") &&
      !source.includes("min-h-[640px]") &&
      !source.includes("c.applicationEyebrow") &&
      !source.includes("h-screen") &&
      !source.includes("window.addEventListener") &&
      !i18nSource.includes("categoriesLead: \"Выберите бренд, измерительную задачу и условия установки: точка росы, влажность, температура или кислород, а при необходимости — совместимые комплектующие.\"") &&
      cssSource.includes("--site-header-height") &&
      cssSource.includes("calc(100dvh - var(--site-header-height))") &&
      cssSource.includes("@media (prefers-reduced-motion: no-preference)") &&
      cssSource.includes(".home-section-reveal") &&
      cssSource.includes(".home-brand-card:hover") &&
      cssSource.includes("prefers-reduced-motion: reduce")
  },
  {
    name: "cookie banner is compact on narrow screens",
    pass: () => {
      const cookieBannerSource = read("src/components/cookie-banner.tsx");
      return cookieBannerSource.includes("inset-x-3 bottom-3") &&
        cookieBannerSource.includes("md:inset-x-0 md:bottom-0") &&
        cookieBannerSource.includes("text-xs leading-5") &&
        cookieBannerSource.includes("grid-cols-2 gap-2");
    }
  },
  {
    name: "home hero title fits narrow screens without horizontal overflow",
    pass: () => source.includes("text-4xl") && source.includes("sm:text-5xl") && source.includes("lg:text-[64px]") && !source.includes("md:text-7xl")
  }
];

let failures = 0;
for (const check of checks) {
  if (check.pass()) {
    console.log(`OK ${check.name}`);
  } else {
    failures += 1;
    console.error(`FAIL ${check.name}`);
  }
}

if (failures) {
  console.error(`UI check failed: ${failures} issue(s) found.`);
  process.exit(1);
}

console.log("UI check passed.");
