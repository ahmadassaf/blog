import { Octokit } from 'octokit';

import { pick } from '../utils/contentlayer.js';

const octokit = new Octokit({
  'auth': process.env.GITHUB_TOKEN
});

const projectFields = {
  'meta': {
    'resolve': async(doc) => {
      const repo = await octokit.request(`GET /repos/${doc.github}`, {
        'headers': {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        'owner': doc.github.split('/')[0],
        'repo': doc.github.split('/')[1]
      });

      return pick(repo.data, [ 'description', 'forks_count', 'description', 'html_url', 'language', 'name', 'open_issues_count', 'stargazers_count', 'watchers_count', 'license' ]);
    },
    'type': 'string'
  }
};

export default projectFields;
