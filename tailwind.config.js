/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 60px rgba(2, 6, 23, 0.35)",
      },
      backgroundImage: {
        "dashboard-radial":
          "radial-gradient(circle at top, rgba(57,181,74,0.16), transparent 34%), radial-gradient(circle at right, rgba(0,169,157,0.12), transparent 26%), linear-gradient(180deg, #07100d 0%, #030704 100%)",
      },
    },
  },
  plugins: [],
};
