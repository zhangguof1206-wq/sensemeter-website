import { CatalogPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/catalog",
  title: "Каталог промышленных измерительных приборов",
  description: "Каталог SenseMeter: Michell, Rotronic, Vaisala и AII для контроля влажности, точки росы, температуры и кислорода."
});

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <CatalogPage locale="ru" category={params.category} query={params.q} />;
}
