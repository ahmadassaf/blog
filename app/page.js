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
          <h1 className='uppercase text-3xl font-extrabold leading-9 text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-7xl md:leading-14'>
            {siteMetadata.author}
          </h1>
          <h1 className='text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl sm:leading-10 md:text-3xl md:leading-14'>
            <TextHighlight className='text-black dark:text-white'>
              AI and Machine Learning Leader, Mentor and Advisor
            </TextHighlight>
          </h1>
          <h2 className='text-xl leading-8 max-sm:py-4 text-gray-600 dark:text-gray-300'>{`${siteMetadata.description}`}</h2>
          <h2>A driven AI and Machine Learning (ML) leader with a passion for discovering solutions to create the future of work through my current role as <strong >VP of AI and Data <Link className='text-blue-600' href='https://beamery.com'>@Beamery</Link></strong>. As one of the founding engineers, I have built and scaled engineering and data science teams and helped Beamery become one of the latest tech unicorns.</h2>
          <h2>I am a Knowledge Graph and Semantic Web Enthusiast (<strong>PhD in Semantic Web and Information Retrieval</strong>) with <Link className='text-blue-600' href='/blog/publications'>publications</Link> on Linked Data, Data Quality and Recommender Systems.</h2>
          <h2>I am currently leading the team working on various exciting AI and Machine Learning technologies, from Natural Language Processing (NLP) methods for text understanding and generation, entity disambiguation and reconciliation, and Large Language Models (LLMs) to Deep Learning (DL) methods such as Convolutional Neural Networks (CNNs) and Generative Adversarial Networks (GANs) for recommender systems and personalization.</h2>
          <LauncherShortcut />
        </div>
        <FeaturedPostsLayout />
        <ListLayout posts={ displayPosts.slice(0, 6) } linkAllPosts={ true } listTitle='Latest Posts' filter={ false }/>
        <Link href='/blog' className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 float-right border-none' aria-label='all posts' >
                All Posts
        </Link>
      </div>
    </>
  );
}
