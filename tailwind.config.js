/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#21883f',
          light: '#8dc73f',
          dark: '#506c57',
        },
        secondary: {
          DEFAULT: '',
          light: '',
          dark: '',
        },
        font: {
          primary: '#21883f',
          secondary: '',
          light: '#FFFFFF',
          dark: '',
        },
        danger: {
          primary: '#f54242',
          secondary: '#fcc4c4',
          // light: '#FFFFFF',
          // dark: '',
        },
        gradblue: '#dbfff1',
        gradgreen: '#f5eb5b',
    },
  },
  plugins: [],
}
}

