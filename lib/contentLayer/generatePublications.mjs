import { writeFileSync } from 'fs';

import Publications from '../../data/meta/publications.mjs';

function getAllPublications(allPosts) {

  Publications.forEach((item, i) => {
    item.id = i + 1;
  });

  writeFileSync(`./app/content/publications.json`, JSON.stringify(Object.values(Publications)));
}

export default getAllPublications;
