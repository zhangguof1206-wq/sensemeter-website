import { ContactPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/contact",
  title: "Запрос цены и консультации",
  description: "Отправьте RFQ-запрос SenseMeter: цена, наличие, PDF datasheet и техническая консультация по промышленным измерительным приборам."
});

type Props = {
  searchParams: Promise<{ model?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <ContactPage locale="ru" model={params.model} />;
}
