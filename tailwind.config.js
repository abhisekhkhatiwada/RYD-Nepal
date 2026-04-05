/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './pages/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E64D3D',
          50: '#fef4f3',
          100: '#fde7e5',
          200: '#fbd1cd',
          300: '#f7ada5',
          400: '#f27c70',
          500: '#e64d3d',
          600: '#d44132',
          700: '#b13429',
          800: '#922e25',
          900: '#7a2b23',
        },
      },
    },
  },
  plugins: [],
}
