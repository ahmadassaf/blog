/**
 * Root Layout Component
 *
 * @description The root layout component for the entire Next.js application. This component wraps all pages
 * and provides the fundamental HTML structure, font configuration, meta tags, favicon links, and global styles.
 * It also handles the layout container and theme setup for the entire application.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { ScrollEdges } from '@gaudi/design-system/core/ScrollArea';
import LayoutContainer from '@gaudi/design-system/layout/LayoutContainer';
import CitationTracker from '@gaudi/design-system/mdx/CitationTracker';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { allPosts, allProjects } from 'contentlayer/generated';
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google';

import categories from '@/app/content/categories';
import publications from '@/app/content/publications';
import tags from '@/app/content/tags';
import { metadataGenerator } from '@/data/meta/generator/blog';
import { website } from '@/data/meta/JSON-LD/website';
import siteMetadata from '@/data/meta/metadata';
import NavigationMetadata from '@/data/meta/navigationMetadata';
import SiteLogo from '@/layouts/SiteLogo';
import { pick, published, sortPosts } from '@/lib/utils/contentlayer';
import { titleFromSlug } from '@/lib/utils/slugs.mjs';

import '@gaudi/design-system/global.css';
import 'remark-github-blockquote-alert/alert.css';
import './responsive.css';

/**
 * Default metadata for the application including title, description, Open Graph
 * data, and other SEO-related metadata. Used as the fallback for pages that
 * don't specify their own metadata.
 */
export const metadata = {
  ...metadataGenerator(),
  'icons': {
    'apple': '/static/favicons/apple-touch-icon.png',
    'icon': [
      { 'sizes': '32x32', 'type': 'image/png', 'url': '/static/favicons/favicon-32x32.png' },
      { 'sizes': '16x16', 'type': 'image/png', 'url': '/static/favicons/favicon-16x16.png' }
    ],
    'other': [{ 'color': '#fff', 'rel': 'mask-icon', 'url': '/static/favicons/safari-pinned-tab.svg' }]
  },
  'other': {
    'msapplication-TileColor': '#222425'
  }
};

/**
 * Generates viewport configuration for the application
 *
 * @description Generates viewport settings for responsive design and mobile optimization.
 * Separated from metadata to comply with Next.js 15+ requirements.
 *
 * @returns {Object} The viewport configuration object
 */
export function generateViewport() {
  return {
    'initialScale': 1,
    'themeColor': [
      { 'color': '#fff', 'media': '(prefers-color-scheme: light)' },
      { 'color': '#222425', 'media': '(prefers-color-scheme: dark)' }
    ],
    'width': 'device-width'
  };
}

/*
 * Plus Jakarta Sans for all text, exposed as a variable that app/responsive.css maps onto Gaudi's font
 * tokens. next/font only accepts unquoted option keys.
 */
// eslint-disable-next-line quote-props
const font = PlusJakartaSans({ display: 'swap', subsets: [ 'latin' ], variable: '--font-body' });

const footerProps = {
  'brandDescription': 'Writing about AI, semantic systems, data products, and engineering practice.',
  'copyrightName': siteMetadata.author,
  'sections': [
    {
      'links': [
        { 'href': '/about', 'label': 'Summary' },
        { 'href': '/blog/publications', 'label': 'Publications' },
        { 'href': '/blog/projects', 'label': 'Projects' }
      ],
      'title': 'About'
    },
    {
      'links': categories.slice(0, 4).reverse().map((category) => {
        return {
          'href': category.href,
          'label': titleFromSlug(category.title)
        };
      }),
      'title': 'Blog'
    },
    {
      'links': sortPosts(published(allProjects)).slice(0, 4).map((project) => {
        return {
          'href': `/blog/${project.externalLink}`,
          'label': project.title
        };
      }),
      'title': 'Projects'
    }
  ],
  'socialLinks': [
    { 'href': `mailto:${siteMetadata.email}`, 'kind': 'mail' },
    { 'href': siteMetadata.github, 'kind': 'github' },
    { 'href': siteMetadata.youtube, 'kind': 'youtube' },
    { 'href': siteMetadata.linkedin, 'kind': 'linkedin' },
    { 'href': siteMetadata.twitter, 'kind': 'twitter' }
  ],
  'variant': 'editorial'
};

/*
 * The design system no longer imports site data itself: navigation, command
 * launcher content, metadata, and JSON-LD all flow in through LayoutContainer
 * props (SiteConfigProvider distributes them to client components).
 */
/*
 * Only the fields the navigation and command launcher actually render are
 * serialized — the full contentlayer documents would ride the RSC payload of
 * every page otherwise.
 */
const MENU_FIELDS = [ 'category', 'date', 'slug', 'subtitle', 'summary', 'title', 'type' ];
const toMenuItems = (docs) => sortPosts(published(docs)).map((doc) => pick(doc, MENU_FIELDS));

const menuProps = {

  // Gaudi's Blog panel: categories and recent posts, or a Categories menu on blog routes.
  'blogLink': { 'href': '/blog', 'title': 'Blog' },
  categories,
  'logo': <SiteLogo />,
  'posts': toMenuItems(allPosts),
  'projects': toMenuItems(allProjects),
  publications,
  tags
};

/*
 * Link previews come from this app's /api/preview route. Gaudi derives no images, so the blog maps
 * link kinds to its own image sources: YouTube thumbnails, GitHub cards, Wikipedia's excerpt instead
 * of an image, and a page screenshot otherwise. Plain data, so the server layout can pass it.
 */
const preview = {
  'endpoint': '/api/preview',
  'resolveImage': {
    'default': 'https://api.microlink.io/?url={url}&screenshot=true&meta=false&embed=screenshot.url',
    'repository': 'https://opengraph.githubassets.com/1/{owner}/{repo}',
    'video': 'https://img.youtube.com/vi/{videoId}/maxresdefault.jpg',
    'wikipedia': null
  }
};

/**
 * Root layout component that wraps all pages in the application
 *
 * @description Provides the HTML document structure, head elements, font loading, favicon links,
 * and the main layout container. This component is automatically used by Next.js for all pages
 * and ensures consistent styling and structure across the entire application.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The page content to be rendered within the layout
 *
 * @returns {JSX.Element} The complete HTML document structure with layout
 *
 * @example
 * // Automatically used by Next.js for all pages
 * <RootLayout>
 *   <HomePage />
 * </RootLayout>
 */
export default function RootLayout({ children }) {
  return (
    <html lang='en' className={ font.variable } suppressHydrationWarning>
      <body>
        <CitationTracker />
        <LayoutContainer
          analytics={ <Analytics /> }
          footerProps={ footerProps }
          jsonLd={ website }
          menuProps={ menuProps }
          metadata={ siteMetadata }
          navigation={ NavigationMetadata }
          preview={ preview }
        >
          {children}
        </LayoutContainer>
        <SpeedInsights />
        {/* A soft blur where the page continues below; articles turn it off (app/responsive.css). */}
        <ScrollEdges edges='bottom' />
      </body>
    </html>
  );
}
