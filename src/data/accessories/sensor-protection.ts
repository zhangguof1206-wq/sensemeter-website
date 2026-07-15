import type { AccessoryProduct } from "./types";

export const sensorProtectionProducts: AccessoryProduct[] = [
  {
    slug: "g14-threaded-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-014",
    title: { ru: "Защитный колпачок зонда G1/4", en: "G1/4 Threaded Probe Guard" },
    summary: { ru: "Проницаемый корпус с контролируемой структурой пор для защиты чувствительного элемента от пыли, брызг и механического контакта.", en: "Permeable housing with controlled pore structure for protecting a sensing element from dust, splashes and mechanical contact." },
    image: "/assets/accessories/sensor-g14-uniform.webp",
    selection: { ru: ["Резьба G1/4 или по чертежу", "Нержавеющая сталь 316L", "Пористость и проницаемость под требуемый отклик"], en: ["G1/4 or drawing-defined thread", "316L stainless steel", "Porosity and permeability matched to response needs"] },
    compatibleWith: { ru: ["Зонды влажности и температуры", "Датчики точки росы", "Промышленные преобразователи"], en: ["Humidity and temperature probes", "Dew-point sensors", "Industrial transmitters"] },
    customization: { ru: "Доступны другие резьбы, длина, диаметр и класс фильтрации.", en: "Other threads, lengths, diameters and filtration grades are available." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Резьба", en: "Thread" }, value: { ru: "G1/4 или по чертежу", en: "G1/4 or drawing-defined" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "Выбирается по среде, пыли и отклику", en: "Selected for medium, dust load and response" } }
    ],
    applications: { ru: ["Промышленные датчики влажности", "Датчики точки росы", "Защита измерительного элемента"], en: ["Industrial humidity sensors", "Dew-point sensors", "Sensing-element protection"] },
    relatedSlugs: ["m30-conical-probe-guard", "high-temperature-probe-guard"]
  },
  {
    slug: "m30-conical-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-030",
    title: { ru: "Конический защитный колпачок M30", en: "M30 Conical Probe Guard" },
    summary: { ru: "Коническая защита для зондов, которым требуется быстрый обмен с измеряемой средой и стабильная проницаемость.", en: "Conical protection for probes requiring fast exchange with the measured environment and stable permeability." },
    image: "/assets/accessories/sensor-m30-conical-uniform.webp",
    selection: { ru: ["Внутренняя резьба M30 или аналог", "Коническая пористая зона", "Размер по посадке зонда"], en: ["M30 or equivalent internal thread", "Conical porous zone", "Dimensions matched to probe fit"] },
    compatibleWith: { ru: ["Стационарные датчики влажности", "Канальные зонды", "Контроль окружающей среды"], en: ["Fixed humidity sensors", "Duct probes", "Environmental monitoring"] },
    customization: { ru: "Возможна адаптация конуса, резьбы, глубины посадки и структуры пор.", en: "Cone geometry, thread, insertion depth and pore structure can be adapted." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Посадка", en: "Mounting" }, value: { ru: "Внутренняя M30 или заказная", en: "Internal M30 or custom" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Коническая пористая зона", en: "Conical porous section" } }
    ],
    applications: { ru: ["Канальные датчики", "Контроль окружающей среды", "Стационарные зонды"], en: ["Duct sensors", "Environmental monitoring", "Fixed probes"] },
    relatedSlugs: ["g14-threaded-probe-guard", "flat-tip-probe-guard"]
  },
  {
    slug: "flat-tip-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-FLT",
    title: { ru: "Плоский защитный колпачок", en: "Flat-Tip Probe Guard" },
    summary: { ru: "Компактный плоский корпус для ограниченного пространства, коротких зондов и защиты при сохранении отклика.", en: "Compact flat housing for restricted spaces, short probes and protection while preserving response." },
    image: "/assets/accessories/sensor-flat-tip-uniform.webp",
    selection: { ru: ["Плоская торцевая поверхность", "Диаметр и длина по месту", "Пористость, проницаемость и среда"], en: ["Flat end surface", "Site-specific diameter and length", "Porosity, permeability and environment"] },
    compatibleWith: { ru: ["Компактные датчики", "Шкафы и камеры", "OEM-зонды"], en: ["Compact sensors", "Cabinets and chambers", "OEM probes"] },
    customization: { ru: "Поддерживается изготовление по образцу или чертежу.", en: "Manufacture from a sample or drawing is supported." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или 316", en: "316L or 316" } },
      { label: { ru: "Торец", en: "End form" }, value: { ru: "Плоский пористый", en: "Flat porous end" } },
      { label: { ru: "Размер", en: "Dimensions" }, value: { ru: "По посадке датчика", en: "Matched to sensor fit" } }
    ],
    applications: { ru: ["Компактные зонды", "Климатические камеры", "OEM-датчики"], en: ["Compact probes", "Climate chambers", "OEM sensors"] },
    relatedSlugs: ["m30-conical-probe-guard", "outdoor-vented-probe-housing"]
  },
  {
    slug: "pointed-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-PNT",
    title: { ru: "Остроконечный защитный колпачок", en: "Pointed Probe Guard" },
    summary: { ru: "Защитный элемент для сыпучих материалов, локального измерения влажности и защиты пористой зоны от забивания.", en: "Protective element for bulk materials, localized humidity measurement and protection against pore clogging." },
    image: "/assets/accessories/sensor-pointed-uniform.webp",
    selection: { ru: ["Форма наконечника", "Механическая прочность", "Резьба и общая длина"], en: ["Tip geometry", "Mechanical strength", "Thread and overall length"] },
    compatibleWith: { ru: ["Зонды зерна и порошков", "Сушильные процессы", "Переносные измерители"], en: ["Grain and powder probes", "Drying processes", "Portable instruments"] },
    customization: { ru: "Форма наконечника, размеры и фильтрационная зона согласуются под материал и глубину ввода.", en: "Tip geometry, dimensions and filtration area are matched to material and insertion depth." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Наконечник", en: "Tip" }, value: { ru: "Конический, по глубине ввода", en: "Conical, matched to insertion depth" } },
      { label: { ru: "Класс фильтрации", en: "Filtration grade" }, value: { ru: "По измеряемому материалу", en: "Selected for measured material" } }
    ],
    applications: { ru: ["Зерно и порошки", "Сушильные процессы", "Переносные измерители"], en: ["Grain and powders", "Drying processes", "Portable instruments"] },
    relatedSlugs: ["flat-tip-probe-guard", "high-temperature-probe-guard"]
  },
  {
    slug: "outdoor-vented-probe-housing",
    categorySlug: "sensor-protection",
    model: "SM-PG-ODV",
    title: { ru: "Вентилируемый корпус для наружных зондов", en: "Outdoor Vented Probe Housing" },
    summary: { ru: "Пористая защита для датчиков в пыльных, влажных и коррозионных промышленных зонах с возможностью очистки.", en: "Porous protection for sensors in dusty, wet and corrosive industrial areas, with cleanable construction." },
    image: "/assets/accessories/sensor-outdoor-vented-uniform.webp",
    selection: { ru: ["Уровень защиты от пыли и влаги", "Материал среды", "Скорость отклика"], en: ["Dust and moisture protection level", "Process-medium compatibility", "Required response speed"] },
    compatibleWith: { ru: ["Наружный мониторинг", "HVAC и воздуховоды", "Промышленные помещения"], en: ["Outdoor monitoring", "HVAC and ducts", "Industrial spaces"] },
    customization: { ru: "Доступны варианты по длине, пористости, коррозионной стойкости и способу очистки.", en: "Length, porosity, corrosion resistance and cleaning method can be customized." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L, 316 или специальный сплав", en: "316L, 316 or special alloy" } },
      { label: { ru: "Защита", en: "Protection" }, value: { ru: "До IP65 в согласованной сборке", en: "Up to IP65 in a confirmed assembly" } },
      { label: { ru: "Исполнение", en: "Construction" }, value: { ru: "Вентилируемое пористое", en: "Vented porous housing" } }
    ],
    applications: { ru: ["Наружный мониторинг", "HVAC и воздуховоды", "Влажные производственные зоны"], en: ["Outdoor monitoring", "HVAC and ducts", "Wet industrial areas"] },
    relatedSlugs: ["g14-threaded-probe-guard", "high-temperature-probe-guard"]
  },
  {
    slug: "high-temperature-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-HTG",
    title: { ru: "Высокотемпературный защитный колпачок", en: "High-Temperature Probe Guard" },
    summary: { ru: "Металлическая защита зонда для сушильных камер, печей и горячих технологических линий, где важны температура и скорость отклика.", en: "Metal probe protection for dryers, ovens and hot process lines where temperature and response speed matter." },
    image: "/assets/accessories/sensor-high-temperature-uniform.webp",
    selection: { ru: ["Рабочая температура", "Термоциклирование", "Резьба и длина погружения"], en: ["Operating temperature", "Thermal cycling", "Thread and insertion length"] },
    compatibleWith: { ru: ["Высокотемпературные зонды", "Климатические камеры", "Сушильные установки"], en: ["High-temperature probes", "Climate chambers", "Drying equipment"] },
    customization: { ru: "Температурный диапазон, материал и проницаемость подтверждаются по условиям применения.", en: "Temperature range, material and permeability are confirmed against application conditions." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или жаростойкий сплав", en: "316L or heat-resistant alloy" } },
      { label: { ru: "Температура", en: "Temperature" }, value: { ru: "До 600 °C по исполнению", en: "Up to 600 °C by configuration" } },
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Резьба и длина по месту", en: "Site-specific thread and length" } }
    ],
    applications: { ru: ["Сушильные камеры", "Печи", "Горячие технологические линии"], en: ["Drying chambers", "Ovens", "Hot process lines"] },
    relatedSlugs: ["pointed-probe-guard", "outdoor-vented-probe-housing"]
  }
];
