import packageJson from '../../package.json';

import { Badge, CodeBlock, Page, PrincipleCard, QuickLink, Section } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false }
  },
  tags: [ '!autodocs' ],
  title: 'Overview/Welcome'
};

export const Default = {
  'name': 'Welcome',
  'render': () => (
    <Page
      kicker={ `v${packageJson.version}` }
      title='Gaudi Design System'
      intro='Gaudi is the design-system package powering my blog and the wider set of things I produce: plugins, themes, shell tooling, documentation surfaces, and reusable interface work.'
    >
      <Section title='Why It Exists'>
        <div className='max-w-3xl space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300'>
          <p>
            The blog and related Gaudi projects should not have UI decisions scattered across app folders, one-off CSS,
            and copied component patterns. Gaudi is the single place where reusable interface decisions live. Core
            components, MDX article components, post chrome, navigation, blocks, typography, colors, indicators, icons,
            and package exports are owned under <code>packages/design-system</code>.
          </p>
          <p>
            The package exposes components, tokens, CSS entry points, Tailwind integrations, MDX primitives, and
            documentation as one coherent surface for the blog, plugins, themes, CLI-facing surfaces, and external consumers.
          </p>
        </div>
      </Section>

      <Section title='System At A Glance'>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <div className='text-2xl font-bold text-gray-950 dark:text-white'>1 package</div>
            <p className='mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              One package owns reusable UI, docs, tokens, styles, stories, and contracts.
            </p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <div className='text-2xl font-bold text-gray-950 dark:text-white'>Core first</div>
            <p className='mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              Reusable low-level UI lives in Core. Domain components compose Core instead of duplicating it.
            </p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <div className='text-2xl font-bold text-gray-950 dark:text-white'>Reusable by design</div>
            <p className='mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              APIs, exports, and Storybook docs are consistent across Gaudi projects and external installs.
            </p>
          </div>
        </div>
      </Section>

      <Section title='Start Here'>
        <div className='grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]'>
          <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='text-sm font-bold text-gray-950 dark:text-white'>Use The Package</h3>
            <p className='text-xs leading-6 text-gray-600 dark:text-gray-300'>
              The blog should consume reusable UI from the Gaudi package, not from app-local component copies.
              Root imports expose the common surface; subpath imports keep larger areas explicit.
            </p>
            <CodeBlock
              language='jsx'
              code={ `import { Button, Card, Link, Pill } from '@gaudi/design-system';
import { colors, typography } from '@gaudi/design-system/tokens';
import { Callout, Table } from '@gaudi/design-system/mdx';

<Card title='Design-system note'>
  <Pill tone='blue' variant='soft'>Core</Pill>
  <Link href='/blog'>Read the blog</Link>
</Card>` }
            />
          </div>

          <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='text-sm font-bold text-gray-950 dark:text-white'>Package Workflow</h3>
            <p className='text-xs leading-6 text-gray-600 dark:text-gray-300'>
              Keep changes package-owned, verify contracts, and build Storybook before shipping larger Gaudi edits.
            </p>
            <CodeBlock
              language='bash'
              code={ `pnpm lint
pnpm test:ds-contracts
pnpm storybook:build
rm -rf packages/design-system/storybook-static` }
            />
          </div>
        </div>
      </Section>

      <Section title='Architecture'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
          <PrincipleCard number='1' title='Overview' description='Foundational system decisions live here: accessibility, colors, icons, indicators, and typography.' />
          <PrincipleCard number='2' title='Core' description='The canonical reusable component layer. One public UI concept gets one Core home and one documented API.' />
          <PrincipleCard number='3' title='Domains' description='Blog-specific surfaces stay grouped by use: Content, Post, MDX, Navigation, Command, Forms, Layout, and Blocks.' />
          <PrincipleCard number='4' title='Package Boundary' description='The blog imports from @gaudi/design-system or package-backed aliases, not an app-local component folder.' />
        </div>
      </Section>

      <Section title='Package Map'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <div className='rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='text-sm font-bold text-gray-950 dark:text-white'>Foundational Rules</h3>
            <p className='mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              Accessibility, colors, tokens, typography, icons, and indicators now live under Overview because they guide every other layer.
            </p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='text-sm font-bold text-gray-950 dark:text-white'>Reusable Components</h3>
            <p className='mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              Core contains the canonical component APIs: buttons, links, cards, forms, overlays, media, navigation, and feedback.
            </p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900'>
            <h3 className='text-sm font-bold text-gray-950 dark:text-white'>Blog Composition</h3>
            <p className='mt-2 text-xs leading-6 text-gray-600 dark:text-gray-300'>
              Post, MDX, Content, Blocks, Command, Navigation, Layout, and Forms stay domain-specific and document what they compose.
            </p>
          </div>
        </div>
      </Section>

      <Section title='Design Decisions'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <PrincipleCard number='1' title='Gaudi First' description='The blog imports UI from @gaudi/design-system or the Gaudi-backed @/components alias. Components are not duplicated in the app root.' />
          <PrincipleCard number='2' title='Accessible By Default' description='Stories run the a11y addon. Components expose semantic HTML, accessible names, visible focus, and keyboard support.' />
          <PrincipleCard number='3' title='Token Driven' description='Colors, typography, radius, shadows, and CSS custom properties are defined in Gaudi and mirrored into Tailwind.' />
          <PrincipleCard number='4' title='Component-Owned Styles' description='Styling belongs with the component through utilities or CSS modules. Global CSS stays small and intentional.' />
          <PrincipleCard number='5' title='Blog Native' description='Gaudi covers generic Core components and blog-specific surfaces: posts, MDX, command palette, navigation, citations, and content cards.' />
          <PrincipleCard number='6' title='Reusable Where Useful' description='Components are designed for this blog first, but stable Core APIs and tokens make useful parts extractable for other Gaudi projects and sites.' />
        </div>
      </Section>

      <Section title='System Foundations'>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          <QuickLink title='Accessibility' description='WCAG target, keyboard behavior, screen-reader rules, contrast, focus, and test policy.' storyId='overview-accessibility--default' />
          <QuickLink title='Colors & Tokens' description='Palette, semantic tokens, CSS variables, radii, shadows, and package import contract.' storyId='overview-colors-tokens--default' />
          <QuickLink title='Icons' description='Central icon registry, sizing, color, stroke, accessible labels, and extension rules.' storyId='overview-icons--default' />
          <QuickLink title='Indicators' description='Status dots, pulsing states, and label patterns where text carries the meaning.' storyId='overview-indicators--default' />
          <QuickLink title='Typography' description='Blog-first type scale for article titles, prose, metadata, authors, cards, and UI text.' storyId='overview-typography--default' />
          <QuickLink title='Core Components' description='The canonical reusable component layer for actions, forms, overlays, media, and navigation.' storyId='core-overview--default' />
        </div>
      </Section>

      <Section title='Working With Gaudi'>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-4'>
          <QuickLink title='Getting Started' description='Installation, setup, imports, and first usage.' storyId='overview-getting-started--default' />
          <QuickLink title='Conventions' description='Architecture, styling, naming, and quality rules.' storyId='overview-conventions--default' />
          <QuickLink title='Testing' description='Verification commands and quality gates.' storyId='overview-testing--default' />
        </div>
      </Section>

      <Section title='Package Info'>
        <div className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
            <div className='text-xs font-medium text-gray-500'>Package</div>
            <code className='font-mono text-sm text-gray-800 dark:text-gray-100'>@gaudi/design-system</code>
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
