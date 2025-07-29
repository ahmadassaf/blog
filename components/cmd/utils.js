import { omit } from '@/lib/utils/contentlayer';

export const prepareLauncherCollection = (collection, type) => {

  collection.forEach((item, key) => {
    if (type !== 'publication') {
      item.id = item.slug;
      item.href = `/blog/${item.slug}`;
    }
    item.type = type;
    item.showType = false;
    item.children = item.title;

    collection[key] = omit(item, [ 'featured', 'filePath', 'readingTime', 'venueType', 'tableOfContents', 'externalLink', 'sameAs', 'draft' ]);

  });
};
