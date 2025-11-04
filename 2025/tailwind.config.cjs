/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      screens: {
        'tablet': '390px',
        'desktop': '1440px',
      },
      colors: {
        'brand-dark': '#314158',
        'brand-dark-hover': '#455a7a',
        'sponsor-bg': '#020618',
      },
      backgroundImage: {
        'main-gradient':'linear-gradient(90deg, #607BDA 0%, #B8C3F0 100%)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mantou: ['Mantou Sans', 'sans-serif'],
        noto: ['Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};