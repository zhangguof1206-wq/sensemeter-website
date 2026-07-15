import type { AccessoryProduct } from "./types";

export const gasDiffuserProducts: AccessoryProduct[] = [
  {
    slug: "stainless-gas-diffuser-head",
    categorySlug: "gas-diffusers",
    model: "SM-GD-HEAD",
    title: { ru: "Резьбовая газовая диффузионная головка", en: "Threaded Gas Diffuser Head" },
    summary: { ru: "Пористая головка для равномерной подачи технологического газа, кислорода, азота или воздуха в линию или емкость.", en: "Porous diffuser head for uniform delivery of process gas, oxygen, nitrogen or air into a line or vessel." },
    image: "/assets/accessories/flow-damping-fitting.webp",
    selection: { ru: ["Газ или жидкость", "Резьба и посадка", "Расход и давление"], en: ["Gas or liquid", "Thread and fit", "Flow and pressure"] },
    compatibleWith: { ru: ["Газовые линии", "Лабораторные стенды", "Системы подготовки пробы"], en: ["Gas lines", "Laboratory rigs", "Sample-conditioning systems"] },
    customization: { ru: "Резьба, длина, активная пористая зона и материал согласуются по месту установки.", en: "Thread, length, active porous area and material are confirmed for the installation." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или 316", en: "316L or 316" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "0,1-120 мкм по задаче", en: "0.1-120 um by requirement" } },
      { label: { ru: "Подключение", en: "Connection" }, value: { ru: "Резьба или фитинг", en: "Thread or fitting" } }
    ],
    applications: { ru: ["Подача газа", "Распределение потока", "Стабилизация линии"], en: ["Gas delivery", "Flow distribution", "Line stabilization"] },
    relatedSlugs: ["aeration-stone-diffuser", "threaded-diffuser-nozzle"]
  },
  {
    slug: "aeration-stone-diffuser",
    categorySlug: "gas-diffusers",
    model: "SM-GD-AIR",
    title: { ru: "Пористый аэрационный элемент", en: "Porous Aeration Element" },
    summary: { ru: "Сменный пористый элемент для создания мелких пузырьков, увеличения площади контакта газа и жидкости и стабильной аэрации.", en: "Replaceable porous element for fine bubbles, larger gas-liquid contact area and stable aeration." },
    image: "/assets/accessories/filter-316l-powder.webp",
    selection: { ru: ["Размер пузырьков", "Расход газа", "Материал и чистота"], en: ["Bubble size", "Gas flow", "Material and cleanliness"] },
    compatibleWith: { ru: ["Аэрационные узлы", "Лабораторные емкости", "Технологические линии"], en: ["Aeration assemblies", "Laboratory vessels", "Process lines"] },
    customization: { ru: "Размер пор, форма, длина и способ крепления подбираются по требуемому распределению газа.", en: "Pore size, form, length and mounting are selected for the required gas distribution." },
    specs: [
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L нержавеющая сталь", en: "316L stainless steel" } },
      { label: { ru: "Функция", en: "Function" }, value: { ru: "Аэрация и диспергирование газа", en: "Aeration and gas dispersion" } },
      { label: { ru: "Очистка", en: "Cleaning" }, value: { ru: "Промывка или замена", en: "Wash or replacement" } }
    ],
    applications: { ru: ["Газ в жидкость", "Равномерное распределение", "Пробные установки"], en: ["Gas into liquid", "Uniform distribution", "Pilot rigs"] },
    relatedSlugs: ["stainless-gas-diffuser-head", "gas-sparger-tube"]
  },
  {
    slug: "gas-sparger-tube",
    categorySlug: "gas-diffusers",
    model: "SM-GD-TUBE",
    title: { ru: "Пористая трубка-барботер", en: "Porous Gas Sparger Tube" },
    summary: { ru: "Трубчатый диффузор для распределения газа по длине и работы в емкостях, камерах или технологических каналах.", en: "Tubular diffuser for distributing gas along its length in vessels, chambers or process channels." },
    image: "/assets/accessories/filter-custom-microporous.webp",
    selection: { ru: ["Длина и диаметр", "Направление потока", "Рабочее давление"], en: ["Length and diameter", "Flow direction", "Operating pressure"] },
    compatibleWith: { ru: ["Емкости", "Камеры", "Газораспределительные узлы"], en: ["Vessels", "Chambers", "Gas-distribution assemblies"] },
    customization: { ru: "Длина, закрытый или открытый торец, резьба и пористая зона могут быть выполнены по чертежу.", en: "Length, open or closed end, thread and porous zone can be made to drawing." },
    specs: [
      { label: { ru: "Форма", en: "Form" }, value: { ru: "Трубчатая", en: "Tubular" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L или специальный сплав", en: "316L or special alloy" } },
      { label: { ru: "Пористая зона", en: "Porous zone" }, value: { ru: "По длине или локально", en: "Full length or local" } }
    ],
    applications: { ru: ["Барботаж", "Распределение газа", "Технологические емкости"], en: ["Sparging", "Gas distribution", "Process vessels"] },
    relatedSlugs: ["aeration-stone-diffuser", "laboratory-gas-dispersion-tip"]
  },
  {
    slug: "threaded-diffuser-nozzle",
    categorySlug: "gas-diffusers",
    model: "SM-GD-THD",
    title: { ru: "Резьбовая диффузионная форсунка", en: "Threaded Diffuser Nozzle" },
    summary: { ru: "Компактная резьбовая форсунка с пористым участком для дозированной подачи газа или защиты выходного канала.", en: "Compact threaded nozzle with porous section for metered gas delivery or outlet protection." },
    image: "/assets/accessories/flow-threaded-analytical.webp",
    selection: { ru: ["Тип резьбы", "Целевой расход", "Среда и давление"], en: ["Thread type", "Target flow", "Medium and pressure"] },
    compatibleWith: { ru: ["Фитинги", "Газовые панели", "OEM-узлы"], en: ["Fittings", "Gas panels", "OEM assemblies"] },
    customization: { ru: "Корпус, резьба, проходное сечение и пористая вставка могут быть согласованы под приборный узел.", en: "Body, thread, passage and porous insert can be specified for the instrument assembly." },
    specs: [
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Наружная или внутренняя резьба", en: "Male or female thread" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "316L", en: "316L" } },
      { label: { ru: "Назначение", en: "Use" }, value: { ru: "Подача, рассеивание или защита", en: "Delivery, diffusion or protection" } }
    ],
    applications: { ru: ["Газовые фитинги", "Панели анализаторов", "Компактные узлы"], en: ["Gas fittings", "Analyzer panels", "Compact assemblies"] },
    relatedSlugs: ["stainless-gas-diffuser-head", "porous-exhaust-silencer"]
  },
  {
    slug: "porous-exhaust-silencer",
    categorySlug: "gas-diffusers",
    model: "SM-GD-MUF",
    title: { ru: "Пористый выпускной глушитель", en: "Porous Exhaust Silencer" },
    summary: { ru: "Пористый выпускной элемент для снижения шума, сглаживания выброса воздуха или газа и защиты от частиц.", en: "Porous exhaust element for reducing noise, smoothing air or gas release and protecting from particles." },
    image: "/assets/accessories/flow-fitting-limiter.webp",
    selection: { ru: ["Расход сброса", "Шумоподавление", "Тип соединения"], en: ["Exhaust flow", "Noise reduction", "Connection type"] },
    compatibleWith: { ru: ["Пневматика", "Газовые шкафы", "Сбросные линии"], en: ["Pneumatics", "Gas cabinets", "Vent lines"] },
    customization: { ru: "Пористость, корпус и резьба подбираются по расходу, давлению и допустимому уровню шума.", en: "Porosity, body and thread are selected by flow, pressure and allowed noise level." },
    specs: [
      { label: { ru: "Функция", en: "Function" }, value: { ru: "Рассеивание и шумоподавление", en: "Diffusion and noise reduction" } },
      { label: { ru: "Материал", en: "Material" }, value: { ru: "Пористая нержавеющая сталь", en: "Porous stainless steel" } },
      { label: { ru: "Сервис", en: "Service" }, value: { ru: "Очистка или замена", en: "Clean or replace" } }
    ],
    applications: { ru: ["Пневматические линии", "Сброс газа", "Лабораторные стенды"], en: ["Pneumatic lines", "Gas venting", "Laboratory rigs"] },
    relatedSlugs: ["threaded-diffuser-nozzle", "laboratory-gas-dispersion-tip"]
  },
  {
    slug: "laboratory-gas-dispersion-tip",
    categorySlug: "gas-diffusers",
    model: "SM-GD-LAB",
    title: { ru: "Лабораторный наконечник для диспергирования газа", en: "Laboratory Gas Dispersion Tip" },
    summary: { ru: "Небольшой пористый наконечник для лабораторной подачи газа, испытаний и подбора параметров перед проектной закупкой.", en: "Small porous tip for laboratory gas delivery, testing and parameter confirmation before project procurement." },
    image: "/assets/accessories/filter-face-seal-disc.webp",
    selection: { ru: ["Объем системы", "Газ и расход", "Способ подключения"], en: ["System volume", "Gas and flow", "Connection method"] },
    compatibleWith: { ru: ["Лабораторные приборы", "Испытательные стенды", "Пилотные установки"], en: ["Laboratory instruments", "Test rigs", "Pilot systems"] },
    customization: { ru: "Размер, материал и активная пористая зона могут быть выполнены под небольшую установку или испытательный стенд.", en: "Size, material and active porous zone can be made for a small installation or test rig." },
    specs: [
      { label: { ru: "Размер", en: "Size" }, value: { ru: "Компактное исполнение", en: "Compact construction" } },
      { label: { ru: "Пористость", en: "Porosity" }, value: { ru: "По задаче", en: "By requirement" } },
      { label: { ru: "Монтаж", en: "Mounting" }, value: { ru: "Трубка, резьба или держатель", en: "Tube, thread or holder" } }
    ],
    applications: { ru: ["Лабораторные испытания", "Подбор расхода", "Пилотные проекты"], en: ["Laboratory testing", "Flow selection", "Pilot projects"] },
    relatedSlugs: ["gas-sparger-tube", "aeration-stone-diffuser"]
  }
];
