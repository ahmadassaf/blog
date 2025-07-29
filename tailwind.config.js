/**
 * Tailwind CSS Configuration
 *
 * @description Main Tailwind CSS configuration with custom plugins, animations,
 * and theme extensions. Includes custom grid utilities, variable colors,
 * forms, typography, and aurora animation effects.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

const addVariablesColors = require('./css/tailwind/addVariablesColors.js');
const tailwindGrid = require('./css/tailwind/tailwindGrid.js');

module.exports = {
  'darkMode': 'class',
  'plugins': [
    addVariablesColors,
    tailwindGrid,
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
  'theme': {
    'extend': {
      'animation': {
        'aurora': 'aurora 60s linear infinite'
      },
      'colors': {
        'dark': '#171717',
        'gray': {
          '700': '#404040',
          '800': '#262626',
          '900': '#171717'
        }
      },
      'keyframes': {
        'aurora': {
          'from': {
            'backgroundPosition': '50% 50%, 50% 50%'
          },
          'to': {
            'backgroundPosition': '350% 50%, 350% 50%'
          }
        }
      }
    }
  }
};
