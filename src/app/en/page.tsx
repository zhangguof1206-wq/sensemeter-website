import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/",
  title: "Industrial measurement instruments and accessories",
  description: "SenseMeter supplies instruments and accessories for humidity, dew point, oxygen and temperature measurement, with model selection and RFQ support."
});

export default function Page() {
  return <HomePage locale="en" />;
}
