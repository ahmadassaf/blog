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

import { Octokit } from 'octokit';

import { pick } from '../utils/contentlayer.js';

// Initialize GitHub API client with authentication
const octokit = new Octokit({
  'auth': process.env.GITHUB_TOKEN,
  'request': {

    // 5 second timeout
    'timeout': 5000
  },
  'retry': {

    // Disable retries to fail fast
    'enabled': false
  }
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
   * Falls back to default values if API request fails (e.g., rate limit).
   *
   * @param {Object} doc - Project document with github field
   * @returns {Promise<Object>} Repository metadata object or fallback data
   */
  'meta': {
    'resolve': async(doc) => {

      // Skip GitHub API calls if explicitly disabled
      if (process.env.SKIP_GITHUB_API === 'true') {
        console.log(`Skipping GitHub API call for ${doc.github} (SKIP_GITHUB_API=true)`);

        return {
          'description': doc.summary || '',
          'forks_count': 0,
          'html_url': `https://github.com/${doc.github}`,
          'language': doc.language || 'JavaScript',
          'license': null,
          'name': doc.github.split('/')[1],
          'open_issues_count': 0,
          'stargazers_count': 0,
          'watchers_count': 0
        };
      }

      try {
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
      } catch (error) {

        // Log the error but don't fail the build
        console.warn(`Warning: Could not fetch GitHub data for ${doc.github}: ${error.message}`);

        // Return fallback data
        return {
          'description': doc.summary || '',
          'forks_count': 0,
          'html_url': `https://github.com/${doc.github}`,
          'language': doc.language || 'JavaScript',
          'license': null,
          'name': doc.github.split('/')[1],
          'open_issues_count': 0,
          'stargazers_count': 0,
          'watchers_count': 0
        };
      }
    },
    'type': 'string'
  }
};

export default projectFields;
