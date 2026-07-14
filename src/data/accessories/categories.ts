import type { AccessoryCategory } from "./types";

export const accessoryCategories: AccessoryCategory[] = [
  {
    slug: "sensor-protection",
    title: { ru: "Защита зондов и корпуса датчиков", en: "Probe Protection and Sensor Housings" },
    summary: {
      ru: "Проницаемые защитные колпачки и корпуса для промышленных зондов влажности, температуры и точки росы.",
      en: "Permeable protective caps and housings for industrial humidity, temperature and dew-point probes."
    },
    intro: {
      ru: "SenseMeter поставляет стандартные и заказные защитные элементы для зондов. Подбор выполняется по резьбе, посадочным размерам, материалу, структуре пор, проницаемости, скорости отклика и условиям среды.",
      en: "SenseMeter supplies standard and custom probe protection. Selection is based on thread, fit dimensions, material, pore structure, permeability, response speed and process conditions."
    },
    image: "/assets/accessories/sensor-g14.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "316L, 316 и специальные сплавы", en: "316L, 316 and special alloys" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "По защите, проницаемости и скорости отклика", en: "Matched to protection, permeability and response needs" } },
      { label: { ru: "Исполнение", en: "Construction" }, value: { ru: "Резьбовое, плоское, коническое или по чертежу", en: "Threaded, flat, conical or drawing-defined" } }
    ]
  },
  {
    slug: "sintered-filter-elements",
    title: { ru: "Спечённые фильтры и фильтрующие элементы", en: "Sintered Filters and Filter Elements" },
    summary: {
      ru: "Диски, трубки, стаканы и нестандартные элементы из пористой нержавеющей стали для фильтрации и защиты измерительных систем.",
      en: "Discs, tubes, cups and custom porous stainless-steel elements for filtration and measurement-system protection."
    },
    intro: {
      ru: "Доступны фильтрующие элементы разных форм для пробоотбора, защиты приборов и очистки газа. Геометрия, класс фильтрации, структура пор, проницаемость, перепад давления, очистка и обратная промывка согласуются по задаче.",
      en: "Multiple element forms are available for sampling, instrument protection and gas cleaning. Geometry, filtration grade, pore structure, permeability, pressure drop, cleaning and backwash requirements are confirmed for each application."
    },
    image: "/assets/accessories/filter-face-seal-disc.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "304, 316, 316L и специальные сплавы", en: "304, 316, 316L and special alloys" } },
      { label: { ru: "Класс фильтрации", en: "Filtration grade" }, value: { ru: "Ориентировочно 0,1-120 мкм по структуре пор", en: "Nominally 0.1-120 µm by pore structure" } },
      { label: { ru: "Температура", en: "Temperature" }, value: { ru: "До 600 °C в согласованном исполнении", en: "Up to 600 °C in a confirmed configuration" } }
    ]
  },
  {
    slug: "sample-gas-filters",
    title: { ru: "Фильтры пробоотборного и технологического газа", en: "Sample and Process Gas Filters" },
    summary: {
      ru: "Линейные фильтры для сжатого воздуха, высокочистых газов, лабораторных линий, газовых шкафов и анализаторных систем.",
      en: "Inline filters for compressed air, high-purity gases, laboratory lines, gas cabinets and analyzer systems."
    },
    intro: {
      ru: "SenseMeter помогает подобрать корпус, соединение и фильтрующий элемент под газ, расход, давление, чистоту линии, мёртвый объём, герметичность и допустимый перепад давления.",
      en: "SenseMeter helps match the housing, connection and element to the gas, flow, pressure, cleanliness requirement, dead volume, leak-tightness and allowable pressure drop."
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
      ru: "Пористые ограничители, газовые сопротивления и компактные фитинги для стабильного пробоотбора, подачи газа и защиты приборных линий.",
      en: "Porous restrictors, gas resistances and compact fittings for stable sampling, gas delivery and instrument-line protection."
    },
    intro: {
      ru: "Компоненты подбираются по входному давлению, целевому расходу, газу, перепаду давления и типу соединения. Пористая структура помогает стабилизировать ламинарный поток, снижать пульсации и работать без выделения частиц.",
      en: "Components are selected by inlet pressure, target flow, gas, pressure drop and connection. The porous structure helps stabilize laminar flow, reduce pulsation and operate with no particle shedding."
    },
    image: "/assets/accessories/flow-porous-restrictor.webp",
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Диапазон расхода", en: "Flow range" }, value: { ru: "Подбирается по входному давлению и газу", en: "Selected by inlet pressure and gas" } },
      { label: { ru: "Интерфейс", en: "Interface" }, value: { ru: "1/4 дюйма VCR, резьба или фитинг", en: "1/4 in VCR, thread or fitting" } }
    ]
  }
];
