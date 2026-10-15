
/**
 * Open Graph Image Generation API
 *
 * @description API route that dynamically generates Open Graph images for blog posts and pages.
 * Renders Gaudi's OgCard with the post title, subtitle, category and the site mark.
 * Uses Vercel's @vercel/og package to generate images on-the-fly.
 *
 * @author Ahmad Assaf
 * @version 1.1.0
 */

import { OgCard, ogImageSize } from '@gaudi/design-system/post/OgCard';
import { ImageResponse } from '@vercel/og';
import { allPosts } from 'contentlayer/generated';
import { NextResponse } from 'next/server';

import siteMetadata from '@/data/meta/metadata';
import SiteMark from '@/layouts/SiteMark';
import { titleFromSlug } from '@/lib/utils/slugs.mjs';

// Module-scope cache so fonts are downloaded at most once per instance
let cachedFontsPromise = null;

/**
 * Fetches a single Inter font file and shapes it for image generation
 *
 * @param {string} url - CDN URL of the font file
 * @param {number} weight - Font weight the file represents
 * @returns {Promise<Object>} Font object
 * @throws {Error} When the font download fails
 */
async function fetchFont(url, weight) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.arrayBuffer();

  return {
    'data': data,
    'name': 'Inter',
    'style': 'normal',
    'weight': weight
  };
}

/**
 * Fetches and prepares Inter font files for Open Graph image generation
 *
 * @description Downloads Inter font variants from CDN and formats them for use in image generation.
 * This is required because local font files cannot be easily loaded in Vercel's edge runtime.
 * Results are cached at module scope so repeat invocations reuse the downloaded buffers;
 * if any download fails the image renders with the default font and the cache is
 * invalidated so the next invocation retries.
 *
 * @returns {Promise<Array>} Array of font objects with data, name, style, and weight properties
 */
function getFonts() {

  /*
   * This is unfortunate but I can't figure out how to load local font files
   * when deployed to vercel.
   */
  if (!cachedFontsPromise) cachedFontsPromise = Promise.all([
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-Regular.woff', 400),
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-Medium.woff', 500),
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-SemiBold.woff', 600),
    fetchFont('https://fonts.cdnfonts.com/s/19795/Inter-Bold.woff', 700)
  ]).catch((error) => {
    console.error('Failed to fetch Inter fonts:', error);

    // Retry on the next invocation
    cachedFontsPromise = null;

    return [];
  });

  return cachedFontsPromise;
}

/**
 * GET handler for Open Graph image generation
 *
 * @description Generates dynamic Open Graph images for blog posts based on the slug parameter.
 * If no matching post is found, falls back to default site metadata. The generated image
 * includes the post title, category, subtitle, and site branding elements.
 *
 * @param {Request} request - The incoming HTTP request with search parameters
 * @returns {Promise<ImageResponse|Response>} Generated image response or error response
 *
 * @example
 * // Generate OG image for a specific post
 * GET /api/og?slug=my-blog-post
 *
 * // Generate default OG image
 * GET /api/og?slug=default
 */
export async function GET(request) {
  const slugParam = request.nextUrl.searchParams.get('slug');

  if (!slugParam) return NextResponse.json(
    { 'error': 'Missing required "slug" parameter', 'status': 400 }, { 'status': 400 }
  );

  try {

    const slug = slugParam.replace('category/', '');
    let post = allPosts.find((_post) => _post.slug.replace('category/', '') === slug);

    // Never leak unpublished titles through OG images
    if (post?.draft) return NextResponse.json(
      { 'error': 'Post not found', 'status': 404 }, { 'status': 404 }
    );

    if (!post) post = {
      'category': slug,
      'subtitle': siteMetadata.description,
      'title': siteMetadata.title
    };

    // Render with the default font if the custom fonts could not be downloaded
    const fonts = await getFonts();
    const imageOptions = { ...ogImageSize };

    if (fonts.length > 0) imageOptions.fonts = fonts;

    return new ImageResponse(
      <OgCard
        title={ post.title }
        subtitle={ post.subtitle }
        category={ post.category ? titleFromSlug(post.category) : undefined }
        siteName={ siteMetadata.siteUrl.replace(/^https?:\/\//, '') }
        logo={ <SiteMark width={ 120 } height={ 104 } /> }
      />, imageOptions
    );
  } catch {
    return new Response(`Failed to generate the image`, {
      'status': 500
    });
  }
}
