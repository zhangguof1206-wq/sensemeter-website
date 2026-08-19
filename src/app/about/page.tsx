import { AboutPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/about",
  title: "О SenseMeter и SINOETM TECH LTD",
  description: "SenseMeter помогает B2B-клиентам подобрать промышленные датчики влажности, точки росы и кислородные анализаторы.",
  image: "/assets/about/laboratory-equipment.jpg"
});

export default function Page() {
  return <AboutPage locale="ru" />;
}
