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

import SocialIcon from '@/components/elements/Icon';
import Link from '@/components/elements/Link';

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
const PostSharing = ({ siteMetadata, slug, title, tags, externalLink }) => {

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

  /**
   * Generates the Twitter share URL with post information
   *
   * @description Creates a Twitter intent URL for sharing the blog post with the title
   * and post URL properly encoded for social media sharing.
   *
   * @param {string} slug - The post slug
   * @param {string} title - The post title
   * @returns {string} The complete Twitter share URL with encoded parameters
   */
  const discussUrl = (slug, title) => `https://twitter.com/intent/tweet?text=${title}
  
  ${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`;

  return (
    <div className='flex text-sm text-gray-700 dark:text-gray-300 my-4 pt-4 max-sm:text-xs'>
      <div className='mr-2 flex space-x-2 hover:text-blue-700'>
        <SocialIcon
          kind='twitter'
          href={ `http://x.com/share?text=${title}&url=${externalLink}&hashtags=${tags.map((t) => t.replaceAll(' ', '')).join(',')}` }
        />
        <Link href={ discussUrl(slug, title) } rel='nofollow'></Link>
      </div>
      <div className='mr-4 flex space-x-2 hover:text-blue-700'>
        <SocialIcon kind='github' href={ siteMetadata.github } />
        <Link href={ editUrl(externalLink) }>View on GitHub</Link>
      </div>
    </div>
  );
};

export default PostSharing;
