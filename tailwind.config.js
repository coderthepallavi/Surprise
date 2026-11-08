/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#070608',
          800: '#0b0910',
          700: '#120e16',
          600: '#1b151f',
        },
        ivory: {
          50: '#fbf6ec',
          100: '#f6efdf',
          200: '#ece1cb',
          300: '#ddcdaf',
        },
        rose: {
          200: '#e6c2cf',
          300: '#d99ab0',
          400: '#c97a93',
          500: '#b15a76',
          600: '#8f4360',
        },
        burgundy: {
          400: '#7a1f33',
          500: '#5e1a2a',
          600: '#48131f',
          700: '#340d16',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(201,122,147,0.45)',
        'glow-soft': '0 0 22px -6px rgba(217,154,176,0.35)',
        paper:
          '0 24px 60px -18px rgba(0,0,0,0.8), 0 8px 24px -10px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.4)',
        card:
          '0 18px 45px -16px rgba(0,0,0,0.85), 0 6px 18px -8px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bg-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.07)' },
          '30%': { transform: 'scale(0.96)' },
          '45%': { transform: 'scale(1.03)' },
          '60%': { transform: 'scale(1)' },
        },
        'ripple-out': {
          '0%': { transform: 'scale(0.4)', opacity: '0.55' },
          '100%': { transform: 'scale(2.6)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1.1s cubic-bezier(0.22,1,0.36,1) both',
        'bg-in': 'bg-in 2.4s ease both',
        blink: 'blink 1s step-end infinite',
        heartbeat: 'heartbeat 2.6s ease-in-out infinite',
        'ripple-out': 'ripple-out 1.1s ease-out forwards',
      },
    },
  },
  plugins: [],
};
