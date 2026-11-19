export type Locale = "ru" | "en";
export type CategoryId = "MICHELL" | "ROTRONIC" | "VAISALA" | "AII";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Category = {
  id: CategoryId;
  title: string;
  description: LocalizedText;
  image: string;
  backgroundImage: string;
};

export type ApplicationScene = {
  id: "compressedAir" | "gas" | "industrialHumidity" | "lab" | "oxygen";
  image: string;
  imagePosition: string;
  category: LocalizedText;
  title: LocalizedText;
  text: LocalizedText;
};

export type Product = {
  slug: string;
  model: string;
  category: CategoryId;
  brand: string;
  image: string;
  pdf: string;
  featured?: boolean;
  overview: LocalizedText;
  params: LocalizedList;
  highlights: LocalizedList;
  applications: LocalizedList;
  selectionInputs?: LocalizedList;
};

export const categories: Category[] = [
  {
    id: "MICHELL",
    title: "MICHELL",
    description: {
      ru: "Датчики точки росы и гигрометры для газа, сжатого воздуха и опасных зон.",
      en: "Dew-point transmitters and hygrometers for gas, compressed air and hazardous areas."
    },
    image: "assets/brands/michell.webp",
    backgroundImage: "assets/products/MI_EasidewPRO-IS.png"
  },
  {
    id: "ROTRONIC",
    title: "ROTRONIC",
    description: {
      ru: "Промышленные датчики влажности и температуры, ручные приборы и зонды.",
      en: "Industrial humidity and temperature probes, handheld meters and sensors."
    },
    image: "assets/brands/rotronic.webp",
    backgroundImage: "assets/products/RT_HC2A_Industrial_Humidity_Probes.png"
  },
  {
    id: "VAISALA",
    title: "VAISALA",
    description: {
      ru: "Промышленные датчики влажности, температуры и точки росы для сложных условий.",
      en: "Industrial humidity, temperature and dew-point sensors for demanding conditions."
    },
    image: "assets/brands/vaisala.webp",
    backgroundImage: "assets/products/VA_DMT143-DMT143L.png"
  },
  {
    id: "AII",
    title: "AII",
    description: {
      ru: "Анализаторы кислорода для контроля следовых концентраций и чистоты газа в перчаточных боксах и промышленных линиях.",
      en: "Oxygen analyzers for ppm levels, gas purity, glove boxes and industrial lines."
    },
    image: "assets/brands/aii.webp",
    backgroundImage: "assets/products/AI_GPR-1900-Oxygen-Analyzer.png"
  }
];

export const applicationScenes: ApplicationScene[] = [
  {
    id: "compressedAir",
    image: "assets/home-applications/compressed-air.webp",
    imagePosition: "54% 50%",
    category: { ru: "Точка росы", en: "Dew point" },
    title: { ru: "Сжатый воздух и осушители", en: "Compressed Air and Dryers" },
    text: {
      ru: "Контроль точки росы в осушителях, пневмолиниях, медицинском и технологическом воздухе.",
      en: "Dew-point monitoring for dryers, pneumatic lines, medical air and process air systems."
    }
  },
  {
    id: "gas",
    image: "assets/home-applications/natural-gas.webp",
    imagePosition: "50% 52%",
    category: { ru: "Влага в газе", en: "Gas moisture" },
    title: { ru: "Газопереработка и трубопроводы", en: "Gas Processing and Pipelines" },
    text: {
      ru: "Контроль влаги и точки росы в природном газе, сжатом воздухе и технологических линиях.",
      en: "Moisture and dew-point monitoring in natural gas, compressed air and process lines."
    }
  },
  {
    id: "industrialHumidity",
    image: "assets/home-applications/industrial-humidity.webp",
    imagePosition: "50% 48%",
    category: { ru: "Влажность и температура", en: "Humidity and temperature" },
    title: { ru: "Промышленная влажность", en: "Industrial Humidity Monitoring" },
    text: {
      ru: "Измерение влажности и температуры в производстве, воздуховодах, HVAC и технических системах.",
      en: "Humidity and temperature measurement in production areas, ducts, HVAC and technical systems."
    }
  },
  {
    id: "lab",
    image: "assets/home-applications/climate-chamber.webp",
    imagePosition: "48% 42%",
    category: { ru: "Испытания и калибровка", en: "Testing and calibration" },
    title: { ru: "Лаборатории и климатические камеры", en: "Laboratories and Climate Chambers" },
    text: {
      ru: "Точные измерения влажности для испытаний, калибровки, фармацевтики и чистых помещений.",
      en: "Precise humidity measurement for testing, calibration, pharmaceuticals and clean rooms."
    }
  },
  {
    id: "oxygen",
    image: "assets/home-applications/glove-box.webp",
    imagePosition: "60% 50%",
    category: { ru: "Кислород и чистота газа", en: "Oxygen and gas purity" },
    title: { ru: "Промышленные газы и производство", en: "Industrial Gases and Manufacturing" },
    text: {
      ru: "Контроль содержания кислорода и чистоты газа в генераторах, перчаточных боксах, печах и производственных линиях.",
      en: "Oxygen and gas purity monitoring for generators, glove boxes, furnaces and production lines."
    }
  }
];

