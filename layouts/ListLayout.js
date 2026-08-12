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

import { useId, useState } from 'react';
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
 * @param {React.ReactNode} [props.beforeList] - Curated content shown between retrieval and the chronological list
 * @param {boolean} [props.filter=true] - Whether to show the search filter
 * @param {string} [props.listTitle] - Optional page heading rendered above the list
 * @param {string} [props.pageDescription] - Optional introductory copy paired with pageTitle
 * @param {string} [props.pageTitle] - Optional page-level heading rendered before retrieval
 * @param {Array} props.posts - Array of post objects to display
 * @param {Array} [props.searchPosts] - Full post collection used when a paginated route is searched
 * @param {string} [props.titleAs='h1'] - Heading element for the list title (pass 'h2' when composed under a page h1)
 * @param {string} [props.className] - Additional CSS classes applied to the list title
 * @param {string} [props.baseURL] - Base URL for page 1 of the pagination links
 * @param {string} [props.paginationURL] - URL prefix for pagination links (pages 2+)
 * @param {number} [props.currentPage] - Current page number for pre-sliced posts
 * @param {number} [props.totalPages] - Total number of pages for pre-sliced posts
 * @param {number} [props.totalCount] - Total post count for a pre-sliced route
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
export default function ListLayout({ beforeList, posts, filter = true, listTitle, pageDescription, pageTitle, searchPosts, titleAs = 'h1', className, baseURL, paginationURL, currentPage = 1, totalCount, totalPages }) {

  const [ searchValue, setSearchValue ] = useState('');
  const [ clientPage, setClientPage ] = useState(1);
  const generatedId = useId();
  const listTitleId = `article-list-title-${generatedId}`;
  const resultsId = `article-results-${generatedId}`;
  const statusId = `article-results-status-${generatedId}`;
  const topTitleId = `article-page-title-${generatedId}`;

  const hasPaginationLinks = Boolean(paginationURL && baseURL);
  const isPreSliced = hasPaginationLinks && Boolean(totalPages);

  const searchTerm = searchValue.trim().toLowerCase();
  const searchablePosts = searchTerm && searchPosts ? searchPosts : posts;
  const filteredBlogPosts = searchTerm ? searchablePosts.filter((frontMatter) => {
    const searchContent = [
      frontMatter.title,
      frontMatter.summary,
      frontMatter.subtitle,
      frontMatter.category,
      ...(frontMatter.tags || [])
    ].filter(Boolean).join(' ');

    return searchContent.toLowerCase().includes(searchTerm);
  }) : searchablePosts;

  let activePage = clientPage;
  let pageCount = Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);

  if (!searchTerm && hasPaginationLinks) activePage = currentPage;
  if (!searchTerm && isPreSliced) pageCount = totalPages;

  const startIndex = (activePage - 1) * POSTS_PER_PAGE;
  const displayPosts = !searchTerm && isPreSliced ? filteredBlogPosts : filteredBlogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const articleCount = searchTerm ? filteredBlogPosts.length : totalCount ?? searchPosts?.length ?? posts.length;
  const articleLabel = articleCount === 1 ? 'article' : 'articles';
  const statusText = searchTerm ? `${articleCount} ${articleLabel} matching “${searchValue.trim()}”` : `Search ${articleCount} ${articleLabel}`;
  const topTitle = pageTitle || listTitle;
  const topTitleAs = pageTitle ? 'h1' : titleAs;
  const topTitleVariant = topTitleAs === 'h1' ? 'title-md' : 'index-feature-title';
  const showListTitle = Boolean(pageTitle && listTitle);
  const postTitleAs = topTitleAs === 'h1' && !showListTitle ? 'h2' : 'h3';
  let resultsLabelledBy;

  if (topTitle) resultsLabelledBy = showListTitle ? listTitleId : topTitleId;

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
      {topTitle ? (
        <header className='pb-5'>
          <Typography id={ topTitleId } variant={ topTitleVariant } as={ topTitleAs } className={ `${topTitleAs === 'h1' ? 'leading-9 sm:leading-10' : ''} ${className || ''}` }>
            {topTitle}
          </Typography>
          {pageDescription ? (
            <Typography variant='paragraph-md' className='mt-2 max-w-2xl text-base leading-7'>
              {pageDescription}
            </Typography>
          ) : null}
        </header>
      ) : null}

      {filter ? (
        <div className='mb-8 max-w-xl'>
          <Search
            resultsId={ resultsId }
            setSearchValue={ handleSearchChange }
            value={ searchValue }
          />
          <Typography
            id={ statusId }
            variant='paragraph-sm'
            role='status'
            aria-live='polite'
            aria-atomic='true'
            className='mt-2'
          >
            {statusText}
          </Typography>
        </div>
      ) : null}

      {!searchTerm && beforeList ? <div>{beforeList}</div> : null}

      {showListTitle ? (
        <div className='pb-2'>
          <Typography id={ listTitleId } variant='index-feature-title' as={ titleAs } className={ className }>
            {searchTerm ? 'Search results' : listTitle}
          </Typography>
        </div>
      ) : null}

      <section
        aria-label={ topTitle ? undefined : 'Articles' }
        aria-labelledby={ resultsLabelledBy }
      >
        <ul id={ resultsId } aria-describedby={ filter ? statusId : undefined } className='pt-2'>
          {!filteredBlogPosts.length && (
            <li className='py-12 text-center'>
              <Typography variant='heading-sm' as='p' className='mb-2'>
                No posts found
              </Typography>
              <Typography variant='paragraph-sm'>
                {searchValue ? `Nothing matches “${searchValue}”. Try a shorter or different search.` : 'There is nothing published here yet — new writing will land soon.'}
              </Typography>
            </li>
          )}
          {displayPosts.map((frontMatter) => (
            <PostPreview key={ frontMatter.slug } frontMatter={ frontMatter } titleAs={ postTitleAs } />
          ))}
        </ul>

        {pageCount > 1 && (
          <PaginationBar
            currentPage={ activePage }
            totalPages={ pageCount }
            getHref={ hasPaginationLinks && !searchTerm ? getPageHref : undefined }
            onPageChange={ hasPaginationLinks && !searchTerm ? undefined : handlePageChange }
          />
        )}
      </section>
    </div>
  );
}
