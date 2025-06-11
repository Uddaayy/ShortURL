/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a0a',
          800: '#171717',
          700: '#262626',
          600: '#404040',
        },
        electric: {
          500: '#3b82f6',
          400: '#60a5fa',
          300: '#93c5fd',
        },
        cyan: {
          500: '#06b6d4',
          400: '#22d3ee',
          300: '#67e8f9',
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-down': 'fade-down 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-left': 'fade-left 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'fade-right': 'fade-right 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'scale-fade': 'scale-fade 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'blur-in': 'blur-in 1s ease-out',
        'typewriter': 'typewriter 3s steps(40, end)',
        'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
        'smooth-bounce': 'smooth-bounce 2s ease-in-out infinite',
        'gentle-sway': 'gentle-sway 4s ease-in-out infinite',
        'breath': 'breath 3s ease-in-out infinite',
        'liquid-morph': 'liquid-morph 8s ease-in-out infinite',
        'parallax-float': 'parallax-float 6s ease-in-out infinite',
        'magnetic-pull': 'magnetic-pull 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'glass-reflect': 'glass-reflect 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(60px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-60px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-60px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(60px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'scale-fade': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'blur-in': {
          '0%': {
            opacity: '0',
            filter: 'blur(10px)',
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0px)',
          },
        },
        'typewriter': {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100%',
          },
        },
        'gradient-shift': {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)',
          },
        },
        'ripple': {
          '0%': {
            transform: 'scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
        'smooth-bounce': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'gentle-sway': {
          '0%, 100%': {
            transform: 'translateX(0) rotate(0deg)',
          },
          '25%': {
            transform: 'translateX(5px) rotate(1deg)',
          },
          '75%': {
            transform: 'translateX(-5px) rotate(-1deg)',
          },
        },
        'breath': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.05)',
          },
        },
        'liquid-morph': {
          '0%, 100%': {
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg)',
          },
          '25%': {
            borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'rotate(90deg)',
          },
          '50%': {
            borderRadius: '50% 60% 30% 60% / 60% 40% 60% 40%',
            transform: 'rotate(180deg)',
          },
          '75%': {
            borderRadius: '60% 40% 60% 40% / 30% 70% 40% 50%',
            transform: 'rotate(270deg)',
          },
        },
        'parallax-float': {
          '0%, 100%': {
            transform: 'translateY(0px) translateX(0px)',
          },
          '33%': {
            transform: 'translateY(-20px) translateX(10px)',
          },
          '66%': {
            transform: 'translateY(10px) translateX(-5px)',
          },
        },
        'magnetic-pull': {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'glass-reflect': {
          '0%': {
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            transform: 'translateX(-100%)',
          },
          '50%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
            transform: 'translateX(100%)',
          },
        },
        'neon-flicker': {
          '0%, 100%': {
            textShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6, 0 0 15px #3b82f6',
          },
          '50%': {
            textShadow: '0 0 2px #3b82f6, 0 0 5px #3b82f6, 0 0 8px #3b82f6, 0 0 12px #06b6d4',
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};