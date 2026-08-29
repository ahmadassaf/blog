/**
 * RSS Feed Generator Script
 *
 * @description Script for generating RSS feeds from blog posts. Creates XML feed files
 * for syndication and consumption by RSS readers. Processes all published posts
 * and generates appropriately formatted RSS XML.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { writeFileSync } from 'fs';

import { allPosts } from '../.contentlayer/generated/index.mjs';
import siteMetadata from '../data/meta/metadata.js';
import { published, sortPosts } from '../lib/utils/contentlayer.js';

/**
 * Escapes special XML characters in interpolated text content
 *
 * @param {*} value - Raw value to escape (coerced to string)
 * @returns {string} XML-safe string with & < > " ' replaced by entities
 */
const _escapeXml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const _generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${_escapeXml(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    ${post.summary ? `<description>${_escapeXml(post.summary)}</description>` : ''}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${_escapeXml(siteMetadata.email)} (${_escapeXml(siteMetadata.author)})</author>
    <category>${_escapeXml(post.category.replace('-', ' '))}</category>
  </item>
`;

const _generateRss = (posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${_escapeXml(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${_escapeXml(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${_escapeXml(siteMetadata.email)} (${_escapeXml(siteMetadata.author)})</managingEditor>
      <webMaster>${_escapeXml(siteMetadata.email)} (${_escapeXml(siteMetadata.author)})</webMaster>
      <lastBuildDate>${new Date(posts[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => _generateRssItem(post)).join('')}
    </channel>
  </rss>
`;

const rss = () => {
  const posts = published(sortPosts(allPosts));

  writeFileSync('./public/feed.xml', _generateRss(posts));

  console.log('ℹ️ RSS feed generated ✅');
};

export default rss;
