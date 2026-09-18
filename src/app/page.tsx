import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/",
  title: "SenseMeter — промышленные датчики и анализаторы для России",
  description: "Измерители точки росы, анализаторы влажности газа и кислорода, промышленные датчики влажности. Подбор и поставка из Китая в Россию."
});

export default function Page() {
  return <HomePage locale="ru" />;
}
