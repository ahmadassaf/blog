/**
 * Project Fields with GitHub Integration
 *
 * @description Defines computed fields for project content that fetch real-time data
 * from GitHub repositories. Provides automatic integration with GitHub API to display
 * current repository statistics and metadata.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

// External libraries
import { Octokit } from 'octokit';

// Internal utilities
import { pick } from '../utils/contentlayer.js';

// Initialize GitHub API client with authentication
const octokit = new Octokit({
  'auth': process.env.GITHUB_TOKEN
});

/**
 * Project field definitions with GitHub API integration
 *
 * @description Defines computed fields that fetch live data from GitHub repositories
 * to enhance project pages with current statistics and metadata.
 */
const projectFields = {

  /**
   * GitHub repository metadata field
   *
   * @description Fetches live repository data from GitHub API including stats,
   * description, language, license information, and other metadata.
   *
   * @param {Object} doc - Project document with github field
   * @returns {Promise<Object>} Repository metadata object
   */
  'meta': {
    'resolve': async(doc) => {
      const repo = await octokit.request(`GET /repos/${doc.github}`, {
        'headers': {
          'X-GitHub-Api-Version': '2022-11-28'
        },
        'owner': doc.github.split('/')[0],
        'repo': doc.github.split('/')[1]
      });

      // Extract relevant repository metadata
      return pick(repo.data, [
        'description',
        'forks_count',
        'html_url',
        'language',
        'name',
        'open_issues_count',
        'stargazers_count',
        'watchers_count',
        'license'
      ]);
    },
    'type': 'string'
  }
};

export default projectFields;
