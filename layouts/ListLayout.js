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
  POSTS_PER_PAGE,
  Search,
  Typography } from '@gaudi/design-system';

import PostPreview from '@/layouts/PostPreview';

/**
 * List layout component for displaying blog posts with search and pagination
 *
 * @description Renders a list of blog posts with optional search functionality and pagination controls.
 * When `paginationURL` and `baseURL` are provided, pagination renders real links so every page is
 * crawlable (page 1 resolves to the base URL, subsequent pages to the pagination URL). When
 * `currentPage`/`totalPages` are provided the posts are treated as a pre-sliced page; otherwise the
 * component slices the first page itself. Without pagination URLs it falls back to client-side paging.
 *
 * @param {Object} props - Component props
 * @param {Array} props.posts - Array of post objects to display
 * @param {boolean} [props.filter=true] - Whether to show the search filter
 * @param {string} [props.listTitle] - Optional page heading rendered above the list
 * @param {string} [props.titleAs='h1'] - Heading element for the list title (pass 'h2' when composed under a page h1)
 * @param {string} [props.className] - Additional CSS classes applied to the list title
 * @param {string} [props.baseURL] - Base URL for page 1 of the pagination links
 * @param {string} [props.paginationURL] - URL prefix for pagination links (pages 2+)
 * @param {number} [props.currentPage] - Current page number for pre-sliced posts
 * @param {number} [props.totalPages] - Total number of pages for pre-sliced posts
 *
 * @returns {JSX.Element} The rendered list layout component
 *
 * @example
 * <ListLayout
 *   posts={pagePosts}
 *   listTitle="Machine Learning Posts"
 *   baseURL="blog"
 *   paginationURL="blog/page"
 *   currentPage={1}
 *   totalPages={5}
 * />
 */
export default function ListLayout({ posts, filter = true, listTitle, titleAs = 'h1', className, baseURL, paginationURL, currentPage = 1, totalPages }) {

  const [ searchValue, setSearchValue ] = useState('');
  const [ clientPage, setClientPage ] = useState(1);

  const hasPaginationLinks = Boolean(paginationURL && baseURL);
  const isPreSliced = hasPaginationLinks && Boolean(totalPages);

  const searchTerm = searchValue.toLowerCase();
  const filteredBlogPosts = searchTerm ? posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ');

    return searchContent.toLowerCase().includes(searchTerm);
  }) : posts;

  const activePage = hasPaginationLinks ? currentPage : clientPage;
  const pageCount = isPreSliced ? totalPages : Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);
  const startIndex = (activePage - 1) * POSTS_PER_PAGE;
  const displayPosts = searchValue || isPreSliced ? filteredBlogPosts : filteredBlogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Build crawlable pagination hrefs: page 1 maps to the base URL, later pages to the pagination URL
  const getPageHref = (page) => (page === 1 ? `/${baseURL}` : `/${paginationURL}/${page}`);

  // Client-side fallback paging for callers without static pagination routes
  const handlePageChange = (newPage) => {
    if (newPage === clientPage || newPage < 1 || newPage > pageCount) return;

    setClientPage(newPage);
  };

  // Reset pagination when search changes
  const handleSearchChange = (value) => {
    setSearchValue(value);
    setClientPage(1);
  };

  return (
    <div>
      <div>
        { listTitle && (
          <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
            <Typography variant='title-md' as={ titleAs } className={ className }>
              {listTitle}
            </Typography>
          </div>
        ) }

        { filter && <Search setSearchValue={ handleSearchChange }></Search> }

        <ul className='pt-6'>
          {!filteredBlogPosts.length && (
            <li className='py-16 text-center'>
              <Typography variant='heading-sm' as='p' className='mb-2'>
                No posts found
              </Typography>
              <Typography variant='paragraph-sm'>
                {searchValue ? `Nothing matches “${searchValue}”. Try a shorter or different search.` : 'There is nothing published here yet — new writing will land soon.'}
              </Typography>
            </li>
          )}
          {displayPosts.map((frontMatter) => (
            <PostPreview key={ frontMatter.slug } frontMatter={ frontMatter } />
          ))}
        </ul>

        {pageCount > 1 && !searchValue && (
          <PaginationBar
            currentPage={ activePage }
            totalPages={ pageCount }
            getHref={ hasPaginationLinks ? getPageHref : undefined }
            onPageChange={ hasPaginationLinks ? undefined : handlePageChange }
          />
        )}
      </div>
    </div>
  );
}
