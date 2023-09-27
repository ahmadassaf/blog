import { writeFileSync } from 'fs';

import knowledgeBase from '../../data/meta/knowledgeBase.mjs';

function getAllTags(allPosts) {
  const tags = {};

  allPosts.forEach((post) => {
    if (post.tags) post.tags.forEach((tag) => {
      const formattedTag = tag.replace(' ', '-').toLowerCase().trim();

      if (tags[formattedTag]) tags[formattedTag].count++;
      else tags[formattedTag] = {
        'children': tag,
        'count': 1,
        'display': tag,
        'href': `/blog/tags/${formattedTag}`,
        'id': formattedTag,
        'sameAs': knowledgeBase[tag]?.sameAs,
        'showType': false,
        'slug': formattedTag,
        'title': tag,
        'type': 'tag'
      };
    });
  });

  writeFileSync(`./app/content/tags.json`, JSON.stringify(Object.values(tags)));
}

export default getAllTags;
