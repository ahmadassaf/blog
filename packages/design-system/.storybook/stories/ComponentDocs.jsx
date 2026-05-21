import { Controls, Description, Primary, Subtitle, Title } from '@storybook/addon-docs/blocks';

import { HighlightedCode } from './HighlightedCode';

const groupDocs = {
  'Command': {
    'accessibility': 'Command components are keyboard-first surfaces. Keep focus visible, use Escape to close overlays, and expose readable result labels to assistive technology.',
    'description': 'supports keyboard navigation, search, and grouped command-palette rendering.'
  },
  'Content': {
    'accessibility': 'Content components should preserve semantic structure, readable labels, image alt text, and keyboard access for modals, search, pagination, and dropdown controls.',
    'description': 'supports reusable blog browsing, reading, and supporting page composition.'
  },
  'Forms': {
    'accessibility': 'Form components must connect labels, descriptions, validation states, and submit feedback so keyboard and screen reader users get the same information.',
    'description': 'handles DS-styled form input, submission, and feedback states.'
  },
  'Layout': {
    'accessibility': 'Layout components should preserve document landmarks and reading order. They must not trap focus or create non-semantic wrappers around interactive content.',
    'description': 'provides consistent spacing, width, and section composition.'
  },
  'MDX': {
    'accessibility': 'MDX components must keep article semantics intact: real headings, tables, code blocks, captions, alt text, and keyboard-accessible expandable content.',
    'description': 'renders long-form article content with consistent editorial structure.'
  },
  'Navigation': {
    'accessibility': 'Navigation components must use semantic links, nav landmarks where appropriate, visible focus, readable labels, and Escape behavior for temporary menus.',
    'description': 'supports shared blog navigation, menu composition, and search entry points.'
  },
  'Post': {
    'accessibility': 'Post components must preserve article landmarks, heading hierarchy, readable metadata, and link semantics for breadcrumbs, sharing, series, and table of contents.',
    'description': 'composes article chrome, metadata, navigation, and reading aids.'
  },
  'Primitives': {
    'accessibility': 'Primitive components set the baseline accessibility contract: semantic elements, visible focus, readable contrast, and correct disabled states.',
    'description': 'is a reusable UI primitive exported by the design system package.'
  }
};

