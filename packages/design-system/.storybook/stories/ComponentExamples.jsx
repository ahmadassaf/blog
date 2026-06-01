import { useState } from 'react';

import { Button } from '../../src/index';

const categories = [
  { 'description': 'Posts about applied AI systems and product engineering.', 'id': 'ai-engineering', 'title': 'ai-engineering' },
  { 'description': 'Notes on RDF, linked data, and graph-backed applications.', 'id': 'knowledge-graphs', 'title': 'knowledge-graphs' }
];

const posts = [
  {
    'category': 'engineering',
    'date': '2026-05-20',
    'href': '/blog/design-systems',
    'id': 'design-systems',
    'path': '/blog/design-systems',
    'readingTime': { 'text': '8 min read' },
    'slug': 'design-systems',
    'subtitle': 'How component ownership keeps a blog interface consistent.',
    'title': 'Design systems keep editorial rhythm predictable',
    'type': 'Post'
  },
  {
    'category': 'data',
    'date': '2026-04-18',
    'href': '/blog/knowledge-graphs',
    'id': 'knowledge-graphs',
    'path': '/blog/knowledge-graphs',
    'slug': 'knowledge-graphs',
    'subtitle': 'A practical path from documents to linked data.',
    'title': 'Knowledge graphs for product teams',
    'type': 'Post'
  }
];

const projects = [{ 'description': 'A command line toolkit for structured data workflows.', 'href': '/projects/gaudi', 'id': 'gaudi', 'slug': 'gaudi', 'subtitle': 'Developer tooling', 'title': 'Gaudi', 'type': 'project' }];

const publications = [{ 'href': 'https://example.com/paper', 'id': 'paper-1', 'slug': 'linked-data-quality', 'subtitle': 'WWW 2026', 'title': 'Linked Data Quality', 'type': 'publication', 'year': '2026' }];

const tags = [
  { 'count': 8, 'display': 'Design Systems', 'id': 'design-systems', 'slug': 'design-systems', 'title': 'Design Systems', 'type': 'tag' },
  { 'count': 5, 'display': 'Next.js', 'id': 'nextjs', 'slug': 'nextjs', 'title': 'Next.js', 'type': 'tag' }
];

const thoughts = [
  { 'featured': true, 'slug': 'small-systems', 'summary': 'Small systems stay understandable when their contracts are explicit.', 'title': 'Small systems are easier to evolve' },
  { 'featured': false, 'slug': 'docs-as-product', 'summary': 'Documentation should show the component in the state people actually ship.', 'title': 'Docs are part of the product surface' }
];

const siteMetadata = {
  'github': 'https://github.com/ahmadassaf/blog',
  'locale': 'en-GB',
  'postsRepo': 'https://github.com/ahmadassaf/blog-posts',
  'siteUrl': 'https://ahmadassaf.com'
};

const series = [
  { 'order': 1, 'series': 'Design Systems', 'slug': 'foundations', 'title': 'Foundations' },
  { 'order': 2, 'series': 'Design Systems', 'slug': 'components', 'title': 'Components' },
  { 'order': 3, 'series': 'Design Systems', 'slug': 'documentation', 'title': 'Documentation' }
];

const frontMatter = {
  ...posts[0],
  'externalLink': 'engineering/design-systems',
  'fileName': 'design-systems.mdx',
  'readingTime': { 'text': '8 min read' },
  'seriesPosts': series,
  'tableOfContents': true,
  'tags': [ 'design systems', 'react', 'storybook' ]
};

const toc = [
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'tokens', 'url': '#tokens', 'value': 'Tokens' },
      { 'children': [], 'depth': 2, 'id': 'components', 'url': '#components', 'value': 'Components' }
    ],
    'depth': 1,
    'id': 'foundations',
    'url': '#foundations',
    'value': 'Foundations'
  }
];

const fileTreeData = [
  {
    'childrenProp': [
      { 'name': 'Callout.jsx' },
      { 'name': 'Table.jsx' },
      { 'name': 'tokens.js' }
    ],
    'isFolder': true,
    'name': 'design-system'
  },
  { 'name': 'package.json' }
];

const stats = [
  { 'change': '14%', 'changeType': 'increase', 'name': 'Coverage', 'previousStat': '72', 'stat': '88' },
  { 'change': '6%', 'changeType': 'decrease', 'name': 'Drift', 'previousStat': '11%', 'stat': '5%' }
];

