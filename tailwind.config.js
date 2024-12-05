/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgb(89, 31, 249)",
      },
      primary: {
        600: "#1E40AF",
        700: "#1D4ED8",
        800: "#1E3A8A",
      },
    },
  },
  plugins: [],
};
