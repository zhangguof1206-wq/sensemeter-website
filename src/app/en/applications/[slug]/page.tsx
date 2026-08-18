import { notFound } from "next/navigation";
import { ApplicationPage } from "@/components/applications/application-page";
import { applicationPages, getApplicationPage } from "@/data/applications";
import { staticPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return applicationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = getApplicationPage(slug, "en");
  if (!page) return {};
  return staticPageMetadata({ locale: "en", path: page.path, title: page.copy.metaTitle, description: page.copy.metaDescription, image: page.heroImage });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getApplicationPage(slug, "en");
  if (!page) notFound();
  return <ApplicationPage page={page} languagePath={page.path} />;
}
