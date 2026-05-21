import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const sourceDir = resolve(rootDir, 'packages/design-system/src');

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
