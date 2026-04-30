/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.45), 0 8px 16px -8px rgba(0, 0, 0, 0.35)",
        glow: "0 0 40px -10px rgba(99, 102, 241, 0.35)",
      },
    },
  },
  plugins: [],
};
