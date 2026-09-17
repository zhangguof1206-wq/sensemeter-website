import { ConsentPage } from "@/components/site";
import { legalPageMetadata } from "@/lib/seo";

export const metadata = legalPageMetadata("ru", "consent");

export default function Page() {
  return <ConsentPage locale="ru" />;
}
