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
    name: "home category and application sections use carousel",
    pass: () => {
      const carouselPath = join(root, "src", "components", "card-carousel.tsx");
      if (!existsSync(carouselPath)) return false;
      const carouselSource = read("src/components/card-carousel.tsx");
      const uses = source.match(/<CardCarousel/g) || [];
      return source.includes('import { CardCarousel } from "@/components/card-carousel"') &&
        uses.length >= 2 &&
        carouselSource.includes('"use client"') &&
        carouselSource.includes('scrollTo') &&
        carouselSource.includes('md:auto-cols-[calc((100%-3rem)/3)]');
    }
  },
  {
    name: "category marquee auto-plays while application carousel stays manual",
    pass: () => {
      const carouselSource = read("src/components/card-carousel.tsx");
      const cssSource = read("src/app/globals.css");
      return source.includes("<CardCarousel ariaLabel={c.categoriesTitle} autoPlay>") &&
        source.includes("<CardCarousel ariaLabel={c.applicationTitle}>") &&
        !source.includes("<CardCarousel ariaLabel={c.applicationTitle} autoPlay>") &&
        carouselSource.includes("autoPlay") &&
        carouselSource.includes("carousel-marquee") &&
        carouselSource.includes("[...items, ...items]") &&
        cssSource.includes("@keyframes card-carousel-marquee") &&
        cssSource.includes("animation-play-state: paused");
    }
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
