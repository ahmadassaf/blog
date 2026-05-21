import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Avatar } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Avatar');

export default {
  argTypes: {
    'shape': {
      'control': 'select',
      'options': [ 'square', 'circle' ]
    },
    'size': {
      'control': 'select',
      'options': [ 'xs', 'sm', 'md', 'lg' ]
    },
    'tone': {
      'control': 'select',
      'options': [ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ]
    }
  },
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Avatar'
};

export const Initials = {
  'args': {
    'label': 'AA',
    'shape': 'circle',
    'size': 'lg',
    'tone': 'blue'
  }
};

export const Sizes = {
  'render': () => (
    <div className='flex items-center gap-4 p-6'>
      {[ 'xs', 'sm', 'md', 'lg' ].map((size) => (
        <Avatar key={ size } label='AA' tone='blue' shape='circle' size={ size } />
      ))}
    </div>
  )
};

export const Colors = {
  'render': () => (
    <div className='flex items-center gap-4 p-6'>
      {[ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ].map((tone) => (
        <Avatar key={ tone } label='AA' tone={ tone } shape='circle' size='lg' />
      ))}
    </div>
  )
};
