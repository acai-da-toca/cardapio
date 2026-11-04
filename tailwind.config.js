/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Design tokens — paleta "Monte seu Açaí"
      colors: {
        purple: '#7A1B9A',
        deep: '#5B1478',
        night: '#45105C',
        magenta: '#C2307F',
        amber: '#FDB75B',
        cream: '#FFF3DC',
        paper: '#FFF8EA',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Erica One"', 'Outfit', 'sans-serif'],
      },
      maxWidth: {
        card: '760px',
      },
      backgroundImage: {
        'page-glow':
          'radial-gradient(ellipse 120% 70% at 50% 0%, #FFFBF1 0%, #FFF3DC 55%, #FDE2B4 100%)',
      },
      // Apenas transições pontuais (disparadas por evento), sem loops infinitos.
      keyframes: {
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.35s ease-out',
      },
    },
  },
  plugins: [],
};
