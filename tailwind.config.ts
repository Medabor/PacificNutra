import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep taro: text + dark surfaces
        kalo: {
          50: "#F5F1EC",
          100: "#E5DCD0",
          200: "#C9B8A4",
          400: "#7A6655",
          800: "#3A2E25",
          900: "#2A2118",
          950: "#1F1A17",
        },
        // Coconut cream: backgrounds + cards
        cream: {
          50: "#FAF6EE",
          100: "#F1E9D8",
          200: "#E4D5B7",
          300: "#D2BE93",
        },
        // Terracotta: primary CTA + accent. Punchier than v1 (was
        // #B8553A) — reads more decisive on cream backgrounds.
        clay: {
          200: "#F4CABA",
          300: "#EBA48B",
          400: "#DD7E5C",
          500: "#D55A38",
          600: "#B8442A",
          700: "#90331F",
        },
        // Taro leaf: secondary accent
        forest: {
          400: "#658A72",
          500: "#4A7359",
          600: "#3B5D47",
          700: "#2F4F3A",
          800: "#243C2D",
        },
        // Single deep accent for footers and overlays
        "ocean-deep": "#1C3942",
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', "Georgia", "serif"],
        sans: ['var(--font-manrope)', "system-ui", "sans-serif"],
      },
      typography: ({ theme }: { theme: (key: string) => string }) => ({
        kalo: {
          css: {
            "--tw-prose-body": theme("colors.kalo[800]"),
            "--tw-prose-headings": theme("colors.kalo[950]"),
            "--tw-prose-lead": theme("colors.kalo[800]"),
            "--tw-prose-links": theme("colors.clay[600]"),
            "--tw-prose-bold": theme("colors.kalo[950]"),
            "--tw-prose-counters": theme("colors.kalo[400]"),
            "--tw-prose-bullets": theme("colors.clay[400]"),
            "--tw-prose-hr": theme("colors.cream[200]"),
            "--tw-prose-quotes": theme("colors.kalo[900]"),
            "--tw-prose-quote-borders": theme("colors.clay[300]"),
            "--tw-prose-captions": theme("colors.kalo[400]"),
            "--tw-prose-code": theme("colors.kalo[950]"),
            "--tw-prose-pre-code": theme("colors.cream[50]"),
            "--tw-prose-pre-bg": theme("colors.kalo[950]"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