const usageExamples = {
  'Command/CmdIcon': "import { CmdIcon } from '@ahmadassaf/design-system';\n\n<CmdIcon name='BookOpenIcon' className='text-blue-600' />",
  'Command/CmdItem': "import { CmdItem } from '@ahmadassaf/design-system';\n\n<CmdItem title='Design systems keep editorial rhythm predictable' category='engineering' type='post' icon='BookOpenIcon' />",
  'Command/CmdLauncher': "import { CmdLauncher } from '@ahmadassaf/design-system';\n\n<CmdLauncher\n  posts={posts}\n  projects={projects}\n  publications={publications}\n  tags={tags}\n  thoughts={thoughts}\n/>",
  'Command/CmdLauncherFooter': "import { CmdLauncherFooter } from '@ahmadassaf/design-system';\n\n<CmdLauncherFooter />",
  'Command/CmdLauncherPosts': "import { CmdLauncherPosts } from '@ahmadassaf/design-system';\n\n<CmdLauncherPosts posts={posts} />",
  'Command/CmdLauncherProjects': "import { CmdLauncherProjects } from '@ahmadassaf/design-system';\n\n<CmdLauncherProjects projects={projects} />",
  'Command/CmdLauncherPublications': "import { CmdLauncherPublications } from '@ahmadassaf/design-system';\n\n<CmdLauncherPublications publications={publications} />",
  'Command/CmdLauncherSearch': "import { CmdLauncherSearch } from '@ahmadassaf/design-system';\n\n<CmdLauncherSearch results={results} query='design systems' />",
  'Command/CmdLauncherShortcut': "import { CmdLauncherShortcut } from '@ahmadassaf/design-system';\n\n<CmdLauncherShortcut />",
  'Command/CmdLauncherSocial': "import { CmdLauncherSocial } from '@ahmadassaf/design-system';\n\n<CmdLauncherSocial siteMetadata={siteMetadata} />",
  'Command/CmdLauncherTags': "import { CmdLauncherTags } from '@ahmadassaf/design-system';\n\n<CmdLauncherTags tags={tags} />",
  'Command/CmdLauncherThoughts': "import { CmdLauncherThoughts } from '@ahmadassaf/design-system';\n\n<CmdLauncherThoughts thoughts={thoughts} />",
  'Command/CmdSearch': "import { CmdSearch } from '@ahmadassaf/design-system';\n\n<CmdSearch posts={posts} projects={projects} publications={publications} tags={tags} />",
  'Command/Hooks/useCmdLauncher': "import { useCmdLauncher } from '@ahmadassaf/design-system';\n\nconst launcher = useCmdLauncher({ posts, projects, publications, tags, thoughts });",
  'Command/Overview': "import { CmdLauncher } from '@ahmadassaf/design-system';\n\n<CmdLauncher posts={posts} projects={projects} tags={tags} />",
  'Command/Types/CmdPost': "import { CmdPost } from '@ahmadassaf/design-system';\n\n<CmdPost title='Design systems keep editorial rhythm predictable' category='engineering' />",
  'Command/Types/CmdProject': "import { CmdProject } from '@ahmadassaf/design-system';\n\n<CmdProject title='Gaudi' subtitle='Developer tooling' showType />",
  'Command/Types/CmdPublication': "import { CmdPublication } from '@ahmadassaf/design-system';\n\n<CmdPublication title='Linked Data Quality' year='2026' />",
  'Command/Types/CmdTag': "import { CmdTag } from '@ahmadassaf/design-system';\n\n<CmdTag title='Design Systems' count={8} />",
  'Content/Aurora': "import { Aurora } from '@ahmadassaf/design-system';\n\n<Aurora className='min-h-[320px]'>\n  <section>Editorial content</section>\n</Aurora>",
  'Content/CodeGroupTabs': "import { CodeGroupTabs } from '@ahmadassaf/design-system';\n\n<CodeGroupTabs />",
  'Content/DropDown': "import { DropDown } from '@ahmadassaf/design-system';\n\n<DropDown name='Content sections' menuDropDownOpen={open} setMenuDropDownOpen={setOpen} />",
  'Content/Footer': "import { Footer } from '@ahmadassaf/design-system';\n\n<Footer />",
  'Content/ImageModal': "import { ImageModal } from '@ahmadassaf/design-system';\n\n<ImageModal\n  isOpen={open}\n  onClose={() => setOpen(false)}\n  src='/static/images/logo.svg'\n  alt='Blog logo'\n/>",
  'Content/Overview': "import { Search, Pagination } from '@ahmadassaf/design-system';\n\n<Search setSearchValue={setSearchValue} />\n<Pagination totalPages={8} currentPage={3} baseURL='blog' paginationURL='blog/page' />",
  'Content/Pagination': "import { Pagination } from '@ahmadassaf/design-system';\n\n<Pagination totalPages={8} currentPage={3} baseURL='blog' paginationURL='blog/page' />",
  'Content/Search': "import { Search } from '@ahmadassaf/design-system';\n\n<Search setSearchValue={setSearchValue} />",
  'Content/ThoughtsSection': "import { ThoughtsSection } from '@ahmadassaf/design-system';\n\n<ThoughtsSection thoughts={thoughts} />",
  'Forms/NewsletterForm': "import { NewsletterForm } from '@ahmadassaf/design-system';\n\n<NewsletterForm />",
  'Layout/LayoutContainer': "import { LayoutContainer } from '@ahmadassaf/design-system';\n\n<LayoutContainer>{children}</LayoutContainer>",
  'Layout/LayoutWrapper': "import { LayoutWrapper } from '@ahmadassaf/design-system';\n\n<LayoutWrapper>\n  <main>{children}</main>\n</LayoutWrapper>",
  'Layout/SectionContainer': "import { SectionContainer } from '@ahmadassaf/design-system';\n\n<SectionContainer>\n  <section>Article section</section>\n</SectionContainer>",
  'MDX/Aside': "import { Aside } from '@ahmadassaf/design-system/mdx';\n\n<Aside>Additional context for the article.</Aside>",
  'MDX/Callout': "import { Callout } from '@ahmadassaf/design-system/mdx';\n\n<Callout type='info'>Useful article context.</Callout>",
  'MDX/CitationPopover': "import { CitationPopover } from '@ahmadassaf/design-system/mdx';\n\n<CitationPopover />",
  'MDX/CitationTracker': "import { CitationTracker } from '@ahmadassaf/design-system/mdx';\n\n<CitationTracker />",
  'MDX/Details': "import { Details } from '@ahmadassaf/design-system/mdx';\n\n<Details title='Implementation detail'>Expanded article content.</Details>",
  'MDX/Faq': "import { Faq } from '@ahmadassaf/design-system/mdx';\n\n<Faq questions={[{ question: 'Why use FAQ blocks?', answer: 'They structure repeated article answers.' }]} />",
  'MDX/FileTree': "import { FileTree } from '@ahmadassaf/design-system/mdx';\n\n<FileTree data={files} />",
  'MDX/FootnotePopover': "import { FootnotePopover } from '@ahmadassaf/design-system/mdx';\n\n<FootnotePopover />",
  'MDX/Highlight': "import { Highlight } from '@ahmadassaf/design-system/mdx';\n\n<p>Use <Highlight>inline emphasis</Highlight> inside prose.</p>",
  'MDX/Image': "import { Image } from '@ahmadassaf/design-system/mdx';\n\n<Image src='/static/images/logo.svg' alt='Blog logo' width={160} height={160} />",
  'MDX/InternalPreview': "import { InternalPreview } from '@ahmadassaf/design-system/mdx';\n\n<InternalPreview href='/blog/design-systems' title='Design systems keep editorial rhythm predictable'>Internal post preview</InternalPreview>",
  'MDX/LatexText': "import { LatexText } from '@ahmadassaf/design-system/mdx';\n\n<LatexText>11$^{th}$ International Conference</LatexText>",
  'MDX/Mermaid': "import { Mermaid } from '@ahmadassaf/design-system/mdx';\n\n<Mermaid id='architecture-flow' chart='graph TD; A[Draft] --> B[Review];' />",
  'MDX/Overview': "import { Callout, Table, Quote } from '@ahmadassaf/design-system/mdx';\n\n<Callout type='info'>Article context.</Callout>",
  'MDX/PostImage': "import { PostImage } from '@ahmadassaf/design-system/mdx';\n\n<PostImage title='gaudi' caption='Project architecture diagram.' width={420} height={260} />",
  'MDX/Pre': "import { Pre } from '@ahmadassaf/design-system/mdx';\n\n<Pre><code>{`const token = colors.blue[500];`}</code></Pre>",
  'MDX/Preview': "import { Preview } from '@ahmadassaf/design-system/mdx';\n\n<Preview url='https://ahmadassaf.com' title='Ahmad Assaf' showImage={false} />",
  'MDX/Quote': "import { Quote } from '@ahmadassaf/design-system/mdx';\n\n<Quote text='Good component systems make product code calmer.' author='Design System' />",
  'MDX/ReferencePopover': "import { ReferencePopover } from '@ahmadassaf/design-system/mdx';\n\n<ReferencePopover />",
  'MDX/Stats': "import { Stats } from '@ahmadassaf/design-system/mdx';\n\n<Stats text='Design system coverage' stats={stats} />",
  'MDX/Table': "import { Table } from '@ahmadassaf/design-system/mdx';\n\n<Table>\n  <thead><tr><th>Component</th><th>Status</th></tr></thead>\n  <tbody><tr><td>Callout</td><td>Documented</td></tr></tbody>\n</Table>",
  'MDX/Tooltip': "import { Tooltip } from '@ahmadassaf/design-system/mdx';\n\n<Tooltip message='Compact supporting context.'>Hover this term</Tooltip>",
  'Navigation/FloatingMenu': "import { FloatingMenu } from '@ahmadassaf/design-system';\n\n<FloatingMenu />",
  'Navigation/Menu': "import { Menu } from '@ahmadassaf/design-system';\n\n<Menu categories={categories} posts={posts} />",
  'Navigation/MenuBlog': "import { MenuBlog } from '@ahmadassaf/design-system';\n\n<MenuBlog categories={categories} />",
  'Navigation/MenuLogo': "import { MenuLogo } from '@ahmadassaf/design-system';\n\n<MenuLogo />",
  'Navigation/MenuMain': "import { MenuMain } from '@ahmadassaf/design-system';\n\n<MenuMain categories={categories} allPosts={posts} />",
  'Navigation/MenuMobile': "import { MenuMobile } from '@ahmadassaf/design-system';\n\n<MenuMobile\n  categories={categories}\n  links={links}\n  setMobileMenuOpen={setOpen}\n  setLauncherOpen={setLauncherOpen}\n/>",
  'Navigation/MenuSearch': "import { MenuSearch } from '@ahmadassaf/design-system';\n\n<MenuSearch setOpen={setLauncherOpen} />",
  'Post/Breadcrumbs': "import { Breadcrumbs } from '@ahmadassaf/design-system';\n\n<Breadcrumbs\n  pages={[\n    { name: 'Blog', href: '/blog' },\n    { name: 'Design Systems', href: '/blog/design-systems', current: true },\n  ]}\n/>",
  'Post/Disclaimer': "import { Disclaimer } from '@ahmadassaf/design-system';\n\n<Disclaimer />",
  'Post/Overview': "import { PostHeader, TableOfContents } from '@ahmadassaf/design-system';\n\n<PostHeader frontMatter={frontMatter} siteMetadata={siteMetadata} toc={toc} />",
  'Post/Post': "import { Post } from '@ahmadassaf/design-system';\n\n<Post frontMatter={frontMatter} />",
  'Post/PostComments': "import { PostComments } from '@ahmadassaf/design-system';\n\n<PostComments />",
  'Post/PostHeader': "import { PostHeader } from '@ahmadassaf/design-system';\n\n<PostHeader frontMatter={frontMatter} siteMetadata={siteMetadata} toc={toc} />",
  'Post/PostNavigation': "import { PostNavigation } from '@ahmadassaf/design-system';\n\n<PostNavigation prev={previousPost} next={nextPost} />",
  'Post/PostSeriesBox': "import { PostSeriesBox } from '@ahmadassaf/design-system';\n\n<PostSeriesBox series={seriesPosts} slug='components' />",
  'Post/PostSharing': "import { PostSharing } from '@ahmadassaf/design-system';\n\n<PostSharing\n  siteMetadata={siteMetadata}\n  slug='design-systems'\n  title={frontMatter.title}\n  tags={frontMatter.tags}\n/>",
  'Post/TableOfContents': "import { TableOfContents } from '@ahmadassaf/design-system';\n\n<TableOfContents toc={toc} />",
  'Primitives/Avatar': "import { Avatar } from '@ahmadassaf/design-system';\n\n<Avatar label='AA' tone='blue' shape='circle' size='lg' />",
  'Primitives/Banner': "import { Banner } from '@ahmadassaf/design-system';\n\n<Banner title='Now published' href='/blog'>\n  New essays and project notes are available.\n</Banner>",
  'Primitives/Button': "import { Button } from '@ahmadassaf/design-system';\n\n<Button variant='solid' tone='blue' size='md'>Read article</Button>",
  'Primitives/Card': "import { Card } from '@ahmadassaf/design-system';\n\n<Card title='Building with tokens' subtitle='Cards frame reusable content.' />",
  'Primitives/Carousel': "import { Carousel } from '@ahmadassaf/design-system';\n\n<Carousel\n  ariaLabel='Featured articles'\n  items={[\n    { title: 'Design systems keep editorial rhythm predictable', eyebrow: 'Design Systems', description: 'A focused carousel item.', href: '/blog' },\n  ]}\n/>",
  'Primitives/Grid': "import { Grid, GridItem } from '@ahmadassaf/design-system';\n\n<Grid columns='3' gap='md'>\n  <GridItem title='Tokens' description='Color, type, spacing, and shape definitions.' />\n</Grid>",
  'Primitives/Icon': "import { Icon } from '@ahmadassaf/design-system';\n\n<Icon name='Info' label='More information' color='primary' size='lg' />",
  'Primitives/ImageFallback': "import { ImageFallback } from '@ahmadassaf/design-system';\n\n<ImageFallback src='/static/images/logo.svg' fallback='/static/images/logo.svg' alt='Blog logo' width={96} height={96} />",
  'Primitives/Kbd': "import { Kbd } from '@ahmadassaf/design-system';\n\n<Kbd keys='command,shift,k' size='sm' variant='raised' />",
  'Primitives/Link': "import { Link } from '@ahmadassaf/design-system';\n\n<Link href='/blog' variant='inline' tone='blue'>Read the blog</Link>",
  'Primitives/Pill': "import { Pill } from '@ahmadassaf/design-system';\n\n<Pill tone='blue' variant='solid' size='sm'>Engineering</Pill>",
  'Primitives/Terminal': "import { Terminal } from '@ahmadassaf/design-system';\n\n<Terminal\n  title='blog — zsh'\n  username='ahmad'\n  commands={[\n    { command: 'pnpm test:ds-contracts', output: [{ text: '85 component contracts passed.', tone: 'success' }] },\n  ]}\n/>",
  'Primitives/TextHighlight': "import { TextHighlight } from '@ahmadassaf/design-system';\n\n<p>Design systems make <TextHighlight>consistency visible</TextHighlight>.</p>"
};