const chartData = [
  { 'label': 'Mon', 'readTime': 6, 'subscribers': 8, 'views': 124 },
  { 'label': 'Tue', 'readTime': 8, 'subscribers': 12, 'views': 168 },
  { 'label': 'Wed', 'readTime': 7, 'subscribers': 10, 'views': 141 },
  { 'label': 'Thu', 'readTime': 11, 'subscribers': 16, 'views': 226 },
  { 'label': 'Fri', 'readTime': 9, 'subscribers': 14, 'views': 194 }
];

const ExampleFrame = ({ children, width = 'max-w-3xl' }) => (
  <div className={ `${width} rounded-lg border border-gray-200 bg-white p-6 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100` }>
    {children}
  </div>
);

const MdxArticleFrame = ({ children }) => (
  <ExampleFrame width='max-w-4xl'>
    <article className='space-y-6 text-[15px] leading-7 text-gray-700 dark:text-gray-300'>
      <div className='space-y-2 border-b border-gray-200 pb-4 dark:border-gray-800'>
        <p className='text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400'>MDX article output</p>
        <h2 className='text-2xl font-bold leading-tight text-gray-950 dark:text-white'>References in editorial prose</h2>
        <p className='max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400'>
          These examples use the same attributes emitted by the blog rehype plugins. Hover or focus the reference markers to inspect the popover behavior.
        </p>
      </div>
      {children}
    </article>
  </ExampleFrame>
);

const CitationMarker = ({ id, href, keys, numbers, texts }) => (
  <sup className='mx-1 inline align-[0.45em] text-[0.55em] leading-none'>
    <a
      id={ id }
      className='citation-link citation-group inline-flex min-h-[1.45em] min-w-[1.45em] items-center justify-center gap-[0.28em] rounded-full bg-blue-600 px-[0.42em] font-bold leading-none text-white no-underline hover:-translate-y-px hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-400 dark:text-gray-950 dark:hover:bg-blue-300'
      href={ href }
      data-citation-popover='true'
      data-citation-keys={ JSON.stringify(keys) }
      data-citation-numbers={ JSON.stringify(numbers) }
      data-citation-texts={ JSON.stringify(texts) }
      aria-label={ numbers.length === 1 ? `Reference ${numbers[0]}` : `References ${numbers.join(', ')}` }
    >
      {numbers.map((number) => <span key={ number }>{number}</span>)}
    </a>
  </sup>
);

const ReferenceList = ({ references }) => (
  <section className='citations-section rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900' aria-labelledby='storybook-references-title'>
    <h3 id='storybook-references-title' className='text-sm font-semibold text-gray-950 dark:text-white'>References</h3>
    <ol className='citation-list mt-3 space-y-3 text-sm leading-6'>
      {references.map((reference) => (
        <li key={ reference.key } id={ `citation-${reference.key}` } className='pl-1'>
          <span className='citation-entry'>
            <span dangerouslySetInnerHTML={{ '__html': reference.text }} />
            {' '}
            <a
              className='citation-back-link ml-1 hidden rounded text-xs font-semibold text-blue-700 underline-offset-2 hover:underline dark:text-blue-300'
              data-citation-key={ reference.key }
              href={ reference.href }
            >
              Go back
            </a>
          </span>
        </li>
      ))}
    </ol>
  </section>
);

const CommandShell = ({ children }) => (
  <ExampleFrame width='max-w-2xl'>
    <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900'>
      <div className='border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-400'>
        Command palette
      </div>
      <div className='p-2'>{children}</div>
    </div>
  </ExampleFrame>
);

const toneClasses = {
  'blue': 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'gray': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  'green': 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
  'indigo': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  'yellow': 'bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300'
};

const CommandRow = ({ title, subtitle, meta = 'Open', tone = 'blue' }) => (
  <div className='flex items-start justify-between gap-4 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800'>
    <div className='min-w-0'>
      <div className='truncate font-medium text-gray-900 dark:text-gray-100'>{title}</div>
      {subtitle ? <div className='mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400'>{subtitle}</div> : null}
    </div>
    <span className={ `shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold ${toneClasses[tone] || toneClasses.blue}` }>
      {meta}
    </span>
  </div>
);

