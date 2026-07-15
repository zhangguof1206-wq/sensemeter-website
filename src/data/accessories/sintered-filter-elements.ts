import type { AccessoryProduct } from "./types";

export const sinteredFilterProducts: AccessoryProduct[] = [
  {
    slug: "face-seal-filter-disc",
    categorySlug: "sintered-filter-elements",
    model: "SM-SF-FSD",
    title: { ru: "Спечённый фильтрующий диск с торцевым уплотнением", en: "Face-Seal Sintered Filter Disc" },
    summary: { ru: "Компактный пористый диск для защиты газовых соединений, клапанов и анализаторных линий от частиц.", en: "Compact porous disc for protecting gas connections, valves and analyzer lines from particles." },
    image: "/assets/accessories/filter-face-seal-disc-uniform.webp",
    selection: { ru: ["Диаметр, толщина и посадка", "Класс фильтрации и структура пор", "Тип уплотняемой поверхности"], en: ["Diameter, thickness and fit", "Filtration grade and pore structure", "Sealing-face type"] },
    compatibleWith: { ru: ["Пробоотборные линии", "Газовые коллекторы", "Анализаторные шкафы"], en: ["Sample lines", "Gas manifolds", "Analyzer cabinets"] },
    customization: { ru: "Размер, пористость и допустимый перепад давления доступны по чертежу.", en: "Dimensions, porosity and allowable pressure drop are available to drawing." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L, 316 или специальный сплав", en: "316L, 316 or special alloy" } },
      { label: { ru: "Диаметр", en: "Diameter" }, value: { ru: "Ориентировочно 2-500 мм", en: "Nominally 2-500 mm" } },
      { label: { ru: "Толщина", en: "Thickness" }, value: { ru: "Ориентировочно 1-100 мм", en: "Nominally 1-100 mm" } }
    ],
    applications: { ru: ["Газовые соединения", "Клапаны", "Анализаторные линии"], en: ["Gas connections", "Valves", "Analyzer lines"] },
    relatedSlugs: ["nano-sintered-filter-disc", "custom-microporous-element"]
  },
  {
    slug: "nano-sintered-filter-disc",
    categorySlug: "sintered-filter-elements",
    model: "SM-SF-HPD",
    title: { ru: "Высокоточный спечённый фильтрующий диск", en: "High-Precision Sintered Filter Disc" },
    summary: { ru: "Тонкий фильтрующий элемент для высокочистых газов, низкого перепада давления и чувствительных измерительных трактов.", en: "Fine filter element for high-purity gases, low pressure drop and sensitive measurement paths." },
    image: "/assets/accessories/filter-nano-disc-uniform.webp",
    selection: { ru: ["Требуемый размер частиц", "Допустимый перепад давления", "Чистота материала"], en: ["Required particle rating", "Allowed pressure drop", "Material cleanliness"] },
    compatibleWith: { ru: ["Кислородные анализаторы", "Лабораторные газовые линии", "Высокочистые системы"], en: ["Oxygen analyzers", "Laboratory gas lines", "High-purity systems"] },
    customization: { ru: "Точность фильтрации, проницаемость и обработка поверхности согласуются отдельно.", en: "Filtration grade, permeability and surface treatment are confirmed separately." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Фильтрация", en: "Filtration" }, value: { ru: "От 0,1 мкм по исполнению", en: "From 0.1 µm by configuration" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Диск или уплотнительный элемент", en: "Disc or sealing element" } }
    ],
    applications: { ru: ["Высокочистые газы", "Кислородные анализаторы", "Лабораторные линии"], en: ["High-purity gases", "Oxygen analyzers", "Laboratory lines"] },
    relatedSlugs: ["face-seal-filter-disc", "316l-powder-sintered-element"]
  },
  {
    slug: "custom-microporous-element",
    categorySlug: "sintered-filter-elements",
    model: "SM-SF-CME",
    title: { ru: "Заказной микропористый элемент", en: "Custom Microporous Element" },
    summary: { ru: "Нестандартный пористый компонент для установки в корпус прибора или пробоотборный узел.", en: "Non-standard porous component for installation in an instrument housing or sampling assembly." },
    image: "/assets/accessories/filter-custom-microporous-uniform.webp",
    selection: { ru: ["Форма и посадочные размеры", "Пористость и активная зона фильтрации", "Метод крепления"], en: ["Shape and mounting dimensions", "Porosity and active filtration area", "Retention method"] },
    compatibleWith: { ru: ["OEM-приборы", "Пробоотборные блоки", "Защитные корпуса"], en: ["OEM instruments", "Sampling blocks", "Protective housings"] },
    customization: { ru: "Изготовление возможно по 2D/3D-чертежу или образцу, включая механическую обработку после спекания.", en: "Manufacture is available from 2D/3D drawings or a sample, including post-sinter machining." },
    specs: [
      { label: { ru: "Геометрия", en: "Geometry" }, value: { ru: "По 2D/3D-чертежу или образцу", en: "From 2D/3D drawing or sample" } },
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "316L, никелевые и медные сплавы", en: "316L, nickel and copper alloys" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "0,1-120 мкм по задаче", en: "0.1-120 µm by application" } }
    ],
    applications: { ru: ["OEM-приборы", "Пробоотборные блоки", "Защитные корпуса"], en: ["OEM instruments", "Sampling blocks", "Protective housings"] },
    relatedSlugs: ["shaped-sintered-filter-element", "industrial-sintered-cartridge"]
  },
  {
    slug: "industrial-sintered-cartridge",
    categorySlug: "sintered-filter-elements",
    model: "SM-SF-CAR",
    title: { ru: "Промышленный спечённый фильтрующий патрон", en: "Industrial Sintered Filter Cartridge" },
    summary: { ru: "Цилиндрический элемент для предварительной очистки газа, защиты оборудования и повторной очистки после обслуживания.", en: "Cylindrical element for gas prefiltration, equipment protection and cleanable service." },
    image: "/assets/accessories/filter-industrial-cartridge-uniform.webp",
    selection: { ru: ["Длина и наружный диаметр", "Соединение", "Расход и перепад давления"], en: ["Length and outside diameter", "Connection", "Flow and pressure drop"] },
    compatibleWith: { ru: ["Системы сжатого воздуха", "Газоанализаторы", "Панели пробоподготовки"], en: ["Compressed-air systems", "Gas analyzers", "Sample-conditioning panels"] },
    customization: { ru: "Доступны разные торцевые соединения, размеры корпуса, очистка и обратная промывка по условиям процесса.", en: "Different end connections, body dimensions, cleaning and backwash options are available for the process." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "304, 316 или 316L", en: "304, 316 or 316L" } },
      { label: { ru: "Фильтрация", en: "Filtration" }, value: { ru: "0,1-120 мкм по задаче", en: "0.1-120 µm by application" } },
      { label: { ru: "Соединение", en: "Connection" }, value: { ru: "Резьба, фланец или приварное", en: "Thread, flange or welded" } }
    ],
    applications: { ru: ["Предварительная очистка газа", "Сжатый воздух", "Пробоподготовка"], en: ["Gas prefiltration", "Compressed air", "Sample conditioning"] },
    relatedSlugs: ["316l-powder-sintered-element", "custom-microporous-element"]
  },
  {
    slug: "316l-powder-sintered-element",
    categorySlug: "sintered-filter-elements",
    model: "SM-SF-316",
    title: { ru: "Порошковый спечённый элемент 316L", en: "316L Powder-Sintered Element" },
    summary: { ru: "Прочный элемент с равномерной структурой пор для высоких температур, давления и коррозионных газов.", en: "Robust element with uniform pore structure for elevated temperature, pressure and corrosive gases." },
    image: "/assets/accessories/filter-316l-powder-uniform.webp",
    selection: { ru: ["Материал 316L", "Рабочая температура и давление", "Совместимость с газом"], en: ["316L material", "Operating temperature and pressure", "Gas compatibility"] },
    compatibleWith: { ru: ["Технологический газ", "Сушильные установки", "Нефтехимические линии"], en: ["Process gas", "Drying equipment", "Petrochemical lines"] },
    customization: { ru: "Подтверждаются пористость, прочность, проницаемость и размеры под конкретный процесс.", en: "Porosity, strength, permeability and dimensions are confirmed for the specific process." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Порошковая нержавеющая сталь 316L", en: "316L powder stainless steel" } },
      { label: { ru: "Температура", en: "Temperature" }, value: { ru: "До 600 °C по исполнению", en: "Up to 600 °C by configuration" } },
      { label: { ru: "Фильтрация", en: "Filtration" }, value: { ru: "0,1-120 мкм по задаче", en: "0.1-120 µm by application" } }
    ],
    applications: { ru: ["Технологический газ", "Сушильные установки", "Нефтехимические линии"], en: ["Process gas", "Drying equipment", "Petrochemical lines"] },
    relatedSlugs: ["industrial-sintered-cartridge", "shaped-sintered-filter-element"]
  },
  {
    slug: "shaped-sintered-filter-element",
    categorySlug: "sintered-filter-elements",
    model: "SM-SF-SHP",
    title: { ru: "Фасонный спечённый фильтрующий элемент", en: "Shaped Sintered Filter Element" },
    summary: { ru: "Фильтрующий элемент сложной формы для компактных узлов и нестандартных приборных корпусов.", en: "Complex-shaped filter element for compact assemblies and non-standard instrument housings." },
    image: "/assets/accessories/filter-shaped-element-uniform.webp",
    selection: { ru: ["Геометрия и допуски", "Толщина стенки", "Зона фильтрации"], en: ["Geometry and tolerances", "Wall thickness", "Active filtration area"] },
    compatibleWith: { ru: ["Компактные анализаторы", "Специальные датчики", "Интегрированные модули"], en: ["Compact analyzers", "Special sensors", "Integrated modules"] },
    customization: { ru: "Возможна механическая доработка после спекания, интеграция крепёжных элементов и согласование активной зоны фильтрации.", en: "Post-sinter machining, integrated mounting features and active filtration area can be specified." },
    specs: [
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Фасонная, по чертежу", en: "Shaped, drawing-defined" } },
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "316L и специальные сплавы", en: "316L and special alloys" } },
      { label: { ru: "Обработка", en: "Machining" }, value: { ru: "Механическая доработка после спекания", en: "Post-sinter machining" } }
    ],
    applications: { ru: ["Компактные анализаторы", "Специальные датчики", "Интегрированные модули"], en: ["Compact analyzers", "Special sensors", "Integrated modules"] },
    relatedSlugs: ["custom-microporous-element", "316l-powder-sintered-element"]
  }
];
