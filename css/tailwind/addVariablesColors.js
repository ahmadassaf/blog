module.exports = function addVariablesForColors({ addBase, theme }) {
  addBase({
    ':root': {
      '--blue-300': theme('colors.blue.300'),
      '--blue-400': theme('colors.blue.400'),
      '--blue-500': theme('colors.blue.500'),
      '--indigo-300': theme('colors.indigo.300'),
      '--transparent': 'rgba(0,0,0,0)',
      '--violet-200': theme('colors.violet.200'),
      '--white': theme('colors.white')
    }
  });
};
