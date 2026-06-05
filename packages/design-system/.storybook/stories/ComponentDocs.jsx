/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
import { Description, Primary, Stories, Subtitle, Title } from '@storybook/addon-docs/blocks';

import { HighlightedCode } from './HighlightedCode';

const groupDocs = {
  'Blocks': {
    'accessibility': 'Blocks compose exported Gaudi components into full page sections. They must preserve semantic headings, readable focus order, and links/buttons with accessible names.',
    'description': 'documents full-section page compositions built from Gaudi primitives and domain components.'
  },
  'Content': {
    'accessibility': 'Content components should preserve semantic structure, readable labels, image alt text, and keyboard access for modals, search, pagination, and dropdown controls.',
    'description': 'supports reusable blog browsing, reading, and supporting page composition.'
  },
  'Core': {
    'accessibility': 'Core components set the baseline accessibility contract: semantic elements, visible focus, readable contrast, keyboard support, and correct disabled states.',
    'description': 'is a reusable UI component exported by the design system package and the canonical core subpath.'
  },
  'Layout': {
    'accessibility': 'Layout components should preserve document landmarks, reading order, and form semantics. They must not trap focus or create non-semantic wrappers around interactive content.',
    'description': 'provides consistent spacing, width, section composition, and layout-owned surfaces such as newsletter signup.'
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
  }
};

