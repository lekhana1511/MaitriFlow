import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        indigo: {
          DEFAULT: "#1B3A6B",
          50: "#EBF0F8",
          100: "#D3DEEE",
          600: "#1B3A6B",
          700: "#152E54",
          900: "#0D1C34",
        },
        saffron: {
          DEFAULT: "#E08E29",
          50: "#FDF3E7",
          100: "#FAE4C4",
          600: "#E08E29",
          700: "#B96F1A",
        },
        teal: {
          DEFAULT: "#1F8A70",
          50: "#E8F5F1",
          100: "#C9E9DF",
          600: "#1F8A70",
          700: "#166B56",
        },
        alert: {
          DEFAULT: "#C84B31",
          50: "#FBEAE6",
          100: "#F4CCC1",
          600: "#C84B31",
          700: "#A23A25",
        },
        cloud: "#F6F7FB",
        line: "#E3E7EF",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-plex)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(20, 33, 61, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
