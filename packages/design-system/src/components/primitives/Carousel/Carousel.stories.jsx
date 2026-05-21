import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Carousel, carouselVariants } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Carousel');

const editorialItems = [
  {
    'action': 'Read article',
    'description': 'A practical walkthrough of how graph-shaped context changes retrieval and reasoning systems.',
    'eyebrow': 'Knowledge Graphs',
    'href': '/blog',
    'id': 'knowledge-graphs',
    'title': 'An Introduction to Knowledge Graphs'
  },
  {
    'action': 'Explore notes',
    'description': 'Reusable tokens, layout primitives, and accessible content components for long-form publishing.',
    'eyebrow': 'Design Systems',
    'href': '/blog',
    'id': 'design-systems',
    'title': 'Design systems keep editorial rhythm predictable'
  },
  {
    'action': 'View project',
    'description': 'A compact view into project architecture, documentation, and implementation decisions.',
    'eyebrow': 'Projects',
    'href': '/blog/projects',
    'id': 'projects',
    'title': 'Project notes for engineering work'
  }
];

const appleItems = [
  {
    'content': 'Use this variant for horizontal editorial cards where the image and title do most of the work. The expanded state gives readers more detail without navigating away.',
    'description': 'A larger card format for feature collections.',
    'eyebrow': 'Artificial Intelligence',
    'id': 'ai',
    'title': 'You can do more with AI.'
  },
  {
    'content': 'Cards keep a consistent width, snap in a horizontal rail, and expose a dialog for deeper content when selected.',
    'description': 'Dense but readable cards for grouped content.',
    'eyebrow': 'Productivity',
    'id': 'productivity',
    'title': 'Enhance your productivity.'
  },
  {
    'content': 'Use concise labels and meaningful accessible names. Decorative images can use an empty alt value.',
    'description': 'A product-style carousel card treatment.',
    'eyebrow': 'Product',
    'id': 'product',
    'title': 'Launching a focused component system.'
  }
];

export default {
  argTypes: {
    'size': {
      'control': 'select',
      'options': [ ...Object.keys(carouselVariants.variants.size) ]
    },
    'variant': {
      'control': 'select',
      'options': [ ...Object.keys(carouselVariants.variants.variant) ]
    }
  },
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Primitives/Carousel'
};

export const Standard = {
  'args': {
    'ariaLabel': 'Featured articles',
    'classNames': {
      'description': '!text-white/95 drop-shadow-sm',
      'eyebrow': '!text-white/85 drop-shadow-sm',
      'title': '!text-white drop-shadow-sm'
    },
    'items': editorialItems,
    'loop': true,
    'variant': 'standard'
  }
};

export const AppleCards = {
  'args': {
    'ariaLabel': 'Featured cards',
    'classNames': {
      'description': '!text-white/95 drop-shadow-sm',
      'eyebrow': '!text-white/85 drop-shadow-sm',
      'title': '!text-white drop-shadow-sm'
    },
    'items': appleItems,
    'loop': true,
    'variant': 'apple'
  }
};

export const Sizes = {
  'render': () => (
    <div className='space-y-8'>
      <Carousel ariaLabel='Small carousel' items={ editorialItems } size='sm' />
      <Carousel ariaLabel='Large carousel' items={ editorialItems } size='lg' />
    </div>
  )
};
