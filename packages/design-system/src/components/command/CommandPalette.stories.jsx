import { useState } from 'react';
import { ThemeProvider } from 'next-themes';

import { createComponentDocsPage, getComponentDocs } from '../../../.storybook/stories/ComponentDocs';

import { useCmdLauncher, useCmdSearch } from './hooks/useCmdLauncher';
import CmdIcon from './CmdIcon';
import CmdItem from './CmdItem';
import LauncherShortcut from './CmdLauncherShortcut';

const componentDocs = getComponentDocs('Command/Overview');

const posts = [
  { 'category': 'engineering', 'slug': 'design-system', title: 'Building a Design System' },
  { 'category': 'data', 'slug': 'knowledge-graphs', title: 'Intro to Knowledge Graphs' }
];

const projects = [{ description: 'Command line toolkit', 'slug': 'gaudi', title: 'Gaudi' }];

const publications = [{ 'href': '#', 'id': 'paper-1', title: 'Linked Data Quality', 'venue': 'WWW', 'year': '2026' }];

const tags = [
  { 'count': 7, 'display': 'Next.js', 'slug': 'next.js' },
  { 'count': 3, 'display': 'React', 'slug': 'react' }
];

const HookDemo = () => {
  const [ open, setOpen ] = useState(false);
  const launcher = useCmdLauncher({ open, posts, projects, publications, setOpen, tags });
  const { searchContent } = useCmdSearch(launcher.collections);
  const results = searchContent(launcher.search);

  return (
    <div className='max-w-2xl space-y-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700'>
      <div className='flex items-center justify-between'>
        <button className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white' onClick={ () => setOpen(!open) }>
          {open ? 'Close' : 'Open'} command state
        </button>
        <span className='text-sm text-gray-500'>Page: {launcher.page}</span>
      </div>
      <input
        className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900'
        value={ launcher.search }
        onChange={ (event) => launcher.setSearch(event.target.value) }
        placeholder='Search command data'
      />
      <div className='space-y-2'>
        {results.length > 0 ? results.map((item) => (
          <CmdItem key={ `${item.type}-${item.id}` } { ...item } />
        )) : (
          <p className='text-sm text-gray-500'>Type at least two characters to search.</p>
        )}
      </div>
    </div>
  );
};

export default {
  'decorators': [
    (Story) => (
      <ThemeProvider attribute='class'>
        <Story />
      </ThemeProvider>
    )
  ],
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    }
  },
  tags: [ 'autodocs' ],
  title: 'Command/Overview'
};

export const Icons = {
  'render': () => (
    <div className='flex flex-wrap gap-4 p-6'>
      {[ 'HomeIcon', 'BookOpenIcon', 'RectangleGroupIcon', 'TagIcon', 'EnvelopeIcon' ].map((name) => (
        <div key={ name } className='flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700'>
          <CmdIcon name={ name } />
          {name}
        </div>
      ))}
    </div>
  )
};

export const Items = {
  'render': () => (
    <div className='max-w-2xl space-y-2 p-6'>
      <CmdItem title='Building a Design System' category='engineering' type='post' icon='BookOpenIcon' />
      <CmdItem title='Gaudi' subtitle='Command line toolkit' type='project' icon='RectangleGroupIcon' />
      <CmdItem title='React' count={ 3 } type='tag' icon='TagIcon' />
      <LauncherShortcut />
    </div>
  )
};

export const Hooks = {
  'render': () => <HookDemo />
};
