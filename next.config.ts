import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
  }
};

export default nextConfig;
