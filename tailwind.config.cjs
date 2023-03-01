const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Lobster", ...defaultTheme.fontFamily.sans],
        primary: ["Russo One", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
