import { allPosts } from '../.contentlayer/generated/index.mjs';
import getAllCategories from '../lib/contentLayer/generateCategories.mjs';
import getAllPublications from '../lib/contentLayer/generatePublications.mjs';
import getAllTags from '../lib/contentLayer/generateTags.mjs';

import rss from './rss.mjs';

async function postbuild() {
  getAllTags(allPosts);
  getAllCategories(allPosts);
  getAllPublications();
  await rss();
}

postbuild();
