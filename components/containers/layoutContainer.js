import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';

import Aurora from '@/components/elements/Aurora';
import Footer from '@/components/elements/Footer';
import FloatingMenu from '@/components/navigation/FloatingMenu';
import Menu from '@/components/navigation/Menu';
import { website } from '@/data/meta/JSON-LD/website';

const ThemeProvider = dynamic(() => import('@/components/utils/ThemeProvider'), {
  'ssr': false
});

export default function LayoutContainer({ children }) {
  const theme = cookies().get('__theme__')?.value || 'light';

  return (
    <div className='bg-white text-black dark:bg-gray-900 dark:text-white antialiased min-w-[414px]'>

      {/* This is the Aurora backgrounf animation enabled for light mode. It has to wrap all the content */}
      <Aurora>

        {/* This is the dark shape overlay that appears when the dark mode is enabled */}
        <div className='hidden min-h-[50rem] w-full items-center justify-center dark:absolute dark:flex dark:bg-gray-900 dark:bg-dot-white/[0.15]'>
          <div className='absolute flex bg-white items-center justify-center pointer-events-none inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-gray-900'></div>
        </div>

        <ThemeProvider attribute='class' defaultTheme={ theme } enableSystem/>
        {/* Loading the Umami analytics script */}
        <script async defer data-website-id={ process.env.UMAMI_WEBSITE_ID } src='https://analytics.eu.umami.is/script.js'/>

        <div className='relative w-[90%] isolate xl:max-w-7xl px-8'>
          <div className='flex h-screen flex-col justify-between'>
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
