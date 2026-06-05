/* eslint-disable quote-props */
import './preview.css';

const preview = {
  parameters: {
    a11y: {
      options: {
        runOnly: {
          type: 'tag',
          values: [ 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa' ]
        }
      },
      test: 'error'
    },
    actions: {
      argTypesRegex: '^on.*'
    },
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#171717' },
        light: { name: 'Light', value: '#ffffff' }
      }
    },
    controls: {
      matchers: {
        color: /(?:background|color)$/i,
        date: /Date$/i
      }
    },
    nextjs: {
      appDirectory: true
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Overview',
          [
            'Getting Started',
            'Accessibility',
            'Colors & Tokens',
            'Typography',
            'Icons',
            'Indicators'
          ],
          'Core',
          'Blocks',
          'Content',
          'Command',
          'MDX',
          'Navigation',
          'Post',
          'Layout',
          'Forms',
          'Utilities'
        ]
      }
    }
  }
};

export default preview;
