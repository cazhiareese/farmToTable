/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/AuthPages/*","./src/pages/UserPages/Root.js","./src/components/*","./src/pages/UserPages/*", 
  "./src/pages/AdminPages/*","./src/pages/AdminPages/RootAdmin.js" ],
  theme: { 
    extend: {
      colors: {
        fttGreen: "#074528",
        fttWhite: "#FFFDF9",
        fttBg: "#EEEEEA",
        fttShadow: "#E2E1E1"
      },
      fontFamily: {
        Roboto: ['Roboto']
      }
    },
  },
  plugins: [],
}

