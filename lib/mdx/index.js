/**
 * MDX Remark Plugins Index
 *
 * @description Central export file for all custom remark plugins used in MDX processing.
 * Provides a single import point for code titles, frontmatter extraction, image processing,
 * link handling, and table of contents generation plugins.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// Internal remark plugins
import { remarkCodeTitles } from './remark-code-title';
import { remarkExtractFrontmatter } from './remark-extract-frontmatter';
import { remarkImgToJsx } from './remark-img-to-jsx';
import { remarkLinks } from './remark-links';
import { extractTocHeadings, remarkTocHeadings } from './remark-toc-headings';

export { extractTocHeadings,
  remarkCodeTitles,
  remarkExtractFrontmatter,
  remarkImgToJsx,
  remarkLinks,
  remarkTocHeadings };
