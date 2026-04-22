/**
 * Tailwind CSS Configuration - src2 design system
 * Dark midnight/electric theme, Outfit/DM Sans/JetBrains Mono
 */

import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    extend: {
      colors: {
        midnight: '#0a0e1a',
        deep: '#111827',
        slate: '#1e293b',
        steel: '#334155',
        mist: '#94a3b8',
        cloud: '#e2e8f0',
        electric: '#06b6d4',
        volt: '#22d3ee',
        mint: '#10b981',
        coral: '#f43f5e',
        amber: '#f59e0b',
        syntax: {
          base: '#e9e9e9',
          comment: '#6c8bb9',
          punctuation: '#7ec2ff',
          property: '#ff7ea6',
          string: '#25c52e',
          operator: '#67cdff',
          keyword: '#e6ac00',
          function: '#f182fa'
        }
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace']
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#e2e8f0',
            '--tw-prose-headings': '#e2e8f0',
            '--tw-prose-links': '#06b6d4',
            '--tw-prose-bold': '#e2e8f0',
            '--tw-prose-code': '#22d3ee',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-pre-border': 'rgba(51, 65, 85, 0.3)'
          }
        }
      }
    }
  },

  plugins: [typography, forms, aspectRatio]
}
