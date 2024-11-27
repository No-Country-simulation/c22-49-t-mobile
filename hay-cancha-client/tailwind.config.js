/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./ui/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          'primary': '#DB3022',
          'secondary': '#FFFFFF',
          'background': '#F9F9F9',
          'acent': '#9B9B9B',
          'text': '#222222',
          'error': '#F01F0E',
          'success': '#2AA952'
        },
        dark: {
          'primary': '#DB3022',
          'secondary': '#FFFFFF',
          'background': '#F9F9F9',
          'acent': '#9B9B9B',
          'text': '#222222',
          'error': '#F01F0E',
          'success': '#2AA952'
        }
      },
    },
  },
  plugins: [],
}

