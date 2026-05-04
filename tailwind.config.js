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
          "radial-gradient(circle at top, rgba(16,185,129,0.16), transparent 34%), radial-gradient(circle at right, rgba(20,184,166,0.12), transparent 26%), linear-gradient(180deg, #0f172a 0%, #08111d 100%)",
      },
    },
  },
  plugins: [],
};

