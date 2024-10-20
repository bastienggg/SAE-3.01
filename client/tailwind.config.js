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
      'Noir': 'hsl(var(--clr-noir))',
      'Gris': 'hsl(var(--clr-gris))',
      'Vert': 'hsl(var(--clr-vert))',
      'Bleu': 'hsl(var(--clr-bleu))',
    }
  },
  plugins: [],
}

