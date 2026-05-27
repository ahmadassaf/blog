import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const componentsDir = dirname(fileURLToPath(import.meta.url));
const packageSrcDir = dirname(componentsDir);
const publicIndex = readFileSync(join(packageSrcDir, 'index.js'), 'utf8');

const customisedCoreComponents = [
  [ 'Avatar', 'core/Avatar/Avatar.stories.jsx', 'avatarVariants' ],
  [ 'Banner', 'core/Banner/Banner.stories.jsx', 'bannerVariants' ],
  [ 'Button', 'core/Button/Button.stories.jsx', 'buttonVariants' ],
  [ 'Card', 'core/Card/Card.stories.jsx', 'cardVariants' ],
  [ 'Carousel', 'core/Carousel/Carousel.stories.jsx', 'carouselVariants' ],
  [ 'Grid', 'core/Grid/Grid.stories.jsx', 'gridVariants' ],
  [ 'Kbd', 'core/Kbd/Kbd.stories.jsx', 'kbdVariants' ],
  [ 'Link', 'core/Link/Link.stories.jsx', 'linkVariants' ],
  [ 'Pill', 'core/Pill/Pill.stories.jsx', 'pillVariants' ],
  [ 'Terminal', 'core/Terminal/Terminal.stories.jsx', 'terminalVariants' ],
  [ 'TextHighlight', 'core/TextHighlight/TextHighlight.stories.jsx', 'textHighlightVariants' ]
];

test('customised core components keep public stories and variant map exports', () => {
  for (const [ componentName, storyPath, variantExport ] of customisedCoreComponents) {
    assert.ok(
      existsSync(join(componentsDir, storyPath)), `${componentName} must keep its colocated Storybook story`
    );
    assert.match(
      publicIndex, new RegExp(`\\b${variantExport}\\b`), `${componentName} must export ${variantExport} from the public package API`
    );
  }
});

test('shared variant utility is exported from the public package API', () => {
  assert.match(publicIndex, /\bcreateVariants\b/);
});
