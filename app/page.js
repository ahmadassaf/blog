/**
 * Home Page Component
 *
 * @description The main homepage component that displays the author's profile, featured posts, and latest blog posts.
 * This serves as the entry point for the blog/portfolio website, showcasing the author's expertise in AI and ML
 * along with their latest content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Button, Icon, Link, Typography } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

import siteMetadata from '@/data/meta/metadata';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, published, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Home page component that renders the main landing page
 *
 * @description Displays the author's profile information, featured posts section, and a selection of the latest posts.
 * The page includes a hero section with the author's name, title, description, and a brief bio highlighting their
 * AI/ML expertise and current role at Mav9.
 *
 * @returns {JSX.Element} The rendered home page component
 *
 * @example
 * // This component is automatically rendered for the root route "/"
 * <Home />
 */
export default function Home() {
  const posts = coreContent(sortPosts(published(allPosts)));
  const displayPosts = posts.filter((post) => !post.featured);

  return (
    <div>
      <header className='grid gap-10 border-b border-gray-200 py-10 dark:border-gray-800 md:py-14 lg:grid-cols-[minmax(0,1.45fr)_minmax(15rem,0.55fr)] lg:items-end'>
        <div className='max-w-3xl'>
          <Typography variant='author-name'>
            {siteMetadata.author}
          </Typography>
          <Typography variant='author-role' className='mt-3 max-w-2xl'>
            AI and machine learning leader, mentor, and advisor.
          </Typography>
          <Typography variant='index-feature-summary' className='mt-5 text-pretty'>
            I build useful AI, data products, and engineering systems as CTO at <Link tone='blue' href='https://mav9.com'>Mav9</Link>. This is where I write about applied intelligence, semantic technologies, leadership, and the work of turning complex ideas into reliable products.
          </Typography>
          <div className='mt-6 flex flex-wrap gap-3'>
            <Button href='/blog' tone='blue' size='sm'>
              Read the blog
              <Icon name='ArrowRight' decorative size='xs' />
            </Button>
            <Button href='/about' tone='gray' variant='outline' size='sm'>
              About me
            </Button>
          </div>
        </div>

        <dl className='divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800 lg:border-b-0 lg:border-t-0 lg:border-l lg:pl-8'>
          <div className='py-3 first:pt-0 lg:first:pt-3'>
            <Typography as='dt' variant='metadata'>Current role</Typography>
            <Typography as='dd' variant='paragraph-sm' className='mt-1 text-gray-900 dark:text-gray-100'>CTO, Mav9</Typography>
          </div>
          <div className='py-3'>
            <Typography as='dt' variant='metadata'>Research</Typography>
            <Typography as='dd' variant='paragraph-sm' className='mt-1 text-gray-900 dark:text-gray-100'>PhD, Semantic Web and Information Retrieval</Typography>
          </div>
          <div className='py-3 last:pb-0 lg:last:pb-3'>
            <Typography as='dt' variant='metadata'>Earlier</Typography>
            <Typography as='dd' variant='paragraph-sm' className='mt-1 text-gray-900 dark:text-gray-100'>Founding engineer, Beamery</Typography>
          </div>
        </dl>
      </header>

      <div className='border-b border-gray-200 py-8 dark:border-gray-800 md:py-10'>
        <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
          <Typography id='home-featured-title' variant='index-feature-title' as='h2'>
            Featured writing
          </Typography>
          <Link href='/blog' tone='blue' className='inline-flex items-center gap-2'>
            Browse all writing
            <Icon name='ArrowRight' decorative size='xs' />
          </Link>
        </div>
        <FeaturedPostsLayout
          posts={ posts }
          labelledBy='home-featured-title'
          showSecondary={ false }
          titleAs='h3'
        />
      </div>

      <section aria-label='Latest writing' className='pb-8 pt-8 md:pt-10'>
        <ListLayout posts={ displayPosts.slice(0, 5) } listTitle='Latest writing' titleAs='h2' filter={ false } />
        <div className='flex justify-end pt-3'>
          <Button variant='outline' tone='gray' size='sm' href='/blog' aria-label='View all blog posts'>
            View all posts
            <Icon name='ArrowRight' decorative size='xs' />
          </Button>
        </div>
      </section>
    </div>
  );
}
