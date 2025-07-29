/**
 * List Layout Component
 *
 * @description A flexible layout component for displaying lists of blog posts with search and pagination functionality.
 * Supports filtering posts by search terms, pagination controls, and responsive design. Used across
 * various blog listing pages including main blog page, category pages, and tag pages.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';

import { Pagination, POSTS_PER_PAGE } from '@/components/elements/Pagination';
import Search from '@/components/elements/Search';
import Post from '@/components/post/Post';

/**
 * List layout component for displaying blog posts with search and pagination
 *
 * @description Renders a list of blog posts with optional search functionality and pagination controls.
 * The component handles client-side filtering of posts based on search terms and manages
 * the display state for both paginated and filtered views.
 *
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of post objects to display
 * @param {boolean} [props.filter=true] - Whether to show the search filter
 * @param {string} [props.baseURL] - Base URL for pagination links
 * @param {string} [props.paginationURL] - URL pattern for pagination
 * @param {number} [props.currentPage] - Current page number for pagination
 * @param {number} [props.totalPages] - Total number of pages for pagination
 *
 * @returns {JSX.Element} The rendered list layout component
 *
 * @example
 * <ListLayout
 *   posts={allPosts}
 *   filter={true}
 *   baseURL="/blog"
 *   paginationURL="/blog/page"
 *   currentPage={1}
 *   totalPages={5}
 * />
 */
export default function ListLayout({ posts, filter = true, baseURL, paginationURL, currentPage, totalPages }) {

  const [ searchValue, setSearchValue ] = useState('');
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = { 'currentPage': currentPage || 1, 'totalPages': totalPages || Math.ceil(posts.length / POSTS_PER_PAGE) };
  const filteredBlogPosts = posts.filter((frontMatter) => {

    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');

    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts;

  return (
    <div className='border-0'>
      <div className={ filter ? 'divide-y divide-gray-200 dark:divide-gray-700' : '' }>
        { filter && <Search setSearchValue={ setSearchValue }></Search> }
        <ul className='pt-8'>
          {!filteredBlogPosts.length && 'No posts found'}
          {displayPosts.map((frontMatter) => (
            <Post key={ frontMatter.slug } frontMatter={ frontMatter } />
          ))}
        </ul>
      </div>
      { pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={ pagination.currentPage } totalPages={ pagination.totalPages } paginationURL={ paginationURL } baseURL={ baseURL }/>
      )}
    </div>
  );
}
