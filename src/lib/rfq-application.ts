import type { ApplicationPageRecord } from "@/data/applications/types";
import type { Locale } from "@/data/catalog";

export function getRfqApplicationTitle(
  value: string | string[] | undefined,
  locale: Locale,
  pages: readonly ApplicationPageRecord[]
): string | undefined {
  if (typeof value !== "string") return undefined;
  return pages.find((page) => page.slug === value)?.content[locale].title;
}
