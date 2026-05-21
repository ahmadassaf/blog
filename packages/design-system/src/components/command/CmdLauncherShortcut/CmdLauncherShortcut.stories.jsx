import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { renderComponentExample } from '../../../../.storybook/stories/ComponentExamples';

import * as componentModule from './index';

const componentDocs = getComponentDocs('Command/CmdLauncherShortcut');

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
  title: 'Command/CmdLauncherShortcut'
};

export const Example = {
  'render': () => renderComponentExample('Command/CmdLauncherShortcut', componentModule)
};
