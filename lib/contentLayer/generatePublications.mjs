/**
 * Publications Generator
 *
 * @description Utility script for processing and generating publication data files.
 * Reads publication metadata and creates JSON files for the application to consume.
 * Used during the build process to prepare publication content.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { writeFileSync } from 'fs';

import Publications from '../../data/meta/publications.mjs';

function getAllPublications() {

  Publications.forEach((item, i) => {
    item.id = i + 1;
  });

  writeFileSync(`./app/content/publications.json`, JSON.stringify(Object.values(Publications)));
}

export default getAllPublications;
