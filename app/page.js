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

import { Button, CmdLauncherShortcut, Icon, Link, Post, TextHighlight, ThoughtsSection, Typography } from '@gaudi/design-system';
import { allPosts, allThoughts } from 'contentlayer/generated';

import siteMetadata from '@/data/meta/metadata';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

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
  const displayPosts = coreContent(sortPosts(allPosts)).filter((post) => !post.featured);
  const displayThoughts = coreContent(sortPosts(allThoughts)).slice(0, 4);

  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='max-w-6xl space-y-3 pt-8 pb-6 md:space-y-4 mb-8'>
          <Typography variant='title-xl' className='uppercase'>
            {siteMetadata.author}
          </Typography>
          <Typography variant='heading-lg' as='h2'>
            <TextHighlight className='text-black dark:text-white'>
              CTO at Mav9, AI and Machine Learning Leader, Mentor and Advisor
            </TextHighlight>
          </Typography>
          <Typography variant='subtitle-md' className='max-w-5xl max-sm:py-3'>{`${siteMetadata.description}`}</Typography>
          <Typography variant='paragraph-md' className='max-w-6xl'>A driven AI and Machine Learning (ML) leader with a passion for building intelligent systems and turning complex technology into useful products through my current role as <strong>CTO <Link tone='blue' href='https://mav9.com'>@Mav9</Link></strong>, where I lead technology strategy across AI, data, knowledge graphs, and product engineering; previously, as one of the founding engineers at <Link tone='blue' href='https://beamery.com'>Beamery</Link>, I built and scaled engineering, AI, and data science teams and helped the company become one of the latest tech unicorns.</Typography>
          <Typography variant='paragraph-md' className='max-w-6xl'>I am a Knowledge Graph and Semantic Web Enthusiast (<strong>PhD in Semantic Web and Information Retrieval</strong>) with <Link tone='blue' href='/blog/publications'>publications</Link> on Linked Data, Data Quality and Recommender Systems.</Typography>
          <CmdLauncherShortcut />
        </div>
        <FeaturedPostsLayout />
        <div className='pb-8'>
          <ListLayout posts={ displayPosts.slice(0, 5) } linkAllPosts={ true } listTitle='Latest Posts' filter={ false }/>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-4'>
            <ul role='list' className='flex-1'>
              {displayPosts[5] && (
                <Post frontMatter={ displayPosts[5] } />
              )}
            </ul>
            <div className='flex justify-end md:flex-shrink-0'>
              <Button variant='outline' tone='blue' size='md' href='/blog' aria-label='View all blog posts'>
                View All Posts
                <Icon name='ArrowRight' decorative size='xs' />
              </Button>
            </div>
          </div>
        </div>
        <ThoughtsSection thoughts={ displayThoughts } />
      </div>
    </>
  );
}
