/**
 * Disclaimer Component
 *
 * @description Legal disclaimer component that displays a standardized disclaimer notice
 * about the content and opinions expressed on the blog. Uses the Callout component to
 * present the disclaimer in a visually distinct informational format.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import Callout from '@/components/mdx/Callout';

/**
 * Renders a legal disclaimer notice
 *
 * @description Standard disclaimer component that clarifies that blog content represents
 * personal opinions and views, not those of employer or affiliated organizations.
 * Displayed as an informational callout for clear visibility.
 *
 * @returns {JSX.Element} Disclaimer notice in callout format
 *
 * @example
 * // Basic usage at the bottom of blog posts
 * <Disclaimer />
 *
 * @example
 * // Typically used in post layouts
 * <article>
 *   {// Post content}
 *   <Disclaimer />
 * </article>
 */
const Disclaimer = () => (
  <Callout type='info'>
    The opinions and views expressed on this blog are solely my own and do not reflect
    the opinions, views, or positions of my employer or any affiliated organizations.
    All content provided on this blog is for informational purposes only.
  </Callout>
);

export default Disclaimer;
