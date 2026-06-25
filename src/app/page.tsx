import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/",
  title: "Промышленные датчики влажности, точки росы и кислорода",
  description: "SenseMeter поставляет промышленные датчики влажности, гигрометры точки росы и анализаторы кислорода с PDF datasheets и RFQ-запросом."
});

export default function Page() {
  return <HomePage locale="ru" />;
}
