import { CookiePolicyPage } from "@/components/site";
import { legalPageMetadata } from "@/lib/seo";

export const metadata = legalPageMetadata("ru", "cookies");

export default function Page() {
  return <CookiePolicyPage locale="ru" />;
}
