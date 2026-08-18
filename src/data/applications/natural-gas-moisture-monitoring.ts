import type { ApplicationPageRecord } from "@/data/applications/types";

const heroImage = "/assets/application-gas-processing.png";
const scenarioImage = "/assets/application-natural-gas-inline.png";

export const naturalGasMoistureMonitoring: ApplicationPageRecord = {
  slug: "natural-gas-moisture-monitoring",
  path: "/applications/natural-gas-moisture-monitoring",
  heroImage,
  scenarioImage,
  ctaImage: "/assets/application-natural-gas-cta.png",
  recommendedSlugs: ["easidew-pro-is", "easidew-pro-xp", "optidew-hz", "mdm300", "easidew-online"],
  content: {
    ru: {
      metaTitle: "Измерение точки росы и влажности газа",
      metaDescription: "Датчики и анализаторы точки росы для природного газа, технологических газов, трубопроводов и газоподготовки. Подбор решения и запрос цены.",
      heroEyebrow: "Контроль влажности газа",
      title: "Измерение точки росы и влажности газа",
      lead: "Датчики, анализаторы и измерители точки росы для природного газа, технологических газов, трубопроводов, газоподготовки и промышленных процессов.",
      primaryButton: "Запросить предложение",
      secondaryButton: "Смотреть приборы",
      breadcrumbs: { home: "Главная", applications: "Применения" },
      heroFacts: [{ title: "Онлайн-контроль", text: "Трубопроводы и газоподготовка" }, { title: "Опасные зоны", text: "Подбор по условиям участка" }],
      overviewTitle: "Зачем контролировать влажность газа",
      overviewText: "Влага в природном и технологическом газе может вызывать конденсацию, коррозию, образование гидратов и проблемы с качеством продукта. Подбор прибора зависит от состава газа, давления, точки установки, требований к безопасности и точности.",
      scenariosTitle: "Где выполняют измерение",
      scenariosLead: "Состав газа, давление и безопасность определяют способ установки и подготовки пробы.",
      scenarios: [
        { title: "Газоподготовка", text: "Контроль влаги после осушки и технологической обработки газа.", image: heroImage, imageAlt: "Контроль влажности на установке газоподготовки" },
        { title: "Магистральная линия", text: "Измерение точки росы в трубопроводах природного и технологического газа.", image: scenarioImage, imageAlt: "Измерение точки росы в газопроводе" },
        { title: "Пробоотборная система", text: "Фильтрация, регулирование расхода и стабильная подача газа к анализатору.", image: "/assets/application-natural-gas-cta.png", imageAlt: "Пробоотборная система анализатора влажности газа" },
        { title: "Опасная зона", text: "Подбор исполнения с учетом классификации зоны, давления и сертификатов.", image: scenarioImage, imageAlt: "Анализатор влажности газа для опасной зоны" },
        { title: "Сервисная проверка", text: "Портативный контроль нескольких измерительных точек при обслуживании.", image: heroImage, imageAlt: "Сервисная проверка влажности газа" }
      ],
      selectionTitle: "Как выбрать прибор для газа",
      selectionLead: "Подбор начинается с состава газа и давления, затем уточняются диапазон, установка и безопасность.",
      selectionCards: [
        { title: "Газ и давление", text: "Укажите состав газа, давление линии, температуру и возможные примеси." },
        { title: "Диапазон точки росы", text: "Определите рабочий диапазон влаги: ppmV, точка росы или другие параметры." },
        { title: "Установка", text: "Выберите прямой монтаж, байпас, пробоотборную линию или систему подготовки газа." },
        { title: "Безопасность", text: "Проверьте требования к ATEX, IECEx, давлению, материалам и документации." }
      ],
      rfqTitle: "Что указать в запросе",
      rfqPoints: ["тип газа: природный газ, водород, азот или технологическая смесь", "рабочее давление и температуру", "ожидаемый диапазон точки росы", "требуемую точность и стабильность", "точку установки или пробоотборную систему", "требования к опасной зоне и сертификатам", "выходной сигнал и питание", "количество и требования к документации"],
      productsEyebrow: "Рекомендуемые приборы",
      productsTitle: "Приборы для контроля влажности газа",
      productsLead: "Решения для трубопроводов, газоподготовки, опасных зон и сервисных измерений.",
      productLinkLabel: "Подробнее",
      faqsTitle: "Частые вопросы",
      faqs: [
        { question: "Зачем измерять точку росы в природном газе?", answer: "Контроль точки росы помогает снизить риск конденсации, коррозии, образования гидратов и нестабильной работы оборудования. Это важно для трубопроводов, газоподготовки и технологических газовых систем." },
        { question: "Можно ли ставить датчик прямо в газовую линию?", answer: "Это зависит от давления, температуры, состава газа и требований безопасности. В ряде случаев используют прямой монтаж, но часто предпочтительна пробоотборная линия с фильтрацией и контролем расхода." },
        { question: "Какие приборы подходят для опасных зон?", answer: "Для взрывоопасных участков подбирают приборы с соответствующими сертификатами и конструкцией. Важно заранее указать классификацию зоны, давление, газ и условия установки." },
        { question: "Какие данные нужны для подбора модели?", answer: "Нужно указать тип газа, давление, температуру, диапазон точки росы, способ установки, требования к выходному сигналу, сертификатам и документации." }
      ],
      advisorTitle: "Подобрать прибор по параметрам",
      advisorText: "Укажите газ, давление, диапазон точки росы, место установки и требования к безопасности. Мы поможем выбрать подходящую модель.",
      advisorButton: "Отправить параметры",
      finalCtaTitle: "Нужно измерение влажности в газовой системе?",
      finalCtaText: "Сопоставим состав газа, давление, диапазон и условия участка с подходящими приборами.",
      finalCtaButton: "Запросить подбор"
    },
    en: {
      metaTitle: "Natural gas moisture monitoring",
      metaDescription: "Moisture and hydrocarbon dew point instruments for natural gas, process gas, pipelines, gas treatment and hazardous-area monitoring applications.",
      heroEyebrow: "Gas moisture monitoring",
      title: "Natural gas moisture and dew point monitoring",
      lead: "Moisture analyzers, dew point transmitters and sampling solutions for natural gas, process gas, pipelines and gas treatment systems.",
      primaryButton: "Request a selection",
      secondaryButton: "View instruments",
      breadcrumbs: { home: "Home", applications: "Applications" },
      heroFacts: [{ title: "Online monitoring", text: "Pipelines and gas treatment" }, { title: "Hazardous areas", text: "Selection for site conditions" }],
      overviewTitle: "Why gas moisture control matters",
      overviewText: "Moisture and dew point control helps reduce hydrate formation, corrosion, pipeline risk and process instability. Instrument selection depends on pressure, gas composition, hazardous-area requirements and sampling method.",
      scenariosTitle: "Where measurements are made",
      scenariosLead: "Gas composition, pressure and safety requirements define installation and sample conditioning.",
      scenarios: [
        { title: "Gas treatment", text: "Monitor moisture after gas drying and process treatment.", image: heroImage, imageAlt: "Moisture monitoring at a gas treatment system" },
        { title: "Pipeline", text: "Measure dew point in natural gas and process gas transmission lines.", image: scenarioImage, imageAlt: "Natural gas pipeline dew point measurement" },
        { title: "Sampling system", text: "Filter and control sample flow for stable analyzer operation.", image: "/assets/application-natural-gas-cta.png", imageAlt: "Natural gas moisture analyzer sampling system" },
        { title: "Hazardous area", text: "Select construction for zone classification, pressure and approval requirements.", image: scenarioImage, imageAlt: "Gas moisture analyzer for a hazardous area" },
        { title: "Service checks", text: "Use portable instruments to inspect several measurement points.", image: heroImage, imageAlt: "Portable gas moisture service check" }
      ],
      selectionTitle: "How to choose a gas instrument",
      selectionLead: "Start with gas composition and pressure, then confirm range, installation and safety requirements.",
      selectionCards: [
        { title: "Gas and pressure", text: "Specify gas composition, line pressure and operating temperature." },
        { title: "Measurement range", text: "Define water dew point, hydrocarbon dew point or moisture range." },
        { title: "Installation", text: "Choose direct mount, bypass, sample line or gas conditioning system." },
        { title: "Safety", text: "Confirm ATEX, IECEx, pressure, material and documentation requirements." }
      ],
      rfqTitle: "What to specify in your request",
      rfqPoints: ["Gas composition", "Pressure", "Temperature", "Dew point range", "Installation method", "Hazardous-area requirements", "Output signal", "Certificates and documentation"],
      productsEyebrow: "Recommended instruments",
      productsTitle: "Gas moisture instruments",
      productsLead: "Solutions for pipelines, gas treatment, hazardous areas and service measurements.",
      productLinkLabel: "Learn more",
      faqsTitle: "Frequently asked questions",
      faqs: [
        { question: "Why measure dew point in natural gas?", answer: "Dew point control helps reduce hydrate formation, condensation, corrosion and operational risk in pipelines and gas treatment systems." },
        { question: "Can the instrument be installed directly in the pipeline?", answer: "Some applications use direct installation, but sampling or conditioning systems are often preferred for stability, filtration and service access." },
        { question: "Which instruments are suitable for hazardous areas?", answer: "Hazardous-area applications require instruments with suitable approvals and construction. The zone classification, pressure, gas and installation conditions should be specified in advance." },
        { question: "What data is needed for model selection?", answer: "Specify gas type, pressure, temperature, dew point range, installation method, output signal, certificate needs and documentation requirements." }
      ],
      advisorTitle: "Select an instrument by parameters",
      advisorText: "Send gas type, pressure, dew point range, installation point and safety requirements. We will help select a suitable model.",
      advisorButton: "Send parameters",
      finalCtaTitle: "Need moisture measurement for a gas system?",
      finalCtaText: "We will match gas composition, pressure, range and site conditions with suitable instruments.",
      finalCtaButton: "Request a selection"
    }
  }
};
