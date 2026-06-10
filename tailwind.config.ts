import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        muted: "#657282",
        line: "#d9e0e8",
        soft: "#f4f7fa",
        steel: "#1d2e40",
        accent: "#bc2f2f"
      },
      boxShadow: {
        industrial: "0 14px 38px rgba(24, 39, 54, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
