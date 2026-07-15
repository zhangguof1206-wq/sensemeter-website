import type { AccessoryProduct } from "./types";

export const sinteredMicroporousAccessoryProducts: AccessoryProduct[] = [
  {
    slug: "micro-porous-filter-disc",
    categorySlug: "sintered-microporous-accessories",
    model: "SM-MP-DSC",
    title: { ru: "Микропористый фильтрующий диск", en: "Microporous Filter Disc" },
    summary: { ru: "Миниатюрный пористый диск для защиты датчиков, клапанов и небольших газовых каналов.", en: "Mini porous disc for protecting sensors, valves and small gas passages." },
    image: "/assets/accessories/filter-face-seal-disc-uniform.webp",
    selection: { ru: ["Диаметр и толщина", "Размер пор", "Уплотнение или посадка"], en: ["Diameter and thickness", "Pore size", "Seal or fit"] },
    compatibleWith: { ru: ["Датчики", "Клапанные блоки", "Газовые фитинги"], en: ["Sensors", "Valve blocks", "Gas fittings"] },
    customization: { ru: "Доступны разные диаметры, толщина, активная зона и материал.", en: "Different diameters, thicknesses, active areas and materials are available." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или 316", en: "316L or 316" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "0,1-120 мкм", en: "0.1-120 μm" } },
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Плоский диск", en: "Flat disc" } }
    ],
    applications: { ru: ["Защита датчиков", "Фильтрация в малом объёме", "Чистые газовые линии"], en: ["Sensor protection", "Small-volume filtration", "Clean gas lines"] },
    relatedSlugs: ["micro-porous-filter-tube", "threaded-porous-insert"]
  },
  {
    slug: "micro-porous-filter-tube",
    categorySlug: "sintered-microporous-accessories",
    model: "SM-MP-TUB",
    title: { ru: "Микропористая фильтрующая трубка", en: "Microporous Filter Tube" },
    summary: { ru: "Трубчатый микропористый элемент для защиты зонда, распределения газа или компактной фильтрации.", en: "Tubular microporous element for probe protection, gas distribution or compact filtration." },
    image: "/assets/accessories/filter-316l-powder-uniform.webp",
    selection: { ru: ["Длина", "Внутренний и наружный диаметр", "Направление потока"], en: ["Length", "Inside and outside diameter", "Flow direction"] },
    compatibleWith: { ru: ["Зонды", "Газовые каналы", "OEM-корпуса"], en: ["Probes", "Gas passages", "OEM housings"] },
    customization: { ru: "Можно согласовать закрытый торец, резьбу, посадку и пористую зону.", en: "Closed end, thread, fit and porous section can be specified." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L", en: "316L" } },
      { label: { ru: "Пористая зона", en: "Porous zone" }, value: { ru: "По длине или локально", en: "Full length or local" } },
      { label: { ru: "Исполнение", en: "Construction" }, value: { ru: "Открытый или закрытый торец", en: "Open or closed end" } }
    ],
    applications: { ru: ["Зондовые узлы", "Подача газа", "Компактные фильтры"], en: ["Probe assemblies", "Gas delivery", "Compact filters"] },
    relatedSlugs: ["micro-porous-filter-disc", "miniature-porous-filter"]
  },
  {
    slug: "threaded-porous-insert",
    categorySlug: "sintered-microporous-accessories",
    model: "SM-MP-THD",
    title: { ru: "Резьбовая пористая вставка", en: "Threaded Porous Insert" },
    summary: { ru: "Компактная вставка с резьбой для установки в корпус, пробоотборный блок или газовый фитинг.", en: "Compact threaded insert for a housing, sampling block or gas fitting." },
    image: "/assets/accessories/flow-threaded-analytical-uniform.webp",
    selection: { ru: ["Тип резьбы", "Размер пор", "Рабочее давление"], en: ["Thread type", "Pore size", "Operating pressure"] },
    compatibleWith: { ru: ["Газовые фитинги", "Пробоотбор", "OEM-узлы"], en: ["Gas fittings", "Sampling", "OEM assemblies"] },
    customization: { ru: "Доступны наружная или внутренняя резьба, разные длины и пористые вставки.", en: "Male or female thread, different lengths and porous inserts are available." },
    specs: [
      { label: { ru: "Резьба", en: "Thread" }, value: { ru: "По месту установки", en: "Matched to installation" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L", en: "316L" } },
      { label: { ru: "Назначение", en: "Use" }, value: { ru: "Фильтрация или демпфирование", en: "Filtration or damping" } }
    ],
    applications: { ru: ["Фитинги", "Газовые блоки", "Демпфирование потока"], en: ["Fittings", "Gas blocks", "Flow damping"] },
    relatedSlugs: ["porous-plug-element", "micro-porous-filter-disc"]
  },
  {
    slug: "sintered-muffler-core",
    categorySlug: "sintered-microporous-accessories",
    model: "SM-MP-MUF",
    title: { ru: "Спечённый сердечник глушителя", en: "Sintered Muffler Core" },
    summary: { ru: "Пористый сердечник для снижения шума и выравнивания выхода воздуха или газа.", en: "Porous core for reducing noise and smoothing air or gas exhaust." },
    image: "/assets/accessories/flow-damping-fitting-uniform.webp",
    selection: { ru: ["Расход", "Давление", "Уровень шумоподавления"], en: ["Flow", "Pressure", "Noise reduction target"] },
    compatibleWith: { ru: ["Пневматика", "Сброс газа", "Газовые шкафы"], en: ["Pneumatics", "Gas venting", "Gas cabinets"] },
    customization: { ru: "Пористость, корпус и подключение подбираются по расходу и среде.", en: "Porosity, body and connection are matched to flow and medium." },
    specs: [
      { label: { ru: "Функция", en: "Function" }, value: { ru: "Шумоподавление и рассеивание", en: "Noise reduction and diffusion" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Пористая нержавеющая сталь", en: "Porous stainless steel" } },
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Резьба или корпус", en: "Thread or housing" } }
    ],
    applications: { ru: ["Пневматические линии", "Выпуск газа", "Лабораторные стенды"], en: ["Pneumatic lines", "Gas exhaust", "Laboratory rigs"] },
    relatedSlugs: ["threaded-porous-insert", "miniature-porous-filter"]
  },
  {
    slug: "porous-plug-element",
    categorySlug: "sintered-microporous-accessories",
    model: "SM-MP-PLG",
    title: { ru: "Пористая пробка-вставка", en: "Porous Plug Element" },
    summary: { ru: "Малая пористая вставка для защиты отверстия, ограничения потока или распределения газа.", en: "Small porous insert for opening protection, flow restriction or gas distribution." },
    image: "/assets/accessories/flow-precision-orifice-uniform.webp",
    selection: { ru: ["Диаметр отверстия", "Глубина посадки", "Пористость"], en: ["Opening diameter", "Fit depth", "Porosity"] },
    compatibleWith: { ru: ["Малые корпуса", "Дозирующие узлы", "Датчики"], en: ["Small housings", "Dosing assemblies", "Sensors"] },
    customization: { ru: "Возможна поставка по образцу, посадочному диаметру или чертежу.", en: "Supply from sample, fit diameter or drawing is available." },
    specs: [
      { label: { ru: "Размер", en: "Size" }, value: { ru: "Миниатюрное исполнение", en: "Miniature construction" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или специальный сплав", en: "316L or special alloy" } },
      { label: { ru: "Функция", en: "Function" }, value: { ru: "Защита, фильтрация или ограничение", en: "Protection, filtration or restriction" } }
    ],
    applications: { ru: ["Миниатюрные каналы", "Защита отверстий", "OEM-приборы"], en: ["Mini passages", "Opening protection", "OEM instruments"] },
    relatedSlugs: ["threaded-porous-insert", "micro-porous-filter-disc"]
  },
  {
    slug: "miniature-porous-filter",
    categorySlug: "sintered-microporous-accessories",
    model: "SM-MP-MIN",
    title: { ru: "Миниатюрный пористый фильтр", en: "Miniature Porous Filter" },
    summary: { ru: "Небольшой фильтрующий элемент для приборов, где важны малый объём и стабильный поток.", en: "Small filter element for instruments requiring low volume and stable flow." },
    image: "/assets/accessories/filter-custom-microporous-uniform.webp",
    selection: { ru: ["Мёртвый объём", "Размер пор", "Совместимость с газом"], en: ["Dead volume", "Pore size", "Gas compatibility"] },
    compatibleWith: { ru: ["Портативные приборы", "Газовые сенсоры", "Лабораторные узлы"], en: ["Portable instruments", "Gas sensors", "Laboratory assemblies"] },
    customization: { ru: "Размеры, материал и фильтрационная зона согласуются под корпус прибора.", en: "Dimensions, material and filtration zone are matched to the instrument housing." },
    specs: [
      { label: { ru: "Объём", en: "Volume" }, value: { ru: "Малый внутренний объём", en: "Low internal volume" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "По задаче", en: "By requirement" } },
      { label: { ru: "Чистота", en: "Cleanliness" }, value: { ru: "Для приборной линии", en: "For instrument line" } }
    ],
    applications: { ru: ["Портативные анализаторы", "Газовые сенсоры", "Компактные модули"], en: ["Portable analyzers", "Gas sensors", "Compact modules"] },
    relatedSlugs: ["micro-porous-filter-tube", "sintered-muffler-core"]
  }
];
