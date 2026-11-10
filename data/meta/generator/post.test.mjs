import assert from 'node:assert/strict';
import test from 'node:test';

import { linkedDataGenerator, postMetadataGenerator } from './post.js';

const article = {
  'date': '2026-11-10',
  'slug': 'category/engineering/example',
  'summary': 'A summary',
  'title': 'Example',
  'type': 'Post'
};

test('article metadata and structured data agree on the canonical URL', () => {
  const metadata = postMetadataGenerator({ 'slug': [ 'engineering', 'example' ] }, [ article ]);
  const structuredData = linkedDataGenerator(article);

  assert.equal(metadata.alternates.canonical, '/blog/category/engineering/example');
  assert.equal(new URL(structuredData.url).pathname, metadata.alternates.canonical);
  assert.equal(metadata.openGraph.publishedTime, '2026-11-10T00:00:00.000Z');
});

test('project metadata uses its public route and safely encodes social-card slugs', () => {
  const project = { ...article, 'externalLink': 'projects/r&d', 'slug': 'category/projects/r&d', 'type': 'Project' };
  const metadata = postMetadataGenerator({ 'slug': [ 'projects', 'r&d' ] }, [ project ]);
  const structuredData = linkedDataGenerator(project);

  assert.equal(metadata.alternates.canonical, '/blog/projects/r&d');
  assert.equal(new URL(metadata.openGraph.images[0], 'https://example.test').searchParams.get('slug'), project.slug);
  assert.equal(new URL(structuredData.image.url).searchParams.get('slug'), project.slug);
});

test('metadata lookup cannot expose draft content or malformed paths', () => {
  const draft = { ...article, 'draft': true };

  assert.deepEqual(postMetadataGenerator({ 'slug': [ 'engineering', 'example' ] }, [ draft ]), { 'title': 'Post not found' });
  assert.deepEqual(postMetadataGenerator({ 'slug': [ '%E0%A4%A' ] }, [ article ]), { 'title': 'Post not found' });
});
