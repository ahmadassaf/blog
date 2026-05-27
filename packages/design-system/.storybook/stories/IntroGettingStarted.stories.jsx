import { CodeBlock, InlineCode, Page, Section, Table, Td, Th } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  tags: [ '!autodocs' ],
  title: 'Overview/Getting Started'
};

export const Default = {
  'name': 'Getting Started',
  'render': () => (
    <Page
      title='Getting Started'
      intro='Install the design system, wire the CSS entry point, and consume components through package imports instead of app-local component folders.'
    >
      <Section title='Installation' description='Install Gaudi as the design-system package for apps, themes, plugins, and documentation surfaces.'>
        <CodeBlock code='pnpm add @gaudi/design-system' />
        <CodeBlock code='npm install @gaudi/design-system' />
      </Section>

      <Section title='Setup' description='Import the Gaudi global stylesheet once from the app root. It includes Tailwind, Gaudi CSS variables, focus rings, and reduced-motion rules. Keep Storybook-specific CSS inside .storybook only.'>
        <CodeBlock
          code={ `// app/layout.js
import '@gaudi/design-system/global.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}` }
        />
      </Section>

      <Section title='Basic Usage' description='Use package exports for Core components, tokens, and component families.'>
        <CodeBlock
          code={ `import { Button, Card, Typography, colors } from '@gaudi/design-system';

export function ArticleCta() {
  return (
    <Card title="Design Systems" subtitle="Build once, reuse everywhere.">
      <Button variant="solid" tone="blue" size="sm">Read article</Button>
    </Card>
  );
}

const linkColor = colors.accent.DEFAULT;` }
        />
      </Section>

      <Section title='Import Patterns'>
        <Table>
          <thead>
            <tr><Th>Import Path</Th><Th>Purpose</Th><Th>Example</Th></tr>
          </thead>
          <tbody>
            <tr><Td mono>@gaudi/design-system</Td><Td>Primary component and token barrel.</Td><Td>Button, Typography, colors</Td></tr>
            <tr><Td mono>@gaudi/design-system/global.css</Td><Td>Tailwind/base stylesheet entry point.</Td><Td>Imported once by the app.</Td></tr>
            <tr><Td mono>@gaudi/design-system/styles.css</Td><Td>CSS custom property tokens.</Td><Td>Color and typography variables.</Td></tr>
            <tr><Td mono>@gaudi/design-system/tokens</Td><Td>Structured design-token objects.</Td><Td>colors, radii, shadows</Td></tr>
            <tr><Td mono>@gaudi/design-system/components/*</Td><Td>Deep component imports when needed.</Td><Td>command, mdx, post, navigation</Td></tr>
            <tr><Td mono>@gaudi/design-system/tailwind-preset</Td><Td>Tailwind integration for consuming apps.</Td><Td>Preset in tailwind.config.js</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Package Boundary'>
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm leading-7 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100'>
          The app has no root <InlineCode>/components</InlineCode> or <InlineCode>/css</InlineCode> implementation.
          Existing <InlineCode>@/components/*</InlineCode> imports are a package-backed compatibility alias that resolves to
          <InlineCode>packages/design-system/src/components/*</InlineCode> in <InlineCode>jsconfig.json</InlineCode>.
          New reusable UI belongs in Gaudi; app-only route composition belongs in the app.
        </div>
      </Section>
    </Page>
  )
};
