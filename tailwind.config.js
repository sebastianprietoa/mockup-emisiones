/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 50px rgba(54, 47, 50, 0.10)",
      },
      backgroundImage: {
        "dashboard-radial":
          "radial-gradient(circle at top right, rgba(236,27,145,0.12), transparent 16%), radial-gradient(circle at bottom left, rgba(11,164,222,0.10), transparent 18%), linear-gradient(180deg, #F4E8DA 0%, #F7EFE5 100%)",
      },
    },
  },
  plugins: [],
};
