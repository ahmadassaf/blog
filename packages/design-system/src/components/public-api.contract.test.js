import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const componentsDir = dirname(fileURLToPath(import.meta.url));
const packageSrcDir = dirname(componentsDir);
const publicIndex = readFileSync(join(packageSrcDir, 'index.js'), 'utf8');

const customisedPrimitives = [
  [ 'Avatar', 'primitives/Avatar/Avatar.stories.jsx', 'avatarVariants' ],
  [ 'Banner', 'primitives/Banner/Banner.stories.jsx', 'bannerVariants' ],
  [ 'Button', 'primitives/Button/Button.stories.jsx', 'buttonVariants' ],
  [ 'Card', 'primitives/Card/Card.stories.jsx', 'cardVariants' ],
  [ 'Carousel', 'primitives/Carousel/Carousel.stories.jsx', 'carouselVariants' ],
  [ 'Grid', 'primitives/Grid/Grid.stories.jsx', 'gridVariants' ],
  [ 'Kbd', 'primitives/Kbd/Kbd.stories.jsx', 'kbdVariants' ],
  [ 'Link', 'primitives/Link/Link.stories.jsx', 'linkVariants' ],
  [ 'Pill', 'primitives/Pill/Pill.stories.jsx', 'pillVariants' ],
  [ 'Terminal', 'primitives/Terminal/Terminal.stories.jsx', 'terminalVariants' ],
  [ 'TextHighlight', 'primitives/TextHighlight/TextHighlight.stories.jsx', 'textHighlightVariants' ]
];

test('customised primitives keep public stories and variant map exports', () => {
  for (const [ componentName, storyPath, variantExport ] of customisedPrimitives) {
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
