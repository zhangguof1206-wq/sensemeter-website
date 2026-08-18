import type { ApplicationPageRecord } from "@/data/applications/types";

export const gloveBoxOxygenAnalysis: ApplicationPageRecord = {
  slug: "glove-box-oxygen-analysis",
  path: "/applications/glove-box-oxygen-analysis",
  heroImage: "/assets/applications/glove-box-oxygen-analysis/hero.webp",
  scenarioImages: [
    "/assets/applications/glove-box-oxygen-analysis/process-installation.webp",
    "/assets/applications/glove-box-oxygen-analysis/field-verification.webp"
  ],
  recommendedSlugs: ["gpr-1500", "gpr-1900-2900", "gpr-1500gb-2500gb", "gpr-1600-2600-3100", "gpr-1000-1100-2000-3500"],
  content: {
    ru: {
      metaTitle: "Анализатор кислорода для перчаточных боксов",
      metaDescription: "Кислородные анализаторы для перчаточных боксов, инертных газов, генераторов, печей и производственных линий. Подбор GPR решений и запрос цены.",
      heroEyebrow: "Анализ кислорода",
      title: "Анализ кислорода для перчаточных боксов и газовых систем",
      lead: "Кислородные анализаторы для инертных атмосфер, перчаточных боксов, генераторов, печей, промышленных газов и производственных линий.",
      primaryButton: "Запросить предложение",
      secondaryButton: "Смотреть анализаторы",
      breadcrumbs: { home: "Главная", applications: "Применения" },
      heroFacts: [{ title: "Следовые концентрации", text: "Контроль O2 на уровне ppm" }, { title: "Интеграция", text: "Дисплей, сигнал и тревоги" }],
      overviewTitle: "Зачем контролировать кислород",
      overviewText: "Контроль кислорода нужен там, где качество газа влияет на безопасность, стабильность процесса и защиту продукции. Для перчаточных боксов, инертных атмосфер и газовых линий важно заранее определить диапазон O2, условия пробоотбора и формат передачи сигнала.",
      scenariosTitle: "Где применяются анализаторы",
      scenariosLead: "Диапазон O2, газовый фон и пробоотбор определяют сенсор, исполнение и способ интеграции.",
      photoScenarios: [
        { title: "Линия инертного газа", text: "Пробоподготовка и контроль кислорода в азоте, аргоне и газовых линиях.", imageAlt: "Панель пробоподготовки кислородного анализатора у перчаточного бокса" },
        { title: "Промышленная печь", text: "Проверка O2 в защитной атмосфере технологического оборудования.", imageAlt: "Инженер проверяет кислородную линию промышленной печи" }
      ],
      technicalScenarios: [
        { title: "Перчаточный бокс", text: "Контроль остаточного кислорода в инертной атмосфере для защиты образцов и процессов.", criterion: "Диапазон O2, объем бокса и время восстановления" },
        { title: "Генератор газа", text: "Проверка чистоты газа и стабильности работы генераторной установки.", criterion: "Газовый фон, давление, расход и точка отбора" },
        { title: "Система сигнализации", text: "Передача показаний в локальную индикацию, реле или систему управления.", criterion: "Пороги тревог, выходы и способ интеграции" }
      ],
      criterionLabel: "Критерии подбора",
      selectionTitle: "Как выбрать анализатор O2",
      selectionLead: "Сначала определяют газовую среду и диапазон, затем проверяют пробоотбор и интерфейс.",
      selectionCards: [
        { title: "Газовая среда", text: "Укажите газ, фоновые компоненты, наличие влаги и возможные примеси." },
        { title: "Диапазон O2", text: "Определите ppm, проценты или следовые концентрации кислорода для контроля." },
        { title: "Пробоотбор", text: "Опишите точку отбора, расход, давление, фильтрацию и требования к линии пробы." },
        { title: "Интеграция", text: "Нужны ли дисплей, реле, 4-20 mA, цифровой интерфейс или журналирование." }
      ],
      rfqTitle: "Что указать в запросе",
      rfqPoints: ["измеряемый газ или газовую смесь", "ожидаемый диапазон O2", "требуемую точность", "точку установки или пробоотбор", "давление и расход пробы", "нужен ли дисплей или сигнализация", "выходной сигнал и питание", "количество и требования к документации"],
      productsEyebrow: "Рекомендуемые анализаторы",
      productsTitle: "Анализаторы кислорода",
      productsLead: "Модели для перчаточных боксов, инертных атмосфер, генераторов и промышленных газов.",
      productLinkLabel: "Подробнее",
      faqsTitle: "Частые вопросы",
      faqs: [
        { question: "Зачем контролировать кислород в перчаточном боксе?", answer: "Даже небольшое содержание кислорода может влиять на чувствительные материалы, химические реакции, сварочные процессы и хранение образцов. Анализатор помогает поддерживать стабильную инертную атмосферу." },
        { question: "Какой диапазон измерения O2 выбрать?", answer: "Диапазон зависит от процесса. Для контроля чистоты инертной атмосферы часто важны ppm или низкие значения кислорода, а для общих газовых процессов могут использоваться процентные диапазоны." },
        { question: "Нужен ли пробоотбор для кислородного анализатора?", answer: "Во многих промышленных задачах используется пробоотборная линия с контролем расхода и фильтрацией. Это помогает защитить сенсор и получить стабильные измерения." },
        { question: "Какие данные нужны для подбора модели?", answer: "Нужно указать газовую среду, диапазон O2, давление, расход пробы, точку установки, требования к сигналу, дисплею, сигнализации и документации." }
      ],
      advisorTitle: "Подобрать анализатор по параметрам",
      advisorText: "Укажите газовую среду, диапазон O2, давление, расход и требования к сигналу. Мы поможем выбрать подходящую модель.",
      advisorButton: "Отправить параметры",
      finalCtaTitle: "Нужен анализатор для вашей газовой системы?",
      finalCtaText: "Сопоставим газовый фон, диапазон O2 и пробоотбор с подходящими моделями.",
      finalCtaButton: "Запросить подбор"
    },
    en: {
      metaTitle: "Oxygen analyzer for glovebox applications",
      metaDescription: "Oxygen analyzers for glove box and glovebox applications, nitrogen generators, gas purity monitoring and low-ppm oxygen control.",
      heroEyebrow: "Oxygen analysis",
      title: "Glove box and glovebox oxygen analysis",
      lead: "Oxygen analyzers for glove boxes, inert gas systems, generators, furnaces and low-ppm industrial monitoring.",
      primaryButton: "Request analyzer selection",
      secondaryButton: "View analyzers",
      breadcrumbs: { home: "Home", applications: "Applications" },
      heroFacts: [{ title: "Trace oxygen", text: "Low-ppm O2 monitoring" }, { title: "Integration", text: "Display, outputs and alarms" }],
      overviewTitle: "Why oxygen control matters",
      overviewText: "An oxygen analyzer for glovebox applications helps confirm low O2 levels where gas quality affects safety, process stability and product protection. The right solution depends on range, gas background, sample condition and integration needs.",
      scenariosTitle: "Where analyzers are used",
      scenariosLead: "O2 range, gas background and sampling conditions define the sensor, construction and integration method.",
      photoScenarios: [
        { title: "Inert-gas sample line", text: "Condition the sample and monitor oxygen in nitrogen, argon and process-gas lines.", imageAlt: "Oxygen analyzer sample conditioning panel beside a glove box" },
        { title: "Industrial furnace", text: "Verify O2 in the protective atmosphere of process equipment.", imageAlt: "Engineer checking an oxygen sample line at an industrial furnace" }
      ],
      technicalScenarios: [
        { title: "Glove box", text: "Control residual oxygen in an inert atmosphere for sensitive materials and processes.", criterion: "O2 range, box volume and recovery time" },
        { title: "Gas generator", text: "Check gas purity and generator operating stability.", criterion: "Gas background, pressure, flow and sample point" },
        { title: "Alarm system", text: "Send readings to a local display, relay or process control system.", criterion: "Alarm thresholds, outputs and integration method" }
      ],
      criterionLabel: "Selection focus",
      selectionTitle: "How to choose an oxygen analyzer",
      selectionLead: "Define the gas and range first, then confirm sampling and interface requirements.",
      selectionCards: [
        { title: "Gas background", text: "Specify nitrogen, argon, process gas, moisture and possible contaminants." },
        { title: "O2 range", text: "Define ppm, percent or trace oxygen range and required sensitivity." },
        { title: "Sampling", text: "Confirm pressure, flow, filtration and sampling point." },
        { title: "Interface", text: "Choose local display, alarms, analog output or digital integration." }
      ],
      rfqTitle: "What to specify in your request",
      rfqPoints: ["Gas background", "O2 range", "Required accuracy", "Sampling point", "Pressure and sample flow", "Display or alarm", "Output signal and power", "Quantity and documentation needs"],
      productsEyebrow: "Recommended analyzers",
      productsTitle: "Oxygen analyzers",
      productsLead: "Models for glove boxes, inert atmospheres, gas generators and industrial gases.",
      productLinkLabel: "Learn more",
      faqsTitle: "Frequently asked questions",
      faqs: [
        { question: "Why control oxygen in a glove box?", answer: "Even small oxygen levels can affect sensitive materials, reactions, welding, battery research or inert-atmosphere processes." },
        { question: "What oxygen range should I choose?", answer: "For glove boxes and inert gas, low-ppm ranges are common. For process or generator checks, the required range depends on purity requirements." },
        { question: "Is sample conditioning required?", answer: "Many systems use a sampling line with flow control and filtration. This helps protect the sensor and improve measurement stability." },
        { question: "What data is needed for model selection?", answer: "Specify gas background, O2 range, pressure, sample flow, installation point, alarm needs and documentation requirements." }
      ],
      advisorTitle: "Select an analyzer by parameters",
      advisorText: "Share your gas background, O2 range, pressure and sampling conditions. We will help select the right analyzer.",
      advisorButton: "Send parameters",
      finalCtaTitle: "Need an analyzer for your gas system?",
      finalCtaText: "We will match the gas background, O2 range and sampling conditions with suitable models.",
      finalCtaButton: "Request a selection"
    }
  }
};
