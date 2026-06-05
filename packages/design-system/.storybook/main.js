import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const sourceDir = resolve(rootDir, 'packages/design-system/src');
const lodashEsDir = resolve(rootDir, 'node_modules/lodash-es');

const config = {
  'addons': [
    '@storybook/addon-docs',
    '@storybook/addon-a11y'
  ],
  'docs': {
    'autodocs': 'tag'
  },
  'framework': {
    'name': '@storybook/nextjs-vite',
    'options': {}
  },
  'staticDirs': [ '../../../public' ],
  'stories': [
    './stories/**/*.stories.@(js|jsx|mdx)',
    '../src/components/**/*.stories.@(js|jsx|mdx)'
  ],
  'viteFinal': (viteConfig) => {
    return {
      ...viteConfig,
      'esbuild': {
        ...viteConfig.esbuild,
        'include': /src\/.*\.js$/,
        'loader': 'jsx'
      },
      'optimizeDeps': {
        ...viteConfig.optimizeDeps,
        'include': [
          ...(viteConfig.optimizeDeps?.include || []),
          'recharts/lib/cartesian/Area.js',
          'recharts/lib/cartesian/Bar.js',
          'recharts/lib/cartesian/CartesianGrid.js',
          'recharts/lib/cartesian/Line.js',
          'recharts/lib/cartesian/Scatter.js',
          'recharts/lib/cartesian/XAxis.js',
          'recharts/lib/cartesian/YAxis.js',
          'recharts/lib/chart/AreaChart.js',
          'recharts/lib/chart/BarChart.js',
          'recharts/lib/chart/ComposedChart.js',
          'recharts/lib/chart/LineChart.js',
          'recharts/lib/chart/PieChart.js',
          'recharts/lib/chart/RadialBarChart.js',
          'recharts/lib/chart/ScatterChart.js',
          'recharts/lib/component/Cell.js',
          'recharts/lib/component/Legend.js',
          'recharts/lib/component/ResponsiveContainer.js',
          'recharts/lib/component/Tooltip.js',
          'recharts/lib/polar/Pie.js',
          'recharts/lib/polar/RadialBar.js'
        ],
        'rolldownOptions': {
          ...viteConfig.optimizeDeps?.rolldownOptions,
          'moduleTypes': {
            ...viteConfig.optimizeDeps?.rolldownOptions?.moduleTypes,
            '.js': 'jsx'
          },
          'transform': {
            ...viteConfig.optimizeDeps?.rolldownOptions?.transform,
            'jsx': 'react-jsx'
          }
        }
      },
      'resolve': {
        ...viteConfig.resolve,
        'alias': [
          {
            'find': /^lodash\/(.+)\.js$/,
            'replacement': `${lodashEsDir}/$1.js`
          },
          {
            'find': /^lodash\/(.+)$/,
            'replacement': `${lodashEsDir}/$1.js`
          },
          {
            'find': /^recharts$/,
            'replacement': resolve(rootDir, 'node_modules/recharts/lib/index.js')
          },
          {
            'find': /^recharts\/es6\/(?<path>.+)$/,
            'replacement': `${resolve(rootDir, 'node_modules/recharts/lib')}/$<path>`
          },
          {
            'find': 'contentlayer/generated',
            'replacement': resolve(rootDir, '.contentlayer/generated')
          },
          {
            'find': /^@\/components\/(?<path>.*)$/,
            'replacement': `${resolve(sourceDir, 'components')}/$1`
          },
          {
            'find': /^@\/css\/(?<path>.*)$/,
            'replacement': `${resolve(sourceDir, 'styles')}/$1`
          },
          {
            'find': /^@\/(?<path>.*)$/,
            'replacement': `${rootDir}/$1`
          }
        ]
      }
    };
  }
};

export default config;
