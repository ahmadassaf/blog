/**
 * Tailwind CSS v4 Configuration
 *
 * @description Optimized Tailwind CSS v4 configuration with modern best practices.
 * Includes custom plugins, animations, and theme extensions. Uses minimal safelist
 * and leverages v4's improved dynamic class detection.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

const addVariablesColors = require('./css/tailwind/addVariablesColors.js');
const tailwindGrid = require('./css/tailwind/tailwindGrid.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  'content': [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  'darkMode': 'class',
  'plugins': [
    addVariablesColors,
    tailwindGrid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],

  // Minimal safelist - v4 has better dynamic class detection
  'safelist': [

    // Dynamic color variations that might not be detected statically
    {
      'pattern': /^bg-(gray|blue|green|red|yellow|purple|pink|indigo|orange|teal|cyan|emerald|lime|amber|rose|fuchsia|violet)-([0-9]{2,3})$/,
      'variants': [ 'hover', 'focus', 'dark', 'dark:hover' ]
    },
    {
      'pattern': /^text-(gray|blue|green|red|yellow|purple|pink|indigo|orange|teal|cyan|emerald|lime|amber|rose|fuchsia|violet)-([0-9]{2,3})$/,
      'variants': [ 'hover', 'focus', 'dark', 'dark:hover' ]
    }
  ],
  'theme': {
    'extend': {
      'animation': {
        'aurora': 'aurora 60s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 2.5s ease-in-out infinite'
      },
      'colors': {
        'dark': '#171717',
        'gray': {
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '50': '#fafafa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717',
          '950': '#0a0a0a'
        }
      },
      'fontFamily': {
        'mono': [ 'JetBrains Mono', 'Menlo', 'Monaco', 'monospace' ],
        'sans': [ 'Inter Variable', 'system-ui', 'sans-serif' ]
      },
      'keyframes': {
        'aurora': {
          'from': {
            'backgroundPosition': '50% 50%, 50% 50%'
          },
          'to': {
            'backgroundPosition': '350% 50%, 350% 50%'
          }
        },
        'fadeInUp': {
          'from': {
            'opacity': '0',
            'transform': 'translateY(20px)'
          },
          'to': {
            'opacity': '1',
            'transform': 'translateY(0)'
          }
        },
        'shimmer': {
          '0%': { 'transform': 'translateX(-100%)' },
          '100%': { 'transform': 'translateX(100%)' }
        }
      },
      'lineHeight': {
        'relaxed': '1.7'
      },
      'typography': {
        'DEFAULT': {
          'css': {
            'fontSize': '1.125rem',
            'lineHeight': '1.7',
            'maxWidth': 'none'
          }
        }
      }
    }
  }
};
