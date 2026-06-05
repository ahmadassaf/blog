import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const componentsDir = dirname(fileURLToPath(import.meta.url));
const packageSrcDir = dirname(componentsDir);
const packageDir = dirname(packageSrcDir);
const repoDir = dirname(dirname(packageDir));
const publicIndex = readFileSync(join(packageSrcDir, 'index.js'), 'utf8');
const require = createRequire(import.meta.url);

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

test('article prose typography is owned by the design-system preset', () => {
  const preset = require(join(packageDir, 'tailwind-preset.cjs'));
  const appConfig = require(join(repoDir, 'tailwind.config.js'));
  const prose = preset.theme.extend.typography.DEFAULT.css;

  assert.equal(prose.fontSize, 'var(--ds-prose-font-size)');
  assert.equal(prose.lineHeight, 'var(--ds-line-height-prose)');
  assert.equal(prose.maxWidth, 'var(--ds-prose-max-width)');
  assert.equal(prose.h1.marginTop, 'var(--ds-prose-h1-margin-top)');
  assert.equal(prose.h1.marginBottom, 'var(--ds-prose-h1-margin-bottom)');
  assert.equal(prose.h2.marginTop, 'var(--ds-prose-h2-margin-top)');
  assert.equal(prose.h2.marginBottom, 'var(--ds-prose-h2-margin-bottom)');
  assert.equal(prose.h3.marginTop, 'var(--ds-prose-h3-margin-top)');
  assert.equal(prose.h3.marginBottom, 'var(--ds-prose-h3-margin-bottom)');
  assert.equal(prose.h4.marginTop, 'var(--ds-prose-h4-margin-top)');
  assert.equal(prose.h4.marginBottom, 'var(--ds-prose-h4-margin-bottom)');
  assert.equal(appConfig.theme.extend.typography, undefined);
});
