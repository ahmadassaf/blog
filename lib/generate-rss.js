/**
 * RSS Feed Generator
 *
 * @description Generates RSS 2.0 XML feeds for blog posts with proper
 * metadata, categories, and HTML escaping. Supports standard RSS elements
 * and author information.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import siteMetadata from '@/data/meta/metadata';
import { escape } from '@/lib/utils/htmlEscaper';

/**
 * Generates an individual RSS item for a blog post
 *
 * @param {Object} post - Post object with title, slug, summary, date, tags
 * @returns {string} XML string for RSS item
 */
const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`;

/**
 * Generates complete RSS feed XML for blog posts
 *
 * @param {Array<Object>} posts - Array of post objects sorted by date
 * @param {string} [page='feed.xml'] - RSS feed filename for self-reference
 * @returns {string} Complete RSS 2.0 XML feed
 *
 * @example
 * const rssXml = generateRss(sortedPosts, 'feed.xml');
 * fs.writeFileSync('./public/feed.xml', rssXml);
 */
const generateRss = (posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

export default generateRss;
