/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          500: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
};