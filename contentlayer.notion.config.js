import { Client } from '@notionhq/client';
import { defineDatabase, makeSource as notionMakeSource } from 'contentlayer-source-notion';

const client = new Client({ 'auth': process.env.NOTION_TOKEN });

export const Plant = defineDatabase(() => {
  return {
    'computedFields': {
      'title': {
        'resolve': (post) => post.name.replace('<b className="notion-text-bold">', '').replace('</b>', ''),
        'type': 'string'
      },
      'url': {
        'resolve': (post) => `/garden/${post._id}`,
        'type': 'string'
      }
    },
    'databaseId': '4254c8cbc3904e288ce6def8237d82e0',
    'name': 'Plant'
  };
});

export default notionMakeSource({
  client,
  'databaseTypes': [ Plant ]
});

