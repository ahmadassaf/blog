const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  'content': [
    './app/**/*.js',
    './pages/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
    './data/**/*.mdx'
  ],
  'darkMode': 'class',
  'plugins': [ require('@tailwindcss/typography') ],
  'theme': {
    'extend': {
      'borderWidth': {
        '10': '10px'
      },
      'boxShadow': {
        'dark': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)'
      },
      'colors': {
        'gray': colors.neutral,
        'primary': colors.blue
      },
      'fontFamily': {
        'sans': [ 'var(--font-space-inter)', ...defaultTheme.fontFamily.sans ]
      },
      'lineHeight': {
        '11': '2.75rem',
        '12': '3rem',
        '13': '3.25rem',
        '14': '3.5rem'
      },
      'spacing': {
        '9/16': '56.25%'
      },
      'typography': (theme) => {
        return {
          'DEFAULT': {
            'css': {
              'a': {
                '&:hover': {
                  'color': `${theme('colors.primary.600')} !important`
                },
                'code': { 'color': theme('colors.primary.400') },
                'color': theme('colors.primary.700')
              },
              'blockquote': {
                'borderLeftColor': theme('colors.gray.200'),
                'color': theme('colors.gray.900')
              },
              'code': {
                'backgroundColor': theme('colors.gray.100'),
                'borderRadius': '0.25rem',
                'color': theme('colors.red.500'),
                'paddingBottom': '2px',
                'paddingLeft': '4px',
                'paddingRight': '4px',
                'paddingTop': '2px'
              },
              'code::after': {
                'content': 'none'
              },
              'code::before': {
                'content': 'none'
              },
              'color': theme('colors.gray.700'),
              'details': {
                'backgroundColor': theme('colors.gray.100'),
                'borderRadius': '0.25rem',
                'paddingBottom': '2px',
                'paddingLeft': '4px',
                'paddingRight': '4px',
                'paddingTop': '2px'
              },
              'h1': {
                'color': theme('colors.gray.900'),
                'fontWeight': '700',
                'letterSpacing': theme('letterSpacing.tight'),
                'marginTop': '2rem'
              },
              'h2': {
                'color': theme('colors.gray.900'),
                'fontWeight': '700',
                'letterSpacing': theme('letterSpacing.tight')
              },
              'h3': {
                'color': theme('colors.gray.900'),
                'fontWeight': '600'
              },
              'h4,h5,h6': {
                'color': theme('colors.gray.900')
              },
              'hr': { 'borderColor': theme('colors.gray.200') },
              'ol li::marker': {
                'color': theme('colors.gray.500'),
                'fontWeight': '600'
              },
              'pre': {
                'backgroundColor': theme('colors.gray.800')
              },
              'strong': { 'color': theme('colors.gray.600') },
              'ul li::marker': {
                'backgroundColor': theme('colors.gray.500')
              }
            }
          },
          'dark': {
            'css': {
              'a': {
                '&:hover': {
                  'color': `${theme('colors.primary.400')} !important`
                },
                'code': { 'color': theme('colors.primary.400') },
                'color': theme('colors.primary.700')
              },
              'blockquote': {
                'borderLeftColor': theme('colors.gray.700'),
                'color': theme('colors.gray.100')
              },
              'code': {
                'backgroundColor': theme('colors.gray.800')
              },
              'color': theme('colors.gray.300'),
              'details': {
                'backgroundColor': theme('colors.gray.800')
              },
              'h1': {
                'color': theme('colors.gray.100'),
                'fontWeight': '700',
                'letterSpacing': theme('letterSpacing.tight')
              },
              'h2': {
                'color': theme('colors.gray.100'),
                'fontWeight': '700',
                'letterSpacing': theme('letterSpacing.tight')
              },
              'h3': {
                'color': theme('colors.gray.100'),
                'fontWeight': '600'
              },
              'h4,h5,h6': {
                'color': theme('colors.gray.100')
              },
              'hr': { 'borderColor': theme('colors.gray.700') },
              'ol li::marker': {
                'color': theme('colors.gray.400'),
                'fontWeight': '600'
              },
              'pre': {
                'backgroundColor': theme('colors.gray.800')
              },
              'strong': { 'color': theme('colors.gray.100') },
              'tbody': {
                'tr': {
                  'borderBottomColor': theme('colors.gray.700')
                }
              },
              'thead': {
                'th': {
                  'color': theme('colors.gray.100')
                }
              },
              'ul li::marker': {
                'backgroundColor': theme('colors.gray.400')
              }
            }
          }
        };
      }
    }
  }
};
