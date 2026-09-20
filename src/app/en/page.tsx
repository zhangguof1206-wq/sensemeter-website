import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/",
  title: "SenseMeter — industrial sensors and analyzers",
  description: "Dew point meters, gas moisture and oxygen analyzers, and industrial humidity sensors selected and supplied internationally from China."
});

export default function Page() {
  return <HomePage locale="en" />;
}
