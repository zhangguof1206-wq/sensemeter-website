import type { AccessoryCategory } from "./types";

export const accessoryCategories: AccessoryCategory[] = [
  {
    slug: "custom-sintered-filter-elements",
    title: { ru: "Спечённые фильтроэлементы под заказ", en: "Custom Sintered Filter Elements" },
    summary: {
      ru: "Фильтроэлементы из пористой нержавеющей стали по чертежу, образцу, требуемой пористости и монтажным размерам.",
      en: "Porous stainless-steel filter elements made to drawing, sample, pore structure and mounting dimensions."
    },
    intro: {
      ru: "SenseMeter поставляет стандартные и заказные спечённые элементы для фильтрации газа, защиты измерительных линий и установки в приборные узлы. При подборе учитываются материал, геометрия, размер пор, расход, перепад давления, температура и способ очистки.",
      en: "SenseMeter supplies standard and custom sintered elements for gas filtration, measurement-line protection and instrument assemblies. Selection considers material, geometry, pore size, flow, pressure drop, temperature and cleaning method."
    },
    image: "/assets/accessories/filter-industrial-cartridge.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "304, 316, 316L и специальные сплавы", en: "304, 316, 316L and special alloys" } },
      { label: { ru: "Тонкость фильтрации", en: "Filtration grade" }, value: { ru: "Ориентировочно 0,2-100 мкм по задаче", en: "Typically 0.2-100 μm by requirement" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Диск, трубка, стакан, патрон или по чертежу", en: "Disc, tube, cup, cartridge or drawing-defined" } }
    ],
    technicalNotes: {
      title: { ru: "Что согласовывается при изготовлении", en: "What is confirmed for production" },
      items: [
        {
          title: { ru: "Пористая структура", en: "Pore structure" },
          text: { ru: "Размер пор и проницаемость подбираются под требуемую степень защиты, расход и допустимый перепад давления.", en: "Pore size and permeability are matched to protection level, flow and allowable pressure drop." }
        },
        {
          title: { ru: "Обработка после спекания", en: "Post-sinter machining" },
          text: { ru: "Для нестандартных деталей можно согласовать резьбу, посадочные поверхности, торцы и активную зону фильтрации.", en: "For non-standard parts, thread, fit surfaces, end faces and active filtration area can be specified." }
        },
        {
          title: { ru: "Очистка и ресурс", en: "Cleaning and service life" },
          text: { ru: "Конструкция может предусматривать повторную очистку, обратную промывку или замену элемента в сервисном узле.", en: "The design can allow repeat cleaning, backwash or replacement in a serviceable assembly." }
        }
      ]
    },
    requestItems: {
      ru: ["Чертёж или образец", "Материал и рабочая среда", "Размер пор или класс фильтрации", "Расход и перепад давления", "Температура и давление", "Количество"],
      en: ["Drawing or sample", "Material and process medium", "Pore size or filtration grade", "Flow and pressure drop", "Temperature and pressure", "Quantity"]
    }
  },
  {
    slug: "sintered-microporous-accessories",
    title: { ru: "Металлические микропористые комплектующие", en: "Sintered Microporous Metal Accessories" },
    summary: {
      ru: "Компактные микропористые вставки, диски, трубки и пробки для защиты датчиков, газовых линий и приборных корпусов.",
      en: "Compact microporous inserts, discs, tubes and plugs for sensor protection, gas lines and instrument housings."
    },
    intro: {
      ru: "Микропористые металлические детали используются как защитные, фильтрующие, демпфирующие и газораспределительные элементы. Важны равномерность пор, чистота поверхности, отсутствие выделения частиц и совместимость с газом или средой.",
      en: "Microporous metal parts are used as protective, filtering, damping and gas-distribution elements. Uniform pores, surface cleanliness, no particle shedding and media compatibility are key selection points."
    },
    image: "/assets/accessories/filter-custom-microporous.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "316L, 316, никелевые и медные сплавы", en: "316L, 316, nickel and copper alloys" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "0,1-120 мкм по применению", en: "0.1-120 μm by application" } },
      { label: { ru: "Исполнение", en: "Construction" }, value: { ru: "Миниатюрные вставки, диски, трубки и нестандартные формы", en: "Mini inserts, discs, tubes and custom shapes" } }
    ],
    technicalNotes: {
      title: { ru: "Технические особенности", en: "Technical notes" },
      items: [
        {
          title: { ru: "Равномерные поры", en: "Uniform pores" },
          text: { ru: "Равномерная структура пор помогает обеспечить стабильную фильтрацию, проницаемость и повторяемость потока.", en: "Uniform pore structure supports stable filtration, permeability and repeatable flow." }
        },
        {
          title: { ru: "Компактная интеграция", en: "Compact integration" },
          text: { ru: "Элементы можно встроить в небольшой корпус прибора, фитинг, защитный колпачок или пробоотборный узел.", en: "Elements can be integrated into a compact instrument housing, fitting, guard or sampling block." }
        },
        {
          title: { ru: "Материал под среду", en: "Material matched to medium" },
          text: { ru: "Для агрессивных газов, высокой чистоты или высокой температуры материал и обработка поверхности подтверждаются отдельно.", en: "For aggressive gases, high-purity service or high temperature, material and surface treatment are confirmed separately." }
        }
      ]
    },
    requestItems: {
      ru: ["Размеры и форма", "Материал", "Размер пор", "Газ или жидкость", "Монтажный способ", "Требуемое количество"],
      en: ["Dimensions and shape", "Material", "Pore size", "Gas or liquid", "Mounting method", "Required quantity"]
    }
  },
  {
    slug: "sintered-filter-cups",
    title: { ru: "Спечённые фильтрующие стаканы", en: "Sintered Stainless Filter Cups" },
    summary: {
      ru: "Фильтрующие стаканы, чашки и патроны из нержавеющей стали для защиты, предварительной очистки и распределения потока.",
      en: "Stainless-steel filter cups, caps and cartridges for protection, prefiltration and flow distribution."
    },
    intro: {
      ru: "Фильтрующие стаканы применяются там, где нужен прочный пористый объём: защита датчика, предварительная очистка газа, удержание частиц или работа в корпусе с обслуживаемым элементом.",
      en: "Filter cups are used where a robust porous volume is required: sensor protection, gas prefiltration, particle retention or a serviceable filter inside a housing."
    },
    image: "/assets/accessories/filter-shaped-element.webp",
    specs: [
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "304, 316, 316L", en: "304, 316, 316L" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Стакан, чашка, цилиндр, резьбовое или сварное исполнение", en: "Cup, cap, cylinder, threaded or welded construction" } },
      { label: { ru: "Тонкость", en: "Grade" }, value: { ru: "Согласуется по частицам, расходу и перепаду давления", en: "Confirmed by particles, flow and pressure drop" } }
    ],
    technicalNotes: {
      title: { ru: "Что важно для фильтрующих стаканов", en: "Key points for filter cups" },
      items: [
        {
          title: { ru: "Механическая прочность", en: "Mechanical strength" },
          text: { ru: "Толщина стенки, глубина стакана и способ крепления выбираются по давлению, вибрации и режиму обслуживания.", en: "Wall thickness, cup depth and mounting method are selected by pressure, vibration and service mode." }
        },
        {
          title: { ru: "Очистка и замена", en: "Cleaning and replacement" },
          text: { ru: "Для обслуживаемых узлов заранее уточняется возможность промывки, продувки или быстрой замены элемента.", en: "For serviceable assemblies, washing, purge cleaning or quick replacement can be planned in advance." }
        },
        {
          title: { ru: "Посадочные размеры", en: "Fit dimensions" },
          text: { ru: "Наружный диаметр, глубина, торец и посадочная поверхность должны совпадать с корпусом или приборным узлом.", en: "Outside diameter, depth, end face and fit surface must match the housing or instrument assembly." }
        }
      ]
    },
    requestItems: {
      ru: ["Наружный и внутренний диаметр", "Глубина или длина", "Материал", "Тонкость фильтрации", "Способ крепления", "Условия очистки"],
      en: ["Outside and inside diameter", "Depth or length", "Material", "Filtration grade", "Mounting method", "Cleaning conditions"]
    }
  },
  {
    slug: "gas-diffusers",
    title: { ru: "Газовые диффузоры и аэрационные элементы", en: "Gas Diffusers and Aeration Elements" },
    summary: {
      ru: "Пористые диффузоры, аэрационные головки и газораспределительные элементы для равномерной подачи газа и снижения пульсаций.",
      en: "Porous diffusers, aeration heads and gas-distribution elements for uniform gas delivery and pulsation reduction."
    },
    intro: {
      ru: "Диффузоры и аэрационные элементы подбираются по газу, расходу, давлению, размеру пузырьков или характеру распределения потока. Пористая структура помогает равномерно распределить газ и защитить линию от резких скачков потока.",
      en: "Diffusers and aeration elements are selected by gas, flow, pressure, bubble size or flow-distribution target. Porous structure helps distribute gas evenly and protect the line from sudden flow changes."
    },
    image: "/assets/accessories/flow-damping-fitting.webp",
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или 316 нержавеющая сталь", en: "316L or 316 stainless steel" } },
      { label: { ru: "Подача газа", en: "Gas delivery" }, value: { ru: "Подбирается по расходу, давлению и распределению", en: "Selected by flow, pressure and distribution pattern" } },
      { label: { ru: "Интерфейс", en: "Interface" }, value: { ru: "Резьба, трубка, фитинг или сварное исполнение", en: "Thread, tube, fitting or welded construction" } }
    ],
    technicalNotes: {
      title: { ru: "Параметры для стабильной подачи газа", en: "Parameters for stable gas delivery" },
      items: [
        {
          title: { ru: "Распределение потока", en: "Flow distribution" },
          text: { ru: "Форма и активная пористая зона подбираются так, чтобы газ выходил равномерно по рабочей поверхности.", en: "Shape and active porous area are selected so gas exits evenly across the working surface." }
        },
        {
          title: { ru: "Сопротивление и расход", en: "Resistance and flow" },
          text: { ru: "Перед заказом важно согласовать входное давление, целевой расход и допустимый перепад давления.", en: "Before ordering, inlet pressure, target flow and allowable pressure drop should be confirmed." }
        },
        {
          title: { ru: "Рабочая среда", en: "Working medium" },
          text: { ru: "Для кислорода, технологического газа, лабораторного газа или жидкости материал и чистота исполнения выбираются отдельно.", en: "For oxygen, process gas, laboratory gas or liquid, material and cleanliness level are selected separately." }
        }
      ]
    },
    requestItems: {
      ru: ["Газ или жидкость", "Расход", "Входное давление", "Тип соединения", "Желаемое распределение", "Количество"],
      en: ["Gas or liquid", "Flow", "Inlet pressure", "Connection type", "Target distribution", "Quantity"]
    }
  },
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
    ],
    technicalNotes: {
      title: { ru: "Особенности защитных корпусов", en: "Probe housing notes" },
      items: [
        {
          title: { ru: "Защита без потери отклика", en: "Protection with response" },
          text: { ru: "Пористая оболочка защищает чувствительный элемент от пыли, брызг и механического контакта, сохраняя контакт со средой.", en: "The porous shell protects the sensing element from dust, splashes and mechanical contact while preserving contact with the medium." }
        },
        {
          title: { ru: "Равномерная проницаемость", en: "Uniform permeability" },
          text: { ru: "Согласованная структура пор помогает снизить локальное загрязнение и поддерживать стабильность измерения.", en: "A controlled pore structure helps reduce local contamination and maintain measurement stability." }
        },
        {
          title: { ru: "Заказные формы", en: "Custom forms" },
          text: { ru: "Доступны плоские, конические, резьбовые, цилиндрические и специальные исполнения по посадке зонда.", en: "Flat, conical, threaded, cylindrical and special forms are available to match probe fit." }
        }
      ]
    },
    requestItems: {
      ru: ["Модель зонда", "Резьба или посадка", "Рабочая среда", "Температура и влажность", "Требуемый отклик", "Количество"],
      en: ["Probe model", "Thread or fit", "Process medium", "Temperature and humidity", "Required response", "Quantity"]
    }
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
    ],
    technicalNotes: {
      title: { ru: "Контроль расхода в газовой линии", en: "Gas-line flow control" },
      items: [
        {
          title: { ru: "Стабильный малый расход", en: "Stable low flow" },
          text: { ru: "Ограничитель подбирается по рабочей точке, чтобы получить повторяемый расход без сложного регулирования.", en: "The restrictor is selected around the operating point to provide repeatable flow without complex adjustment." }
        },
        {
          title: { ru: "Чистое исполнение", en: "Clean construction" },
          text: { ru: "Для высокочистых газов подтверждаются материал, обработка поверхности, герметичность и отсутствие выделения частиц.", en: "For high-purity gases, material, surface finish, leak tightness and no particle shedding are confirmed." }
        },
        {
          title: { ru: "Монтаж в фитинг", en: "Fitting integration" },
          text: { ru: "Ограничитель может быть отдельной деталью или встроенным элементом фитинга, панели или газового шкафа.", en: "The restrictor can be a standalone part or an integrated element inside a fitting, panel or gas cabinet." }
        }
      ]
    },
    requestItems: {
      ru: ["Газ", "Входное и выходное давление", "Целевой расход", "Тип соединения", "Чистота линии", "Количество"],
      en: ["Gas", "Inlet and outlet pressure", "Target flow", "Connection type", "Line cleanliness", "Quantity"]
    }
  }
];
