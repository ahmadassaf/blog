/**
 * Home Page Component
 *
 * @description The main homepage component that displays the author's profile and featured posts.
 * This serves as the entry point for the blog/portfolio website, showcasing the author's expertise in AI and ML
 * along with their latest content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { CmdLauncherShortcut, Link, TextHighlight, Typography } from '@gaudi/design-system';
import Preview from '@gaudi/design-system/mdx/Preview';
import { allPosts } from 'contentlayer/generated';

import siteMetadata from '@/data/meta/metadata';
import FeaturedPostsLayout from '@/layouts/FeaturedLayout';
import { coreContent, published, sortPosts } from '@/lib/utils/contentlayer';

/**
 * Home page component that renders the main landing page
 *
 * @description Displays the author's profile information and featured posts section.
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

  return (
    <>
      <div>
        <header className='mb-6 space-y-2 pb-5 pt-6 md:space-y-3 md:pt-8'>
          <Typography variant='author-name' className='uppercase'>
            {siteMetadata.author}
          </Typography>
          <Typography variant='heading-lg' as='h2' className='font-bold tracking-tight'>
            <TextHighlight className='box-decoration-clone text-black dark:text-white [-webkit-box-decoration-break:clone]'>
              AI and Machine Learning Leader, Mentor and Advisor
            </TextHighlight>
          </Typography>
          <Typography variant='paragraph-md' as='p' className='text-base leading-7 md:text-base'>{`${siteMetadata.description}`}</Typography>
          <Typography variant='paragraph-md' className='text-base leading-7 md:text-base'>I am a driven AI and Machine Learning leader focused on turning complex technology into useful products. As <strong>CTO</strong> of <Preview url='https://mav9.com' title='Mav9' />, I lead technology strategy across applied AI, data platforms, knowledge graphs, and product engineering, helping teams move from promising ideas to reliable systems that create measurable value.</Typography>
          <Typography variant='paragraph-md' className='text-base leading-7 md:text-base'>My research background sits at the intersection of Knowledge Graphs, Semantic Web, Information Retrieval, and data quality. I hold a <strong>PhD in Semantic Web and Information Retrieval</strong>, and my <Link tone='blue' href='/blog/publications'>publications</Link> explore Linked Data, recommender systems, dataset quality, and ways to make knowledge easier for both humans and machines to use.</Typography>
          <Typography variant='paragraph-md' className='text-base leading-7 md:text-base'>Before Mav9, I was one of the founding engineers at <Preview url='https://beamery.com' title='Beamery' />, where I helped build and scale engineering, AI, and data science teams as the company grew into one of the latest tech unicorns. I use this space to write about AI, data, productivity, engineering practice, and the lessons learned from building intelligent products with real users and real constraints.</Typography>
          <div className='[&>div]:!mt-0'>
            <CmdLauncherShortcut />
          </div>
        </header>
        <FeaturedPostsLayout posts={ posts } />
      </div>
    </>
  );
}
