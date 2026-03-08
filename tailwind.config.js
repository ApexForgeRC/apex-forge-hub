/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apex-orange': '#FF6B00',
        'apex-orange-light': '#ff8533',
        'apex-orange-dark': '#cc5500',
        'apex-black': '#080808',
        'apex-dark': '#0f0f0f',
        'apex-gray': '#1a1a1a',
        'apex-gray-light': '#2a2a2a',
      },
      fontFamily: {
        'display': ['Oswald', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
