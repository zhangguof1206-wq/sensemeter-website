import { notFound } from "next/navigation";
import { ProductPage, getProductOrNull } from "@/components/site";
import { products } from "@/data/catalog";
import { productMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductOrNull(slug);
  if (!product) return {};
  return productMetadata("ru", product);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductOrNull(slug);
  if (!product) notFound();
  return <ProductPage locale="ru" product={product} />;
}
