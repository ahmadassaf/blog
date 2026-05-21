import { CheckList, CodeBlock, Page, PrincipleCard, Section, Table, Td, Th } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  title: 'Introduction/Performance'
};

export const Default = {
  'name': 'Performance',
  'render': () => (
    <Page
      title='Performance'
      intro='The DS should make the blog faster and simpler by centralizing reusable UI, reducing duplicate CSS, and avoiding runtime style churn.'
    >
      <Section title='Performance Principles'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <PrincipleCard number='1' title='Small Runtime' description='Prefer CSS, static variants, and semantic HTML over heavy client behavior.' />
          <PrincipleCard number='2' title='Tree-Shakable Exports' description='Keep package entry points clear so unused components can be eliminated later.' />
          <PrincipleCard number='3' title='Stable Layout' description='Define dimensions for controls, grids, toolbars, media, and repeated items to avoid layout shift.' />
          <PrincipleCard number='4' title='No Global Overrides' description='Global selectors are hard to reason about and often force extra CSS across every route.' />
          <PrincipleCard number='5' title='Lazy Heavy UI' description='Command palettes, modals, previews, Mermaid, and MDX extras should load only when needed.' />
          <PrincipleCard number='6' title='Image Discipline' description='Images need alt text, dimensions, responsive sizes, and intentional loading behavior.' />
        </div>
      </Section>

      <Section title='Quality Budget'>
        <Table>
          <thead><tr><Th>Area</Th><Th>Rule</Th><Th>Check</Th></tr></thead>
          <tbody>
            <tr><Td mono>CSS</Td><Td>Styles are component-owned; global CSS remains minimal.</Td><Td>Review global.css and styles.css.</Td></tr>
            <tr><Td mono>JS</Td><Td>No unnecessary client components or runtime style injection.</Td><Td>Check component boundaries.</Td></tr>
            <tr><Td mono>Images</Td><Td>Set width, height, alt, and sizes for DS image primitives.</Td><Td>Build and a11y stories.</Td></tr>
            <tr><Td mono>Storybook</Td><Td>Stories should render without app-only network requirements.</Td><Td>pnpm storybook:build.</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Verification'>
        <CodeBlock code='pnpm build:no-github' />
        <CheckList items={ [
          'No build-time Storybook-only imports leak into the app.',
          'No component needs app-root css/overrides.css.',
          'No duplicate local component folder is required by app imports.',
          'Storybook production build completes with all core docs present.'
        ] } />
      </Section>
    </Page>
  )
};
