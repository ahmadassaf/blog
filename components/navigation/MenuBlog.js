/**
 * MenuBlog Component
 *
 * @description Blog-specific navigation dropdown component that displays a categorized menu of blog categories.
 * Features a dropdown interface that shows all available blog categories with descriptions and hover effects.
 * This component is used specifically for blog navigation and category browsing.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import React from 'react';

import MenuDropDown from '@/components/elements/DropDown';

/**
 * Renders a dropdown menu for blog categories navigation
 *
 * @description Interactive dropdown component that displays all blog categories in a structured menu.
 * Each category shows its title (with proper formatting) and description. The menu uses hover effects
 * and proper accessibility features. The dropdown is positioned absolutely and centers itself.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.categories - Array of blog category objects
 * @param {string} props.categories[].id - Unique identifier for the category
 * @param {string} props.categories[].title - Display title of the category (may contain hyphens)
 * @param {string} props.categories[].description - Brief description of the category
 *
 * @returns {JSX.Element} Blog categories dropdown menu
 *
 * @example
 * // Basic usage with categories data
 * const categories = [
 *   {
 *     id: 'web-development',
 *     title: 'web-development',
 *     description: 'Posts about web development'
 *   }
 * ];
 * <MenuBlog categories={categories} />
 *
 * @example
 * // Categories with proper formatting
 * <MenuBlog categories={blogCategories} />
 */
const MenuBlog = ({ categories }) => {
  const [ menuBlogOpen, setMenuBlogOpen ] = React.useState(false);

  return (<>

    <MenuDropDown name='Categories' menuDropDownOpen={ menuBlogOpen } setMenuDropDownOpen={ setMenuBlogOpen }></MenuDropDown>

    {menuBlogOpen ? (
      <div className='absolute left-1/2 z-50 mt-5 flex w-screen max-w-max -translate-x-1/2 px-3 py-2 top-10'>
        <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
          <div className='p-4'>

            {categories.map((category) => (
              <div key={ category.id } className='group relative flex rounded-lg p-3 hover:bg-gray-50'>
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

        </div>
      </div>
    ) : null}

  </>);
};

export default MenuBlog;
