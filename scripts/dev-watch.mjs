#!/usr/bin/env node

/**
 * Development Watch Script
 *
 * @description Watches for changes in blog content and automatically rebuilds ContentLayer
 * and regenerates content files for hot reloading in development. Combines file watching
 * with Next.js development server for seamless content editing experience.
 *
 * @author Ahmad Assaf
 * @version 1.0.0
 */

import { spawn } from 'child_process';
import { watch } from 'chokidar';
import path from 'path';

const CONTENT_DIRS = [ 'data/blog/**/*.mdx', 'data/authors/**/*.mdx', 'data/projects/**/*.mdx' ];

let isRebuilding = false;

/**
 * Rebuild content using ContentLayer
 */
async function rebuildContent() {
  if (isRebuilding) return;

  isRebuilding = true;
  console.log('📝 Content changed, rebuilding...');

  try {

    // Run ContentLayer build
    const contentLayer = spawn('npx', [ 'contentlayer2', 'build', '-c', 'contentlayer.config.js' ], {
      'cwd': process.cwd(),
      'env': {
        ...process.env,
        'INIT_CWD': process.cwd(),
        'NODE_NO_WARNINGS': '1',
        'NODE_OPTIONS': '--experimental-vm-modules'
      },
      'stdio': 'inherit'
    });

    await new Promise((resolve, reject) => {
      contentLayer.on('close', (code) => {
        if (code === 0)
          resolve();
        else
          reject(new Error(`ContentLayer build failed with code ${code}`));

      });
    });

    // Run post-build script
    const postBuild = spawn('node', [ './scripts/build.mjs' ], {
      'cwd': process.cwd(),
      'env': {
        ...process.env,
        'NODE_NO_WARNINGS': '1',
        'NODE_OPTIONS': '--experimental-vm-modules'
      },
      'stdio': 'inherit'
    });

    await new Promise((resolve, reject) => {
      postBuild.on('close', (code) => {
        if (code === 0)
          resolve();
        else
          reject(new Error(`Post-build script failed with code ${code}`));

      });
    });

    console.log('✅ Content rebuilt successfully');
  } catch (error) {
    console.error('❌ Content rebuild failed:', error.message);
  } finally {
    isRebuilding = false;
  }
}

/**
 * Start the development server with content watching
 */
async function startDevServer() {
  console.log('🚀 Starting development server with content watching...');

  // Initial content build
  await rebuildContent();

  // Start file watcher
  const watcher = watch(CONTENT_DIRS, {
    'ignored': [ 'node_modules/**', '.next/**', '.contentlayer/**' ],
    'persistent': true
  });

  watcher.on('change', (filePath) => {
    console.log(`📄 File changed: ${path.relative(process.cwd(), filePath)}`);
    rebuildContent();
  });

  watcher.on('add', (filePath) => {
    console.log(`📄 File added: ${path.relative(process.cwd(), filePath)}`);
    rebuildContent();
  });

  watcher.on('unlink', (filePath) => {
    console.log(`📄 File removed: ${path.relative(process.cwd(), filePath)}`);
    rebuildContent();
  });

  // Start Next.js development server
  const nextDev = spawn('npx', [ 'next', 'dev', '--turbopack' ], {
    'cwd': process.cwd(),
    'env': {
      ...process.env,
      'INIT_CWD': process.cwd(),
      'NODE_NO_WARNINGS': '1',
      'NODE_OPTIONS': '--experimental-vm-modules'
    },
    'stdio': 'inherit'
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    watcher.close();
    nextDev.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down development server...');
    watcher.close();
    nextDev.kill('SIGTERM');
    process.exit(0);
  });
}

// Start the development environment
startDevServer().catch((error) => {
  console.error('❌ Failed to start development server:', error);
  process.exit(1);
});
