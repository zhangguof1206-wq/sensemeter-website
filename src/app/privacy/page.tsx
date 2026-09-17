import { PrivacyPage } from "@/components/site";
import { legalPageMetadata } from "@/lib/seo";

export const metadata = legalPageMetadata("ru", "privacy");

export default function Page() {
  return <PrivacyPage locale="ru" />;
}
