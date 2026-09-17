import { ConsentPage } from "@/components/site";
import { legalPageMetadata } from "@/lib/seo";

export const metadata = legalPageMetadata("en", "consent");

export default function Page() {
  return <ConsentPage locale="en" />;
}
