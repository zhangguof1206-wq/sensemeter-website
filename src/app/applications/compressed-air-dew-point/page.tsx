import Link from "next/link";
import { PageShell, ProductCard } from "@/components/site";
import { assetPath, products } from "@/data/catalog";
import { staticPageMetadata } from "@/lib/seo";

const pagePath = "/applications/compressed-air-dew-point";
const applicationImage = "/assets/application-gas-processing.png";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: pagePath,
  title: "Измеритель точки росы сжатого воздуха",
  description:
    "Измерители и датчики точки росы для сжатого воздуха, осушителей, пневмолиний и систем контроля качества газа. Подбор решения и запрос цены.",
  image: applicationImage
});

const recommendedSlugs = ["easidew-34-m12", "easidew-online", "sf82-online", "dmt143-dmt143l", "mdm300"];
const recommendedProducts = recommendedSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const rfqPoints = [
  "тип газа или сжатого воздуха",
  "рабочее давление",
  "диапазон точки росы",
  "требуемую точность",
  "место установки: линия, байпас или осушитель",
  "выходной сигнал и питание",
  "наличие дисплея или сигнализации",
  "количество и требования к документации"
];

const visualHighlights = [
  {
    icon: "dryer",
    title: "Осушители и пневмолинии",
    text: "Контроль сухости воздуха после адсорбционных и холодильных осушителей."
  },
  {
    icon: "dew",
    title: "Точка росы под давлением",
    text: "Измерение низкой влажности в рабочей линии или через пробоотбор."
  },
  {
    icon: "alarm",
    title: "Сигнал и тревоги",
    text: "Передача данных в систему контроля, локальный дисплей или сигнализация."
  }
] as const;

const processCards = [
  {
    title: "Среда и давление",
    text: "Укажите сжатый воздух, азот или другой газ, а также рабочее давление линии."
  },
  {
    title: "Диапазон точки росы",
    text: "Определите ожидаемый минимум и максимум, например для сухого воздуха после осушителя."
  },
  {
    title: "Монтаж и пробоотбор",
    text: "Выберите прямую установку, байпасную линию, фильтрацию и защиту сенсора."
  },
  {
    title: "Выход и контроль",
    text: "Нужен ли дисплей, реле, 4-20 mA, цифровой интерфейс или архивирование данных."
  }
] as const;

const solutionTypes = [
  "компактные датчики точки росы для OEM осушителей и пневмолиний",
  "онлайн-гигрометры точки росы с дисплеем и тревожными функциями",
  "промышленные передатчики для непрерывного контроля сухости воздуха",
  "портативные приборы для сервисной проверки и аудита осушителей",
  "решения для низкой влажности, сжатого воздуха и сухих технологических газов"
];

const faqs = [
  {
    question: "Зачем измерять точку росы в сжатом воздухе?",
    answer:
      "Точка росы показывает, насколько сухой воздух поступает в систему. Контроль помогает защитить пневмооборудование, осушители, клапаны, трубопроводы и технологические процессы от влаги и конденсата."
  },
  {
    question: "Где лучше устанавливать датчик точки росы?",
    answer:
      "Часто датчик устанавливают после осушителя, в байпасной пробоотборной линии или в контрольной точке распределительной сети. Важно обеспечить стабильный поток, фильтрацию и подходящее давление."
  },
  {
    question: "Чем отличается онлайн-гигрометр от портативного анализатора?",
    answer:
      "Онлайн-гигрометр подходит для постоянного мониторинга и сигнализации, а портативный анализатор удобен для проверки нескольких точек, сервиса и периодического контроля."
  },
  {
    question: "Какие данные нужны для подбора модели?",
    answer:
      "Нужно указать газ, давление, ожидаемый диапазон точки росы, способ установки, требования к выходному сигналу, наличие дисплея или сигнализации и условия эксплуатации."
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
      {name === "dryer" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16v10H4z" />
          <path d="M7 10h10" />
          <path d="M7 14h6" />
          <path d="M3 12H1" />
          <path d="M23 12h-2" />
        </svg>
      ) : null}
      {name === "dew" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3s5 6 5 10a5 5 0 0 1-10 0c0-4 5-10 5-10z" />
          <path d="M9 17h6" />
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
    <PageShell locale="ru" active="catalog" languagePath="/en/applications/compressed-air-dew-point">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      <section
        className="bg-cover bg-center px-5 py-20 text-white md:px-10 md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,31,42,.94), rgba(20,31,42,.56)), url('/assets/application-gas-processing.png')"
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Compressed air dew point</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Контроль точки росы сжатого воздуха</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">
            Датчики, измерители и онлайн-анализаторы точки росы для осушителей, пневмолиний, сухих газов и систем контроля качества сжатого воздуха.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contact?application=compressed-air-dew-point">
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
              <h2 className="text-2xl font-black leading-tight md:text-3xl">Где нужен измеритель точки росы</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">
                В системах сжатого воздуха влажность может приводить к конденсату, коррозии, отказам клапанов и нестабильной работе оборудования. Контроль точки росы помогает оценить эффективность осушителя и поддерживать требуемую сухость воздуха в линии.
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
                  <h2 className="text-2xl font-black">Как выбрать прибор точки росы</h2>
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
                <img className="h-56 w-full object-cover" src={assetPath("assets/application-gas-processing.png")} alt="Compressed air dew point monitoring in an industrial pipeline" />
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
                Эти модели подходят для контроля точки росы в сжатом воздухе, осушителях, сухих газах и сервисных проверках.
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
            <img className="h-48 w-full object-cover" src={assetPath("assets/application-compressed-air-user.png")} alt="Dew point instrument selection for compressed air systems" />
            <div className="p-7">
              <h2 className="text-2xl font-black">Подобрать прибор по параметрам</h2>
              <p className="mt-3 text-muted">
                Укажите газ, давление, диапазон точки росы и способ установки. Мы поможем сопоставить параметры с подходящими моделями.
              </p>
              <Link className="btn btn-primary mt-5 w-full" href="/contact?application=compressed-air-dew-point">
                Отправить параметры
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
