import { notFound } from "next/navigation";
import { AccessoryCategoryPage } from "@/components/accessories/accessory-category-page";
import { accessoryCategories, getAccessoryCategory, getAccessoryProductsByCategory } from "@/data/accessories";
import { staticPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return accessoryCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category: slug } = await params;
  const category = getAccessoryCategory(slug);
  if (!category) return {};
  return staticPageMetadata({ locale: "ru", path: `/accessories/${category.slug}`, title: category.title.ru, description: category.summary.ru, image: category.image });
}

export default async function Page({ params }: Props) {
  const { category: slug } = await params;
  const category = getAccessoryCategory(slug);
  if (!category) notFound();
  return <AccessoryCategoryPage category={category} products={getAccessoryProductsByCategory(category.slug)} locale="ru" />;
}
