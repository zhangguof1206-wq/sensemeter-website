import { AccessoriesIndexPage } from "@/components/accessories/accessories-index-page";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/accessories",
  title: "Accessories for sensors and gas analyzers",
  description: "Probe protection, sintered filter elements, gas diffusers and flow restrictors. Model selection and made-to-order options."
});

export default function Page() {
  return <AccessoriesIndexPage locale="en" />;
}
