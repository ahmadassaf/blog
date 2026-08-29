/**
 * Publications Page
 *
 * @description Server page for the publications list. Exports page metadata and
 * passes the publications data as plain props to the PublicationsList client component.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import PublicationsList from '@/app/blog/publications/PublicationsList';
import publications from '@/app/content/publications.json';
import { metadataGenerator } from '@/data/meta/generator/blog';

export const metadata = metadataGenerator({ 'path': '/blog/publications', 'title': 'Publications' });

/**
 * Publications page component
 *
 * @returns {JSX.Element} Publications page with year-grouped publications
 *
 * @example
 * // Rendered at /blog/publications route
 * <Publications />
 */
export default function Publications() {
  return <PublicationsList publications={ publications } />;
}
