import type { Locale } from "@/data/catalog";

export type ApplicationPhotoScenario = {
  title: string;
  text: string;
  imageAlt: string;
};

export type ApplicationTechnicalScenario = {
  title: string;
  text: string;
  criterion: string;
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
  photoScenarios: [ApplicationPhotoScenario, ApplicationPhotoScenario];
  technicalScenarios: [ApplicationTechnicalScenario, ApplicationTechnicalScenario, ApplicationTechnicalScenario];
  criterionLabel: string;
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
  scenarioImages: [string, string];
  recommendedSlugs: string[];
  content: Record<Locale, LocalizedApplicationPage>;
};
