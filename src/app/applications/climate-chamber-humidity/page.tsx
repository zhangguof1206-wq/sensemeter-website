import Link from "next/link";
import { PageShell, ProductCard } from "@/components/site";
import { assetPath, products } from "@/data/catalog";
import { staticPageMetadata } from "@/lib/seo";

const pagePath = "/applications/climate-chamber-humidity";
const applicationImage = "/assets/application-climate-chamber-lab.png";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: pagePath,
  title: "Датчики влажности для климатических камер и лабораторий",
  description:
    "Решения для точного измерения влажности и температуры в лабораториях, климатических камерах, испытательных установках и чистых помещениях.",
  image: applicationImage
});

const recommendedSlugs = ["hmp3-hmpx", "hc2a-series", "hp31-hp32", "hmt310", "hygroflex1"];
const recommendedProducts = recommendedSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const selectionPoints = [
  "тип камеры: климатическая, испытательная, лабораторная или чистое помещение",
  "диапазон температуры и влажности, включая нижние и верхние пределы",
  "требуемая точность, повторяемость и стабильность измерения",
  "способ установки: зонд в камере, настенный датчик или переносной прибор",
  "выходной сигнал для регистратора, ПЛК, BMS или локального контроля",
  "периодичность калибровки, документация и требования к поверке"
];

const solutionTypes = [
  "зонды влажности и температуры для климатических камер",
  "лабораторные датчики для мониторинга условий испытаний",
  "портативные приборы для проверки нескольких точек измерения",
  "преобразователи с аналоговым или цифровым выходом для систем контроля",
  "решения для чистых помещений, фармацевтики и испытательных стендов"
];

const rfqPoints = [
  "тип камеры или лабораторной зоны",
  "диапазон температуры",
  "диапазон влажности",
  "требуемая точность",
  "точка установки датчика",
  "выходной сигнал",
  "нужна ли калибровка или сертификат"
];

const visualHighlights = [
  {
    title: "Климатические камеры",
    text: "Контроль влажности и температуры при испытаниях материалов, электроники и компонентов.",
    icon: "chamber"
  },
  {
    title: "Лабораторный контроль",
    text: "Стабильные измерения для проверки условий, регистрации данных и повторяемых испытаний.",
    icon: "lab"
  },
  {
    title: "Зонды и регистраторы",
    text: "Подбор датчиков, переносных приборов и передатчиков под систему сбора данных.",
    icon: "probe"
  }
];

const processCards = [
  {
    title: "Задача испытаний",
    text: "Опишите материал, образец или процесс, для которого нужно контролировать влажность и температуру."
  },
  {
    title: "Диапазон и точность",
    text: "Укажите рабочий диапазон, допустимую погрешность и требования к стабильности показаний."
  },
  {
    title: "Монтаж датчика",
    text: "Выберите зонд для камеры, настенный датчик, переносной прибор или подключение к регистратору."
  },
  {
    title: "Документы",
    text: "Проверьте необходимость калибровочного сертификата, протоколов и технической документации."
  }
];

const faqs = [
  {
    question: "Какой датчик влажности подходит для климатической камеры?",
    answer:
      "Обычно выбирают зонд или датчик с подходящим температурным диапазоном, стабильностью и возможностью вывода сигнала на регистратор или систему управления."
  },
  {
    question: "Нужен ли отдельный датчик температуры?",
    answer:
      "Многие лабораторные датчики одновременно измеряют относительную влажность и температуру. Это удобно для контроля условий и расчета дополнительных параметров."
  },
  {
    question: "Можно ли использовать переносной прибор вместо стационарного датчика?",
    answer:
      "Переносной прибор удобен для проверки нескольких точек и сервисного контроля, но для постоянного мониторинга лучше использовать стационарный датчик или передатчик."
  },
  {
    question: "Какие данные нужны для подбора модели?",
    answer:
      "Нужно указать тип камеры или помещения, диапазон температуры и влажности, точность, способ установки, выходной сигнал и требования к калибровке."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

function ApplicationIcon({ name }: { name: string }) {
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded border border-line bg-white text-accent">
      {name === "chamber" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      ) : null}
      {name === "lab" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3v6l-4 8a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-4-8V3" />
          <path d="M8 3h8" />
          <path d="M7 16h10" />
        </svg>
      ) : null}
      {name === "probe" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v11" />
          <path d="M9 14h6" />
          <path d="M10 18h4" />
          <path d="M8 21h8" />
          <path d="M16 6h4" />
          <path d="M4 6h4" />
        </svg>
      ) : null}
    </span>
  );
}

