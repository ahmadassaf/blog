import tailwindColors from 'tailwindcss/colors';

const shadeOrder = [ '50', '100', '200', '300', '500', '600', '700', '900' ];
const pickShades = (color) => Object.fromEntries(shadeOrder.map((shade) => [ shade, color[shade] ]));

export const palette = {
  'blue': pickShades(tailwindColors.blue),
  'gray': pickShades(tailwindColors.gray),
  'green': pickShades(tailwindColors.green),
  'indigo': pickShades(tailwindColors.indigo),
  'neutral': pickShades(tailwindColors.neutral),
  'red': pickShades(tailwindColors.red),
  'yellow': pickShades(tailwindColors.yellow)
};

export const semanticColors = {
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

export const colors = {
  ...palette,
  ...semanticColors
};

export const typography = {
  'fontFamily': {
    'mono': [ 'JetBrains Mono', 'Menlo', 'Monaco', 'monospace' ],
    'sans': [ 'var(--font-space-inter)', 'Inter Variable', 'system-ui', 'sans-serif' ]
  },
  'lineHeight': {
    'body': '1.6',
    'prose': '1.7',
    'tight': '1.15'
  },
  'prose': {
    'fontSize': '1rem',
    'headingMargin': {
      'h1': {
        'bottom': '0.95em',
        'top': '1.25em'
      },
      'h2': {
        'bottom': '0.9em',
        'top': '1.2em'
      },
      'h3': {
        'bottom': '0.8em',
        'top': '1.1em'
      },
      'h4': {
        'bottom': '0.7em',
        'top': '1em'
      }
    },
    'maxWidth': 'none'
  }
};

export const radii = {
  'card': '0.5rem',
  'control': '0.5rem',
  'pill': '0.125rem',
  'sm': '0.375rem'
};

export const shadows = {
  'card': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'cardHover': '0 10px 20px -12px rgb(0 0 0 / 0.25)',
  'kbd': '0 2px 0 0 rgb(0 0 0 / 0.08)',
  'kbdDark': '0 2px 0 0 rgb(0 0 0 / 0.5)'
};

export const tokens = {
  colors,
  palette,
  radii,
  semanticColors,
  shadows,
  typography
};
