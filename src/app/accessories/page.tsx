import { AccessoriesIndexPage } from "@/components/accessories/accessories-index-page";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/accessories",
  title: "Комплектующие для датчиков и газоанализаторов",
  description: "Защита зондов, спечённые фильтры, фильтры пробоотборного газа и ограничители расхода. Подбор, изготовление и поддержка SenseMeter."
});

export default function Page() {
  return <AccessoriesIndexPage locale="ru" />;
}
