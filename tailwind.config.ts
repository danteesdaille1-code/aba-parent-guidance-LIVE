import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6B9BD1",
        success: "#7FB685",
        background: "#E8EEF2",
        textDark: "#2C3E50",
      },
    },
  },
  plugins: [],
};
export default config;
