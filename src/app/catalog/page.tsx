import { CatalogPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/catalog",
  title: "Каталог SenseMeter: промышленные датчики и анализаторы",
  description:
    "Каталог SenseMeter: промышленные датчики влажности, точки росы и кислородные анализаторы Michell, Rotronic, Vaisala и AII. PDF datasheet и запрос цены."
});

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <CatalogPage locale="ru" category={params.category} query={params.q} />;
}
