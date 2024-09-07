/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      gridTemplateRows: {
        '2-1-1': 'grid-template-rows: 2fr 1fr 1fr'
      },
      gridTemplateColumns: {
        'fit-auto': 'grid-template-columns: fit-content auto'
      },
  		colors: {}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}