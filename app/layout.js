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

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';

import LayoutContainer from '@/components/containers/layoutContainer';
import CodeGroupTabs from '@/components/elements/CodeGroupTabs';
import CitationTracker from '@/components/mdx/CitationTracker';
import { metadataGenertaor } from '@/data/meta/generator/blog';

import '@/css/tailwind.css';
import '@/css/overrides.css';
import '@/css/highlight.css';
import 'katex/dist/katex.css';
import 'remark-github-blockquote-alert/alert.css';

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
  return metadataGenertaor();
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
    'maximumScale': 1,
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
    <html className={ `${font.variable}` } suppressHydrationWarning>
      <link rel='apple-touch-icon' sizes='76x76' href='/static/favicons/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicons/favicon-32x32.png'/>
      <link rel='icon' type='image/png' sizes='16x16' href='/static/favicons/favicon-16x16.png'/>
      <link rel='manifest' href='/static/favicons/site.webmanifest' />
      <link rel='mask-icon' href='/static/favicons/safari-pinned-tab.svg' color='#fff' />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta name='theme-color' media='(prefers-color-scheme: light)' content='#fff' />
      <meta name='theme-color' media='(prefers-color-scheme: dark)' content='#000' />
      <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      <body className='dark:bg-gray-900 bg-white'>
        <CodeGroupTabs />
        <CitationTracker />
        <LayoutContainer>
          {children}
        </LayoutContainer>
        <SpeedInsights />
      </body>
    </html>
  );
}