const usageExamples = {
  'Core/CmdLauncher': "import { CmdLauncher } from '@gaudi/design-system';\n\n<MenuSearch setOpen={setOpen} />\n<CmdLauncher\n  open={open}\n  setOpen={setOpen}\n  posts={posts}\n  projects={projects}\n  publications={publications}\n  tags={tags}\n  thoughts={thoughts}\n/>",
  'Blocks/Thoughts': "import { ThoughtsSection } from '@gaudi/design-system';\n\n<ThoughtsSection thoughts={thoughts} />",
  'Layout/Aurora': "import { Aurora } from '@gaudi/design-system';\n\n<Aurora className='min-h-[320px]'>\n  <section>Editorial content</section>\n</Aurora>",
  'Layout/Footer': "import { Footer } from '@gaudi/design-system';\n\n<Footer />",
  'Layout/LayoutContainer': "import { LayoutContainer } from '@gaudi/design-system';\n\n<LayoutContainer>{children}</LayoutContainer>",
  'Layout/LayoutWrapper': "import { LayoutWrapper } from '@gaudi/design-system';\n\n<LayoutWrapper>\n  <main>{children}</main>\n</LayoutWrapper>",
  'Layout/NewsletterForm': "import { NewsletterForm } from '@gaudi/design-system';\n\n<NewsletterForm />",
  'Layout/Search': "import { Search } from '@gaudi/design-system';\n\n<Search setSearchValue={setSearchValue} />",
  'MDX/Aside': '<Aside>\n  Additional context for the article that should sit outside the main argument.\n</Aside>',
  'MDX/Callout': "<Callout type='info'>\n  Useful article context that readers should notice before continuing.\n</Callout>",
  'MDX/Chart': "<BarChart\n  title='Article views'\n  ariaLabel='Article views by day'\n  data={[\n    { label: 'Mon', views: 124 },\n    { label: 'Tue', views: 168 },\n  ]}\n  yKey='views'\n/>\n\n<LineChart\n  title='Subscriber trend'\n  ariaLabel='Subscribers by day'\n  data={[\n    { label: 'Mon', subscribers: 8 },\n    { label: 'Tue', subscribers: 12 },\n  ]}\n  yKey='subscribers'\n/>",
  'MDX/CitationPopover': "import { CitationPopover, CitationTracker } from '@gaudi/design-system/mdx';\n\n<article>\n  <p>\n    Knowledge graphs need durable identifiers\n    <sup>\n      <a\n        id='cite-ref-1'\n        className='citation-link'\n        href='#citation-source-1'\n        data-citation-popover='true'\n        data-citation-keys='[\"source-1\"]'\n        data-citation-numbers='[1]'\n        data-citation-texts='[\"Source metadata rendered in the popover.\"]'\n      >1</a>\n    </sup>.\n  </p>\n  <CitationTracker />\n  <CitationPopover />\n</article>",
  'MDX/CitationTracker': "import { CitationPopover, CitationTracker } from '@gaudi/design-system/mdx';\n\n<article>\n  <p>\n    Repeat citations can update bibliography back-links\n    <sup>\n      <a\n        id='cite-ref-1'\n        className='citation-link'\n        href='#citation-source-1'\n        data-citation-popover='true'\n        data-citation-keys='[\"source-1\"]'\n        data-citation-numbers='[1]'\n        data-citation-texts='[\"Tracked source metadata.\"]'\n      >1</a>\n    </sup>.\n  </p>\n  <CitationTracker />\n  <CitationPopover />\n</article>",
  'MDX/Details': "<Details title='Implementation detail'>\n  Expanded article content that is useful but not required for the main reading path.\n</Details>",
  'MDX/Faq': "<Faq questions={[\n  {\n    question: 'Why use FAQ blocks?',\n    answer: 'They structure repeated article answers.'\n  }\n]} />",
  'MDX/FileTree': "<FileTree data={[\n  { name: 'content', isFolder: true, childrenProp: [{ name: 'post.mdx' }] },\n  { name: 'package.json' }\n]} />",
  'MDX/FootnotePopover': "A compact aside can live in a footnote <FootnotePopover id='note-1'>More context.</FootnotePopover>.",
  'MDX/Video': "<Video\n  animationStyle='from-center'\n  videoSrc='https://www.youtube.com/embed/qh3NGpYRG3I'\n  thumbnailSrc='/static/images/og-card.jpg'\n  thumbnailAlt='Knowledge graph article video preview'\n  title='Knowledge graph walkthrough'\n/>",
  'MDX/Highlight': 'Use <Highlight>inline emphasis</Highlight> inside normal article prose.',
  'MDX/Image': "<Image\n  src='/static/images/posts/gaudi.svg'\n  darkSrc='/static/images/posts/gaudi-dark.svg'\n  alt='Gaudi diagram'\n  caption='Project architecture diagram.'\n  width={420}\n  height={260}\n/>",
  'MDX/ImageModal': "<ImageModal src='/static/images/diagram.png' alt='Architecture diagram' />",
  'MDX/LatexText': '<LatexText>11$^{th}$ International Conference</LatexText>',
  'MDX/Mermaid': "<Mermaid\n  id='architecture-flow'\n  chart={`graph TD; A[Draft] --> B[Review];`}\n/>",
  'MDX/Overview': "# Article title\n\nIntroductory prose can use normal markdown.\n\n<Callout type='info'>Article context.</Callout>\n\n<Quote text='Readable examples matter.' author='Gaudi' />",
  'MDX/Pre': '```js\nconst token = colors.blue[500];\n```',
  'MDX/Preview': "<Preview url='https://assaf.website' title='assaf.website' />\n<Preview url='https://this-link-will-not-work.invalid' title='Unavailable link' showImage={false} />\n<Preview internal url='/blog' title='Internal blog link' />",
  'MDX/Quote': "<Quote text='Good component systems make product code calmer.' author='Design System' />",
  'MDX/Table': '| Component | Status |\n| --- | --- |\n| Callout | Documented |\n| Chart | Ready for article embeds |',
  'MDX/Tooltip': "A <Tooltip message='Compact supporting context.'>technical term</Tooltip> can carry a short explanation.",
  'Navigation/FloatingMenu': "import { FloatingMenu } from '@gaudi/design-system';\n\n<FloatingMenu />",
  'Navigation/DropDown': "import { DropDown } from '@gaudi/design-system';\n\n<DropDown name='Content sections' menuDropDownOpen={open} setMenuDropDownOpen={setOpen} />",
  'Navigation/Menu': "import { Menu } from '@gaudi/design-system';\n\n<Menu categories={categories} posts={posts} />",
  'Navigation/MenuBlog': "import { MenuBlog } from '@gaudi/design-system';\n\n<MenuBlog categories={categories} />",
  'Navigation/MenuLogo': "import { MenuLogo } from '@gaudi/design-system';\n\n<MenuLogo />",
  'Navigation/MenuMain': "import { MenuMain } from '@gaudi/design-system';\n\n<MenuMain categories={categories} allPosts={posts} />",
  'Navigation/MenuMobile': "import { MenuMobile } from '@gaudi/design-system';\n\n<MenuMobile\n  categories={categories}\n  links={links}\n  setMobileMenuOpen={setOpen}\n  setLauncherOpen={setLauncherOpen}\n/>",
  'Navigation/MenuSearch': "import { MenuSearch } from '@gaudi/design-system';\n\n<MenuSearch setOpen={setLauncherOpen} />",
  'Core/Accordion': "import { AccordionGroup } from '@gaudi/design-system';\n\n<AccordionGroup\n  items={[\n    { value: 'usage', title: 'When should I use it?', content: 'Use accordions for compact progressive disclosure.' },\n  ]}\n/>",
  'Post/Breadcrumbs': "import { Breadcrumbs } from '@gaudi/design-system';\n\n<Breadcrumbs\n  pages={[\n    { name: 'Blog', href: '/blog' },\n    { name: 'Design Systems', href: '/blog/design-systems', current: true },\n  ]}\n/>",
  'Core/Avatar': "import { Avatar } from '@gaudi/design-system';\n\n<Avatar label='AA' tone='blue' shape='circle' size='lg' />",
  'Post/Disclaimer': "import { Disclaimer } from '@gaudi/design-system';\n\n<Disclaimer />",
  'Post/Overview': "import { PostHeader, TableOfContents } from '@gaudi/design-system';\n\n<PostHeader frontMatter={frontMatter} siteMetadata={siteMetadata} toc={toc} />",
  'Core/Banner': "import { Banner } from '@gaudi/design-system';\n\n<Banner title='Now published' href='/blog'>\n  New essays and project notes are available.\n</Banner>",
  'Post/Post': "import { Post } from '@gaudi/design-system';\n\n<Post frontMatter={frontMatter} />",
  'Core/Breadcrumb': "import { BreadcrumbTrail } from '@gaudi/design-system';\n\n<BreadcrumbTrail\n  items={[\n    { href: '/', label: 'Home' },\n    { href: '/blog', label: 'Blog' },\n    { current: true, label: 'Design Systems' },\n  ]}\n/>",
  'Core/Button': "import { Button } from '@gaudi/design-system';\n\n<Button variant='solid' tone='blue' size='md'>Read article</Button>",
  'Post/PostHeader': "import { PostHeader } from '@gaudi/design-system';\n\n<PostHeader frontMatter={frontMatter} siteMetadata={siteMetadata} toc={toc} />",
  'Core/Card': "import { Card } from '@gaudi/design-system';\n\n<Card title='Building with tokens' subtitle='Cards frame reusable content.' />",
  'Post/PostNavigation': "import { PostNavigation } from '@gaudi/design-system';\n\n<PostNavigation prev={previousPost} next={nextPost} />",
  'Core/Carousel': "import { Carousel } from '@gaudi/design-system';\n\n<Carousel\n  ariaLabel='Featured articles'\n  items={[\n    { title: 'Design systems keep editorial rhythm predictable', eyebrow: 'Design Systems', description: 'A focused carousel item.', href: '/blog' },\n  ]}\n/>",
  'Post/PostSeriesBox': "import { PostSeriesBox } from '@gaudi/design-system';\n\n<PostSeriesBox series={seriesPosts} slug='components' />",
  'Core/Checkbox': "import { Checkbox } from '@gaudi/design-system';\n\n<Checkbox label='Include drafts' defaultChecked />",
  'Post/PostSharing': "import { PostSharing } from '@gaudi/design-system';\n\n<PostSharing\n  siteMetadata={siteMetadata}\n  slug='design-systems'\n  title={frontMatter.title}\n  tags={frontMatter.tags}\n/>",
  'Post/TableOfContents': "import { TableOfContents } from '@gaudi/design-system';\n\n<TableOfContents toc={toc} />",
  'Core/DataTable': "import { DataTable } from '@gaudi/design-system';\n\n<DataTable\n  columns={[{ key: 'component', header: 'Component' }]}\n  rows={[{ component: 'Button' }]}\n/>",
  'Core/Field': "import { Field, FieldDescription, FieldInput, FieldLabel } from '@gaudi/design-system';\n\n<Field>\n  <FieldLabel htmlFor='email'>Email</FieldLabel>\n  <FieldInput id='email' type='email' />\n  <FieldDescription>Used for article updates only.</FieldDescription>\n</Field>",
  'Core/Grid': "import { Grid, GridItem } from '@gaudi/design-system';\n\n<Grid columns='3' gap='md'>\n  <GridItem title='Tokens' description='Color, type, spacing, and shape definitions.' />\n</Grid>",
  'Core/HoverCard': "import { Button, HoverCard } from '@gaudi/design-system';\n\n<HoverCard trigger={<Button variant='soft' tone='gray'>Knowledge graphs</Button>}>\n  Graph-shaped context for concepts and sources.\n</HoverCard>",
  'Core/Icon': "import { Icon } from '@gaudi/design-system';\n\n<Icon name='Info' label='More information' color='primary' size='lg' />",
  'Core/ImageFallback': "import { ImageFallback } from '@gaudi/design-system';\n\n<ImageFallback src='/static/images/logo.svg' fallback='/static/images/logo.svg' alt='Blog logo' width={96} height={96} />",
  'Core/Kbd': "import { Kbd } from '@gaudi/design-system';\n\n<Kbd keys='command,shift,k' size='sm' variant='raised' />",
  'Core/Link': "import { Link } from '@gaudi/design-system';\n\n<Link href='/blog' variant='inline' tone='blue'>Read the blog</Link>",
  'Core/NavigationMenu': "import { NavigationMenu, NavigationMenuDropdown, NavigationMenuLink, NavigationMenuList, NavigationMenuPanel } from '@gaudi/design-system';\n\n<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuLink href='' active>Blog</NavigationMenuLink>\n    <NavigationMenuDropdown label='Categories' width='xl'>\n      <NavigationMenuPanel columns={2}>\n        <NavigationMenuLink href='' variant='panel' description='Knowledge graphs, semantic web, and linked data.'>\n          Data\n        </NavigationMenuLink>\n        <NavigationMenuLink href='' variant='panel' description='Implementation notes and developer tooling.'>\n          Engineering\n        </NavigationMenuLink>\n      </NavigationMenuPanel>\n    </NavigationMenuDropdown>\n  </NavigationMenuList>\n</NavigationMenu>",
  'Core/Pagination': "import { PaginationBar } from '@gaudi/design-system';\n\n<PaginationBar currentPage={1} totalPages={4} getHref={() => ''} />",
  'Core/Pill': "import { Pill } from '@gaudi/design-system';\n\n<Pill tone='blue' variant='solid' size='sm'>Engineering</Pill>",
  'Core/Popover': "import { Popover } from '@gaudi/design-system';\n\n<Popover trigger='Open popover'>Compact supporting content.</Popover>",
  'Core/Select': "import { Select } from '@gaudi/design-system';\n\n<Select\n  searchable\n  multiple\n  placeholder='Choose topics'\n  options={[\n    { label: 'Design systems', value: 'design-systems' },\n    { label: 'Knowledge graphs', value: 'knowledge-graphs' },\n  ]}\n/>",
  'Core/Skeleton': "import { Skeleton } from '@gaudi/design-system';\n\n<Skeleton className='h-4 w-40' />",
  'Core/Spinner': "import { Spinner } from '@gaudi/design-system';\n\n<Spinner label='Loading articles' size='md' />",
  'Core/Switch': "import { Switch } from '@gaudi/design-system';\n\n<Switch label='Email notifications' defaultChecked />",
  'Core/Terminal': "import { Terminal } from '@gaudi/design-system';\n\n<Terminal\n  title='blog — zsh'\n  username='ahmad'\n  commands={[\n    { command: 'pnpm test:ds-contracts', output: [{ text: '85 component contracts passed.', tone: 'success' }] },\n  ]}\n/>",
  'Core/TextHighlight': "import { TextHighlight } from '@gaudi/design-system';\n\n<p>Design systems make <TextHighlight>consistency visible</TextHighlight>.</p>"
};

