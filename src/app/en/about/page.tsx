import { AboutPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/about",
  title: "About SenseMeter and SINOETM TECH LTD",
  description: "SenseMeter helps B2B customers select industrial humidity, dew-point and oxygen analysis instruments."
});

export default function Page() {
  return <AboutPage locale="en" />;
}
