import { ContactPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/contact",
  title: "Запрос цены и консультации",
  description: "Отправьте RFQ-запрос SenseMeter: цена, наличие, сроки поставки, PDF datasheet, подбор модели, комплектующие и техническая консультация."
});

type Props = {
  searchParams: Promise<{ model?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <ContactPage locale="ru" model={params.model} />;
}
