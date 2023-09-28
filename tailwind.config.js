/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fbf2d5",
        secondary: "#068da9",
        tertiary: "#fdc57b",
        quaternary: "#394a51",
      },
    },
  },
  plugins: [],
};
