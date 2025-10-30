import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',      // Black - main brand color
        secondary: '#FFFFFF',    // White
        accent: '#2563eb',       // Blue brand accent for CTAs and hover states
        'accent-hover': '#1d4ed8', // Darker blue for hover
        neutral: '#f5f5f5',      // Light gray for backgrounds
        'base-100': '#ffffff',   // Main background
        'base-200': '#fafafa',   // Secondary background
        'base-300': '#f0f0f0',   // Tertiary background
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Archivo', 'Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '6rem',
          '2xl': '8rem',
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-down': 'slideInDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'marquee': 'marquee 30s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            textShadow: '0 0 20px rgba(37, 99, 235, 0.3), 0 0 40px rgba(37, 99, 235, 0.2)' 
          },
          '50%': { 
            textShadow: '0 0 40px rgba(37, 99, 235, 0.6), 0 0 60px rgba(37, 99, 235, 0.4)' 
          },
        },
      },
      transitionDuration: {
        '600': '600ms',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        angal: {
          "primary": "#000000",
          "secondary": "#FFFFFF",
          "accent": "#2563eb",
          "neutral": "#f5f5f5",
          "base-100": "#ffffff",
          "base-200": "#fafafa",
          "base-300": "#f0f0f0",
          "info": "#0ea5e9",
          "success": "#10b981",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
};
