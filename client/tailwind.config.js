/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 5px 15px rgba(0, 0, 0, 0.5)',
      },
      colors: {
      'text': '#081603',
      'background': '#f4fdf2',
      'primary': '#59a73c',
      'secondary': '#8aefc0',
      'accent': '#54e8d2',
      'transparent': 'transparent',
      },
    },
    fontFamily: {
      primary: ['Roboto', 'sans-serif'],
      secondary: ['Nunito', 'serif']
    },
  },
  plugins: [],
}

