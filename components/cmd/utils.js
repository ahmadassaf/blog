/**
 * Command Launcher Utilities
 *
 * @description Utility functions for preparing and formatting data collections for use in the command launcher.
 * These functions transform post, project, and publication data into the format required by the command palette
 * interface, including URL generation and property normalization.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { omit } from '@/lib/utils/contentlayer';

/**
 * Prepares a content collection for use in the command launcher
 *
 * @description Transforms and normalizes a collection of content items (posts, projects, publications)
 * for use in the command palette. Adds required properties, generates URLs, and removes unnecessary
 * fields to optimize for search and display purposes.
 *
 * @param {Array} collection - The collection of content items to prepare
 * @param {string} type - The type of content ('post', 'project', 'publication')
 *
 * @example
 * prepareLauncherCollection(allPosts, 'post');
 * prepareLauncherCollection(allProjects, 'project');
 * prepareLauncherCollection(allPublications, 'publication');
 */
export const prepareLauncherCollection = (collection, type) => {

  collection.forEach((item, key) => {
    if (type !== 'publication') {
      item.id = item.slug;
      item.href = `/blog/${item.slug}`;
    }
    item.type = type;
    item.showType = false;
    item.children = item.title;

    collection[key] = omit(item, [ 'featured', 'filePath', 'readingTime', 'venueType', 'tableOfContents', 'externalLink', 'sameAs', 'draft' ]);

  });
};
