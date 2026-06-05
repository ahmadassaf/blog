import { useState } from 'react';

import CitationPopoverRuntime from '../../src/components/mdx/CitationPopover';
import CitationTrackerRuntime from '../../src/components/mdx/CitationTracker';
import { Button } from '../../src/index';

import mdxContentStyles from '../../src/components/mdx/MdxContent/MdxContent.module.css';

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
      { 'children': [], 'depth': 2, 'id': 'design-tokens', 'url': '#design-tokens', 'value': 'Design tokens' },
      { 'children': [], 'depth': 2, 'id': 'semantic-scales', 'url': '#semantic-scales', 'value': 'Semantic scales' }
    ],
    'depth': 1,
    'id': 'foundations',
    'url': '#foundations',
    'value': 'Foundations'
  },
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'component-contracts', 'url': '#component-contracts', 'value': 'Component contracts' },
      { 'children': [], 'depth': 2, 'id': 'composition-rules', 'url': '#composition-rules', 'value': 'Composition rules' }
    ],
    'depth': 1,
    'id': 'components',
    'url': '#components',
    'value': 'Components'
  },
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'keyboard-flow', 'url': '#keyboard-flow', 'value': 'Keyboard flow' },
      { 'children': [], 'depth': 2, 'id': 'semantic-html', 'url': '#semantic-html', 'value': 'Semantic HTML' }
    ],
    'depth': 1,
    'id': 'accessibility',
    'url': '#accessibility',
    'value': 'Accessibility'
  },
  {
    'children': [
      { 'children': [], 'depth': 2, 'id': 'mdx-registry', 'url': '#mdx-registry', 'value': 'MDX registry' },
      { 'children': [], 'depth': 2, 'id': 'storybook-coverage', 'url': '#storybook-coverage', 'value': 'Storybook coverage' },
      { 'children': [], 'depth': 2, 'id': 'release-checks', 'url': '#release-checks', 'value': 'Release checks' },
      { 'children': [], 'depth': 2, 'id': 'documentation', 'url': '#documentation', 'value': 'Documentation' }
    ],
    'depth': 1,
    'id': 'implementation',
    'url': '#implementation',
    'value': 'Implementation'
  }
];

const articleSections = toc.flatMap((section) => [
  section,
  ...section.children
]);

const sectionBody = 'Use enough article copy to make the page scroll and let the table of contents track the active heading. The example mirrors a real post instead of a bare list of hidden headings.';

const layoutPosts = [
  { 'category': 'Engineering', 'title': 'Design systems keep editorial rhythm predictable' },
  { 'category': 'Data', 'title': 'Knowledge graphs for product teams' },
  { 'category': 'Management', 'title': 'Decision records make teams faster' }
];

const SearchExample = ({ Component }) => {
  const [ searchValue, setSearchValue ] = useState('');
  const filteredPosts = layoutPosts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()) || post.category.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <ExampleFrame width='max-w-2xl'>
      <div className='space-y-5'>
        <Component setSearchValue={ setSearchValue } />
        <div className='divide-y divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-800 dark:border-gray-800'>
          {filteredPosts.map((post) => (
            <article key={ post.title } className='p-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400'>{post.category}</p>
              <h3 className='mt-1 text-base font-semibold text-gray-950 dark:text-white'>{post.title}</h3>
            </article>
          ))}
          {filteredPosts.length === 0 ? (
            <p className='p-4 text-sm text-gray-500 dark:text-gray-400'>No posts matched.</p>
          ) : null}
        </div>
      </div>
    </ExampleFrame>
  );
};

const LayoutContainerPreview = () => (
  <ExampleFrame width='max-w-6xl'>
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950'>
      <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800'>
        <div className='text-sm font-semibold text-gray-950 dark:text-white'>Assaf Website</div>
        <div className='flex gap-4 text-sm text-gray-500 dark:text-gray-400'>
          <span>Blog</span>
          <span>Projects</span>
          <span>About</span>
        </div>
      </div>
      <div className='grid gap-6 p-5 lg:grid-cols-[1fr_18rem]'>
        <main className='space-y-5'>
          <section className='rounded-lg border border-gray-200 p-5 dark:border-gray-800'>
            <p className='text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400'>Latest post</p>
            <h2 className='mt-2 text-3xl font-bold text-gray-950 dark:text-white'>Design systems keep editorial rhythm predictable</h2>
            <p className='mt-3 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300'>The root layout frames navigation, content, background treatment, and footer around the page content.</p>
          </section>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900'>Recent writing</div>
            <div className='rounded-lg bg-gray-50 p-4 text-sm dark:bg-gray-900'>Project updates</div>
          </div>
        </main>
        <aside className='rounded-lg border border-gray-200 p-4 dark:border-gray-800'>
          <p className='text-sm font-semibold text-gray-950 dark:text-white'>Floating actions</p>
          <div className='mt-4 space-y-2 text-sm text-gray-500 dark:text-gray-400'>
            <p>Theme</p>
            <p>Search</p>
            <p>Command menu</p>
          </div>
        </aside>
      </div>
      <div className='border-t border-gray-200 px-5 py-4 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400'>Footer navigation and newsletter area</div>
    </div>
  </ExampleFrame>
);

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
    <article className={ `${mdxContentStyles.root} space-y-6 text-[15px] leading-7 text-gray-700 dark:text-gray-300` }>
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
  <sup>
    <a
      id={ id }
      className={ `citation-link ${numbers.length > 1 ? 'citation-group' : ''}` }
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

