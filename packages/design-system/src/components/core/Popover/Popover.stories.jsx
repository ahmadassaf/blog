import { useState } from 'react';

import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { StoryStage } from '../story-helpers';

import Popover, { Popover as PopoverWrapper, PopoverContent, PopoverTrigger } from './Popover';

const componentDocs = getComponentDocs('Core/Popover');

const ComposedPopover = () => {
  const [ open, setOpen ] = useState(false);

  return (
    <StoryStage className='flex items-start' minHeight='min-h-72'>
      <PopoverWrapper>
        <PopoverTrigger onClick={ () => setOpen((value) => !value) }>Open composed popover</PopoverTrigger>
        {open ? <PopoverContent>Use the primitive slots when the trigger lives inside another layout.</PopoverContent> : null}
      </PopoverWrapper>
    </StoryStage>
  );
};

export default {
  component: Popover,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Popover'
};

export const Example = {
  render: () => <StoryStage className='flex items-start' minHeight='min-h-72'><Popover trigger='Open popover'>Compact supporting content in a positioned panel.</Popover></StoryStage>
};

export const RichContent = {
  render: () => (
    <StoryStage className='flex items-start' minHeight='min-h-72'>
      <Popover trigger='Release notes'>
        <div className='space-y-2'>
          <p className='font-semibold text-gray-950 dark:text-white'>Gaudi 0.4</p>
          <p>Core docs now show curated props and variant examples.</p>
        </div>
      </Popover>
    </StoryStage>
  )
};

export const Composed = {
  render: ComposedPopover
};
