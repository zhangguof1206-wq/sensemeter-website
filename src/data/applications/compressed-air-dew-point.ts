import type { ApplicationPageRecord } from "@/data/applications/types";

const heroImage = "/assets/application-gas-processing.png";
const scenarioImage = "/assets/application-compressed-air-user.png";

export const compressedAirDewPoint: ApplicationPageRecord = {
  slug: "compressed-air-dew-point",
  path: "/applications/compressed-air-dew-point",
  heroImage,
  scenarioImage,
  ctaImage: scenarioImage,
  recommendedSlugs: ["easidew-34-m12", "easidew-online", "sf82-online", "dmt143-dmt143l", "mdm300"],
  content: {
    ru: {
      metaTitle: "Измеритель точки росы сжатого воздуха",
      metaDescription: "Измерители и датчики точки росы для сжатого воздуха, осушителей, пневмолиний и систем контроля качества газа. Подбор решения и запрос цены.",
      heroEyebrow: "Контроль влажности в технологических газах",
      title: "Контроль точки росы сжатого воздуха",
      lead: "Датчики, измерители и онлайн-анализаторы точки росы для осушителей, пневмолиний, сухих газов и систем контроля качества сжатого воздуха.",
      primaryButton: "Запросить предложение",
      secondaryButton: "Смотреть приборы",
      breadcrumbs: { home: "Главная", applications: "Применения" },
      heroFacts: [
        { title: "Постоянный контроль", text: "После осушителя и в линии" },
        { title: "Сервисная проверка", text: "Переносные анализаторы" }
      ],
      overviewTitle: "Зачем контролировать точку росы",
      overviewText: "В системах сжатого воздуха влажность может приводить к конденсату, коррозии, отказам клапанов и нестабильной работе оборудования. Контроль точки росы помогает оценить эффективность осушителя и поддерживать требуемую сухость воздуха в линии.",
      scenariosTitle: "Где выполняют измерение",
      scenariosLead: "Конфигурация прибора зависит от давления, ожидаемого диапазона, способа монтажа и требований к сигнализации.",
      scenarios: [
        { title: "Выход осушителя", text: "Непрерывное подтверждение качества осушки и раннее обнаружение отклонений.", image: heroImage, imageAlt: "Контроль точки росы на выходе осушителя" },
        { title: "Распределительная линия", text: "Измерение сухости воздуха при фактическом рабочем давлении.", image: scenarioImage, imageAlt: "Измерение точки росы в распределительной линии" },
        { title: "Критический потребитель", text: "Контроль перед технологическим и пневматическим оборудованием.", image: heroImage, imageAlt: "Контроль качества сжатого воздуха перед оборудованием" },
        { title: "Сервисная проверка", text: "Периодический аудит нескольких точек переносным анализатором.", image: scenarioImage, imageAlt: "Сервисная проверка сжатого воздуха" },
        { title: "Контроль качества", text: "Документирование параметров для ответственных производственных процессов.", image: heroImage, imageAlt: "Контроль качества сухого сжатого воздуха" }
      ],
      selectionTitle: "Как выбрать прибор точки росы",
      selectionLead: "Для корректного подбора достаточно четырех групп исходных данных.",
      selectionCards: [
        { title: "Среда и давление", text: "Укажите сжатый воздух, азот или другой газ, а также рабочее давление линии." },
        { title: "Диапазон точки росы", text: "Определите ожидаемый минимум и максимум для воздуха после осушителя." },
        { title: "Монтаж и пробоотбор", text: "Выберите прямую установку, байпасную линию, фильтрацию и защиту сенсора." },
        { title: "Выход и контроль", text: "Укажите дисплей, реле, 4-20 mA, цифровой интерфейс или архивирование данных." }
      ],
      rfqTitle: "Что указать в запросе",
      rfqPoints: ["тип газа или сжатого воздуха", "рабочее давление", "диапазон точки росы", "требуемую точность", "место установки: линия, байпас или осушитель", "выходной сигнал и питание", "наличие дисплея или сигнализации", "количество и требования к документации"],
      productsEyebrow: "Рекомендуемые приборы",
      productsTitle: "Приборы для контроля точки росы",
      productsLead: "Эти модели подходят для осушителей, пневмолиний, сухих газов и сервисных проверок.",
      productLinkLabel: "Подробнее",
      faqsTitle: "Частые вопросы",
      faqs: [
        { question: "Зачем измерять точку росы в сжатом воздухе?", answer: "Точка росы показывает, насколько сухой воздух поступает в систему. Контроль помогает защитить пневмооборудование, осушители, клапаны, трубопроводы и технологические процессы от влаги и конденсата." },
        { question: "Где лучше устанавливать датчик точки росы?", answer: "Часто датчик устанавливают после осушителя, в байпасной пробоотборной линии или в контрольной точке распределительной сети. Важно обеспечить стабильный поток, фильтрацию и подходящее давление." },
        { question: "Чем отличается онлайн-гигрометр от портативного анализатора?", answer: "Онлайн-гигрометр подходит для постоянного мониторинга и сигнализации, а портативный анализатор удобен для проверки нескольких точек, сервиса и периодического контроля." },
        { question: "Какие данные нужны для подбора модели?", answer: "Нужно указать газ, давление, ожидаемый диапазон точки росы, способ установки, требования к выходному сигналу, наличие дисплея или сигнализации и условия эксплуатации." }
      ],
      advisorTitle: "Подобрать прибор по параметрам",
      advisorText: "Укажите газ, давление, диапазон точки росы и способ установки. Мы поможем сопоставить параметры с подходящими моделями.",
      advisorButton: "Отправить параметры",
      finalCtaTitle: "Нужна помощь с выбором измерительного решения?",
      finalCtaText: "Сопоставим условия процесса с подходящими моделями и подготовим предложение.",
      finalCtaButton: "Запросить подбор"
    },
    en: {
      metaTitle: "Compressed air dew point testing and monitoring",
      metaDescription: "Dew point meters and transmitters for compressed air dew point testing, dryer monitoring, process air and dry gas systems.",
      heroEyebrow: "Compressed air dew point",
      title: "Compressed air dew point testing and monitoring",
      lead: "Dew point meters, transmitters and hygrometers for dryer checks, pneumatic lines, OEM skids and dry process gases.",
      primaryButton: "Request a selection",
      secondaryButton: "View instruments",
      breadcrumbs: { home: "Home", applications: "Applications" },
      heroFacts: [
        { title: "Continuous monitoring", text: "After the dryer and in the line" },
        { title: "Service checks", text: "Portable dew point analyzers" }
      ],
      overviewTitle: "Why compressed air dew point matters",
      overviewText: "Compressed air dew point monitoring shows whether a dryer and distribution line are keeping moisture under control. Reliable measurements help protect pneumatic equipment, instruments and quality-critical production processes.",
      scenariosTitle: "Where dew point is measured",
      scenariosLead: "Instrument configuration depends on pressure, expected dryness, installation method and alarm requirements.",
      scenarios: [
        { title: "Dryer outlet", text: "Continuous confirmation of dryer performance and early detection of moisture excursions.", image: heroImage, imageAlt: "Dew point monitoring at a compressed air dryer outlet" },
        { title: "Distribution line", text: "Measure air dryness under the actual operating pressure.", image: scenarioImage, imageAlt: "Compressed air distribution line dew point measurement" },
        { title: "Critical user point", text: "Verify air quality before pneumatic or process equipment.", image: heroImage, imageAlt: "Compressed air quality monitoring before process equipment" },
        { title: "Service inspection", text: "Audit several test points with a portable analyzer.", image: scenarioImage, imageAlt: "Portable compressed air dew point service check" },
        { title: "Quality documentation", text: "Record moisture conditions for responsible production processes.", image: heroImage, imageAlt: "Compressed air quality documentation point" }
      ],
      selectionTitle: "How to choose a dew point instrument",
      selectionLead: "Four groups of operating data define the suitable measuring solution.",
      selectionCards: [
        { title: "Gas and pressure", text: "Specify compressed air, nitrogen or another gas and the working line pressure." },
        { title: "Dew point range", text: "Define the expected minimum, maximum and alarm threshold." },
        { title: "Installation and sampling", text: "Choose direct mount, sample cell, bypass or portable kit." },
        { title: "Output and control", text: "Specify display, relay, analog output or digital communication." }
      ],
      rfqTitle: "What to specify in your request",
      rfqPoints: ["Gas type", "Working pressure", "Expected dew point range", "Required accuracy", "Installation point", "Output signal and power", "Display or alarm needs", "Quantity and documentation needs"],
      productsEyebrow: "Recommended instruments",
      productsTitle: "Recommended instruments for compressed air dew point testing",
      productsLead: "These models support dryer monitoring, pneumatic lines, dry gases and service checks.",
      productLinkLabel: "Learn more",
      faqsTitle: "Frequently asked questions",
      faqs: [
        { question: "How do I test dew point in compressed air?", answer: "Use an online transmitter for permanent monitoring or a portable dew point analyzer for service checks. The right method depends on line pressure, expected dryness, sample point and whether alarms or data logging are required." },
        { question: "Why measure dew point in compressed air?", answer: "Dew point shows the amount of moisture in compressed air. Monitoring helps prevent corrosion, icing, product contamination and dryer failure." },
        { question: "Where should the sensor be installed?", answer: "Common locations include the dryer outlet, critical branch lines, process air supply points and quality-control test points." },
        { question: "What data is needed for model selection?", answer: "Specify gas, pressure, expected dew point range, installation method, output requirements, display or alarm needs and operating conditions." }
      ],
      advisorTitle: "Select an instrument by parameters",
      advisorText: "Send gas, pressure, dew point range and installation details. We will match the parameters with suitable models.",
      advisorButton: "Send parameters",
      finalCtaTitle: "Need help choosing a measurement solution?",
      finalCtaText: "We will compare your process conditions with suitable models and prepare a quotation.",
      finalCtaButton: "Request a selection"
    }
  }
};
