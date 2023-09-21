/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        steelblue: '#096a88',
        black: '#000',
        white: '#fff',
        whitesmoke: '#f5f5f5',
        darkslategray: '#045e7a',
        aliceblue: '#d2ebf4',
        sandybrown: '#ff9c41',
      },
      spacing: {},
      fontFamily: {
        inter: 'Inter',
      },
      borderRadius: {
        '6xl': '25px',
        '3xs': '10px',
      },
    },
    fontSize: {
      base: '16px',
      '13xl': '32px',
      inherit: 'inherit',
    },
  },
  corePlugins: {
    preflight: false,
  },
};

export default config;
