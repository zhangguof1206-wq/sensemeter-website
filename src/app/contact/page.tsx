import { ContactPage } from "@/components/site";

type Props = {
  searchParams: Promise<{ model?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <ContactPage locale="ru" model={params.model} />;
}
