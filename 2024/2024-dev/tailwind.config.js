/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#F79022",
        yellow: "#FCEB75",
        "light-green": "#9CBC43",
        secondary: "#4C766D",
        "navy-blue": "#364758",
        "darkest-green": "#0E2219",
        black: "#1C1F25",
        N800: "#4B5162",
        cream: "#E9E3D7",
      },
      screens: {
        mob: "810px",
        pad: "1200px",
        desk: "1440px",
      },
    },
  },
  plugins: [],
};
