import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sensemeter.ru" }],
        destination: "https://sensemeter.ru/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "79.174.90.69" }],
        destination: "https://sensemeter.ru/:path*",
        permanent: true
      }
    ];
  },
  async headers() {
    const staticAssetCache = "public, max-age=2592000, stale-while-revalidate=86400";

    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCache }]
      },
      {
        source: "/datasheets/:path*",
        headers: [{ key: "Cache-Control", value: staticAssetCache }]
      },
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;
