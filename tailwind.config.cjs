/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/app.html", "./src/**/*.{svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        DEFAULT: "hsl(26, 100%, 55%)",
        pale: "hsl(25, 100%, 94%)",
      },
      neutral: {
        100: "hsl(223, 64%, 98%)",
        200: "hsl(220, 14%, 75%)",
        300: "hsl(219, 9%, 45%)",
        400: "hsl(220, 13%, 13%)",
      },
      white: "hsl(0, 0%, 100%)",
      black: "hsl(0, 0%, 0%)",
    },
    extend: {
      fontFamily: {
        sans: ["Kumbh\\ Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
