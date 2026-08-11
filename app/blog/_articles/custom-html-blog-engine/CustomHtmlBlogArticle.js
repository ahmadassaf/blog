import { Icon, Link } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

import { EngineComparison, InteractionExplorer, ReadingProgress } from './ArticleExperiments';

import styles from './CustomHtmlBlogArticle.module.css';

const articleParts = [
  {
    'body': 'Contentlayer still supplies dates, tags, summaries, URLs, and structured metadata.',
    'icon': 'FileText',
    'title': 'Metadata stays content-first'
  },
  {
    'body': 'One explicit map connects a content slug to its authored article component.',
    'icon': 'Fork',
    'title': 'The registry stays tiny'
  },
  {
    'body': 'The article owns its semantic HTML, visual rhythm, and small client-side interactions.',
    'icon': 'CodeBracketIcon',
    'title': 'The story becomes code-native'
  }
];

const guardrails = [
  'Use Gaudi tokens and components.',
  'Keep metadata and URLs stable.',
  'Ship semantic HTML before motion.',
  'Isolate state in small client islands.'
];

const formatDate = (date) => new Intl.DateTimeFormat(siteMetadata.locale, {
  'day': 'numeric',
  'month': 'long',
  'year': 'numeric'
}).format(new Date(date));

export default function CustomHtmlBlogArticle({ post }) {
  return (
    <div className={ styles.article }>
      <ReadingProgress />

      <header className={ styles.hero }>
        <div className={ styles.heroCopy }>
          <Link className={ styles.category } href={ `/blog/categories/${post.category}` }>
            {post.category}
          </Link>
          <h1>{post.title}</h1>
          <p className={ styles.dek }>{post.subtitle}</p>
          <div className={ styles.byline }>
            <time dateTime={ post.date }>{formatDate(post.date)}</time>
            <span>{post.readingTime?.text || 'A short read'}</span>
            <span>Code-native article</span>
          </div>
        </div>

        <div className={ styles.heroDiagram } aria-label='A shared publishing layer feeding either the standard MDX renderer or a custom article'>
          <div className={ styles.diagramSource }>
            <Icon name='FileText' size='sm' decorative />
            <span>One metadata source</span>
          </div>
          <div className={ styles.diagramStem } aria-hidden='true'/>
          <div className={ styles.diagramRoutes }>
            <div>
              <span>Everyday posts</span>
              <strong>MDX renderer</strong>
            </div>
            <div className={ styles.activeRoute }>
              <span>Standout stories</span>
              <strong>Custom document</strong>
            </div>
          </div>
        </div>
      </header>

      <nav className={ styles.articleNav } aria-label='Article sections'>
        <a href='#idea'>The idea</a>
        <a href='#engine'>The engine</a>
        <a href='#interactions'>The interactions</a>
        <a href='#rules'>The rules</a>
      </nav>

      <div>
        <section className={ styles.opening } id='idea'>
          <p className={ styles.lead }>
            We do not need a universal content abstraction for every story. We need a reliable publishing layer and permission for the important stories to become interfaces.
          </p>
          <div className={ styles.openingBody }>
            <p>
              The blog already knows how to publish. It handles routes, metadata, feeds, discovery, comments, themes, and navigation. Replacing all of that would create a new maintenance problem.
            </p>
            <p>
              The smaller move is more powerful: keep the plumbing, then let a post opt out of the generic body renderer. A custom article can use the same design system while owning its composition completely.
            </p>
          </div>
        </section>

        <EngineComparison />

        <section className={ styles.engineSection } id='engine'>
          <div className={ styles.sectionIntro }>
            <h2>A post gets one new field.</h2>
            <p>
              The content file remains the searchable, indexable source of truth. The field only changes how the body is resolved.
            </p>
          </div>

          <div className={ styles.codeFrame }>
            <div className={ styles.codeFrameHeader }>
              <Icon name='markdown' size='sm' decorative />
              <span>custom-html-blog-engine.mdx</span>
            </div>
            <pre><code>{`---\ntitle: 'What if the Post Is the Interface?'\nengine: 'custom'\ncategory: 'engineering'\n---`}</code></pre>
          </div>

          <div className={ styles.engineRows }>
            {articleParts.map((part) => (
              <div className={ styles.engineRow } key={ part.title }>
                <span className={ styles.engineIcon }>
                  <Icon name={ part.icon } size='sm' decorative />
                </span>
                <div>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={ styles.fileRoute } aria-label='Custom article resolution path'>
            <code>frontmatter</code>
            <Icon name='ArrowRight' size='sm' decorative />
            <code>registry.js</code>
            <Icon name='ArrowRight' size='sm' decorative />
            <code>CustomHtmlBlogArticle.js</code>
          </div>
        </section>

        <section className={ styles.interactionSection } id='interactions'>
          <div className={ styles.sectionIntro }>
            <h2>Interactivity should carry the argument.</h2>
            <p>
              A custom article earns its extra code by making an idea easier to inspect, compare, or understand.
            </p>
          </div>
          <InteractionExplorer />
        </section>

        <section className={ styles.rulesSection } id='rules'>
          <div className={ styles.rulesStatement }>
            <h2>The engine stays deliberately boring.</h2>
            <p>
              The article can be expressive because the contract around it is small, explicit, and predictable.
            </p>
          </div>
          <div className={ styles.guardrails }>
            {guardrails.map((guardrail) => (
              <div key={ guardrail }>
                <Icon name='CheckIcon' size='sm' color='success' decorative />
                <span>{guardrail}</span>
              </div>
            ))}
          </div>
        </section>

        <footer className={ styles.articleClose }>
          <Icon name='Code' size='lg' color='primary' decorative />
          <h2>That is the whole engine.</h2>
          <p>
            One frontmatter field, one registry entry, and one authored component. Everything else remains shared.
          </p>
          <code>lib/blog-engine/registry.js</code>
        </footer>
      </div>
    </div>
  );
}
