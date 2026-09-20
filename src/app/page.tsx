import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/",
  title: "SenseMeter — промышленные датчики и анализаторы",
  description: "Измерители точки росы, анализаторы влажности газа и кислорода, промышленные датчики влажности. Подбор и международная поставка из Китая."
});

export default function Page() {
  return <HomePage locale="ru" />;
}
