import Link from "next/link";
import { PageShell, ProductCard } from "@/components/site";
import { assetPath, products } from "@/data/catalog";
import { staticPageMetadata } from "@/lib/seo";

const pagePath = "/applications/natural-gas-moisture-monitoring";
const applicationImage = "/assets/application-gas-processing.png";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: pagePath,
  title: "Измерение точки росы и влажности газа",
  description:
    "Датчики и анализаторы точки росы для природного газа, технологических газов, трубопроводов и газоподготовки. Подбор решения и запрос цены.",
  image: applicationImage
});

const recommendedSlugs = ["easidew-pro-is", "easidew-pro-xp", "optidew-hz", "mdm300", "easidew-online"];
const recommendedProducts = recommendedSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const rfqPoints = [
  "тип газа: природный газ, водород, азот или технологическая смесь",
  "рабочее давление и температуру",
  "ожидаемый диапазон точки росы",
  "требуемую точность и стабильность",
  "точку установки или пробоотборную систему",
  "требования к опасной зоне и сертификатам",
  "выходной сигнал и питание",
  "количество и требования к документации"
];

const visualHighlights = [
  {
    icon: "pipeline",
    title: "Газовые трубопроводы",
    text: "Контроль влаги и точки росы в линиях природного газа и технологических газов."
  },
  {
    icon: "sample",
    title: "Пробоотбор газа",
    text: "Стабильные измерения через подготовку пробы, фильтрацию и контроль расхода."
  },
  {
    icon: "atex",
    title: "Опасные зоны",
    text: "Подбор решений с учетом взрывоопасных участков, давления и требований к корпусу."
  }
] as const;

const processCards = [
  {
    title: "Газ и давление",
    text: "Укажите состав газа, давление линии, температуру и возможные примеси."
  },
  {
    title: "Диапазон точки росы",
    text: "Определите рабочий диапазон влаги: ppmV, точка росы или другие параметры."
  },
  {
    title: "Установка",
    text: "Выберите прямой монтаж, байпас, пробоотборную линию или систему подготовки газа."
  },
  {
    title: "Безопасность",
    text: "Проверьте требования к ATEX, IECEx, давлению, материалам и документации."
  }
] as const;

const solutionTypes = [
  "искробезопасные датчики точки росы для природного и технологического газа",
  "анализаторы влажности для трубопроводов, газоподготовки и компрессорных станций",
  "онлайн-контроль точки росы с дисплеем, сигнализацией и промышленным выходом",
  "портативные приборы для сервисной проверки нескольких точек измерения",
  "решения для низкой влажности, высокого давления и сложных газовых сред"
];

const faqs = [
  {
    question: "Зачем измерять точку росы в природном газе?",
    answer:
      "Контроль точки росы помогает снизить риск конденсации, коррозии, образования гидратов и нестабильной работы оборудования. Это важно для трубопроводов, газоподготовки и технологических газовых систем."
  },
  {
    question: "Можно ли ставить датчик прямо в газовую линию?",
    answer:
      "Это зависит от давления, температуры, состава газа и требований безопасности. В ряде случаев используют прямой монтаж, но часто предпочтительна пробоотборная линия с фильтрацией и контролем расхода."
  },
  {
    question: "Какие приборы подходят для опасных зон?",
    answer:
      "Для взрывоопасных участков подбирают приборы с соответствующими сертификатами и конструкцией. Важно заранее указать классификацию зоны, давление, газ и условия установки."
  },
  {
    question: "Какие данные нужны для подбора модели?",
    answer:
      "Нужно указать тип газа, давление, температуру, диапазон точки росы, способ установки, требования к выходному сигналу, сертификатам и документации."
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
      {name === "pipeline" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 10h18" />
          <path d="M3 14h18" />
          <path d="M7 7v10" />
          <path d="M17 7v10" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ) : null}
      {name === "sample" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 6h14" />
          <path d="M8 6v6a4 4 0 0 0 8 0V6" />
          <path d="M10 18h4" />
          <path d="M12 18v3" />
        </svg>
      ) : null}
      {name === "atex" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3 3 20h18L12 3z" />
          <path d="M12 9v5" />
          <path d="M12 17h.01" />
        </svg>
      ) : null}
    </span>
  );
}

export default function Page() {
  return (
    <PageShell locale="ru" active="catalog" languagePath="/en/applications/natural-gas-moisture-monitoring">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\u003c") }} />

      <section
        className="bg-cover bg-center px-5 py-20 text-white md:px-10 md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,31,42,.94), rgba(20,31,42,.56)), url('/assets/application-gas-processing.png')"
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Gas moisture monitoring</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Измерение точки росы и влажности газа</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">
            Датчики, анализаторы и измерители точки росы для природного газа, технологических газов, трубопроводов, газоподготовки и промышленных процессов.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contact?application=natural-gas-moisture-monitoring">
              Запросить предложение
            </Link>
            <a className="btn btn-secondary" href="#recommended-products">
              Смотреть приборы
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-narrow space-y-6">
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <section className="card p-7">
              <p className="eyebrow !text-slate-400">Application overview</p>
              <h2 className="text-2xl font-black leading-tight md:text-3xl">Где нужен контроль влажности газа</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">
                Влага в природном и технологическом газе может вызывать конденсацию, коррозию, образование гидратов и проблемы с качеством продукта. Подбор прибора зависит от состава газа, давления, точки установки, требований к безопасности и точности.
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
                  <h2 className="text-2xl font-black">Как выбрать прибор для газа</h2>
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
                <img
                  className="h-56 w-full object-cover"
                  src={assetPath("assets/application-natural-gas-inline.png")}
                  alt="Natural gas dew point monitoring in a pipeline"
                  style={{ objectPosition: "52% 44%" }}
                />
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
                Эти модели подходят для контроля точки росы и влажности в природном газе, технологических газах, трубопроводах и сложных условиях эксплуатации.
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
            <img className="h-48 w-full object-cover" src={assetPath("assets/application-natural-gas-cta.png")} alt="Natural gas moisture analyzer selection" />
            <div className="p-7">
              <h2 className="text-2xl font-black">Подобрать прибор по параметрам</h2>
              <p className="mt-3 text-muted">
                Укажите газ, давление, диапазон точки росы, место установки и требования к безопасности. Мы поможем выбрать подходящую модель.
              </p>
              <Link className="btn btn-primary mt-5 w-full" href="/contact?application=natural-gas-moisture-monitoring">
                Отправить параметры
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
