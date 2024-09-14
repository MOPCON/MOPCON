/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			orange: '#F79022',
  			yellow: '#FCEB75',
  			'light-green': '#9CBC43',
  			secondary: '#4C766D',
  			'navy-blue': '#364758',
  			'darkest-green': '#0E2219',
  			black: '#1C1F25',
  			N800: '#4B5162',
  			cream: '#E9E3D7'
  		},
  		screens: {
  			mob: '576px',
  			tablet: '768px',
  			laptop: '1200px',
  			desk: '1440px'
  		},
  		backgroundImage: {
  			highlight: 'linear-gradient(180deg, transparent 50%, #E4F2EF 51%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