const CommandPageExample = ({ heading, description, rows }) => (
  <CommandShell>
    <div className='space-y-3'>
      <div className='px-3'>
        <div className='text-sm font-semibold text-gray-900 dark:text-gray-100'>{heading}</div>
        <div className='mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400'>{description}</div>
      </div>
      <div className='space-y-1'>
        {rows.map((row) => <CommandRow key={ row.title } { ...row } />)}
      </div>
    </div>
  </CommandShell>
);

const OpenState = ({ children, initial = true }) => {
  const [ open, setOpen ] = useState(initial);

  return children(open, setOpen);
};

const componentOf = (componentModule) => componentModule.default || componentModule.Pagination || componentModule.ClientReload || null;

const noop = () => undefined;

const renderCommandExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'CmdIcon':
    return <CommandShell><Component name='BookOpenIcon' className='text-blue-600' /></CommandShell>;
  case 'CmdItem':
    return <CommandShell><Component title='Design systems keep editorial rhythm predictable' category='engineering' type='post' icon='BookOpenIcon' /></CommandShell>;
  case 'CmdLauncher':
    return (
      <CommandPageExample
        heading='Command launcher'
        description='The production launcher composes search, navigation pages, recent content, and keyboard shortcuts behind the Command K trigger.'
        rows={ [
          { 'meta': 'Post', 'subtitle': 'engineering', 'title': 'Design systems keep editorial rhythm predictable', 'tone': 'green' },
          { 'meta': 'Project', 'subtitle': 'Developer tooling', 'title': 'Gaudi', 'tone': 'blue' },
          { 'meta': 'Tag', 'subtitle': '8 posts', 'title': 'Design Systems', 'tone': 'indigo' }
        ] }
      />
    );
  case 'CmdLauncherFooter':
  case 'CmdLauncherShortcut':
    return <CommandShell><Component /></CommandShell>;
  case 'CmdLauncherPosts':
    return (
      <CommandPageExample
        heading='Posts page'
        description='Post results expose title, category, and navigation intent inside the launcher.'
        rows={ posts.map((post) => {
          return { 'meta': 'Post', 'subtitle': post.category, 'title': post.title, 'tone': 'green' };
        }) }
      />
    );
  case 'CmdLauncherProjects':
    return (
      <CommandPageExample
        heading='Projects page'
        description='Project results keep descriptions compact so the command surface stays scannable.'
        rows={ projects.map((project) => {
          return { 'meta': 'Project', 'subtitle': project.subtitle, 'title': project.title, 'tone': 'blue' };
        }) }
      />
    );
  case 'CmdLauncherPublications':
    return (
      <CommandPageExample
        heading='Publications page'
        description='Publication rows include the title and year while preserving the same keyboard target shape.'
        rows={ publications.map((publication) => {
          return { 'meta': publication.year, 'subtitle': publication.subtitle, 'title': publication.title, 'tone': 'yellow' };
        }) }
      />
    );
  case 'CmdLauncherTags':
    return (
      <CommandPageExample
        heading='Tags page'
        description='Tags act as navigation filters and show the available article count.'
        rows={ tags.map((tag) => {
          return { 'meta': `${tag.count} posts`, 'subtitle': 'Topic filter', 'title': tag.title, 'tone': 'indigo' };
        }) }
      />
    );
  case 'CmdLauncherThoughts':
    return (
      <CommandPageExample
        heading='Thoughts page'
        description='Thought rows use the same result affordance as posts but keep summary text lighter.'
        rows={ thoughts.map((thought) => {
          return { 'meta': thought.featured ? 'Featured' : 'Thought', 'subtitle': thought.summary, 'title': thought.title, 'tone': thought.featured ? 'green' : 'gray' };
        }) }
      />
    );
  case 'CmdLauncherSearch':
    return (
      <CommandPageExample
        heading='Search results'
        description='Full-text search groups matching blog content without mounting command-palette internals in docs.'
        rows={ [
          { 'meta': 'Post', 'subtitle': 'Matched title and subtitle for "design"', 'title': posts[0].title, 'tone': 'green' },
          { 'meta': 'Project', 'subtitle': 'Matched project description', 'title': projects[0].title, 'tone': 'blue' }
        ] }
      />
    );
  case 'CmdLauncherSocial':
    return (
      <CommandPageExample
        heading='Contact page'
        description='Social links are presented as explicit navigation rows with readable labels.'
        rows={ [
          { 'meta': 'Email', 'subtitle': 'Start an email', 'title': 'Contact Ahmad', 'tone': 'blue' },
          { 'meta': 'GitHub', 'subtitle': siteMetadata.github, 'title': 'Open GitHub profile', 'tone': 'gray' },
          { 'meta': 'LinkedIn', 'subtitle': 'Professional profile', 'title': 'Open LinkedIn', 'tone': 'indigo' }
        ] }
      />
    );
  case 'CmdSearch':
    return (
      <CommandPageExample
        heading='Search command'
        description='Search composes recent queries and grouped results while preserving keyboard navigation contracts.'
        rows={ [
          { 'meta': 'Recent', 'subtitle': 'Previous query', 'title': 'design systems', 'tone': 'gray' },
          { 'meta': 'Post', 'subtitle': posts[0].subtitle, 'title': posts[0].title, 'tone': 'green' },
          { 'meta': 'Publication', 'subtitle': publications[0].subtitle, 'title': publications[0].title, 'tone': 'yellow' }
        ] }
      />
    );
  case 'useCmdLauncher':
    return (
      <CommandShell>
        <div className='space-y-2 text-sm'>
          <div className='font-semibold'>Hook result shape</div>
          <code className='block rounded bg-gray-100 p-3 text-xs dark:bg-gray-800'>page, search, collections, selected, setOpen, setSearch</code>
        </div>
      </CommandShell>
    );
  case 'CmdPost':
    return <CommandShell><Component title='Design systems keep editorial rhythm predictable' category='engineering' /></CommandShell>;
  case 'CmdProject':
    return <CommandShell><Component title='Gaudi' subtitle='Developer toolkit for structured data' showType /></CommandShell>;
  case 'CmdPublication':
    return <CommandShell><Component title='Linked Data Quality' year='2026' /></CommandShell>;
  case 'CmdTag':
    return <CommandShell><Component title='Design Systems' count={ 8 } /></CommandShell>;
  default:
    return null;
  }
};

