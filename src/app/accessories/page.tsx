import { AccessoriesIndexPage } from "@/components/accessories/accessories-index-page";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "ru",
  path: "/accessories",
  title: "Комплектующие для датчиков и газоанализаторов",
  description: "Защита зондов, спечённые фильтроэлементы, газовые диффузоры и ограничители расхода. Подбор и изготовление под заказ."
});

export default function Page() {
  return <AccessoriesIndexPage locale="ru" />;
}
