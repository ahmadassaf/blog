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

import { allPosts } from 'contentlayer/generated';

import LauncherShortcut from '@/components/cmd/CmdLauncherShortcut';
import Link from '@/components/elements/Link';
import { TextHighlight } from '@/components/elements/TextHighlight';
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
        <ListLayout posts={ displayPosts.slice(0, 6) } linkAllPosts={ true } listTitle='Latest Posts' filter={ false }/>
        <div className='flex justify-end pt-8'>
          <Button variant='link-primary-md' href='/blog' aria-label='View all blog posts'>
            View All Posts
            <svg className='w-4 h-4 transition-transform group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={ 2 } d='M9 5l7 7-7 7' />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}
