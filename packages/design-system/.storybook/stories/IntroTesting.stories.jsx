import { Badge, CheckList, CodeBlock, Page, Section, Table, Td, Th } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  title: 'Introduction/Testing'
};

export const Default = {
  'name': 'Testing',
  'render': () => (
    <Page
      title='Testing'
      intro='Testing is the guardrail that keeps package extraction safe. Every DS change should be verified in Storybook and in the consuming blog app.'
    >
      <Section title='Quality Gates'>
        <div className='grid gap-3 md:grid-cols-3'>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <Badge tone='green'>Required</Badge>
            <CodeBlock code='pnpm lint' />
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <Badge tone='green'>Required</Badge>
            <CodeBlock code='pnpm storybook:build' />
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <Badge tone='green'>Required</Badge>
            <CodeBlock code='pnpm build:no-github' />
          </div>
        </div>
      </Section>

      <Section title='Testing Matrix'>
        <Table>
          <thead><tr><Th>Layer</Th><Th>What It Catches</Th><Th>Expected Standard</Th></tr></thead>
          <tbody>
            <tr><Td mono>ESLint</Td><Td>Syntax, imports, hooks, React rules, formatting.</Td><Td>No warnings introduced by changed files.</Td></tr>
            <tr><Td mono>Storybook Build</Td><Td>Broken stories, missing exports, package alias issues, docs regressions.</Td><Td>All core pages and components render.</Td></tr>
            <tr><Td mono>App Build</Td><Td>Consumer import failures, Next/Image issues, app route regressions.</Td><Td>Production build completes.</Td></tr>
            <tr><Td mono>A11y Addon</Td><Td>WCAG A/AA violations in stories.</Td><Td>Violations are treated as errors.</Td></tr>
            <tr><Td mono>Manual Browser</Td><Td>Sidebar IDs, exact Storybook URLs, visual layout, focus behavior.</Td><Td>Core routes open without missing-story errors.</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Manual Checklist'>
        <CheckList items={ [
          'Open the exact Storybook route for the changed foundation or component.',
          'Tab through interactive examples and confirm focus is visible.',
          'Check light and dark backgrounds.',
          'Inspect long labels and narrow viewports for wrapping issues.',
          'Confirm component examples do not depend on app-global override CSS.'
        ] } />
      </Section>
    </Page>
  )
};
