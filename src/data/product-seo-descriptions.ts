import type { Locale } from "./catalog";

const descriptions: Record<string, Partial<Record<Locale, string>>> = {
  "mdm300": {
    "en": "MDM300 and MDM300 I.S. for portable dew-point checks in compressed air and gases. Review version, sampling needs, documents and request pricing."
  },
  "hmp3-hmpx": {
    "en": "Vaisala HMP3 humidity and temperature probe with Modbus RTU over RS-485. Connect to a compatible system directly or via Indigo. Request a quote."
  }
};

export function getProductSeoDescription(locale: Locale, slug: string) {
  return Object.hasOwn(descriptions, slug) ? descriptions[slug][locale] : undefined;
}
