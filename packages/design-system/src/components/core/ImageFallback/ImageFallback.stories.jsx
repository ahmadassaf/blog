import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { ImageFallback } from '../../../index';

const componentDocs = getComponentDocs('Core/ImageFallback');

export default {
  component: ImageFallback,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/ImageFallback'
};

export const Default = {
  'args': {
    'alt': 'Blog logo',
    'fallback': '/static/images/logo.svg',
    'height': 96,
    'src': '/static/images/logo.svg',
    'width': 96
  }
};

export const FallbackSource = {
  'args': {
    'alt': 'Fallback blog logo',
    'fallback': '/static/images/logo.svg',
    'height': 96,
    'radius': 'md',
    'src': '/static/images/missing-logo.svg',
    'width': 96
  }
};

export const Radii = {
  'render': () => (
    <div className='flex flex-wrap items-center gap-6 p-6'>
      {[ 'none', 'sm', 'md', 'lg' ].map((radius) => (
        <figure key={ radius } className='space-y-2 text-sm text-gray-600'>
          <ImageFallback alt={ `${radius} logo` } fallback='/static/images/logo.svg' height={ 72 } radius={ radius } src='/static/images/logo.svg' width={ 72 } />
          <figcaption>{radius}</figcaption>
        </figure>
      ))}
    </div>
  )
};
