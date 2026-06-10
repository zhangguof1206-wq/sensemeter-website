import { notFound } from "next/navigation";
import { ProductPage, getProductOrNull } from "@/components/site";
import { products } from "@/data/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductOrNull(slug);
  if (!product) notFound();
  return <ProductPage locale="ru" product={product} />;
}
