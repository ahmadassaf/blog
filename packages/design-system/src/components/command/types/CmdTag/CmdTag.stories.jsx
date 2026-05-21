import { createComponentDocsPage, getComponentDocs } from '../../../../../.storybook/stories/ComponentDocs';
import { renderComponentExample } from '../../../../../.storybook/stories/ComponentExamples';

import * as componentModule from './index';

const componentDocs = getComponentDocs('Command/Types/CmdTag');

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
  title: 'Command/Types/CmdTag'
};

export const Example = {
  'render': () => renderComponentExample('Command/Types/CmdTag', componentModule)
};
