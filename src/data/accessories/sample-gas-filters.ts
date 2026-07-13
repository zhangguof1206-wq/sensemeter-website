import type { AccessoryProduct } from "./types";

export const sampleGasFilterProducts: AccessoryProduct[] = [
  {
    slug: "clean-compressed-air-filter",
    categorySlug: "sample-gas-filters",
    model: "SM-GF-CA",
    title: { ru: "Фильтр чистого сжатого воздуха", en: "Clean Compressed-Air Filter" },
    summary: { ru: "Линейный фильтр для удаления частиц перед датчиком точки росы или измерительной панелью.", en: "Inline particle filter upstream of a dew-point sensor or measurement panel." },
    image: "/assets/accessories/gas-filter-compressed-air.webp",
    selection: { ru: ["Расход воздуха", "Рабочее давление", "Требуемая фильтрация"], en: ["Air flow", "Operating pressure", "Required filtration"] },
    compatibleWith: { ru: ["Измерители точки росы", "Осушители", "Пневматические линии"], en: ["Dew-point instruments", "Dryers", "Pneumatic lines"] },
    customization: { ru: "Корпус, соединение и фильтрующий элемент подбираются под линию.", en: "Housing, connection and element are matched to the line." },
    specs: [
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Фильтрация", en: "Filtration" }, value: { ru: "От 0,01 мкм по задаче", en: "From 0.01 µm by application" } },
      { label: { ru: "Соединение", en: "Connection" }, value: { ru: "Трубное или резьбовое", en: "Tube or threaded" } }
    ],
    applications: { ru: ["Осушители", "Датчики точки росы", "Пневматические линии"], en: ["Dryers", "Dew-point sensors", "Pneumatic lines"] },
    relatedSlugs: ["high-purity-inline-gas-filter", "t-type-branch-gas-filter"]
  },
  {
    slug: "high-purity-inline-gas-filter",
    categorySlug: "sample-gas-filters",
    model: "SM-GF-UHP",
    title: { ru: "Линейный фильтр высокочистого газа", en: "High-Purity Inline Gas Filter" },
    summary: { ru: "Компактный фильтр 316L для чистых газовых линий и чувствительных анализаторов.", en: "Compact 316L filter for clean gas lines and sensitive analyzers." },
    image: "/assets/accessories/gas-filter-high-purity.webp",
    selection: { ru: ["Газ и требуемая чистота", "Тип соединения", "Допустимая утечка"], en: ["Gas and required purity", "Connection type", "Allowed leak rate"] },
    compatibleWith: { ru: ["Кислородные анализаторы", "Высокочистые газовые панели", "Лабораторные линии"], en: ["Oxygen analyzers", "High-purity gas panels", "Laboratory lines"] },
    customization: { ru: "Доступны варианты подключения и обработки поверхности.", en: "Connection and surface-finish options are available." },
    specs: [
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Фильтрация", en: "Filtration" }, value: { ru: "До 0,003 мкм по исполнению", en: "Down to 0.003 µm by configuration" } },
      { label: { ru: "Соединение", en: "Connection" }, value: { ru: "VCR или трубное", en: "VCR or tube" } }
    ],
    applications: { ru: ["Высокочистые газовые панели", "Кислородные анализаторы", "Лабораторные линии"], en: ["High-purity gas panels", "Oxygen analyzers", "Laboratory lines"] },
    relatedSlugs: ["specialty-gas-line-filter", "w-type-laboratory-gas-filter"]
  },
  {
    slug: "specialty-gas-line-filter",
    categorySlug: "sample-gas-filters",
    model: "SM-GF-SFG",
    title: { ru: "Фильтр линии специального газа", en: "Specialty-Gas Line Filter" },
    summary: { ru: "Фильтр для защиты измерительных и распределительных компонентов в линиях специальных газов.", en: "Filter for protecting measurement and distribution components in specialty-gas lines." },
    image: "/assets/accessories/gas-filter-specialty.webp",
    selection: { ru: ["Химическая совместимость", "Давление", "Чистота внутренней поверхности"], en: ["Chemical compatibility", "Pressure", "Internal surface cleanliness"] },
    compatibleWith: { ru: ["Газоанализаторы", "Распределительные панели", "Контроль чистоты газа"], en: ["Gas analyzers", "Distribution panels", "Gas-purity monitoring"] },
    customization: { ru: "Материал уплотнений и исполнение корпуса подтверждаются по газу.", en: "Seal material and housing construction are confirmed against the gas." },
    specs: [
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "316L, совместимость по газу", en: "316L, gas compatibility confirmed" } },
      { label: { ru: "Фильтрующая среда", en: "Filter medium" }, value: { ru: "Пористый металл или реакционный слой", en: "Porous metal or reactive bed" } },
      { label: { ru: "Соединение", en: "Connection" }, value: { ru: "VCR или заказное", en: "VCR or custom" } }
    ],
    applications: { ru: ["Специальные газы", "Распределительные панели", "Контроль чистоты газа"], en: ["Specialty gases", "Distribution panels", "Gas-purity monitoring"] },
    relatedSlugs: ["high-purity-inline-gas-filter", "central-gas-supply-filter"]
  },
  {
    slug: "central-gas-supply-filter",
    categorySlug: "sample-gas-filters",
    model: "SM-GF-CEN",
    title: { ru: "Фильтр централизованной подачи газа", en: "Central Gas-Supply Filter" },
    summary: { ru: "Фильтр для общей магистрали или точки распределения газа к нескольким приборам.", en: "Filter for a main line or distribution point feeding multiple instruments." },
    image: "/assets/accessories/gas-filter-central-supply.webp",
    selection: { ru: ["Суммарный расход", "Количество потребителей", "Перепад давления"], en: ["Total flow", "Number of users", "Pressure drop"] },
    compatibleWith: { ru: ["Анализаторные комнаты", "Лабораторные сети", "Производственные газовые системы"], en: ["Analyzer rooms", "Laboratory networks", "Production gas systems"] },
    customization: { ru: "Конфигурация корпуса и присоединения рассчитываются под сеть.", en: "Housing and connection configuration are sized for the network." },
    specs: [
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Производительность", en: "Capacity" }, value: { ru: "По суммарному расходу сети", en: "Sized for total network flow" } },
      { label: { ru: "Сервис", en: "Service" }, value: { ru: "Сменный или очищаемый элемент", en: "Replaceable or cleanable element" } }
    ],
    applications: { ru: ["Централизованная подача газа", "Анализаторные комнаты", "Лабораторные сети"], en: ["Central gas supply", "Analyzer rooms", "Laboratory networks"] },
    relatedSlugs: ["t-type-branch-gas-filter", "w-type-laboratory-gas-filter"]
  },
  {
    slug: "w-type-laboratory-gas-filter",
    categorySlug: "sample-gas-filters",
    model: "SM-GF-W",
    title: { ru: "W-образный лабораторный газовый фильтр", en: "W-Type Laboratory Gas Filter" },
    summary: { ru: "Интегрированный фильтр с малым мёртвым объёмом для лабораторных и анализаторных линий.", en: "Integrated low-dead-volume filter for laboratory and analyzer lines." },
    image: "/assets/accessories/gas-filter-w-type.webp",
    selection: { ru: ["Направление потока", "Мёртвый объём", "Соединения линии"], en: ["Flow direction", "Dead volume", "Line connections"] },
    compatibleWith: { ru: ["Лабораторные анализаторы", "Калибровочные линии", "Чистые газовые сети"], en: ["Laboratory analyzers", "Calibration lines", "Clean gas networks"] },
    customization: { ru: "Компоновка и соединения могут быть адаптированы к панели.", en: "Layout and connections can be adapted to the panel." },
    specs: [
      { label: { ru: "Конструкция", en: "Construction" }, value: { ru: "W-образная, малый мёртвый объём", en: "W-type, low dead volume" } },
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Соединения", en: "Connections" }, value: { ru: "Под лабораторную панель", en: "Matched to laboratory panel" } }
    ],
    applications: { ru: ["Лабораторные анализаторы", "Калибровочные линии", "Чистые газовые сети"], en: ["Laboratory analyzers", "Calibration lines", "Clean gas networks"] },
    relatedSlugs: ["high-purity-inline-gas-filter", "t-type-branch-gas-filter"]
  },
  {
    slug: "t-type-branch-gas-filter",
    categorySlug: "sample-gas-filters",
    model: "SM-GF-T",
    title: { ru: "T-образный фильтр газовой ветви", en: "T-Type Branch Gas Filter" },
    summary: { ru: "Фильтр для локальной очистки отдельной ветви или точки подключения прибора.", en: "Filter for local cleaning of an individual branch or instrument connection point." },
    image: "/assets/accessories/gas-filter-t-type.webp",
    selection: { ru: ["Размер основной магистрали", "Размер ответвления", "Сервисный доступ"], en: ["Main-line size", "Branch size", "Service access"] },
    compatibleWith: { ru: ["Многоточечные системы", "Панели отбора проб", "Отдельные анализаторы"], en: ["Multipoint systems", "Sampling panels", "Individual analyzers"] },
    customization: { ru: "Размеры тройника, направление и фильтрующий элемент доступны под заказ.", en: "Tee dimensions, orientation and filter element are available to order." },
    specs: [
      { label: { ru: "Конструкция", en: "Construction" }, value: { ru: "T-образная ветвь", en: "T-type branch" } },
      { label: { ru: "Корпус", en: "Housing" }, value: { ru: "Нержавеющая сталь 316L", en: "316L stainless steel" } },
      { label: { ru: "Подключение", en: "Connection" }, value: { ru: "По размерам магистрали и ветви", en: "Matched to main and branch sizes" } }
    ],
    applications: { ru: ["Многоточечные системы", "Панели отбора проб", "Локальная защита анализатора"], en: ["Multipoint systems", "Sampling panels", "Local analyzer protection"] },
    relatedSlugs: ["central-gas-supply-filter", "w-type-laboratory-gas-filter"]
  }
];