const componentDocs = {
  'Core/CmdLauncher': {
    'accessibility': 'CmdLauncher is a keyboard-first overlay. Keep focus visible, support Escape close/back behavior, expose readable result labels, and make Cmd/Ctrl + K available without hiding the visible trigger.',
    'description': 'CmdLauncher provides the blog-wide command palette for navigation, content search, and theme actions.',
    'overview': 'Use CmdLauncher with a visible trigger such as MenuSearch. MenuSearch already includes the keyboard hint, so do not render CmdLauncherShortcut beside it in the header example.',
    'props': [
      [ 'open', 'boolean', '-', 'Controlled palette state.' ],
      [ 'setOpen', '(open: boolean) => void', '-', 'State setter used by the trigger, shortcut, keyboard handler, and close behavior.' ],
      [ 'posts', 'Array', '[]', 'Searchable post records.' ],
      [ 'projects', 'Array', '[]', 'Searchable project records.' ],
      [ 'publications', 'Array', '[]', 'Searchable publication records.' ],
      [ 'tags', 'Array', '[]', 'Searchable tag records.' ],
      [ 'thoughts', 'Array', '[]', 'Searchable thought records.' ]
    ]
  },
  'Core/Accordion': {
    'accessibility': 'Accordion triggers are native buttons with aria-expanded. Content is only rendered when open so the tab order stays predictable.',
    'description': 'Accordion groups expandable sections for FAQs, settings, and compact supporting content.',
    'props': [
      [ 'items', 'Array<{ value, title, content }>', '[]', 'Convenience API for rendering a complete accordion group.' ],
      [ 'type', 'single | multiple', 'single', 'Controls whether one panel or several panels can be open.' ],
      [ 'defaultValue', 'string | string[]', 'first item value', 'Initial open item for uncontrolled usage.' ],
      [ 'className', 'string', '-', 'Root container class override.' ],
      [ 'Accordion children', 'ReactNode | render function', '-', 'Lower-level composition API for custom item markup.' ],
      [ 'Accordion value', 'string | string[]', '-', 'Controlled open state for custom composition.' ],
      [ 'onValueChange', '(value) => void', '-', 'Called when a trigger changes the open state.' ],
      [ 'AccordionItem value', 'string', '-', 'Stable value identifying the item.' ]
    ]
  },
  'Core/Avatar': {
    'accessibility': 'Avatar uses alt text for images and role img with a label for initials/fallback avatars.',
    'description': 'Avatar renders profile images, initials, or fallback silhouettes.',
    'props': [
      [ 'src', 'string', '-', 'Remote image URL. Local images currently fall back to the silhouette treatment.' ],
      [ 'alt', 'string', '-', 'Alt text for image avatars.' ],
      [ 'label', 'string', '-', 'Initials or readable fallback label.' ],
      [ 'fallback', 'string | boolean', '-', 'Shows the silhouette fallback when image data is unavailable.' ],
      [ 'size', 'xs | sm | md | lg', 'md', 'Controls rendered avatar dimensions and initials size.' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'gray', 'Background token used for initials avatars.' ],
      [ 'shape', 'square | circle', 'square', 'Controls avatar border radius.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/Banner': {
    'accessibility': 'Static banners use status semantics. Linked banners expose a combined accessible label.',
    'description': 'Banner renders a compact announcement strip.',
    'props': [
      [ 'title', 'ReactNode', '-', 'Optional bold leading text.' ],
      [ 'children', 'ReactNode', '-', 'Announcement body copy.' ],
      [ 'href', 'string', '-', 'Turns the banner copy into a navigation link.' ],
      [ 'ariaLabel', 'string', 'title + children', 'Accessible label for linked banners.' ],
      [ 'size', 'xs | sm | md | lg', 'md', 'Controls vertical and horizontal padding.' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'gray', 'Color family for the banner.' ],
      [ 'variant', 'solid | soft | outline', 'soft', 'Visual treatment.' ],
      [ 'className', 'string', '-', 'Root class override.' ],
      [ 'classNames', '{ root, body, action }', '-', 'Slot-level class overrides.' ]
    ]
  },
  'Core/Breadcrumb': {
    'accessibility': 'Breadcrumb renders a nav landmark, ordered list, real links for ancestors, and aria-current on the current page.',
    'description': 'Breadcrumb renders hierarchical page trails for navigation context.',
    'props': [
      [ 'items', 'Array<{ href, label, current }>', '[]', 'Convenience API for a complete breadcrumb trail.' ],
      [ 'label', 'string', 'Breadcrumb', 'Accessible name for the nav landmark.' ],
      [ 'className', 'string', '-', 'Root or slot class override depending on the exported primitive.' ],
      [ 'children', 'ReactNode', '-', 'Composition API for custom Breadcrumb/List/Item/Link/Page layouts.' ],
      [ 'href', 'string', '-', 'Link target for ancestor pages.' ],
      [ 'current', 'boolean', 'false', 'Marks the active page with aria-current.' ]
    ]
  },
  'Core/Button': {
    'accessibility': 'Button renders native buttons for actions and links for navigation. Disabled link variants are removed from tab order.',
    'description': 'Button renders the Gaudi action and link-button variants.',
    'props': [
      [ 'children', 'ReactNode', '-', 'Visible button label or content.' ],
      [ 'variant', 'solid | soft | outline | ghost | subtle', 'solid', 'Reusable visual treatment.' ],
      [ 'size', 'xs | sm | md | lg', 'md', 'Controls spacing and text size.' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue', 'Color family for the selected variant.' ],
      [ 'radius', 'sm | md | lg | full', 'md', 'Button corner radius.' ],
      [ 'href', 'string', '-', 'Renders an internal Next link or safe external anchor.' ],
      [ 'disabled', 'boolean', 'false', 'Disables native buttons and removes disabled links from the tab order.' ],
      [ 'as', 'ElementType', 'button', 'Optional semantic element override when neither button nor link behavior is correct.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/Card': {
    'accessibility': 'Card is a structural container. Put links or buttons inside it rather than making the whole card a fake control.',
    'description': 'Card frames reusable content with title, subtitle, and optional children.',
    'props': [
      [ 'title', 'ReactNode', '-', 'Optional card heading.' ],
      [ 'subtitle', 'ReactNode', '-', 'Supporting description under the title.' ],
      [ 'children', 'ReactNode', '-', 'Body content, actions, or nested composition.' ],
      [ 'variant', 'elevated | outline | soft | flat', 'elevated', 'Container surface treatment.' ],
      [ 'padding', 'none | sm | md | lg', 'md', 'Internal spacing.' ],
      [ 'radius', 'none | sm | md | lg', 'md', 'Corner radius.' ],
      [ 'interactive', 'boolean', 'false', 'Adds hover elevation for cards containing a real link or button.' ],
      [ 'className', 'string', '-', 'Root class override.' ],
      [ 'classNames', '{ root, body, title, subtitle }', '-', 'Slot-level class overrides.' ]
    ]
  },
  'MDX/Chart': {
    'accessibility': 'Charts render as labelled figures with role img and deterministic Recharts rendering. Provide ariaLabel, title, and description so the visual has a readable summary in article content.',
    'description': 'Chart renders Recharts-based article data visualisations for MDX posts.',
    'overview': 'Use Chart and the named chart exports inside MDX when an article needs inline data visualisation. The components wrap Recharts with Gaudi spacing, borders, tooltips, tokens, and reduced-motion-safe rendering.',
    'props': [
      [ 'type', 'bar | line | area | pie | donut | composed | scatter | radial', 'bar', 'Generic Chart type. Named exports are preferred when the chart shape is known.' ],
      [ 'data', 'Array<Record<string, unknown>>', '[]', 'Recharts data array for the selected chart.' ],
      [ 'xKey', 'string', 'label', 'Field used for the x axis on axis-based charts.' ],
      [ 'yKey', 'string', 'value', 'Primary value key for bar, line, and area charts.' ],
      [ 'series', 'Array<{ key, label }>', '-', 'Multiple data series for bar, line, and area charts.' ],
      [ 'title', 'ReactNode', '-', 'Figure title shown above the chart.' ],
      [ 'description', 'ReactNode', '-', 'Supporting caption copy shown above the chart.' ],
      [ 'ariaLabel', 'string', 'title or Chart', 'Accessible summary for the chart figure.' ],
      [ 'height', 'number', '320', 'Responsive container height.' ],
      [ 'colors', 'string[]', 'Gaudi chart palette', 'Optional color sequence for series or slices.' ],
      [ 'showGrid', 'boolean', 'true', 'Shows chart grid lines on axis-based charts.' ],
      [ 'showLegend', 'boolean', 'false', 'Shows a Recharts legend when useful.' ],
      [ 'showTooltip', 'boolean', 'true', 'Shows a token-styled tooltip.' ],
      [ 'className', 'string', '-', 'Root figure class override.' ]
    ]
  },
  'Core/Carousel': {
    'accessibility': 'Carousel exposes a labelled carousel region, native previous/next buttons, aria-live status updates, keyboard arrow support, and named indicators.',
    'description': 'Carousel renders standard feature slides and Apple-style editorial card rails.',
    'props': [
      [ 'items', 'Array<{ id, title, description, eyebrow, image, alt, href, action, content }>', '[]', 'Slide data. Standard uses the active item; apple renders the horizontal rail.' ],
      [ 'ariaLabel', 'string', 'Carousel', 'Accessible name for the carousel region.' ],
      [ 'variant', 'standard | apple', 'standard', 'Slide format.' ],
      [ 'size', 'sm | md | lg', 'md', 'Controls max width and slide/card height.' ],
      [ 'radius', 'none | sm | md | lg', 'lg', 'Slide/card corner radius.' ],
      [ 'controls', 'boolean', 'true', 'Shows previous and next buttons.' ],
      [ 'loop', 'boolean', 'false', 'Wraps previous/next navigation.' ],
      [ 'className', 'string', '-', 'Root class override.' ],
      [ 'classNames', '{ root, header, viewport, track, slide, card, image, content, eyebrow, title, description, action, controls, control, indicators, indicator, dialog, overlay }', '-', 'Slot-level overrides for visual composition.' ]
    ]
  },
  'Core/Checkbox': {
    'accessibility': 'Checkbox exposes role checkbox, aria-checked, disabled state, and a visible label when provided.',
    'description': 'Checkbox renders a token-styled binary control.',
    'props': [
      [ 'id', 'string', 'generated id', 'Connects the button control to its visible label.' ],
      [ 'label', 'ReactNode', '-', 'Visible label text.' ],
      [ 'checked', 'boolean', '-', 'Controlled checked state.' ],
      [ 'defaultChecked', 'boolean', 'false', 'Initial checked state for uncontrolled usage.' ],
      [ 'size', 'sm | md | lg', 'md', 'Controls track, thumb, and label scale.' ],
      [ 'disabled', 'boolean', 'false', 'Prevents changes and lowers visual emphasis.' ],
      [ 'onCheckedChange', '(checked) => void', '-', 'Called with the next checked state.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/DataTable': {
    'accessibility': 'DataTable renders a real table with column headers and optional caption. Use render functions for cells without changing table semantics.',
    'description': 'DataTable renders small tabular datasets with tokenized table chrome.',
    'props': [
      [ 'columns', 'Array<{ key, header, render? }>', '[]', 'Column definitions. render(row) customizes a cell while preserving table semantics.' ],
      [ 'rows', 'Array<Record<string, unknown>>', '[]', 'Rows keyed by column key. row.id is used as the stable key when present.' ],
      [ 'caption', 'ReactNode', '-', 'Optional table caption.' ],
      [ 'className', 'string', '-', 'Scrollable wrapper class override.' ]
    ]
  },
  'MDX/Video': {
    'accessibility': 'Video uses a native button for the thumbnail trigger, an aria-modal dialog, Escape-to-close behavior, labelled close controls, and returns focus to the trigger when closed.',
    'description': 'Video renders a video thumbnail that opens an embedded video in an accessible modal dialog.',
    'overview': 'Use Video inside MDX when an article needs a focused video walkthrough without embedding an always-loaded iframe in the page flow.',
    'props': [
      [ 'videoSrc', 'YouTube embed URL or embeddable URL', '-' ],
      [ 'thumbnailSrc / thumbnailAlt', 'image source and accessible alt text', '-' ],
      [ 'animationStyle', 'from-center | from-bottom | from-top | from-left | from-right | fade | top-in-bottom-out | left-in-right-out', 'from-center' ],
      [ 'title', 'dialog title and iframe title', 'Video' ],
      [ 'classNames', 'trigger | thumbnail | playWrapper | playButton | dialog | overlay | panel | title | close | video', '-' ]
    ]
  },
  'Core/Field': {
    'accessibility': 'Field keeps label, input, description, and error markup colocated so form controls can be wired with id/htmlFor.',
    'description': 'Field composes form label, description, error, and input building blocks.',
    'props': [
      [ 'Field children', 'ReactNode', '-', 'Composes label, input, description, and error slots.' ],
      [ 'FieldLabel htmlFor', 'string', '-', 'Connects the visible label to the input id.' ],
      [ 'FieldInput', 'native input props', '-', 'Accepts standard input props such as id, type, value, placeholder, required, and aria-*.' ],
      [ 'FieldDescription children', 'ReactNode', '-', 'Supporting guidance text.' ],
      [ 'FieldError children', 'ReactNode', '-', 'Validation message text.' ],
      [ 'className', 'string', '-', 'Class override on each Field slot.' ]
    ]
  },
  'Core/Grid': {
    'accessibility': 'Grid provides layout only. Its children keep their own headings, links, and controls.',
    'description': 'Grid and GridItem render responsive feature grids.',
    'props': [
      [ 'children', 'ReactNode', '-', 'Grid items or custom content.' ],
      [ 'columns', '2 | 3 | 4', '3', 'Responsive column count.' ],
      [ 'gap', 'sm | md | lg', 'md', 'Space between grid items.' ],
      [ 'GridItem title', 'ReactNode', '-', 'Item heading.' ],
      [ 'GridItem description', 'ReactNode', '-', 'Item body text.' ],
      [ 'GridItem header / icon', 'ReactNode', '-', 'Optional media or icon content.' ],
      [ 'GridItem variant', 'elevated | outline | soft', 'elevated', 'Item surface treatment.' ],
      [ 'GridItem padding', 'sm | md | lg', 'md', 'Item internal spacing.' ],
      [ 'GridItem radius', 'sm | md | lg', 'md', 'Item corner radius.' ],
      [ 'className', 'string', '-', 'Root class override.' ],
      [ 'classNames', '{ root, body, title, description }', '-', 'GridItem slot overrides.' ]
    ]
  },
  'Core/HoverCard': {
    'accessibility': 'HoverCard uses Radix hover-card behavior. Trigger content must have a readable name and the panel should contain supporting, non-critical content.',
    'description': 'HoverCard reveals supplemental content from a labelled trigger.',
    'props': [
      [ 'trigger', 'ReactNode', '-', 'Trigger passed to HoverCardTrigger as child.' ],
      [ 'content', 'ReactNode', '-', 'Convenience panel content for the default export.' ],
      [ 'children', 'ReactNode', '-', 'Panel content for HoverCardContent or custom composition.' ],
      [ 'sideOffset', 'number', '8', 'Offset between trigger and panel.' ],
      [ 'className', 'string', '-', 'Content/root class override depending on slot.' ]
    ]
  },
  'Core/Icon': {
    'accessibility': 'Decorative icons are hidden from assistive technology. Informative or icon-only links need a readable label.',
    'description': 'Icon renders entries from the centralized icon registry.',
    'props': [
      [ 'name', 'registry icon name', '-', 'Renders an icon from the Gaudi registry.' ],
      [ 'kind', 'github | linkedin | twitter | youtube | mail | ...', '-', 'Compatibility alias for social/link icon use.' ],
      [ 'href', 'string', '-', 'Renders the icon as a safe link when provided.' ],
      [ 'label', 'string', '-', 'Accessible label for informative icons and icon links.' ],
      [ 'decorative', 'boolean', 'false', 'Hides the SVG from assistive technology when the icon is visual only.' ],
      [ 'size', 'xs | sm | md | lg | xl | 2xl | number', 'md', 'Controls icon dimensions.' ],
      [ 'color', 'neutral | muted | primary | blue | green | yellow | red | danger | warning | dim', 'currentColor', 'Token color shortcut.' ],
      [ 'strokeWidth', 'number', 'icon default', 'Adjusts line icon stroke width when the registry entry supports it.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/ImageFallback': {
    'accessibility': 'ImageFallback requires meaningful alt text for informative images and empty alt text for decorative images.',
    'description': 'ImageFallback swaps to a fallback source when the primary image fails.',
    'props': [
      [ 'src', 'string', '-', 'Primary image source.' ],
      [ 'fallback', 'string', '-', 'Fallback image source used after load failure.' ],
      [ 'alt', 'string', '-', 'Required alt text for informative images; use empty string for decorative images.' ],
      [ 'width / height', 'number', '-', 'Required dimensions for Next image rendering unless fill is supplied.' ],
      [ 'loading', 'lazy | eager', 'lazy', 'Native image loading hint.' ],
      [ 'radius', 'none | sm | md | lg', 'none', 'Image corner radius.' ],
      [ 'sizes', 'string', 'responsive default', 'Responsive image sizes attribute.' ],
      [ 'className', 'string', '-', 'Image class override.' ]
    ]
  },
  'Core/Kbd': {
    'accessibility': 'Keyboard shortcuts expose readable aria-label text such as Command plus K while keeping visual symbols compact.',
    'description': 'Kbd renders keyboard keys and multi-key shortcuts.',
    'props': [
      [ 'children', 'ReactNode', '-', 'Single visible key when keys is not provided.' ],
      [ 'keys', 'string | string[]', '-', 'Shortcut list such as "command,shift,k".' ],
      [ 'size', 'xs | sm | md | lg', 'md', 'Controls key dimensions and text size.' ],
      [ 'variant', 'raised | outline | flat', 'raised', 'Visual keycap treatment.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/Link': {
    'accessibility': 'Link renders Next links for internal URLs, anchors for fragments, and safe external anchors with noopener noreferrer.',
    'description': 'Link centralizes navigation semantics for internal, anchor, and external links.',
    'props': [
      [ 'children', 'ReactNode', '-', 'Visible link label.' ],
      [ 'href', 'internal | anchor | external URL', '-', 'Internal routes use Next Link; anchors and external URLs use native anchors.' ],
      [ 'prefetch', 'boolean', 'true', 'Next.js prefetch behavior for internal links.' ],
      [ 'variant', 'inline | muted | nav | bare', 'inline', 'Text link style.' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'neutral', 'Color family. Default is black/gray and turns blue on hover.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/NavigationMenu': {
    'accessibility': 'NavigationMenu renders a nav landmark, real links, native dropdown buttons, aria-expanded triggers, Escape-to-close behavior, outside-click dismissal, and aria-current for active links.',
    'description': 'NavigationMenu renders grouped site navigation with dropdown panels for categories, sections, and related destinations.',
    'props': [
      [ 'label', 'string', 'Main navigation', 'Accessible name for the nav landmark.' ],
      [ 'children', 'ReactNode', '-', 'Composition API for list, items, links, and dropdowns.' ],
      [ 'href', 'string', '-', 'NavigationMenuLink destination.' ],
      [ 'active', 'boolean', 'false', 'Marks a NavigationMenuLink as the current page with aria-current.' ],
      [ 'variant', 'link | panel', 'link', 'Use link for top-level items and panel for dropdown card links.' ],
      [ 'description', 'ReactNode', '-', 'Supporting copy shown in panel links.' ],
      [ 'meta', 'ReactNode', '-', 'Small metadata line for panel links.' ],
      [ 'NavigationMenuDropdown label', 'ReactNode', '-', 'Visible dropdown trigger label.' ],
      [ 'trigger', 'ReactNode', 'label', 'Custom dropdown trigger content.' ],
      [ 'defaultOpen', 'boolean', 'false', 'Initial uncontrolled dropdown state. Useful for demos and persistent nav panels.' ],
      [ 'align', 'start | center | end', 'start', 'Controls dropdown panel alignment.' ],
      [ 'auto alignment', 'viewport measurement', 'enabled', 'Dropdown panels flip to the nearest safe side when they would overflow the viewport.' ],
      [ 'width', 'sm | md | lg | xl', 'lg', 'Controls dropdown panel width.' ],
      [ 'NavigationMenuPanel columns', '1 | 2 | 3', '2', 'Responsive panel grid columns.' ],
      [ 'className', 'string', '-', 'Class override on each slot.' ]
    ]
  },
  'Core/Pagination': {
    'accessibility': 'Pagination renders a nav landmark, disabled button states for unavailable directions, keyboard-focusable status shortcuts, and aria-current on active numbered links.',
    'description': 'Pagination renders blog-style previous/status/next navigation. Hovering or focusing the center status reveals direct page shortcuts.',
    'props': [
      [ 'currentPage', 'number', '1', 'Active page number.' ],
      [ 'totalPages', 'number', '1', 'Total page count.' ],
      [ 'getHref', '(page) => string', '?page={page}', 'Builds each page link URL.' ],
      [ 'onPageChange', '(page) => void', '-', 'Optional client-side page change handler for filtered lists.' ],
      [ 'label', 'string', 'Pagination', 'Accessible name for the pagination nav.' ],
      [ 'children', 'ReactNode', '-', 'Composition API for custom PaginationContent/Item/Link layouts.' ],
      [ 'href', 'string', '#', 'Link destination for previous/next/link slots.' ],
      [ 'disabled', 'boolean', 'false', 'Disables previous/next or numbered controls.' ],
      [ 'isActive', 'boolean', 'false', 'Marks a page link as current.' ],
      [ 'className', 'string', '-', 'Class override on each slot.' ]
    ]
  },
  'Core/Pill': {
    'accessibility': 'Pill includes visible text so status or category meaning is not color-only.',
    'description': 'Pill renders compact category and status labels.',
    'props': [
      [ 'children', 'ReactNode', '-', 'Visible category, status, or tag label.' ],
      [ 'size', 'xs | sm | md | lg', 'md', 'Controls padding and text size.' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue', 'Color family.' ],
      [ 'variant', 'solid | soft | outline | ghost | subtle', 'solid', 'Visual treatment.' ],
      [ 'radius', 'sm | md | full', 'sm', 'Corner radius.' ],
      [ 'href', 'string', '-', 'Renders the pill as a navigation link.' ],
      [ 'icon', 'ReactNode', '-', 'Decorative leading icon.' ],
      [ 'pulse', 'boolean', 'false', 'Adds a pulsing status dot.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/Popover': {
    'accessibility': 'Popover trigger is a native button and outside pointer interactions close the panel. Keep popover content short and non-modal.',
    'description': 'Popover renders compact positioned supporting content.',
    'props': [
      [ 'trigger', 'ReactNode', '-', 'Button label/content for the default PopoverRoot.' ],
      [ 'children', 'ReactNode', '-', 'Popover panel content or custom composition.' ],
      [ 'onClick', '(event) => void', '-', 'Trigger click handler for custom composition.' ],
      [ 'className', 'string', '-', 'Root, trigger, or content class override depending on slot.' ]
    ]
  },
  'Core/Select': {
    'accessibility': 'Select uses a native button trigger, listbox semantics, aria-expanded, aria-selected, aria-multiselectable for multi-select, and keyboard support for Arrow keys, Enter, Space, Home, End, and Escape.',
    'description': 'Select renders a styled option picker with searchable combobox behavior and multi-select support.',
    'props': [
      [ 'options', 'Array<{ label, value, disabled }>', '[]', 'Selectable options. Option children are also normalized when options is empty.' ],
      [ 'value', 'string | string[]', '-', 'Controlled selected value. Arrays are used for multiple mode.' ],
      [ 'defaultValue', 'string | string[]', '-', 'Initial uncontrolled selected value.' ],
      [ 'onValueChange', '(value, option) => void', '-', 'Called when selection changes.' ],
      [ 'multiple', 'boolean', 'false', 'Allows selecting more than one option.' ],
      [ 'searchable', 'boolean', 'false', 'Shows a search field inside the popup and filters options.' ],
      [ 'placeholder', 'string', 'Select option', 'Trigger placeholder when nothing is selected.' ],
      [ 'searchPlaceholder', 'string', 'Search options...', 'Search input placeholder.' ],
      [ 'emptyText', 'string', 'No options found.', 'Empty result text.' ],
      [ 'defaultOpen', 'boolean', 'false', 'Initial open state for demos or controlled-looking examples.' ],
      [ 'disabled', 'boolean', 'false', 'Disables the trigger.' ],
      [ 'invalid', 'boolean', 'false', 'Applies aria-invalid and error styling.' ],
      [ 'name', 'string', '-', 'Renders hidden form inputs for selected values.' ],
      [ 'className / classNames', 'string | slots', '-', 'Root and slot-level class overrides.' ]
    ]
  },
  'Core/Skeleton': {
    'accessibility': 'Skeleton is aria-hidden and should be paired with loading text or a labelled busy region when content loading needs announcement.',
    'description': 'Skeleton renders non-semantic loading placeholders.',
    'props': [
      [ 'className', 'string', '-', 'Defines shape, width, height, radius, and layout placement.' ],
      [ '...divProps', 'HTML div props', '-', 'Pass aria-hidden, data attributes, or other div props when needed.' ]
    ]
  },
  'Core/Spinner': {
    'accessibility': 'Spinner exposes role status and requires a readable label for the loading operation.',
    'description': 'Spinner renders compact loading progress.',
    'props': [
      [ 'size', 'xs | sm | md | lg', 'md', 'Controls spinner dimensions.' ],
      [ 'label', 'string', 'Loading', 'Accessible status label.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/Switch': {
    'accessibility': 'Switch exposes role switch, aria-checked, disabled state, and a visible label when provided.',
    'description': 'Switch renders a token-styled boolean preference control.',
    'props': [
      [ 'id', 'string', 'generated id', 'Connects the switch to its visible label.' ],
      [ 'label', 'ReactNode', '-', 'Visible label text.' ],
      [ 'checked', 'boolean', '-', 'Controlled checked state.' ],
      [ 'defaultChecked', 'boolean', 'false', 'Initial checked state for uncontrolled usage.' ],
      [ 'disabled', 'boolean', 'false', 'Prevents changes and lowers visual emphasis.' ],
      [ 'onCheckedChange', '(checked) => void', '-', 'Called with the next checked state.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  },
  'Core/Terminal': {
    'accessibility': 'Terminal renders readable command history inside a labelled region. Motion is disabled when users prefer reduced motion.',
    'description': 'Terminal renders mac-style shell examples with typed commands and structured output lines.',
    'props': [
      [ 'commands', 'Array<string | { command, output, tone }>', 'example commands', 'Command history. output can be strings or { text, tone } lines.' ],
      [ 'outputs', 'Record<number, output[]>', '{}', 'Legacy output mapping for string command arrays.' ],
      [ 'ariaLabel', 'string', 'Terminal', 'Accessible name for the terminal region.' ],
      [ 'title', 'string', 'terminal', 'Header title.' ],
      [ 'username', 'string', 'ahmad', 'Prompt username segment.' ],
      [ 'promptSymbol', 'string', '$', 'Prompt separator.' ],
      [ 'variant', 'dark | light | translucent', 'dark', 'Terminal surface treatment.' ],
      [ 'size', 'sm | md | lg', 'md', 'Controls max width, body height, and text size.' ],
      [ 'radius', 'none | sm | md | lg', 'lg', 'Terminal corner radius.' ],
      [ 'showHeader', 'boolean', 'true', 'Shows mac window controls and title.' ],
      [ 'animate', 'boolean', 'true', 'Types commands over time unless reduced motion is preferred.' ],
      [ 'typingSpeed', 'number', '35', 'Milliseconds between typed characters.' ],
      [ 'initialDelay', 'number', '400', 'Delay before the first command starts.' ],
      [ 'delayBetweenCommands', 'number', '700', 'Delay after a command before the next command starts.' ],
      [ 'className', 'string', '-', 'Root class override.' ],
      [ 'classNames', '{ root, header, controls, title, body, line, prompt, command, output }', '-', 'Slot-level class overrides.' ]
    ]
  },
  'Core/TextHighlight': {
    'accessibility': 'TextHighlight is inline text emphasis. It must keep the original text readable and must not be the only way meaning is conveyed.',
    'description': 'TextHighlight emphasizes short inline phrases inside prose.',
    'overview': 'Use TextHighlight sparingly inside article copy or compact editorial headings when a phrase needs emphasis without becoming a link, button, or badge.',
    'props': [
      [ 'children', 'ReactNode', '-', 'Inline text to emphasize.' ],
      [ 'variant', 'marker | soft | underline', 'marker', 'Highlight treatment.' ],
      [ 'tone', 'gray | neutral | blue | green | yellow | red | indigo', 'blue', 'Color family.' ],
      [ 'radius', 'none | sm | md', 'sm', 'Corner radius for filled variants.' ],
      [ 'animate', 'boolean', 'true', 'Enables the marker draw animation.' ],
      [ 'className', 'string', '-', 'Root class override.' ]
    ]
  }
};

const defaultUsage = (title, component) => {
  const name = title.split('/').at(-1) || component.replaceAll(' ', '');

  if (name.startsWith('use')) return `import { ${name} } from '@gaudi/design-system';\n\nconst result = ${name}();`;

  return `import { ${name} } from '@gaudi/design-system';\n\n<${name} />`;
};

export const getComponentDocs = (title) => {
  const [ group, ...rest ] = title.split('/');
  const component = rest.join(' / ') || group;
  const docs = groupDocs[group] || groupDocs.Core;
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
    'usage': usage,
    'usageLanguage': overrides.usageLanguage || (group === 'MDX' ? 'mdx' : 'jsx')
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

const CodeValue = ({ children }) => (
  <code className='ds-docs-code-value'>{children}</code>
);

const PropsTable = ({ rows }) => (
  <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800'>
    <table>
      <thead>
        <tr>
          <th scope='col'>Prop</th>
          <th scope='col'>Type / Values</th>
          <th scope='col'>Default</th>
          <th scope='col'>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([ name, values, defaultValue, description = '-' ]) => (
          <tr key={ name }>
            <td>{name}</td>
            <td><CodeValue>{values}</CodeValue></td>
            <td><CodeValue>{defaultValue}</CodeValue></td>
            <td>{description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Related = ({ docs }) => {
  const related = [ docs.group, 'Overview/Accessibility', 'Overview/Typography', 'Overview/Colors & Tokens' ];

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
      <HighlightedCode code={ docs.usage } language={ docs.usageLanguage } />
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
          <HighlightedCode code={ docs.usage } language={ docs.usageLanguage } />
        </Section>

        {docs.related ? <Section title='Related'><Related docs={ docs } /></Section> : null}
      </div>

      {stories ? (
        <div className='sb-unstyled ds-docs-blocks'>
          <Section title='Examples'>
            <Primary />
            <Stories includePrimary={ false } />
          </Section>
        </div>
      ) : null}
    </>
  );

  ComponentDocsPage.displayName = 'ComponentDocsPage';

  return ComponentDocsPage;
};