export default function Page() {
  return (
    <PageShell locale="ru" active="catalog" languagePath="/en/applications/climate-chamber-humidity">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\u003c") }} />

      <section
        className="bg-cover bg-center px-5 py-20 text-white md:px-10 md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,31,42,.94), rgba(20,31,42,.52)), url('/assets/application-climate-chamber-lab.png')"
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Laboratory and climate chambers</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Измерение влажности в лабораториях и климатических камерах</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">
            Датчики, зонды и портативные приборы для контроля влажности и температуры в климатических камерах,
            лабораториях, чистых помещениях и испытательных установках.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contact?application=climate-chamber-humidity">
              Запросить предложение
            </Link>
            <a className="btn btn-secondary" href="#recommended-products">
              Смотреть решения
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow space-y-6">
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <section className="card p-7">
              <p className="eyebrow !text-slate-400">Application overview</p>
              <h2 className="text-2xl font-black leading-tight md:text-3xl">Где нужен контроль влажности и температуры</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">
                Для лабораторных испытаний и климатических камер важны стабильность, повторяемость и точность.
                Подбор прибора зависит от диапазона измерения, места установки, требований к калибровке и способа регистрации данных.
              </p>
            </section>

            <aside className="card p-7">
              <p className="eyebrow !text-slate-400">RFQ checklist</p>
              <h2 className="text-2xl font-black">Что указать в запросе</h2>
              <ul className="mt-5 grid gap-x-4 gap-y-2 text-sm text-muted grid-cols-1">
                {rfqPoints.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            {visualHighlights.map((item) => (
              <div className="card flex h-full gap-4 p-5" key={item.title}>
                <ApplicationIcon name={item.icon} />
                <div>
                  <h3 className="text-lg font-black leading-tight">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="card overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.1fr]">
              <div>
                <div className="bg-[#17212b] p-7 text-white">
                  <p className="eyebrow">Selection path</p>
                  <h2 className="text-2xl font-black">Как выбрать датчик для камеры</h2>
                </div>
                <div className="grid gap-px bg-line sm:grid-cols-2">
                  {processCards.map((item, index) => (
                    <div className="bg-white p-5" key={item.title}>
                      <span className="grid h-9 w-9 place-items-center rounded bg-accent text-sm font-black text-white">{index + 1}</span>
                      <h3 className="mt-4 font-black">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-line bg-white lg:border-l lg:border-t-0">
                <img className="h-56 w-full object-cover" src={assetPath("assets/application-climate-chamber-inline.png")} alt="Climate chamber humidity and temperature measurement" />
                <div className="p-7">
                  <h2 className="text-2xl font-black">Какие решения подходят</h2>
                  <div className="mt-5 grid gap-3">
                    {solutionTypes.slice(0, 4).map((item) => (
                      <div className="flex gap-3 rounded border border-line bg-[#f7fafc] p-3 text-sm text-muted" key={item}>
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="section bg-[#e9eef4]" id="recommended-products">
        <div className="section-narrow">
          <p className="eyebrow !text-slate-400">Recommended products</p>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">Рекомендуемые приборы</h2>
              <p className="mt-3 max-w-3xl text-muted">
                Ниже представлены модели, которые подходят для лабораторных задач, климатических камер и контроля условий испытаний.
              </p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.slug} locale="ru" product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="card p-7">
            <p className="eyebrow !text-slate-400">FAQ</p>
            <h2 className="text-3xl font-black">Частые вопросы</h2>
            <div className="mt-6 divide-y divide-line">
              {faqs.map((item) => (
                <section className="py-5 first:pt-0 last:pb-0" key={item.question}>
                  <h3 className="text-lg font-black">{item.question}</h3>
                  <p className="mt-2 text-muted">{item.answer}</p>
                </section>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden lg:sticky lg:top-24">
            <img className="h-48 w-full object-cover" src={assetPath("assets/application-climate-chamber-lab.png")} alt="Laboratory humidity instrument selection" />
            <div className="p-7">
              <h2 className="text-2xl font-black">Подобрать модель по параметрам</h2>
              <p className="mt-3 text-muted">
                Укажите тип камеры, диапазон, точность и требования к калибровке. Мы поможем выбрать подходящий прибор.
              </p>
              <Link className="btn btn-primary mt-5 w-full" href="/contact?application=climate-chamber-humidity">
                Отправить параметры
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
