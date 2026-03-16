// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//     dark: {}
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {

        // Slide from left + small pop
        slideFloatLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px) scale(0.9)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
          '80%': {
            transform: 'translateY(-8px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },

        // Slide from right + small pop
        slideFloatRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px) scale(0.9)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
          '80%': {
            transform: 'translateY(-8px)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },

        // Continuous floating animation
        floatY: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-12px)',
          },
        },
         slideFromLine: {
          "0%": {
            opacity: "0",
            transform: "translateX(60px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        growLine: {
          "0%": {
            height: "0%",
            opacity: "0",
          },
          "100%": {
            height: "500px",
            opacity: "1",
          },
        },
         lineGrow: {
          "0%": { height: "0%" },
          "100%": { height: "100%" },
        },
        
      },

      fontFamily:{
        times:['"Times New Roman"', 'Times', 'serif'],
        serifBold: ['Georgia', 'serif'],
      },

      animation: {
        slideFloatLeft: 'slideFloatLeft 0.9s ease-out forwards',
        slideFloatRight: 'slideFloatRight 0.9s ease-out forwards',
        float: 'floatY 3s ease-in-out infinite',
        slideFromLine: "slideFromLine 1s ease-out forwards",
        growLine: "growLine 1s ease-out forwards",
        lineGrow: "lineGrow 1s ease-out forwards",

      },
    },
  },
  plugins: [],
};