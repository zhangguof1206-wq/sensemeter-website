import { CatalogPage } from "@/components/site";

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <CatalogPage locale="ru" category={params.category} query={params.q} />;
}
