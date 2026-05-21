import { Badge, CheckList, CodeBlock, Page, Section, Table, Td, Th } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  title: 'Introduction/Writing Stories'
};

export const Default = {
  'name': 'Writing Stories',
  'render': () => (
    <Page
      title='Writing Stories'
      intro='Stories are the public contract for the DS. They should show realistic usage, expected variants, accessibility states, and code consumers can trust.'
    >
      <Section title='Required Story Coverage'>
        <Table>
          <thead><tr><Th>Coverage</Th><Th>Purpose</Th><Th>Example</Th></tr></thead>
          <tbody>
            <tr><Td mono>Default</Td><Td>The most common rendering path.</Td><Td>Primary button, default card, standard link.</Td></tr>
            <tr><Td mono>Variants</Td><Td>Every supported visual variant.</Td><Td>Primary, secondary, ghost, link.</Td></tr>
            <tr><Td mono>States</Td><Td>Interactive states and stateful UI.</Td><Td>Disabled, active, expanded, loading, error.</Td></tr>
            <tr><Td mono>Content Stress</Td><Td>Long text, missing data, narrow containers.</Td><Td>Long label, empty list, wrapped title.</Td></tr>
            <tr><Td mono>Accessibility</Td><Td>Keyboard and screen-reader contract.</Td><Td>aria-label, focus order, role, status text.</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Story Template'>
        <CodeBlock
          code={ `import { Button } from '../../src/index';

export default {
  title: 'Components/Button',
  component: Button,
  tags: [ 'autodocs' ],
  parameters: {
    docs: {
      description: {
        component: 'Button renders actions and navigational CTAs with accessible focus states.'
      }
    }
  }
};

export const Primary = {
  args: {
    children: 'Read article',
    variant: 'primary-md'
  }
};` }
        />
      </Section>

      <Section title='Story Quality Rules'>
        <CheckList
          items={ [
            'Use realistic blog content, not placeholder lorem ipsum.',
            'Prefer args for component APIs and render functions for layout examples.',
            'Document accessibility behavior in the story description.',
            'Avoid hiding broken states with decorators or global CSS.',
            'Keep stories under .storybook/stories, never under src.',
            'Use explicit story titles that match the sidebar taxonomy.'
          ] }
        />
      </Section>

      <Section title='Sidebar Taxonomy'>
        <div className='flex flex-wrap gap-2'>
          <Badge>Introduction/*</Badge>
          <Badge>Foundations/*</Badge>
          <Badge>Components/*</Badge>
          <Badge>Blog UI/*</Badge>
          <Badge>MDX/*</Badge>
          <Badge>Post/*</Badge>
          <Badge>Command Palette/*</Badge>
        </div>
      </Section>
    </Page>
  )
};
