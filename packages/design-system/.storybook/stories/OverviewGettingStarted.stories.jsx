import packageJson from '../../package.json';

import { CheckList, CodeBlock, InlineCode, Page, QuickLink, Section, Table, Td, Th } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  tags: [ '!autodocs' ],
  title: 'Overview/Getting Started'
};

export const Default = {
  'name': 'Getting Started',
  'render': () => (
    <Page
      kicker={ `v${packageJson.version}` }
      title='Gaudi Design System'
      intro='Gaudi is the design system for the blog and related interface work: reusable components, tokens, MDX primitives, post chrome, navigation, blocks, and documentation.'
    >
      <Section title='Use The Package' description='Install Gaudi, import its stylesheet once, then consume UI from package exports.'>
        <CodeBlock
          language='jsx'
          code={ `pnpm add @gaudi/design-system

// app/layout.js
import '@gaudi/design-system/global.css';

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}` }
        />
      </Section>

      <Section title='Imports' description='Prefer stable package imports. Deep imports are reserved for documented component families.'>
        <Table>
          <thead>
            <tr><Th>Path</Th><Th>Use</Th></tr>
          </thead>
          <tbody>
            <tr><Td mono>@gaudi/design-system</Td><Td>Core components, domain components, and shared tokens exposed from the root API.</Td></tr>
            <tr><Td mono>@gaudi/design-system/global.css</Td><Td>Tailwind, CSS variables, base compatibility, reduced motion, and global primitives.</Td></tr>
            <tr><Td mono>@gaudi/design-system/tokens</Td><Td>Structured color, typography, radius, and shadow tokens.</Td></tr>
            <tr><Td mono>@gaudi/design-system/mdx</Td><Td>MDX components for article content.</Td></tr>
          </tbody>
        </Table>
        <CodeBlock
          language='jsx'
          code={ `import { Button, Card, Link, Pill } from '@gaudi/design-system';
import { colors } from '@gaudi/design-system/tokens';
import { Callout, Table } from '@gaudi/design-system/mdx';

export function ArticleCard() {
  return (
    <Card title="Design systems" subtitle="Reusable article UI.">
      <Pill tone="blue" variant="soft">Core</Pill>
      <Button href="" size="sm">Read article</Button>
    </Card>
  );
}` }
        />
      </Section>

      <Section title='Conventions' description='The rules are intentionally small: keep reusable UI in Gaudi, keep route glue in the app, and document public APIs where they live.'>
        <CheckList
          items={ [
            'Reusable UI belongs in packages/design-system, not app-local component folders.',
            'Route-level data fetching, metadata, and one-off page composition stay in the app.',
            'Core owns low-level reusable UI; domain sections compose Core instead of duplicating it.',
            'Component-owned styles live with the component. Global CSS stays limited and intentional.',
            'Use Gaudi tokens and approved palette families: gray, neutral, blue, green, yellow, red, and indigo.',
            'Public components must have real stories, focused examples, and component-specific accessibility notes.'
          ] }
        />
      </Section>

      <Section title='Package Boundary'>
        <div className='rounded-lg border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300'>
          New reusable UI goes into <InlineCode>packages/design-system</InlineCode>. The blog can import through
          <InlineCode>@gaudi/design-system</InlineCode> or the Gaudi-backed <InlineCode>@/components/*</InlineCode> alias.
          Avoid app-local copies and broad CSS overrides.
        </div>
      </Section>

      <Section title='Next'>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          <QuickLink title='Accessibility' description='Keyboard, screen-reader, contrast, focus, and testing rules.' storyId='overview-accessibility--default' />
          <QuickLink title='Colors & Tokens' description='Palette, semantic tokens, CSS variables, radius, and shadows.' storyId='overview-colors-tokens--default' />
          <QuickLink title='Core Components' description='Canonical reusable UI APIs.' storyId='core-overview--default' />
        </div>
      </Section>
    </Page>
  )
};
