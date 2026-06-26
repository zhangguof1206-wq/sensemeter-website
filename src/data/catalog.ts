export type Locale = "ru" | "en";
export type CategoryId = "MICHELL" | "ROTRONIC" | "VAISALA" | "AII";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Category = {
  id: CategoryId;
  title: string;
  description: LocalizedText;
  image: string;
};

export type ApplicationScene = {
  id: string;
  image: string;
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
};

export const categories: Category[] = [
  {
    id: "MICHELL",
    title: "MICHELL",
    description: {
      ru: "Датчики точки росы и гигрометры для газа, сжатого воздуха и опасных зон.",
      en: "Dew-point transmitters and hygrometers for gas, compressed air and hazardous areas."
    },
    image: "assets/category-michell.png"
  },
  {
    id: "ROTRONIC",
    title: "ROTRONIC",
    description: {
      ru: "Промышленные датчики влажности и температуры, ручные приборы и зонды.",
      en: "Industrial humidity and temperature probes, handheld meters and sensors."
    },
    image: "assets/category-rotronic.png"
  },
  {
    id: "VAISALA",
    title: "VAISALA",
    description: {
      ru: "Промышленные датчики влажности, температуры и точки росы для сложных условий.",
      en: "Industrial humidity, temperature and dew-point sensors for demanding conditions."
    },
    image: "assets/category-vaisala.png"
  },
  {
    id: "AII",
    title: "AII",
    description: {
      ru: "Кислородные анализаторы для ppm, чистоты газов, glove box и промышленных линий.",
      en: "Oxygen analyzers for ppm levels, gas purity, glove boxes and industrial lines."
    },
    image: "assets/category-aii.png"
  }
];

export const applicationScenes: ApplicationScene[] = [
  {
    id: "gas",
    image: "assets/application-gas-processing.png",
    title: { ru: "Газопереработка и трубопроводы", en: "Gas Processing and Pipelines" },
    text: {
      ru: "Контроль влаги и точки росы в природном газе, сжатом воздухе и технологических линиях.",
      en: "Moisture and dew-point monitoring in natural gas, compressed air and process lines."
    }
  },
  {
    id: "lab",
    image: "assets/application-lab-chambers.png",
    title: { ru: "Лаборатории и климатические камеры", en: "Laboratories and Climate Chambers" },
    text: {
      ru: "Точные измерения влажности для испытаний, калибровки, фармацевтики и чистых помещений.",
      en: "Precise humidity measurement for testing, calibration, pharmaceuticals and clean rooms."
    }
  },
  {
    id: "oxygen",
    image: "assets/application-gas-manufacturing.png",
    title: { ru: "Промышленные газы и производство", en: "Industrial Gases and Manufacturing" },
    text: {
      ru: "Контроль кислорода и чистоты газов для генераторов, glove box, печей и производственных линий.",
      en: "Oxygen and gas purity monitoring for generators, glove boxes, furnaces and production lines."
    }
  }
];

