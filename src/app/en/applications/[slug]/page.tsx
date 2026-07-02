import { notFound } from "next/navigation";
import { ApplicationPage } from "@/components/application-page";
import { applicationPageContent, getApplicationPageContent } from "@/data/application-page-content";
import { staticPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return applicationPageContent.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const content = getApplicationPageContent(slug);
  if (!content) return {};
  return staticPageMetadata({ locale: "en", path: content.path, title: content.metaTitle, description: content.metaDescription, image: content.image });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const content = getApplicationPageContent(slug);
  if (!content) notFound();
  return <ApplicationPage locale="en" content={content} />;
}
