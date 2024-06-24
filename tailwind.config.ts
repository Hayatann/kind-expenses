import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        custom: ["07YasashisaGothic", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      {
        mytheme: {
          primary: "#ADADFF",
        },
      },
    ],
  },
} satisfies Config;

export default config;
