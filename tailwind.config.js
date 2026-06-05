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

const designSystemPreset = require('@gaudi/design-system/tailwind-preset');
const addVariablesColors = require('@gaudi/design-system/tailwind/addVariablesColors');
const tailwindGrid = require('@gaudi/design-system/tailwind/tailwindGrid');

/** @type {import('tailwindcss').Config} */
module.exports = {
  'content': [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './packages/design-system/src/**/*.{js,jsx,mdx}'
  ],
  'darkMode': 'class',
  'plugins': [
    addVariablesColors,
    tailwindGrid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  'presets': [ designSystemPreset ],

  // Minimal safelist - v4 has better dynamic class detection
  'safelist': [

    // DS palette only: gray, neutral, blue, green, yellow, red, and indigo.
    {
      'pattern': /^bg-(?:gray|neutral|blue|green|yellow|red|indigo)-(?:50|100|200|300|500|600|700|900)$/,
      'variants': [ 'hover', 'focus', 'dark', 'dark:hover' ]
    },
    {
      'pattern': /^text-(?:gray|neutral|blue|green|yellow|red|indigo)-(?:50|100|200|300|500|600|700|900)$/,
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
      }
    }
  }
};
