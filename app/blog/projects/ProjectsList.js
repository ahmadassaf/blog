/**
 * Projects List Component
 *
 * @description Presentational component for the projects page. Displays GitHub
 * projects in a responsive grid. Each project card shows stars, forks,
 * programming language, and links to detailed view.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { Card, Grid, Icon, Link, Pill, Typography } from '@gaudi/design-system';

/**
 * Projects list displaying GitHub projects in an interactive grid
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.projects - Project objects with title, subtitle, link, and GitHub stats
 * @returns {JSX.Element} Projects grid with animated project cards
 *
 * @example
 * <ProjectsList projects={projects} />
 */
export default function ProjectsList({ projects }) {

  return (
    <>
      <div className='mx-auto max-w-6xl divide-y divide-gray-200 dark:divide-gray-700'>
        <header className='space-y-2 pt-2 pb-6'>
          <Typography variant='title-md'>
            Projects
          </Typography>
        </header>
        <Grid columns='3' gap='sm' className='py-5'>
          {projects.map((project) => (
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
const ProjectCard = ({ project }) => {
  const hasStars = Number.isFinite(project.meta.stargazers_count);
  const hasForks = Number.isFinite(project.meta.forks_count);
  const hasMetadata = hasStars || hasForks || project.meta.language;

  return (
    <Card interactive className='h-full' padding='sm' variant='outline'>
      <article className='flex h-full flex-col'>
        <Typography variant='heading-sm' as='h3' className='mb-1.5 text-sm leading-5 md:text-base md:leading-5'>
          {project.title}
        </Typography>

        <Typography variant='paragraph-sm' className='mb-2 flex-grow text-xs leading-4'>
          {project.subtitle}
        </Typography>

        {hasMetadata && (
          <Typography as='div' variant='metadata' className='flex flex-wrap items-center gap-2 text-[11px] leading-4 normal-case'>
            {hasStars && (
              <div className='flex items-center gap-1'>
                <Icon name='Star' size='xs' decorative />
                <span>{project.meta.stargazers_count}</span>
              </div>
            )}
            {hasForks && (
              <div className='flex items-center gap-1'>
                <Icon name='Fork' size='xs' decorative />
                <span>{project.meta.forks_count}</span>
              </div>
            )}
            {project.meta.language && (
              <Pill tone='gray' variant='soft' size='xs' className='my-0 px-1.5 py-0 text-[10px] leading-4'>
                {project.meta.language}
              </Pill>
            )}
          </Typography>
        )}
      </article>
    </Card>
  );
};
