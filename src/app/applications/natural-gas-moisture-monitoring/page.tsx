import { ApplicationPage } from "@/components/applications/application-page";
import { getApplicationPage } from "@/data/applications";
import { staticPageMetadata } from "@/lib/seo";

const slug = "natural-gas-moisture-monitoring";
const candidate = getApplicationPage(slug, "ru");
if (!candidate) throw new Error(`Missing RU application page: ${slug}`);
const page = candidate;

export const metadata = staticPageMetadata({ locale: "ru", path: page.path, title: page.copy.metaTitle, description: page.copy.metaDescription, image: page.heroImage });

export default function Page() {
  return <ApplicationPage page={page} languagePath={`/en${page.path}`} />;
}
