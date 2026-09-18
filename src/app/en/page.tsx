import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/",
  title: "SenseMeter — industrial sensors supplied from China",
  description: "Dew point meters, gas moisture and oxygen analyzers, and industrial humidity sensors selected in China and supplied to customers in Russia."
});

export default function Page() {
  return <HomePage locale="en" />;
}
