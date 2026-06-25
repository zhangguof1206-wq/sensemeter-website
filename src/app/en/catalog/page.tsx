import { CatalogPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/catalog",
  title: "Industrial measurement product catalog",
  description: "SenseMeter catalog: Michell, Rotronic, Vaisala and AII instruments for humidity, dew point, temperature and oxygen monitoring."
});

type Props = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <CatalogPage locale="en" category={params.category} query={params.q} />;
}
