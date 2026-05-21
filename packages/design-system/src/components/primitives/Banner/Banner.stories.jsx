import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { Banner } from '../../../index';

const componentDocs = getComponentDocs('Primitives/Banner');

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
  title: 'Primitives/Banner'
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
