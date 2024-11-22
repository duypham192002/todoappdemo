/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgb(89, 31, 249)", // Thêm màu tùy chỉnh
      },
      primary: {
        600: "#1E40AF", // Thay bằng màu bạn muốn
        700: "#1D4ED8", // Thay bằng màu bạn muốn
        800: "#1E3A8A", // Thay bằng màu bạn muốn
      },
    },
  },
  plugins: [],
};
