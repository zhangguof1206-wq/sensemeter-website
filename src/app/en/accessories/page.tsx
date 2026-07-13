import { AccessoriesIndexPage } from "@/components/accessories/accessories-index-page";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/accessories",
  title: "Accessories for sensors and gas analyzers",
  description: "Probe protection, sintered filters, sample-gas filters and flow restrictors with selection, custom supply and support from SenseMeter."
});

export default function Page() {
  return <AccessoriesIndexPage locale="en" />;
}
