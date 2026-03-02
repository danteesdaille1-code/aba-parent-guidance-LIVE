import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New gradient-based pastel color scheme
        'gradient-start': '#E8D5F2',  // Soft lavender
        'gradient-mid': '#B8E5F0',    // Pastel blue
        'gradient-end': '#D4F1D8',    // Mint green

        primary: {
          light: '#B8E5F0',
          DEFAULT: '#7FC8E8',
          dark: '#4A9DBF'
        },
        success: {
          light: '#D4F1D8',
          DEFAULT: '#7FB685',
          dark: '#5A9863'
        },
        lavender: {
          light: '#F5ECFA',
          DEFAULT: '#E8D5F2',
          dark: '#C8B0DB'
        },

        // New warm gradient colors for hero
        'hero-gradient': {
          'dark-blue': '#3B5364',      // Dark blue/teal top
          'dark-teal': '#456472',      // Teal transition
          'orange': '#E8864B',         // Warm orange middle
          'peach': '#E89B6B',          // Peachy orange
          'deep-orange': '#C96D4A',    // Deeper orange/red bottom
          'dark-red': '#A85844',       // Dark red base
        },

        // Dark mode colors
        dark: {
          bg: '#1A1F2E',
          surface: '#252B3D',
          card: '#2D3548',
          border: '#3A4259',
          text: {
            primary: '#E4E7EB',
            secondary: '#D1D5DB',  // Updated for better contrast (was #A8B0C1)
            muted: '#9CA3AF'       // Updated for better readability (was #6B7280)
          }
        },

        // Light mode colors - Warm aesthetic (UPDATED - more visible)
        background: "#EBE0D5",       // Warm beige - clearly visible (12% darker than white)
        'warm-bg': '#EBE0D5',        // Main background - clearly visible beige
        'warm-surface': '#F5EDE3',   // Cards, nav, footer - soft cream (8% darker)
        'warm-elevated': '#FAF4EC',  // Inputs, interactive - light warm (5% darker)
        'warm-subtle': '#F0E6DB',    // Info boxes - muted beige (10% darker)
        'warm-border': '#D9C9B8',    // Borders - warm tan (more visible)
        textDark: "#2C3E50",
      },
      backgroundImage: {
        'gradient-pastel': 'linear-gradient(135deg, #E8D5F2 0%, #B8E5F0 50%, #D4F1D8 100%)',
        'gradient-pastel-reverse': 'linear-gradient(135deg, #D4F1D8 0%, #B8E5F0 50%, #E8D5F2 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1F2E 0%, #252B3D 100%)',
        'hero-sunset': 'linear-gradient(180deg, #3B5364 0%, #456472 20%, #E8864B 50%, #E89B6B 70%, #C96D4A 85%, #A85844 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184, 229, 240, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(184, 229, 240, 0.6)' },
        },
      },
      boxShadow: {
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'card-hover-dark': '0 20px 40px rgba(0, 0, 0, 0.4)',
        'glow-primary': '0 0 20px rgba(127, 200, 232, 0.4)',
        'glow-lavender': '0 0 20px rgba(232, 213, 242, 0.4)',
      },
    },
  },
  plugins: [],
};
export default config;
