import type { Metadata } from "next";
import { ThankYouPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Спасибо за запрос",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <ThankYouPage locale="ru" />;
}
