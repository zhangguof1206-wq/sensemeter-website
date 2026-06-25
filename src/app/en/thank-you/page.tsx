import type { Metadata } from "next";
import { ThankYouPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Thank you for your request",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <ThankYouPage locale="en" />;
}
