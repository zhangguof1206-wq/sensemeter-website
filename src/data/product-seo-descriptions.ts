import type { Locale } from "./catalog";

const descriptions: Record<string, Partial<Record<Locale, string>>> = {
  "mdm300": {
    "en": "MDM300 and MDM300 I.S. for portable dew-point checks in compressed air and gases. Review version, sampling needs, documents and request pricing."
  },
  "hmp3-hmpx": {
    "en": "Vaisala HMP3 humidity and temperature probe with Modbus RTU over RS-485. Connect to a compatible system directly or via Indigo. Request a quote."
  },
  "dmt153": {
    "en": "Vaisala DMT153 low dew-point transmitter for dry gases, with RS-485 Modbus RTU and analog outputs. Specify pressure and connection for a quote."
  },
  "easidew-34-m12": {
    "en": "Michell Easidew 34 and M12 dew-point transmitters for compressed air dryers and dry gases. Specify connector, pressure and output for a quote."
  },
  "easidew-pro-is": {
    "en": "Michell Easidew PRO I.S. intrinsically safe dew-point transmitter for gas moisture measurement. Specify gas, pressure and approval needs for a quote."
  },
  "easidew-pro-xp": {
    "en": "Michell Easidew PRO XP explosion-proof dew-point transmitter for process gases. Specify gas, pressure and hazardous-area requirements for a quote."
  },
  "hp31-hp32": {
    "en": "Rotronic HygroPalm HP31 and HP32 handheld humidity and temperature meters. Specify fixed or interchangeable probe requirements for a quote."
  }
};

export function getProductSeoDescription(locale: Locale, slug: string) {
  return Object.hasOwn(descriptions, slug) ? descriptions[slug][locale] : undefined;
}
