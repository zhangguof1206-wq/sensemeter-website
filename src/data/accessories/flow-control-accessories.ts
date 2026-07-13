import type { AccessoryProduct } from "./types";

export const flowControlProducts: AccessoryProduct[] = [
  {
    slug: "porous-metal-flow-restrictor",
    categorySlug: "flow-control-accessories",
    title: { ru: "Пористый металлический ограничитель расхода", en: "Porous-Metal Flow Restrictor" },
    summary: { ru: "Пассивный ограничитель для стабилизации расхода газа в пробоотборной или распределительной линии.", en: "Passive restrictor for stabilizing gas flow in a sampling or distribution line." },
    image: "/assets/accessories/flow-porous-restrictor.webp",
    selection: { ru: ["Входное давление", "Целевой расход", "Тип газа"], en: ["Inlet pressure", "Target flow", "Gas type"] },
    compatibleWith: { ru: ["Кислородные анализаторы", "Панели пробоподготовки", "Калибровочные линии"], en: ["Oxygen analyzers", "Sample-conditioning panels", "Calibration lines"] },
    customization: { ru: "Расход, соединение и корпус согласуются по рабочей точке.", en: "Flow, connection and housing are matched to the operating point." }
  },
  {
    slug: "fitting-flow-limiter",
    categorySlug: "flow-control-accessories",
    title: { ru: "Ограничитель расхода в корпусе фитинга", en: "Fitting-Body Flow Limiter" },
    summary: { ru: "Компактный ограничитель, совмещённый с соединительным фитингом для экономии места.", en: "Compact restrictor integrated into a connection fitting to save space." },
    image: "/assets/accessories/flow-fitting-limiter.webp",
    selection: { ru: ["Резьба или трубное соединение", "Расход", "Монтажное пространство"], en: ["Thread or tube connection", "Flow", "Installation space"] },
    compatibleWith: { ru: ["Компактные анализаторы", "Газовые шкафы", "OEM-модули"], en: ["Compact analyzers", "Gas cabinets", "OEM modules"] },
    customization: { ru: "Доступны разные корпуса, направления и калиброванные значения расхода.", en: "Different bodies, orientations and calibrated flow values are available." }
  },
  {
    slug: "high-purity-flow-restrictor",
    categorySlug: "flow-control-accessories",
    title: { ru: "Ограничитель расхода для высокочистого газа", en: "High-Purity Gas Flow Restrictor" },
    summary: { ru: "Исполнение 316L для контролируемой подачи высокочистого или специального газа.", en: "316L construction for controlled delivery of high-purity or specialty gas." },
    image: "/assets/accessories/flow-high-purity.webp",
    selection: { ru: ["Чистота газа", "Герметичность", "Диапазон расхода"], en: ["Gas purity", "Leak tightness", "Flow range"] },
    compatibleWith: { ru: ["Высокочистые газовые панели", "Лабораторные анализаторы", "Полупроводниковые линии"], en: ["High-purity gas panels", "Laboratory analyzers", "Semiconductor lines"] },
    customization: { ru: "Подтверждаются обработка поверхности, соединение и требуемая утечка.", en: "Surface finish, connection and required leak rate are confirmed." }
  },
  {
    slug: "integrated-damping-fitting",
    categorySlug: "flow-control-accessories",
    title: { ru: "Интегрированный демпфирующий фитинг", en: "Integrated Damping Fitting" },
    summary: { ru: "Фитинг с внутренним дросселем для снижения пульсаций и ограничения потока.", en: "Fitting with an internal restriction for damping pulsation and limiting flow." },
    image: "/assets/accessories/flow-damping-fitting.webp",
    selection: { ru: ["Тип соединения", "Перепад давления", "Требуемое демпфирование"], en: ["Connection type", "Pressure differential", "Required damping"] },
    compatibleWith: { ru: ["Датчики давления", "Пробоотборные линии", "Пневматические цепи"], en: ["Pressure sensors", "Sampling lines", "Pneumatic circuits"] },
    customization: { ru: "Проходное сечение и корпус доступны по чертежу.", en: "Flow passage and body are available to drawing." }
  },
  {
    slug: "chromatography-threaded-restrictor",
    categorySlug: "flow-control-accessories",
    title: { ru: "Резьбовой ограничитель для аналитической линии", en: "Threaded Restrictor for Analytical Lines" },
    summary: { ru: "Наружный резьбовой элемент для стабильного малого расхода в аналитических и калибровочных системах.", en: "Male-threaded element for stable low flow in analytical and calibration systems." },
    image: "/assets/accessories/flow-threaded-analytical.webp",
    selection: { ru: ["Резьба", "Малый расход", "Газ и входное давление"], en: ["Thread", "Low-flow target", "Gas and inlet pressure"] },
    compatibleWith: { ru: ["Газовая хроматография", "Калибровочные стенды", "Анализаторы кислорода"], en: ["Gas chromatography", "Calibration rigs", "Oxygen analyzers"] },
    customization: { ru: "Калиброванный расход и тип резьбы задаются при заказе.", en: "Calibrated flow and thread type are specified at order stage." }
  },
  {
    slug: "precision-orifice-restrictor",
    categorySlug: "flow-control-accessories",
    title: { ru: "Прецизионный дроссельный ограничитель", en: "Precision-Orifice Flow Restrictor" },
    summary: { ru: "Металлический ограничитель с малым проходным отверстием для дозированной подачи газа.", en: "Metal restrictor with a small calibrated orifice for metered gas delivery." },
    image: "/assets/accessories/flow-precision-orifice.webp",
    selection: { ru: ["Диаметр отверстия", "Давление до и после", "Допуск расхода"], en: ["Orifice diameter", "Upstream and downstream pressure", "Flow tolerance"] },
    compatibleWith: { ru: ["Системы нулевого и поверочного газа", "Лабораторные приборы", "Газовые дозаторы"], en: ["Zero and span gas systems", "Laboratory instruments", "Gas dosing systems"] },
    customization: { ru: "Отверстие, материал и размеры корпуса могут быть изготовлены по заданию.", en: "Orifice, material and body dimensions can be made to specification." }
  }
];
