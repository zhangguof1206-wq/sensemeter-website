import Link from "next/link";
import { PageShell, ProductCard } from "@/components/site";
import { assetPath, products } from "@/data/catalog";
import { staticPageMetadata } from "@/lib/seo";

const pagePath = "/applications/industrial-humidity-monitoring";
const applicationImage = "/assets/application-industrial-humidity-monitoring-v2.png";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: pagePath,
  title: "Промышленные датчики температуры и влажности",
  description:
    "Датчики и преобразователи температуры и влажности для промышленных процессов, камер, воздуховодов и технических систем. Подбор решения и запрос цены.",
  image: applicationImage
});

const recommendedSlugs = ["hc2a-series", "hc2a-industrial", "hygroflex1", "hmt310", "hmt370ex"];
const recommendedProducts = recommendedSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is (typeof products)[number] => Boolean(product));

const selectionPoints = [
  "диапазон температуры и влажности",
  "тип среды: воздух, технологический газ, камера или воздуховод",
  "способ установки: настенный, канальный, зондовый или встроенный",
  "выходной сигнал: аналоговый, цифровой или интерфейсный",
  "требования к точности, стабильности и калибровке",
  "условия эксплуатации: пыль, конденсат, химические пары, давление или опасная зона"
];

const solutionTypes = [
  "датчики влажности и температуры для стандартного мониторинга",
  "промышленные зонды для воздуховодов, камер и технологических установок",
  "преобразователи влажности и температуры с выходным сигналом для систем управления",
  "портативные приборы для проверки, настройки и сервисного контроля",
  "решения для сложных условий эксплуатации"
];

const rfqPoints = [
  "измеряемую среду",
  "диапазон температуры",
  "диапазон влажности",
  "требуемую точность",
  "условия монтажа",
  "необходимый выходной сигнал",
  "количество",
  "требования к сертификатам или документации"
];

const visualHighlights = [
  {
    icon: "sensor",
    title: "Датчик + передатчик",
    text: "Измерение влажности и температуры с передачей сигнала в систему контроля."
  },
  {
    icon: "duct",
    title: "Камеры и воздуховоды",
    text: "Подбор зондов для климатических камер, вентиляции и технических помещений."
  },
  {
    icon: "signal",
    title: "Промышленный выход",
    text: "Аналоговые и цифровые сигналы для PLC, SCADA и локального мониторинга."
  }
] as const;

const processCards = [
  {
    title: "Среда измерения",
    text: "Воздух, технологический газ, камера, склад или вентиляционный канал."
  },
  {
    title: "Условия монтажа",
    text: "Настенный блок, зонд, канал, кабель, питание и удобство обслуживания."
  },
  {
    title: "Сигнал и точность",
    text: "Диапазон влажности, температура, требуемая точность и формат выхода."
  },
  {
    title: "Документация",
    text: "Калибровка, сертификаты, инструкции и требования к поставке."
  }
] as const;

const faqs = [
  {
    question: "Чем отличается датчик влажности от преобразователя влажности?",
    answer:
      "Датчик измеряет влажность, а преобразователь обычно передает измеренный сигнал в систему управления или мониторинга. В промышленности часто используются преобразователи с аналоговым или цифровым выходом."
  },
  {
    question: "Какой датчик подходит для воздуховода?",
    answer:
      "Для воздуховодов обычно выбирают зондовые или канальные датчики с подходящей длиной зонда, диапазоном температуры и стабильностью измерения."
  },
  {
    question: "Можно ли использовать один прибор для температуры и влажности?",
    answer:
      "Да. Многие промышленные датчики измеряют одновременно температуру и относительную влажность, а также могут использоваться для расчета дополнительных параметров."
  },
  {
    question: "Какие данные нужны для подбора модели?",
    answer:
      "Нужно указать среду, диапазон температуры и влажности, требуемую точность, способ монтажа, выходной сигнал и условия эксплуатации."
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

function IndustrialIcon({ name }: { name: (typeof visualHighlights)[number]["icon"] }) {
  return (
    <span className="grid h-12 w-12 place-items-center rounded bg-white text-accent shadow-sm ring-1 ring-line" aria-hidden="true">
      {name === "sensor" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 4h10v6H7z" />
          <path d="M12 10v10" />
          <path d="M9 20h6" />
          <path d="M9 7h6" />
        </svg>
      ) : null}
      {name === "duct" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h18" />
          <path d="M3 16h18" />
          <path d="M7 8v8" />
          <path d="M17 8v8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ) : null}
      {name === "signal" ? (
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 18h3" />
          <path d="M10 18h3" />
          <path d="M16 18h4" />
          <path d="M6 18V9" />
          <path d="M12 18V5" />
          <path d="M18 18v-7" />
        </svg>
      ) : null}
    </span>
  );
}

export default function Page() {
  return (
    <PageShell locale="ru" active="catalog" languagePath="/en/applications/industrial-humidity-monitoring">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />

      <section
        className="bg-cover bg-center px-5 py-20 text-white md:px-10 md:py-24"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(20,31,42,.94), rgba(20,31,42,.56)), url('/assets/application-industrial-humidity-monitoring-v2.png')"
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Industrial humidity monitoring</p>
          <h1 className="max-w-5xl text-4xl font-black leading-tight md:text-6xl">Промышленный контроль температуры и влажности</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100 md:text-xl">
            Датчики, зонды и преобразователи температуры и влажности для производственных процессов, климатических камер,
            воздуховодов, чистых помещений и технических систем.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn btn-primary" href="/contact?application=industrial-humidity-monitoring">
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
              <h2 className="text-2xl font-black leading-tight md:text-3xl">Где применяются датчики температуры и влажности</h2>
              <p className="mt-4 max-w-4xl text-lg leading-8 text-muted">
                Подбор датчика зависит от среды, диапазона измерения, способа монтажа и выходного сигнала. Для промышленных задач важны точность, стабильность, сервис, калибровка и совместимость с системой контроля.
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
                <IndustrialIcon name={item.icon} />
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
                  <h2 className="text-2xl font-black">Как выбрать промышленный датчик</h2>
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
                <img className="h-56 w-full object-cover" src={assetPath("assets/application-industrial-humidity-monitoring-v2.png")} alt="Industrial humidity sensors in a process environment" />
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
                Ниже представлены модели, которые подходят для задач промышленного мониторинга температуры и влажности.
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
            <img className="h-48 w-full object-cover" src={assetPath("assets/application-humidity-lab-user.png")} alt="Laboratory humidity sensor selection" />
            <div className="p-7">
              <h2 className="text-2xl font-black">Подобрать модель по параметрам</h2>
              <p className="mt-3 text-muted">
                Укажите среду, диапазон, точность и способ монтажа. Мы поможем сопоставить параметры с подходящими моделями.
              </p>
              <Link className="btn btn-primary mt-5 w-full" href="/contact?application=industrial-humidity-monitoring">
                Отправить параметры
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}






