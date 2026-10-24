/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#061325', // Deep oceanic midnight blue
          900: '#0C2340', // Rich royal navy
          800: '#153A6B', // Secondary royal blue
          700: '#1D4ED8', // Vivid royal blue
        },
        click: {
          blue: '#1D4ED8',       // Primary Royal Blue
          blueHover: '#1E40AF',  // Darker Blue on Hover
          blueLight: '#3B82F6',  // Bright Accent Blue
          blueSoft: '#EFF6FF',   // Subtle Blue Tint
          yellow: '#F59E0B',     // Signature Orangish Yellow / Amber
          yellowHover: '#D97706',// Deep Orangish Yellow
          yellowLight: '#FBBF24',// Bright Sunshine Yellow
          yellowSoft: '#FEF3C7', // Soft Creamy Amber Tint
          orange: '#F97316',     // Vibrant Warm Orange
          dark: '#0F172A',       // Slate 900
          muted: '#64748B',      // Slate 500
          light: '#F8FAFC',      // Slate 50
          border: '#E2E8F0',     // Slate 200
        },
        luxe: {
          dark: '#0F172A',
          muted: '#64748B',
          light: '#F8FAFC',
          border: '#E2E8F0',
          accent: '#1D4ED8',
          gold: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        card: '0 4px 20px -2px rgba(11, 18, 32, 0.06)',
        elevated: '0 20px 25px -5px rgba(11, 18, 32, 0.08), 0 10px 10px -5px rgba(11, 18, 32, 0.04)',
      }
    },
  },
  plugins: [],
}
