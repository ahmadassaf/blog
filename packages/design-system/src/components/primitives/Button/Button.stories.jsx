import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Button, buttonVariants } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Button');

export default {
  argTypes: {
    'size': {
      'control': 'select',
      'options': [ 'xs', 'sm', 'md', 'lg' ]
    },
    'tone': {
      'control': 'select',
      'options': [ 'gray', 'neutral', 'blue', 'green', 'yellow', 'red', 'indigo' ]
    },
    'variant': {
      'control': 'select',
      'options': [ ...Object.keys(buttonVariants.variants.variant) ]
    }
  },
  component: Button,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Button'
};

export const Primary = {
  'args': {
    'children': 'Read article',
    'size': 'md',
    'tone': 'blue',
    'variant': 'solid'
  }
};

export const Secondary = {
  'args': {
    'children': 'Browse posts',
    'size': 'md',
    'tone': 'gray',
    'variant': 'outline'
  }
};

export const LinkButton = {
  'args': {
    'children': 'Open blog',
    'href': '/blog',
    'tone': 'blue',
    'variant': 'outline'
  }
};

export const AllVariants = {
  'render': () => (
    <div className='flex max-w-4xl flex-wrap items-center gap-4 p-6'>
      {Object.keys(buttonVariants.variants.variant).map((variant) => (
        <Button key={ variant } variant={ variant } tone='blue'>
          {variant}
        </Button>
      ))}
    </div>
  )
};

export const Sizes = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-3 p-6'>
      {[ 'xs', 'sm', 'md', 'lg' ].map((size) => (
        <Button key={ size } size={ size }>Button {size}</Button>
      ))}
    </div>
  )
};
