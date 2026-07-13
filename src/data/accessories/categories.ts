import type { AccessoryCategory } from "./types";

export const accessoryCategories: AccessoryCategory[] = [
  {
    slug: "sensor-protection",
    title: { ru: "Защита зондов и корпуса датчиков", en: "Probe Protection and Sensor Housings" },
    summary: {
      ru: "Защитные колпачки и проницаемые корпуса для промышленных зондов влажности, температуры и точки росы.",
      en: "Protective caps and permeable housings for industrial humidity, temperature and dew-point probes."
    },
    intro: {
      ru: "SenseMeter поставляет защитные элементы для зондов в стандартном и заказном исполнении. Подбор выполняется по резьбе, размерам, материалу, пористости и условиям среды.",
      en: "SenseMeter supplies standard and custom probe protection. Selection is based on thread, dimensions, material, porosity and process conditions."
    },
    image: "/assets/accessories/sensor-g14.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "316L, 316 и специальные сплавы", en: "316L, 316 and special alloys" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "Под требуемую защиту и скорость отклика", en: "Matched to protection and response needs" } },
      { label: { ru: "Исполнение", en: "Construction" }, value: { ru: "Резьбовое, плоское, коническое или по чертежу", en: "Threaded, flat, conical or drawing-defined" } }
    ]
  },
  {
    slug: "sintered-filter-elements",
    title: { ru: "Спечённые фильтры и фильтрующие элементы", en: "Sintered Filters and Filter Elements" },
    summary: {
      ru: "Диски, трубки, стаканы и нестандартные элементы из пористой нержавеющей стали для защиты измерительных систем.",
      en: "Discs, tubes, cups and custom porous stainless-steel elements for measurement-system protection."
    },
    intro: {
      ru: "Доступны фильтрующие элементы разных форм для пробоотбора, защиты приборов и очистки газа. Геометрия и класс фильтрации согласуются по задаче.",
      en: "Multiple element forms are available for sampling, instrument protection and gas cleaning. Geometry and filtration grade are confirmed for each application."
    },
    image: "/assets/accessories/filter-face-seal-disc.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "304, 316, 316L и специальные сплавы", en: "304, 316, 316L and special alloys" } },
      { label: { ru: "Класс фильтрации", en: "Filtration grade" }, value: { ru: "Ориентировочно 0,1-120 мкм", en: "Nominally 0.1-120 µm" } },
      { label: { ru: "Температура", en: "Temperature" }, value: { ru: "До 600 °C в согласованном исполнении", en: "Up to 600 °C in a confirmed configuration" } }
    ]
  },
  {
    slug: "sample-gas-filters",
    title: { ru: "Фильтры пробоотборного и технологического газа", en: "Sample and Process Gas Filters" },
    summary: {
      ru: "Линейные фильтры для сжатого воздуха, высокочистых газов, лабораторных линий и анализаторных систем.",
      en: "Inline filters for compressed air, high-purity gases, laboratory lines and analyzer systems."
    },
    intro: {
      ru: "SenseMeter помогает подобрать корпус, соединение и фильтрующий элемент под газ, расход, давление и требуемую чистоту линии.",
      en: "SenseMeter helps match the housing, connection and element to the gas, flow, pressure and cleanliness requirement."
    },
    image: "/assets/accessories/gas-filter-compressed-air.webp",
    specs: [
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Тонкость очистки", en: "Particle grade" }, value: { ru: "От 0,003 мкм по задаче", en: "From 0.003 µm by application" } },
      { label: { ru: "Соединения", en: "Connections" }, value: { ru: "VCR, трубные и заказные фитинги", en: "VCR, tube and custom fittings" } }
    ]
  },
  {
    slug: "flow-control-accessories",
    title: { ru: "Ограничители расхода и газовые аксессуары", en: "Flow Restrictors and Gas-Line Accessories" },
    summary: {
      ru: "Пористые ограничители, газовые сопротивления и компактные фитинги для стабильного пробоотбора и подачи газа.",
      en: "Porous restrictors, gas resistances and compact fittings for stable sampling and gas delivery."
    },
    intro: {
      ru: "Компоненты подбираются по входному давлению, целевому расходу, газу и типу соединения. Нестандартные параметры согласуются по схеме или образцу.",
      en: "Components are selected by inlet pressure, target flow, gas and connection. Non-standard requirements can be confirmed from a drawing or sample."
    },
    image: "/assets/accessories/flow-porous-restrictor.webp",
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Диапазон расхода", en: "Flow range" }, value: { ru: "Подбирается по входному давлению и газу", en: "Selected by inlet pressure and gas" } },
      { label: { ru: "Интерфейс", en: "Interface" }, value: { ru: "1/4 дюйма VCR, резьба или фитинг", en: "1/4 in VCR, thread or fitting" } }
    ]
  }
];