const renderContentExample = (name, componentModule) => {
  switch (name) {
  default:
    return null;
  }
};

const renderBlocksExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'ThoughtsSection':
  case 'Thoughts':
    return <ExampleFrame><Component thoughts={ thoughts } /></ExampleFrame>;
  default:
    return null;
  }
};

const renderMdxExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'CodeGroupTabs':
    return (
      <ExampleFrame>
        <Component />
        <div className='code-group'>
          <div className='code-group-tab' data-language='js'>JavaScript</div>
          <pre><code>import &#123; Button &#125; from '@gaudi/design-system';</code></pre>
        </div>
      </ExampleFrame>
    );
  case 'ImageModal':
    return (
      <OpenState>
        {(open, setOpen) => (
          <ExampleFrame>
            <Button type='button' onClick={ () => setOpen(true) }>Open image modal</Button>
            <Component isOpen={ open } onClose={ () => setOpen(false) } src='/static/images/logo.svg' alt='Blog logo' caption='Accessible image preview with focus management.' />
          </ExampleFrame>
        )}
      </OpenState>
    );
  case 'Aside':
    return <ExampleFrame><Component>Additional context that supports the article without interrupting the main argument.</Component></ExampleFrame>;
  case 'Callout':
    return <ExampleFrame><Component type='info'>Use callouts for important editorial context, warnings, and implementation notes.</Component></ExampleFrame>;
  case 'Chart':
    return (
      <ExampleFrame width='max-w-4xl'>
        <Component
          ariaLabel='Article views by day'
          data={ chartData }
          description='A Recharts-backed chart embedded through the MDX registry.'
          title='Article views'
          yKey='views'
        />
      </ExampleFrame>
    );
  case 'CitationPopover':
    return (
      <MdxArticleFrame>
        <p>
          Knowledge graph systems need durable identifiers
          <CitationMarker
            id='cite-ref-story-1'
            href='#citation-smith-2026'
            keys={ [ 'smith-2026' ] }
            numbers={ [ 1 ] }
            texts={ [ 'Smith (2026). <strong>Durable identifiers in linked data</strong>. Journal of Knowledge Systems.' ] }
          >
            1
          </CitationMarker>
          and citation groups should keep every source reachable from one marker
          <CitationMarker
            id='cite-ref-story-2'
            href='#citation-chen-2025'
            keys={ [ 'chen-2025', 'rivera-2024' ] }
            numbers={ [ 2, 3 ] }
            texts={ [
              'Chen (2025). <strong>Operational metadata for linked data pipelines</strong>. Data Engineering Review.',
              'Rivera (2024). <strong>Editorial provenance in public knowledge systems</strong>. Web Semantics.'
            ] }
          >
            2 3
          </CitationMarker>
          .
        </p>
        <ReferenceList
          references={ [
            { 'href': '#cite-ref-story-1', 'key': 'smith-2026', 'text': 'Smith (2026). <strong>Durable identifiers in linked data</strong>. Journal of Knowledge Systems.' },
            { 'href': '#cite-ref-story-2', 'key': 'chen-2025', 'text': 'Chen (2025). <strong>Operational metadata for linked data pipelines</strong>. Data Engineering Review.' },
            { 'href': '#cite-ref-story-2', 'key': 'rivera-2024', 'text': 'Rivera (2024). <strong>Editorial provenance in public knowledge systems</strong>. Web Semantics.' }
          ] }
        />
        <Component />
      </MdxArticleFrame>
    );
  case 'CitationTracker':
    return (
      <MdxArticleFrame>
        <p>
          Clicking different instances of the same source updates the bibliography back-link target
          <CitationMarker
            id='cite-ref-tracker-1'
            href='#citation-tracker-1'
            keys={ [ 'tracker-1' ] }
            numbers={ [ 1 ] }
            texts={ [ 'Tracked reference used by multiple citation instances.' ] }
          >
            1
          </CitationMarker>
          . Later in the same article, the source can appear again
          <CitationMarker
            id='cite-ref-tracker-2'
            href='#citation-tracker-1'
            keys={ [ 'tracker-1' ] }
            numbers={ [ 1 ] }
            texts={ [ 'Tracked reference used by multiple citation instances.' ] }
          >
            1
          </CitationMarker>
          .
        </p>
        <ReferenceList references={ [{ 'href': '#cite-ref-tracker-1', 'key': 'tracker-1', 'text': 'Tracked reference used by multiple citation instances.' }] } />
        <Component />
      </MdxArticleFrame>
    );
  case 'Details':
    return <ExampleFrame><Component title='Implementation detail'>Details are keyboard accessible and preserve article flow.</Component></ExampleFrame>;
  case 'Faq':
    return <ExampleFrame><Component questions={ [{ 'answer': 'They keep repeated article explanations structured and accessible.', 'question': 'Why use FAQ blocks?' }] } /></ExampleFrame>;
  case 'FileTree':
    return <ExampleFrame><Component data={ fileTreeData } /></ExampleFrame>;
  case 'HeroVideoDialog':
    return (
      <ExampleFrame width='max-w-4xl'>
        <Component
          animationStyle='from-center'
          thumbnailSrc='/static/images/og-card.jpg'
          thumbnailAlt='Knowledge graph article video preview'
          title='Knowledge graph walkthrough'
          videoSrc='https://www.youtube.com/embed/qh3NGpYRG3I'
        />
      </ExampleFrame>
    );
  case 'FootnotePopover':
    return (
      <MdxArticleFrame>
        <p>
          Footnotes stay readable without moving the reader away from the current paragraph
          <sup id='fnref-1' className='mx-0.5 align-super text-xs'>
            <a
              href='#user-content-fn-1'
              className='footnote-link inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-indigo-50 px-1.5 text-[11px] font-semibold text-indigo-700 underline-offset-2 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'
              data-footnote-ref='true'
              data-footnote-popover='true'
              data-footnote-number='1'
              data-footnote-content='A short explanatory footnote with an <a href="https://example.com">external source</a>.'
              aria-label='Footnote 1'
            >
              1
            </a>
          </sup>
          .
        </p>
        <section className='rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900' aria-labelledby='storybook-footnotes-title'>
          <h3 id='storybook-footnotes-title' className='text-sm font-semibold text-gray-950 dark:text-white'>Footnotes</h3>
          <ol className='mt-3 space-y-2 text-sm leading-6'>
            <li id='user-content-fn-1'>A short explanatory footnote with an external source. <a href='#fnref-1' className='text-xs font-semibold text-blue-700 dark:text-blue-300'>Go back</a></li>
          </ol>
        </section>
        <Component />
      </MdxArticleFrame>
    );
  case 'Highlight':
    return <ExampleFrame><p>Use <Component>highlight</Component> for inline emphasis inside prose.</p></ExampleFrame>;
  case 'Image':
    return <ExampleFrame><Component src='/static/images/logo.svg' alt='Blog logo' width={ 160 } height={ 160 } /></ExampleFrame>;
  case 'InternalPreview':
    return <ExampleFrame><p><Component href='/blog/design-systems' title='Design systems keep editorial rhythm predictable'>Internal post preview</Component></p></ExampleFrame>;
  case 'LatexText':
    return <ExampleFrame><p>Ordinal text stays readable: <Component>11$^&#123;th&#125;$ International Conference</Component></p></ExampleFrame>;
  case 'Mermaid':
    return <ExampleFrame><Component id='storybook-mermaid-example' chart={ 'graph TD; A[Draft] --> B[Review]; B --> C[Publish];' } /></ExampleFrame>;
  case 'PostImage':
    return <ExampleFrame><Component title='gaudi' caption='Project architecture diagram rendered as a post image.' width={ 420 } height={ 260 } /></ExampleFrame>;
  case 'Pre':
    return <ExampleFrame><Component><code>{'const token = colors.blue[500];'}</code></Component></ExampleFrame>;
  case 'Preview':
    return <ExampleFrame><Component url='https://ahmadassaf.com' title='Ahmad Assaf' showImage={ false } /></ExampleFrame>;
  case 'Quote':
    return <ExampleFrame><Component text='Good component systems make product code calmer.' author='Design System' title='Internal principle' /></ExampleFrame>;
  case 'ReferencePopover':
    return (
      <MdxArticleFrame>
        <p>
          Legacy references now use the same citation popover behavior, so old MDX output remains supported
          <CitationMarker
            id='cite-ref-reference-1'
            href='#citation-reference-1'
            keys={ [ 'reference-1' ] }
            numbers={ [ 1 ] }
            texts={ [ 'Reference metadata for the cited source. Rendered through the CitationPopover compatibility path.' ] }
          >
            1
          </CitationMarker>
          .
        </p>
        <ReferenceList references={ [{ 'href': '#cite-ref-reference-1', 'key': 'reference-1', 'text': 'Reference metadata for the cited source. Rendered through the CitationPopover compatibility path.' }] } />
        <Component />
      </MdxArticleFrame>
    );
  case 'Stats':
    return <ExampleFrame><Component text='Design system coverage' stats={ stats } /></ExampleFrame>;
  case 'Table':
    return (
      <ExampleFrame>
        <Component>
          <thead><tr><th>Component</th><th>Status</th></tr></thead>
          <tbody><tr><td>Callout</td><td>Documented</td></tr><tr><td>Table</td><td>Accessible</td></tr></tbody>
        </Component>
      </ExampleFrame>
    );
  case 'Tooltip':
    return <ExampleFrame><p><Component message='A compact explanation attached to inline text.'>Hover this editorial term</Component></p></ExampleFrame>;
  case 'mdx':
    return <ExampleFrame><p>MDX registry exposes article components such as Callout, Table, Quote, and Preview.</p></ExampleFrame>;
  default:
    return null;
  }
};

const renderNavigationExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'DropDown':
    return (
      <OpenState initial={ false }>
        {(open, setOpen) => (
          <ExampleFrame width='max-w-sm'>
            <Component name='Content sections' menuDropDownOpen={ open } setMenuDropDownOpen={ setOpen } />
            {open ? <div className='mt-3 rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700'>Articles, thoughts, and projects</div> : null}
          </ExampleFrame>
        )}
      </OpenState>
    );
  case 'FloatingMenu':
    return <ExampleFrame width='max-w-sm'><div className='relative min-h-32'><Component className='static opacity-100' /></div></ExampleFrame>;
  case 'Menu':
    return <ExampleFrame width='max-w-4xl'><Component /></ExampleFrame>;
  case 'MenuBlog':
    return <ExampleFrame width='max-w-md'><Component categories={ categories } /></ExampleFrame>;
  case 'MenuLogo':
    return <ExampleFrame width='max-w-sm'><Component /></ExampleFrame>;
  case 'MenuMain':
    return <ExampleFrame width='max-w-md'><Component categories={ categories } allPosts={ posts } /></ExampleFrame>;
  case 'MenuMobile':
    return <ExampleFrame width='max-w-sm'><Component categories={ categories } links={ [{ 'href': '/about', 'title': 'About' }, { 'href': '/blog', 'title': 'Blog' }] } setMobileMenuOpen={ noop } setLauncherOpen={ noop } /></ExampleFrame>;
  case 'MenuSearch':
    return <ExampleFrame width='max-w-sm'><Component setOpen={ noop } /></ExampleFrame>;
  default:
    return null;
  }
};

const renderPostExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'Breadcrumbs':
    return <ExampleFrame><Component pages={ [{ 'current': false, 'href': '/blog', 'name': 'Blog' }, { 'current': true, 'href': '/blog/design-systems', 'name': 'Design Systems' }] } /></ExampleFrame>;
  case 'Disclaimer':
    return <ExampleFrame><Component /></ExampleFrame>;
  case 'Post':
    return <ExampleFrame><ul><Component frontMatter={ frontMatter } /></ul></ExampleFrame>;
  case 'PostComments':
    return <ExampleFrame><Component /></ExampleFrame>;
  case 'PostHeader':
    return <ExampleFrame><Component frontMatter={ frontMatter } siteMetadata={ siteMetadata } toc={ toc } /></ExampleFrame>;
  case 'PostNavigation':
    return <ExampleFrame><Component prev={{ 'slug': 'previous-post', 'title': 'Previous post title' }} next={{ 'slug': 'next-post', 'title': 'Next post title' }} /></ExampleFrame>;
  case 'PostSeriesBox':
    return <ExampleFrame><Component series={ series } slug='components' /></ExampleFrame>;
  case 'PostSharing':
    return <ExampleFrame><Component siteMetadata={ siteMetadata } slug='design-systems' title='Design systems keep editorial rhythm predictable' tags={ [ 'design systems', 'react' ] } externalLink='engineering/design-systems' /></ExampleFrame>;
  case 'TableOfContents':
    return <ExampleFrame><Component toc={ toc } /></ExampleFrame>;
  default:
    return null;
  }
};

const renderFormsExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  if (name === 'NewsletterForm') return <ExampleFrame width='max-w-xl'><Component /></ExampleFrame>;

  return null;
};

const renderLayoutExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'Aurora':
    return (
      <Component className='min-h-[320px] overflow-hidden rounded-xl'>
        <div className='relative z-10 max-w-xl p-8 text-center'>
          <h2 className='text-3xl font-bold'>Editorial systems, documented</h2>
          <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>A background treatment used behind full page content.</p>
        </div>
      </Component>
    );
  case 'Footer':
    return <ExampleFrame width='max-w-5xl'><Component /></ExampleFrame>;
  case 'LayoutContainer':
    return (
      <ExampleFrame>
        <div className='space-y-3'>
          <div className='text-sm font-semibold'>LayoutContainer</div>
          <p className='text-sm leading-6 text-gray-600 dark:text-gray-300'>Server layout wrapper that composes theme, aurora background, navigation, main content, and footer in the app shell.</p>
        </div>
      </ExampleFrame>
    );
  case 'LayoutWrapper':
    return <ExampleFrame width='max-w-4xl'><Component><div className='rounded-lg bg-gray-50 p-6 text-sm dark:bg-gray-900'>Page content area</div></Component></ExampleFrame>;
  case 'Search':
    return (
      <ExampleFrame width='max-w-md'>
        <Component setSearchValue={ noop } />
      </ExampleFrame>
    );
  case 'SectionContainer':
    return <ExampleFrame><Component><section className='rounded-lg bg-gray-50 p-5 text-sm dark:bg-gray-900'>Section content keeps its semantic structure.</section></Component></ExampleFrame>;
  default:
    return null;
  }
};

export const renderComponentExample = (title, componentModule) => {
  const [ group, ...nameParts ] = title.split('/');
  const name = nameParts[nameParts.length - 1];
  const renderers = {
    'Blocks': renderBlocksExample,
    'Command': renderCommandExample,
    'Content': renderContentExample,
    'Forms': renderFormsExample,
    'Layout': renderLayoutExample,
    'MDX': renderMdxExample,
    'Navigation': renderNavigationExample,
    'Post': renderPostExample
  };
  const rendered = renderers[group]?.(name, componentModule);

  return rendered || (
    <ExampleFrame>
      <p className='text-sm leading-6 text-gray-600 dark:text-gray-300'>
        {title} is documented as part of the design system and covered by a colocated contract story.
      </p>
    </ExampleFrame>
  );
};