export const products = [
  {
    slug: "easidew-pro-is",
    model: "Easidew PRO I.S.",
    category: "MICHELL",
    brand: "Michell",
    image: "assets/products/MI_EasidewPRO-IS.png",
    pdf: "MI_EasidewPRO-IS.pdf",
    overview: {
      ru: "Искробезопасный датчик точки росы Easidew PRO I.S. для тяжелых технологических условий, газов, неполярных жидкостей и опасных зон. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Intrinsically safe Easidew PRO I.S. dew-point transmitter for demanding process environments, gases, non-polar liquids and hazardous areas. Request price, availability and a quotation."
    },
    params: {
      ru: ["Диапазон: -110 до +20 deg Cdp", "Точность: +/-1 deg Cdp", "Выход: 2-проводный 4-20 mA", "Рабочее давление до 450 barg"],
      en: ["Range: -110 to +20 deg Cdp", "Accuracy: +/-1 deg Cdp", "Output: 2-wire 4-20 mA", "Pressure rating up to 450 barg"]
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
      ru: "Компактный промышленный преобразователь точки росы для безопасных и опасных зон с подключением MiniDIN или M12.",
      en: "Compact industrial dew-point transmitter for safe and hazardous areas with MiniDIN or M12 connection."
    },
    params: {
      ru: ["Диапазон: -110 до +20 deg Cdp", "Точность: +/-2 deg Cdp", "Выход по точке росы или ppmV", "2-проводное питание от токовой петли"],
      en: ["Range: -110 to +20 deg Cdp", "Accuracy: +/-2 deg Cdp", "Dew point or ppmV output", "2-wire loop-powered connection"]
    },
    highlights: {
      ru: ["Датчик из нержавеющей стали 316", "RS485 для настройки диапазона и единиц", "Низкое обслуживание за счет сервисной перекалибровки"],
      en: ["316 stainless-steel sensor", "RS485 for range and unit configuration", "Low maintenance through recalibration service"]
    },
    applications: {
      ru: ["Осушители сжатого воздуха", "Водород, инертные и технические газы", "Glove box, сварочные газы и контроль кислорода"],
      en: ["Compressed air dryers", "Hydrogen, inert and bulk gases", "Glove boxes, welding gases and oxygen purity monitoring"]
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
      ru: "Онлайн-гигрометр точки росы с локальным дисплеем, сигналами тревоги и промышленным датчиком.",
      en: "Online dew-point hygrometer with local display, alarm functions and a robust industrial sensor."
    },
    params: {
      ru: ["Диапазон: -100 до +20 deg Cdp", "Опция 0-3000 ppmV", "Выход 4-20 mA или 0-20 mA", "Два настраиваемых реле тревоги"],
      en: ["Range: -100 to +20 deg Cdp", "0-3000 ppmV option", "4-20 mA or 0-20 mA output", "Dual configurable alarms"]
    },
    highlights: {
      ru: ["Панельный или настольный формат", "Аналоговый и цифровой выходы", "Защищенный датчик IP66 / NEMA 4"],
      en: ["Panel or bench format", "Analog and digital outputs", "Protected IP66 / NEMA 4 sensor"]
    },
    applications: {
      ru: ["Мембранные и адсорбционные осушители", "Дыхательный воздух", "Водород, инертные газы и glove box"],
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
      ru: "Easidew PRO XP для природного газа, биометана, LNG/LPG и технологических газов: взрывозащищенный датчик точки росы с высокой точностью и давлением до 450 bar. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Explosion-proof Easidew PRO XP dew-point transmitter for natural gas, biomethane, LNG/LPG and process gases with high accuracy and pressure rating up to 450 bar. Request price, availability and a quotation for Easidew PRO XP."
    },
    params: {
      ru: ["Диапазон: -110 до +20 deg Cdp", "Точность: +/-1 deg Cdp", "2-проводный выход 4-20 mA", "Глобальные explosion/flameproof approvals"],
      en: ["Range: -110 to +20 deg Cdp", "Accuracy: +/-1 deg Cdp", "2-wire 4-20 mA output", "Global explosion/flameproof approvals"]
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
      ru: "Портативные кислородные анализаторы для полевых проверок, ppm-уровней и контроля чистоты газа.",
      en: "Portable oxygen analyzers for field checks, ppm-level measurement and gas purity control."
    },
    params: {
      ru: ["Диапазоны O2: 0-10 ppm до 0-100%", "Разрешение до 0.1 ppm по модели", "Батарея до 30 дней", "Опция внутреннего насоса"],
      en: ["O2 ranges: 0-10 ppm to 0-100%", "0.1 ppm capability depending on model", "Battery life up to 30 days", "Optional internal pump"]
    },
    highlights: {
      ru: ["Прочный переносной формат", "Единый HMI для переносных и онлайн приборов", "Срок службы сенсора 24-32 месяца"],
      en: ["Rugged portable format", "Common HMI across portable and online analyzers", "24-32 month sensor life"]
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
      ru: "GPR-1500 для следового кислорода в чистых газах, инертных средах и промышленных установках: настенный анализатор O2 для ppm-контроля. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Wall-mounted GPR-1500 trace oxygen analyzer for clean gases, inert atmospheres and industrial installations with ppm-level O2 control. Request price, availability and a quotation for GPR-1500."
    },
    params: {
      ru: ["Следовой кислород до 0-10 ppm", "Нижний предел обнаружения до 0.05 ppm", "Настраиваемые диапазоны", "Версии общего назначения и ATEX"],
      en: ["Trace oxygen down to 0-10 ppm", "Lower detection limit to 0.05 ppm", "User-configurable ranges", "General-purpose and ATEX versions"]
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
      ru: "Анализатор кислорода для glove box с прямой или удаленной установкой сенсора.",
      en: "Glove-box oxygen analyzer with direct or remote sensor installation options."
    },
    params: {
      ru: ["Диапазон: 0-10 ppm до 0-25% O2", "Точность лучше 2% выбранного диапазона", "Выход 4-20 mA", "Питание 18-24 V loop power"],
      en: ["Range: 0-10 ppm to 0-25% O2", "Accuracy better than 2% of selected range", "4-20 mA output", "18-24 V loop power"]
    },
    highlights: {
      ru: ["Разработан для glove box", "KF-40 flange и удаленный сенсор", "Опция sampling/calibration module"],
      en: ["Designed for glove boxes", "KF-40 flange and remote sensor options", "Sampling/calibration module option"]
    },
    applications: {
      ru: ["Мониторинг O2 в glove box", "Азотные генераторы", "Контроль низкого уровня кислорода"],
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
      ru: ["От trace ppm до контроля чистоты O2", "Точность до +/-0.02 ppm в низком диапазоне", "4 диапазона, ручной или автоматический выбор", "Два реле тревоги"],
      en: ["Trace ppm to oxygen purity measurement", "Accuracy down to +/-0.02 ppm in the lowest range", "Four ranges with manual or automatic ranging", "Dual alarms"]
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
      ru: "GPR-1900 / GPR-2900 для генераторов азота, кислорода, glove box и промышленных газов: панельный анализатор кислорода с удаленным сенсором. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Panel GPR-1900 / GPR-2900 oxygen analyzer for nitrogen generators, oxygen generators, glove boxes and industrial gases with remote sensor installation. Request price, availability and a quotation for GPR-1900 / GPR-2900."
    },
    params: {
      ru: ["Диапазон: 0-10 ppm до 0-100% O2", "Точность лучше 2% выбранного диапазона", "Два настраиваемых реле тревоги", "Питание 12-28 VDC или line power"],
      en: ["Range: 0-10 ppm to 0-100% O2", "Accuracy better than 2% of selected range", "Two configurable alarms", "12-28 VDC or line-power options"]
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
      ru: ["0-100% RH", "Рабочий диапазон до -100...200 deg C", "Точность +/-0.8% RH, +/-0.1 K при 23 deg C", "UART и масштабируемые 0-1 V выходы"],
      en: ["0-100% RH", "Operating range up to -100 to 200 deg C", "Accuracy +/-0.8% RH, +/-0.1 K at 23 deg C", "UART and scalable 0-1 V outputs"]
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
      ru: "Сменные датчики влажности и температуры Rotronic HC2A для интеграции и точного мониторинга.",
      en: "Interchangeable Rotronic HC2A humidity and temperature probes for integration and precise monitoring."
    },
    params: {
      ru: ["0-100% RH", "Стандартный диапазон -50 до 100 deg C", "Точность +/-0.8% RH или +/-0.5% RH", "2 аналоговых выхода 0-1 V"],
      en: ["0-100% RH", "Standard probe range -50 to 100 deg C", "Accuracy +/-0.8% RH or +/-0.5% RH", "2 analog 0-1 V outputs"]
    },
    highlights: {
      ru: ["AirChip3000 рассчитывает dew/frost point", "Hot-swappable конструкция", "Фильтры для разных сред"],
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
      ru: "Ручной прибор влажности и температуры для полевых проверок, HVAC и регистрации данных.",
      en: "Handheld humidity and temperature meter for field checks, HVAC and data logging."
    },
    params: {
      ru: ["Диапазон работы: -10 до 60 deg C, 0-100% RH", "HP31: +/-2% RH / +/-0.3 deg C при 23 deg C", "Память 64,000 точек", "Аккумулятор до 48 часов"],
      en: ["Operating range: -10 to 60 deg C, 0-100% RH", "HP31: +/-2% RH / +/-0.3 deg C at 23 deg C", "64,000 data point memory", "Battery up to 48 hours"]
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
      ru: "MDM300 для выездной проверки точки росы в природном газе, сжатом воздухе и опасных зонах: портативный гигрометр для сервисных и пусконаладочных работ. Цена по запросу: уточните наличие и получите коммерческое предложение.",
      en: "Portable MDM300 dew-point hygrometer for field checks in natural gas, compressed air and hazardous areas, suitable for service and commissioning work. Request price, availability and a quotation for MDM300."
    },
    params: {
      ru: ["Точность +/-1 deg Cdp от -60 до +20 deg Cdp", "T95 до -60 deg Cdp менее 15 минут", "Измерение давления до 350 barg", "Батарея до 48 часов"],
      en: ["Accuracy +/-1 deg Cdp from -60 to +20 deg Cdp", "T95 to -60 deg Cdp in under 15 minutes", "Pressure measurement up to 350 barg", "Battery life up to 48 hours"]
    },
    highlights: {
      ru: ["Легкий и прочный переносной формат", "Регистрация данных и аксессуары отбора проб", "I.S. версия для опасных зон"],
      en: ["Lightweight and rugged portable format", "Data logging and sampling accessories", "I.S. version for hazardous areas"]
    },
    applications: {
      ru: ["Природный газ, трубопроводы и контроль точки росы", "Осушители сжатого воздуха и сервисная проверка", "Petrochemical, industrial gas, medical gas и выездная диагностика"],
      en: ["Natural gas, pipelines and dew-point control", "Compressed air dryers and field service checks", "Petrochemical, industrial gas, medical gas and portable diagnostics"]
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
      ru: "Быстродействующий chilled mirror hygrometer для эталонных измерений влажности в лаборатории и производстве.",
      en: "Fast-response chilled mirror hygrometer for reference humidity measurement in laboratory and industrial use."
    },
    params: {
      ru: ["Диапазон точки росы: -40 до +120 deg C", "Точность точки росы +/-0.15 deg C", "Цветной сенсорный экран 5.7 inch", "Опция Modbus TCP Ethernet"],
      en: ["Dew-point range: -40 to +120 deg C", "Dew-point accuracy +/-0.15 deg C", "5.7 inch color touchscreen", "Optional Modbus TCP Ethernet"]
    },
    highlights: {
      ru: ["Drift-free reference measurement", "Hybrid mirror sensor", "Настольная или настенная конфигурация"],
      en: ["Drift-free reference measurement", "Hybrid mirror sensor", "Bench or wall-mount configuration"]
    },
    applications: {
      ru: ["Эталон для климатических камер", "Испытания воздуха двигателя", "HVAC, cleanroom и фармацевтические процессы"],
      en: ["Humidity reference for environmental chambers", "Engine intake air testing", "HVAC, cleanroom and pharmaceutical processes"]
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
      ru: "Онлайн-гигрометр точки росы с быстрым откликом, пробоотборной системой и Modbus RTU.",
      en: "Fast-response online dew-point hygrometer with sampling system and Modbus RTU."
    },
    params: {
      ru: ["Диапазон: -60 до +60 deg Cdp", "Точность +/-2 deg Cdp", "Выход 4-20 mA", "Modbus RTU over RS485"],
      en: ["Range: -60 to +60 deg Cdp", "Accuracy +/-2 deg Cdp", "4-20 mA output", "Modbus RTU over RS485"]
    },
    highlights: {
      ru: ["Поставляется с пробоотборной системой", "Два реле тревоги", "9-точечная прослеживаемая калибровка"],
      en: ["Includes sampling system", "Dual relay alarms", "9-point traceable calibration"]
    },
    applications: {
      ru: ["Мембранные и адсорбционные осушители", "Медицинский и дыхательный воздух", "Additive manufacturing, glove box, injection molding"],
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
      ru: "Компактный преобразователь следовой влажности для контроля сухих газов, сжатого воздуха и OEM-установок.",
      en: "Compact trace moisture transmitter for monitoring dry gases, compressed air and OEM installations."
    },
    params: {
      ru: ["Измерение точки росы и следовой влажности", "Компактный корпус для интеграции в систему", "Промышленный аналоговый выход", "PDF datasheet содержит полные диапазоны и варианты исполнения"],
      en: ["Dew-point and trace moisture measurement", "Compact body for system integration", "Industrial analog output", "PDF datasheet includes full ranges and configuration options"]
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
      ru: "Компактный преобразователь влажности и температуры для стандартного мониторинга воздуха и технических помещений.",
      en: "Compact humidity and temperature transmitter for standard air monitoring and technical rooms."
    },
    params: {
      ru: ["Измерение относительной влажности и температуры", "Компактное исполнение для настенного монтажа", "Аналоговый выход для систем мониторинга", "PDF datasheet содержит варианты диапазонов и выходов"],
      en: ["Relative humidity and temperature measurement", "Compact wall-mount design", "Analog output for monitoring systems", "PDF datasheet includes range and output options"]
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
      ru: ["Измерение влажности и температуры", "Исполнения для опасных зон", "Несколько вариантов зондов для разных условий", "PDF datasheet содержит сертификации и точные диапазоны"],
      en: ["Humidity and temperature measurement", "Hazardous-area versions", "Multiple probe options for different conditions", "PDF datasheet includes approvals and exact ranges"]
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
      ru: "Преобразователь влажности и температуры для промышленных процессов, камер, воздуховодов и технических систем.",
      en: "Humidity and temperature transmitter for industrial processes, chambers, ducts and technical systems."
    },
    params: {
      ru: ["Измерение относительной влажности и температуры", "Варианты зондов для разных способов монтажа", "Промышленный выходной сигнал", "PDF datasheet содержит диапазоны и модели исполнения"],
      en: ["Relative humidity and temperature measurement", "Probe options for different installation methods", "Industrial output signal", "PDF datasheet includes ranges and model variants"]
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
    model: "HMP3 / HMPX",
    category: "VAISALA",
    brand: "VAISALA",
    image: "assets/products/Humidity and Temperature Probe HMP3.png",
    pdf: "VA_HMP3-HMPX-Datasheet-B211826EN-E.pdf",
    overview: {
      ru: "Зонд влажности и температуры для точного измерения в камерах, помещениях и промышленных системах мониторинга.",
      en: "Humidity and temperature probe for precise measurement in chambers, rooms and industrial monitoring systems."
    },
    params: {
      ru: ["Измерение влажности и температуры", "Зондовое исполнение для интеграции", "Совместимость с системами мониторинга Vaisala", "PDF datasheet содержит варианты HMP и аксессуары"],
      en: ["Humidity and temperature measurement", "Probe design for integration", "Compatibility with Vaisala monitoring systems", "PDF datasheet includes HMP variants and accessories"]
    },
    highlights: {
      ru: ["Компактный зонд для точек измерения", "Подходит для лабораторных и производственных условий", "Удобен для OEM и системной интеграции"],
      en: ["Compact probe for measurement points", "Suitable for laboratory and production environments", "Convenient for OEM and system integration"]
    },
    applications: {
      ru: ["Климатические камеры", "Лабораторные помещения", "Системы мониторинга влажности"],
      en: ["Climate chambers", "Laboratory rooms", "Humidity monitoring systems"]
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
      ru: ["Измерение точки росы", "Компактный формат для установки в оборудование", "Промышленный выходной сигнал", "PDF datasheet содержит диапазоны измерения и варианты подключения"],
      en: ["Dew-point measurement", "Compact format for equipment installation", "Industrial output signal", "PDF datasheet includes measurement ranges and connection options"]
    },
    highlights: {
      ru: ["Хорошо подходит для сухих сред", "Удобен для OEM-интеграции", "Практичное решение для контроля осушителей"],
      en: ["Well suited for dry environments", "Convenient for OEM integration", "Practical solution for dryer monitoring"]
    },
    applications: {
      ru: ["Осушители сжатого воздуха и контроль сухого воздуха", "Пластиковые сушилки и производственные линии", "Сухой воздух, OEM-системы и подбор датчика точки росы"],
      en: ["Compressed air dryers and dry-air monitoring", "Plastic dryers and production lines", "Dry air, OEM systems and dew-point sensor selection"]
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
      ru: "Миниатюрные преобразователи точки росы для промышленных осушителей, сжатого воздуха и сухих технологических газов.",
      en: "Miniature dew-point transmitters for industrial dryers, compressed air and dry process gases."
    },
    params: {
      ru: ["Измерение точки росы в сухих газах", "Миниатюрное исполнение", "Варианты стандартной и удлиненной конструкции", "PDF datasheet содержит диапазоны и варианты моделей"],
      en: ["Dew-point measurement in dry gases", "Miniature transmitter design", "Standard and long probe versions", "PDF datasheet includes ranges and model options"]
    },
    highlights: {
      ru: ["Компактная установка в оборудовании", "Подходит для непрерывного контроля сухости", "Удобен для сжатого воздуха и OEM"],
      en: ["Compact installation in equipment", "Suitable for continuous dryness monitoring", "Convenient for compressed air and OEM use"]
    },
    applications: {
      ru: ["Сжатый воздух", "Промышленные осушители", "Сухие технологические газы"],
      en: ["Compressed air", "Industrial dryers", "Dry process gases"]
    }
  }
] satisfies Product[];

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
