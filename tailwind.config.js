/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      /* ═══════════════════════════════════════════════════════════════════════
         INK & ELECTRIC — Color System
         A bold editorial palette with unexpected energy
         ═══════════════════════════════════════════════════════════════════════ */
      colors: {
        // Core Ink Scale
        ink: {
          DEFAULT: '#0a0a0a',
          soft: '#141414',
          muted: '#1a1a1a',
        },
        charcoal: '#262626',
        graphite: '#404040',
        slate: '#525252',
        ash: '#737373',
        stone: '#a3a3a3',
        mist: '#d4d4d4',
        cloud: '#e5e5e5',
        ivory: '#fafafa',
        cream: '#fefce8',

        // Electric — The Signature Accent
        electric: {
          DEFAULT: '#a3e635',
          bright: '#bef264',
          dim: '#84cc16',
          dark: '#65a30d',
          glow: 'rgba(163, 230, 53, 0.15)',
          subtle: 'rgba(163, 230, 53, 0.08)',
        },

        // Semantic Colors
        success: {
          DEFAULT: '#22c55e',
          soft: 'rgba(34, 197, 94, 0.12)',
          dark: '#16a34a',
        },
        warning: {
          DEFAULT: '#f59e0b',
          soft: 'rgba(245, 158, 11, 0.12)',
          dark: '#d97706',
        },
        error: {
          DEFAULT: '#ef4444',
          soft: 'rgba(239, 68, 68, 0.12)',
          dark: '#dc2626',
        },

        // Surface Colors
        surface: {
          DEFAULT: '#141414',
          elevated: '#1a1a1a',
          hover: '#262626',
        },
      },

      /* ═══════════════════════════════════════════════════════════════════════
         Typography System
         ═══════════════════════════════════════════════════════════════════════ */
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'sm':   ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg':   ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'xl':   ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '2xl':  ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '3xl':  ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl':  ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '5xl':  ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        '6xl':  ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'hero': ['6rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        'editorial': '-0.04em',
        'tight': '-0.02em',
        'wide': '0.05em',
        'wider': '0.1em',
      },

      /* ═══════════════════════════════════════════════════════════════════════
         Shadows — Dramatic Depths
         ═══════════════════════════════════════════════════════════════════════ */
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'DEFAULT': '0 2px 8px rgba(0, 0, 0, 0.45)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.6)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.7)',
        '2xl': '0 24px 64px rgba(0, 0, 0, 0.8)',
        'electric': '0 0 30px rgba(163, 230, 53, 0.3)',
        'electric-sm': '0 0 15px rgba(163, 230, 53, 0.2)',
        'electric-lg': '0 0 50px rgba(163, 230, 53, 0.4)',
        'glow': '0 0 60px rgba(163, 230, 53, 0.2)',
        'inner-electric': 'inset 0 0 20px rgba(163, 230, 53, 0.1)',
      },

      /* ═══════════════════════════════════════════════════════════════════════
         Border Radius
         ═══════════════════════════════════════════════════════════════════════ */
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '32px',
      },

      /* ═══════════════════════════════════════════════════════════════════════
         Spacing Extensions
         ═══════════════════════════════════════════════════════════════════════ */
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      /* ═══════════════════════════════════════════════════════════════════════
         Transitions & Animations
         ═══════════════════════════════════════════════════════════════════════ */
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0, 0, 0.2, 1) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(163, 230, 53, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(163, 230, 53, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      /* ═══════════════════════════════════════════════════════════════════════
         Background Images
         ═══════════════════════════════════════════════════════════════════════ */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-electric': 'linear-gradient(135deg, #a3e635, #84cc16)',
        'gradient-electric-soft': 'linear-gradient(135deg, rgba(163, 230, 53, 0.2), rgba(132, 204, 22, 0.1))',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a, #141414)',
        'gradient-surface': 'linear-gradient(180deg, #141414, #1a1a1a)',
      },
    },
  },
  plugins: [],
}
