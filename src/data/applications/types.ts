import type { Locale } from "@/data/catalog";

export type ApplicationScenario = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

export type LocalizedApplicationPage = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  title: string;
  lead: string;
  primaryButton: string;
  secondaryButton: string;
  breadcrumbs: { home: string; applications: string };
  heroFacts: Array<{ title: string; text: string }>;
  overviewTitle: string;
  overviewText: string;
  scenariosTitle: string;
  scenariosLead: string;
  scenarios: ApplicationScenario[];
  selectionTitle: string;
  selectionLead: string;
  selectionCards: Array<{ title: string; text: string }>;
  rfqTitle: string;
  rfqPoints: string[];
  productsEyebrow: string;
  productsTitle: string;
  productsLead: string;
  productLinkLabel: string;
  faqsTitle: string;
  faqs: Array<{ question: string; answer: string }>;
  advisorTitle: string;
  advisorText: string;
  advisorButton: string;
  finalCtaTitle: string;
  finalCtaText: string;
  finalCtaButton: string;
};

export type ApplicationPageRecord = {
  slug: string;
  path: string;
  heroImage: string;
  scenarioImage: string;
  ctaImage: string;
  recommendedSlugs: string[];
  content: Record<Locale, LocalizedApplicationPage>;
};
