// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'oren': '#DA5D35',
        'oren-light': '#FDF1E5',
        'ungu': '#4C45E9',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
