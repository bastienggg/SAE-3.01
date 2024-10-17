/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{inc,html}",
  ],
  theme: {
    colors: {
      'white': 'hsl(var(--clr-white) / <alpha-value>)',
      'black': 'hsl(var(--clr-black) / <alpha-value>)',
    }
  },
  plugins: [],
}

