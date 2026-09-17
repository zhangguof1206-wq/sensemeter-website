import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/",
  title: "SenseMeter — промышленные датчики и анализаторы",
  description: "SenseMeter подбирает и поставляет приборы влажности, точки росы, кислорода и температуры для промышленных B2B-проектов в России и за рубежом."
});

export default function Page() {
  return <HomePage locale="ru" />;
}
