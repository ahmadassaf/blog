import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { renderComponentExample } from '../../../../.storybook/stories/ComponentExamples';

import * as componentModule from './index';

const componentDocs = getComponentDocs('Navigation/MenuMobile');

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
  title: 'Navigation/MenuMobile'
};

export const Example = {
  'render': () => renderComponentExample('Navigation/MenuMobile', componentModule)
};
