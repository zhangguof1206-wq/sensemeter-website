import Link from "next/link";
import { PageShell, ProductCard } from "@/components/site";
import { assetPath, products } from "@/data/catalog";
import { staticPageMetadata } from "@/lib/seo";

const pagePath = "/applications/glove-box-oxygen-analysis";
const applicationImage = "/assets/application-gas-manufacturing.png";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: pagePath,
  title: "Анализатор кислорода для перчаточных боксов",
  description:
    "Кислородные анализаторы для перчаточных боксов, инертных газов, генераторов, печей и производственных линий. Подбор GPR решений и запрос цены.",
  image: applicationImage
});

const recommendedSlugs = ["gpr-1500", "gpr-1900-2900", "gpr-1500gb-2500gb", "gpr-1600-2600-3100", "gpr-1000-1100-2000-3500"];
const recommendedProducts = recommendedSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const rfqPoints = [
  "измеряемый газ или газовая смесь",
  "ожидаемый диапазон O2",
  "требуемую точность",
  "точку установки или пробоотбор",
  "давление и расход пробы",
  "нужен ли дисплей или сигнализация",
  "выходной сигнал и питание",
  "количество и требования к документации"
];

const visualHighlights = [
  {
    icon: "glovebox",
    title: "Перчаточные боксы",
    text: "Контроль остаточного кислорода в инертной атмосфере для защиты образцов и процессов."
  },
  {
    icon: "gas",
    title: "Инертные и промышленные газы",
    text: "Мониторинг кислорода в азоте, аргоне, водороде и технологических газовых линиях."
  },
  {
    icon: "alarm",
    title: "Сигналы и аварии",
    text: "Передача показаний O2 в систему контроля, локальную индикацию или тревожные реле."
  }
] as const;

const processCards = [
  {
    title: "Газовая среда",
    text: "Укажите газ, фоновые компоненты, наличие влаги и возможные примеси."
  },
  {
    title: "Диапазон O2",
    text: "Определите ppm, проценты или следовые концентрации кислорода для контроля."
  },
  {
    title: "Пробоотбор",
    text: "Опишите точку отбора, расход, давление, фильтрацию и требования к линии пробы."
  },
  {
    title: "Интеграция",
    text: "Нужны ли дисплей, реле, 4-20 mA, цифровой интерфейс или журналирование."
  }
] as const;

const solutionTypes = [
  "анализаторы кислорода для перчаточных боксов и инертных атмосфер",
  "онлайн-контроль O2 для генераторов газа и производственных линий",
  "портативные и стационарные решения для проверки качества газа",
  "анализаторы для следовых концентраций кислорода в технологических газах",
  "системы с дисплеем, сигнализацией и промышленным выходом"
];

const faqs = [
  {
    question: "Зачем контролировать кислород в перчаточном боксе?",
    answer:
      "Даже небольшое содержание кислорода может влиять на чувствительные материалы, химические реакции, сварочные процессы и хранение образцов. Анализатор помогает поддерживать стабильную инертную атмосферу."
  },
  {
    question: "Какой диапазон измерения O2 выбрать?",
    answer:
      "Диапазон зависит от процесса. Для контроля чистоты инертной атмосферы часто важны ppm или низкие значения кислорода, а для общих газовых процессов могут использоваться процентные диапазоны."
  },
  {
    question: "Нужен ли пробоотбор для кислородного анализатора?",
    answer:
      "Во многих промышленных задачах используется пробоотборная линия с контролем расхода и фильтрацией. Это помогает защитить сенсор и получить стабильные измерения."
  },
  {
    question: "Какие данные нужны для подбора модели?",
    answer:
      "Нужно указать газовую среду, диапазон O2, давление, расход пробы, точку установки, требования к сигналу, дисплею, сигнализации и документации."
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

function ApplicationIcon({ name }: { name: (typeof visualHighlights)[number]["icon"] }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded bg-white text-accent shadow-sm ring-1 ring-line" aria-hidden="true">
      {name === "glovebox" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 5h16v14H4z" />
          <path d="M8 5v14" />
          <path d="M16 5v14" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ) : null}
      {name === "gas" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3h8" />
          <path d="M10 3v4" />
          <path d="M14 3v4" />
          <path d="M7 7h10v14H7z" />
          <path d="M10 11h4" />
          <path d="M10 15h4" />
        </svg>
      ) : null}
      {name === "alarm" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 8a6 6 0 0 1 12 0v5l2 3H4l2-3z" />
          <path d="M10 20h4" />
          <path d="M12 8v4" />
        </svg>
      ) : null}
    </span>
  );
}

export default function Page() {
  return (
    <PageShell locale="ru" active="catalog" languagePath="/en/applications/glove-box-oxygen-analysis">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      <section
        className="bg-cover bg-center px-5 py-20 text-white md:px-10 md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,31,42,.94), rgba(20,31,42,.56)), url('/assets/application-gas-manufacturing.png')"
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Oxygen analysis</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Анализ кислорода для перчаточных боксов и газовых систем</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">
            Кислородные анализаторы для инертных атмосфер, перчаточных боксов, генераторов, печей, промышленных газов и производственных линий.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contact?application=glove-box-oxygen-analysis">
              Запросить предложение
            </Link>
            <a className="btn btn-secondary" href="#recommended-products">
              Смотреть анализаторы
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow space-y-6">
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <section className="card p-7">
              <p className="eyebrow !text-slate-400">Application overview</p>
              <h2 className="text-2xl font-black leading-tight md:text-3xl">Где применяются кислородные анализаторы</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">
                Контроль кислорода нужен там, где качество газа влияет на безопасность, стабильность процесса и защиту продукции. Для перчаточных боксов, инертных атмосфер и газовых линий важно заранее определить диапазон O2, условия пробоотбора и формат передачи сигнала.
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
                  <h2 className="text-2xl font-black">Как выбрать анализатор O2</h2>
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
                <img className="h-56 w-full object-cover" src={assetPath("assets/application-gas-manufacturing.png")} alt="Oxygen analysis for industrial gas systems" />
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
              <h2 className="text-3xl font-black">Рекомендуемые анализаторы</h2>
              <p className="mt-3 max-w-3xl text-muted">
                Эти модели подходят для контроля кислорода в перчаточных боксах, генераторах газа, инертных атмосферах и промышленных газовых линиях.
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
            <img className="h-48 w-full object-cover" src={assetPath("assets/application-glove-box-user.png")} alt="Oxygen analyzer selection for glove box applications" />
            <div className="p-7">
              <h2 className="text-2xl font-black">Подобрать анализатор по параметрам</h2>
              <p className="mt-3 text-muted">
                Укажите газовую среду, диапазон O2, давление, расход и требования к сигналу. Мы поможем выбрать подходящую модель.
              </p>
              <Link className="btn btn-primary mt-5 w-full" href="/contact?application=glove-box-oxygen-analysis">
                Отправить параметры
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}