'use client';

import { useState } from 'react';

import { Pagination, POSTS_PER_PAGE } from '@/components/elements/Pagination';
import Search from '@/components/elements/Search';
import Post from '@/components/post/Post';

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
    <div className='mt-10'>
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
