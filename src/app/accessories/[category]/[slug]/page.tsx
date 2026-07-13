import { notFound } from "next/navigation";
import { AccessoryDetailPage } from "@/components/accessories/accessory-detail-page";
import { accessoryProducts, getAccessoryCategory, getAccessoryProduct } from "@/data/accessories";
import { staticPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return accessoryProducts.map((product) => ({ category: product.categorySlug, slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const product = getAccessoryProduct(categorySlug, slug);
  if (!product) return {};
  const path = `/accessories/${product.categorySlug}/${product.slug}`;
  return staticPageMetadata({ locale: "ru", path, title: `${product.model} - ${product.title.ru}`, description: `${product.model}. ${product.summary.ru}`, image: product.image });
}

export default async function Page({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const category = getAccessoryCategory(categorySlug);
  const product = getAccessoryProduct(categorySlug, slug);
  if (!category || !product) notFound();
  return <AccessoryDetailPage category={category} product={product} locale="ru" />;
}
