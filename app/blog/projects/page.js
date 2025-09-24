/**
 * Projects Page Component
 *
 * @description Displays GitHub projects in a responsive grid with animated hover effects.
 * Each project card shows stars, forks, programming language, and links to detailed view.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

'use client';

import { GoRepoForked, GoStar } from 'react-icons/go';
import { allProjects } from 'contentlayer/generated';
import Link from 'next/link';

import { cn } from '@/components/utils/TailwindUtils';
import GithubColors from '@/data/meta/githubMetaColors';

/**
 * Projects page component displaying GitHub projects in an interactive grid
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes for styling
 * @returns {JSX.Element} Projects page with animated project cards
 *
 * @example
 * <Projects className="custom-grid" />
 */
export default function Projects({ className }) {

  return (
    <>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Projects
          </h1>
        </div>
        <div>
          <div className={ cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10', className) }>
            {allProjects.map((project) => (
              <Link
                href={ `/blog/${project.externalLink}` }
                key={ project?.externalLink }
                className='block h-full w-full'
              >
                <ProjectCard project={ project } />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Clean project card component following blog design patterns
 *
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @returns {JSX.Element} Clean project card with typography-focused design
 */
export const ProjectCard = ({ project }) => (
  <article className='group block p-4 border border-gray-200 dark:border-[#303030] rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 h-full bg-white dark:bg-gray-900'>
    <div className='flex flex-col h-full'>
      {/* Title */}
      <h3 className='text-lg font-semibold leading-tight tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2'>
        {project.title}
      </h3>

      {/* Description */}
      <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-grow mb-3'>
        {project.subtitle}
      </p>

      {/* Metadata - GitHub stats at bottom */}
      <div className='flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500'>
        <div className='flex items-center gap-1'>
          <GoStar className='w-3 h-3' />
          <span>{project.meta.stargazers_count}</span>
        </div>
        <div className='flex items-center gap-1'>
          <GoRepoForked className='w-3 h-3' />
          <span>{project.meta.forks_count}</span>
        </div>
        {project.meta.language && (
          <div className='flex items-center gap-1'>
            <span
              className='rounded-sm inline-block h-2 w-2'
              style={{ 'background': GithubColors[project.meta.language] }}
            ></span>
            <span>{project.meta.language}</span>
          </div>
        )}
      </div>
    </div>
  </article>
);

/**
 * Project metadata component displaying GitHub stats and language
 *
 * @param {Object} props - Component props
 * @param {number} props.StargazersCount - Number of GitHub stars
 * @param {number} props.ForksCount - Number of GitHub forks
 * @param {string} props.Language - Primary programming language
 * @returns {JSX.Element} Metadata section with GitHub statistics
 *
 * @example
 * <CardMeta StargazersCount={42} ForksCount={12} Language="JavaScript" />
 */
export const CardMeta = ({ StargazersCount, ForksCount, Language }) => (
  <div className='flex group/meta mt-4'>
    <div className='flex items-center space-x-3 pr-4'>
      <GoStar className='group-hover/meta:stroke-blue-700 dark:outline-white'/>
      <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{StargazersCount}</span>
    </div>
    <div className='flex items-center space-x-3 pr-4'>
      <GoRepoForked className='group-hover/meta:stroke-blue-700'/>
      <span className='text-xs font-medium text-gray-900 dark:text-gray-100 group-hover/meta:text-blue-700'>{ForksCount}</span>
    </div>
    <div className='flex items-center space-x-3'>
      <span className={ `rounded-sm inline-block h-3 w-3` } style={{ 'background': `${GithubColors[Language]}` }}></span>
      <span className='text-xs font-medium text-gray-90 dark:text-gray-100 group-hover/meta:text-blue-700'>{Language}</span>
    </div>
  </div>
);
