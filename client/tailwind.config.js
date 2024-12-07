/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ochre: '#CF9817', // Example ochre color
        desat_och: '#bd9129',
        sat_och: '#e6a100',
        oliveGreen: '#403F1C',
        light_olive: '#4c4b28', // Example olive green color
        '#403F1C': '#403F1C', // Existing olive green color
      },
    },
  },
  plugins: [require("daisyui")],
};
