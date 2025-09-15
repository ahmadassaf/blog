/**
 * MenuMain Component
 *
 * @description Main navigation dropdown component that displays both blog categories and recent posts.
 * This comprehensive navigation menu combines category browsing with recent post discovery,
 * providing users with multiple pathways to explore blog content. Features a two-section layout
 * with categories at the top and recent posts at the bottom.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

import MenuDropDown from '@/components/elements/DropDown';
import Link from '@/components/elements/Link';
import formatDate from '@/lib/utils/formatDate';

/**
 * Renders the main navigation dropdown with categories and recent posts
 *
 * @description Comprehensive dropdown menu that displays blog categories in the upper section
 * and the three most recent blog posts in a highlighted lower section. Each category shows
 * its title and description, while recent posts display publication date and title with
 * proper formatting and hover effects.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.categories - Array of blog category objects
 * @param {string} props.categories[].id - Unique identifier for the category
 * @param {string} props.categories[].title - Display title of the category
 * @param {string} props.categories[].description - Brief description of the category
 * @param {Array<Object>} props.allPosts - Array of all blog post objects (recent 3 will be shown)
 * @param {string} props.allPosts[].slug - URL slug for the post
 * @param {string} props.allPosts[].title - Title of the blog post
 * @param {string} props.allPosts[].date - Publication date of the post (ISO format)
 *
 * @returns {JSX.Element} Main navigation dropdown with categories and recent posts
 *
 * @example
 * // Basic usage with categories and posts
 * const categories = [{ id: 'tech', title: 'Technology', description: 'Tech posts' }];
 * const posts = [{ slug: 'post-1', title: 'My Post', date: '2024-01-01' }];
 * <MenuMain categories={categories} allPosts={posts} />
 *
 * @example
 * // Used in main navigation header
 * <MenuMain categories={blogCategories} allPosts={recentPosts} />
 */
const MenuMain = ({ categories, allPosts }) => {
  const [ menuBlogOpen, setMenuBlogOpen ] = React.useState(false);

  return (<>

    <MenuDropDown name='Blog' menuDropDownOpen={ menuBlogOpen } setMenuDropDownOpen={ setMenuBlogOpen }></MenuDropDown>

    {menuBlogOpen ? (
      <div className='absolute left-1/2 z-50 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 top-10'>
        <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
          <div className='p-3'>

            {categories.map((category) => (
              <div key={ category.id } className='group relative flex rounded-lg px-3 py-2 hover:bg-gray-50'>
                <div>
                  <a href={ `/blog/categories/${category.id}` } className='font-semibold text-gray-900 hover:text-blue-600 capitalize'>
                    {category.title.replace('-', ' ')}
                    <span className='absolute inset-0'></span>
                    <p className='mt-1 text-gray-600 font-light text-s'>{category.description}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className='bg-blue-50 p-3'>
            <div className='flex justify-between px-3 py-2'>
              <h3 className='text-sm font-semibold leading-6 text-gray-500'>Recent posts</h3>
              <Link href={ `/blog` } className='text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600' >See all &rarr;</Link>
            </div>
            <ul role='list' className='px-3 py-2'>
              {allPosts.slice(0, 3).map((post) => (
                <li key={ post.slug } className='py-1 relative'>
                  <time dateTime={ post.date } className='block text-xs leading-6 text-gray-600 font-light'>{formatDate(post.date)}</time>
                  <a href={ `/blog/${post.slug}` } className='block truncate text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600'>
                    {post.title}
                    <span className='absolute inset-0'></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    ) : null}

  </>);
};

export default MenuMain;
