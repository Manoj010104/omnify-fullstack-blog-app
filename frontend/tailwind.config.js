// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#7F1DFF', // Deep violet
        secondary: '#0EA5E9', // Light blue
        accent: '#F43F5E', // Vivid pink
        glass: 'rgba(255, 255, 255, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glow': 'linear-gradient(135deg, #7F1DFF, #0EA5E9)',
      },
  
      boxShadow: {
  glow: '0 0 20px rgba(255,255,255,0.1)',
  neon: '0 0 8px #0EA5E9, 0 0 12px #7F1DFF',
},

      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
