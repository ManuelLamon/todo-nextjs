/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "{pages,components}/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  important: true,
  theme: ["dark"],
  daisyui: {
    themes: [{
      default: {
        
        "primary": "#80BC00",
        
        "secondary": "#C9E393",
        
        "accent": "#DDE3D4",
        
        "neutral": "#3D4451",
        
        "base-100": "#FFFFFF",
        
        "info": "#3ABFF8",
        
        "success": "#36D399",
        
        "warning": "#FBBD23",
        
        "error": "#F87272",
      },
    }],
  },
  plugins: [require('@tailwindcss/forms'),require("daisyui")],
}
