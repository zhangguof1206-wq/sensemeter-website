import type { AccessoryProduct } from "./types";

export const flowControlProducts: AccessoryProduct[] = [
  {
    slug: "porous-metal-flow-restrictor",
    categorySlug: "flow-control-accessories",
    model: "SM-FR-PMR",
    title: { ru: "Пористый металлический ограничитель расхода", en: "Porous-Metal Flow Restrictor" },
    summary: { ru: "Пассивный ограничитель для стабилизации расхода газа в пробоотборной или распределительной линии.", en: "Passive restrictor for stabilizing gas flow in a sampling or distribution line." },
    image: "/assets/accessories/flow-porous-restrictor.webp",
    selection: { ru: ["Входное давление", "Целевой расход", "Тип газа"], en: ["Inlet pressure", "Target flow", "Gas type"] },
    compatibleWith: { ru: ["Кислородные анализаторы", "Панели пробоподготовки", "Калибровочные линии"], en: ["Oxygen analyzers", "Sample-conditioning panels", "Calibration lines"] },
    customization: { ru: "Расход, соединение и корпус согласуются по рабочей точке.", en: "Flow, connection and housing are matched to the operating point." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Пористая нержавеющая сталь 316L", en: "Porous 316L stainless steel" } },
      { label: { ru: "Расход", en: "Flow" }, value: { ru: "По входному давлению и газу", en: "Sized by inlet pressure and gas" } },
      { label: { ru: "Назначение", en: "Function" }, value: { ru: "Пассивное ограничение и стабилизация", en: "Passive restriction and stabilization" } }
    ],
    applications: { ru: ["Пробоотборные линии", "Калибровочный газ", "Панели анализаторов"], en: ["Sampling lines", "Calibration gas", "Analyzer panels"] },
    relatedSlugs: ["high-purity-flow-restrictor", "precision-orifice-restrictor"]
  },
  {
    slug: "fitting-flow-limiter",
    categorySlug: "flow-control-accessories",
    model: "SM-FR-FIT",
    title: { ru: "Ограничитель расхода в корпусе фитинга", en: "Fitting-Body Flow Limiter" },
    summary: { ru: "Компактный ограничитель, совмещённый с соединительным фитингом для экономии места.", en: "Compact restrictor integrated into a connection fitting to save space." },
    image: "/assets/accessories/flow-fitting-limiter.webp",
    selection: { ru: ["Резьба или трубное соединение", "Расход", "Монтажное пространство"], en: ["Thread or tube connection", "Flow", "Installation space"] },
    compatibleWith: { ru: ["Компактные анализаторы", "Газовые шкафы", "OEM-модули"], en: ["Compact analyzers", "Gas cabinets", "OEM modules"] },
    customization: { ru: "Доступны разные корпуса, направления и калиброванные значения расхода.", en: "Different bodies, orientations and calibrated flow values are available." },
    specs: [
      { label: { ru: "Корпус", en: "Body" }, value: { ru: "Фитинг из нержавеющей стали", en: "Stainless-steel fitting" } },
      { label: { ru: "Соединение", en: "Connection" }, value: { ru: "Резьба или трубное", en: "Thread or tube" } },
      { label: { ru: "Расход", en: "Flow" }, value: { ru: "Калибруется под рабочую точку", en: "Calibrated for operating point" } }
    ],
    applications: { ru: ["Компактные анализаторы", "Газовые шкафы", "OEM-модули"], en: ["Compact analyzers", "Gas cabinets", "OEM modules"] },
    relatedSlugs: ["integrated-damping-fitting", "chromatography-threaded-restrictor"]
  },
  {
    slug: "high-purity-flow-restrictor",
    categorySlug: "flow-control-accessories",
    model: "SM-FR-UHP",
    title: { ru: "Ограничитель расхода для высокочистого газа", en: "High-Purity Gas Flow Restrictor" },
    summary: { ru: "Исполнение 316L для контролируемой подачи высокочистого или специального газа.", en: "316L construction for controlled delivery of high-purity or specialty gas." },
    image: "/assets/accessories/flow-high-purity.webp",
    selection: { ru: ["Чистота газа", "Герметичность", "Диапазон расхода"], en: ["Gas purity", "Leak tightness", "Flow range"] },
    compatibleWith: { ru: ["Высокочистые газовые панели", "Лабораторные анализаторы", "Полупроводниковые линии"], en: ["High-purity gas panels", "Laboratory analyzers", "Semiconductor lines"] },
    customization: { ru: "Подтверждаются обработка поверхности, соединение и требуемая утечка.", en: "Surface finish, connection and required leak rate are confirmed." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Диапазон расхода", en: "Flow range" }, value: { ru: "0,1 sccm-40 slpm по исполнению", en: "0.1 sccm-40 slpm by configuration" } },
      { label: { ru: "Соединение", en: "Connection" }, value: { ru: "1/4 дюйма VCR", en: "1/4 in VCR" } }
    ],
    applications: { ru: ["Высокочистые газы", "Полупроводниковые линии", "Распределительные коллекторы"], en: ["High-purity gases", "Semiconductor lines", "Distribution manifolds"] },
    relatedSlugs: ["porous-metal-flow-restrictor", "fitting-flow-limiter"]
  },
  {
    slug: "integrated-damping-fitting",
    categorySlug: "flow-control-accessories",
    model: "SM-FR-DMP",
    title: { ru: "Интегрированный демпфирующий фитинг", en: "Integrated Damping Fitting" },
    summary: { ru: "Фитинг с внутренним дросселем для снижения пульсаций и ограничения потока.", en: "Fitting with an internal restriction for damping pulsation and limiting flow." },
    image: "/assets/accessories/flow-damping-fitting.webp",
    selection: { ru: ["Тип соединения", "Перепад давления", "Требуемое демпфирование"], en: ["Connection type", "Pressure differential", "Required damping"] },
    compatibleWith: { ru: ["Датчики давления", "Пробоотборные линии", "Пневматические цепи"], en: ["Pressure sensors", "Sampling lines", "Pneumatic circuits"] },
    customization: { ru: "Проходное сечение и корпус доступны по чертежу.", en: "Flow passage and body are available to drawing." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316 или 316L", en: "316 or 316L" } },
      { label: { ru: "Функция", en: "Function" }, value: { ru: "Демпфирование и ограничение потока", en: "Damping and flow restriction" } },
      { label: { ru: "Проход", en: "Passage" }, value: { ru: "Калиброванное отверстие или пористый элемент", en: "Calibrated orifice or porous element" } }
    ],
    applications: { ru: ["Датчики давления", "Пробоотборные линии", "Пневматические цепи"], en: ["Pressure sensors", "Sampling lines", "Pneumatic circuits"] },
    relatedSlugs: ["fitting-flow-limiter", "precision-orifice-restrictor"]
  },
  {
    slug: "chromatography-threaded-restrictor",
    categorySlug: "flow-control-accessories",
    model: "SM-FR-ANA",
    title: { ru: "Резьбовой ограничитель для аналитической линии", en: "Threaded Restrictor for Analytical Lines" },
    summary: { ru: "Наружный резьбовой элемент для стабильного малого расхода в аналитических и калибровочных системах.", en: "Male-threaded element for stable low flow in analytical and calibration systems." },
    image: "/assets/accessories/flow-threaded-analytical.webp",
    selection: { ru: ["Резьба", "Малый расход", "Газ и входное давление"], en: ["Thread", "Low-flow target", "Gas and inlet pressure"] },
    compatibleWith: { ru: ["Газовая хроматография", "Калибровочные стенды", "Анализаторы кислорода"], en: ["Gas chromatography", "Calibration rigs", "Oxygen analyzers"] },
    customization: { ru: "Калиброванный расход и тип резьбы задаются при заказе.", en: "Calibrated flow and thread type are specified at order stage." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Наружная резьба", en: "Male thread" } },
      { label: { ru: "Расход", en: "Flow" }, value: { ru: "Малый расход по газу и давлению", en: "Low flow by gas and pressure" } }
    ],
    applications: { ru: ["Газовая хроматография", "Калибровочные стенды", "Анализаторы кислорода"], en: ["Gas chromatography", "Calibration rigs", "Oxygen analyzers"] },
    relatedSlugs: ["precision-orifice-restrictor", "porous-metal-flow-restrictor"]
  },
  {
    slug: "precision-orifice-restrictor",
    categorySlug: "flow-control-accessories",
    model: "SM-FR-ORI",
    title: { ru: "Прецизионный дроссельный ограничитель", en: "Precision-Orifice Flow Restrictor" },
    summary: { ru: "Металлический ограничитель с малым проходным отверстием для дозированной подачи газа.", en: "Metal restrictor with a small calibrated orifice for metered gas delivery." },
    image: "/assets/accessories/flow-precision-orifice.webp",
    selection: { ru: ["Диаметр отверстия", "Давление до и после", "Допуск расхода"], en: ["Orifice diameter", "Upstream and downstream pressure", "Flow tolerance"] },
    compatibleWith: { ru: ["Системы нулевого и поверочного газа", "Лабораторные приборы", "Газовые дозаторы"], en: ["Zero and span gas systems", "Laboratory instruments", "Gas dosing systems"] },
    customization: { ru: "Отверстие, материал и размеры корпуса могут быть изготовлены по заданию.", en: "Orifice, material and body dimensions can be made to specification." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Принцип", en: "Principle" }, value: { ru: "Калиброванное проходное отверстие", en: "Calibrated flow orifice" } },
      { label: { ru: "Допуск", en: "Tolerance" }, value: { ru: "Согласуется по рабочей точке", en: "Confirmed for operating point" } }
    ],
    applications: { ru: ["Дозирование газа", "Нулевой и поверочный газ", "Лабораторные приборы"], en: ["Gas dosing", "Zero and span gas", "Laboratory instruments"] },
    relatedSlugs: ["chromatography-threaded-restrictor", "integrated-damping-fitting"]
  }
];
