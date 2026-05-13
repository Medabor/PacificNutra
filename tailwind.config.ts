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
        ocean: {
          50: "#f0f7fa",
          100: "#daecf2",
          200: "#b6d8e3",
          300: "#86bccd",
          400: "#549ab2",
          500: "#3a7e98",
          600: "#306580",
          700: "#2a536a",
          800: "#264658",
          900: "#233c4c",
          950: "#142532",
        },
        sand: {
          50: "#fbf8f3",
          100: "#f4eedf",
          200: "#e8dbb9",
          300: "#dac28b",
          400: "#cba75f",
          500: "#bf9244",
          600: "#a87936",
          700: "#895d2e",
          800: "#714b2c",
          900: "#5e3f29",
        },
        coral: {
          400: "#f08a73",
          500: "#e96a4d",
          600: "#d54e30",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
