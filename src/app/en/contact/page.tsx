import { ContactPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/contact",
  title: "Request pricing and technical support",
  description: "Submit an RFQ to SenseMeter for pricing, availability, PDF datasheets and technical consultation."
});

type Props = {
  searchParams: Promise<{ model?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return <ContactPage locale="en" model={params.model} />;
}
