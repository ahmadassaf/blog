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
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
          <Typography variant='title-xl'>
            Projects
          </Typography>
        </div>
        <div>
          <Grid columns='3' gap='md' className='py-10'>
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
const ProjectCard = ({ project }) => (
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
