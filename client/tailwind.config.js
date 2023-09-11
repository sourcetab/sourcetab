import kobaltePlugin from '@kobalte/tailwindcss';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        show: 'show 150ms ease-out',
        hide: 'hide 150ms ease-in forwards',
      },
      keyframes: {
        show: {
          from: {opacity: '0'},
          to: {opacity: '1'},
        },
        hide: {
          from: {opacity: '1'},
          to: {opacity: '0'},
        },
      },
    },
  },
  plugins: [kobaltePlugin],
};

export default tailwindConfig;
