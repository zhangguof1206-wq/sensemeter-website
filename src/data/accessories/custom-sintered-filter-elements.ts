import type { AccessoryProduct } from "./types";

export const customSinteredFilterProducts: AccessoryProduct[] = [
  {
    slug: "custom-sintered-filter-cartridge",
    categorySlug: "custom-sintered-filter-elements",
    model: "SM-CS-CAR",
    title: { ru: "Заказной спечённый фильтрующий патрон", en: "Custom Sintered Filter Cartridge" },
    summary: { ru: "Цилиндрический фильтроэлемент по длине, диаметру, материалу и требуемой тонкости фильтрации.", en: "Cylindrical filter element specified by length, diameter, material and filtration grade." },
    image: "/assets/accessories/filter-custom-microporous-uniform.webp",
    selection: { ru: ["Длина, диаметр и посадка", "Материал и рабочая среда", "Расход и перепад давления"], en: ["Length, diameter and fit", "Material and process medium", "Flow and pressure drop"] },
    compatibleWith: { ru: ["Панели пробоподготовки", "Газовые анализаторы", "Сжатый воздух"], en: ["Sample-conditioning panels", "Gas analyzers", "Compressed air"] },
    customization: { ru: "Доступны резьбовые, фланцевые, сварные и разборные исполнения по чертежу или образцу.", en: "Threaded, flanged, welded and serviceable designs are available from drawing or sample." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "304, 316 или 316L", en: "304, 316 or 316L" } },
      { label: { ru: "Фильтрация", en: "Filtration" }, value: { ru: "0,2-100 мкм по задаче", en: "0.2-100 μm by requirement" } },
      { label: { ru: "Очистка", en: "Cleaning" }, value: { ru: "Продувка, промывка или замена", en: "Purge, wash or replacement" } }
    ],
    applications: { ru: ["Предварительная очистка газа", "Защита приборной линии", "Фильтрация с обслуживанием"], en: ["Gas prefiltration", "Instrument-line protection", "Serviceable filtration"] },
    relatedSlugs: ["sintered-mesh-disc", "drawing-defined-porous-element"]
  },
  {
    slug: "sintered-mesh-disc",
    categorySlug: "custom-sintered-filter-elements",
    model: "SM-CS-DSC",
    title: { ru: "Спечённый сетчатый фильтрующий диск", en: "Sintered Mesh Filter Disc" },
    summary: { ru: "Плоский фильтрующий диск для газовых соединений, клапанных узлов и компактных корпусов.", en: "Flat filter disc for gas connections, valve blocks and compact housings." },
    image: "/assets/accessories/filter-face-seal-disc-uniform.webp",
    selection: { ru: ["Диаметр и толщина", "Посадочная поверхность", "Тонкость фильтрации"], en: ["Diameter and thickness", "Sealing surface", "Filtration grade"] },
    compatibleWith: { ru: ["Фитинги", "Газовые коллекторы", "Анализаторные панели"], en: ["Fittings", "Gas manifolds", "Analyzer panels"] },
    customization: { ru: "Диск может быть выполнен с торцевым уплотнением, фаской или нестандартной посадкой.", en: "The disc can be supplied with face sealing, chamfer or non-standard fit." },
    specs: [
      { label: { ru: "Диаметр", en: "Diameter" }, value: { ru: "Обычно 2-500 мм", en: "Typically 2-500 mm" } },
      { label: { ru: "Толщина", en: "Thickness" }, value: { ru: "Обычно 1-100 мм", en: "Typically 1-100 mm" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или специальный сплав", en: "316L or special alloy" } }
    ],
    applications: { ru: ["Фильтрация в фитингах", "Защита клапанов", "Компактные газовые узлы"], en: ["Fitting filtration", "Valve protection", "Compact gas assemblies"] },
    relatedSlugs: ["custom-sintered-filter-cartridge", "sintered-mesh-plate"]
  },
  {
    slug: "sintered-mesh-plate",
    categorySlug: "custom-sintered-filter-elements",
    model: "SM-CS-PLT",
    title: { ru: "Спечённая фильтрующая пластина", en: "Sintered Filter Plate" },
    summary: { ru: "Пористая пластина для распределения потока, защиты поверхности или установки в плоский корпус.", en: "Porous plate for flow distribution, surface protection or installation in a flat housing." },
    image: "/assets/accessories/filter-shaped-element-uniform.webp",
    selection: { ru: ["Габариты пластины", "Активная зона", "Крепление и уплотнение"], en: ["Plate dimensions", "Active area", "Mounting and sealing"] },
    compatibleWith: { ru: ["Газораспределители", "Плоские фильтрующие узлы", "OEM-корпуса"], en: ["Gas distributors", "Flat filter assemblies", "OEM housings"] },
    customization: { ru: "Размер, толщина, активная зона и отверстия крепления согласуются по чертежу.", en: "Size, thickness, active area and mounting holes are confirmed by drawing." },
    specs: [
      { label: { ru: "Форма", en: "Shape" }, value: { ru: "Круглая, прямоугольная или фигурная", en: "Round, rectangular or shaped" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "По расходу и защите", en: "By flow and protection target" } },
      { label: { ru: "Обработка", en: "Machining" }, value: { ru: "Возможна после спекания", en: "Available after sintering" } }
    ],
    applications: { ru: ["Распределение газа", "Плоские корпуса", "Защитные панели"], en: ["Gas distribution", "Flat housings", "Protective panels"] },
    relatedSlugs: ["sintered-mesh-disc", "drawing-defined-porous-element"]
  },
  {
    slug: "sintered-mesh-tube",
    categorySlug: "custom-sintered-filter-elements",
    model: "SM-CS-TUB",
    title: { ru: "Спечённая фильтрующая трубка", en: "Sintered Filter Tube" },
    summary: { ru: "Трубчатый пористый элемент для фильтрации, защиты зонда или распределения газа по длине.", en: "Tubular porous element for filtration, probe protection or gas distribution along its length." },
    image: "/assets/accessories/filter-316l-powder-uniform.webp",
    selection: { ru: ["Наружный и внутренний диаметр", "Длина", "Направление потока"], en: ["Outer and inner diameter", "Length", "Flow direction"] },
    compatibleWith: { ru: ["Зонды", "Газовые трубки", "Фильтрующие корпуса"], en: ["Probes", "Gas tubes", "Filter housings"] },
    customization: { ru: "Трубка может поставляться с закрытым торцом, резьбой, фланцем или приварным соединением.", en: "The tube can be supplied with closed end, thread, flange or welded connection." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L", en: "316L" } },
      { label: { ru: "Длина", en: "Length" }, value: { ru: "По месту установки", en: "Matched to installation" } },
      { label: { ru: "Торец", en: "End form" }, value: { ru: "Открытый или закрытый", en: "Open or closed" } }
    ],
    applications: { ru: ["Защита зонда", "Распределение газа", "Фильтрация в корпусе"], en: ["Probe protection", "Gas distribution", "In-housing filtration"] },
    relatedSlugs: ["custom-sintered-filter-cartridge", "backwashable-sintered-element"]
  },
  {
    slug: "drawing-defined-porous-element",
    categorySlug: "custom-sintered-filter-elements",
    model: "SM-CS-DRW",
    title: { ru: "Пористый элемент по чертежу", en: "Drawing-Defined Porous Element" },
    summary: { ru: "Нестандартная пористая деталь по 2D/3D-чертежу или образцу заказчика.", en: "Non-standard porous part made from a 2D/3D drawing or customer sample." },
    image: "/assets/accessories/filter-industrial-cartridge-uniform.webp",
    selection: { ru: ["2D/3D-чертёж или образец", "Допуски", "Активная фильтрующая зона"], en: ["2D/3D drawing or sample", "Tolerances", "Active filtration area"] },
    compatibleWith: { ru: ["OEM-приборы", "Специальные корпуса", "Опытные партии"], en: ["OEM instruments", "Special housings", "Pilot batches"] },
    customization: { ru: "Поддерживается нестандартная форма, механическая обработка, посадка и материал под задачу.", en: "Custom shape, machining, fit and material can be matched to the task." },
    specs: [
      { label: { ru: "Геометрия", en: "Geometry" }, value: { ru: "По чертежу или образцу", en: "By drawing or sample" } },
      { label: { ru: "Материалы", en: "Materials" }, value: { ru: "316L, никель, медные сплавы", en: "316L, nickel, copper alloys" } },
      { label: { ru: "Партия", en: "Batch" }, value: { ru: "Опытная или серийная", en: "Pilot or serial" } }
    ],
    applications: { ru: ["OEM-разработка", "Нестандартные узлы", "Замена импортных деталей"], en: ["OEM development", "Non-standard assemblies", "Replacement parts"] },
    relatedSlugs: ["sintered-mesh-plate", "custom-sintered-filter-cartridge"]
  },
  {
    slug: "backwashable-sintered-element",
    categorySlug: "custom-sintered-filter-elements",
    model: "SM-CS-BW",
    title: { ru: "Промываемый спечённый элемент", en: "Backwashable Sintered Element" },
    summary: { ru: "Пористый элемент для узлов, где важны повторная очистка, продувка и длительный срок службы.", en: "Porous element for assemblies requiring repeat cleaning, purge and long service life." },
    image: "/assets/accessories/filter-nano-disc-uniform.webp",
    selection: { ru: ["Тип загрязнений", "Способ очистки", "Ресурс и сервисный доступ"], en: ["Contaminant type", "Cleaning method", "Service life and access"] },
    compatibleWith: { ru: ["Газовые фильтры", "Пробоотбор", "Промышленные линии"], en: ["Gas filters", "Sampling", "Industrial lines"] },
    customization: { ru: "Согласуются направление промывки, прочность, пористость и способ установки.", en: "Backwash direction, strength, porosity and installation method are confirmed." },
    specs: [
      { label: { ru: "Очистка", en: "Cleaning" }, value: { ru: "Продувка или обратная промывка", en: "Purge or backwash" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или 316", en: "316L or 316" } },
      { label: { ru: "Назначение", en: "Use" }, value: { ru: "Многократная эксплуатация", en: "Repeat service" } }
    ],
    applications: { ru: ["Длительный сервис", "Пыльный газ", "Предварительная фильтрация"], en: ["Long service", "Dusty gas", "Prefiltration"] },
    relatedSlugs: ["sintered-mesh-tube", "custom-sintered-filter-cartridge"]
  }
];
