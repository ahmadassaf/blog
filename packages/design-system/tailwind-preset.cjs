const tailwindColors = require('tailwindcss/colors');

const shadeOrder = [ '50', '100', '200', '300', '500', '600', '700', '900' ];
const pickShades = (color) => Object.fromEntries(shadeOrder.map((shade) => [ shade, color[shade] ]));

const palette = {
  'blue': pickShades(tailwindColors.blue),
  'gray': pickShades(tailwindColors.gray),
  'green': pickShades(tailwindColors.green),
  'indigo': pickShades(tailwindColors.indigo),
  'neutral': pickShades(tailwindColors.neutral),
  'red': pickShades(tailwindColors.red),
  'yellow': pickShades(tailwindColors.yellow)
};

const semanticColors = {
  'accent': {
    'DEFAULT': palette.blue[500],
    'dark': palette.blue[700],
    'foreground': '#ffffff',
    'muted': palette.blue[100],
    'subtle': palette.blue[50]
  },
  'border': {
    'DEFAULT': palette.neutral[300],
    'dark': '#303030',
    'muted': palette.neutral[100]
  },
  'dark': '#171717',
  'surface': {
    'DEFAULT': '#ffffff',
    'dark': '#171717',
    'muted': palette.neutral[50],
    'raised': '#ffffff'
  },
  'text': {
    'DEFAULT': '#171717',
    'inverse': '#ffffff',
    'muted': palette.neutral[700],
    'subtle': palette.neutral[500]
  }
};

const tokens = {
  colors: {
    ...palette,
    ...semanticColors
  },
  fontFamily: {
    mono: [ 'JetBrains Mono', 'Menlo', 'Monaco', 'monospace' ],
    sans: [ 'var(--font-space-inter)', 'Inter Variable', 'system-ui', 'sans-serif' ]
  }
};

module.exports = {
  theme: {
    extend: {
      animation: {
        aurora: 'aurora 60s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        shimmer: 'shimmer 2.5s ease-in-out infinite'
      },
      colors: tokens.colors,
      fontFamily: tokens.fontFamily,
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%'
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%'
          }
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      lineHeight: {
        relaxed: '1.7'
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1rem',
            lineHeight: '1.7',
            maxWidth: 'none'
          }
        }
      }
    }
  }
};
