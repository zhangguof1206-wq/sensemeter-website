import type { Locale } from "@/data/catalog";

export const locales: Locale[] = ["ru", "en"];
export const defaultLocale: Locale = "ru";

export const copy = {
  ru: {
    brand: "SenseMeter",
    brandLine: "Поставка промышленных измерительных приборов",
    navHome: "Главная",
    navCatalog: "Каталог",
    navAbout: "О нас",
    navContact: "Контакты",
    navPrivacy: "Политика",
    navConsent: "Согласие на обработку данных",
    navCookies: "Cookie",
    searchPlaceholder: "Поиск модели",
    searchButton: "Поиск",
    cookieBannerText:
      "Мы используем необходимые технологии для работы сайта. Если позднее будут подключены аналитические инструменты, например Яндекс Метрика, они будут использоваться с учетом ваших настроек согласия.",
    cookieAccept: "Принять",
    cookieNecessary: "Только необходимые",
    cookieLearnMore: "Подробнее",
    heroEyebrow: "MICHELL / ROTRONIC / VAISALA / AII",
    heroTitle: "Промышленные измерительные приборы",
    heroLead:
      "SenseMeter экспортирует из Китая приборы известных мировых брендов: измерители точки росы (в том числе портативные), преобразователи точки росы, датчики и преобразователи температуры и влажности, ручные термогигрометры и системы анализа следовой влаги в газах.",
    heroDetails:
      "Помогаем подобрать модель и совместимые комплектующие, согласовать интеграцию в панели и шкафы, а также OEM- и проектные закупки. В коммерческом предложении подтверждаем наличие и сроки поставки; международную доставку, таможенное оформление и распределение расходов согласовываем с учетом страны назначения и выбранной клиентом схемы.",
    heroDetailsEyebrow: "Подбор и поставка",
    viewCatalog: "Смотреть каталог",
    requestQuote: "Запросить предложение",
    categoriesTitle: "Основные категории",
    categoriesHeading: "Приборы по измерительной задаче и условиям установки",
    categoriesLead: "Выберите бренд, измерительную задачу и условия установки: точка росы, влажность, температура или кислород, а при необходимости также совместимые комплектующие.",
    viewCategoryProducts: "Смотреть продукты",
    applicationEyebrow: "Области применения",
    applicationTitle: "Типовые промышленные сценарии",
    applicationLead: "Измерения на технологических линиях, в инженерных системах и испытательных камерах.",
    viewApplication: "Подробнее о применении",
    products: "продуктов",
    catalogTitle: "Каталог промышленных датчиков и анализаторов",
    catalogLead:
      "Сравните датчики влажности и точки росы и анализаторы кислорода по диапазону измерения, рабочей среде, давлению, выходному сигналу и способу монтажа. В карточке прибора можно посмотреть характеристики, скачать документацию и запросить цену.",
    allProducts: "Все приборы",
    details: "Подробнее",
    downloadPdf: "Скачать PDF",
    backCatalog: "Назад к каталогу",
    overview: "Обзор продукта",
    keyParams: "Ключевые параметры",
    highlights: "Особенности",
    applications: "Применение",
    selectionInputs: "Что указать для подбора",
    relatedApplications: "Связанные применения",
    contactTitle: "Контакты и запрос цены",
    contactLead:
      "Укажите модель, чтобы узнать цену, наличие и срок поставки из Китая. Если модель ещё не выбрана, опишите задачу — мы поможем подобрать прибор и предоставим техническую документацию.",
    emailNote:
      "Для быстрого ответа укажите модель, количество, рабочую среду или газ, диапазон измерения, давление, выходной сигнал, способ монтажа, а также нужные комплектующие или интеграцию в панели и шкафы.",
    contactEmail: "sales@sensemeter.ru",
    contactPhone: "@Sensemeter",
    contactTelegram: "@Sensemeter",
    contactInfoTitle: "Контакты",
    telegramLabel: "Telegram",
    messengerNote: "Доступно для связи в Telegram.",
    submit: "Отправить запрос",
    sending: "Отправка...",
    required: "обязательно",
    consentCheckbox:
      "Я согласен(на) на обработку персональных данных для ответа на мой запрос и подтверждаю, что ознакомился(лась) с документами:",
    consentPrivacyLink: "Политикой обработки персональных данных",
    consentDataLink: "Согласием на обработку персональных данных",
    consentRequired: "Для отправки запроса необходимо дать согласие на обработку персональных данных.",
    formEmail: "Email",
    formName: "Имя",
    formCompany: "Компания",
    formCountryCity: "Страна / город",
    formContact: "Контакт",
    formContactMethod: "Выберите способ связи",
    formContactDetails: "Номер или имя пользователя",
    formProductModel: "Модель прибора или комплектующего",
    formSelectProduct: "Выберите модель",
    formQuantity: "Количество",
    formApplication: "Применение",
    formMessage: "Сообщение",
    privacyTitle: "Политика конфиденциальности",
    privacyLead:
      "Эта политика объясняет, как SenseMeter и SINOETM TECH LTD обрабатывают данные, отправленные через форму RFQ.",
    privacyBody: [
      "SenseMeter / SINOETM TECH LTD собирает только данные, которые пользователь добровольно отправляет через форму запроса: email, имя, компанию, страну или город, телефон или мессенджер, модель продукта, количество, область применения и сообщение.",
      "Эти данные используются для ответа на запрос, подготовки коммерческого предложения, подбора оборудования, технической консультации и дальнейшей деловой коммуникации.",
      "SenseMeter / SINOETM TECH LTD не продает контактные данные третьим лицам. Доступ к запросам имеют только специалисты, участвующие в обработке обращения и подготовке ответа.",
      "Пользователь может запросить уточнение, обновление или удаление отправленных данных, связавшись с нами по электронной почте sales@sensemeter.ru."
    ],
    thankYouTitle: "Спасибо",
    thankYouLead: "Ваш запрос отправлен. Мы проверим информацию и свяжемся с вами по указанным контактам.",
    footerLine: "Решения для контроля влажности, точки росы и кислорода в промышленных процессах.",
    noResults: "Ничего не найдено. Попробуйте искать по модели, например Easidew, GPR или HC2A."
  },
  en: {
    brand: "SenseMeter",
    brandLine: "Industrial measuring instrument supply",
    navHome: "Home",
    navCatalog: "Product Catalog",
    navAbout: "About",
    navContact: "Contact",
    navPrivacy: "Privacy Policy",
    navConsent: "Personal Data Consent",
    navCookies: "Cookie Policy",
    searchPlaceholder: "Search model",
    searchButton: "Search",
    cookieBannerText:
      "We use necessary technologies to operate this website. If analytics tools such as Yandex Metrica are added later, they will be used according to your consent settings.",
    cookieAccept: "Accept",
    cookieNecessary: "Necessary only",
    cookieLearnMore: "Learn more",
    heroEyebrow: "MICHELL / ROTRONIC / VAISALA / AII",
    heroTitle: "Industrial measuring instruments",
    heroLead:
      "SenseMeter exports industrial instruments from China, with a range of internationally recognized brands covering dew point meters (fixed and portable), dew point transmitters, temperature and humidity transmitters and sensors, handheld thermo-hygrometers, and trace moisture analysis systems for gases.",
    heroDetails:
      "We support model selection, compatible accessories, instrument panel and cabinet integration, and OEM or project procurement. Product availability and lead times are confirmed in each quotation; international delivery, customs clearance and cost allocation are agreed for the destination country and the customer's selected arrangement.",
    heroDetailsEyebrow: "Selection and supply",
    viewCatalog: "View Catalog",
    requestQuote: "Request a Quote",
    categoriesTitle: "Main Categories",
    categoriesHeading: "Instruments by measurement task and installation conditions",
    categoriesLead: "Choose by brand, measurement task and installation environment: dew point, humidity, temperature or oxygen, plus compatible accessories when needed.",
    viewCategoryProducts: "View products",
    applicationEyebrow: "Application Areas",
    applicationTitle: "Typical Industrial Use Cases",
    applicationLead: "Measurement applications for process lines, utility systems and test chambers.",
    viewApplication: "View application",
    products: "products",
    catalogTitle: "Product Catalog",
    catalogLead:
      "Compare instruments by measurement range, process medium, pressure, output/interface and installation method. Open a product page to see its specifications, download a datasheet or request a quote.",
    allProducts: "ALL PRODUCTS",
    details: "View Details",
    downloadPdf: "Download PDF",
    backCatalog: "Back to Catalog",
    overview: "Product Overview",
    keyParams: "Key Parameters",
    highlights: "Highlights",
    applications: "Applications",
    selectionInputs: "What to specify for selection",
    relatedApplications: "Related applications",
    contactTitle: "Contact and Quotations",
    contactLead: "Send us the model to request pricing, availability and lead time for supply from China. If you have not chosen a model, describe your application. We can help select an instrument and provide its technical documentation.",
    emailNote:
      "For a faster quotation, include the model, quantity, gas or process medium, measurement range, pressure, output/interface, installation method and any accessory or cabinet-integration needs.",
    contactEmail: "sales@sensemeter.ru",
    contactPhone: "@Sensemeter",
    contactTelegram: "@Sensemeter",
    contactInfoTitle: "Contact",
    telegramLabel: "Telegram",
    messengerNote: "Telegram is available for direct contact.",
    submit: "Send Request",
    sending: "Sending...",
    required: "required",
    consentCheckbox:
      "I consent to the processing of personal data for the purpose of responding to my request and confirm that I have read:",
    consentPrivacyLink: "the Personal Data Processing Policy",
    consentDataLink: "the Personal Data Consent",
    consentRequired: "Please consent to personal data processing before submitting the request.",
    formEmail: "Email",
    formName: "Name",
    formCompany: "Company",
    formCountryCity: "Country / City",
    formContact: "Contact",
    formContactMethod: "Select contact method",
    formContactDetails: "Number or username",
    formProductModel: "Instrument or accessory model",
    formSelectProduct: "Select a model",
    formQuantity: "Quantity",
    formApplication: "Application",
    formMessage: "Message",
    privacyTitle: "Privacy Policy",
    privacyLead: "This policy explains how SenseMeter and SINOETM TECH LTD handle data submitted through the RFQ form.",
    privacyBody: [
      "SenseMeter / SINOETM TECH LTD collects only the data a user voluntarily submits through the RFQ form: email, name, company, city or country, phone or messenger, product model, quantity, application and message.",
      "This data is used to respond to inquiries, prepare quotations, select suitable instruments, provide technical consultation and continue business communication.",
      "SenseMeter / SINOETM TECH LTD does not sell contact data to third parties. Inquiry data is handled only by specialists involved in reviewing the request and preparing the response.",
      "A user may request correction, update or deletion of submitted data by contacting us at sales@sensemeter.ru."
    ],
    thankYouTitle: "Thank you",
    thankYouLead: "We received your request and will reply using the contact details you provided.",
    footerLine: "Humidity, dew-point and oxygen analysis solutions for industrial processes.",
    noResults: "No results found. Try a model name such as Easidew, GPR or HC2A."
  }
} as const;

export function t(locale: Locale) {
  return copy[locale];
}

export function localizedPath(locale: Locale, path: string) {
  if (locale === "ru") return path;
  if (path === "/") return "/en";
  return `/en${path}`;
}

export function oppositeLocale(locale: Locale): Locale {
  return locale === "ru" ? "en" : "ru";
}
