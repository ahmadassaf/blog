import { useState } from 'react';
import { ThemeProvider } from 'next-themes';

import { CodeBlock, InlineCode, Page, Section, Table, Td, Th } from '../../../../.storybook/stories/StoryDocs';
import Button from '../../core/Button';
import MenuLogo from '../../navigation/MenuLogo';
import MenuSearch from '../../navigation/MenuSearch';

import CmdLauncher from './CmdLauncher';

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

const BlogCommandShell = ({ initialOpen = false }) => {
  const [ open, setOpen ] = useState(initialOpen);

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

const DocsPage = () => (
  <Page
    title='Command Launcher'
    intro='The command launcher is the blog-wide keyboard surface for navigation, content search, section browsing, contact actions, and theme switching.'
  >
    <Section title='How It Works'>
      <Table>
        <thead>
          <tr><Th>Step</Th><Th>Behavior</Th></tr>
        </thead>
        <tbody>
          <tr><Td mono>Open</Td><Td><InlineCode>MenuSearch</InlineCode> calls <InlineCode>setOpen(true)</InlineCode>. The launcher also handles <InlineCode>Cmd/Ctrl + K</InlineCode>.</Td></tr>
          <tr><Td mono>Root</Td><Td>Shows primary navigation actions plus hidden searchable collections for posts, projects, publications, tags, and thoughts.</Td></tr>
          <tr><Td mono>Search</Td><Td>Typing filters root actions and collection records through the command palette filter.</Td></tr>
          <tr><Td mono>Nested pages</Td><Td>Collection rows open dedicated pages. <InlineCode>Escape</InlineCode> returns to root, then closes the launcher.</Td></tr>
        </tbody>
      </Table>
    </Section>

    <Section title='Usage'>
      <CodeBlock
        code={ `const [launcherOpen, setLauncherOpen] = useState(false);

<MenuSearch setOpen={setLauncherOpen} />

<CmdLauncher
  open={launcherOpen}
  setOpen={setLauncherOpen}
  posts={posts}
  projects={projects}
  publications={publications}
  tags={tags}
  thoughts={thoughts}
/>` }
      />
    </Section>

    <Section title='Props'>
      <Table>
        <thead>
          <tr><Th>Prop</Th><Th>Type</Th><Th>Description</Th></tr>
        </thead>
        <tbody>
          <tr><Td mono>open</Td><Td mono>boolean</Td><Td>Controlled palette state.</Td></tr>
          <tr><Td mono>setOpen</Td><Td mono>{'Dispatch<boolean>'}</Td><Td>State setter used by the trigger, shortcut, and palette close behavior.</Td></tr>
          <tr><Td mono>posts</Td><Td mono>Array</Td><Td>Post records with <InlineCode>title</InlineCode>, <InlineCode>slug</InlineCode>, and optional <InlineCode>category</InlineCode>.</Td></tr>
          <tr><Td mono>projects</Td><Td mono>Array</Td><Td>Project records with title, slug, and description or summary.</Td></tr>
          <tr><Td mono>publications</Td><Td mono>Array</Td><Td>Publication records with id, title, href, and venue/year metadata.</Td></tr>
          <tr><Td mono>tags</Td><Td mono>Array</Td><Td>Tag records with id/slug, display name, and optional count.</Td></tr>
          <tr><Td mono>thoughts</Td><Td mono>Array</Td><Td>Thought records with title, slug, and summary.</Td></tr>
        </tbody>
      </Table>
    </Section>

    <Section title='Example'>
      <BlogCommandShell />
    </Section>
  </Page>
);

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  tags: [ '!autodocs' ],
  title: 'Command/CmdLauncher'
};

export const Default = {
  name: 'Command Launcher',
  render: () => <DocsPage />
};

export const Example = {
  render: () => <BlogCommandShell initialOpen />
};
