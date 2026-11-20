import { AboutPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/about",
  title: "About SenseMeter and SINOETM TECH LTD",
  description: "SenseMeter exports industrial dew point, humidity, temperature and oxygen instruments from China, with model selection and technical support.",
  image: "/assets/about/laboratory-equipment.jpg"
});

export default function Page() {
  return <AboutPage locale="en" />;
}
