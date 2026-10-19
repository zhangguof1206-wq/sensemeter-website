import { notFound } from "next/navigation";
import { MeasurementCategoryPage } from "@/components/catalog/measurement-category-page";
import { getMeasurementCategory, measurementCategories } from "@/data/measurement-categories";
import { staticPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return measurementCategories.map(category => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const category = getMeasurementCategory(slug);
  if (!category) return {};
  return staticPageMetadata({
    locale: "ru",
    path: category.path,
    title: category.ru.title,
    description: category.ru.description
  });
}

export default async function Page({ params }: Props) {
  const { category: slug } = await params;
  const category = getMeasurementCategory(slug);
  if (!category) notFound();
  return <MeasurementCategoryPage category={category} locale="ru" />;
}
