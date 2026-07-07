const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sensemeter.ru";

const yandexCleanParams = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_referrer",
  "yclid",
  "gclid",
  "fbclid",
  "from",
  "ref"
];

export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "User-agent: Yandex",
    "Allow: /",
    `Clean-param: ${yandexCleanParams.join("&")} /`,
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    ""
  ].join("\n");

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
