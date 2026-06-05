import { CheckList, CodeBlock, InlineCode, Page, QuickLink, Section, Table, Td, Th } from '../../../.storybook/stories/StoryDocs';

export default {
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false }
  },
  tags: [ '!autodocs' ],
  title: 'MDX/Overview'
};

export const Default = {
  name: 'Overview',
  render: () => (
    <Page
      title='MDX Components'
      intro='MDX components are the article-authoring layer for Gaudi. They let posts mix normal markdown with a small set of structured components for callouts, media, charts, citations, previews, details, and article-specific UI.'
      kicker='Authoring'
    >
      <Section title='What MDX Means Here' description='Posts are still markdown-first. MDX is used only when the article needs richer structure than markdown can provide.'>
        <Table>
          <thead>
            <tr><Th>Layer</Th><Th>Responsibility</Th></tr>
          </thead>
          <tbody>
            <tr><Td mono>Post file</Td><Td>Authors write prose, markdown, and component tags in <InlineCode>.md</InlineCode> or <InlineCode>.mdx</InlineCode> files.</Td></tr>
            <tr><Td mono>MDX map</Td><Td>The blog maps those tags to Gaudi MDX components, so posts stay clean and package-owned.</Td></tr>
            <tr><Td mono>Gaudi MDX</Td><Td>Components render accessible article UI with consistent typography, spacing, tokens, and interactive behavior.</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Author Syntax' description='This is the shape authors should write in a post file. No local imports are needed when the blog MDX provider exposes the component map.'>
        <CodeBlock
          language='mdx'
          code={ `# Building durable article interfaces

Markdown handles normal prose, lists, links, headings, and tables.

<Callout type='info'>
  Use MDX components only when the article needs structured UI.
</Callout>

Use <Highlight>inline emphasis</Highlight> sparingly inside prose.

<Details title='Implementation note'>
  Expanded context can stay available without interrupting the main reading path.
</Details>

<Quote text='Good component systems make product code calmer.' author='Gaudi' />

<Faq questions={[
  {
    question: 'Do posts import components?',
    answer: 'No. The blog maps MDX tags to Gaudi components.'
  }
]} />` }
        />
      </Section>

      <Section title='Component Map' description='These are author-facing article tags, not generic React examples.'>
        <Table>
          <thead>
            <tr><Th>Need</Th><Th>Use</Th></tr>
          </thead>
          <tbody>
            <tr><Td mono>Supporting note</Td><Td><InlineCode>{'<Aside>'}</InlineCode> or <InlineCode>{'<Callout>'}</InlineCode></Td></tr>
            <tr><Td mono>Expandable context</Td><Td><InlineCode>{'<Details>'}</InlineCode></Td></tr>
            <tr><Td mono>Question-answer content</Td><Td><InlineCode>{'<Faq>'}</InlineCode></Td></tr>
            <tr><Td mono>Inline explanation</Td><Td><InlineCode>{'<Tooltip>'}</InlineCode>, <InlineCode>{'<Highlight>'}</InlineCode>, or <InlineCode>{'<LatexText>'}</InlineCode></Td></tr>
            <tr><Td mono>Media</Td><Td><InlineCode>{'<Image>'}</InlineCode>, <InlineCode>{'<Video>'}</InlineCode>, or <InlineCode>{'<Preview>'}</InlineCode></Td></tr>
            <tr><Td mono>Data and diagrams</Td><Td><InlineCode>{'<Chart>'}</InlineCode> variants, markdown tables, <InlineCode>{'<FileTree>'}</InlineCode>, or <InlineCode>{'<Mermaid>'}</InlineCode></Td></tr>
            <tr><Td mono>References</Td><Td><InlineCode>{'<CitationPopover>'}</InlineCode>, <InlineCode>{'<CitationTracker>'}</InlineCode>, and reference-list output from the blog pipeline.</Td></tr>
          </tbody>
        </Table>
      </Section>

      <Section title='Rules For Posts'>
        <CheckList
          items={ [
            'Use markdown first for paragraphs, headings, lists, links, and simple tables.',
            'Use MDX tags for semantic article UI, not layout hacks.',
            'Do not import Gaudi components inside every post; the blog MDX provider owns the mapping.',
            'Always provide labels, captions, alt text, titles, and aria labels where the component needs them.',
            'Keep examples realistic: post content should look like an article, not a component playground.'
          ] }
        />
      </Section>

      <Section title='Component Docs' description='Use the individual MDX pages for props, accessibility notes, and focused examples.'>
        <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          <QuickLink title='Callout' description='Article notices and supporting context.' storyId='mdx-callout--example' />
          <QuickLink title='Chart' description='Recharts-powered article data visualization.' storyId='mdx-chart--bar' />
          <QuickLink title='Table' description='Markdown and component-rendered article tables.' storyId='mdx-table--example' />
          <QuickLink title='Video' description='Thumbnail-triggered article video embeds.' storyId='mdx-video--example' />
          <QuickLink title='Citation Popover' description='Reference markers and source popovers.' storyId='mdx-citationpopover--example' />
          <QuickLink title='Mermaid' description='Diagram snippets embedded in prose.' storyId='mdx-mermaid--example' />
        </div>
      </Section>
    </Page>
  )
};
