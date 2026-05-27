import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import { StoryStage } from '../story-helpers';

import Select from './Select';

const componentDocs = getComponentDocs('Core/Select');

const topicOptions = [
  { label: 'Design systems', value: 'design-systems' },
  { label: 'Knowledge graphs', value: 'knowledge-graphs' },
  { label: 'Semantic web', value: 'semantic-web' },
  { label: 'Linked data', value: 'linked-data' },
  { label: 'AI engineering', value: 'ai-engineering' }
];

export default {
  component: Select,
  parameters: {
    docs: {
      description: { component: componentDocs.description },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Core/Select'
};

export const Example = {
  render: () => (
    <StoryStage minHeight='min-h-72'>
      <Select defaultOpen options={ topicOptions.slice(0, 3) } placeholder='Choose topic' />
    </StoryStage>
  )
};

export const Searchable = {
  render: () => (
    <StoryStage minHeight='min-h-80'>
      <Select
        searchable
        defaultOpen
        options={ topicOptions }
        placeholder='Search topics'
        searchPlaceholder='Search article topics...'
      />
    </StoryStage>
  )
};

export const MultiSelect = {
  render: () => (
    <StoryStage minHeight='min-h-80'>
      <Select
        multiple
        searchable
        defaultOpen
        defaultValue={ [ 'design-systems', 'semantic-web' ] }
        options={ topicOptions }
        placeholder='Choose topics'
      />
    </StoryStage>
  )
};

export const States = {
  render: () => (
    <StoryStage className='grid max-w-sm content-start gap-4' minHeight='min-h-96'>
      <Select options={ [{ label: 'Newest first', value: 'newest' }, { label: 'Oldest first', value: 'oldest' }] } placeholder='Sort posts' />
      <Select options={ topicOptions } defaultValue='design-systems' />
      <Select options={ topicOptions } placeholder='Required topic' invalid />
      <Select options={ [{ label: 'Unavailable', value: 'disabled' }] } disabled />
    </StoryStage>
  )
};

export const NativeOptionsInput = {
  render: () => (
    <StoryStage minHeight='min-h-72'>
      <Select aria-label='Topic from option children' defaultOpen>
        <option value='ai'>AI Engineering</option>
        <option value='kg'>Knowledge Graphs</option>
        <option value='ds'>Design Systems</option>
      </Select>
    </StoryStage>
  )
};
