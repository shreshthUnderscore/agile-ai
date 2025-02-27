/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        secondary: '#1e1e1e',
        accent: '#22d3ee',
        card: '#1e1e1e',
        'card-hover': '#2d2d2d',
        border: '#333333',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};