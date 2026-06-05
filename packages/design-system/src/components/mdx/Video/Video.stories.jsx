import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { renderComponentExample } from '../../../../.storybook/stories/ComponentExamples';

import * as componentModule from './index';
import Video from './Video';

const componentDocs = getComponentDocs('MDX/Video');

const sharedArgs = {
  'thumbnailAlt': 'Knowledge graph article video preview',
  'thumbnailSrc': '/static/images/og-card.jpg',
  'title': 'Knowledge graph walkthrough',
  'videoSrc': 'https://www.youtube.com/embed/qh3NGpYRG3I'
};

export default {
  argTypes: {
    animationStyle: {
      control: 'select',
      options: [ 'from-center', 'from-bottom', 'from-top', 'from-left', 'from-right', 'fade', 'top-in-bottom-out', 'left-in-right-out' ]
    },
    classNames: { table: { disable: true } }
  },
  args: {
    ...sharedArgs,
    'animationStyle': 'from-center'
  },
  component: Video,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'MDX/Video'
};

export const Example = {
  'render': () => renderComponentExample('MDX/Video', componentModule)
};

export const AnimationStyles = {
  'render': () => (
    <div className='grid max-w-5xl gap-5 p-6 md:grid-cols-2'>
      {[
        'from-center',
        'from-bottom',
        'top-in-bottom-out',
        'fade'
      ].map((animationStyle) => (
        <div key={ animationStyle } className='space-y-2'>
          <p className='text-sm font-semibold text-gray-700 dark:text-gray-200'>{animationStyle}</p>
          <Video { ...sharedArgs } animationStyle={ animationStyle } title={ `Video dialog: ${animationStyle}` } />
        </div>
      ))}
    </div>
  )
};
