import type { Locale } from "@/data/catalog";

type AboutItem = {
  title: string;
  description: string;
};

type AboutContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  domains: AboutItem[];
  supportEyebrow: string;
  supportTitle: string;
  supportBody: string;
  supportSteps: AboutItem[];
  environmentsEyebrow: string;
  environmentsTitle: string;
  environmentsLead: string;
  environments: Array<AboutItem & { image: string; alt: string }>;
  rfqEyebrow: string;
  rfqTitle: string;
  rfqBody: string;
  rfqAction: string;
};

export const aboutContent = {
  ru: {
    heroEyebrow: "О SenseMeter",
    heroTitle: "Промышленные измерительные приборы из Китая",
    heroLead:
      "SenseMeter экспортирует из Китая приборы для измерения точки росы, влажности, температуры и содержания кислорода.",
    introEyebrow: "Чем мы занимаемся",
    introTitle: "Разработка, производство и поставка приборов",
    introBody:
      "За брендом SenseMeter стоит SINOETM TECH LTD — многопрофильная высокотехнологичная компания. Мы занимаемся разработкой, производством, продажей и обслуживанием измерительных приборов. Поставляем оборудование известных мировых брендов для промышленных процессов, лабораторных испытаний и анализа газов. Помогаем подобрать прибор и комплектующие, предоставляем техническую документацию и консультируем после поставки.",
    domains: [
      {
        title: "Точка росы и влажность",
        description: "Решения для сжатого воздуха, технологических газов и систем газоподготовки."
      },
      {
        title: "Влажность и температура",
        description: "Измерения в производственных помещениях, воздуховодах, камерах и технических системах."
      },
      {
        title: "Анализ кислорода",
        description: "Анализаторы кислорода для контроля чистоты газа в перчаточных боксах и промышленных установках."
      }
    ],
    supportEyebrow: "Поддержка проекта",
    supportTitle: "От анализа задачи до поставки",
    supportBody:
      "По рабочей среде, диапазону измерения, способу монтажа, выходному сигналу и условиям эксплуатации мы подбираем прибор и совместимые комплектующие.",
    supportSteps: [
      {
        title: "Анализ задачи",
        description: "Уточняем среду, давление, температуру и требуемый диапазон измерения."
      },
      {
        title: "Подбор модели",
        description: "Сравниваем приборы по точности, исполнению и условиям установки."
      },
      {
        title: "Интеграция",
        description: "Согласуем зонды, фильтры, фитинги, кабели, дисплеи и варианты выхода."
      },
      {
        title: "Предложение и документация",
        description: "Подтверждаем наличие, срок поставки и комплект технических материалов."
      }
    ],
    environmentsEyebrow: "Промышленные условия",
    environmentsTitle: "Где особенно важны надежные измерения",
    environmentsLead:
      "Мы подбираем измерительные решения для производственных линий, газовых систем, климатических камер и лабораторий, где точные данные о влажности, точке росы, температуре и кислороде необходимы для стабильного управления процессом.",
    environments: [
      {
        title: "Производство и технологические системы",
        description: "Подбор приборов для сложных условий эксплуатации.",
        image: "/assets/about/industrial-engineer.jpg",
        alt: "Инженер с планшетом в промышленном производственном цехе"
      },
      {
        title: "Прецизионные измерения",
        description: "Измерительное оборудование для контролируемых испытаний.",
        image: "/assets/about/precision-instrument.jpg",
        alt: "Прецизионный металлический прибор в лаборатории"
      },
      {
        title: "Эксплуатация промышленных систем",
        description: "Мониторинг и интеграция с промышленной автоматикой.",
        image: "/assets/about/control-panels.jpg",
        alt: "Ряды промышленных электрических шкафов управления"
      }
    ],
    rfqEyebrow: "Запрос цены и подбор",
    rfqTitle: "Обсудить параметры измерения",
    rfqBody:
      "Укажите рабочую среду, диапазон, способ монтажа, выходной сигнал и условия эксплуатации. Мы предложим подходящие модели и уточним условия поставки из Китая.",
    rfqAction: "Запросить предложение"
  },
  en: {
    heroEyebrow: "About SenseMeter",
    heroTitle: "Industrial measuring instruments from China",
    heroLead:
      "SenseMeter exports instruments for dew point, humidity, temperature, and oxygen measurement from China.",
    introEyebrow: "What we do",
    introTitle: "Instrument development, manufacturing and supply",
    introBody:
      "SenseMeter is a brand of SINOETM TECH LTD, a diversified high-tech company. Our work covers instrument research and development, manufacturing, sales, and service. We supply internationally recognized brands for industrial processes, laboratory testing, and gas analysis. We help select instruments and accessories, provide technical documentation, and offer after-sales support.",
    domains: [
      {
        title: "Dew point and moisture",
        description: "Solutions for compressed air, process gases and gas treatment systems."
      },
      {
        title: "Humidity and temperature",
        description: "Measurement for production rooms, ducts, chambers and technical systems."
      },
      {
        title: "Oxygen analysis",
        description: "Oxygen analyzers for monitoring gas purity in glove boxes and industrial installations."
      }
    ],
    supportEyebrow: "Project support",
    supportTitle: "From selecting a model to arranging delivery",
    supportBody:
      "We use your process medium, measurement range, installation method, output signal and operating conditions to select an instrument and compatible accessories.",
    supportSteps: [
      {
        title: "Application review",
        description: "Clarify the medium, pressure, temperature and required measurement range."
      },
      {
        title: "Model selection",
        description: "Compare suitable instruments by accuracy, construction and installation needs."
      },
      {
        title: "Integration",
        description: "Match probes, filters, fittings, cables, displays and output options."
      },
      {
        title: "Quotation and documents",
        description: "Confirm availability, lead time and the required technical materials."
      }
    ],
    environmentsEyebrow: "Industrial environments",
    environmentsTitle: "Where reliable measurement matters",
    environmentsLead:
      "We select measurement solutions for production lines, gas systems, environmental chambers and laboratories where accurate humidity, dew-point, temperature and oxygen data support stable process control.",
    environments: [
      {
        title: "Production and process systems",
        description: "Instrument selection for demanding operating conditions.",
        image: "/assets/about/industrial-engineer.jpg",
        alt: "Engineer holding a tablet on an industrial production floor"
      },
      {
        title: "Precision measurement",
        description: "Measurement equipment for controlled testing environments.",
        image: "/assets/about/precision-instrument.jpg",
        alt: "Precision metal instrument in a laboratory"
      },
      {
        title: "Industrial system operation",
        description: "Monitoring and integration with industrial automation.",
        image: "/assets/about/control-panels.jpg",
        alt: "Rows of industrial electrical control cabinets"
      }
    ],
    rfqEyebrow: "Quotations and model selection",
    rfqTitle: "Discuss your measurement requirements",
    rfqBody:
      "Tell us the process medium, range, installation method, output signal and operating conditions. We will recommend suitable models and confirm the terms for shipping from China.",
    rfqAction: "Request a Quote"
  }
} satisfies Record<Locale, AboutContent>;
