import type { ApplicationPageRecord } from "@/data/applications/types";

export const climateChamberHumidity: ApplicationPageRecord = {
  slug: "climate-chamber-humidity",
  path: "/applications/climate-chamber-humidity",
  heroImage: "/assets/applications/climate-chamber-humidity/hero.webp",
  scenarioImages: [
    "/assets/applications/climate-chamber-humidity/process-installation.webp",
    "/assets/applications/climate-chamber-humidity/field-verification.webp"
  ],
  recommendedSlugs: ["hmp3-hmpx", "hc2a-series", "hp31-hp32", "hmt310", "hygroflex1"],
  content: {
    ru: {
      metaTitle: "Датчики влажности для климатических камер и лабораторий",
      metaDescription: "Решения для точного измерения влажности и температуры в лабораториях, климатических камерах, испытательных установках и чистых помещениях.",
      heroEyebrow: "Лаборатории и климатические камеры",
      title: "Измерение влажности в лабораториях и климатических камерах",
      lead: "Датчики, зонды и портативные приборы для контроля влажности и температуры в климатических камерах, лабораториях, чистых помещениях и испытательных установках.",
      primaryButton: "Запросить предложение",
      secondaryButton: "Смотреть решения",
      breadcrumbs: { home: "Главная", applications: "Применения" },
      heroFacts: [{ title: "Стабильные измерения", text: "Влажность и температура" }, { title: "Документация", text: "Калибровка и регистрация" }],
      overviewTitle: "Зачем контролировать условия испытаний",
      overviewText: "Для лабораторных испытаний и климатических камер важны стабильность, повторяемость и точность. Подбор прибора зависит от диапазона измерения, места установки, требований к калибровке и способа регистрации данных.",
      scenariosTitle: "Где применяются приборы",
      scenariosLead: "Тип камеры, рабочий диапазон и требования к данным определяют датчик и способ установки.",
      photoScenarios: [
        { title: "Зонд в рабочем объеме", text: "Стабильное измерение влажности и температуры непосредственно в камере.", imageAlt: "Зонд влажности установлен внутри климатической камеры" },
        { title: "Проверка эталонным прибором", text: "Портативное сравнение показаний при валидации и обслуживании.", imageAlt: "Инженер проверяет влажность в климатической камере" }
      ],
      technicalScenarios: [
        { title: "Климатическая камера", text: "Контроль условий при испытаниях материалов, электроники и компонентов.", criterion: "Диапазоны температуры и влажности, размер камеры" },
        { title: "Чистое помещение", text: "Мониторинг температуры и влажности в контролируемых технических зонах.", criterion: "Точность, размещение зонда и требования к калибровке" },
        { title: "Регистрация данных", text: "Передача сигнала в регистратор, ПЛК, BMS или локальную систему.", criterion: "Выходной сигнал, частота записи и документация" }
      ],
      criterionLabel: "Критерии подбора",
      selectionTitle: "Как выбрать датчик для камеры",
      selectionLead: "Нужно связать задачу испытаний, диапазон, монтаж и документы с системой регистрации.",
      selectionCards: [
        { title: "Задача испытаний", text: "Опишите материал, образец или процесс, для которого нужно контролировать влажность и температуру." },
        { title: "Диапазон и точность", text: "Укажите рабочий диапазон, допустимую погрешность и требования к стабильности показаний." },
        { title: "Монтаж датчика", text: "Выберите зонд для камеры, настенный датчик, переносной прибор или подключение к регистратору." },
        { title: "Документы", text: "Проверьте необходимость калибровочного сертификата, протоколов и технической документации." }
      ],
      rfqTitle: "Что указать в запросе",
      rfqPoints: ["тип камеры или лабораторной зоны", "диапазон температуры", "диапазон влажности", "требуемую точность", "точку установки датчика", "выходной сигнал", "нужна ли калибровка или сертификат"],
      productsEyebrow: "Рекомендуемые приборы",
      productsTitle: "Приборы для камер и лабораторий",
      productsLead: "Зонды, преобразователи и портативные приборы для испытаний и контролируемых помещений.",
      productLinkLabel: "Подробнее",
      faqsTitle: "Частые вопросы",
      faqs: [
        { question: "Какой датчик влажности подходит для климатической камеры?", answer: "Обычно выбирают зонд или датчик с подходящим температурным диапазоном, стабильностью и возможностью вывода сигнала на регистратор или систему управления." },
        { question: "Нужен ли отдельный датчик температуры?", answer: "Многие лабораторные датчики одновременно измеряют относительную влажность и температуру. Это удобно для контроля условий и расчета дополнительных параметров." },
        { question: "Можно ли использовать переносной прибор вместо стационарного датчика?", answer: "Переносной прибор удобен для проверки нескольких точек и сервисного контроля, но для постоянного мониторинга лучше использовать стационарный датчик или передатчик." },
        { question: "Какие данные нужны для подбора модели?", answer: "Нужно указать тип камеры или помещения, диапазон температуры и влажности, точность, способ установки, выходной сигнал и требования к калибровке." }
      ],
      advisorTitle: "Подобрать модель по параметрам",
      advisorText: "Укажите тип камеры, диапазон, точность и требования к калибровке. Мы поможем выбрать подходящий прибор.",
      advisorButton: "Отправить параметры",
      finalCtaTitle: "Нужен прибор для камеры или лаборатории?",
      finalCtaText: "Сопоставим диапазон, точность, место установки и требования к калибровке.",
      finalCtaButton: "Запросить подбор"
    },
    en: {
      metaTitle: "Climate chamber humidity measurement",
      metaDescription: "Humidity and temperature sensors for laboratories, climate chambers, calibration rooms and environmental test systems. Select probes and transmitters for stable monitoring.",
      heroEyebrow: "Laboratories and climate chambers",
      title: "Climate chamber humidity and temperature measurement",
      lead: "Humidity and temperature instruments for laboratories, climate chambers, calibration rooms, environmental testing and clean technical areas.",
      primaryButton: "Request a selection",
      secondaryButton: "View instruments",
      breadcrumbs: { home: "Home", applications: "Applications" },
      heroFacts: [{ title: "Stable measurements", text: "Humidity and temperature" }, { title: "Documentation", text: "Calibration and recording" }],
      overviewTitle: "Why test conditions need monitoring",
      overviewText: "Laboratory and climate chamber applications need stable readings, repeatability and suitable probe placement. The selection depends on chamber size, temperature range, humidity range and data requirements.",
      scenariosTitle: "Where instruments are used",
      scenariosLead: "Chamber type, operating range and data requirements define the sensor and mounting method.",
      photoScenarios: [
        { title: "Probe in the test volume", text: "Measure humidity and temperature directly inside the chamber.", imageAlt: "Humidity probe installed inside an environmental test chamber" },
        { title: "Reference verification", text: "Compare readings with a portable reference during validation and service.", imageAlt: "Engineer verifying humidity inside an environmental chamber" }
      ],
      technicalScenarios: [
        { title: "Climate chamber", text: "Monitor conditions during material, electronics and component testing.", criterion: "Temperature and humidity ranges, chamber volume" },
        { title: "Clean room", text: "Monitor temperature and humidity in controlled technical areas.", criterion: "Accuracy, probe placement and calibration requirements" },
        { title: "Data recording", text: "Send signals to a logger, PLC, BMS or local monitoring system.", criterion: "Output signal, logging interval and documentation" }
      ],
      criterionLabel: "Selection focus",
      selectionTitle: "How to choose a chamber sensor",
      selectionLead: "Match the test task, range, mounting and documentation to the data system.",
      selectionCards: [
        { title: "Test range", text: "Define temperature and humidity limits for the chamber." },
        { title: "Probe location", text: "Choose placement for representative and stable measurement." },
        { title: "Accuracy", text: "Specify accuracy, stability and calibration interval expectations." },
        { title: "Data", text: "Confirm output, display, logging or system integration needs." }
      ],
      rfqTitle: "What to specify in your request",
      rfqPoints: ["Chamber or room type", "Temperature range", "Humidity range", "Required accuracy", "Probe location", "Data logging needs", "Calibration requirements", "Quantity"],
      productsEyebrow: "Recommended instruments",
      productsTitle: "Instruments for chambers and laboratories",
      productsLead: "Probes, transmitters and portable instruments for tests and controlled rooms.",
      productLinkLabel: "Learn more",
      faqsTitle: "Frequently asked questions",
      faqs: [
        { question: "Where should a chamber humidity probe be placed?", answer: "The probe should be positioned where it represents the test volume without being affected by direct airflow, walls, heaters or wet surfaces." },
        { question: "Do I need calibration documentation?", answer: "For laboratory, pharmaceutical and quality applications, calibration certificates or traceable documentation are often required." },
        { question: "Can one probe measure temperature and humidity?", answer: "Yes. Many chamber probes measure both relative humidity and temperature, and may also support calculated humidity values." },
        { question: "What data is needed for model selection?", answer: "Specify chamber type, temperature range, humidity range, required accuracy, probe location, output or logging needs and calibration requirements." }
      ],
      advisorTitle: "Select a model by parameters",
      advisorText: "Send chamber type, temperature and humidity range, accuracy target and calibration requirements. We will suggest suitable instruments.",
      advisorButton: "Send parameters",
      finalCtaTitle: "Need an instrument for a chamber or laboratory?",
      finalCtaText: "We will match range, accuracy, probe location and calibration requirements.",
      finalCtaButton: "Request a selection"
    }
  }
};
