import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { renderComponentExample } from '../../../../.storybook/stories/ComponentExamples';

import * as componentModule from './index';

const componentDocs = getComponentDocs('Content/Search');

export default {
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Content/Search'
};

export const Example = {
  'render': () => renderComponentExample('Content/Search', componentModule)
};
