import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 24px 70px rgba(201, 36, 184, 0.22)",
        soft: "0 18px 45px rgba(12, 18, 32, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
