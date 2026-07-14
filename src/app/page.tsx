import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/",
  title: "Промышленные измерительные приборы и комплектующие",
  description: "SenseMeter поставляет приборы и комплектующие для влажности, точки росы, кислорода и температуры с подбором модели, RFQ и поддержкой проектов."
});

export default function Page() {
  return <HomePage locale="ru" />;
}
