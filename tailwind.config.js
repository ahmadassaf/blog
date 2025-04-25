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
