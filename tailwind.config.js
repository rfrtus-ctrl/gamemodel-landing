/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ["'Lora'", 'Georgia', 'serif'],
      },
      colors: {
        gm: {
          bg:       '#f5f3ed',
          card:     '#fafaf7',
          black:    '#1a1a1a',
          gray:     '#525252',
          green:    '#1a5d3a',
          cream:    '#f5f3ed',
        },
      },
    },
  },
  plugins: [],
}