const OpenState = ({ children, initial = true }) => {
  const [ open, setOpen ] = useState(initial);

  return children(open, setOpen);
};

const unwrapComponent = (candidate) => {
  let component = candidate;
  let depth = 0;

  while (component && typeof component === 'object' && 'default' in component && depth < 3) {
    component = component.default;
    depth += 1;
  }

  return component;
};

const componentOf = (componentModule) => unwrapComponent(componentModule.default || componentModule.Pagination || componentModule.ClientReload || null);

const noop = () => undefined;

const renderCommandExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'CmdLauncher':
    return (
      <OpenState>
        {(open, setOpen) => (
          <Component
            open={ open }
            posts={ posts }
            projects={ projects }
            publications={ publications }
            setOpen={ setOpen }
            tags={ tags }
            thoughts={ thoughts }
          />
        )}
      </OpenState>
    );
  case 'CmdLauncherShortcut':
    return <ExampleFrame width='max-w-sm'><Component /></ExampleFrame>;
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
  case 'ImageModal':
    return (
      <OpenState initial={ false }>
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
        <CitationTrackerRuntime />
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
        <CitationPopoverRuntime />
      </MdxArticleFrame>
    );
  case 'Details':
    return <ExampleFrame><Component title='Implementation detail'>Details are keyboard accessible and preserve article flow.</Component></ExampleFrame>;
  case 'Faq':
    return <ExampleFrame><Component questions={ [{ 'answer': 'They keep repeated article explanations structured and accessible.', 'question': 'Why use FAQ blocks?' }] } /></ExampleFrame>;
  case 'FileTree':
    return <ExampleFrame><Component data={ fileTreeData } /></ExampleFrame>;
  case 'Video':
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
    return <ExampleFrame><Component src='/static/images/posts/gaudi.svg' darkSrc='/static/images/posts/gaudi-dark.svg' alt='Gaudi diagram' caption='Project architecture diagram rendered as a post image.' width={ 420 } height={ 260 } /></ExampleFrame>;
  case 'LatexText':
    return <ExampleFrame><p>Ordinal text stays readable: <Component>11$^&#123;th&#125;$ International Conference</Component></p></ExampleFrame>;
  case 'Mermaid':
    return <ExampleFrame><Component id='storybook-mermaid-example' chart={ 'graph TD; A[Draft] --> B[Review]; B --> C[Publish];' } /></ExampleFrame>;
  case 'Pre':
    return <ExampleFrame><Component><code>{'const token = colors.blue[500];'}</code></Component></ExampleFrame>;
  case 'Preview':
    return (
      <ExampleFrame>
        <div className='space-y-3'>
          <p>
            <Component
              url='https://assaf.website'
              previewData={{
                'description': 'Personal website and writing archive for Ahmad Assaf.',
                'favicon': '/static/favicons/favicon-32x32.png',
                'image': '/static/images/og-card.jpg',
                'siteName': 'assaf.website',
                'title': 'assaf.website',
                'type': 'website'
              }}
            />
          </p>
          <p><Component url='https://this-link-will-not-work.invalid' title='Unavailable link' showImage={ false } /></p>
          <p>
            <Component
              defaultOpen
              internal
              url='/blog'
              previewData={{
                'category': 'engineering',
                'description': 'Browse the latest posts, projects, and notes from the blog archive.',
                'publishedTime': '2026-06-05',
                'readingTime': '8 min read',
                'siteName': 'Internal',
                'tags': [ 'design systems', 'mdx', 'preview' ],
                'title': 'Internal blog link',
                'type': 'internal'
              }}
            />
          </p>
        </div>
      </ExampleFrame>
    );
  case 'Quote':
    return <ExampleFrame><Component text='Good component systems make product code calmer.' author='Design System' title='Internal principle' /></ExampleFrame>;
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
  case 'PostHeader':
    return <ExampleFrame width='max-w-5xl'><Component frontMatter={ frontMatter } siteMetadata={ siteMetadata } toc={ toc } /></ExampleFrame>;
  case 'PostNavigation':
    return <ExampleFrame><Component prev={{ 'slug': 'previous-post', 'title': 'Previous post title' }} next={{ 'slug': 'next-post', 'title': 'Next post title' }} /></ExampleFrame>;
  case 'PostSeriesBox':
    return <ExampleFrame width='max-w-3xl'><Component series={ series } slug='components' /></ExampleFrame>;
  case 'PostSharing':
    return <ExampleFrame><Component siteMetadata={ siteMetadata } slug='design-systems' title='Design systems keep editorial rhythm predictable' tags={ [ 'design systems', 'react' ] } externalLink='engineering/design-systems' /></ExampleFrame>;
  case 'TableOfContents':
    return (
      <ExampleFrame width='max-w-6xl'>
        <div className='grid grid-cols-1 gap-10 xl:grid-cols-12'>
          <article className='xl:col-span-8'>
            <div className='mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900'>
              <p className='text-sm font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400'>Scrollable article fixture</p>
              <h2 className='mt-2 text-2xl font-bold text-gray-950 dark:text-white'>A realistic table of contents example</h2>
              <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>
                Scroll this story to see the sticky TOC stay in view, collapse inactive branches, and expand the active section as headings pass through the viewport.
              </p>
            </div>

            <div className='space-y-16 pb-[45rem] text-gray-700 dark:text-gray-300'>
              {articleSections.map((section) => {
                const Heading = section.depth === 1 ? 'h2' : 'h3';

                return (
                  <section key={ section.id } className={ section.depth === 1 ? 'scroll-mt-28' : 'scroll-mt-28 pl-8' }>
                    <Heading id={ section.id } className={ section.depth === 1 ? 'text-2xl font-bold text-gray-950 dark:text-white' : 'text-xl font-semibold text-gray-800 dark:text-gray-100' }>
                      {section.value}
                    </Heading>
                    <div className='mt-4 space-y-4 text-sm leading-7'>
                      <p>{sectionBody}</p>
                      <p>
                        This block adds enough vertical rhythm for scroll tracking, hash navigation, and sticky sidebar behavior to be visible inside Storybook.
                      </p>
                      {section.depth === 1 && (
                        <div className='rounded-lg border border-gray-200 bg-white p-4 text-sm shadow-xs dark:border-gray-800 dark:bg-gray-950'>
                          Section overview content sits here so top-level entries have enough height before their nested headings appear.
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </article>

          <aside className='xl:col-span-4'>
            <Component toc={ toc } className='top-6 max-h-[32rem]' />
          </aside>
        </div>
      </ExampleFrame>
    );
  default:
    return null;
  }
};

const renderLayoutExample = (name, componentModule) => {
  const Component = componentOf(componentModule);

  switch (name) {
  case 'Aurora':
    return (
      <ExampleFrame width='max-w-6xl'>
        <Component className='min-h-[420px] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800'>
          <div className='relative z-10 w-full max-w-4xl px-8 py-16'>
            <p className='text-sm font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400'>Editorial system</p>
            <h2 className='mt-3 max-w-2xl text-5xl font-bold leading-tight text-gray-950 dark:text-white'>Writing, projects, and research in one quiet shell</h2>
            <p className='mt-5 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300'>The background sits behind full-page content while the foreground keeps the article surface readable.</p>
            <div className='mt-8 grid gap-3 sm:grid-cols-3'>
              {layoutPosts.map((post) => (
                <div key={ post.title } className='rounded-lg border border-white/70 bg-white/75 p-4 text-sm shadow-xs backdrop-blur dark:border-white/10 dark:bg-gray-950/70'>
                  <p className='text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400'>{post.category}</p>
                  <p className='mt-2 font-semibold text-gray-950 dark:text-white'>{post.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Component>
      </ExampleFrame>
    );
  case 'Footer':
    return (
      <ExampleFrame width='max-w-6xl'>
        <div className='rounded-lg border border-gray-200 px-6 dark:border-gray-800'>
          <Component />
        </div>
      </ExampleFrame>
    );
  case 'LayoutContainer':
    return <LayoutContainerPreview />;
  case 'LayoutWrapper':
    return (
      <ExampleFrame width='max-w-6xl'>
        <div className='max-h-[42rem] overflow-auto rounded-lg border border-gray-200 dark:border-gray-800'>
          <Component>
            <div className='grid gap-5 md:grid-cols-[1.4fr_1fr]'>
              <article className='rounded-lg border border-gray-200 p-5 dark:border-gray-800'>
                <p className='text-xs font-semibold uppercase tracking-[0.12em] text-blue-600 dark:text-blue-400'>Featured</p>
                <h2 className='mt-2 text-3xl font-bold text-gray-950 dark:text-white'>A complete page inside the wrapper</h2>
                <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300'>The wrapper owns the outer navigation, main slot, and footer while page content controls its own grid.</p>
              </article>
              <aside className='rounded-lg bg-gray-50 p-5 text-sm dark:bg-gray-900'>Related links and metadata</aside>
            </div>
          </Component>
        </div>
      </ExampleFrame>
    );
  case 'NewsletterForm':
    return (
      <ExampleFrame width='max-w-xl'>
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950'>
          <Component />
        </div>
      </ExampleFrame>
    );
  case 'Search':
    return <SearchExample Component={ Component } />;
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
