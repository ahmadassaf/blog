'use client';

import { useState } from 'react';
import { Button, Icon } from '@gaudi/design-system';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import styles from './CustomHtmlBlogArticle.module.css';

const comparisonModes = {
  'custom': {
    'description': 'The shared platform stops at the article boundary. The story supplies its own semantic document and focused interactions.',
    'label': 'Custom path',
    'layers': [
      { 'detail': 'Structured discovery and SEO', 'icon': 'FileText', 'name': 'Content metadata' },
      { 'detail': 'One slug mapped to one module', 'icon': 'Fork', 'name': 'Small registry' },
      { 'detail': 'Server HTML plus client islands', 'icon': 'CodeBracketIcon', 'name': 'Authored article' }
    ]
  },
  'mdx': {
    'description': 'The default path remains excellent for writing quickly with shared prose, code, citations, diagrams, and media components.',
    'label': 'Default path',
    'layers': [
      { 'detail': 'Markdown and frontmatter', 'icon': 'markdown', 'name': 'Post source' },
      { 'detail': 'Shared transforms and components', 'icon': 'RectangleStackIcon', 'name': 'MDX pipeline' },
      { 'detail': 'Consistent article layout', 'icon': 'BookOpen', 'name': 'Standard renderer' }
    ]
  }
};

const interactionModes = {
  'compare': {
    'description': 'Switch between two valid perspectives without duplicating the surrounding explanation.',
    'icon': 'RectangleGroupIcon',
    'label': 'Compare',
    'steps': [ 'Same evidence', 'Different lens', 'Clearer tradeoff' ]
  },
  'explain': {
    'description': 'Reveal a mechanism in the same order the reader needs to understand it.',
    'icon': 'LightBulbIcon',
    'label': 'Explain',
    'steps': [ 'Question', 'Mechanism', 'Consequence' ]
  },
  'explore': {
    'description': 'Let the reader choose where to go deeper while the main narrative stays intact.',
    'icon': 'Grid',
    'label': 'Explore',
    'steps': [ 'Stable thesis', 'Reader choice', 'Focused detail' ]
  }
};

const transition = {
  'duration': 0.42,
  'ease': [ 0.16, 1, 0.3, 1 ]
};

export function ReadingProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { 'damping': 32, 'mass': 0.25, 'stiffness': 180 });

  return (
    <motion.div
      aria-hidden='true'
      className={ styles.readingProgress }
      style={{ 'scaleX': reduceMotion ? scrollYProgress : smoothProgress }}
    />
  );
}

export function EngineComparison() {
  const [ mode, setMode ] = useState('custom');
  const reduceMotion = useReducedMotion();
  const activeMode = comparisonModes[mode];

  return (
    <section className={ styles.comparison } aria-labelledby='comparison-title'>
      <div className={ styles.comparisonHeader }>
        <div>
          <h2 id='comparison-title'>Two renderers. One publishing system.</h2>
          <p>Choose the standard path most of the time. Reach for the custom path when the format is part of the idea.</p>
        </div>
        <div className={ styles.modeControls } aria-label='Compare article renderers'>
          {Object.entries(comparisonModes).map(([ key, item ]) => (
            <Button
              aria-pressed={ mode === key }
              className={ styles.modeButton }
              key={ key }
              onClick={ () => setMode(key) }
              size='sm'
              tone={ mode === key ? 'accent' : 'neutral' }
              variant={ mode === key ? 'solid' : 'ghost' }
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <AnimatePresence mode='wait' initial={ false }>
        <motion.div
          animate={{ 'opacity': 1, 'y': 0 }}
          className={ styles.comparisonBody }
          exit={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'y': -8 } }
          initial={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'y': 12 } }
          key={ mode }
          transition={ transition }
        >
          <p className={ styles.modeDescription }>{activeMode.description}</p>
          <div className={ styles.layerSequence }>
            {activeMode.layers.map((layer, index) => (
              <div className={ styles.layerItem } key={ layer.name }>
                <span className={ styles.layerNumber }>{index + 1}</span>
                <Icon name={ layer.icon } size='sm' color={ mode === 'custom' ? 'primary' : 'muted' } decorative />
                <div>
                  <strong>{layer.name}</strong>
                  <span>{layer.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export function InteractionExplorer() {
  const [ mode, setMode ] = useState('explain');
  const reduceMotion = useReducedMotion();
  const activeMode = interactionModes[mode];

  return (
    <div className={ styles.interactionExplorer }>
      <div className={ styles.interactionControls } role='tablist' aria-label='Useful interaction patterns'>
        {Object.entries(interactionModes).map(([ key, item ]) => (
          <Button
            aria-controls='interaction-example'
            aria-selected={ mode === key }
            className={ styles.interactionButton }
            key={ key }
            onClick={ () => setMode(key) }
            role='tab'
            size='sm'
            tone={ mode === key ? 'accent' : 'neutral' }
            variant={ mode === key ? 'soft' : 'subtle' }
          >
            <Icon name={ item.icon } size='sm' decorative />
            {item.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode='wait' initial={ false }>
        <motion.div
          animate={{ 'opacity': 1, 'x': 0 }}
          className={ styles.interactionCanvas }
          exit={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'x': -12 } }
          id='interaction-example'
          initial={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'x': 16 } }
          key={ mode }
          role='tabpanel'
          transition={ transition }
        >
          <div className={ styles.interactionCopy }>
            <span className={ styles.interactionIcon }>
              <Icon name={ activeMode.icon } size='md' decorative />
            </span>
            <h3>{activeMode.label}</h3>
            <p>{activeMode.description}</p>
          </div>
          <div className={ styles.interactionSteps }>
            {activeMode.steps.map((step, index) => (
              <div key={ step }>
                <span>{index + 1}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
