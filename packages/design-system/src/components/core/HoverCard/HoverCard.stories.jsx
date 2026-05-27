import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { StoryStage } from '../story-helpers';

import HoverCard, { HoverCard as HoverCardRoot, HoverCardContent, HoverCardTrigger } from './HoverCard';

const componentDocs = getComponentDocs('Core/HoverCard');

export default {
  component: HoverCard,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/HoverCard'
};

export const Example = {
  render: () => (
    <StoryStage className='flex items-center justify-center' minHeight='min-h-72'>
      <HoverCard
        trigger={ <button type='button' className='text-sm font-semibold text-blue-600'>Knowledge graphs</button> }
        content='Graph-shaped context for linking concepts, entities, and sources.'
      />
    </StoryStage>
  )
};

export const RichContent = {
  render: () => (
    <StoryStage className='flex items-center justify-center' minHeight='min-h-72'>
      <HoverCard
        trigger={ <button type='button' className='rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white'>Gaudi</button> }
        content={ (
          <div className='space-y-2'>
            <p className='font-semibold text-gray-950 dark:text-white'>Gaudi Design System</p>
            <p>Core components, tokens, and docs for editorial products.</p>
          </div>
        ) }
      />
    </StoryStage>
  )
};

export const Composed = {
  render: () => (
    <StoryStage className='flex items-center justify-center' minHeight='min-h-72'>
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href='' className='text-sm font-semibold text-gray-950 hover:text-blue-600 dark:text-white'>Blog architecture</a>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={ 12 }>
          Hover cards give supporting context without replacing links or required content.
        </HoverCardContent>
      </HoverCardRoot>
    </StoryStage>
  )
};
