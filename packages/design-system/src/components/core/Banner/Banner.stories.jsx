import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Banner } from '../../../index';

const componentDocs = getComponentDocs('Core/Banner');

export default {
  component: Banner,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Banner'
};

export const Default = {
  'args': {
    'children': 'New essays and project notes are available.',
    title: 'Now published'
  }
};

export const Linked = {
  'args': {
    'children': 'Read the latest articles.',
    'href': '/blog',
    'title': 'Updated'
  }
};

export const Variants = {
  'render': () => (
    <div className='space-y-3 p-6'>
      {[ 'solid', 'soft', 'outline' ].map((variant) => (
        <Banner key={ variant } title={ variant } tone='blue' variant={ variant }>
          New design system release available.
        </Banner>
      ))}
    </div>
  )
};

export const Tones = {
  'render': () => (
    <div className='space-y-3 p-6'>
      {[ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ].map((tone) => (
        <Banner key={ tone } title={ tone } tone={ tone } variant='soft'>
          Concise announcement text.
        </Banner>
      ))}
    </div>
  )
};
