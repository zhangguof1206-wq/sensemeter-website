import { PageShell } from "@/components/site";
import { ApplicationFaq } from "@/components/applications/application-faq";
import { ApplicationHero } from "@/components/applications/application-hero";
import { ApplicationProducts } from "@/components/applications/application-products";
import { ApplicationScenarios } from "@/components/applications/application-scenarios";
import { ApplicationSelection } from "@/components/applications/application-selection";
import type { ResolvedApplicationPage } from "@/data/applications";
import { products, type Product } from "@/data/catalog";
import { applicationBreadcrumbJsonLd } from "@/lib/seo";

function ApplicationJsonLd({ page }: { page: ResolvedApplicationPage }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.copy.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
  const breadcrumb = applicationBreadcrumbJsonLd(page.locale, page.path, page.copy.title);
  const escapeJson = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJson(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJson(breadcrumb) }} />
    </>
  );
}

export function ApplicationPage({ page, languagePath }: { page: ResolvedApplicationPage; languagePath: string }) {
  const recommendedProducts = page.recommendedSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  return (
    <PageShell locale={page.locale} active="catalog" languagePath={languagePath}>
      <ApplicationJsonLd page={page} />
      <ApplicationHero page={page} />
      <ApplicationScenarios page={page} />
      <ApplicationSelection page={page} />
      <ApplicationProducts page={page} products={recommendedProducts} />
      <ApplicationFaq page={page} />
    </PageShell>
  );
}
