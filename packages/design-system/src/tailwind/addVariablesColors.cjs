module.exports = function addVariablesForColors({ addBase, theme }) {
  addBase({
    ':root': {
      '--blue-100': theme('colors.blue.100'),
      '--blue-200': theme('colors.blue.200'),
      '--blue-300': theme('colors.blue.300'),
      '--blue-500': theme('colors.blue.500'),
      '--blue-600': theme('colors.blue.600'),
      '--blue-700': theme('colors.blue.700'),
      '--dark': '#171717',
      '--gray-100': theme('colors.gray.100'),
      '--gray-200': theme('colors.gray.200'),
      '--gray-300': theme('colors.gray.300'),
      '--gray-500': theme('colors.gray.500'),
      '--gray-600': theme('colors.gray.600'),
      '--gray-700': '#404040',
      '--gray-900': '#171717',
      '--indigo-300': theme('colors.indigo.300'),
      '--neutral-100': theme('colors.neutral.100'),
      '--neutral-200': theme('colors.neutral.200'),
      '--neutral-300': theme('colors.neutral.300'),
      '--neutral-500': theme('colors.neutral.500'),
      '--neutral-600': theme('colors.neutral.600'),
      '--neutral-700': theme('colors.neutral.700'),
      '--transparent': 'rgba(0,0,0,0)',
      '--white': theme('colors.white')
    }
  });
};
