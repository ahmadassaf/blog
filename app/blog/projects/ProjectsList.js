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

import { Icon, Item, ItemContent, ItemDescription, ItemFooter, ItemTitle, Link, Pill } from '@gaudi/design-system';
import PageHeader from '@gaudi/design-system/layout/PageHeader';

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
      <div className='mx-auto max-w-6xl'>
        <PageHeader title='Projects' divider className='pt-2 pb-6' />
        <div className='mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 py-5'>
          {projects.map((project) => <ProjectCard key={ project.externalLink } project={ project } />)}
        </div>
      </div>
    </>
  );
}

/**
 * A project as a linked, outlined Gaudi Item: title, summary, and GitHub stars, forks and language
 *
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data object
 * @returns {JSX.Element} Linked project card
 */
const ProjectCard = ({ project }) => {
  const hasStars = Number.isFinite(project.meta.stargazers_count);
  const hasForks = Number.isFinite(project.meta.forks_count);
  const hasMetadata = hasStars || hasForks || project.meta.language;

  return (
    <Item asChild variant='outline' className='h-full flex-col flex-nowrap items-stretch'>
      <Link href={ `/blog/${project.externalLink}` } variant='bare'>
        <ItemContent>
          <ItemTitle>{project.title}</ItemTitle>
          <ItemDescription>{project.subtitle}</ItemDescription>
        </ItemContent>
        {hasMetadata && (
          <ItemFooter className='mt-auto basis-auto justify-start pt-2 text-xs text-text-muted tabular-nums'>
            {hasStars && (
              <span className='inline-flex items-center gap-1'>
                <Icon name='Star' size='xs' decorative />
                {project.meta.stargazers_count}
              </span>
            )}
            {hasForks && (
              <span className='inline-flex items-center gap-1'>
                <Icon name='Fork' size='xs' decorative />
                {project.meta.forks_count}
              </span>
            )}
            {project.meta.language && <Pill tone='gray' variant='soft' size='xs'>{project.meta.language}</Pill>}
          </ItemFooter>
        )}
      </Link>
    </Item>
  );
};
