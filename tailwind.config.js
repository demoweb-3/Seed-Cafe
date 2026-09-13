/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#fdfbf7',
          100: '#faf6ef',
          200: '#f4ede0',
          300: '#ece0cd',
          400: '#ddccb3',
        },
        botanical: {
          50: '#eef3f0',
          100: '#d8e4df',
          200: '#b3c9bf',
          300: '#8aada1',
          400: '#5e8a7c',
          500: '#3d6b5a',
          600: '#2f5647',
          700: '#274539',
          800: '#1f3530',
          900: '#16261f',
        },
        golden: {
          50: '#fdf8ec',
          100: '#faedc8',
          200: '#f5dd96',
          300: '#efc765',
          400: '#e9b043',
          500: '#d9982e',
          600: '#bb7722',
          700: '#94591d',
        },
        ink: {
          50: '#f5f4f2',
          100: '#e8e6e2',
          200: '#c9c6bf',
          300: '#a09d95',
          400: '#6f6c65',
          500: '#4a4843',
          600: '#353330',
          700: '#262421',
          800: '#1a1917',
          900: '#0f0e0d',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.02em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
