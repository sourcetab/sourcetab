/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito Variable', 'sans-serif'],
    },
  },
  plugins: [],
};

export default tailwindConfig;
