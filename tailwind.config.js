/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Premium Color Palette - Indigo-based (Stripe-inspired)
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',  // Main brand color
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        neutral: {
          0:   '#ffffff',
          50:  '#fafbfc',  // Main background - warmer than pure white
          100: '#f5f7fa',
          200: '#e4e7eb',
          300: '#cbd2d9',
          400: '#9aa5b1',
          500: '#7b8794',
          600: '#616e7c',
          700: '#52606d',
          800: '#3e4c59',
          900: '#323f4b',
          950: '#1f2933',
        },
        accent: {
          500: '#a855f7',
          600: '#9333ea',
        },
        success: {
          50:  '#ecfdf5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        error: {
          50:  '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        warning: {
          50:  '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
      },
      // Premium Typography
      fontSize: {
        xs:   ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        sm:   ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        base: ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        lg:   ['1.125rem', { lineHeight: '1.5', letterSpacing: '0' }],
        xl:   ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '3xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      // Premium Shadows - Layered for depth
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'primary': '0 8px 16px -4px rgba(99, 102, 241, 0.2), 0 4px 8px -2px rgba(99, 102, 241, 0.1)',
      },
      // Refined Border Radius
      borderRadius: {
        'sm':   '0.375rem',
        'DEFAULT': '0.5rem',
        'lg':   '0.75rem',
        'xl':   '1rem',
        '2xl':  '1.5rem',
      },
      // Premium Transitions
      transitionDuration: {
        '75': '75ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      // Animation
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
