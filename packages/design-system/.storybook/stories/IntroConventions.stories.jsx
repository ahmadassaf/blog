import { CheckList, CodeBlock, InlineCode, Page, PrincipleCard, Section } from './StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { 'showPanel': false, 'showToolbar': false }
  },
  title: 'Introduction/Conventions'
};

export const Default = {
  'name': 'Conventions',
  'render': () => (
    <Page
      title='Conventions'
      intro='The DS follows strict boundaries for exports, styling, accessibility, Storybook docs, and app consumption. These conventions keep the package portable.'
    >
      <Section title='Architecture Rules'>
        <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          <PrincipleCard number='1' title='Own Reusable UI In The DS' description='If a component is reusable across the blog, Storybook, MDX, navigation, or posts, it belongs in the design-system package.' />
          <PrincipleCard number='2' title='Keep App Glue In The App' description='Route-level data fetching, metadata, and one-off page composition stay outside the package.' />
          <PrincipleCard number='3' title='Export Deliberately' description='Public APIs go through package exports. Internal file paths can change without breaking consumers.' />
          <PrincipleCard number='4' title='Storybook Outside src' description='Stories, Storybook preview styles, and docs helpers live under .storybook/stories, not in src.' />
          <PrincipleCard number='5' title='Token First Styling' description='Use exported tokens and semantic classes before raw values. Raw values must be rare and intentional.' />
          <PrincipleCard number='6' title='Accessible By Contract' description='Components should ship with semantic roles, accessible names, keyboard behavior, and visible focus.' />
        </div>
      </Section>

      <Section title='Styling Rules'>
        <CheckList
          items={ [
            'Component-specific styles live beside the component in CSS modules or in component classes.',
            'Global CSS is limited to Tailwind/base compatibility and CSS custom properties.',
            'Do not recreate overrides.css. Move selectors into the component that owns the markup.',
            'Use only the approved palette families: gray, neutral, blue, green, yellow, red, and indigo.',
            'Prefer semantic token names for product intent: surface, text, border, and accent.',
            'Dark mode must be designed at the component level, not patched globally.'
          ] }
        />
      </Section>

      <Section title='Naming And Exports'>
        <CodeBlock
          code={ `// Preferred
import { Button, Typography } from '@ahmadassaf/design-system';
import { colors } from '@ahmadassaf/design-system/tokens';

// Avoid
import Button from '../../components/primitives/Button/Button';
import '@/css/overrides.css';` }
        />
        <p className='text-sm leading-7 text-gray-600 dark:text-gray-300'>
          Keep package imports stable. When a component becomes public, add it to <InlineCode>src/index.js</InlineCode> or
          a documented subpath export.
        </p>
      </Section>
    </Page>
  )
};
