import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { ImageFallback } from '../../../index';

const componentDocs = getComponentDocs('Primitives/ImageFallback');

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
  title: 'Primitives/ImageFallback'
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
