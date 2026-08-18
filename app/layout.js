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

import LayoutContainer from '@gaudi/design-system/components/layout/LayoutContainer';
import CitationTracker from '@gaudi/design-system/components/mdx/CitationTracker';
import CodeGroupTabs from '@gaudi/design-system/components/mdx/CodeGroupTabs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { allPosts, allProjects } from 'contentlayer/generated';
import { Inter } from 'next/font/google';

import categories from '@/app/content/categories';
import publications from '@/app/content/publications';
import tags from '@/app/content/tags';
import { metadataGenertaor } from '@/data/meta/generator/blog';
import { website } from '@/data/meta/JSON-LD/website';
import siteMetadata from '@/data/meta/metadata';
import NavigationMetadata from '@/data/meta/navigationMetadata';
import { pick, published, sortPosts } from '@/lib/utils/contentlayer';

import '@gaudi/design-system/global.css';
import 'remark-github-blockquote-alert/alert.css';
import './responsive.css';

/**
 * Generates metadata for the application
 *
 * @description Generates the default metadata for the application including title, description,
 * Open Graph data, and other SEO-related metadata. This metadata is used as the fallback
 * for pages that don't specify their own metadata.
 *
 * @returns {Promise<Object>} The metadata object for the application
 */
export async function generateMetadata() {
  const base = await metadataGenertaor();

  return {
    ...base,
    'icons': {
      'apple': '/static/favicons/apple-touch-icon.png',
      'icon': [
        { 'sizes': '32x32', 'type': 'image/png', 'url': '/static/favicons/favicon-32x32.png' },
        { 'sizes': '16x16', 'type': 'image/png', 'url': '/static/favicons/favicon-16x16.png' }
      ],
      'other': [{ 'color': '#fff', 'rel': 'mask-icon', 'url': '/static/favicons/safari-pinned-tab.svg' }]
    },
    'manifest': '/static/favicons/site.webmanifest',
    'other': {
      'msapplication-TileColor': '#222425'
    }
  };
}

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

/**
 * Inter font configuration for the application
 *
 * @description Configures the Inter font family with multiple weights and Latin subset.
 * The font is set up as a CSS variable for use throughout the application.
 */
// eslint-disable-next-line quote-props, sort-keys, sort-keys-fix/sort-keys-fix
export const font = Inter({ subsets: [ 'latin' ], weight: [ '400', '500', '600', '700', '800' ], variable: '--font-space-inter' });

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
          'label': category.title.replace('-', ' ')
        };
      }),
      'title': 'Blog'
    },
    {
      'links': sortPosts(allProjects).slice(0, 4).map((project) => {
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
const MENU_FIELDS = [ 'category', 'date', 'description', 'externalLink', 'slug', 'subtitle', 'summary', 'title', 'type' ];
const toMenuItems = (docs) => sortPosts(published(docs)).map((doc) => pick(doc, MENU_FIELDS));

const menuProps = {
  categories,
  'posts': toMenuItems(allPosts),
  'projects': toMenuItems(allProjects),
  publications,
  tags
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
    <html lang='en' className={ `${font.variable}` } suppressHydrationWarning>
      <body>
        <CodeGroupTabs />
        <CitationTracker />
        <LayoutContainer
          footerProps={ footerProps }
          jsonLd={ website }
          menuProps={ menuProps }
          metadata={ siteMetadata }
          navigation={ NavigationMetadata }
        >
          {children}
        </LayoutContainer>
        <SpeedInsights />
      </body>
    </html>
  );
}
