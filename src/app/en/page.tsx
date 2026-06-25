import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/",
  title: "Industrial humidity, dew-point and oxygen analyzers",
  description: "SenseMeter supplies industrial humidity sensors, dew-point instruments and oxygen analyzers with PDF datasheets and RFQ support."
});

export default function Page() {
  return <HomePage locale="en" />;
}
