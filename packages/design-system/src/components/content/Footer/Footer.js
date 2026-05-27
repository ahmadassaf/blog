/**
 * Footer Component
 *
 * @description Main website footer with navigation links, social media icons,
 * newsletter signup, and copyright information. Features responsive grid layout
 * with categories, projects, and about sections.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allProjects } from 'contentlayer/generated';

import categories from '@/app/content/categories';
import Icon from '@/components/core/Icon';
import Link from '@/components/core/Link';
import NewsletterForm from '@/components/forms/NewsletterForm';
import siteMetadata from '@/data/meta/metadata';
import { sortPosts } from '@/lib/utils/contentlayer';

/**
 * Footer component with navigation and social links
 *
 * @returns {JSX.Element} Complete footer with responsive grid layout
 *
 * @example
 * <Footer />
 */
const Footer = () => (
  <footer aria-labelledby='footer-heading' className='border-t border-gray-200 dark:border-border-dark'>
    <div className='mx-auto py-12 lg:py-16'>
      <div className='xl:grid xl:grid-cols-4 xl:gap-8 max-md:hidden'>
        <div className='grid grid-cols-1 gap-8 xl:col-span-2'>
          <div className='grid md:grid-cols-3 gap-8'>
            {categories.length && (
              <div>
                <h3 className='text-base font-medium text-gray-900 dark:text-white'>Categories</h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {categories.slice(0, 4).reverse().map((category) => (
                    <li key={ category.id }>
                      <Link href={ category.href } variant='muted' className='text-base font-normal capitalize'>
                        {category.title.replace('-', ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className='text-base font-medium text-gray-900 dark:text-white'>Projects</h3>
              <ul role='list' className='mt-4 space-y-4'>
                {sortPosts(allProjects).slice(0, 4).map((project) => (
                  <li key={ project.slug }>
                    <Link href={ project.path } variant='muted' className='text-base font-normal'>
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className='text-base font-medium text-gray-900 dark:text-white'>About</h3>
              <ul role='list' className='mt-4 space-y-4'>
                <li key='summary'>
                  <Link href='/about' variant='muted' className='text-base font-normal'>Summary</Link>
                </li>
                <li key='press'>
                  <Link href='/press' variant='muted' className='text-base font-normal'>Press</Link>
                </li>
                <li key='pub'>
                  <Link href='/blog/publications' variant='muted' className='text-base font-normal'>Publications</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <NewsletterForm />

      </div>
      <div className='mt-8 border-t border-gray-200 dark:border-border-dark pt-8 md:flex md:items-center md:justify-between max-sm:border-none max-sm:p-0 max-sm:m-0 max-md:border-0'>

        <div className='flex space-x-6 md:order-2 sm:justify-center'>
          <Icon kind='mail' href={ `mailto:${siteMetadata.email}` } />
          <Icon kind='github' href={ siteMetadata.github }/>
          <Icon kind='youtube' href={ siteMetadata.youtube } />
          <Icon kind='linkedin' href={ siteMetadata.linkedin } />
          <Icon kind='twitter' href={ siteMetadata.twitter } />
        </div>

        <p className='mt-8 text-base text-gray-400 md:order-1 md:mt-0 sm:text-center'>
            &copy;{`${new Date().getFullYear()} ${siteMetadata.author}. All rights reserved`}
        </p>

      </div>
    </div>
  </footer>
);

export default Footer;
