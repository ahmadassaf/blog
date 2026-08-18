/**
 * Tag Taxonomy Validator
 *
 * Keeps tag frontmatter complete, consistently displayed, and safe to use as
 * a single dynamic route segment.
 */

import { slugify } from '../utils/slugs.js';

const MIN_TAGS = 3;
const MAX_TAGS = 5;
const MIN_SHARED_TAGS = 2;

// Official names whose preferred display form intentionally starts lowercase.
const LOWERCASE_LEADING_TAGS = new Set([ 'macOS', 'mdast', 'npm', 'rehype', 'remark', 'unified' ]);
const UNSAFE_SLUG_CHARACTERS = [ '/', '\\', '?', '#', '%' ];

/*
 * Canonical display names for brands, acronyms, and known historical aliases.
 * Keys use the same route slug normalization as the generated tag archive.
 */
const PREFERRED_DISPLAY_BY_SLUG = new Map([
  [ 'bash', 'Bash' ],
  [ 'cli', 'CLI' ],
  [ 'contentlayer', 'Contentlayer' ],
  [ 'dcat', 'DCAT' ],
  [ 'decision-making', 'Decision-Making' ],
  [ 'dotfiles', 'Dotfiles' ],
  [ 'github', 'GitHub' ],
  [ 'gaudi', 'Gaudi' ],
  [ 'javascript', 'JavaScript' ],
  [ 'json', 'JSON' ],
  [ 'json-ld', 'JSON-LD' ],
  [ 'latex', 'LaTeX' ],
  [ 'macos', 'macOS' ],
  [ 'mdx', 'MDX' ],
  [ 'next.js', 'Next.js' ],
  [ 'node.js', 'Node.js' ],
  [ 'npm', 'npm' ],
  [ 'olap', 'OLAP' ],
  [ 'openai', 'OpenAI' ],
  [ 'owl', 'OWL' ],
  [ 'rdf', 'RDF' ],
  [ 'rdfs', 'RDFS' ],
  [ 'rehype', 'rehype' ],
  [ 'remark', 'remark' ],
  [ 'schema.org', 'Schema.org' ],
  [ 'seo', 'SEO' ],
  [ 'sparql', 'SPARQL' ],
  [ 'travis-ci', 'Travis CI' ],
  [ 'unified', 'unified' ],
  [ 'übersicht', 'Übersicht' ],

  /* Retired labels whose meaning is represented by a preferred shared tag. */
  [ 'data-portal', 'Data Portals' ],
  [ 'data-warehouse', 'Data Warehousing' ],
  [ 'lod', 'LOD Cloud' ],
  [ 'multimodal-databases', 'Multidimensional Databases' ],
  [ 'osx', 'macOS' ],
  [ 'tailwind', 'Tailwind CSS' ],
  [ 'unifiedjs', 'unified' ],
  [ 'widget', 'Widgets' ]
]);

const getDocumentLabel = (document) => document._raw?.sourceFilePath || document.slug || document.title || 'Unknown document';

/**
 * Validates the shared tag taxonomy for posts and projects.
 *
 * @param {Array<Object>} documents Contentlayer post and project documents
 * @throws {Error} When tag coverage, formatting, or normalization is invalid
 */
function validateTags(documents) {
  const errors = [];
  const canonicalTags = new Map();
  const tagUsageBySlug = new Map();

  documents.forEach((document) => {
    if (!Array.isArray(document.tags)) return;

    const documentSlugs = new Set(document.tags
      .filter((tag) => typeof tag === 'string' && tag.trim())
      .map((tag) => slugify(tag)));

    documentSlugs.forEach((slug) => tagUsageBySlug.set(slug, (tagUsageBySlug.get(slug) || 0) + 1));
  });

  documents.forEach((document) => {
    const label = getDocumentLabel(document);
    const { tags } = document;

    if (!Array.isArray(tags)) {
      errors.push(`${label}: tags must be a list`);

      return;
    }

    if (tags.length < MIN_TAGS || tags.length > MAX_TAGS) errors.push(`${label}: expected ${MIN_TAGS}-${MAX_TAGS} tags, found ${tags.length}`);

    const documentSlugs = new Set();

    tags.forEach((tag) => {
      if (typeof tag !== 'string' || !tag.trim()) {
        errors.push(`${label}: tags must be non-empty strings`);

        return;
      }

      if (tag !== tag.trim()) errors.push(`${label}: tag "${tag}" has surrounding whitespace`);

      if (tag[0] === tag[0].toLowerCase() && !LOWERCASE_LEADING_TAGS.has(tag)) errors.push(`${label}: tag "${tag}" must use its canonical display casing`);

      const slug = slugify(tag);
      const preferredDisplay = PREFERRED_DISPLAY_BY_SLUG.get(slug);

      if (preferredDisplay && preferredDisplay !== tag) errors.push(`${label}: tag "${tag}" must use canonical display "${preferredDisplay}"`);

      if (UNSAFE_SLUG_CHARACTERS.some((character) => slug.includes(character))) errors.push(`${label}: tag "${tag}" produces the route-unsafe slug "${slug}"`);

      if (documentSlugs.has(slug)) errors.push(`${label}: duplicate tag slug "${slug}"`);
      else documentSlugs.add(slug);

      const canonicalTag = canonicalTags.get(slug);

      if (canonicalTag && canonicalTag !== tag) errors.push(`${label}: tag "${tag}" conflicts with canonical display "${canonicalTag}"`);
      else canonicalTags.set(slug, tag);
    });

    const sharedTagCount = [ ...documentSlugs ].filter((slug) => tagUsageBySlug.get(slug) > 1).length;

    if (sharedTagCount < MIN_SHARED_TAGS) errors.push(`${label}: expected at least ${MIN_SHARED_TAGS} tags shared with related content, found ${sharedTagCount}`);
  });

  if (errors.length > 0) throw new Error(`Tag validation failed:\n- ${errors.join('\n- ')}`);
}

export default validateTags;
