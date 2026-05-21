import { CheckList, CodeBlock, Page, Section, Table, Td, Th } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  title: 'Introduction/Contributing'
};

export const Default = {
  'name': 'Contributing',
  'render': () => (
    <Page
      title='Contributing'
      intro='Use this workflow when adding, changing, or promoting UI into the design system.'
    >
      <Section title='Contribution Flow'>
        <Table>
          <thead><tr><Th>Step</Th><Th>Action</Th><Th>Done When</Th></tr></thead>
          <tbody>
            <tr><Td mono>1</Td><Td>Decide ownership.</Td><Td>Reusable UI is in DS; route glue stays in app.</Td></tr>
            <tr><Td mono>2</Td><Td>Implement the component.</Td><Td>Props are explicit, styles are contained, no global overrides needed.</Td></tr>
            <tr><Td mono>3</Td><Td>Add stories.</Td><Td>Default, variants, states, edge cases, and accessibility examples are visible.</Td></tr>
            <tr><Td mono>4</Td><Td>Export deliberately.</Td><Td>Consumer imports go through package entry points.</Td></tr>
            <tr><Td mono>5</Td><Td>Verify.</Td><Td>Lint, app build, and Storybook build pass.</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Definition Of Done'>
        <CheckList
          items={ [
            'No app-local duplicate component remains for reusable UI.',
            'No Storybook-only CSS is imported from src.',
            'No component requires overrides.css to render correctly.',
            'All interactive elements have names, roles, keyboard behavior, focus states, and disabled states.',
            'Stories include realistic usage and document accessibility notes.',
            'Tokens are used for color, radius, shadow, and type decisions.'
          ] }
        />
      </Section>

      <Section title='Verification Commands'>
        <CodeBlock
          code={ `pnpm lint
pnpm build:no-github
pnpm storybook:build` }
        />
      </Section>
    </Page>
  )
};
