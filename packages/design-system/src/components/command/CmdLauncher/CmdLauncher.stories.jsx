import { useState } from 'react';
import { ThemeProvider } from 'next-themes';

import { createComponentDocsPage, getComponentDocs } from '../../../../.storybook/stories/ComponentDocs';
import Button from '../../core/Button';
import MenuLogo from '../../navigation/MenuLogo';
import MenuSearch from '../../navigation/MenuSearch';
import CmdLauncherShortcut from '../CmdLauncherShortcut';

import CmdLauncher from './CmdLauncher';

const componentDocs = getComponentDocs('Core/CmdLauncher');

const sampleData = {
  posts: [
    {
      category: 'data',
      slug: 'knowledge-graphs',
      title: 'An Introduction to Knowledge Graphs'
    },
    {
      category: 'engineering',
      slug: 'design-systems-editorial-rhythm',
      title: 'Design systems keep editorial rhythm predictable'
    },
    {
      category: 'productivity',
      slug: 'project-notes-for-engineering-work',
      title: 'Project notes for engineering work'
    }
  ],
  projects: [
    {
      description: 'Design-system notes, tokens, and reusable interface work.',
      slug: 'gaudi',
      title: 'Gaudi'
    },
    {
      description: 'A compact reading and annotation surface.',
      slug: 'booklight',
      title: 'Booklight'
    }
  ],
  publications: [
    {
      href: '',
      id: 'semantic-search-notes',
      title: 'Semantic Search Notes',
      venue: 'Gaudi Papers'
    }
  ],
  tags: [
    { count: 12, id: 'semantic-web', name: 'Semantic Web', slug: 'semantic-web' },
    { count: 8, id: 'design-systems', name: 'Design Systems', slug: 'design-systems' },
    { count: 5, id: 'knowledge-graphs', name: 'Knowledge Graphs', slug: 'knowledge-graphs' }
  ],
  thoughts: [
    {
      slug: 'small-ui-contracts',
      summary: 'Short notes on reusable interface contracts.',
      title: 'Small UI contracts'
    },
    {
      slug: 'keeping-search-fast',
      summary: 'How command search stays useful as content grows.',
      title: 'Keeping search fast'
    }
  ]
};

const BlogCommandShell = () => {
  const [ open, setOpen ] = useState(false);

  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem={ false }>
      <div className='min-h-[560px] rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950'>
        <div className='flex items-center justify-between gap-6'>
          <div className='flex items-center gap-4'>
            <MenuLogo className='h-10 w-10' />
            <nav aria-label='Demo navigation' className='hidden items-center gap-5 text-sm text-gray-900 md:flex dark:text-gray-100'>
              <span>Blog</span>
              <span>Publications</span>
              <span>Projects</span>
              <span>Thoughts</span>
              <span>About</span>
            </nav>
          </div>
          <div className='flex items-center gap-3'>
            <MenuSearch setOpen={ setOpen } className='hidden sm:block' />
            <Button type='button' variant='outline' tone='gray' size='sm' className='sm:hidden' onClick={ () => setOpen(true) }>
              Search
            </Button>
          </div>
        </div>

        <div className='mt-16 max-w-2xl space-y-3'>
          <p className='text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400'>Command launcher demo</p>
          <h3 className='text-3xl font-bold tracking-tight text-gray-950 dark:text-white'>Search the blog without leaving the keyboard.</h3>
          <p className='text-sm leading-7 text-gray-600 dark:text-gray-300'>
            This mirrors the production header: the search control owns the trigger and the command launcher receives blog posts,
            projects, publications, tags, and thoughts as searchable collections.
          </p>
        </div>

        <CmdLauncher
          open={ open }
          setOpen={ setOpen }
          posts={ sampleData.posts }
          projects={ sampleData.projects }
          publications={ sampleData.publications }
          tags={ sampleData.tags }
          thoughts={ sampleData.thoughts }
        />
      </div>
    </ThemeProvider>
  );
};

export default {
  component: CmdLauncher,
  parameters: {
    docs: {
      description: {
        component: componentDocs.description
      },
      page: createComponentDocsPage(componentDocs)
    },
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  tags: [ 'autodocs' ],
  title: 'Core/CmdLauncher'
};

export const Default = {
  name: 'Example',
  render: () => <BlogCommandShell />
};

export const Shortcut = {
  render: () => (
    <div className='flex min-h-[180px] items-center justify-center bg-white p-8 dark:bg-gray-950'>
      <CmdLauncherShortcut />
    </div>
  )
};
