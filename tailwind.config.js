/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      },
      colors: {
        obsidian: {
          DEFAULT: '#0D0D12',
          deep: '#07070A',
          card: '#161622',
          surface: '#1A1A26',
          border: 'rgba(255, 255, 255, 0.08)'
        },
        gold: {
          DEFAULT: '#F5C518',
          light: '#FFD700',
          dark: '#D4A017',
          champagne: '#C9A84C',
          glow: 'rgba(245, 197, 24, 0.25)'
        },
        slateCustom: {
          DEFAULT: '#2A2A35',
          text: '#94A3B8',
          muted: '#64748B'
        },
        garnet: {
          DEFAULT: '#4A0E17',
          deep: '#2D080E',
          glow: 'rgba(74, 14, 23, 0.4)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      boxShadow: {
        'gold-glow': '0 0 50px -10px rgba(245, 197, 24, 0.3)',
        'gold-sm': '0 0 20px -5px rgba(245, 197, 24, 0.4)',
        'card-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
};
