/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFDE59",
        secondary: "#C4B815",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
