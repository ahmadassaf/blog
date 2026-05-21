import { Badge, Page, Section, Table, Td, Th } from './StoryDocs';

const groups = [
  [ 'Foundations', 'Colors & Tokens, Icons, Indicators, Typography, Accessibility', 'Design language, token contracts, and system rules.' ],
  [ 'Primitives', 'Button, Avatar, Banner, Card, Carousel, Grid, Icon, ImageFallback, Kbd, Link, Pill, Terminal, TextHighlight', 'Reusable low-level UI exported from the package barrel.' ],
  [ 'Content', 'Aurora, code tabs, dropdowns, footer, image modal, pagination, search, thoughts', 'Reusable blog surfaces and content browsing elements.' ],
  [ 'Command', 'Launcher, search, result items, tags, posts, projects, publications, thoughts, hooks', 'Keyboard-first navigation and content search.' ],
  [ 'MDX', 'Aside, callout, details, FAQ, file tree, images, code, tables, citations, footnotes, tooltips', 'Content-rendering primitives used by posts and thoughts.' ],
  [ 'Navigation', 'Menu, logo, main menu, blog menu, mobile menu, floating menu, menu search', 'Reusable navigation chrome.' ],
  [ 'Post', 'Post header, breadcrumbs, sharing, comments, series, table of contents', 'Article chrome and post-level composition.' ],
  [ 'Layout', 'Layout container, wrapper, section container', 'Page structure primitives.' ],
  [ 'Forms', 'Newsletter form', 'Form components with DS styling and accessibility contracts.' ]
];

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  title: 'Introduction/Component Catalog'
};

export const Default = {
  'name': 'Component Catalog',
  'render': () => (
    <Page
      title='Component Catalog'
      intro='The catalog shows the current ownership map for the blog design system. Components are grouped by consumer mental model, not by filesystem accident.'
    >
      <Section title='Catalog Groups'>
        <Table>
          <thead><tr><Th>Group</Th><Th>Components</Th><Th>Ownership</Th></tr></thead>
          <tbody>
            {groups.map(([ group, components, ownership ]) => (
              <tr key={ group }>
                <Td><Badge tone='blue'>{group}</Badge></Td>
                <Td>{components}</Td>
                <Td>{ownership}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section title='Coverage Rules'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-2 text-sm font-semibold'>A component is catalog-ready when:</h3>
            <ul className='space-y-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              <li>It has a Storybook story with realistic examples.</li>
              <li>It has accessible names, keyboard behavior, and visible focus.</li>
              <li>It does not rely on global override CSS.</li>
              <li>It is exported through the package when public.</li>
            </ul>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-2 text-sm font-semibold'>A component stays app-local when:</h3>
            <ul className='space-y-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              <li>It depends on one route’s data contract.</li>
              <li>It is a one-off layout composition.</li>
              <li>It cannot be documented without app-only services.</li>
              <li>It is not useful outside the current page.</li>
            </ul>
          </div>
        </div>
      </Section>
    </Page>
  )
};
