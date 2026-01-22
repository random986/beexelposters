/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Admin theme colors - Professional B2B SaaS
        admin: {
          // Primary "Blurple" - Royal/Electric Blue
          primary: '#4D5BF9',
          'primary-light': '#6B77FA',
          'primary-dark': '#3D4BD9',
          // Accent colors
          'accent-red': '#FF5B5B',
          'accent-purple': '#E0E4FF',
          'accent-green': '#10B981',
          'accent-yellow': '#F59E0B',
          // Background colors
          'bg-page': '#F9FAFC',
          'bg-surface': '#FFFFFF',
          'bg-hover': '#F3F4F6',
          // Text colors
          'text-heading': '#111827',
          'text-body': '#6B7280',
          'text-muted': '#9CA3AF',
          // Border colors
          'border': '#E5E7EB',
          'border-focus': '#4D5BF9',
          // Status colors
          'status-success': '#059669',
          'status-warning': '#D97706',
          'status-error': '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Poppins'],
        'clash-display': ['Clash Display'],
        'poppins': ['Poppins'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
      },
      boxShadow: {
        'admin-sm': '0px 1px 3px rgba(0, 0, 0, 0.05)',
        'admin': '0px 4px 12px rgba(0, 0, 0, 0.05)',
        'admin-lg': '0px 8px 24px rgba(0, 0, 0, 0.08)',
        'admin-focus': '0 0 0 3px rgba(77, 91, 249, 0.15)',
      },
      borderRadius: {
        'admin': '12px',
        'admin-lg': '16px',
      },
    },
  },
  plugins: [],
}
