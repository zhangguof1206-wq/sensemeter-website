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
  stockDisclosure: string;
  environments: Array<AboutItem & { image: string; alt: string }>;
  rfqEyebrow: string;
  rfqTitle: string;
  rfqBody: string;
  rfqAction: string;
};

export const aboutContent = {
  ru: {
    heroEyebrow: "О SenseMeter",
    heroTitle: "Поддержка промышленных измерительных задач",
    heroLead:
      "Приборы и сенсорные решения для контроля влажности, точки росы, кислорода и температуры в сложных промышленных условиях.",
    introEyebrow: "Чем мы занимаемся",
    introTitle: "Практическая помощь в подборе измерительных решений",
    introBody:
      "Sinoetm Tech. Ltd. поставляет промышленные измерительные приборы и совместимые комплектующие для производства, управления процессами, газового контроля и лабораторных испытаний. Мы помогаем определить измерительную задачу, сравнить подходящие модели и подготовить данные, необходимые для коммерческого предложения.",
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
        description: "Анализаторы для контроля чистоты газа, glove box и промышленных процессов."
      }
    ],
    supportEyebrow: "Поддержка проекта",
    supportTitle: "От анализа задачи до поставки",
    supportBody:
      "Подбор прибора зависит от рабочей среды, диапазона измерения, способа монтажа, выходного сигнала и условий эксплуатации. Мы систематизируем эти требования в понятную спецификацию прибора и комплектующих.",
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
    stockDisclosure:
      "Представительные рабочие условия для промышленных приборов. Использованы лицензированные стоковые фотографии, а не изображения собственных объектов компании.",
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
    rfqEyebrow: "Контакты / RFQ",
    rfqTitle: "Обсудить параметры измерения",
    rfqBody:
      "Укажите рабочую среду, диапазон, способ монтажа, выходной сигнал и условия эксплуатации. Эти данные помогут подготовить подходящий вариант подбора.",
    rfqAction: "Запросить предложение"
  },
  en: {
    heroEyebrow: "About SenseMeter",
    heroTitle: "Industrial measurement support",
    heroLead:
      "Measurement instruments and sensor solutions for humidity, dew point, oxygen and temperature in demanding industrial conditions.",
    introEyebrow: "What we do",
    introTitle: "Practical support for demanding measurement tasks",
    introBody:
      "Sinoetm Tech. Ltd. supplies industrial measurement instruments and compatible accessories for production, process control, gas monitoring and laboratory testing. We help customers define the measurement task, compare suitable models and prepare the information required for quotation.",
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
        description: "Analyzers for gas purity, glove boxes and industrial process monitoring."
      }
    ],
    supportEyebrow: "Project support",
    supportTitle: "From application review to supply",
    supportBody:
      "Instrument selection depends on the operating medium, measurement range, installation method, output signal and operating conditions. We organize these requirements into a clear instrument and accessory specification.",
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
    stockDisclosure:
      "Representative working environments for industrial instruments. Licensed stock photographs are shown; they do not depict our own facilities.",
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
    rfqEyebrow: "Contact / RFQ",
    rfqTitle: "Discuss your measurement requirements",
    rfqBody:
      "Provide the process medium, measurement range, installation method, output signal and operating conditions. We will use these details to prepare a suitable selection.",
    rfqAction: "Request a Quote"
  }
} satisfies Record<Locale, AboutContent>;
