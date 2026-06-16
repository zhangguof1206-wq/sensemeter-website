import type { Locale } from "@/data/catalog";

export type LegalPageKey = "privacy" | "consent" | "cookies";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPage = {
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
};

export const legalCopy: Record<Locale, Record<LegalPageKey, LegalPage>> = {
  ru: {
    privacy: {
      title: "Политика в отношении обработки персональных данных",
      lead:
        "Настоящая политика описывает, какие данные Sense / SINOETM TECH LTD получает через сайт и форму RFQ, для каких целей они используются и как пользователь может связаться с нами по вопросам обработки данных.",
      updated: "Дата обновления: 16 июня 2026 г.",
      sections: [
        {
          title: "1. Оператор и контактная информация",
          paragraphs: [
            "Оператор сайта: SINOETM TECH LTD, торговая компания, поставляющая измерительные приборы и сенсорные решения для промышленных и профессиональных применений.",
            "Торговое обозначение сайта: Sense.",
            "Адрес компании: South Mingzhu road, Zhuhai City, 519070, Guangdong province, China.",
            "Контактный email для запросов по данным: zhangguof1206@gmail.com. Telegram: (+852) 6555 3946."
          ]
        },
        {
          title: "2. Какие данные мы получаем",
          paragraphs: [
            "Через форму RFQ пользователь добровольно может передать следующие сведения:"
          ],
          items: [
            "email-адрес;",
            "имя, название компании, страну или город;",
            "номер телефона, WhatsApp или Telegram, если пользователь указывает эти данные;",
            "интересующую модель продукта, количество и область применения;",
            "текст сообщения и иные сведения, которые пользователь сам включает в запрос."
          ]
        },
        {
          title: "3. Цели обработки",
          items: [
            "ответ на запрос пользователя;",
            "подготовка коммерческого предложения и уточнение потребностей;",
            "подбор подходящего измерительного оборудования;",
            "отправка технической информации, PDF datasheets и сопутствующих материалов;",
            "последующая деловая коммуникация по запросу пользователя."
          ]
        },
        {
          title: "4. Правовое основание",
          paragraphs: [
            "Данные обрабатываются на основании добровольного согласия пользователя, которое он дает при отправке формы RFQ. Без согласия форма не отправляется."
          ]
        },
        {
          title: "5. Передача и хранение данных",
          paragraphs: [
            "Данные не продаются третьим лицам. Доступ к запросам имеют только лица, участвующие в обработке обращений, подготовке предложений и коммуникации с клиентами.",
            "На этапе тестового и первичного запуска сайт может использовать инфраструктуру Netlify и электронную почту Gmail. Это означает, что данные могут технически обрабатываться или храниться за пределами Российской Федерации. Перед официальным продвижением сайта на российском рынке необходимо отдельно подтвердить модель хранения и передачи данных."
          ]
        },
        {
          title: "6. Срок хранения",
          paragraphs: [
            "Запросы RFQ хранятся столько, сколько необходимо для ответа пользователю, подготовки предложения, последующей деловой переписки и выполнения законных обязательств, если они применимы. Пользователь может запросить удаление или уточнение данных."
          ]
        },
        {
          title: "7. Права пользователя",
          paragraphs: [
            "Пользователь может запросить информацию об обработке своих данных, их уточнение, ограничение обработки или удаление, а также отозвать согласие, направив запрос на zhangguof1206@gmail.com."
          ]
        },
        {
          title: "8. Изменения политики",
          paragraphs: [
            "Мы можем обновлять эту политику при изменении структуры сайта, подключении аналитики, смене домена, почты, хостинга или уточнении реквизитов компании."
          ]
        }
      ]
    },
    consent: {
      title: "Согласие на обработку персональных данных",
      lead:
        "Отправляя форму RFQ, пользователь подтверждает согласие на обработку персональных данных для ответа на запрос о продукции Sense.",
      updated: "Дата обновления: 16 июня 2026 г.",
      sections: [
        {
          title: "1. Кому дается согласие",
          paragraphs: [
            "Согласие дается SINOETM TECH LTD, действующей на сайте под торговым обозначением Sense.",
            "Адрес компании: South Mingzhu road, Zhuhai City, 519070, Guangdong province, China."
          ]
        },
        {
          title: "2. Какие данные могут обрабатываться",
          items: [
            "email-адрес;",
            "имя, компания, страна или город;",
            "номер телефона, WhatsApp или Telegram, если пользователь указывает эти данные;",
            "модель продукта, количество и область применения;",
            "текст сообщения и иные сведения, добровольно переданные пользователем."
          ]
        },
        {
          title: "3. Цели обработки",
          items: [
            "рассмотрение RFQ-запроса;",
            "подготовка ответа, предложения, PDF-материалов и технической консультации;",
            "подбор оборудования и уточнение условий применения;",
            "ведение последующей деловой переписки по запросу пользователя."
          ]
        },
        {
          title: "4. Действия с данными",
          paragraphs: [
            "Согласие распространяется на сбор, запись, систематизацию, хранение, уточнение, использование, передачу внутри рабочих сервисов, обезличивание, блокирование и удаление данных в пределах указанных целей."
          ]
        },
        {
          title: "5. Трансграничная передача",
          paragraphs: [
            "Пользователь понимает, что при использовании сайта, хостинга Netlify, почтового сервиса Gmail и иных технических сервисов данные могут передаваться и обрабатываться за пределами Российской Федерации. Перед официальным продвижением сайта на российском рынке модель трансграничной передачи должна быть дополнительно проверена."
          ]
        },
        {
          title: "6. Срок действия и отзыв согласия",
          paragraphs: [
            "Согласие действует до достижения целей обработки или до его отзыва пользователем. Отозвать согласие можно, направив запрос на zhangguof1206@gmail.com. После отзыва мы прекратим обработку данных, если дальнейшее хранение не требуется по законным основаниям."
          ]
        }
      ]
    },
    cookies: {
      title: "Политика использования Cookie",
      lead:
        "Эта страница объясняет, какие технологии могут использоваться на сайте Sense и как пользователь может управлять ими.",
      updated: "Дата обновления: 16 июня 2026 г.",
      sections: [
        {
          title: "1. Текущий статус",
          paragraphs: [
            "В текущей версии сайт использует только необходимые технологии для отображения страниц, работы навигации, языкового переключателя, формы RFQ и сохранения выбора пользователя в cookie-уведомлении.",
            "На сайте пока не подключены рекламные пиксели или аналитические инструменты."
          ]
        },
        {
          title: "2. Если будет подключена аналитика",
          paragraphs: [
            "Если в будущем будет подключена Яндекс Метрика или другой аналитический инструмент, политика будет обновлена до запуска такого инструмента. Пользователю будет показано уведомление, а использование аналитики будет зависеть от выбранных настроек согласия."
          ]
        },
        {
          title: "3. Как управлять настройками",
          paragraphs: [
            "Пользователь может ограничить или удалить cookie и локальное хранилище через настройки браузера. Ограничение необходимых технологий может повлиять на работу отдельных функций сайта."
          ]
        }
      ]
    }
  },
  en: {
    privacy: {
      title: "Personal Data Processing Policy",
      lead:
        "This policy explains what data Sense / SINOETM TECH LTD receives through the website and RFQ form, why it is used and how users can contact us regarding data processing.",
      updated: "Last updated: June 16, 2026",
      sections: [
        {
          title: "1. Operator and contact information",
          paragraphs: [
            "Website operator: SINOETM TECH LTD, a trading company supplying measurement instruments and sensor solutions for industrial and professional applications.",
            "Website brand: Sense.",
            "Company address: South Mingzhu road, Zhuhai City, 519070, Guangdong province, China.",
            "Data contact email: zhangguof1206@gmail.com. Telegram: (+852) 6555 3946."
          ]
        },
        {
          title: "2. Data we receive",
          paragraphs: [
            "Through the RFQ form, a user may voluntarily submit the following information:"
          ],
          items: [
            "email address;",
            "name, company, country or city;",
            "phone number, WhatsApp or Telegram, if provided by the user;",
            "product model, quantity and application;",
            "message text and any other details voluntarily included in the request."
          ]
        },
        {
          title: "3. Purposes of processing",
          items: [
            "responding to user inquiries;",
            "preparing quotations and clarifying requirements;",
            "selecting suitable measurement instruments;",
            "sending technical information, PDF datasheets and related materials;",
            "continuing business communication related to the user request."
          ]
        },
        {
          title: "4. Legal basis",
          paragraphs: [
            "Data is processed based on the user's voluntary consent given when submitting the RFQ form. The form cannot be submitted without consent."
          ]
        },
        {
          title: "5. Transfer and storage",
          paragraphs: [
            "We do not sell contact data to third parties. RFQ data is accessed only by people involved in reviewing inquiries, preparing quotations and communicating with customers.",
            "During the test and first launch stage, the website may use Netlify infrastructure and Gmail. This means data may technically be processed or stored outside the Russian Federation. Before formal promotion in the Russian market, the storage and transfer model should be reviewed separately."
          ]
        },
        {
          title: "6. Retention",
          paragraphs: [
            "RFQ requests are retained for as long as needed to respond to the user, prepare a quotation, continue business communication and meet lawful obligations where applicable. A user may request correction or deletion of submitted data."
          ]
        },
        {
          title: "7. User rights",
          paragraphs: [
            "A user may request information about data processing, correction, restriction, deletion or withdrawal of consent by contacting zhangguof1206@gmail.com."
          ]
        },
        {
          title: "8. Updates",
          paragraphs: [
            "We may update this policy when the website structure, analytics tools, domain, email, hosting or company details change."
          ]
        }
      ]
    },
    consent: {
      title: "Personal Data Processing Consent",
      lead:
        "By submitting the RFQ form, the user confirms consent to personal data processing for responding to a product inquiry related to Sense.",
      updated: "Last updated: June 16, 2026",
      sections: [
        {
          title: "1. Consent recipient",
          paragraphs: [
            "Consent is given to SINOETM TECH LTD, operating this website under the Sense brand.",
            "Company address: South Mingzhu road, Zhuhai City, 519070, Guangdong province, China."
          ]
        },
        {
          title: "2. Data that may be processed",
          items: [
            "email address;",
            "name, company, country or city;",
            "phone number, WhatsApp or Telegram, if provided by the user;",
            "product model, quantity and application;",
            "message text and other details voluntarily submitted by the user."
          ]
        },
        {
          title: "3. Processing purposes",
          items: [
            "reviewing the RFQ request;",
            "preparing a response, quotation, PDF materials and technical consultation;",
            "selecting suitable equipment and clarifying application conditions;",
            "continuing business communication related to the user's request."
          ]
        },
        {
          title: "4. Processing actions",
          paragraphs: [
            "This consent covers collection, recording, organization, storage, clarification, use, transfer within working services, anonymization, blocking and deletion of data within the stated purposes."
          ]
        },
        {
          title: "5. Cross-border transfer",
          paragraphs: [
            "The user understands that when using the website, Netlify hosting, Gmail and other technical services, data may be transferred to and processed outside the Russian Federation. Before formal promotion in the Russian market, the cross-border transfer model should be reviewed separately."
          ]
        },
        {
          title: "6. Validity and withdrawal",
          paragraphs: [
            "Consent remains valid until the processing purposes are achieved or until it is withdrawn by the user. Consent can be withdrawn by contacting zhangguof1206@gmail.com. After withdrawal, we will stop processing the data unless further retention is required by lawful grounds."
          ]
        }
      ]
    },
    cookies: {
      title: "Cookie Policy",
      lead:
        "This page explains which technologies may be used on the Sense website and how users can manage them.",
      updated: "Last updated: June 16, 2026",
      sections: [
        {
          title: "1. Current status",
          paragraphs: [
            "The current website version uses only necessary technologies for page display, navigation, language switching, the RFQ form and saving the user's cookie notice choice.",
            "Advertising pixels and analytics tools are not currently installed on the website."
          ]
        },
        {
          title: "2. If analytics is added later",
          paragraphs: [
            "If Yandex Metrica or another analytics tool is added later, this policy will be updated before the tool is launched. A notice will be shown to the user, and analytics use will depend on the selected consent settings."
          ]
        },
        {
          title: "3. Managing settings",
          paragraphs: [
            "A user can restrict or delete cookies and local storage through browser settings. Limiting necessary technologies may affect certain website functions."
          ]
        }
      ]
    }
  }
};
