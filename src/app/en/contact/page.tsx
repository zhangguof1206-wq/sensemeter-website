import { ContactPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";
import { applicationPages } from "@/data/applications";
import { getRfqApplicationTitle } from "@/lib/rfq-application";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/contact",
  title: "Request pricing and technical support",
  description: "Submit an RFQ to SenseMeter for pricing, availability, lead time, PDF datasheets, model selection, accessories and technical consultation."
});

type Props = {
  searchParams: Promise<{ model?: string; application?: string | string[] }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const application = getRfqApplicationTitle(params.application, "en", applicationPages);
  return <ContactPage locale="en" model={params.model} application={application} />;
}