const componentDocs = {
  'Primitives/Avatar': {
    'accessibility': 'Avatar uses alt text for images and role img with a label for initials/fallback avatars.',
    'description': 'Avatar renders profile images, initials, or fallback silhouettes.',
    'props': [
      [ 'size', 'xs | sm | md | lg', 'md' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'gray' ],
      [ 'shape', 'square | circle', 'square' ],
      [ 'src / alt / fallback / label', 'image and accessible fallback inputs', '-' ]
    ]
  },
  'Primitives/Banner': {
    'accessibility': 'Static banners use status semantics. Linked banners expose a combined accessible label.',
    'description': 'Banner renders a compact announcement strip.',
    'props': [
      [ 'children', 'ReactNode', '-' ],
      [ 'size', 'xs | sm | md | lg', 'md' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'gray' ],
      [ 'variant', 'solid | soft | outline', 'soft' ],
      [ 'classNames', 'root | body | action', '-' ]
    ]
  },
  'Primitives/Button': {
    'accessibility': 'Button renders native buttons for actions and links for navigation. Disabled link variants are removed from tab order.',
    'description': 'Button renders the DS action and link-button variants.',
    'props': [
      [ 'variant', 'solid | soft | outline | ghost | subtle', 'solid' ],
      [ 'size', 'xs | sm | md | lg', 'md' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue' ],
      [ 'href', 'string', '-' ],
      [ 'disabled', 'boolean', 'false' ]
    ]
  },
  'Primitives/Card': {
    'accessibility': 'Card is a structural container. Put links or buttons inside it rather than making the whole card a fake control.',
    'description': 'Card frames reusable content with title, subtitle, and optional children.',
    'props': [
      [ 'variant', 'elevated | outline | soft | flat', 'elevated' ],
      [ 'padding', 'none | sm | md | lg', 'md' ],
      [ 'radius', 'none | sm | md | lg', 'md' ],
      [ 'interactive', 'boolean', 'false' ],
      [ 'classNames', 'root | body | title | subtitle', '-' ]
    ]
  },
  'Primitives/Carousel': {
    'accessibility': 'Carousel exposes a labelled carousel region, native previous/next buttons, aria-live status updates, keyboard arrow support, and named indicators.',
    'description': 'Carousel renders standard feature slides and Apple-style editorial card rails.',
    'props': [
      [ 'items', 'Array<{ title, description, eyebrow, image, alt, href, content }>', '-' ],
      [ 'variant', 'standard | apple', 'standard' ],
      [ 'size', 'sm | md | lg', 'md' ],
      [ 'radius', 'none | sm | md | lg', 'lg' ],
      [ 'controls / loop', 'boolean', 'true / false' ],
      [ 'classNames', 'root | header | viewport | track | slide | card | image | content | controls | indicators | dialog', '-' ]
    ]
  },
  'Primitives/Grid': {
    'accessibility': 'Grid provides layout only. Its children keep their own headings, links, and controls.',
    'description': 'Grid and GridItem render responsive feature grids.',
    'props': [
      [ 'columns', '2 | 3 | 4', '3' ],
      [ 'gap', 'sm | md | lg', 'md' ],
      [ 'GridItem variant', 'elevated | outline | soft', 'elevated' ],
      [ 'classNames', 'root | body | title | description', '-' ]
    ]
  },
  'Primitives/Icon': {
    'accessibility': 'Decorative icons are hidden from assistive technology. Informative or icon-only links need a readable label.',
    'description': 'Icon renders entries from the centralized icon registry.'
  },
  'Primitives/ImageFallback': {
    'accessibility': 'ImageFallback requires meaningful alt text for informative images and empty alt text for decorative images.',
    'description': 'ImageFallback swaps to a fallback source when the primary image fails.',
    'props': [
      [ 'src / fallback / alt', 'image source contract', '-' ],
      [ 'radius', 'none | sm | md | lg', 'none' ],
      [ 'sizes', 'string', 'responsive default' ],
      [ 'className', 'string', '-' ]
    ]
  },
  'Primitives/Kbd': {
    'accessibility': 'Keyboard shortcuts expose readable aria-label text such as Command plus K while keeping visual symbols compact.',
    'description': 'Kbd renders keyboard keys and multi-key shortcuts.',
    'props': [
      [ 'keys', 'comma-separated shortcut', '-' ],
      [ 'size', 'xs | sm | md | lg', 'md' ],
      [ 'variant', 'raised | outline | flat', 'raised' ],
      [ 'className', 'string', '-' ]
    ]
  },
  'Primitives/Link': {
    'accessibility': 'Link renders Next links for internal URLs, anchors for fragments, and safe external anchors with noopener noreferrer.',
    'description': 'Link centralizes navigation semantics for internal, anchor, and external links.',
    'props': [
      [ 'href', 'internal | anchor | external URL', '-' ],
      [ 'variant', 'inline | muted | nav | bare', 'inline' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue' ],
      [ 'className', 'string', '-' ]
    ]
  },
  'Primitives/Pill': {
    'accessibility': 'Pill includes visible text so status or category meaning is not color-only.',
    'description': 'Pill renders compact category and status labels.',
    'props': [
      [ 'children', 'ReactNode', '-' ],
      [ 'size', 'xs | sm | md | lg', 'sm' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue' ],
      [ 'variant', 'solid | soft | outline | ghost | subtle', 'solid' ],
      [ 'href / icon / pulse', 'optional link, icon, or live-state dot', '-' ]
    ]
  },
  'Primitives/Terminal': {
    'accessibility': 'Terminal renders readable command history inside a labelled region. Motion is disabled when users prefer reduced motion.',
    'description': 'Terminal renders mac-style shell examples with typed commands and structured output lines.',
    'props': [
      [ 'commands', 'Array<string | { command, output, tone }>', 'example commands' ],
      [ 'variant', 'dark | light | translucent', 'dark' ],
      [ 'size', 'sm | md | lg', 'md' ],
      [ 'radius', 'none | sm | md | lg', 'lg' ],
      [ 'typingSpeed / initialDelay / delayBetweenCommands', 'number', '35 / 400 / 700' ],
      [ 'classNames', 'root | header | controls | title | body | line | prompt | command | output', '-' ]
    ]
  },
  'Primitives/TextHighlight': {
    'accessibility': 'TextHighlight is inline text emphasis. It must keep the original text readable and must not be the only way meaning is conveyed.',
    'description': 'TextHighlight emphasizes short inline phrases inside prose.',
    'overview': 'Use TextHighlight sparingly inside article copy or compact editorial headings when a phrase needs emphasis without becoming a link, button, or badge.',
    'props': [
      [ 'variant', 'marker | soft | underline', 'marker' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue' ],
      [ 'radius', 'none | sm | md', 'sm' ],
      [ 'animate', 'boolean', 'true' ]
    ]
  }
};

const defaultUsage = (title, component) => {
  const name = title.split('/').at(-1) || component.replaceAll(' ', '');

  if (name.startsWith('use')) return `import { ${name} } from '@ahmadassaf/design-system';\n\nconst result = ${name}();`;

  return `import { ${name} } from '@ahmadassaf/design-system';\n\n<${name} />`;
};

export const getComponentDocs = (title) => {
  const [ group, ...rest ] = title.split('/');
  const component = rest.join(' / ') || group;
  const docs = groupDocs[group] || groupDocs.Primitives;
  const overrides = componentDocs[title] || {};
  const usage = overrides.usage || usageExamples[title] || defaultUsage(title, component);

  return {
    ...docs,
    ...overrides,
    'component': component,
    'description': overrides.description || `${component} ${docs.description}`,
    'donts': overrides.donts || [],
    'dos': overrides.dos || [],
    'group': group,
    'title': title,
    'usage': usage
  };
};

const Section = ({ children, title }) => (
  <section className='sb-unstyled ds-docs-section'>
    <h2>{title}</h2>
    {children}
  </section>
);

const List = ({ items }) => (
  <ul>
    {items.map((item) => <li key={ item }>{item}</li>)}
  </ul>
);

const AccessibilityTable = ({ docs }) => (
  <p>{docs.accessibility}</p>
);

const PropsTable = ({ rows }) => (
  <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800'>
    <table>
      <thead>
        <tr>
          <th scope='col'>Prop</th>
          <th scope='col'>Values</th>
          <th scope='col'>Default</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([ name, values, defaultValue ]) => (
          <tr key={ name }>
            <td>{name}</td>
            <td>{values}</td>
            <td>{defaultValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Related = ({ docs }) => {
  const related = [ docs.group, 'Foundations/Accessibility', 'Foundations/Typography', 'Foundations/Colors & Tokens' ];

  return (
    <div className='ds-docs-related'>
      {related.map((item) => <span key={ item }>{item}</span>)}
    </div>
  );
};

export const ComponentDocumentation = ({ docs }) => (
  <div className='sb-unstyled ds-docs-page'>
    <div className='ds-docs-title'>
      <h1>{docs.component}</h1>
    </div>
    <p>{docs.description}</p>

    <Section title='Overview'>
      <p>{docs.overview || docs.description}</p>
    </Section>

    {docs.dos.length ? <Section title='When To Use'>
      <List items={ docs.dos } />
    </Section> : null}

    {docs.donts.length ? <Section title='When Not To Use'>
      <List items={ docs.donts } />
    </Section> : null}

    <Section title='Accessibility'>
      <AccessibilityTable docs={ docs } />
    </Section>

    {docs.notes?.length ? (
      <Section title='API Notes'>
        <List items={ docs.notes } />
      </Section>
    ) : null}

    {docs.consumerResponsibilities?.length ? (
      <Section title='Consumer Responsibilities'>
        <List items={ docs.consumerResponsibilities } />
      </Section>
    ) : null}

    {docs.props?.length ? (
      <Section title='Customisation'>
        <PropsTable rows={ docs.props } />
      </Section>
    ) : null}

    <Section title='Usage'>
      <HighlightedCode code={ docs.usage } language='jsx' />
    </Section>

    {docs.related ? <Section title='Related'><Related docs={ docs } /></Section> : null}
  </div>
);

export const createComponentDocsPage = (docs, options = {}) => {
  const { stories = true } = options;
  const ComponentDocsPage = () => (
    <>
      <div className='sb-unstyled ds-docs-page'>
        <div className='ds-docs-title'>
          <Title />
        </div>
        <Subtitle />
        <Description />

        <Section title='Overview'>
          <p>{docs.overview || docs.description}</p>
        </Section>

        {docs.dos.length ? <Section title='When To Use'>
          <List items={ docs.dos } />
        </Section> : null}

        {docs.donts.length ? <Section title='When Not To Use'>
          <List items={ docs.donts } />
        </Section> : null}

        <Section title='Accessibility'>
          <AccessibilityTable docs={ docs } />
        </Section>

        {docs.notes?.length ? (
          <Section title='API Notes'>
            <List items={ docs.notes } />
          </Section>
        ) : null}

        {docs.consumerResponsibilities?.length ? (
          <Section title='Consumer Responsibilities'>
            <List items={ docs.consumerResponsibilities } />
          </Section>
        ) : null}

        {docs.props?.length ? (
          <Section title='Customisation'>
            <PropsTable rows={ docs.props } />
          </Section>
        ) : null}

        <Section title='Usage'>
          <HighlightedCode code={ docs.usage } language='jsx' />
        </Section>

        {docs.related ? <Section title='Related'><Related docs={ docs } /></Section> : null}
      </div>

      {stories ? (
        <div className='sb-unstyled ds-docs-blocks'>
          <Section title='Examples'>
            <Primary />
          </Section>
          <Controls />
        </div>
      ) : null}
    </>
  );

  ComponentDocsPage.displayName = 'ComponentDocsPage';

  return ComponentDocsPage;
};
