import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { TextHighlight } from '../../../index';

const componentDocs = getComponentDocs('Core/TextHighlight');

export default {
  argTypes: {
    'tone': {
      'control': 'select',
      'options': [ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ]
    },
    'variant': {
      'control': 'select',
      'options': [ 'marker', 'soft', 'underline' ]
    }
  },
  component: TextHighlight,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/TextHighlight'
};

export const Variants = {
  'render': () => (
    <div className='space-y-4 p-6 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
      {[ 'marker', 'soft', 'underline' ].map((variant) => (
        <p key={ variant }>
          Design systems make <TextHighlight variant={ variant } tone='green'>{variant} emphasis</TextHighlight> reusable.
        </p>
      ))}
    </div>
  )
};

export const Default = {
  'render': () => (
    <p className='p-6 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
      Design systems make <TextHighlight>consistency visible</TextHighlight>.
    </p>
  )
};

export const Tones = {
  'render': () => (
    <div className='space-y-3 p-6 text-xl font-semibold text-gray-900 dark:text-gray-100'>
      {[ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ].map((tone) => (
        <p key={ tone }>
          <TextHighlight tone={ tone } animate={ false }>{tone}</TextHighlight> highlight tone
        </p>
      ))}
    </div>
  )
};

export const Static = {
  'render': () => (
    <p className='p-6 text-2xl font-semibold text-gray-900 dark:text-gray-100'>
      Static rendering keeps <TextHighlight animate={ false } tone='indigo'>visual regression tests stable</TextHighlight>.
    </p>
  )
};
