/**
 * Post Sharing Component
 *
 * @description A component that provides social sharing functionality for blog posts, including
 * Twitter sharing and GitHub repository links. It generates appropriate URLs for sharing and
 * viewing the post source code on GitHub.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

/* eslint-disable no-shadow */

import SocialIcon from '@/components/primitives/Icon';
import Link from '@/components/primitives/Link';
import { cn } from '@/components/utilities/cn';

/**
 * Post sharing component with social media and GitHub integration
 *
 * @description Renders sharing buttons and links for blog posts, including Twitter share functionality
 * with hashtags and a direct link to view the post source on GitHub. Handles URL encoding and
 * provides proper social media integration.
 *
 * @param {Object} props - Component props
 * @param {Object} props.siteMetadata - Site metadata containing repository and URL information
 * @param {string} props.slug - The post slug for URL generation
 * @param {string} props.title - The post title for sharing
 * @param {Array<string>} props.tags - Array of post tags for hashtag generation
 * @param {string} props.externalLink - The external link or file path for the post
 *
 * @returns {JSX.Element} The rendered post sharing component
 *
 * @example
 * <PostSharing
 *   siteMetadata={siteMetadata}
 *   slug="my-blog-post"
 *   title="My Blog Post Title"
 *   tags={["javascript", "react"]}
 *   externalLink="content/blog/my-post"
 * />
 */
const PostSharing = ({ className, classNames = {}, siteMetadata, slug, title, tags, externalLink }) => {

  /**
   * Generates the GitHub edit URL for the post source
   *
   * @description Creates a direct link to the post's source file on GitHub for editing.
   * Constructs the URL using the site's posts repository and the external link path.
   *
   * @param {string} externalLink - The file path or external link identifier
   * @returns {string} The complete GitHub URL for editing the post
   */
  const editUrl = (externalLink) => `${siteMetadata.postsRepo}/blob/master/${externalLink}.mdx`;

  return (
    <div className={ cn('my-4 flex pt-4 text-sm text-gray-700 max-sm:text-xs dark:text-gray-300', className, classNames.root) }>
      <div className={ cn('mr-2 flex space-x-2 hover:text-blue-700', classNames.action) }>
        <SocialIcon
          kind='twitter'
          href={ `http://x.com/share?text=${title}&url=${externalLink}&hashtags=${tags?.map((t) => t.replaceAll(' ', '')).join(',') || ''}` }
          label='Share post on X'
        />
      </div>
      <div className={ cn('mr-4 flex space-x-2 hover:text-blue-700', classNames.source) }>
        <SocialIcon kind='github' href={ siteMetadata.github } />
        <Link href={ editUrl(externalLink) } className={ classNames.link }>View on GitHub</Link>
      </div>
    </div>
  );
};

export default PostSharing;
