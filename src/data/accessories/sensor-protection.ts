import type { AccessoryProduct } from "./types";

export const sensorProtectionProducts: AccessoryProduct[] = [
  {
    slug: "g14-threaded-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-014",
    title: { ru: "Защитный колпачок зонда G1/4", en: "G1/4 Threaded Probe Guard" },
    summary: { ru: "Проницаемый корпус для защиты чувствительного элемента от пыли, брызг и механического контакта.", en: "Permeable housing that protects a sensing element from dust, splashes and mechanical contact." },
    image: "/assets/accessories/sensor-g14.webp",
    selection: { ru: ["Резьба G1/4 или по чертежу", "Нержавеющая сталь 316L", "Пористость под требуемый отклик"], en: ["G1/4 or drawing-defined thread", "316L stainless steel", "Porosity matched to response needs"] },
    compatibleWith: { ru: ["Зонды влажности и температуры", "Датчики точки росы", "Промышленные преобразователи"], en: ["Humidity and temperature probes", "Dew-point sensors", "Industrial transmitters"] },
    customization: { ru: "Доступны другие резьбы, длина, диаметр и класс фильтрации.", en: "Other threads, lengths, diameters and filtration grades are available." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Резьба", en: "Thread" }, value: { ru: "G1/4 или по чертежу", en: "G1/4 or drawing-defined" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "Выбирается по среде и отклику", en: "Selected for medium and response" } }
    ],
    applications: { ru: ["Промышленные датчики влажности", "Датчики точки росы", "Защита измерительного элемента"], en: ["Industrial humidity sensors", "Dew-point sensors", "Sensing-element protection"] },
    relatedSlugs: ["m30-conical-probe-guard", "high-temperature-probe-guard"]
  },
  {
    slug: "m30-conical-probe-guard",
    categorySlug: "sensor-protection",
    model: "SM-PG-030",
    title: { ru: "Конический защитный колпачок M30", en: "M30 Conical Probe Guard" },
    summary: { ru: "Коническая защита для зондов, которым требуется быстрый обмен с измеряемой средой.", en: "Conical protection for probes that require fast exchange with the measured environment." },
    image: "/assets/accessories/sensor-m30-conical.webp",
    selection: { ru: ["Внутренняя резьба M30 или аналог", "Коническая пористая зона", "Размер по посадке зонда"], en: ["M30 or equivalent internal thread", "Conical porous zone", "Dimensions matched to probe fit"] },
    compatibleWith: { ru: ["Стационарные датчики влажности", "Канальные зонды", "Контроль окружающей среды"], en: ["Fixed humidity sensors", "Duct probes", "Environmental monitoring"] },
    customization: { ru: "Возможна адаптация конуса, резьбы и глубины посадки.", en: "Cone geometry, thread and insertion depth can be adapted." },
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
    summary: { ru: "Компактный плоский корпус для монтажа в ограниченном пространстве и на коротких зондах.", en: "Compact flat housing for restricted spaces and short probes." },
    image: "/assets/accessories/sensor-flat-tip.webp",
    selection: { ru: ["Плоская торцевая поверхность", "Диаметр и длина по месту", "Пористость под среду"], en: ["Flat end surface", "Site-specific diameter and length", "Environment-specific porosity"] },
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
    summary: { ru: "Защитный элемент для проникновения в сыпучие материалы и локального измерения влажности.", en: "Protective element for insertion into bulk materials and localized humidity measurement." },
    image: "/assets/accessories/sensor-pointed.webp",
    selection: { ru: ["Форма наконечника", "Механическая прочность", "Резьба и общая длина"], en: ["Tip geometry", "Mechanical strength", "Thread and overall length"] },
    compatibleWith: { ru: ["Зонды зерна и порошков", "Сушильные процессы", "Переносные измерители"], en: ["Grain and powder probes", "Drying processes", "Portable instruments"] },
    customization: { ru: "Форма наконечника и размеры согласуются под материал и глубину ввода.", en: "Tip geometry and dimensions are matched to material and insertion depth." },
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
    summary: { ru: "Пористая защита для датчиков в пыльных, влажных и коррозионных промышленных зонах.", en: "Porous protection for sensors in dusty, wet and corrosive industrial areas." },
    image: "/assets/accessories/sensor-outdoor-vented.webp",
    selection: { ru: ["Уровень защиты от пыли и влаги", "Материал среды", "Скорость отклика"], en: ["Dust and moisture protection level", "Process-medium compatibility", "Required response speed"] },
    compatibleWith: { ru: ["Наружный мониторинг", "HVAC и воздуховоды", "Промышленные помещения"], en: ["Outdoor monitoring", "HVAC and ducts", "Industrial spaces"] },
    customization: { ru: "Доступны варианты по длине, пористости и коррозионной стойкости.", en: "Length, porosity and corrosion resistance can be customized." },
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
    summary: { ru: "Металлическая защита зонда для сушильных камер, печей и горячих технологических линий.", en: "Metal probe protection for dryers, ovens and hot process lines." },
    image: "/assets/accessories/sensor-high-temperature.webp",
    selection: { ru: ["Рабочая температура", "Термоциклирование", "Резьба и длина погружения"], en: ["Operating temperature", "Thermal cycling", "Thread and insertion length"] },
    compatibleWith: { ru: ["Высокотемпературные зонды", "Климатические камеры", "Сушильные установки"], en: ["High-temperature probes", "Climate chambers", "Drying equipment"] },
    customization: { ru: "Температурный диапазон и конструкция подтверждаются по условиям применения.", en: "Temperature range and construction are confirmed against application conditions." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или жаростойкий сплав", en: "316L or heat-resistant alloy" } },
      { label: { ru: "Температура", en: "Temperature" }, value: { ru: "До 600 °C по исполнению", en: "Up to 600 °C by configuration" } },
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Резьба и длина по месту", en: "Site-specific thread and length" } }
    ],
    applications: { ru: ["Сушильные камеры", "Печи", "Горячие технологические линии"], en: ["Drying chambers", "Ovens", "Hot process lines"] },
    relatedSlugs: ["pointed-probe-guard", "outdoor-vented-probe-housing"]
  }
];
