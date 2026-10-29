import type { ApplicationPageRecord } from "@/data/applications/types";

export const compressedAirDewPoint: ApplicationPageRecord = {
  slug: "compressed-air-dew-point",
  path: "/applications/compressed-air-dew-point",
  heroImage: "/assets/applications/compressed-air-dew-point/hero.webp",
  scenarioImages: [
    "/assets/applications/compressed-air-dew-point/process-installation.webp",
    "/assets/applications/compressed-air-dew-point/field-verification.webp"
  ],
  recommendedSlugs: ["easidew-34-m12", "easidew-online", "sf82-online", "dmt143-dmt143l", "mdm300"],
  content: {
    ru: {
      metaTitle: "Промышленный измеритель и преобразователь точки росы",
      metaDescription: "Промышленные измерители и преобразователи точки росы для сжатого воздуха, осушителей и сухих газов. Подбор и международная поставка из Китая.",
      heroEyebrow: "Контроль влажности в технологических газах",
      title: "Промышленные измерители точки росы для сжатого воздуха",
      lead: "Датчик точки росы для сжатого воздуха контролирует сухость воздуха после осушителя и в пневмолинии. Для непрерывного контроля применяют преобразователи, для проверки нескольких точек подходят переносные гигрометры.",
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
      photoScenarios: [
        { title: "Установка в линии", text: "Стационарный датчик контролирует точку росы в байпасе после осушителя.", imageAlt: "Датчик точки росы на выходе осушителя сжатого воздуха" },
        { title: "Сервисная проверка", text: "Периодический аудит нескольких точек переносным анализатором.", imageAlt: "Портативная проверка точки росы сжатого воздуха" }
      ],
      technicalScenarios: [
        { title: "Выход осушителя", text: "Непрерывное подтверждение качества осушки и раннее обнаружение отклонений.", criterion: "Минимальная точка росы, давление и время отклика" },
        { title: "Критический потребитель", text: "Контроль перед технологическим и пневматическим оборудованием.", criterion: "Точка монтажа, соединение и допустимый расход" },
        { title: "Контроль качества", text: "Документирование параметров для ответственных производственных процессов.", criterion: "Выходной сигнал, журналирование и калибровка" }
      ],
      criterionLabel: "Критерии подбора",
      selectionTitle: "Как выбрать датчик точки росы для осушителя",
      selectionLead: "Для корректного подбора достаточно четырех групп исходных данных.",
      selectionCards: [
        { title: "Среда и давление", text: "Укажите газ, рабочее давление линии и давление у сенсора. Отметьте, является ли указанное давление избыточным или абсолютным." },
        { title: "Диапазон точки росы", text: "Определите ожидаемый минимум и максимум для воздуха после осушителя." },
        { title: "Монтаж и пробоотбор", text: "Опишите прямую установку или байпас, наличие пробоотборной камеры и возможные загрязнения. Давление и расход пробы должны соответствовать руководству выбранного прибора." },
        { title: "Выход и контроль", text: "Укажите дисплей, реле, 4-20 mA, цифровой интерфейс или архивирование данных." }
      ],
      rfqTitle: "Что указать в запросе",
      rfqPoints: ["тип газа или сжатого воздуха", "рабочее давление линии и давление у сенсора (избыточное или абсолютное)", "диапазон точки росы и давление, к которому относится требуемое значение", "требуемую точность", "место установки: линия, байпас или осушитель", "выходной сигнал и питание", "наличие дисплея или сигнализации", "количество и требования к документации"],
      productsEyebrow: "Рекомендуемые приборы",
      productsTitle: "Измерители и преобразователи точки росы",
      productsLead: "Эти модели подходят для осушителей, пневмолиний, сухих газов и сервисных проверок.",
      productLinkLabel: "Подробнее",
      faqsTitle: "Частые вопросы",
      faqs: [
        { question: "Зачем измерять точку росы в сжатом воздухе?", answer: "Точка росы показывает, насколько сухой воздух поступает в систему. Контроль помогает защитить пневмооборудование, осушители, клапаны, трубопроводы и технологические процессы от влаги и конденсата." },
        { question: "Где устанавливают датчик точки росы в компрессорной?", answer: "При контроле сжатого воздуха датчик устанавливают в линии после осушителя или перед критическим потребителем. Измеряют точку росы сжатого воздуха, а не влажность воздуха помещения. Монтаж, давление у сенсора и расход пробы выбирают по руководству конкретной модели." },
        { question: "Чем отличается онлайн-гигрометр от портативного анализатора?", answer: "Онлайн-гигрометр подходит для постоянного мониторинга и сигнализации, а портативный анализатор удобен для проверки нескольких точек, сервиса и периодического контроля." },
        { question: "Какие данные нужны для подбора модели?", answer: "Нужно указать газ, давление, ожидаемый диапазон точки росы, способ установки, требования к выходному сигналу, наличие дисплея или сигнализации и условия эксплуатации." },
        { question: "Чем отличается точка росы под давлением от точки росы при атмосферном давлении?", answer: "Точка росы зависит от давления газа. Показание после снижения давления до атмосферного нельзя напрямую сравнивать с точкой росы в рабочей линии. При сравнении измерений укажите давление у сенсора и используйте одну и ту же базу давления; пересчет выполняйте по методике производителя прибора." },
        { question: "Как подготовить пробу и проверить стабильность показаний?", answer: "Измеряйте в представительной точке после осушителя или у потребителя. Проверьте герметичность пробоотборной линии, совместимость материалов и отсутствие загрязнений, способных повлиять на сенсор. Поддерживайте предусмотренные руководством прибора давление и расход, дождитесь стабилизации показаний и запишите условия измерения. Расход и время стабилизации зависят от модели и условий; одного значения для всех приборов нет." }
      ],
      advisorTitle: "Подобрать прибор по параметрам",
      advisorText: "Укажите газ, давление, диапазон точки росы и способ установки. Мы поможем сопоставить параметры с подходящими моделями.",
      advisorButton: "Отправить параметры",
      finalCtaTitle: "Нужен прибор для контроля точки росы?",
      finalCtaText: "Сопоставим газ, давление, диапазон и способ установки с подходящими моделями. Условия международной поставки из Китая, доставки и таможенного оформления согласуем в коммерческом предложении с учетом страны назначения.",
      finalCtaButton: "Запросить подбор"
    },
    en: {
      metaTitle: "Compressed air dew point meters for testing",
      metaDescription: "Compare portable and online dew point meters for compressed air dryer testing, continuous monitoring and service checks. Select by pressure, range and output.",
      heroEyebrow: "Portable and online dew point measurement",
      title: "Compressed air dew point meters for testing and monitoring",
      lead: "Compare portable dew point meters for service checks with online dew point transmitters for continuous dryer and pneumatic-line monitoring.",
      primaryButton: "Request a selection",
      secondaryButton: "View instruments",
      breadcrumbs: { home: "Home", applications: "Applications" },
      heroFacts: [
        { title: "Portable dew point testing", text: "Multiple test points and service checks" },
        { title: "Online dryer monitoring", text: "Continuous measurement after the dryer" }
      ],
      overviewTitle: "How to test compressed air dew point",
      overviewText: "Start with a representative point after the dryer or at a critical user. Select a meter for the expected dry range and confirm the pressure allowed at its sensor. Compare the stabilized reading with the dryer or process requirement on the same pressure basis, recording the measurement point and sample conditions.",
      scenariosTitle: "Portable testing and online monitoring points",
      scenariosLead: "Choose the measurement point and instrument format according to pressure, expected dryness, sampling method and alarm requirements.",
      photoScenarios: [
        { title: "Online dew point transmitter", text: "Monitor a fixed point in a bypass downstream of the compressed air dryer.", imageAlt: "Dew point transmitter installed at a compressed air dryer outlet" },
        { title: "Portable dew point meter", text: "Check multiple dryer outlets and distribution points during service inspections.", imageAlt: "Portable compressed air dew point service inspection" }
      ],
      technicalScenarios: [
        { title: "Dryer outlet testing", text: "Confirm dryer performance and detect moisture excursions after the dryer.", criterion: "Minimum dew point, pressure and response time" },
        { title: "Critical user point", text: "Verify air quality before pneumatic or process equipment.", criterion: "Installation point, process connection and sample flow" },
        { title: "Quality records", text: "Document moisture conditions for quality-critical production processes.", criterion: "Output signal, logging and calibration" }
      ],
      criterionLabel: "Selection focus",
      selectionTitle: "Choose a portable or online dew point meter",
      selectionLead: "Start with the operating task, then confirm pressure, sampling and control requirements.",
      selectionCards: [
        { title: "Portable dew point meter", text: "Use a portable analyzer for dryer testing, commissioning and checks across multiple test points." },
        { title: "Online dew point transmitter", text: "Use a fixed transmitter for continuous monitoring, alarms and connection to a control system." },
        { title: "Pressure and sampling", text: "Confirm line pressure and choose direct mount, sample cell, bypass or a portable sampling kit." },
        { title: "Output, alarms and logging", text: "Specify local display, relay, analog output, digital communication or data logging." }
      ],
      rfqTitle: "What to specify in your request",
      rfqPoints: ["Gas type", "Working pressure", "Expected dew point range", "Required accuracy", "Installation point", "Output signal and power", "Display or alarm needs", "Quantity and documentation needs"],
      productsEyebrow: "Recommended instruments",
      productsTitle: "Portable and online dew point meters for compressed air",
      productsLead: "Compare instruments for portable dryer testing, permanent monitoring, pneumatic lines and dry process gases.",
      productLinkLabel: "Learn more",
      faqsTitle: "Frequently asked questions",
      faqs: [
        { question: "How do I test dew point in compressed air?", answer: "Confirm the target dew point and pressure basis, then connect a suitable meter at the selected point using its approved sampling arrangement. Check for leaks and purge the sample line as the instrument manual specifies. After pressure, flow and readings stabilize, record the dew point, pressure at the sensor, measurement point and time before comparing with the process requirement." },
        { question: "When should I use a portable dew point meter?", answer: "A portable meter is suitable for service checks, commissioning and comparing several dryer outlets or distribution points without installing a permanent instrument at each location." },
        { question: "When should I use an online dew point transmitter?", answer: "An online transmitter is suitable for continuous monitoring, alarm thresholds and connection to a control or data-logging system at a fixed measurement point." },
        { question: "What data is needed for model selection?", answer: "Specify gas, pressure, expected dew point range, installation method, output requirements, display or alarm needs and operating conditions." },
        { question: "What is the difference between pressure dew point and atmospheric dew point?", answer: "Dew point changes with gas pressure. A reading taken after releasing a sample to atmospheric pressure is not directly comparable with a reading at line pressure. Record the pressure at the sensor and use the same pressure basis for comparison; any conversion must follow the instrument manufacturer's method." },
        { question: "How do I obtain a stable compressed air dew point reading?", answer: "Use a clean, leak-tight sample path and avoid condensation or dead-end sampling. Purge the line and keep pressure and sample flow stable as specified in the model's manual. Wait for the reading to settle before recording it; there is no single flow rate or waiting time suitable for every instrument and installation." },
        { question: "Does a portable dew point meter include the sampling setup?", answer: "A portable meter and its sampling accessories should be specified together. Confirm the process connection, pressure at the sensor, sample-flow control and protection from liquids or particles against the selected instrument's manual. For an MDM300-series quotation, identify the required sampling arrangement; a regulator, filter, pressure gauge, tubing or case should not be assumed to be included unless it is listed in the quotation." }
      ],
      advisorTitle: "Select an instrument by parameters",
      advisorText: "Send gas, pressure, dew point range and installation details. We will match the parameters with suitable models.",
      advisorButton: "Send parameters",
      finalCtaTitle: "Need a compressed air dew point meter?",
      finalCtaText: "Send the pressure, expected dew point range, measurement point and portable or online requirement. We will match suitable models and quote international supply from China, with delivery and customs-clearance responsibilities agreed for the destination country.",
      finalCtaButton: "Request a selection"
    }
  }
};
