import type { Locale } from "@/data/catalog";
import { climateChamberHumidity } from "@/data/applications/climate-chamber-humidity";
import { compressedAirDewPoint } from "@/data/applications/compressed-air-dew-point";
import { gloveBoxOxygenAnalysis } from "@/data/applications/glove-box-oxygen-analysis";
import { industrialHumidityMonitoring } from "@/data/applications/industrial-humidity-monitoring";
import { naturalGasMoistureMonitoring } from "@/data/applications/natural-gas-moisture-monitoring";

export const applicationPages = [
  industrialHumidityMonitoring,
  compressedAirDewPoint,
  gloveBoxOxygenAnalysis,
  naturalGasMoistureMonitoring,
  climateChamberHumidity
];

export function getApplicationPage(slug: string, locale: Locale) {
  const page = applicationPages.find((item) => item.slug === slug);
  return page ? { ...page, locale, copy: page.content[locale] } : undefined;
}

export type ResolvedApplicationPage = NonNullable<ReturnType<typeof getApplicationPage>>;
