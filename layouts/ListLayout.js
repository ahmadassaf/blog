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
import { PaginationBar,
  Post,
  POSTS_PER_PAGE,
  Search } from '@gaudi/design-system';

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
export default function ListLayout({ posts, filter = true }) {

  const [ searchValue, setSearchValue ] = useState('');
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ isLoading, setIsLoading ] = useState(false);

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');

    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  const totalPages = Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const displayPosts = searchValue ? filteredBlogPosts : filteredBlogPosts.slice(startIndex, endIndex);

  const handlePageChange = async(newPage) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;

    setIsLoading(true);

    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 200));
    setCurrentPage(newPage);
    setIsLoading(false);
  };

  // Reset pagination when search changes
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setCurrentPage(1);
  };

  return (
    <div className='border-0'>
      <div>
        { filter && <Search setSearchValue={ handleSearchChange }></Search> }

        <ul className='pt-6'>
          {!filteredBlogPosts.length && 'No posts found'}
          {displayPosts.map((frontMatter) => (
            <Post key={ frontMatter.slug } frontMatter={ frontMatter } />
          ))}
        </ul>

        {totalPages > 1 && !searchValue && (
          <PaginationBar
            currentPage={ currentPage }
            totalPages={ totalPages }
            getHref={ () => '' }
            onPageChange={ isLoading ? undefined : handlePageChange }
          />
        )}
      </div>
    </div>
  );
}
