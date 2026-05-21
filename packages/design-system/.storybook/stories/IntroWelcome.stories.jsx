import packageJson from '../../package.json';

import { Badge, Page, PrincipleCard, QuickLink, Section } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  title: 'Introduction/Welcome'
};

export const Default = {
  'name': 'Welcome',
  'render': () => (
    <Page
      kicker={ `v${packageJson.version}` }
      title='Ahmad Assaf Design System'
      intro='A local-first React design-system package for the blog: reusable UI components, content primitives, foundations, tokens, Storybook documentation, and accessibility contracts that can later be published as an npm package.'
    >
      <Section title='What Is This DS?'>
        <div className='max-w-3xl space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300'>
          <p>
            The design system owns the UI layer for the blog. Components, MDX primitives, post chrome, navigation,
            typography, colors, indicators, icons, and package exports live together under <code>packages/design-system</code>.
            The app consumes the DS through package imports and the current <code>@/components</code> compatibility alias,
            which points into the package rather than a root component folder.
          </p>
          <p>
            The current package is private and workspace-local, but the shape is intentionally npm-ready: explicit exports,
            peer dependencies, side-effect CSS entry points, token exports, and Storybook documentation live inside the package.
          </p>
        </div>
      </Section>

      <Section title='Core Principles'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <PrincipleCard number='1' title='Package First' description='The blog imports UI from @ahmadassaf/design-system or the DS-backed @/components alias. Components are not duplicated in the app root.' />
          <PrincipleCard number='2' title='Accessible By Default' description='Stories run the a11y addon. Components expose semantic HTML, accessible names, visible focus, and keyboard support.' />
          <PrincipleCard number='3' title='Token Driven' description='Colors, typography, radius, shadows, and CSS custom properties are defined in the DS and mirrored into Tailwind.' />
          <PrincipleCard number='4' title='Component-Owned Styles' description='Styling belongs with the component through utilities or CSS modules. Global CSS stays small and intentional.' />
          <PrincipleCard number='5' title='Blog Native' description='The DS covers generic primitives and blog-specific surfaces: posts, MDX, command palette, navigation, citations, and content cards.' />
          <PrincipleCard number='6' title='Documented In Storybook' description='Every component and foundation has examples, states, usage guidance, and accessibility notes.' />
        </div>
      </Section>

      <Section title='Quick Links'>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          <QuickLink title='Getting Started' description='Installation, setup, imports, and first usage.' storyId='introduction-getting-started--default' />
          <QuickLink title='Component Catalog' description='Browse component families and ownership.' storyId='introduction-component-catalog--default' />
          <QuickLink title='Conventions' description='Architecture, styling, naming, and quality rules.' storyId='introduction-conventions--default' />
          <QuickLink title='Contributing' description='How to add or modify design-system components.' storyId='introduction-contributing--default' />
          <QuickLink title='Writing Stories' description='Storybook rules for examples, docs, and coverage.' storyId='introduction-writing-stories--default' />
          <QuickLink title='Colors & Tokens' description='Palette, semantic tokens, CSS variables, and usage.' storyId='foundations-colors-tokens--default' />
          <QuickLink title='Accessibility' description='WCAG target, keyboard behavior, and testing standards.' storyId='foundations-accessibility--default' />
          <QuickLink title='Performance' description='Bundle, runtime, and rendering standards.' storyId='introduction-performance--default' />
          <QuickLink title='Testing' description='Verification commands and quality gates.' storyId='introduction-testing--default' />
        </div>
      </Section>

      <Section title='Package Info'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <div className='text-xs font-medium text-gray-500'>Package</div>
            <code className='font-mono text-sm text-gray-800 dark:text-gray-100'>@ahmadassaf/design-system</code>
          </div>
          <div className='space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <div className='text-xs font-medium text-gray-500'>Tech Stack</div>
            <div className='flex flex-wrap gap-2'>
              <Badge>React 19</Badge>
              <Badge>Next.js 15</Badge>
              <Badge>Tailwind CSS 4</Badge>
              <Badge>Storybook 10</Badge>
              <Badge>CSS Modules</Badge>
              <Badge>Icon Registry</Badge>
            </div>
          </div>
        </div>
      </Section>
    </Page>
  )
};
