import { HomePage } from "@/components/site";
import { staticPageMetadata } from "@/lib/seo";

export const metadata = staticPageMetadata({
  locale: "en",
  path: "/",
  title: "SenseMeter — industrial measurement instruments and accessories",
  description: "SenseMeter supports Russian and international B2B projects with humidity, dew-point, oxygen and temperature instruments, accessories and RFQ selection."
});

export default function Page() {
  return <HomePage locale="en" />;
}
