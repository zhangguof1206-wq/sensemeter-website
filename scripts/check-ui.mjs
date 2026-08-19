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
const homeBrandCategoriesPath = join(root, "src", "components", "home", "home-brand-categories-section.tsx");
const homeBrandCategoriesSource = existsSync(homeBrandCategoriesPath) ? read("src/components/home/home-brand-categories-section.tsx") : "";
const homeAccessoriesSource = read("src/components/accessories/accessories-home-section.tsx");
const homeRevealObserverPath = join(root, "src", "components", "home", "home-reveal-observer.tsx");
const homeRevealObserverSource = existsSync(homeRevealObserverPath) ? read("src/components/home/home-reveal-observer.tsx") : "";

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
      source.includes('className="hidden lg:inline">Chat with us</span>') &&
      source.includes("lg:h-auto lg:w-auto lg:min-h-12")
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
    name: "home applications use the approved open editorial composition",
    pass: () =>
      source.includes('import { HomeApplicationsSection } from "@/components/home/home-applications-section"') &&
      source.includes("<HomeApplicationsSection locale={locale} />") &&
      !source.includes("<CardCarousel ariaLabel={c.applicationTitle}>") &&
      homeApplicationsSource.includes("application-editorial-grid") &&
      homeApplicationsSource.includes("application-feature") &&
      homeApplicationsSource.includes("application-side") &&
      homeApplicationsSource.includes("application-lower-grid") &&
      homeApplicationsSource.includes("application-section-heading") &&
      homeApplicationsSource.includes("application-action") &&
      !homeApplicationsSource.includes("application-card-action") &&
      !homeApplicationsSource.includes("bg-accent") &&
      !homeApplicationsSource.includes("rounded-") &&
      !homeApplicationsSource.includes("shadow") &&
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
    name: "home categories use an open divided grid with real product images",
    pass: () => {
      return source.includes('import { HomeBrandCategoriesSection } from "@/components/home/home-brand-categories-section"') &&
        source.includes("<HomeBrandCategoriesSection locale={locale} />") &&
        homeBrandCategoriesSource.includes("home-brand-grid") &&
        homeBrandCategoriesSource.includes("home-brand-entry") &&
        homeBrandCategoriesSource.includes("category.backgroundImage") &&
        homeBrandCategoriesSource.includes("category.image") &&
        homeBrandCategoriesSource.includes("category.description[locale]") &&
        homeBrandCategoriesSource.includes("grid-cols-[minmax(0,1fr)_110px]") &&
        homeBrandCategoriesSource.includes("border-line") &&
        !homeBrandCategoriesSource.includes("absolute right-0") &&
        !homeBrandCategoriesSource.includes("card") &&
        !homeBrandCategoriesSource.includes("shadow") &&
        !homeBrandCategoriesSource.includes("rounded-") &&
        !homeBrandCategoriesSource.includes("home-brand-action") &&
        !homeBrandCategoriesSource.includes("viewCategoryProducts") &&
        !source.includes("<CardCarousel ariaLabel={c.categoriesTitle}>") &&
        !source.includes("<CardCarousel ariaLabel={c.categoriesTitle} autoPlay>") &&
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
        homeBrandCategoriesSource.includes("brand-instrument-background") &&
        homeBrandCategoriesSource.includes("brand-logo") &&
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
      const section = homeAccessoriesSource;
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
        section.includes("home-accessory-matrix") &&
        section.includes("home-accessory-entry") &&
        section.includes("grid-cols-2") &&
        section.includes("lg:grid-cols-3") &&
        section.includes("border-line") &&
        section.includes("mix-blend-multiply") &&
        section.includes("btn btn-primary") &&
        section.includes("home-accessory-image") &&
        section.includes("home-accessory-copy") &&
        !section.includes("bg-[#e5ebf0]") &&
        !section.includes("home-accessory-tile") &&
        !section.includes("rounded-") &&
        !section.includes("shadow") &&
        !section.includes("hover:scale") &&
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
    name: "home redesign follows the approved industrial editorial system",
    pass: () =>
      source.includes("home-hero-shell") &&
      source.includes("home-hero-content") &&
      source.includes("home-hero-title") &&
      source.includes("home-hero-secondary-link") &&
      source.includes("home-hero-details") &&
      source.includes("home-hero-details-label") &&
      i18nSource.includes("categoriesHeading:") &&
      source.includes("home-section-reveal") &&
      homeBrandCategoriesSource.includes("home-brand-entry") &&
      homeApplicationsSource.includes("application-editorial-grid") &&
      homeApplicationsSource.includes("lg:border-t") &&
      !homeApplicationsSource.includes("border-t border-line pt-10") &&
      homeAccessoriesSource.includes("home-accessory-matrix") &&
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
      cssSource.includes(".home-reveal-ready [data-home-reveal]") &&
      cssSource.includes(".home-hero-title") &&
      cssSource.includes(".home-brand-entry") &&
      cssSource.includes("prefers-reduced-motion: reduce")
  },
  {
    name: "home calls to action are visually distinct from body text",
    pass: () =>
      homeApplicationsSource.includes("application-action") &&
      homeApplicationsSource.includes("border border-[#173963]") &&
      homeApplicationsSource.includes("hover:bg-[#173963]") &&
      homeApplicationsSource.includes("hover:text-white") &&
      homeAccessoriesSource.includes("btn btn-primary") &&
      !homeApplicationsSource.includes("border-b border-slate-400 pb-1") &&
      !homeAccessoriesSource.includes("accessory-text-link")
  },
  {
    name: "all home application actions use the same direct hover treatment",
    pass: () =>
      homeApplicationsSource.includes("application-action") &&
      homeApplicationsSource.includes("hover:bg-[#173963]") &&
      homeApplicationsSource.includes("hover:text-white") &&
      homeApplicationsSource.includes("application-side group") &&
      homeApplicationsSource.includes("home-reveal-delay-${index} group grid")
  },
  {
    name: "home brand rows reveal clickability without repeated text actions",
    pass: () =>
      homeBrandCategoriesSource.includes("home-brand-entry") &&
      !homeBrandCategoriesSource.includes("home-brand-action") &&
      !homeBrandCategoriesSource.includes("viewCategoryProducts") &&
      cssSource.includes(".home-brand-entry:hover") &&
      cssSource.includes("translateY(-4px)") &&
      cssSource.includes(".home-brand-entry:focus-visible")
  },
  {
    name: "home entry motion runs on viewport entry and respects reduced motion",
    pass: () =>
      source.includes('import { HomeRevealObserver } from "@/components/home/home-reveal-observer"') &&
      source.includes("<HomeRevealObserver />") &&
      source.includes("data-home-reveal") &&
      homeBrandCategoriesSource.includes("data-home-reveal") &&
      homeAccessoriesSource.includes("data-home-reveal") &&
      homeApplicationsSource.includes("data-home-reveal") &&
      homeRevealObserverSource.includes("IntersectionObserver") &&
      homeRevealObserverSource.includes('classList.add("is-visible")') &&
      homeRevealObserverSource.includes("unobserve") &&
      cssSource.includes(".home-reveal-ready [data-home-reveal]") &&
      cssSource.includes('[data-home-reveal].is-visible') &&
      cssSource.includes("@media (prefers-reduced-motion: reduce)") &&
      !cssSource.includes("animation: home-section-rise")
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
    name: "home hero uses a restrained responsive title and keeps the original video",
    pass: () =>
      source.includes("home-hero-title") &&
      source.includes("text-[38px]") &&
      source.includes("sm:text-[46px]") &&
      source.includes("lg:text-[54px]") &&
      source.includes('src="/assets/video/industrial-measurement-hero.mp4"') &&
      !source.includes("lg:text-[64px]") &&
      !source.includes("font-black leading-[1.02]")
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
