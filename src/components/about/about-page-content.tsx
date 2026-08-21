import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/catalog";
import { aboutContent } from "@/data/about";
import { localizedPath } from "@/lib/i18n";
import { AboutRevealObserver } from "@/components/about/about-reveal-observer";

export function AboutPageContent({ locale }: { locale: Locale }) {
  const content = aboutContent[locale];

  return (
    <div className="about-page">
      <AboutRevealObserver />
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
          <p className="about-eyebrow about-eyebrow-light" data-about-reveal>{content.heroEyebrow}</p>
          <h1 className="about-reveal-delay-1" data-about-reveal>{content.heroTitle}</h1>
          <p className="about-hero-lead about-reveal-delay-2" data-about-reveal>{content.heroLead}</p>
        </div>
      </section>

      <section className="about-section about-page-section">
        <div className="section-narrow">
          <div className="about-intro-grid">
            <div data-about-reveal>
              <p className="about-eyebrow">{content.introEyebrow}</p>
              <h2>{content.introTitle}</h2>
            </div>
            <p className="about-intro-copy about-reveal-delay-1" data-about-reveal>{content.introBody}</p>
          </div>

          <div className="about-domain-grid">
            {content.domains.map((domain, index) => (
              <article className={`about-domain about-reveal-delay-${index}`} data-about-reveal key={domain.title}>
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
            <div data-about-reveal>
              <p className="about-eyebrow about-eyebrow-light">{content.supportEyebrow}</p>
              <h2>{content.supportTitle}</h2>
            </div>
            <p className="about-reveal-delay-1" data-about-reveal>{content.supportBody}</p>
          </div>

          <div className="about-support-steps">
            {content.supportSteps.map((step, index) => (
              <article className={`about-support-step about-reveal-delay-${index}`} data-about-reveal key={step.title}>
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
            <div data-about-reveal>
              <p className="about-eyebrow">{content.environmentsEyebrow}</p>
              <h2>{content.environmentsTitle}</h2>
            </div>
            <p className="about-reveal-delay-1" data-about-reveal>{content.environmentsLead}</p>
          </div>

          <div className="about-environment-grid">
            {content.environments.map((environment, index) => (
              <article className={`about-environment about-environment-${index + 1} about-reveal-delay-${index}`} data-about-reveal key={environment.title}>
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
          <div data-about-reveal>
            <p className="about-eyebrow">{content.rfqEyebrow}</p>
            <h2>{content.rfqTitle}</h2>
            <p>{content.rfqBody}</p>
          </div>
          <Link className="btn btn-primary about-rfq-action about-reveal-delay-1" data-about-reveal href={localizedPath(locale, "/contact")}>
            {content.rfqAction} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
