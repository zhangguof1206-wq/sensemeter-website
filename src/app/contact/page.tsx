import { ContactPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";
import { applicationPages } from "@/data/applications";
import { getRfqApplicationTitle } from "@/lib/rfq-application";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/contact",
  title: "Запрос цены и консультации",
  description: "Отправьте RFQ-запрос SenseMeter: цена, наличие, сроки поставки, PDF datasheet, подбор модели, комплектующие и техническая консультация."
});

type Props = {
  searchParams: Promise<{ model?: string; application?: string | string[] }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const application = getRfqApplicationTitle(params.application, "ru", applicationPages);
  return <ContactPage locale="ru" model={params.model} application={application} />;
}