export const products: Product[] = [
  {
    slug: "easidew-pro-is",
    model: "Easidew PRO I.S.",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_EasidewPRO-IS.png",
    pdf: "MI_EasidewPRO-IS.pdf",
    overview: {
      ru: "Искробезопасный датчик Easidew PRO I.S. для контроля точки росы и содержания влаги в технологических газах. Для измерения влаги в жидкостях подбирается отдельное исполнение PRO LQ I.S. Цена и наличие по запросу.",
      en: "Intrinsically safe Easidew PRO I.S. measures dew point and moisture in process gases. For moisture in liquids, specify the separate PRO LQ I.S. version. Request price and availability."
    },
    params: {
      ru: ["Диапазон: −110…+20 °Cdp или −100…+20 °Cdp", "Выход: 2-проводный 4–20 mA", "Точность: ±1 °C (−60…+20 °Cdp); ±2 °C (−110…−60 °Cdp)", "Рабочее давление зависит от исполнения и монтажа"],
      en: ["Range: −110…+20 °Cdp or −100…+20 °Cdp", "Output: 2-wire 4–20 mA", "Accuracy: ±1 °C (−60…+20 °Cdp); ±2 °C (−110…−60 °Cdp)", "Working pressure depends on the unit and installation"]
    },
    highlights: {
      ru: ["Сертификация ATEX, IECEx, UKCA и cQPSus", "Корпус из нержавеющей стали 316", "Прослеживаемый 13-точечный сертификат калибровки"],
      en: ["ATEX, IECEx, UKCA and cQPSus approvals", "316 stainless-steel construction", "Traceable 13-point calibration certificate"]
    },
    applications: {
      ru: ["Добыча и транспортировка природного газа", "Нефтехимия, НПЗ и опасные зоны", "Осушка трубопроводов, LNG/CNG, сжатого воздуха и защита катализаторов"],
      en: ["Natural gas production and transmission", "Petrochemical, refinery and hazardous-area processes", "Pipeline drying, LNG/CNG, compressed air and catalyst protection"]
    }
  },
  {
    slug: "easidew-34-m12",
    model: "Easidew 34 / Easidew M12",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_EasidewTransmitters.png",
    pdf: "MI_EasidewTransmitters_EN.pdf",
    overview: {
      ru: "Компактные преобразователи точки росы Easidew 34 и M12 для осушителей, сжатого воздуха и технологических газов. Разъём и допустимое давление зависят от модели; для опасной зоны предусмотрено отдельное исполнение Easidew I.S. Цена и наличие по запросу.",
      en: "Compact Easidew 34 and M12 dew-point transmitters for dryers, compressed air and process gases. Connector and pressure limits depend on the model; Easidew I.S. is a separate version for hazardous areas. Request price, availability and a quotation for Easidew 34 / Easidew M12."
    },
    params: {
      ru: ["Диапазон: -110 до +20 deg Cdp", "Точность: +/-2 deg Cdp", "Выход по точке росы или ppmV", "2-проводное питание от токовой петли"],
      en: ["Range: -110 to +20 deg Cdp", "Accuracy: +/-2 deg Cdp", "Dew point or ppmV output", "2-wire loop-powered connection"]
    },
    highlights: {
      ru: ["Датчик из нержавеющей стали 316", "RS485 для настройки диапазона и единиц", "Доступна сервисная перекалибровка"],
      en: ["316 stainless-steel sensor", "RS485 for range and unit configuration", "Low maintenance through recalibration service"]
    },
    applications: {
      ru: ["Осушители сжатого воздуха", "Водород, инертные и технические газы", "Контроль влаги в перчаточных боксах и сварочных газах"],
      en: ["Compressed air dryers", "Hydrogen, inert and bulk gases", "Moisture monitoring in glove boxes and welding gases"]
    }
  },
  {
    slug: "easidew-online",
    model: "Easidew Online",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_EasidewOnline.png",
    pdf: "MI_EasidewOnline_EN.pdf",
    overview: {
      ru: "Easidew Online — стационарный гигрометр с дисплеем и сигнализацией. Измеряет точку росы в осушителях, линиях дыхательного воздуха, водородных системах и перчаточных боксах. Цена и наличие по запросу.",
      en: "Easidew Online dew-point hygrometer for continuous monitoring in dryers, breathing air, hydrogen and glove boxes, with local display and alarm functions. Request price, availability and a quotation for Easidew Online."
    },
    params: {
      ru: ["Диапазон: −100…+20 или −110…+20 °Cdp по исполнению", "Содержание влаги: опция 0–3000 ppmv", "Выход: 4–20 или 0–20 мА", "Сигнализация: два настраиваемых реле"],
      en: ["Range: −100 to +20 or −110 to +20 °Cdp, by version", "Moisture content: 0–3000 ppmv option", "Output: 4–20 or 0–20 mA", "Alarms: two configurable relays"]
    },
    highlights: {
      ru: ["Панельный или настольный формат", "Аналоговый и цифровой выходы", "Защищенный датчик IP66 / NEMA 4"],
      en: ["Panel or bench format", "Analog and digital outputs", "Protected IP66 / NEMA 4 sensor"]
    },
    applications: {
      ru: ["Мембранные и адсорбционные осушители", "Дыхательный воздух", "Водород, инертные газы и перчаточные боксы"],
      en: ["Membrane and adsorption dryers", "Breathing air", "Hydrogen, inert gases and glove boxes"]
    }
  },
  {
    slug: "easidew-pro-xp",
    model: "Easidew PRO XP",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_EasidewPRO-XP.png",
    pdf: "MI_EasidewPRO-XP_EN.pdf",
    overview: {
      ru: "Взрывозащищённый датчик Easidew PRO XP для измерения точки росы и содержания влаги в природном и технологическом газе. Допустимое рабочее давление зависит от монтажа и применимых требований сертификации. Цена и наличие по запросу.",
      en: "Explosion-proof Easidew PRO XP transmitter for dew point and moisture in natural and process gases. The applicable pressure limit depends on installation and certification requirements. Request price, availability and a quotation for Easidew PRO XP."
    },
    params: {
      ru: ["Диапазон: −110…+20 °Cdp или −100…+20 °Cdp", "Выход: 2-проводный 4–20 mA", "Точность: ±1 °C (−60…+20 °Cdp); ±2 °C (−110…−60 °Cdp)", "Сертификаты: по исполнению корпуса и региону"],
      en: ["Range: −110…+20 °Cdp or −100…+20 °Cdp", "Output: 2-wire 4–20 mA", "Accuracy: ±1 °C (−60…+20 °Cdp); ±2 °C (−110…−60 °Cdp)", "Approvals: depend on housing and destination"]
    },
    highlights: {
      ru: ["Опция встроенного дисплея", "Сменный сенсор снижает простой", "Прослеживаемая 13-точечная калибровка"],
      en: ["Integral display option", "Sensor exchange program reduces downtime", "Traceable 13-point calibration"]
    },
    applications: {
      ru: ["Природный газ, биометан и контроль точки росы", "LNG/LPG, CNG, НПЗ и опасные зоны", "Печи термообработки, защита катализаторов и техническая консультация"],
      en: ["Natural gas, biomethane and dew-point control", "LNG/LPG, CNG, refinery and hazardous-area processes", "Heat-treatment furnaces, catalyst protection and technical consultation"]
    }
  },
  {
    slug: "gpr-1000-1100-2000-3500",
    model: "GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500",
    category: "AII",
    brand: "AII",
    image: "assets/products/AI_GPR-1100-GPR-2000-GPR-3500-v5.png",
    pdf: "AI_GPR-1100-GPR-2000-GPR-3500-v5.pdf",
    overview: {
      ru: "GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500 для кислорода в генераторах O2/N2, морских трюмах, сварочной продувке и полевых проверках: портативные анализаторы ppm и %. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Portable GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500 oxygen analyzers for O2/N2 generators, marine holds, welding purge and field checks at ppm or percent ranges. Request price, availability and a quotation for GPR-1000 / GPR-1100 / GPR-2000 / GPR-3500."
    },
    params: {
      ru: ["Диапазоны O₂: ppm или % по модели", "Разрешение GPR-1100: 0,01 ppmv", "Аккумулятор: до 30 дней в зависимости от режима", "Встроенный насос: опция GPR-2000"],
      en: ["O₂ ranges: ppm or percent, by model", "GPR-1100 resolution: 0.01 ppmv", "Battery: up to 30 days, depending on use", "Integral pump: GPR-2000 option"]
    },
    highlights: {
      ru: ["Прочный переносной формат", "Единый HMI для переносных и онлайн приборов", "Срок службы сенсора зависит от модели и состава газа"],
      en: ["Rugged portable format", "Common HMI across portable and online analyzers", "Sensor life depends on model and gas composition"]
    },
    applications: {
      ru: ["Генераторы кислорода и азота", "Морские трюмы и цистерны", "Проверка утечек и сварочная продувка"],
      en: ["Oxygen and nitrogen generators", "Marine holds and tanker checks", "Leak checking and welding purge"]
    }
  },
  {
    slug: "gpr-1500",
    model: "GPR-1500",
    category: "AII",
    brand: "AII",
    image: "assets/products/AI_GPR-1500-Series-Order-Codes-v4.png",
    pdf: "AI_GPR-1500-Series-Order-Codes-v4.pdf",
    overview: {
      ru: "Двухпроводный настенный преобразователь GPR-1500 для измерения следового кислорода в газах. GPR-1500A — отдельное исполнение с собственным питанием и выходами сигнализации. Цена и наличие по запросу.",
      en: "Wall-mounted, two-wire GPR-1500 transmitter for trace oxygen in gases. The GPR-1500A analyzer is a separate version with its own power supply and alarm outputs. Request price, availability and a quotation for GPR-1500."
    },
    params: {
      ru: ["Минимальная шкала O₂: 0–10 ppmv", "Предел обнаружения: 0,05 ppmv", "Выход GPR-1500: двухпроводный 4–20 мА", "Допуски: по исполнению и маркировке"],
      en: ["Lowest O₂ range: 0–10 ppmv", "Detection limit: 0.05 ppmv", "GPR-1500 output: two-wire 4–20 mA", "Approvals: check version and marking"]
    },
    highlights: {
      ru: ["Корпус NEMA для настенного монтажа", "Быстрое восстановление после воздуха", "Герметичный электрохимический сенсор"],
      en: ["NEMA wall-mount enclosure", "Fast recovery after exposure to air", "Sealed electrochemical sensor"]
    },
    applications: {
      ru: ["Чистота инертного газа и ppm-контроль O2", "Производство стеклопакетов и технологические линии", "Контроль следового O2 в чистых газах и подбор конфигурации"],
      en: ["Inert gas purity measurement and ppm O2 control", "Double-glazing production and process lines", "Trace O2 monitoring in clean gases and configuration support"]
    }
  },
  {
    slug: "gpr-1500gb-2500gb",
    model: "GPR-1500 GB / GPR-2500 GB",
    category: "AII",
    brand: "AII",
    image: "assets/products/AI_GPR-1500GB-2500GB.png",
    pdf: "AI_GPR-1500GB-2500GB.pdf",
    overview: {
      ru: "GPR-1500 GB и GPR-2500 GB измеряют низкие концентрации кислорода в перчаточных боксах и азотных генераторах. Предусмотрен прямой или выносной монтаж датчика. Цена и наличие по запросу.",
      en: "GPR-1500 GB / GPR-2500 GB glove-box oxygen analyzer for nitrogen generators and low-level O2 monitoring, with direct or remote sensor installation. Request price, availability and a quotation for GPR-1500 GB / GPR-2500 GB."
    },
    params: {
      ru: ["Диапазоны O₂: 1500 GB — от 0–10 ppm; 2500 GB — до 0–25%", "Погрешность: <2% выбранного диапазона при постоянных условиях", "Выход: 4–20 мА", "Питание по петле: 18–24 В"],
      en: ["O₂ ranges: 1500 GB starts at 0–10 ppm; 2500 GB up to 0–25%", "Accuracy: <2% of selected range at constant conditions", "Output: 4–20 mA", "Loop supply: 18–24 V"]
    },
    highlights: {
      ru: ["Для перчаточных боксов", "Фланец KF-40 или выносной датчик в зависимости от исполнения", "Опциональный модуль пробоотбора и калибровки"],
      en: ["Designed for glove boxes", "KF-40 flange and remote sensor options", "Sampling/calibration module option"]
    },
    applications: {
      ru: ["Контроль кислорода в перчаточных боксах", "Азотные генераторы", "Измерение низких концентраций кислорода"],
      en: ["Glove box oxygen monitoring", "Nitrogen generators", "Low-level O2 monitoring"]
    }
  },
  {
    slug: "gpr-1600-2600-3100",
    model: "GPR-1600 / GPR-2600 / GPR-3100",
    category: "AII",
    brand: "AII",
    image: "assets/products/AI_GPR1600 2600 3100.png",
    pdf: "AI_GPR1600 2600 3100.pdf",
    overview: {
      ru: "Высокоточный анализатор кислорода GPR-1600 / GPR-2600 / GPR-3100 для промышленных газов, контроля чистоты O2 и следовых ppm-измерений. Запросите цену, наличие и коммерческое предложение.",
      en: "High-accuracy GPR-1600 / GPR-2600 / GPR-3100 oxygen analyzer for industrial gases, O2 purity control and trace ppm measurement. Request price, availability and a quotation."
    },
    params: {
      ru: ["Диапазоны: следовые и процентные по модели", "Погрешность: зависит от модели и диапазона", "Выбор диапазона: ручной или автоматический по модели", "Сигнализация: два реле"],
      en: ["Ranges: trace or percent, by model", "Accuracy: depends on model and selected range", "Ranging: manual or automatic, by model", "Alarms: two relays"]
    },
    highlights: {
      ru: ["Единый простой HMI", "Выход индикации диапазона", "Встроенный bypass valve на GPR-1600"],
      en: ["Common easy-to-use HMI", "Range indication output", "Integrated bypass valve on GPR-1600"]
    },
    applications: {
      ru: ["Чистота промышленных газов и контроль O2", "Водородное производство и генераторы газов", "Термообработка, газовый анализ и техническая консультация"],
      en: ["Industrial gas product purity and O2 control", "Hydrogen production and gas generators", "Heat treatment, gas analysis and technical consultation"]
    }
  },
  {
    slug: "gpr-1900-2900",
    model: "GPR-1900 / GPR-2900",
    category: "AII",
    brand: "AII",
    image: "assets/products/AI_GPR-1900-Oxygen-Analyzer.png",
    pdf: "AI_GPR-1900-Oxygen-Analyzer.pdf",
    overview: {
      ru: "GPR-1900 и GPR-2900 — панельные анализаторы кислорода с выносным датчиком для генераторов азота и кислорода, перчаточных боксов и линий промышленных газов. Цена и наличие по запросу.",
      en: "Panel GPR-1900 / GPR-2900 oxygen analyzer for nitrogen generators, oxygen generators, glove boxes and industrial gases with remote sensor installation. Request price, availability and a quotation for GPR-1900 / GPR-2900."
    },
    params: {
      ru: ["Диапазоны O₂: GPR-1900 — следовые; GPR-2900 — процентные", "Погрешность: <2% выбранного диапазона при постоянных условиях", "Сигнализация: два настраиваемых реле и реле отказа питания", "Питание: 100–240 В перем. тока по паспорту 2024 года"],
      en: ["O₂ ranges: GPR-1900 trace; GPR-2900 percent", "Accuracy: <2% of selected range at constant conditions", "Alarms: two configurable relays and one power-failure relay", "Supply: 100–240 V AC per 2024 datasheet"]
    },
    highlights: {
      ru: ["Удаленный сенсор для гибкой установки", "Простая замена сенсора", "Ручная или автоматическая фиксация диапазона"],
      en: ["Remote sensor for flexible installation", "Easy sensor replacement", "Manual or automatic range lock"]
    },
    applications: {
      ru: ["Генераторы азота и кислорода", "Glove box, confined-space monitoring и контроль O2", "Металлообработка, pulp and paper bleaching и техническая консультация"],
      en: ["Nitrogen and oxygen generators", "Glove boxes, confined-space monitoring and O2 control", "Metal processing, pulp and paper bleaching with technical consultation"]
    }
  },
  {
    slug: "hc2a-industrial",
    model: "HC2A-IC / HC2A-IM / HC2A-IE",
    category: "ROTRONIC",
    brand: "ROTRONIC",
    image: "assets/products/RT_HC2A_Industrial_Humidity_Probes.png",
    pdf: "RT_HC2A_Industrial_Humidity_Probes.pdf",
    overview: {
      ru: "Промышленный датчик влажности и температуры HC2A для производственных сред, сушильных процессов, климатических камер и систем мониторинга. Запросите цену, наличие и коммерческое предложение.",
      en: "Industrial HC2A humidity and temperature sensor for production environments, drying processes, climate chambers and monitoring systems. Request price, availability and a quotation."
    },
    params: {
      ru: ["Влажность: 0–100 %RH", "Головка зонда: −100…+190 °C непрерывно", "Точность: ±0,8 %RH и ±0,1 K при 23 °C", "Выходы: UART и 2 × 0–1 В"],
      en: ["Humidity: 0–100 %RH", "Probe head: −100 to +190 °C continuous", "Accuracy: ±0.8 %RH and ±0.1 K at 23 °C", "Outputs: UART and 2 × 0–1 V"]
    },
    highlights: {
      ru: ["HYGROMER HT-1 humidity sensor", "Высокая повторяемость и стабильность", "Hot-swappable probe design"],
      en: ["HYGROMER HT-1 humidity sensor", "High repeatability and long-term stability", "Hot-swappable probe design"]
    },
    applications: {
      ru: ["Производственные среды и промышленный мониторинг влажности", "Промышленное производство, HVAC и BMS", "Сушка, климатические камеры и процессы под давлением"],
      en: ["Production environments and industrial humidity monitoring", "Industrial manufacturing, HVAC and BMS", "Drying, climate chambers and pressure processes"]
    }
  },
  {
    slug: "hc2a-series",
    model: "HC2A Series",
    category: "ROTRONIC",
    brand: "ROTRONIC",
    image: "assets/products/RT_59055E_HC2A.png",
    pdf: "RT_59055E_HC2A_datasheet.pdf",
    overview: {
      ru: "HC2A Series для климатических камер, HVAC, BMS и промышленного мониторинга: сменные датчики влажности и температуры Rotronic для точной интеграции в системы контроля. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Rotronic HC2A Series humidity and temperature probes for climate chambers, HVAC, BMS and industrial monitoring, designed for precise system integration. Request price, availability and a quotation for HC2A Series."
    },
    params: {
      ru: ["Влажность: 0–100 %RH", "Температура: −50…+100 °C", "Точность: по исполнению и условиям измерения", "Выходы: 2 × 0–1 В и UART"],
      en: ["Humidity: 0–100 %RH", "Temperature: −50 to +100 °C", "Accuracy: by probe version and measurement conditions", "Outputs: 2 × 0–1 V and UART"]
    },
    highlights: {
      ru: ["AirChip3000 рассчитывает точку росы и точку инея", "Замена зонда без отключения питания", "Фильтры для разных сред"],
      en: ["AirChip3000 calculates dew/frost point", "Hot-swappable design", "Filter options for different environments"]
    },
    applications: {
      ru: ["Фармацевтика", "Метеорология", "Пищевая отрасль, здания, бумага и текстиль"],
      en: ["Pharmaceutical industry", "Meteorology", "Food industry, building services, paper and textile"]
    }
  },
  {
    slug: "hp31-hp32",
    model: "HP31 / HP32",
    category: "ROTRONIC",
    brand: "ROTRONIC",
    image: "assets/products/RT_59073E_HP31-HP32.png",
    pdf: "RT_59073E_HP31-HP32.pdf",
    overview: {
      ru: "HP31 / HP32 для выездной проверки влажности и температуры, HVAC, BMS, складов и фармацевтических зон: ручной прибор с регистрацией данных. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "HP31 / HP32 handheld humidity and temperature meter for field checks, HVAC, BMS, storage rooms and pharmaceutical areas with data logging. Request price, availability and a quotation for HP31 / HP32."
    },
    params: {
      ru: ["Среда прибора: −10…+60 °C, 0–100 %RH без конденсации", "Точность HP31: ±2 %RH / ±0,3 °C при 23 °C", "Память: 64 000 точек", "Автономность: до 48 ч при записи с выключенным экраном"],
      en: ["Meter environment: −10 to +60 °C, 0–100 %RH non-condensing", "HP31 accuracy: ±2 %RH / ±0.3 °C at 23 °C", "Memory: 64,000 data points", "Battery: up to 48 h logging with screen off"]
    },
    highlights: {
      ru: ["Психрометрические расчеты", "Визуальные и звуковые тревоги", "Графический дисплей сохраненных данных"],
      en: ["Psychrometric calculations", "Visual and audible alarms", "Graphical display for stored data"]
    },
    applications: {
      ru: ["HVAC инспекция", "BMS", "Сельское хозяйство, пищевая и фармацевтическая отрасли"],
      en: ["HVAC field inspection", "Building management systems", "Agriculture, food and pharmaceutical industries"]
    }
  },
  {
    slug: "mdm300",
    model: "MDM300 / MDM300 I.S.",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_MDM300_EN-v9-7.png",
    pdf: "MI_MDM300_EN-v9-7.pdf",
    overview: {
      ru: "Портативный гигрометр точки росы MDM300 / MDM300 I.S. для быстрых выборочных измерений в сжатом воздухе и природном газе. Запросите цену, наличие и коммерческое предложение.",
      en: "Portable MDM300 / MDM300 I.S. dew-point hygrometer for rapid spot checks in compressed air and natural gas. Request price, availability and a quotation for MDM300."
    },
    params: {
      ru: ["Точность точки росы +/-1 deg C в диапазоне -60...+20 deg Cdp", "MDM300: T95 до -60 deg Cdp не более 15 минут", "MDM300 I.S.: T95 до -60 deg Cdp не более 30 минут", "Рабочее давление до 350 barg"],
      en: ["Dew-point accuracy +/-1 deg C from -60 to +20 deg Cdp", "MDM300: T95 to -60 deg Cdp in up to 15 minutes", "MDM300 I.S.: T95 to -60 deg Cdp in up to 30 minutes", "Operating pressure up to 350 barg"]
    },
    highlights: {
      ru: ["MDM300: до 48 часов типичной работы между зарядками", "MDM300 I.S.: до 24 часов типичной работы между зарядками", "Переносной корпус IP66 / NEMA 4", "Регистрация данных и настраиваемые принадлежности для отбора проб"],
      en: ["MDM300: up to 48 hours of typical use", "MDM300 I.S.: up to 24 hours of typical use", "IP66 / NEMA 4 portable enclosure", "Data logging and configurable sampling accessories"]
    },
    applications: {
      ru: ["Переработка природного газа, трубопроводы и контроль точки росы", "Контроль адсорбционных осушителей сжатого воздуха", "Нефтехимия, промышленные и медицинские газы"],
      en: ["Natural gas processing, pipelines and dew-point spot checks", "Monitoring desiccant dryers for compressed air", "Petrochemical, industrial gas and medical gas applications"]
    },
    selectionInputs: {
      ru: ["Тип газа и требуемые единицы измерения", "Рабочее давление и ожидаемый диапазон точки росы", "Обычная или искробезопасная версия", "Подключение к пробе, принадлежности для отбора и количество"],
      en: ["Gas type and measurement units", "Working pressure and expected dew-point range", "The standard MDM300 is for safe-area use. For a hazardous area, consider MDM300 I.S. only after checking the site's area classification and the specific unit's approval conditions. Confirm gas compatibility and sampling requirements for the intended application.", "Sample connection, sampling accessories and quantity"]
    }
  },
  {
    slug: "optidew-hz",
    model: "Optidew-HZ",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/Michell_Instruments_Optidew.png",
    pdf: "Michell_Instruments_Optidew_US_Datasheet_v3-1.pdf",
    overview: {
      ru: "Для Optidew-HZ требуется подтверждение точного заводского исполнения. Приложенная спецификация описывает гигрометры Optidew 401/501, а не отдельную модель HZ. Укажите код заказа или приложите фото шильдика к запросу.",
      en: "The exact manufacturer configuration for Optidew-HZ requires confirmation. The linked datasheet covers the Optidew 401/501 hygrometers, not a separate HZ model. Include the order code or a nameplate photo when requesting a quote."
    },
    params: {
      ru: ["Исполнение: уточняется по коду заказа"],
      en: ["Configuration: confirm by order code"]
    },
    highlights: {
      ru: ["Диапазон, точность и условия эксплуатации подтверждаются для выбранного исполнения"],
      en: ["Range, accuracy and operating limits must be confirmed for the selected configuration"]
    },
    applications: {
      ru: ["Для подбора укажите измеряемую величину, состав среды, давление и температуру"],
      en: ["For selection, specify the measured quantity, medium composition, pressure and temperature"]
    },
    selectionInputs: {
      ru: ["Заводское обозначение, код заказа или фото шильдика", "Измеряемая величина и среда", "Рабочие условия и требования к монтажу"],
      en: ["Manufacturer model, order code or nameplate photo", "Measured quantity and medium", "Operating conditions and mounting requirements"]
    }
  },
  {
    slug: "sf82-online",
    model: "SF82 Online",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_SF82_Online.png",
    pdf: "MI_SF82_Online.pdf",
    overview: {
      ru: "SF82 Online для сжатого воздуха, медицинского воздуха, осушителей и additive manufacturing: онлайн-гигрометр точки росы с пробоотборной системой и Modbus RTU. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "SF82 Online dew-point hygrometer for compressed air, medical air, dryers and additive manufacturing, with sampling system and Modbus RTU. Request price, availability and a quotation for SF82 Online."
    },
    params: {
      ru: ["Диапазон: −60…+60 °Cdp; другие шкалы по заказу", "Точность: ±2 °Cdp при температуре датчика −20…+50 °C", "Аналоговый выход: 4–20 или 0–20 мА", "Интерфейс: Modbus RTU по RS485"],
      en: ["Range: −60 to +60 °Cdp; other scales available", "Accuracy: ±2 °Cdp at −20 to +50 °C sensor temperature", "Analog output: 4–20 or 0–20 mA", "Interface: Modbus RTU over RS485"]
    },
    highlights: {
      ru: ["Поставляется с пробоотборной системой", "Два реле тревоги", "9-точечная прослеживаемая калибровка"],
      en: ["Includes sampling system", "Dual relay alarms", "9-point traceable calibration"]
    },
    applications: {
      ru: ["Мембранные и адсорбционные осушители", "Медицинский и дыхательный воздух", "Аддитивное производство, перчаточные боксы и литьё под давлением"],
      en: ["Membrane and adsorption dryers", "Medical and breathing air", "Additive manufacturing, glove boxes and injection molding"]
    }
  },
  {
    slug: "pura-transmitter",
    model: "Pura",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/Michell Pura.png",
    pdf: "Michell_Instruments_Pura_Transmitters_Datasheet.pdf",
    overview: {
      ru: "Pura для следовой влажности в сухих газах, сжатом воздухе, полупроводниковых и OEM-системах: компактный преобразователь для низких уровней влаги. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Pura trace moisture transmitter for dry gases, compressed air, semiconductor processes and OEM systems requiring low-level moisture monitoring. Request price, availability and a quotation for Pura."
    },
    params: {
      ru: ["Диапазон точки росы: −120…−40 °Cdp", "Выход: 4–20 мА или цифровой по исполнению", "Исполнения: PRM, OEM и SEN", "Тип подключения: VCR по исполнению"],
      en: ["Dew-point range: −120 to −40 °Cdp", "Output: 4–20 mA or digital, by version", "Builds: PRM, OEM and SEN", "Process connection: VCR, by version"]
    },
    highlights: {
      ru: ["Подходит для малых объемов и встроенных систем", "Быстрый доступ к технической документации", "Практичное решение для сухих технологических газов"],
      en: ["Suitable for compact and embedded systems", "Technical documentation available for review", "Practical solution for dry process gases"]
    },
    applications: {
      ru: ["Сжатый воздух", "Сухие технологические газы", "OEM-оборудование и системы осушки"],
      en: ["Compressed air", "Dry process gases", "OEM equipment and drying systems"]
    }
  },
  {
    slug: "hygroflex1",
    model: "HygroFlex1",
    category: "ROTRONIC",
    brand: "ROTRONIC",
    image: "assets/products/Rotronic HF1.png",
    pdf: "RT_59034E_HygroFlex1.pdf",
    overview: {
      ru: "HygroFlex1 для мониторинга влажности и температуры в HVAC, BMS, складах и производственных помещениях: компактный преобразователь для стандартных задач контроля воздуха. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "HygroFlex1 humidity and temperature transmitter for HVAC, BMS, storage rooms and production areas requiring standard air monitoring. Request price, availability and a quotation for HygroFlex1."
    },
    params: {
      ru: ["Влажность: 0–100 %RH без конденсации", "Монтаж: настенный, канальный или комнатный", "Выход: токовый или по напряжению, по исполнению", "Степень защиты: IP65 или IP30 по исполнению"],
      en: ["Humidity: 0–100 %RH non-condensing", "Mounting: wall, duct or room", "Output: current or voltage, by version", "Ingress protection: IP65 or IP30, by version"]
    },
    highlights: {
      ru: ["Простая интеграция в HVAC и BMS", "Стабильный мониторинг микроклимата", "Подходит для технических и производственных зон"],
      en: ["Easy integration into HVAC and BMS", "Stable climate monitoring", "Suitable for technical and production areas"]
    },
    applications: {
      ru: ["HVAC и BMS", "Склады и производственные помещения", "Контроль воздуха в помещениях"],
      en: ["HVAC and BMS", "Storage and production rooms", "Indoor air monitoring"]
    }
  },
  {
    slug: "hmt370ex",
    model: "HMT370EX",
    category: "VAISALA",
    brand: "VAISALA",
    image: "assets/products/Intrinsically Safe Humidity and Temperature Transmitter Series HMT370EX.png",
    pdf: "VA_HMT370EX-Datasheet-B211825EN-K.pdf",
    overview: {
      ru: "Искробезопасный датчик влажности и температуры HMT370EX для опасных зон, химических процессов и сложных промышленных сред. Запросите цену, наличие и коммерческое предложение.",
      en: "Intrinsically safe HMT370EX humidity and temperature sensor for hazardous areas, chemical processes and demanding industrial environments. Request price, availability and a quotation."
    },
    params: {
      ru: ["Влажность: 0–100 %RH при точке росы ≤ +95 °C", "Выходы: два двухпроводных 4–20 мА", "Зонды: температурные пределы зависят от исполнения", "Сертификация: по маркировке прибора и условиям монтажа"],
      en: ["Humidity: 0–100 %RH at dew point ≤ +95 °C", "Outputs: two 2-wire 4–20 mA channels", "Probes: temperature limits depend on version", "Approvals: see unit marking and installation conditions"]
    },
    highlights: {
      ru: ["Разработан для сложных промышленных условий", "Гибкая конфигурация с разными зондами", "Подходит для процессов, где важна безопасность измерений"],
      en: ["Designed for demanding industrial conditions", "Flexible configuration with different probes", "Suitable for processes where measurement safety matters"]
    },
    applications: {
      ru: ["Опасные зоны и взрывоопасные участки", "Химические и технологические процессы", "Промышленный мониторинг влажности и температуры"],
      en: ["Hazardous areas and explosive atmospheres", "Chemical and process applications", "Industrial humidity and temperature monitoring"]
    }
  },
  {
    slug: "hmt310",
    model: "HMT310",
    category: "VAISALA",
    brand: "VAISALA",
    image: "assets/products/Humidity and Temperature Transmitter Series HMT310.png",
    pdf: "VA_HMT310-Datasheet-B210769EN-J.pdf",
    overview: {
      ru: "HMT310 для промышленных процессов, климатических камер, воздуховодов и лабораторного мониторинга: преобразователь влажности и температуры с гибкими вариантами установки. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "HMT310 humidity and temperature transmitter for industrial processes, climate chambers, ducts and laboratory monitoring with flexible installation options. Request price, availability and a quotation for HMT310."
    },
    params: {
      ru: ["Влажность: 0–100 %RH", "Выходы: два аналоговых канала и RS-232C", "Питание: 10–35 В пост. тока, минимум зависит от условий", "Температура и давление: по модели зонда"],
      en: ["Humidity: 0–100 %RH", "Outputs: two analog channels and RS-232C", "Supply: 10–35 V DC; minimum depends on conditions", "Temperature and pressure: by probe model"]
    },
    highlights: {
      ru: ["Подходит для непрерывного мониторинга", "Гибкий выбор конфигурации", "Используется в промышленных и лабораторных задачах"],
      en: ["Suitable for continuous monitoring", "Flexible configuration options", "Used in industrial and laboratory applications"]
    },
    applications: {
      ru: ["Климатические камеры", "Воздуховоды и HVAC", "Промышленные процессы и лаборатории"],
      en: ["Climate chambers", "Ducts and HVAC", "Industrial processes and laboratories"]
    }
  },
  {
    slug: "hmp3-hmpx",
    model: "HMP3",
    category: "VAISALA",
    brand: "VAISALA",
    image: "assets/products/Humidity and Temperature Probe HMP3.png",
    pdf: "VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf",
    overview: {
      ru: "Vaisala HMP3 - промышленный датчик влажности и температуры для HVAC, чистых помещений, окрасочных камер и климатических камер. Поддерживает Modbus RTU по RS-485 и совместим с преобразователями Indigo. Запросите цену, наличие и коммерческое предложение на HMP3.",
      en: "Vaisala HMP3 industrial humidity and temperature probe for HVAC, cleanrooms, paint booths and environmental chambers. Supports Modbus RTU over RS-485 and works with Indigo transmitters. Request price, availability and a quotation for HMP3."
    },
    params: {
      ru: ["Диапазон относительной влажности: 0–100 %RH при точке росы не выше +95 °C", "Точность измерения влажности: ±0,8 %RH при +23 °C и 0–90 %RH", "Диапазон измерения температуры: −40…+120 °C", "Точность измерения температуры: до ±0,1 °C"],
      en: ["Relative humidity range: 0–100 %RH at a dew point of +95 °C or below", "Relative humidity accuracy: ±0.8 %RH at +23 °C and 0–90 %RH", "Temperature measurement range: −40 to +120 °C", "Temperature accuracy: up to ±0.1 °C"]
    },
    highlights: {
      ru: ["Modbus RTU по RS-485 для автономного подключения", "Корпус зонда IP66 для промышленной эксплуатации", "Совместимость с преобразователями Vaisala Indigo и программой Insight", "Сменный фильтр; сенсор HUMICAP R2 допускает замену на месте"],
      en: ["Modbus RTU over RS-485 for standalone connectivity", "IP66 probe body for industrial environments", "Compatible with Vaisala Indigo transmitters and Insight software", "Replaceable filter; the HUMICAP R2 sensor can be replaced in the field"]
    },
    applications: {
      ru: ["Промышленные HVAC и установки обработки воздуха", "Чистые помещения и климатические камеры", "Окрасочные камеры и общепромышленные процессы"],
      en: ["Industrial HVAC and air handling units", "Cleanrooms and environmental chambers", "Paint booths and general industrial processes"]
    },
    selectionInputs: {
      ru: ["Условия применения и измеряемый газ", "Ожидаемые диапазоны температуры и влажности", "Автономный RS-485 Modbus или преобразователь Indigo", "Конфигурация HMP3 или код заказа HMPX, если известен", "Длина кабеля, монтаж, фильтр, количество и страна поставки"],
      en: ["Application environment and measured gas", "Expected temperature and humidity ranges", "Standalone RS-485 Modbus or Indigo transmitter", "HMP3 configuration or HMPX order code, if known", "Cable length, mounting, filter, quantity and delivery country"]
    }
  },
  {
    slug: "dmt153",
    model: "DMT153",
    category: "VAISALA",
    brand: "VAISALA",
    image: "assets/products/DMT153 Dew Point Transmitter.png",
    pdf: "VA_DMT153-Datasheet-B212905EN-B.pdf",
    overview: {
      ru: "DMT153 для OEM-систем осушки, сухого воздуха и компактного контроля точки росы: промышленный датчик для осушителей и встроенного оборудования. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Compact DMT153 dew-point transmitter for OEM drying systems, dry air monitoring and integrated equipment. Request price, availability and a quotation for DMT153."
    },
    params: {
      ru: ["Калиброванный диапазон: −80…−20 °C Td/f", "Точность: ±2 °C от −80 до −40 °C Td/f; ±3 °C от −40 до −20 °C Td/f при допустимой температуре газа", "Рабочее давление: 0–50 бар (абс.)", "Выходы: RS-485 Modbus RTU; 0–5/0–10 В и 0/4–20 мА"],
      en: ["Calibrated dew/frost-point range: -80 to -20 deg C Td/f", "Accuracy: +/-2 deg C at -80 to -40 deg C Td/f; +/-3 deg C at -40 to -20 deg C Td/f; see datasheet for gas-temperature limits", "Operating process pressure: 0-50 bar absolute", "Outputs: RS-485 Modbus RTU; 0-5/0-10 V and 0/4-20 mA"]
    },
    highlights: {
      ru: ["Очистка сенсора и автокалибровка; совместимость с Vaisala Indigo и Insight", "Нет сертификации Ex; применение с другими химическими веществами согласуйте с производителем", "Не предназначен для измерений в чистом CO₂ или SF₆"],
      en: ["Sensor purge and autocalibration; compatible with Indigo products and Insight software", "Not Ex-certified; other chemicals require manufacturer review", "Not suitable for measurements in pure carbon dioxide or sulfur hexafluoride"]
    },
    applications: {
      ru: ["Осушители сжатого воздуха и контроль сухого воздуха", "Сушилки для пластмасс и производственные линии", "Встроенный контроль точки росы в OEM-оборудовании"],
      en: ["Compressed air dryers and dry-air monitoring", "Plastic dryers and production lines", "Integrated dew-point monitoring in OEM equipment"]
    }
  },
  {
    slug: "dmt143-dmt143l",
    model: "DMT143 / DMT143L",
    category: "VAISALA",
    brand: "VAISALA",
    image: "assets/products/VA_DMT143-DMT143L.png",
    pdf: "VA_DMT143-Datasheet-B211207EN-L.pdf",
    overview: {
      ru: "DMT143 / DMT143L преобразователь точки росы для промышленных осушителей, сжатого воздуха, OEM-оборудования и сухих технологических газов. Цена по запросу: уточните наличие, исполнение, точку установки и получите коммерческое предложение.",
      en: "DMT143 / DMT143L miniature dew-point transmitters for industrial dryers, compressed air dew point testing, OEM equipment and dry process gases. Request price, availability and a quotation for DMT143 / DMT143L. Configuration is confirmed by installation point and project conditions."
    },
    params: {
      ru: ["Диапазон: по модели и типу сенсора", "Рабочее давление: DMT143 до 50 бар (абс.); DMT143L до 20 бар (абс.)", "Длины зонда: стандартная и удлинённая", "Интерфейс: RS-485, Modbus RTU или протокол Vaisala"],
      en: ["Range: by model and sensor", "Working pressure: DMT143 up to 50 bara; DMT143L up to 20 bara", "Probe lengths: standard and long", "Interface: RS-485, Modbus RTU or Vaisala protocol"]
    },
    highlights: {
      ru: ["Компактная установка в оборудовании", "Подходит для непрерывного контроля сухости", "Конфигурация для сжатого воздуха и OEM подтверждается по условиям проекта"],
      en: ["Compact installation in equipment", "Suitable for continuous dryness monitoring", "Configuration for compressed air and OEM use is confirmed by project conditions"]
    },
    applications: {
      ru: ["Сжатый воздух и контроль точки росы", "Промышленные осушители", "Сухие технологические газы и OEM-системы"],
      en: ["Compressed air dew point testing and monitoring", "Industrial dryers", "Dry process gases and OEM systems"]
    }
  }
];

export function productsByCategory(category: CategoryId) {
  return products.filter((product) => product.category === category);
}

export function findProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function assetPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function pdfPath(file: string) {
  return `/datasheets/${encodeURIComponent(file).replace(/%2F/g, "/")}`;
}
