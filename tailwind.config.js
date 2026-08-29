/**
 * Tailwind CSS v4 Configuration
 *
 * @description Tailwind CSS v4 configuration: content globs, plugins, and a minimal
 * safelist on top of the design-system preset (which supplies the theme, animations,
 * and prose typography).
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
    './node_modules/@gaudi/design-system/src/**/*.{js,jsx,mdx}'
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
  ]
};
