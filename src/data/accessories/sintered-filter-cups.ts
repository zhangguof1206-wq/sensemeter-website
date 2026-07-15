import type { AccessoryProduct } from "./types";

export const sinteredFilterCupProducts: AccessoryProduct[] = [
  {
    slug: "standard-sintered-filter-cup",
    categorySlug: "sintered-filter-cups",
    model: "SM-FC-STD",
    title: { ru: "Стандартный спечённый фильтрующий стакан", en: "Standard Sintered Filter Cup" },
    summary: { ru: "Пористый стакан для предварительной фильтрации, защиты датчика и удержания частиц в корпусе.", en: "Porous cup for prefiltration, sensor protection and particle retention inside a housing." },
    image: "/assets/accessories/filter-industrial-cartridge.webp",
    selection: { ru: ["Диаметр стакана", "Глубина", "Тонкость фильтрации"], en: ["Cup diameter", "Depth", "Filtration grade"] },
    compatibleWith: { ru: ["Фильтрующие корпуса", "Датчики", "Газовые линии"], en: ["Filter housings", "Sensors", "Gas lines"] },
    customization: { ru: "Размеры, толщина стенки и пористость подбираются по корпусу и расходу.", en: "Dimensions, wall thickness and porosity are matched to housing and flow." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "304, 316 или 316L", en: "304, 316 or 316L" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Стакан", en: "Cup" } },
      { label: { ru: "Очистка", en: "Cleaning" }, value: { ru: "Промывка или замена", en: "Wash or replacement" } }
    ],
    applications: { ru: ["Предварительная фильтрация", "Защита сенсора", "Промышленные корпуса"], en: ["Prefiltration", "Sensor protection", "Industrial housings"] },
    relatedSlugs: ["threaded-sintered-filter-cup", "flanged-filter-cup"]
  },
  {
    slug: "threaded-sintered-filter-cup",
    categorySlug: "sintered-filter-cups",
    model: "SM-FC-THD",
    title: { ru: "Резьбовой фильтрующий стакан", en: "Threaded Sintered Filter Cup" },
    summary: { ru: "Фильтрующий стакан с резьбой для быстрой установки в газовый, пневматический или приборный узел.", en: "Filter cup with thread for fast installation in a gas, pneumatic or instrument assembly." },
    image: "/assets/accessories/filter-shaped-element.webp",
    selection: { ru: ["Тип резьбы", "Давление", "Требуемый расход"], en: ["Thread type", "Pressure", "Required flow"] },
    compatibleWith: { ru: ["Пневматика", "Газовые фильтры", "Пробоотбор"], en: ["Pneumatics", "Gas filters", "Sampling"] },
    customization: { ru: "Резьба, длина, толщина и материал могут быть изготовлены по месту установки.", en: "Thread, length, thickness and material can be made to the installation." },
    specs: [
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Наружная или внутренняя резьба", en: "Male or female thread" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L", en: "316L" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "По расходу и защите", en: "By flow and protection target" } }
    ],
    applications: { ru: ["Фитинги", "Пробоотборные линии", "Газовые шкафы"], en: ["Fittings", "Sampling lines", "Gas cabinets"] },
    relatedSlugs: ["standard-sintered-filter-cup", "welded-filter-cup"]
  },
  {
    slug: "flanged-filter-cup",
    categorySlug: "sintered-filter-cups",
    model: "SM-FC-FLG",
    title: { ru: "Фланцевый фильтрующий стакан", en: "Flanged Filter Cup" },
    summary: { ru: "Стакан с фланцем для посадки в корпус, где важны уплотнение и сервисный доступ.", en: "Cup with flange for housing installation where sealing and service access matter." },
    image: "/assets/accessories/filter-face-seal-disc.webp",
    selection: { ru: ["Размер фланца", "Посадка", "Уплотнение"], en: ["Flange size", "Fit", "Sealing"] },
    compatibleWith: { ru: ["Разборные фильтры", "Корпуса датчиков", "Панели"], en: ["Serviceable filters", "Sensor housings", "Panels"] },
    customization: { ru: "Фланец, посадочная канавка, отверстия и активная зона согласуются по чертежу.", en: "Flange, groove, holes and active area are confirmed by drawing." },
    specs: [
      { label: { ru: "Посадка", en: "Fit" }, value: { ru: "Фланцевая", en: "Flanged" } },
      { label: { ru: "Сервис", en: "Service" }, value: { ru: "Съёмный узел", en: "Removable assembly" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316 или 316L", en: "316 or 316L" } }
    ],
    applications: { ru: ["Разборные корпуса", "Приборные панели", "Защита зондов"], en: ["Serviceable housings", "Instrument panels", "Probe protection"] },
    relatedSlugs: ["threaded-sintered-filter-cup", "deep-cylindrical-filter-cup"]
  },
  {
    slug: "deep-cylindrical-filter-cup",
    categorySlug: "sintered-filter-cups",
    model: "SM-FC-DCP",
    title: { ru: "Глубокий цилиндрический фильтрующий стакан", en: "Deep Cylindrical Filter Cup" },
    summary: { ru: "Удлинённый пористый стакан для увеличенной фильтрующей площади и стабильной работы при загрязнённой среде.", en: "Extended porous cup for larger filtration area and stable operation in contaminated media." },
    image: "/assets/accessories/filter-316l-powder.webp",
    selection: { ru: ["Длина", "Площадь фильтрации", "Тип загрязнений"], en: ["Length", "Filtration area", "Contaminant type"] },
    compatibleWith: { ru: ["Пыльный газ", "Предварительная очистка", "Сервисные корпуса"], en: ["Dusty gas", "Prefiltration", "Service housings"] },
    customization: { ru: "Длина, диаметр и прочность стенки подбираются по ресурсу и перепаду давления.", en: "Length, diameter and wall strength are matched to service life and pressure drop." },
    specs: [
      { label: { ru: "Площадь", en: "Area" }, value: { ru: "Увеличенная активная зона", en: "Larger active area" } },
      { label: { ru: "Ресурс", en: "Service life" }, value: { ru: "Для длительной работы", en: "For extended operation" } },
      { label: { ru: "Очистка", en: "Cleaning" }, value: { ru: "Продувка или промывка", en: "Purge or wash" } }
    ],
    applications: { ru: ["Пыльные среды", "Сжатый воздух", "Фильтры грубой защиты"], en: ["Dusty media", "Compressed air", "Coarse protection filters"] },
    relatedSlugs: ["standard-sintered-filter-cup", "high-temperature-filter-cup"]
  },
  {
    slug: "welded-filter-cup",
    categorySlug: "sintered-filter-cups",
    model: "SM-FC-WLD",
    title: { ru: "Приварной фильтрующий стакан", en: "Welded Filter Cup" },
    summary: { ru: "Фильтрующий стакан для узлов, где требуется постоянное соединение и герметичность корпуса.", en: "Filter cup for assemblies requiring permanent connection and housing leak tightness." },
    image: "/assets/accessories/filter-custom-microporous.webp",
    selection: { ru: ["Тип сварки", "Материал корпуса", "Герметичность"], en: ["Welding type", "Housing material", "Leak tightness"] },
    compatibleWith: { ru: ["Газовые сборки", "OEM-корпуса", "Специальные фильтры"], en: ["Gas assemblies", "OEM housings", "Special filters"] },
    customization: { ru: "Материал стакана и корпуса, зона сварки и требования к герметичности согласуются до изготовления.", en: "Cup and housing material, weld area and leak-tightness requirements are confirmed before production." },
    specs: [
      { label: { ru: "Крепление", en: "Mounting" }, value: { ru: "Сварное", en: "Welded" } },
      { label: { ru: "Герметичность", en: "Leak tightness" }, value: { ru: "По требованиям узла", en: "By assembly requirement" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L", en: "316L" } }
    ],
    applications: { ru: ["Герметичные корпуса", "OEM-сборки", "Промышленные фильтры"], en: ["Sealed housings", "OEM assemblies", "Industrial filters"] },
    relatedSlugs: ["threaded-sintered-filter-cup", "flanged-filter-cup"]
  },
  {
    slug: "high-temperature-filter-cup",
    categorySlug: "sintered-filter-cups",
    model: "SM-FC-HT",
    title: { ru: "Высокотемпературный фильтрующий стакан", en: "High-Temperature Filter Cup" },
    summary: { ru: "Спечённый стакан для горячего газа, сушильных процессов и узлов, где нужна термостойкость.", en: "Sintered cup for hot gas, drying processes and assemblies requiring temperature resistance." },
    image: "/assets/accessories/filter-nano-disc.webp",
    selection: { ru: ["Рабочая температура", "Термостойкий материал", "Расход"], en: ["Operating temperature", "Heat-resistant material", "Flow"] },
    compatibleWith: { ru: ["Горячий газ", "Сушильные линии", "Технологические печи"], en: ["Hot gas", "Drying lines", "Process ovens"] },
    customization: { ru: "Материал, пористость, прочность и способ установки подтверждаются по температуре и среде.", en: "Material, porosity, strength and mounting are confirmed by temperature and medium." },
    specs: [
      { label: { ru: "Температура", en: "Temperature" }, value: { ru: "До 600 °C по исполнению", en: "Up to 600 °C by configuration" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или жаростойкий сплав", en: "316L or heat-resistant alloy" } },
      { label: { ru: "Среда", en: "Medium" }, value: { ru: "Горячий газ или воздух", en: "Hot gas or air" } }
    ],
    applications: { ru: ["Сушильные камеры", "Горячий воздух", "Высокотемпературная защита"], en: ["Drying chambers", "Hot air", "High-temperature protection"] },
    relatedSlugs: ["deep-cylindrical-filter-cup", "standard-sintered-filter-cup"]
  }
];
