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
 * Builds fallback repository metadata when live GitHub data is unavailable
 *
 * @description Keeps the same shape as the GitHub API response, but marks all numeric
 * stats as null so they are distinguishable from real zeros. The UI should treat null
 * stats as "hide" rather than rendering them as 0.
 *
 * @param {Object} doc - Project document with github field
 * @returns {Object} Fallback repository metadata with null-marked stats
 */
const _fallbackMeta = (doc) => {
  return {
    'description': doc.summary || '',
    'forks_count': null,
    'html_url': `https://github.com/${doc.github}`,
    'language': doc.language || null,
    'license': null,
    'name': doc.github.split('/')[1],
    'open_issues_count': null,
    'stargazers_count': null,
    'watchers_count': null
  };
};

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
   * Falls back to null-marked stats if the API request fails (e.g., rate limit).
   *
   * @param {Object} doc - Project document with github field
   * @returns {Promise<Object|null>} Repository metadata object, fallback data, or null when the document has no github field
   */
  'meta': {
    'resolve': async(doc) => {

      // Projects without a github field have no repository metadata
      if (!doc.github) return null;

      // Skip GitHub API calls if explicitly disabled
      if (process.env.SKIP_GITHUB_API === 'true') {
        console.log(`Skipping GitHub API call for ${doc.github} (SKIP_GITHUB_API=true)`);

        return _fallbackMeta(doc);
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

        // Return fallback data with null-marked stats (UI should hide null stats)
        return _fallbackMeta(doc);
      }
    },
    'type': 'json'
  }
};

export default projectFields;
