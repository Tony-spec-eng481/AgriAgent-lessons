/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        agriculture: {
          green: "#2D5A27",
          lightGreen: "#4A8B3C",
          brown: "#5D4037",
          earth: "#8D6E63",
          cream: "#FFF9C4",
        },
      },
    },
    animation: {
      shimmer: "shimmer 1.5s infinite",
    },
    keyframes: {
      shimmer: {
        "0%": { backgroundPosition: "-200% 0" },
        "100%": { backgroundPosition: "200% 0" },
      },
    },
  },
  plugins: [],
};

