import type { ApplicationPageRecord } from "@/data/applications/types";

export const industrialHumidityMonitoring: ApplicationPageRecord = {
  slug: "industrial-humidity-monitoring",
  path: "/applications/industrial-humidity-monitoring",
  heroImage: "/assets/applications/industrial-humidity-monitoring/hero.webp",
  scenarioImages: [
    "/assets/applications/industrial-humidity-monitoring/process-installation.webp",
    "/assets/applications/industrial-humidity-monitoring/field-verification.webp"
  ],
  recommendedSlugs: ["hc2a-series", "hc2a-industrial", "hygroflex1", "hmt310", "hmt370ex"],
  content: {
    ru: {
      metaTitle: "Промышленные датчики температуры и влажности",
      metaDescription: "Датчики и преобразователи температуры и влажности для промышленных процессов, камер, воздуховодов и технических систем. Подбор решения и запрос цены.",
      heroEyebrow: "Промышленный контроль влажности",
      title: "Промышленный контроль температуры и влажности",
      lead: "Датчики, зонды и преобразователи для производственных процессов, климатических камер, воздуховодов, чистых помещений и технических систем.",
      primaryButton: "Запросить предложение",
      secondaryButton: "Смотреть решения",
      breadcrumbs: { home: "Главная", applications: "Применения" },
      heroFacts: [
        { title: "Стационарный контроль", text: "Датчики и преобразователи" },
        { title: "Проверка на месте", text: "Портативные приборы" }
      ],
      overviewTitle: "Зачем контролировать влажность и температуру",
      overviewText: "Подбор датчика зависит от среды, диапазона измерения, способа монтажа и выходного сигнала. Для промышленных задач важны точность, стабильность, сервис, калибровка и совместимость с системой контроля.",
      scenariosTitle: "Где применяются датчики",
      scenariosLead: "Среда, точка установки и способ передачи сигнала определяют конструкцию зонда и передатчика.",
      photoScenarios: [
        { title: "Монтаж в воздуховоде", text: "Зондовое измерение в вентиляционных каналах и климатическом оборудовании.", imageAlt: "Промышленный датчик влажности установлен в воздуховоде" },
        { title: "Сервисный контроль", text: "Проверка нескольких точек переносным прибором при настройке и обслуживании.", imageAlt: "Портативная проверка влажности в техническом помещении" }
      ],
      technicalScenarios: [
        { title: "Производственная зона", text: "Стабильный мониторинг условий, влияющих на процесс и качество продукции.", criterion: "Диапазон влажности, температура и скорость воздуха" },
        { title: "Техническое помещение", text: "Передача температуры и влажности в PLC, SCADA или BMS.", criterion: "Место установки, выходной сигнал и питание" },
        { title: "Сложные условия", text: "Подбор исполнения с учетом пыли, конденсата, паров, давления или опасной зоны.", criterion: "Материал зонда, защита и допуски участка" }
      ],
      criterionLabel: "Критерии подбора",
      selectionTitle: "Как выбрать промышленный датчик",
      selectionLead: "Для подбора нужно связать точку измерения, монтаж, точность и интерфейс с условиями процесса.",
      selectionCards: [
        { title: "Среда измерения", text: "Воздух, технологический газ, камера, склад или вентиляционный канал." },
        { title: "Условия монтажа", text: "Настенный блок, зонд, канал, кабель, питание и удобство обслуживания." },
        { title: "Сигнал и точность", text: "Диапазон влажности, температура, требуемая точность и формат выхода." },
        { title: "Документация", text: "Калибровка, сертификаты, инструкции и требования к поставке." }
      ],
      rfqTitle: "Что указать в запросе",
      rfqPoints: ["измеряемую среду", "диапазон температуры", "диапазон влажности", "требуемую точность", "условия монтажа", "необходимый выходной сигнал", "количество", "требования к сертификатам или документации"],
      productsEyebrow: "Рекомендуемые приборы",
      productsTitle: "Датчики и преобразователи",
      productsLead: "Модели для стандартного мониторинга, воздуховодов, камер, систем управления и сложных условий.",
      productLinkLabel: "Подробнее",
      faqsTitle: "Частые вопросы",
      faqs: [
        { question: "Чем отличается датчик влажности от преобразователя влажности?", answer: "Датчик измеряет влажность, а преобразователь обычно передает измеренный сигнал в систему управления или мониторинга. В промышленности часто используются преобразователи с аналоговым или цифровым выходом." },
        { question: "Какой датчик подходит для воздуховода?", answer: "Для воздуховодов обычно выбирают зондовые или канальные датчики с подходящей длиной зонда, диапазоном температуры и стабильностью измерения." },
        { question: "Можно ли использовать один прибор для температуры и влажности?", answer: "Да. Многие промышленные датчики измеряют одновременно температуру и относительную влажность, а также могут использоваться для расчета дополнительных параметров." },
        { question: "Какие данные нужны для подбора модели?", answer: "Нужно указать среду, диапазон температуры и влажности, требуемую точность, способ монтажа, выходной сигнал и условия эксплуатации." }
      ],
      advisorTitle: "Подобрать модель по параметрам",
      advisorText: "Укажите среду, диапазон, точность и способ монтажа. Мы поможем сопоставить параметры с подходящими моделями.",
      advisorButton: "Отправить параметры",
      finalCtaTitle: "Нужен датчик под условия процесса?",
      finalCtaText: "Сопоставим среду, монтаж, диапазон и сигнал с подходящими промышленными моделями.",
      finalCtaButton: "Запросить подбор"
    },
    en: {
      metaTitle: "Industrial humidity and temperature monitoring",
      metaDescription: "Industrial humidity monitoring with humidity and temperature sensors for production areas, ducts, chambers, BMS and technical systems.",
      heroEyebrow: "Industrial humidity monitoring",
      title: "Industrial humidity and temperature monitoring",
      lead: "Humidity and temperature sensors, probes and transmitters for production processes, ducts, clean rooms, climate rooms and technical systems.",
      primaryButton: "Request a selection",
      secondaryButton: "View instruments",
      breadcrumbs: { home: "Home", applications: "Applications" },
      heroFacts: [
        { title: "Continuous monitoring", text: "Sensors and transmitters" },
        { title: "On-site checks", text: "Portable instruments" }
      ],
      overviewTitle: "Why humidity and temperature monitoring matters",
      overviewText: "Industrial humidity monitoring depends on the medium, measurement range, mounting method and output signal. Stability, calibration, service access and control-system compatibility are as important as accuracy.",
      scenariosTitle: "Where sensors are used",
      scenariosLead: "The medium, measurement point and signal requirements define the probe and transmitter configuration.",
      photoScenarios: [
        { title: "Duct installation", text: "Use a probe in ventilation ducts and climate equipment.", imageAlt: "Industrial humidity probe installed in an air duct" },
        { title: "Service verification", text: "Inspect selected points with a portable meter during setup and maintenance.", imageAlt: "Portable humidity verification in an industrial technical room" }
      ],
      technicalScenarios: [
        { title: "Production area", text: "Monitor conditions that affect processes and product quality.", criterion: "Humidity range, temperature and air velocity" },
        { title: "Technical room", text: "Send humidity and temperature data to PLC, SCADA or BMS.", criterion: "Installation point, output signal and power" },
        { title: "Demanding conditions", text: "Select construction for dust, condensation, vapors, pressure or hazardous areas.", criterion: "Probe material, protection and site approvals" }
      ],
      criterionLabel: "Selection focus",
      selectionTitle: "How to choose an industrial sensor",
      selectionLead: "Match the measurement point, mounting, accuracy and interface to the process conditions.",
      selectionCards: [
        { title: "Measurement point", text: "Air, process gas, chamber, warehouse or ventilation duct." },
        { title: "Installation", text: "Wall mount, probe, duct mount, cable, power supply and service access." },
        { title: "Signal and accuracy", text: "Humidity range, temperature range, required accuracy and output format." },
        { title: "Documentation", text: "Calibration, certificates, manuals and delivery requirements." }
      ],
      rfqTitle: "What to specify in your request",
      rfqPoints: ["Measured medium", "Temperature range", "Humidity range", "Required accuracy", "Mounting conditions", "Output signal", "Quantity", "Certificate or documentation needs"],
      productsEyebrow: "Recommended instruments",
      productsTitle: "Sensors and transmitters",
      productsLead: "Models for standard monitoring, ducts, chambers, control systems and demanding conditions.",
      productLinkLabel: "Learn more",
      faqsTitle: "Frequently asked questions",
      faqs: [
        { question: "What is the difference between a humidity sensor and a humidity transmitter?", answer: "A sensor measures humidity. A transmitter conditions the measured signal and sends it to a control or monitoring system through an analog or digital output." },
        { question: "Which sensor is suitable for an air duct?", answer: "Duct applications usually need a probe with suitable insertion length, temperature range, stability and a mounting method that allows maintenance." },
        { question: "Can one instrument measure temperature and humidity?", answer: "Yes. Many industrial sensors measure both temperature and relative humidity, and the data can also be used for calculated humidity parameters." },
        { question: "What data is needed for model selection?", answer: "Specify the medium, temperature and humidity range, required accuracy, mounting method, output signal and operating conditions." }
      ],
      advisorTitle: "Select a model by parameters",
      advisorText: "Send the medium, range, accuracy and mounting details. We will match them with suitable instruments.",
      advisorButton: "Send parameters",
      finalCtaTitle: "Need a sensor for your process conditions?",
      finalCtaText: "We will match the medium, mounting, range and signal with suitable industrial models.",
      finalCtaButton: "Request a selection"
    }
  }
};
