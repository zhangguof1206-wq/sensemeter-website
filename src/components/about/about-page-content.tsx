import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { aboutContent } from "@/data/about";
import { localizedPath } from "@/lib/i18n";

export function AboutPageContent({ locale }: { locale: Locale }) {
  const content = aboutContent[locale];

  return (
    <main className="about-page">
      <section className="about-hero">
        <Image
          className="about-hero-image"
          src="/assets/about/laboratory-equipment.jpg"
          alt={locale === "ru" ? "Промышленное лабораторное оборудование" : "Industrial laboratory equipment"}
          fill
          priority
          sizes="100vw"
        />
        <div className="about-hero-overlay" />
        <div className="section-narrow about-hero-content">
          <p className="about-eyebrow about-eyebrow-light">{content.heroEyebrow}</p>
          <h1>{content.heroTitle}</h1>
          <p className="about-hero-lead">{content.heroLead}</p>
        </div>
      </section>

      <section className="about-section about-page-section">
        <div className="section-narrow">
          <div className="about-intro-grid">
            <div>
              <p className="about-eyebrow">{content.introEyebrow}</p>
              <h2>{content.introTitle}</h2>
            </div>
            <p className="about-intro-copy">{content.introBody}</p>
          </div>

          <div className="about-domain-grid">
            {content.domains.map((domain, index) => (
              <article className="about-domain" key={domain.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{domain.title}</h3>
                <p>{domain.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-support-band about-page-section">
        <div className="section-narrow">
          <div className="about-support-heading">
            <div>
              <p className="about-eyebrow about-eyebrow-light">{content.supportEyebrow}</p>
              <h2>{content.supportTitle}</h2>
            </div>
            <p>{content.supportBody}</p>
          </div>

          <div className="about-support-steps">
            {content.supportSteps.map((step, index) => (
              <article className="about-support-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-environments about-page-section">
        <div className="section-narrow">
          <div className="about-environments-heading">
            <div>
              <p className="about-eyebrow">{content.environmentsEyebrow}</p>
              <h2>{content.environmentsTitle}</h2>
            </div>
            <p>{content.stockDisclosure}</p>
          </div>

          <div className="about-environment-grid">
            {content.environments.map((environment, index) => (
              <article className={`about-environment about-environment-${index + 1}`} key={environment.title}>
                <Image src={environment.image} alt={environment.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" />
                <div className="about-environment-copy">
                  <h3>{environment.title}</h3>
                  <p>{environment.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-rfq-band about-page-section">
        <div className="section-narrow about-rfq-grid">
          <div>
            <p className="about-eyebrow">{content.rfqEyebrow}</p>
            <h2>{content.rfqTitle}</h2>
            <p>{content.rfqBody}</p>
          </div>
          <Link className="btn btn-primary about-rfq-action" href={localizedPath(locale, "/contact")}>
            {content.rfqAction} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
