import type { AccessoryProduct } from "./types";

export const sinteredFilterProducts: AccessoryProduct[] = [
  {
    slug: "face-seal-filter-disc",
    categorySlug: "sintered-filter-elements",
    title: { ru: "Спечённый фильтрующий диск с торцевым уплотнением", en: "Face-Seal Sintered Filter Disc" },
    summary: { ru: "Компактный диск для защиты газовых соединений, клапанов и анализаторных линий от частиц.", en: "Compact disc for protecting gas connections, valves and analyzer lines from particles." },
    image: "/assets/accessories/filter-face-seal-disc.webp",
    selection: { ru: ["Диаметр и толщина", "Класс фильтрации", "Тип уплотняемой поверхности"], en: ["Diameter and thickness", "Filtration grade", "Sealing-face type"] },
    compatibleWith: { ru: ["Пробоотборные линии", "Газовые коллекторы", "Анализаторные шкафы"], en: ["Sample lines", "Gas manifolds", "Analyzer cabinets"] },
    customization: { ru: "Размер и пористость доступны по чертежу.", en: "Dimensions and porosity are available to drawing." }
  },
  {
    slug: "nano-sintered-filter-disc",
    categorySlug: "sintered-filter-elements",
    title: { ru: "Высокоточный спечённый фильтрующий диск", en: "High-Precision Sintered Filter Disc" },
    summary: { ru: "Тонкий фильтрующий элемент для высокочистых газов и чувствительных измерительных трактов.", en: "Fine filter element for high-purity gases and sensitive measurement paths." },
    image: "/assets/accessories/filter-nano-disc.webp",
    selection: { ru: ["Требуемый размер частиц", "Допустимый перепад давления", "Чистота материала"], en: ["Required particle rating", "Allowed pressure drop", "Material cleanliness"] },
    compatibleWith: { ru: ["Кислородные анализаторы", "Лабораторные газовые линии", "Высокочистые системы"], en: ["Oxygen analyzers", "Laboratory gas lines", "High-purity systems"] },
    customization: { ru: "Точность фильтрации и обработка поверхности согласуются отдельно.", en: "Filtration grade and surface treatment are confirmed separately." }
  },
  {
    slug: "custom-microporous-element",
    categorySlug: "sintered-filter-elements",
    title: { ru: "Заказной микропористый элемент", en: "Custom Microporous Element" },
    summary: { ru: "Нестандартный пористый компонент для установки в корпус прибора или пробоотборный узел.", en: "Non-standard porous component for installation in an instrument housing or sampling assembly." },
    image: "/assets/accessories/filter-custom-microporous.webp",
    selection: { ru: ["Форма и посадочные размеры", "Пористость", "Метод крепления"], en: ["Shape and mounting dimensions", "Porosity", "Retention method"] },
    compatibleWith: { ru: ["OEM-приборы", "Пробоотборные блоки", "Защитные корпуса"], en: ["OEM instruments", "Sampling blocks", "Protective housings"] },
    customization: { ru: "Изготовление возможно по 2D/3D-чертежу или физическому образцу.", en: "Manufacture is available from 2D/3D drawings or a physical sample." }
  },
  {
    slug: "industrial-sintered-cartridge",
    categorySlug: "sintered-filter-elements",
    title: { ru: "Промышленный спечённый фильтрующий патрон", en: "Industrial Sintered Filter Cartridge" },
    summary: { ru: "Цилиндрический элемент для предварительной очистки газа и защиты измерительного оборудования.", en: "Cylindrical element for gas prefiltration and measurement-equipment protection." },
    image: "/assets/accessories/filter-industrial-cartridge.webp",
    selection: { ru: ["Длина и наружный диаметр", "Соединение", "Расход и перепад давления"], en: ["Length and outside diameter", "Connection", "Flow and pressure drop"] },
    compatibleWith: { ru: ["Системы сжатого воздуха", "Газоанализаторы", "Панели пробоподготовки"], en: ["Compressed-air systems", "Gas analyzers", "Sample-conditioning panels"] },
    customization: { ru: "Доступны разные торцевые соединения и размеры корпуса.", en: "Different end connections and body dimensions are available." }
  },
  {
    slug: "316l-powder-sintered-element",
    categorySlug: "sintered-filter-elements",
    title: { ru: "Порошковый спечённый элемент 316L", en: "316L Powder-Sintered Element" },
    summary: { ru: "Прочный фильтрующий элемент для высоких температур, давления и коррозионных газов.", en: "Robust filter element for elevated temperature, pressure and corrosive gases." },
    image: "/assets/accessories/filter-316l-powder.webp",
    selection: { ru: ["Материал 316L", "Рабочая температура и давление", "Совместимость с газом"], en: ["316L material", "Operating temperature and pressure", "Gas compatibility"] },
    compatibleWith: { ru: ["Технологический газ", "Сушильные установки", "Нефтехимические линии"], en: ["Process gas", "Drying equipment", "Petrochemical lines"] },
    customization: { ru: "Подтверждаются пористость, прочность и размеры под конкретный процесс.", en: "Porosity, strength and dimensions are confirmed for the specific process." }
  },
  {
    slug: "shaped-sintered-filter-element",
    categorySlug: "sintered-filter-elements",
    title: { ru: "Фасонный спечённый фильтрующий элемент", en: "Shaped Sintered Filter Element" },
    summary: { ru: "Фильтрующий элемент сложной формы для компактных узлов и нестандартных приборных корпусов.", en: "Complex-shaped filter element for compact assemblies and non-standard instrument housings." },
    image: "/assets/accessories/filter-shaped-element.webp",
    selection: { ru: ["Геометрия и допуски", "Толщина стенки", "Зона фильтрации"], en: ["Geometry and tolerances", "Wall thickness", "Active filtration area"] },
    compatibleWith: { ru: ["Компактные анализаторы", "Специальные датчики", "Интегрированные модули"], en: ["Compact analyzers", "Special sensors", "Integrated modules"] },
    customization: { ru: "Возможна механическая доработка после спекания и интеграция крепёжных элементов.", en: "Post-sinter machining and integrated mounting features are available." }
  }
];
