/**
 * Layout Container Component
 *
 * @description The main layout wrapper component that provides the overall structure and visual design for all pages.
 * It includes the Aurora background animation, theme provider, navigation components, analytics, and structured data.
 * This component serves as the root layout for the entire application.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Analytics } from '@vercel/analytics/react';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

import Aurora from '@/components/elements/Aurora';
import Footer from '@/components/elements/Footer';
import FloatingMenu from '@/components/navigation/FloatingMenu';
import Menu from '@/components/navigation/Menu';
import { website } from '@/data/meta/JSON-LD/website';
import siteMetadata from '@/data/meta/metadata';

const ThemeProvider = dynamic(() => import('@/components/utils/ThemeProvider'));

/**
 * Main layout container component that wraps all page content
 *
 * @description Provides the foundational layout structure including theme management, background animations,
 * navigation components, analytics integration, and structured data. The component handles both light and dark
 * mode themes with appropriate background animations and overlays.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The page content to be rendered within the layout
 *
 * @returns {Promise<JSX.Element>} The rendered layout container component
 *
 * @example
 * <LayoutContainer>
 *   <HomePage />
 * </LayoutContainer>
 */
export default async function LayoutContainer({ children }) {
  const themeCookie = await cookies();
  const theme = themeCookie.get('__theme__')?.value || siteMetadata.theme;

  return (
    <div className='bg-white text-black dark:bg-gray-900 dark:text-white antialiased'>

      {/* This is the Aurora backgrounf animation enabled for light mode. It has to wrap all the content */}
      <Aurora>

        {/* This is the dark shape overlay that appears when the dark mode is enabled */}
        <div className='hidden min-h-[50rem] w-full items-center justify-center dark:absolute dark:flex dark:bg-gray-900 dark:bg-dot-white/[0.15]'>
          <div className='absolute flex bg-white items-center justify-center pointer-events-none inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-gray-900'></div>
        </div>

        <ThemeProvider attribute='class' defaultTheme={ theme } enableSystem/>
        <Analytics />

        <div className='relative w-[95%] xl-w[90%] isolate xl:max-w-6xl px-8 min-w-[410px]'>
          <div className='flex min-h-screen flex-col justify-between'>
            <FloatingMenu/>
            <Menu />
            <script type='application/ld+json' dangerouslySetInnerHTML={{ '__html': JSON.stringify(website()) }} key='jsonld'/>
            <main className='mb-4'>{children}</main>
            <Footer />
          </div>
        </div>

      </Aurora>

    </div>
  );
}
