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

import { Card, Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';
import { allProjects } from 'contentlayer/generated';

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
          <Typography variant='title-xl'>
            Projects
          </Typography>
        </div>
        <div>
          <Grid columns='3' gap='md' className={ `py-10 ${className || ''}` }>
            {allProjects.map((project) => (
              <Link
                href={ `/blog/${project.externalLink}` }
                key={ project?.externalLink }
                variant='bare'
                className='block h-full'
              >
                <ProjectCard project={ project } />
              </Link>
            ))}
          </Grid>
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
  <Card interactive className='h-full' variant='outline'>
    <article className='flex h-full flex-col'>
      <Typography variant='heading-sm' as='h3' className='mb-2'>
        {project.title}
      </Typography>

      <Typography variant='paragraph-sm' className='mb-3 flex-grow'>
        {project.subtitle}
      </Typography>

      <Typography as='div' variant='metadata' className='flex items-center gap-3'>
        <div className='flex items-center gap-1'>
          <Icon name='Star' size='xs' decorative />
          <span>{project.meta.stargazers_count}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Icon name='Fork' size='xs' decorative />
          <span>{project.meta.forks_count}</span>
        </div>
        {project.meta.language && (
          <Pill tone='gray' variant='soft' size='xs'>
            {project.meta.language}
          </Pill>
        )}
      </Typography>
    </article>
  </Card>
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
  <div className='flex mt-4 items-center gap-3'>
    <div className='flex items-center space-x-3 pr-4'>
      <Icon name='Star' decorative />
      <Typography variant='metadata'>{StargazersCount}</Typography>
    </div>
    <div className='flex items-center space-x-3 pr-4'>
      <Icon name='Fork' decorative />
      <Typography variant='metadata'>{ForksCount}</Typography>
    </div>
    <Pill tone='gray' variant='soft' size='xs'>{Language}</Pill>
  </div>
);
