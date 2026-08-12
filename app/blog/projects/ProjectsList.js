/**
 * Projects List Component
 *
 * @description Editorial project index with concise descriptions, available
 * repository metadata, and clear links to the longer project notes.
 *
 * @author Ahmad Assaf
 * @version 2.0.0
 */

import { Icon, Link, Pill, Typography } from '@gaudi/design-system';

/**
 * Project index.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.projects - Project objects with title, subtitle, link, and GitHub stats
 * @returns {JSX.Element} Projects list
 */
export default function ProjectsList({ projects }) {
  return (
    <div>
      <header className='border-b border-gray-200 py-10 dark:border-gray-800 md:py-12'>
        <Typography variant='title-md'>Projects</Typography>
        <Typography variant='index-feature-summary' className='mt-3 max-w-2xl'>
          Open-source tools and experiments spanning developer productivity, data quality, and knowledge systems.
        </Typography>
        <Typography variant='metadata' className='mt-4'>
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </Typography>
      </header>

      {projects.length > 0 ? (
        <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
          {projects.map((project) => {
            const hasRepositoryStats = project.meta.stargazers_count > 0 || project.meta.forks_count > 0;

            return (
              <li key={ project.externalLink }>
                <Link
                  href={ `/blog/${project.externalLink}` }
                  variant='bare'
                  className='group block py-6 md:py-7'
                >
                  <article className='grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8'>
                    <div className='max-w-3xl'>
                      <Typography variant='index-feature-title' as='h2' className='transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400'>
                        {project.title}
                      </Typography>
                      <Typography variant='paragraph-sm' className='mt-2 max-w-2xl'>
                        {project.subtitle}
                      </Typography>
                      {(hasRepositoryStats || project.meta.language) && (
                        <div className='mt-3 flex flex-wrap items-center gap-3 text-gray-500 dark:text-gray-400'>
                          {project.meta.language && (
                            <Pill tone='gray' variant='soft' size='xs'>
                              {project.meta.language}
                            </Pill>
                          )}
                          {project.meta.stargazers_count > 0 && (
                            <Typography as='span' variant='post-meta' className='inline-flex items-center gap-1'>
                              <Icon name='Star' size='xs' decorative />
                              {project.meta.stargazers_count}
                            </Typography>
                          )}
                          {project.meta.forks_count > 0 && (
                            <Typography as='span' variant='post-meta' className='inline-flex items-center gap-1'>
                              <Icon name='Fork' size='xs' decorative />
                              {project.meta.forks_count}
                            </Typography>
                          )}
                        </div>
                      )}
                    </div>
                    <span className='inline-flex size-9 items-center justify-center text-gray-500 transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400' aria-hidden='true'>
                      <Icon name='ArrowRight' size='sm' decorative />
                    </span>
                  </article>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='py-12 text-center'>
          <Typography variant='paragraph-sm'>No projects published yet.</Typography>
        </div>
      )}
    </div>
  );
}
