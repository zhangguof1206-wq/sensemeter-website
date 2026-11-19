import { AboutPage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/about",
  title: "О SenseMeter и SINOETM TECH LTD",
  description: "SenseMeter экспортирует из Китая промышленные приборы для измерения точки росы, влажности, температуры и кислорода. Подбор и техническая поддержка.",
  image: "/assets/about/laboratory-equipment.jpg"
});

export default function Page() {
  return <AboutPage locale="ru" />;
}
