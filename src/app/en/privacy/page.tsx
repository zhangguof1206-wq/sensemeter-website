import { PrivacyPage } from "@/components/site";
import { legalPageMetadata } from "@/lib/seo";

export const metadata = legalPageMetadata("en", "privacy");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
