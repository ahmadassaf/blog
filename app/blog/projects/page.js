/**
 * Projects Page
 *
 * @description Server page for the projects grid. Exports page metadata, strips the
 * generated project documents down to the fields the client needs, and passes plain
 * props to the ProjectsList client component.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { allProjects } from 'contentlayer/generated';

import ProjectsList from '@/app/blog/projects/ProjectsList';
import { metadataGenertaor } from '@/data/meta/generator/blog';

export const metadata = metadataGenertaor({ 'path': '/blog/projects', 'title': 'Projects' });

/**
 * Projects page component
 *
 * @returns {JSX.Element} Projects page with GitHub project cards
 *
 * @example
 * // Rendered at /blog/projects route
 * <Projects />
 */
export default function Projects() {
  const projects = allProjects.map((project) => {
    return {
      'externalLink': project.externalLink,
      'meta': {
        'forks_count': project.meta?.forks_count ?? null,
        'language': project.meta?.language ?? null,
        'stargazers_count': project.meta?.stargazers_count ?? null
      },
      'subtitle': project.subtitle,
      'title': project.title
    };
  });

  return <ProjectsList projects={ projects } />;
}
