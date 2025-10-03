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

import { allPosts, allThoughts } from 'contentlayer/generated';

import LauncherShortcut from '@/components/cmd/CmdLauncherShortcut';
import Link from '@/components/elements/Link';
import { TextHighlight } from '@/components/elements/TextHighlight';
import ThoughtsSection from '@/components/thoughts/ThoughtsSection';
import { Button, Typography } from '@/components/ui';
import siteMetadata from '@/data/meta/metadata';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import ListLayout from '@/layouts/ListLayout';
import { coreContent, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Home page component that renders the main landing page
 *
 * @description Displays the author's profile information, featured posts section, and a selection of the latest posts.
 * The page includes a hero section with the author's name, title, description, and a brief bio highlighting their
 * AI/ML expertise and current role at Beamery.
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
        <div className='space-y-2 pt-12 pb-8 md:space-y-5 mb-12'>
          <Typography variant='display-xl' className='uppercase'>
            {siteMetadata.author}
          </Typography>
          <Typography variant='title-md'>
            <TextHighlight className='text-black dark:text-white'>
              AI and Machine Learning Leader, Mentor and Advisor
            </TextHighlight>
          </Typography>
          <Typography variant='subtitle-lg' className='max-sm:py-4'>{`${siteMetadata.description}`}</Typography>
          <Typography variant='paragraph-lg'>A driven AI and Machine Learning (ML) leader with a passion for discovering solutions to create the future of work through my current role as <strong >VP of AI and Data <Link className='text-blue-600' href='https://beamery.com'>@Beamery</Link></strong>. As one of the founding engineers, I have built and scaled engineering and data science teams and helped Beamery become one of the latest tech unicorns.</Typography>
          <Typography variant='paragraph-lg'>I am a Knowledge Graph and Semantic Web Enthusiast (<strong>PhD in Semantic Web and Information Retrieval</strong>) with <Link className='text-blue-600' href='/blog/publications'>publications</Link> on Linked Data, Data Quality and Recommender Systems.</Typography>
          <Typography variant='paragraph-lg'>I am currently leading the team working on various exciting AI and Machine Learning technologies, from Natural Language Processing (NLP) methods for text understanding and generation, entity disambiguation and reconciliation, and Large Language Models (LLMs) to Deep Learning (DL) methods such as Convolutional Neural Networks (CNNs) and Generative Adversarial Networks (GANs) for recommender systems and personalization.</Typography>
          <LauncherShortcut />
        </div>
        <FeaturedPostsLayout />
        <div className='pb-8'>
          <ListLayout posts={ displayPosts.slice(0, 5) } linkAllPosts={ true } listTitle='Latest Posts' filter={ false }/>
          <div className='flex items-center justify-between py-3'>
            <div className='flex-1'>
              {displayPosts[5] && (
                <article className='group'>
                  <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4'>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1 text-sm'>
                        <time
                          dateTime={ displayPosts[5].date }
                          className='font-medium text-gray-500 dark:text-gray-400'
                        >
                          {new Date(displayPosts[5].date).toLocaleDateString(siteMetadata.locale, { 'day': 'numeric', 'month': 'long', 'year': 'numeric' })}
                        </time>
                        {displayPosts[5].category && (
                          <>
                            <span className='text-gray-300 dark:text-gray-600'>·</span>
                            <Link
                              href={ `/blog/categories/${displayPosts[5].category.replace(' ', '-').toLowerCase()}` }
                              className='font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 capitalize text-xs transition-colors duration-200'
                            >
                              {displayPosts[5].category}
                            </Link>
                          </>
                        )}
                      </div>
                      <h3 className='text-lg md:text-xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'>
                        <Link href={ `/blog/${displayPosts[5].slug}` } className='decoration-2 hover:underline underline-offset-2'>
                          {displayPosts[5].title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </article>
              )}
            </div>
            <div className='flex-shrink-0 ml-4'>
              <Button variant='link-primary-md' href='/blog' aria-label='View all blog posts'>
                View All Posts
                <svg className='w-4 h-4 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        <ThoughtsSection thoughts={ displayThoughts } />
      </div>
    </>
  );
}
