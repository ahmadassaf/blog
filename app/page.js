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

import { Button, CmdLauncherShortcut, Icon, Link, TextHighlight, Typography } from '@gaudi/design-system';
import { allPosts } from 'contentlayer/generated';

import siteMetadata from '@/data/meta/metadata';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import PostPreview from '@/layouts/PostPreview';
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
    <>
      <div>
        <header className='mb-12 space-y-2 pb-8 pt-12 md:space-y-5'>
          <Typography variant='display-xl' className='uppercase'>
            {siteMetadata.author}
          </Typography>
          <Typography variant='heading-lg' as='h2' className='font-extrabold tracking-tight'>
            <TextHighlight className='box-decoration-clone text-black dark:text-white [-webkit-box-decoration-break:clone]'>
              AI and Machine Learning Leader, Mentor and Advisor
            </TextHighlight>
          </Typography>
          <Typography variant='subtitle-md' as='p' className='max-sm:py-3'>{`${siteMetadata.description}`}</Typography>
          <Typography variant='paragraph-md'>I am a driven AI and Machine Learning leader focused on turning complex technology into useful products. As <strong>CTO <Link tone='blue' href='https://mav9.com'>@Mav9</Link></strong>, I lead technology strategy across applied AI, data platforms, knowledge graphs, and product engineering, helping teams move from promising ideas to reliable systems that create measurable value.</Typography>
          <Typography variant='paragraph-md'>My research background sits at the intersection of Knowledge Graphs, Semantic Web, Information Retrieval, and data quality. I hold a <strong>PhD in Semantic Web and Information Retrieval</strong>, and my <Link tone='blue' href='/blog/publications'>publications</Link> explore Linked Data, recommender systems, dataset quality, and ways to make knowledge easier for both humans and machines to use.</Typography>
          <Typography variant='paragraph-md'>Before Mav9, I was one of the founding engineers at <Link tone='blue' href='https://beamery.com'>Beamery</Link>, where I helped build and scale engineering, AI, and data science teams as the company grew into one of the latest tech unicorns. I use this space to write about AI, data, productivity, engineering practice, and the lessons learned from building intelligent products with real users and real constraints.</Typography>
          <CmdLauncherShortcut />
        </header>
        <section aria-label='Featured and latest posts'>
          <FeaturedPostsLayout posts={ posts } />
          <div className='pb-8'>
            <ListLayout posts={ displayPosts.slice(0, 6) } listTitle='Latest Posts' titleAs='h2' filter={ false }/>
            <div className='flex flex-col gap-4 py-3 md:flex-row md:items-center md:justify-between'>
              <ul role='list' className='flex-1'>
                {displayPosts[6] && <PostPreview frontMatter={ displayPosts[6] } />}
              </ul>
              <div className='flex justify-end md:flex-shrink-0'>
                <Button variant='outline' tone='blue' size='md' href='/blog' aria-label='View all blog posts'>
                  View All Posts
                  <Icon name='ArrowRight' decorative size='xs' />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
