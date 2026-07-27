/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Pacifico', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(236, 72, 153, 0.15), 0 24px 80px rgba(236, 72, 153, 0.18)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-10px) translateX(6px)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.06)' },
        },
        floatUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(-120vh)', opacity: '0' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-12vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(120vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        drift: 'drift 8s ease-in-out infinite',
        pulseSoft: 'pulseSoft 1.6s ease-in-out infinite',
        floatUp: 'floatUp 8s linear infinite',
        petalFall: 'petalFall 9s linear infinite',
      },
      backgroundImage: {
        floral: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0 2px, transparent 2px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.45) 0 1.5px, transparent 1.5px), radial-gradient(circle at 40% 75%, rgba(255,255,255,0.35) 0 2px, transparent 2px)",
      },
    },
  },
  plugins: [],
};
