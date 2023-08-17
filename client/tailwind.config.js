/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{jsx,js,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
}