/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        BlackRock: "#343541",
        BlackRussian: "#202123",
        PayneGrey: "#40414F",
        Comet: "#5D5D67",
        Lavender: "#ECECF1",
        Quartz: "#D9D9E3",
        RetroLime: "rgba(16,163,127)",
        RetroLime2: "#1A7F64",
      },
    },
  },
  plugins: [],
};
