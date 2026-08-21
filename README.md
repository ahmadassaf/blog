![Ahmad Assaf's Personal Space](./public/static/images/og-card.jpg)

# Ahmad Assaf's Personal Space

[![Website](https://img.shields.io/badge/website-assaf.website-2f6f62)](https://assaf.website)
[![CI](https://github.com/ahmadassaf/blog/actions/workflows/ci.yml/badge.svg)](https://github.com/ahmadassaf/blog/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

The source for [assaf.website](https://assaf.website), a personal space for writing about AI, data, engineering, leadership, and the systems that connect them.

The site is built with Next.js, React, Tailwind CSS, Contentlayer, and MDX. Its content and visual language live in separate repositories, keeping the application focused on routing, rendering, discovery, and delivery.

## Highlights

- Rich MDX with syntax highlighting, code groups, math, citations, footnotes, alerts, and custom interactive components
- Posts, projects, publications, categories, tags, series, reading times, and generated tables of contents
- Responsive light and dark themes powered by the shared Gaudi design system
- Generated Open Graph images, JSON-LD, RSS, sitemap, and web app metadata
- Optional live GitHub metadata for project pages, with a build-safe fallback
- Security headers, image optimization, Vercel Analytics, and Speed Insights

## Architecture

| Layer | Responsibility | Source |
| --- | --- | --- |
| Blog engine | Routes, layouts, content compilation, metadata, feeds, and deployment | This repository |
| Content bundle | Articles, projects, and article-specific visualisations | [`ahmadassaf/blog-posts`](https://github.com/ahmadassaf/blog-posts), mounted at `data/blog` |
| Design system | Tokens, components, layouts, and reusable MDX primitives | [`@gaudi/design-system`](https://github.com/ahmadassaf/design-system) |

The separation is deliberate:

- The **blog engine** owns routes, application data, Contentlayer, metadata, APIs, build-time generation, and one-off page composition.
- The **content bundle** owns prose, project entries, article data, and visualisations that only make sense for a particular subject.
- **Gaudi** owns reusable interface patterns: foundations, controls, navigation, article chrome, MDX primitives, icons, tokens, Tailwind configuration, and shared styling.

Content is compiled at build time. The content bundle extends Gaudi's shared MDX component map from a client boundary, allowing bespoke interactive articles to remain close to their source without leaking article-specific code into the engine or design system.

## Getting started

### Requirements

- Node.js 22 or newer
- pnpm 8.15.2
- Git with submodule support

### Install and run

```bash
git clone --recurse-submodules https://github.com/ahmadassaf/blog.git
cd blog
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). The development command checks out the pinned content bundle, compiles the MDX, generates the derived content files, and starts Next.js with Turbopack.

If the repository was cloned without submodules, initialize the content separately:

```bash
pnpm content:checkout
```

To avoid GitHub API requests while working locally, use:

```bash
pnpm dev:no-github
```

## Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Prepare content and start the development server |
| `pnpm dev:no-github` | Start development with live GitHub project metadata disabled |
| `pnpm build` | Compile content, generate derived files, and create a production build |
| `pnpm build:no-github` | Create a production build without GitHub API requests |
| `pnpm serve` | Serve an existing production build |
| `pnpm test` | Run the engine and content visualisation tests |
| `pnpm lint:check` | Check the application with ESLint |
| `pnpm lint` | Run ESLint and apply safe fixes |
| `pnpm analyze` | Build with the Next.js bundle analyzer enabled |
| `pnpm content:checkout` | Initialize or restore the pinned content submodule |
| `pnpm content:update` | Advance the content submodule to the latest configured branch revision |
| `pnpm storybook` | Start the sibling Gaudi Storybook on port 6006 |
| `pnpm storybook:build` | Build the sibling Gaudi Storybook |
| `pnpm test:ds-contracts` | Run Gaudi's public component contract tests |

The Storybook commands expect the design-system repository to be checked out beside this repository at `../design-system`.

## Gaudi design system

[Gaudi](https://github.com/ahmadassaf/design-system) is the editorial React design system behind the site. It is installed from GitHub as `@gaudi/design-system` and pinned to an exact revision in `package.json`, so application builds do not silently change when the design-system repository advances.

Gaudi's creative direction is **“The Editorial Instrument”**: a restrained system for reading, navigating, and composing technical writing. It favors clear hierarchy, compact controls, neutral surfaces, visible focus, and rare blue accents reserved for action, selection, links, and wayfinding. Borders provide most structural separation; shadows are reserved for surfaces that genuinely float. Dark mode is composed as its own reading environment rather than produced by mechanically inverting the light theme.

### What Gaudi owns

Gaudi is more than a component library. It supplies the shared visual and behavioral contract for the entire site:

- Semantic color, typography, radius, shadow, spacing, motion, chart, and diagram tokens
- CSS variables for light and dark themes
- A Tailwind preset plus color-variable and grid plugins
- Typography foundations, icon registry, variants, and composition utilities
- Core interface primitives and compound components
- Responsive site navigation, command launcher, search, and footer
- Post headers, breadcrumbs, sharing, series navigation, previous/next navigation, and tables of contents
- Rich MDX primitives for prose, data, media, diagrams, citations, and interactive references
- The compiled-MDX runtime used to render Contentlayer output
- Storybook documentation, interaction tests, accessibility checks, and contract tests

Reusable components belong in Gaudi. Route metadata, generated content, API routes, bibliography files, and page-specific wiring belong in this repository. Components that explain only one article belong in `blog-posts`.

### Integration in this application

The root layout imports Gaudi's global stylesheet and uses its server-aware `LayoutContainer` as the application shell:

```jsx
import LayoutContainer from '@gaudi/design-system/layout/LayoutContainer';
import CitationTracker from '@gaudi/design-system/mdx/CitationTracker';
import CodeGroupTabs from '@gaudi/design-system/mdx/CodeGroupTabs';

import '@gaudi/design-system/global.css';

<>
  <CodeGroupTabs />
  <CitationTracker />
  <LayoutContainer
    metadata={siteMetadata}
    navigation={navigationMetadata}
    jsonLd={websiteJsonLd}
    menuProps={{ posts, projects, categories, publications, tags }}
    footerProps={footerProps}
  >
    {children}
  </LayoutContainer>
</>
```

`LayoutContainer` establishes the shared theme and site-configuration contexts, responsive menu, command launcher, footer, global JSON-LD, and content frame. Site-aware components receive data through this boundary rather than importing application files from inside the package.

The content-owned renderer then combines Gaudi's authoring primitives with article-specific visualisations:

```jsx
'use client';

import Callout from '@gaudi/design-system/mdx/Callout';
import Chart from '@gaudi/design-system/mdx/Chart';
import { MDXLayoutRenderer } from '@gaudi/design-system/mdx/runtime';

import { VisualisationComponents } from './index';

const components = {
  Callout,
  Chart,
  ...VisualisationComponents
};

export default function ContentRenderer(props) {
  return <MDXLayoutRenderer components={components} {...props} />;
}
```

The merge happens in a client module because React component maps cannot cross the server-to-client boundary. Heavy components are imported through dedicated MDX entrypoints, and the chart renderer is dynamically loaded by the blog so charting code is not included on routes that do not need it.

### Package entrypoints

Gaudi separates its entrypoints to keep server, client, and heavyweight article concerns from contaminating one another.

| Import | Purpose |
| --- | --- |
| `@gaudi/design-system` | Convenience barrel for foundations, core UI, navigation, post components, blocks, tokens, and lightweight utilities |
| `@gaudi/design-system/core/*` | Leaf imports for individual core primitives such as `Button`, `Card`, `Icon`, and `Link` |
| `@gaudi/design-system/layout/*` | Application layout, footer, search, newsletter, and article-layout components |
| `@gaudi/design-system/layout/LayoutContainer` | Server-aware application shell; kept out of shared barrels because it uses Next.js server APIs |
| `@gaudi/design-system/navigation/*` | Desktop, mobile, floating, logo, blog, and search navigation pieces |
| `@gaudi/design-system/post/*` | Article header, navigation, sharing, series, disclaimer, and table-of-contents components |
| `@gaudi/design-system/mdx/*` | Leaf imports for rich MDX primitives without pulling in the full catalogue |
| `@gaudi/design-system/mdx` | Complete MDX catalogue when the entire component map is intentionally required |
| `@gaudi/design-system/mdx/runtime` | `MDXLayoutRenderer` and `useMDXComponent` for compiled MDX |
| `@gaudi/design-system/global.css` | Tailwind, tokens, base compatibility, themes, and shared global styles |
| `@gaudi/design-system/tailwind-preset` | Tailwind theme preset backed by Gaudi tokens |
| `@gaudi/design-system/tailwind/addVariablesColors` | Maps Gaudi CSS variables into semantic Tailwind colors |
| `@gaudi/design-system/tailwind/tailwindGrid` | Shared editorial grid utilities |
| `@gaudi/design-system/tokens` | JavaScript access to colors, typography, radii, shadows, motion, and the complete token object |
| `@gaudi/design-system/icons` | Icon registry, labels, size metadata, and icon lookup helpers |

Prefer leaf imports in route-level code that needs only one or two components. Use the root convenience barrel when several lightweight Gaudi primitives are intentionally composed together.

### Foundations and tokens

The foundation layer keeps visual decisions consistent across application UI and article content.

| Foundation | What it provides |
| --- | --- |
| Colors | Editorial neutrals plus semantic `accent`, `info`, `success`, `warning`, `danger`, `attention`, and `discovery` families |
| Typography | A single Inter-based editorial voice, a deliberate type scale, readable prose rhythm, and mono styles for code and data |
| Shape | Compact 6–8px control and card radii, with a tighter radius for pills and metadata |
| Elevation | Border-first surfaces, restrained card shadows, keyboard-key depth, and stronger shadows only for overlays |
| Motion | Feedback, state, overlay, and focal durations with standard, entrance, and exit easing curves |
| Theme | Semantic CSS variables with separately tuned light and dark values |
| Data visualisation | Shared chart and Mermaid variables that remain legible across both themes |

The blog consumes these foundations through the Tailwind preset and plugins:

```js
const designSystemPreset = require('@gaudi/design-system/tailwind-preset');
const addVariablesColors = require('@gaudi/design-system/tailwind/addVariablesColors');
const tailwindGrid = require('@gaudi/design-system/tailwind/tailwindGrid');

module.exports = {
  content: [
    './app/**/*.{js,jsx,mdx}',
    './data/**/*.{js,jsx,mdx}',
    './layouts/**/*.{js,jsx}',
    './node_modules/@gaudi/design-system/src/**/*.{js,jsx,mdx}'
  ],
  darkMode: 'class',
  plugins: [addVariablesColors, tailwindGrid],
  presets: [designSystemPreset]
};
```

Application code should use semantic tokens such as `bg-surface`, `text-text-muted`, `border-border`, and `text-accent` instead of reproducing color values locally.

### Component catalogue

#### Core primitives

| Family | Components | Role |
| --- | --- | --- |
| Actions and links | `Button`, `Link` | Toned actions and internal/external navigation with consistent focus and disabled states |
| Forms | `Checkbox`, `Field`, `FieldLabel`, `FieldInput`, `FieldDescription`, `FieldError`, `Select`, `Switch` | Accessible form controls, labels, descriptions, validation, and state |
| Content surfaces | `Accordion`, `Banner`, `Card`, `Carousel`, `Terminal` | Structured disclosure, messaging, grouped content, sequential content, and terminal output |
| Identity and metadata | `Avatar`, `Badge`, `Pill` | People, compact status, categories, tags, and filters |
| Structure and data | `Breadcrumb`, `DataTable`, `Grid`, `GridItem`, `Pagination` | Hierarchy, tabular interfaces, responsive layouts, and archive navigation |
| Commands and navigation | `CmdLauncher`, `CmdLauncherShortcut`, `Kbd`, `NavigationMenu` | Keyboard-first discovery, shortcuts, and compound navigation menus |
| Overlays | `DialogPortal`, `HoverCard`, `Popover` | Layered dialogs, contextual previews, and anchored supplementary content |
| Feedback | `Skeleton`, `Spinner` | Loading placeholders and indeterminate progress |
| Visual language | `Icon`, `TextHighlight` | Registry-backed iconography and editorial emphasis |

Many primitives expose compound parts and reusable variants—for example the breadcrumb, field, grid, hover-card, navigation-menu, pagination, popover, and accordion families—so applications can change composition without rebuilding accessibility behavior.

#### Layout and site shell

| Component | Role |
| --- | --- |
| `LayoutContainer` | Server-aware site shell, providers, navigation, command launcher, footer, and structured data |
| `LayoutWrapper` | Shared centered page frame and width behavior |
| `ArticleContentLayout` | Editorial reading column and article-side layout |
| `Footer` | Configurable editorial footer with navigation and social groups |
| `Aurora` | Token-driven atmospheric background treatment used without replacing content hierarchy |
| `Search` | Search and discovery surface |
| `NewsletterForm` / `BlogNewsletterForm` | Reusable newsletter signup layouts for application and article contexts |

#### Navigation

| Component | Role |
| --- | --- |
| `Menu` | Composed responsive navigation system |
| `MenuMain` | Primary desktop navigation |
| `MenuBlog` | Content-aware blog navigation |
| `MenuMobile` | Mobile overlay navigation with focus handling |
| `MenuSearch` | Search and command-launch entrypoint |
| `MenuLogo` | Brand and home navigation |
| `DropDown` | Compact navigation disclosure |
| `FloatingMenu` | Floating navigation treatment for contextual movement |

#### Article and post chrome

| Component | Role |
| --- | --- |
| `Post` | Reusable article-preview presentation |
| `PostHeader` | Title, subtitle, publication metadata, tags, and project context |
| `Breadcrumbs` | Category and article hierarchy |
| `TableOfContents` | Heading hierarchy, active-section tracking, and a generated “Diagrams & tables” index |
| `PostSeriesBox` | Ordered series context and movement between installments |
| `PostNavigation` | Previous and next content navigation |
| `PostSharing` | Consistent social-sharing actions |
| `Disclaimer` | Standard article disclaimer treatment |

The table of contents does more than list headings: it discovers captioned figures and tables inside the article, assigns stable fragments when needed, and tracks the currently active visual as the reader moves through the page.

#### Blocks and utilities

Gaudi currently includes the composed `ThoughtsSection` editorial block, the `Typography` foundation with reusable variants, a registry-backed `Icon` API, site configuration context, date and content helpers, class-name composition, and a small variants utility. These are shared implementation tools, not places to put route-specific application state.

### Accessibility and quality

Gaudi components are built around visible focus, semantic elements, keyboard operation, dialog focus management, dismissible hover content, useful accessible names, reduced-motion behavior, and non-color status cues. Charts label their SVG surfaces, tables contain horizontal overflow inside a named keyboard-focusable region, Mermaid output is sanitized, and media dialogs restore predictable interaction.

The design-system repository verifies its public surface with:

- Contract tests for exports and behavioral invariants
- Storybook interaction tests
- Automated axe accessibility checks in a Playwright browser
- ESLint and a full Storybook production build

Run the local contract suite from this repository with `pnpm test:ds-contracts`, or use `pnpm storybook` to inspect the complete component documentation and variants.

## Working with content

The application is a generic publishing engine. Posts and projects are authored in the [`blog-posts`](https://github.com/ahmadassaf/blog-posts) repository and mounted here as the `data/blog` Git submodule.

To publish content changes:

1. Edit, verify, and commit the content in `blog-posts`.
2. Run `pnpm content:update` in this repository.
3. Review the updated submodule revision.
4. Run `pnpm build:no-github`, then commit the new `data/blog` pointer.

### Post frontmatter

Contentlayer validates frontmatter during the content build. A typical post begins with:

```yaml
---
type: 'Post'
title: 'A clear, descriptive title'
subtitle: 'Optional supporting context'
summary: 'A short description used in previews and metadata.'
date: '2026-08-21'
updated: '2026-08-21'
category: 'engineering'
tags: ['AI', 'Developer Tools']
featured: false
draft: false
tableOfContents: true
---
```

`title`, `date`, and `category` are required for posts. Projects use `type: 'Project'` and additionally require `github` and `layout` fields. See [`lib/contentLayer/contentFields.js`](./lib/contentLayer/contentFields.js) for the complete schema.

#### Content schema

| Field | Post | Project | Purpose |
| --- | --- | --- | --- |
| `type` | `Post` | `Project` | Selects the Contentlayer document type |
| `title` | Required | Required | Primary display title and metadata title |
| `subtitle` | Optional | Optional | Supporting title used in article and preview layouts |
| `summary` | Optional | Optional | Listing, preview, feed, and search description |
| `date` | Required | Required | Original publication date |
| `updated` | Optional | — | Last substantial post revision |
| `category` | Required | Required | Primary taxonomy and route grouping |
| `tags` | Optional | Optional | Searchable secondary taxonomy; defaults to an empty list |
| `featured` | Optional | Optional | Makes content eligible for featured presentation |
| `draft` | Optional | — | Excludes a post from public routes, metadata, feeds, previews, and sitemap generation |
| `layout` | Optional | Required | Selects an application layout; projects normally use `ProjectLayout` |
| `tableOfContents` | Optional | Optional | Requests the desktop table-of-contents panel when the article has enough headings |
| `series` | Optional | — | Ordered series metadata with a required `title` and numeric `order` |
| `bibliography` | Optional | — | Declares the bibliography files relevant to citation-heavy content |
| `github` | — | Required | Repository in `owner/name` form for project metadata |

Authors use a separate document schema. `name` is required; `avatar`, `company`, `email`, `github`, `layout`, `linkedin`, `occupation`, and `twitter` are optional.

Contentlayer also computes fields that authors must not duplicate in frontmatter:

- `externalLink` derives the content-relative path.
- `slug` derives the public category route.
- `readingTime` is calculated from the article body.
- `toc` is extracted from the article heading hierarchy.
- Project `meta` is enriched from the GitHub API or a shape-compatible fallback.

### Rich MDX authoring

Articles are compiled as MDX: ordinary Markdown remains the default authoring format, but a post can introduce React components anywhere richer explanation is useful. Contentlayer parses and validates the files, Remark transforms the Markdown tree, Rehype enriches the resulting HTML tree, and Gaudi renders the final article primitives.

#### Automatic Markdown features

Much of the rich behavior requires no JSX at all.

| Authoring feature | Result |
| --- | --- |
| GitHub-Flavored Markdown | Tables, task lists, autolinks, and strikethrough |
| Headings | Stable slugged anchors plus a generated hierarchical table of contents |
| Fenced code | Server-rendered Shiki highlighting with line support and the `aurora-x` theme |
| A fence such as `js:filename.js` | A titled JavaScript code block with the filename rendered above it |
| `::: code-group labels=[…]` | A synchronized tab group for related code blocks |
| `$…$` and `$$…$$` | Inline and display mathematics rendered with KaTeX |
| `[@citation-key]` | Numbered citations resolved from the configured BibTeX files and hydrated as popovers |
| `[^1]` footnotes | Inline footnote references with accessible popover content |
| Standard Markdown images | Local images are converted to Gaudi's optimized `Image` component with detected dimensions |
| External links | Public HTTP and HTTPS links become metadata-rich `Preview` links |
| Internal blog links | Links matching the blog route structure become content-aware internal previews |
| GitHub alert syntax | Note, tip, important, warning, and caution blocks through `remark-github-blockquote-alert` |
| Emoji shortcodes | Remark expands supported emoji syntax during compilation |

Code titles and groups can be composed directly in Markdown:

````mdx
::: code-group labels=[JavaScript, Output]

```js:example.js
const greeting = 'Hello from MDX';
console.log(greeting);
```

```text
Hello from MDX
```

:::
````

Math, citations, footnotes, and alerts use familiar text syntax:

```mdx
Euler's identity is $e^{i\pi} + 1 = 0$.

The approach follows earlier work [@example-key].

This statement has a supporting note.[^1]

[^1]: Footnotes can contain links, emphasis, strong text, and inline code.

> [!WARNING]
> This operation changes the published content revision.
```

#### Components available directly in blog MDX

The blog deliberately exposes a focused subset of Gaudi's MDX catalogue. These names can be used directly inside a post or project without local imports.

| Component | Use it for | Notable behavior |
| --- | --- | --- |
| `Aside` | Supplementary explanation that should not interrupt the main argument | Renders as an inline box at ordinary widths and can move into the article margin on very wide screens |
| `Callout` | Information, warnings, and errors | Supports `info`, `warning`, and `error` semantic treatments |
| `Chart` | Bar, line, area, composed, pie, donut, radial, and scatter visualisations | Responsive Recharts rendering, semantic theme colors, tooltips, legends, captions, and accessible labels |
| `FileTree` | Repository and directory structures | Indentation, folder state, and file-type-aware icons |
| `Highlight` | Short editorial emphasis inside prose | Token-aware gradient highlight that survives wrapped text |
| `Image` | Optimized figures and diagrams | Captions, light/dark sources, fallback images, Next.js optimization, and a full-screen modal |
| `Preview` | Rich internal or external links | Favicon, title, summary, image, source metadata, loading state, timeout, and resilient fallback behavior |
| `Table` | Responsive tabular content | Native Markdown tables are remapped automatically; wide tables scroll within an accessible named region |
| `Tooltip` | Optional inline definitions or context | Mouse, focus, and click interaction with Escape dismissal |
| `a` | Ordinary links emitted by MDX | Uses Gaudi's link semantics and internal/external behavior |

Citation and code-group infrastructure is mounted outside the article body. `CitationTracker` and `CodeGroupTabs` are global singletons in the root layout; `CitationPopover` and `Footnote` are mounted beside each rendered article. Authors therefore use citation, footnote, and code-group syntax without embedding those runtime components manually.

##### Callouts, asides, highlights, and tooltips

```mdx
<Callout type='info'>
  This is important context that belongs in the main reading flow.
</Callout>

<Callout type='warning'>
  Verify the generated content before publishing.
</Callout>

<Aside>
  This is useful background, but the argument still works without it.
</Aside>

The pipeline operates on an <Tooltip text='Markdown Abstract Syntax Tree'>MDAST</Tooltip>.

<Highlight>This phrase deserves deliberate emphasis.</Highlight>
```

##### Charts

`Chart` selects its renderer with the `type` prop. Axis-based charts accept `data`, `xKey`, `yKey`, and optional multi-series definitions. Pie-like charts use `nameKey` and `valueKey`. All chart types accept a title, description, height, accessible label, and theme-aware color overrides.

```mdx
<Chart
  type='line'
  title='Articles published by quarter'
  description='A steady increase across the last four quarters.'
  ariaLabel='Line chart showing articles published by quarter'
  data={[
    { quarter: 'Q1', posts: 2 },
    { quarter: 'Q2', posts: 4 },
    { quarter: 'Q3', posts: 5 },
    { quarter: 'Q4', posts: 8 }
  ]}
  xKey='quarter'
  yKey='posts'
/>
```

For multiple series, provide stable data keys and reader-facing labels:

```mdx
<Chart
  type='bar'
  title='Content by format'
  data={[
    { label: 'Guides', published: 8, drafts: 2 },
    { label: 'Notes', published: 5, drafts: 4 }
  ]}
  series={[
    { key: 'published', label: 'Published' },
    { key: 'drafts', label: 'Drafts' }
  ]}
  showLegend
/>
```

##### Images, file trees, and previews

```mdx
<Image
  src='/static/images/posts/architecture.svg'
  darkSrc='/static/images/posts/architecture-dark.svg'
  fallback='/static/images/og-card.jpg'
  alt='Content compilation architecture'
  caption='The blog combines engine, content, and design-system layers at build time.'
  width={1200}
  height={720}
/>

<FileTree data={[
  {
    name: 'data',
    isFolder: true,
    childrenProp: [
      { name: 'authors', isFolder: true },
      { name: 'blog', isFolder: true },
      { name: 'meta', isFolder: true }
    ]
  },
  { name: 'contentlayer.config.js', isFolder: false },
  { name: 'package.json', isFolder: false }
]} />

<Preview
  url='https://github.com/ahmadassaf/design-system'
  title='Gaudi design system'
/>
```

Ordinary Markdown links are usually preferable to a manual `Preview`; the content pipeline upgrades eligible links automatically.

#### The wider Gaudi MDX catalogue

Gaudi contains additional rich components that are available to other consumers but are not currently registered as bare names in this blog's content renderer.

| Component family | Capability |
| --- | --- |
| `AreaChart`, `BarChart`, `ComposedChart`, `DonutChart`, `LineChart`, `PieChart`, `RadialBarChart`, `ScatterChart` | Individually importable chart renderers; the blog reaches all of them through `Chart type='…'` |
| `Details` and `Faq` | Accessible disclosures and structured question-and-answer groups |
| `Mermaid` | Lazy client-side Mermaid diagrams with token-driven themes, sanitized SVG, error UI, and accessible descriptions |
| `Quote` | Semantic quotations with attribution, title, and optional portrait |
| `Video` | Thumbnail-driven video dialog with keyboard control, focus management, YouTube URL normalization, and selectable entrance motion |
| `BlogNewsletterForm` | Article-context newsletter signup |
| `ImageModal` | Full-screen image inspection used internally by `Image` |
| `CitationPopover`, `CitationTracker`, `Footnote`, `CodeGroupTabs` | Runtime enhancement for generated citation, footnote, and grouped-code markup |

To make another Gaudi component authorable, import it in `data/blog/visualisations/MDXLayoutRenderer.js` and add it to `BlogMDXComponents`. Keep the map intentionally small: adding a component makes its runtime part of the article boundary, and heavyweight dependencies should remain leaf-imported or dynamically loaded.

#### Content-owned interactive visualisations

Reusable editorial primitives belong in Gaudi, but a diagram or explorer that explains one subject travels with the article bundle. The current catalogue includes:

| Component | Subject |
| --- | --- |
| `GaudiBarLayout` | Interactive anatomy of the gaudiBar desktop compositor and its nested regions |
| `LinkedDataQualityFramework` | Roomba's linked-data assessment pipeline, subsystems, modules, and outputs |
| `PipelineDiagram` | Inspectable delivery pipelines with source, platform, stages, failure paths, and destination feedback |
| `RdfTripleExplorer` | Subject–predicate–object semantics as an interactive directed graph |
| `RdfBlankNodeExplorer` | The role and identity constraints of RDF blank nodes |
| `RdfContainerExplorer` | RDF container types, membership properties, and ordering behavior |
| `RdfCollectionExplorer` | RDF collection structure and list traversal |
| `UnifiedProcessorExplorer` | Reversible Markdown/MDAST/HAST/HTML processing through Remark, Rehype, plugins, and utilities |

These visualisations are dynamically loaded, scoped to their own styles and data, and designed with keyboard interaction and textual alternatives. A post can invoke them by component name after the component is exported from the catalogue:

```mdx
<UnifiedProcessorExplorer view='remark' />

<PipelineDiagram
  title='Content delivery pipeline'
  source={{ label: 'Author', action: 'Push content' }}
  platform={{ label: 'GitHub', success: 'Checks pass' }}
  pipeline={{
    label: 'CI',
    trigger: 'Start build',
    stages: [
      { label: 'Compile', failure: 'Invalid MDX' },
      { label: 'Validate', failure: 'Contract failure' },
      { label: 'Deploy', action: 'Publish', output: 'Production' }
    ]
  }}
  destination={{ label: 'assaf.website' }}
/>
```

To add a content-owned component:

1. Create a self-contained folder under `data/blog/visualisations` with its component, scoped styles, data, and contract test.
2. Export it from `data/blog/visualisations/index.js`; the local renderer merges that catalogue with Gaudi.
3. Keep the component client-safe, responsive, keyboard-operable, and meaningful without animation.
4. Include an accessible title, description, labels, and a text or semantic fallback for visual-only information.
5. Use the exported name directly in MDX.
6. Run `pnpm test` before updating the content revision here.

Content-owned components execute as trusted application code in the browser. They must not render unsanitized third-party HTML or introduce generic UI that belongs in Gaudi.

## Project map

| Path | Purpose |
| --- | --- |
| `app` | App Router pages, APIs, generated taxonomies, metadata routes, and global responsive styles |
| `layouts` | Post, project, list, preview, and featured content layouts |
| `lib/contentLayer` | Content schemas, computed fields, taxonomy generators, and validation |
| `lib/mdx` | Remark and rehype plugins used by the MDX pipeline |
| `data/meta` | Site, author, navigation, publication, bibliography, and JSON-LD metadata |
| `data/blog` | External content submodule |
| `scripts` | Post-content generation and RSS tooling |
| `public/static` | Logos, favicons, images, icons, and browser assets |

## Build and runtime pipeline

The production build is a sequence rather than a single Next.js command:

1. `content:checkout` restores the exact `data/blog` submodule revision committed by the engine.
2. Contentlayer reads authors, posts, and projects, validates their schemas, compiles MDX, and writes generated modules under `.contentlayer`.
3. The custom Remark and Rehype stack adds GFM, emoji, math, headings, link previews, image conversion, code titles and groups, alerts, citations, footnotes, and syntax highlighting.
4. `scripts/build.mjs` filters published posts, validates tag coverage and normalization, and generates category, tag, and publication data under `app/content`.
5. `scripts/rss.mjs` writes the public RSS feed.
6. Next.js builds the App Router application, static content routes, metadata routes, and API handlers.

`.contentlayer`, `app/content`, and the generated feed are build artifacts and are intentionally ignored by Git. They can always be reproduced from the engine revision, the pinned content revision, and the lockfile.

At runtime, server components consume the generated Contentlayer modules. Public collection helpers remove drafts before content reaches route parameters, listings, menus, previews, the sitemap, or the feed. Project metadata can be enriched from GitHub; a failed, skipped, or rate-limited request produces a compatible fallback without failing the build.

### Routes and discovery surfaces

| Route | Purpose |
| --- | --- |
| `/` | Editorial home and featured content |
| `/about` | Author profile and background |
| `/blog` | Blog explorer and recent writing |
| `/blog/category/[...slug]` | Individual post routes |
| `/blog/categories` | Category explorer |
| `/blog/categories/[category]` | Category archive |
| `/blog/categories/[category]/page/[page]` | Paginated category archives |
| `/blog/tags` | Searchable tag explorer |
| `/blog/tags/[tag]` | Tag archive |
| `/blog/tags/[tag]/page/[page]` | Paginated tag archives |
| `/blog/publications` | Publication index |
| `/blog/projects` | Project index |
| `/blog/projects/[...slug]` | Individual project routes |
| `/api/og` | Dynamic Open Graph image generation |
| `/api/preview` | Metadata endpoint used by rich link previews |
| `/feed.xml` | Generated RSS feed |
| `/sitemap.xml` | Generated sitemap |

The global command launcher receives a deliberately reduced representation of posts, projects, categories, publications, and tags. Full Contentlayer documents are not serialized into every page's React Server Component payload.

## Configuration

Common customisation points:

- Site identity and canonical URL: `data/meta/siteMetadata.js`
- Author and social profiles: `data/meta/authorMetadata.js`
- Primary navigation and category descriptions: `data/meta/navigationMetadata.mjs`
- Citations and bibliography: `data/meta/bibliography`
- Content rules and MDX plugins: `contentlayer.config.js`
- Security headers, image policy, aliases, and build plugins: `next.config.js`

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | No | Authenticates project metadata requests and raises the GitHub API rate limit |
| `SKIP_GITHUB_API=true` | No | Disables live project metadata requests for deterministic or offline builds |
| `ANALYZE=true` | No | Enables the bundle analyzer during a build |

## Verification

Run the same core checks used by CI:

```bash
pnpm lint:check
pnpm test
pnpm build:no-github
```

CI runs on Node.js 22, installs from the frozen pnpm lockfile, checks out submodules recursively, and builds without relying on the GitHub API.

## Deployment

The production site is deployed as a standard Next.js application. Its build environment must:

1. Use Node.js 22 or newer.
2. Check out Git submodules recursively.
3. Install dependencies with `pnpm install --frozen-lockfile`.
4. Run `pnpm build` or `pnpm build:no-github`.

Vercel is the primary target, but the application can run on any host that supports the Next.js server runtime. For a self-hosted deployment, start the completed build with `pnpm serve`.

## Acknowledgements

This project began with the excellent [`tailwind-nextjs-starter-blog`](https://github.com/timlrx/tailwind-nextjs-starter-blog) and has since evolved into a separate App Router architecture with an external content bundle and shared design system.

## License

Released under the [MIT License](./LICENSE) © Ahmad Assaf.
