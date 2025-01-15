/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        thegray: '#2f2f2f',
        bluemk1: '#bfc8cb',
        bluemk2: '#809197',
        bluemk3: '#415a63',
      }
    },
    screens: {
      xs: "480px",
      sm: "560px",
      xm: "780px",
      md: "1024px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}

