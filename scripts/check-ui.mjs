import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const source = read("src/components/site.tsx");

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
    pass: () => source.includes("Chat with us") && source.includes('href={TELEGRAM_URL}') && source.includes("fixed bottom-5 right-5")
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
    name: "home application section keeps its carousel",
    pass: () => {
      const carouselPath = join(root, "src", "components", "card-carousel.tsx");
      if (!existsSync(carouselPath)) return false;
      const carouselSource = read("src/components/card-carousel.tsx");
      const uses = source.match(/<CardCarousel/g) || [];
      return source.includes('import { CardCarousel } from "@/components/card-carousel"') &&
        uses.length === 1 &&
        source.includes("<CardCarousel ariaLabel={c.applicationTitle}>") &&
        carouselSource.includes('"use client"') &&
        carouselSource.includes('scrollTo') &&
        carouselSource.includes('md:auto-cols-[calc((100%-3rem)/3)]');
    }
  },
  {
    name: "home categories use a stable grid with real product images",
    pass: () => {
      const catalogSource = read("src/data/catalog.ts");
      const i18nSource = read("src/lib/i18n.ts");
      return source.includes("grid gap-6 sm:grid-cols-2 min-[1150px]:grid-cols-4") &&
        !source.includes("<CardCarousel ariaLabel={c.categoriesTitle}>") &&
        !source.includes("<CardCarousel ariaLabel={c.categoriesTitle} autoPlay>") &&
        source.includes("mix-blend-multiply") &&
        source.includes("btn btn-outline mt-auto w-full !border-accent !text-accent") &&
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
        source.includes("h-28 w-[70%]") &&
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
    name: "home hero uses a muted local industrial video with a static fallback",
    pass: () => {
      const cssSource = read("src/app/globals.css");
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
    pass: () => source.includes("text-4xl") && source.includes("sm:text-5xl") && source.includes("md:text-7xl")
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
