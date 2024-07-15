import dynamic from "next/dynamic";
import { cookies } from 'next/headers'

import Aurora from '@/components/elements/Aurora';
import Footer from '@/components/elements/Footer';
import FloatingMenu from '@/components/navigation/FloatingMenu';
import Menu from '@/components/navigation/Menu';
import { website } from '@/data/meta/JSON-LD/website';

const ThemeProvider = dynamic(() => import("@/components/utils/ThemeProvider"), {
  ssr: false,
});

export default function LayoutContainer({ children }) {
  const theme = cookies().get("__theme__")?.value || "system";
  return (
    <div className='bg-white text-black antialiased dark:bg-gray-900 dark:text-white min-w-[414px]'>
      <Aurora>
        <div className='hidden dark:absolute min-h-[50rem] w-full dark:bg-gray-900 dark:bg-dot-white/[0.15] dark:flex items-center justify-center'>
          <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-gray-900 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
        </div>
        <ThemeProvider attribute="class"  defaultTheme={theme} enableSystem/>
        <script async defer data-website-id={ process.env.UMAMI_WEBSITE_ID } src='https://analytics.eu.umami.is/script.js'/>
        <div className='relative isolate mx-auto px-4 sm:px-6 xl:max-w-5xl w-3.5/5 xl:px-0'>
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
