import type { ApplicationPageRecord } from "@/data/applications/types";

const heroImage = "/assets/application-climate-chamber-lab.png";
const scenarioImage = "/assets/application-climate-chamber-inline.png";

export const climateChamberHumidity: ApplicationPageRecord = {
  slug: "climate-chamber-humidity",
  path: "/applications/climate-chamber-humidity",
  heroImage,
  scenarioImage,
  ctaImage: heroImage,
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
      scenarios: [
        { title: "Климатические камеры", text: "Контроль влажности и температуры при испытаниях материалов, электроники и компонентов.", image: heroImage, imageAlt: "Измерение влажности в климатической камере" },
        { title: "Лабораторный контроль", text: "Стабильные измерения для проверки условий и повторяемых испытаний.", image: scenarioImage, imageAlt: "Лабораторное измерение влажности" },
        { title: "Чистые помещения", text: "Мониторинг температуры и влажности в контролируемых технических зонах.", image: heroImage, imageAlt: "Контроль влажности в чистом помещении" },
        { title: "Проверка нескольких точек", text: "Портативные приборы для сравнения условий и сервисного контроля.", image: scenarioImage, imageAlt: "Переносная проверка влажности в лаборатории" },
        { title: "Регистрация данных", text: "Передача сигнала в регистратор, ПЛК, BMS или локальную систему.", image: heroImage, imageAlt: "Регистрация влажности и температуры" }
      ],
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
      scenarios: [
        { title: "Climate chambers", text: "Monitor humidity and temperature during material, electronics and component testing.", image: heroImage, imageAlt: "Humidity measurement in a climate chamber" },
        { title: "Laboratory monitoring", text: "Stable readings for condition checks and repeatable tests.", image: scenarioImage, imageAlt: "Laboratory humidity measurement" },
        { title: "Clean rooms", text: "Monitor temperature and humidity in controlled technical areas.", image: heroImage, imageAlt: "Humidity monitoring in a clean room" },
        { title: "Multi-point checks", text: "Use portable instruments for comparison and service checks.", image: scenarioImage, imageAlt: "Portable laboratory humidity check" },
        { title: "Data recording", text: "Send signals to a logger, PLC, BMS or local monitoring system.", image: heroImage, imageAlt: "Humidity and temperature data recording" }
      ],
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
