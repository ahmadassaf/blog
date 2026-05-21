import { Icon } from '../../src/index';

import { CheckList, CodeBlock, InlineCode, Page, Section, Table, Td, Th } from './StoryDocs';

const iconGroups = [
  {
    'icons': [ 'Home', 'Search', 'ChevronRight', 'ChevronDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'X' ],
    'name': 'Navigation'
  },
  {
    'icons': [ 'BookOpen', 'FileText', 'FolderOpen', 'Tags', 'Calendar', 'Clock', 'LinkIcon', 'LinkSlashIcon', 'PhotoIcon' ],
    'name': 'Content'
  },
  {
    'icons': [ 'Github', 'Linkedin', 'Twitter', 'Youtube', 'Mail', 'Star', 'Fork' ],
    'name': 'Social & Repositories'
  },
  {
    'icons': [ 'Plus', 'Minus', 'CheckIcon', 'CopyIcon', 'Info', 'Warning', 'ExclamationTriangleIcon', 'FaceIdError' ],
    'name': 'Actions & Status'
  },
  {
    'icons': [ 'javascript', 'typescript', 'react', 'node', 'python', 'json', 'css', 'html', 'markdown', 'docker', 'git', 'file', 'folder', 'folder-open' ],
    'name': 'File Types'
  },
  {
    'icons': [ 'ChessKnight', 'HandshakeLine', 'ChartArea', 'Cubes', 'Codepen', 'Robot' ],
    'name': 'About Page'
  }
];

const IconTile = ({ name }) => (
  <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
    <div className='mb-3 flex h-12 items-center justify-center rounded-md bg-gray-50 dark:bg-gray-800'>
      <Icon name={ name } size='lg' decorative className='text-gray-800 dark:text-gray-100' />
    </div>
    <div className='truncate font-mono text-xs text-gray-600 dark:text-gray-300'>{name}</div>
  </div>
);

export default {
  parameters: {
    docs: {
      description: {
        component: 'Central icon registry for blog and design-system UI. Components should import Icon from the DS instead of importing icon libraries directly.'
      }
    },
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  tags: [ 'autodocs' ],
  title: 'Foundations/Icons'
};

export const Default = {
  'name': 'Icons',
  'render': () => (
    <Page
      title='Icons'
      intro='All icons used across the blog are routed through the design-system icon registry. The registry centralizes vendor imports, aliases legacy names, keeps sizing consistent, and makes accessibility behavior explicit.'
    >
      <Section title='Icon Contract' description='The DS icon component accepts a registry name, an optional size, optional color, and an accessibility mode.'>
        <Table>
          <thead><tr><Th>Use</Th><Th>Requirement</Th><Th>Example</Th></tr></thead>
          <tbody>
            <tr><Td>Decorative icon</Td><Td>Hide from assistive technology.</Td><Td mono>{ '<Icon name="Search" decorative />' }</Td></tr>
            <tr><Td>Standalone meaning</Td><Td>Provide an accessible label.</Td><Td mono>{ '<Icon name="Info" label="More information" />' }</Td></tr>
            <tr><Td>Social link</Td><Td>Use the same registry component with <InlineCode>href</InlineCode>.</Td><Td mono>{ '<Icon kind="github" href="..." />' }</Td></tr>
            <tr><Td>Legacy alias</Td><Td>Old Heroicon-style names resolve through the registry.</Td><Td mono>{ '<Icon name="BookOpenIcon" />' }</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Blog Consumption' description='The blog and DS components consume icons through the registry only. Direct vendor imports are limited to packages/design-system/src/icons/index.jsx.'>
        <CodeBlock code={ `import { Icon } from '@ahmadassaf/design-system';

<Icon name='Search' size='sm' decorative />
<Icon name='Github' href='https://github.com/ahmadassaf' />

# Verification
rg "from ['"](@heroicons|react-icons|lucide-react|@tabler/icons-react)" packages/design-system/src app layouts lib scripts | rg -v "packages/design-system/src/icons/index.jsx"` } />
      </Section>

      <Section title='Sizing, Color & Stroke' description='Prefer DS props for common changes. Use className only for local layout adjustments or one-off sizing inside tight UI.'>
        <div className='grid gap-4 lg:grid-cols-3'>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-3 text-sm font-semibold'>Sizes</h3>
            <div className='flex items-end gap-4'>
              <Icon name='Search' size='xs' decorative />
              <Icon name='Search' size='sm' decorative />
              <Icon name='Search' size='md' decorative />
              <Icon name='Search' size='lg' decorative />
              <Icon name='Search' size='xl' decorative />
            </div>
            <p className='mt-3 text-xs leading-6 text-gray-600 dark:text-gray-300'>Use <InlineCode>xs</InlineCode>, <InlineCode>sm</InlineCode>, <InlineCode>md</InlineCode>, <InlineCode>lg</InlineCode>, <InlineCode>xl</InlineCode>, or <InlineCode>2xl</InlineCode>.</p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-3 text-sm font-semibold'>Colors</h3>
            <div className='flex items-center gap-4'>
              <Icon name='Info' color='neutral' size='lg' decorative />
              <Icon name='Info' color='muted' size='lg' decorative />
              <Icon name='Info' color='primary' size='lg' decorative />
              <Icon name='Info' color='green' size='lg' decorative />
              <Icon name='Info' color='danger' size='lg' decorative />
            </div>
            <p className='mt-3 text-xs leading-6 text-gray-600 dark:text-gray-300'>Use semantic color props first. Use Tailwind text classes only when the icon must inherit local context.</p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-3 text-sm font-semibold'>Stroke</h3>
            <div className='flex items-center gap-4'>
              <Icon name='BookOpen' size='lg' strokeWidth={ 1.5 } decorative />
              <Icon name='BookOpen' size='lg' strokeWidth={ 2 } decorative />
              <Icon name='BookOpen' size='lg' strokeWidth={ 2.5 } decorative />
            </div>
            <p className='mt-3 text-xs leading-6 text-gray-600 dark:text-gray-300'>Lucide icons accept <InlineCode>strokeWidth</InlineCode>. Filled vendor icons ignore stroke props, so adjust them with size and color only.</p>
          </div>
        </div>

        <Table>
          <thead><tr><Th>Adjustment</Th><Th>Use</Th><Th>Example</Th></tr></thead>
          <tbody>
            <tr><Td>Size token</Td><Td>Standard icon sizes across UI.</Td><Td mono>{ '<Icon name="Search" size="sm" />' }</Td></tr>
            <tr><Td>Color token</Td><Td>Semantic status or UI color.</Td><Td mono>{ '<Icon name="Info" color="primary" />' }</Td></tr>
            <tr><Td>Stroke width</Td><Td>Line-weight tuning for stroke icons.</Td><Td mono>{ '<Icon name="BookOpen" strokeWidth={1.5} />' }</Td></tr>
            <tr><Td>className</Td><Td>Local spacing, alignment, or exceptional sizes.</Td><Td mono>{ '<Icon name="Clock" className="mr-1 h-3.5 w-3.5" />' }</Td></tr>
          </tbody>
        </Table>

        <CodeBlock code={ `<Icon name='Search' size='sm' color='muted' decorative />
<Icon name='Info' size='lg' color='primary' label='More information' />
<Icon name='BookOpen' size='md' strokeWidth={1.5} decorative />
<Icon name='Github' className='h-5 w-5 text-gray-800' decorative />` } />
      </Section>

      {iconGroups.map((group) => (
        <Section key={ group.name } title={ group.name }>
          <div className='grid gap-3 sm:grid-cols-3 lg:grid-cols-6'>
            {group.icons.map((name) => <IconTile key={ name } name={ name } />)}
          </div>
        </Section>
      ))}

      <Section title='Extending The Registry' description='Add new icons in one place, expose a stable registry name, document the icon in Storybook, then consume it through the DS Icon component.'>
        <div className='grid gap-4 lg:grid-cols-2'>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-3 text-sm font-semibold'>Workflow</h3>
            <CheckList items={ [
              'Open packages/design-system/src/icons/index.jsx.',
              'Import the vendor icon only in that registry file.',
              'Add a PascalCase registry key for product UI, or a lowercase key for file/social aliases.',
              'Add compatibility aliases when replacing old names such as Heroicon-style *Icon keys.',
              'Add a default accessible label in iconLabels when the icon is commonly rendered as a link.',
              'Add the icon name to this Storybook page under the right group.',
              'Use <Icon name="NewIcon" decorative /> or <Icon name="NewIcon" label="Meaning" /> everywhere else.'
            ] } />
          </div>
          <CodeBlock code={ `// packages/design-system/src/icons/index.jsx
import { NewIcon } from 'lucide-react';

export const iconRegistry = {
  NewIcon,
  LegacyNewIconName: NewIcon,
};

export const iconLabels = {
  NewIcon: 'Accessible default label',
};

// Consumer
<Icon name='NewIcon' decorative />
<Icon name='NewIcon' label='Open details' />` } />
        </div>

        <Table>
          <thead><tr><Th>Decision</Th><Th>Rule</Th><Th>Reason</Th></tr></thead>
          <tbody>
            <tr><Td>Registry name</Td><Td>Use stable semantic names, not vendor package names.</Td><Td>Lets us swap icon vendors without changing app code.</Td></tr>
            <tr><Td>Vendor imports</Td><Td>Only import vendor icons inside <InlineCode>src/icons/index.jsx</InlineCode>.</Td><Td>Keeps bundle ownership and review surface centralized.</Td></tr>
            <tr><Td>Aliases</Td><Td>Keep aliases for migrated names until consumers are updated.</Td><Td>Prevents churn while still enforcing one registry.</Td></tr>
            <tr><Td>Accessibility</Td><Td>Decorative icons use <InlineCode>decorative</InlineCode>; meaningful icons use <InlineCode>label</InlineCode>.</Td><Td>Prevents unnamed icon-only controls and noisy screen-reader output.</Td></tr>
            <tr><Td>Verification</Td><Td>Run lint, Storybook build, and direct-import scan.</Td><Td>Confirms docs and implementation stay aligned.</Td></tr>
          </tbody>
        </Table>

        <CodeBlock code={ `pnpm lint
pnpm storybook:build
rg 'from ['\\''"](@heroicons|react-icons|lucide-react|@tabler/icons-react)' packages/design-system/src app layouts lib scripts | rg -v 'packages/design-system/src/icons/index.jsx'` } />
      </Section>

      <Section title='Usage Rules'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-3 text-sm font-semibold'>Do</h3>
            <CheckList items={ [
              'Import icons from the DS Icon component or icons export only.',
              'Pair unfamiliar icons with visible text.',
              'Use decorative for icons that repeat nearby text.',
              'Use label for icon-only links, buttons, and status symbols.',
              'Keep icon sizing tied to the surrounding text scale.'
            ] } />
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='mb-3 text-sm font-semibold'>Avoid</h3>
            <CheckList items={ [
              'Do not import lucide, Heroicons, react-icons, or Tabler directly outside the registry.',
              'Do not use color as the only way to distinguish icon states.',
              'Do not use icon-only controls without aria-label or visible text.',
              'Do not create one-off inline SVGs for reusable blog UI.',
              'Do not add icons that are not documented in this Storybook page.'
            ] } />
          </div>
        </div>
      </Section>
    </Page>
  )
};
