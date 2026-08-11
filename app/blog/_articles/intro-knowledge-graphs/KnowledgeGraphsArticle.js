import { Link } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

import ArticleReadingProgress from './ArticleReadingProgress';

import styles from './KnowledgeGraphsArticle.module.css';

const chapters = [
  { 'href': '#what-is-a-knowledge-graph-kg', 'label': 'What is a knowledge graph?' },
  { 'href': '#under-the-hood', 'label': 'Sets and paths' },
  { 'href': '#how-to-determine-if-knowledge-graphs-are-what-you-need', 'label': 'When a graph fits' },
  { 'href': '#graphs-as-data-structures', 'label': 'Graph structures' },
  { 'href': '#graphs-as-data-models', 'label': 'Graph data models' },
  { 'href': '#rdf-vs-property-graph', 'label': 'RDF and property graphs' },
  { 'href': '#why-knowledge-graphs-are-very-exciting-for-ml', 'label': 'Machine learning' },
  { 'href': '#appendix', 'label': 'Vendor appendix' }
];

const formatDate = (date) => new Intl.DateTimeFormat(siteMetadata.locale, {
  'day': 'numeric',
  'month': 'long',
  'year': 'numeric'
}).format(new Date(date));

export default function KnowledgeGraphsArticle({ children, post }) {
  return (
    <div className={ styles.article }>
      <ArticleReadingProgress />

      <header className={ styles.hero }>
        <div className={ styles.heroMeta }>
          <Link href={ `/blog/categories/${post.category}` }>{post.category}</Link>
          {post.series && <span>{post.series.title}, part {post.series.order}</span>}
        </div>

        <h1>{post.title}</h1>
        <p className={ styles.dek }>A comprehensive guide to connected data, semantic models, graph systems, and the decisions behind them.</p>

        <div className={ styles.publicationMeta }>
          <div>
            <span>Published</span>
            <time dateTime={ post.date }>{formatDate(post.date)}</time>
          </div>
          {post.updated && (
            <div>
              <span>Revised</span>
              <time dateTime={ post.updated }>{formatDate(post.updated)}</time>
            </div>
          )}
          <div>
            <span>Reading time</span>
            <strong>{post.readingTime?.text || 'Long-form'}</strong>
          </div>
        </div>

        <figure className={ styles.graphPrologue }>
          <div className={ styles.graphStatement }>
            <span>Things</span>
            <i aria-hidden='true'>are connected by</i>
            <span>Relationships</span>
            <i aria-hidden='true'>interpreted through</i>
            <span>Meaning</span>
          </div>
          <figcaption>The graph makes data navigable. The knowledge model makes it intelligible.</figcaption>
        </figure>
      </header>

      <div className={ styles.readingFrame }>
        <aside className={ styles.chapterRail } aria-label='Article chapters'>
          <div className={ styles.chapterRailInner }>
            <p>In this essay</p>
            <nav>
              {chapters.map((chapter) => (
                <a href={ chapter.href } key={ chapter.href }>{chapter.label}</a>
              ))}
            </nav>
            <div className={ styles.readingNote }>
              <strong>Reading note</strong>
              <p>This is a long technical primer. Definitions, standards, formulas, comparisons, and the original research appendix remain in the flow.</p>
            </div>
          </div>
        </aside>

        <div className={ styles.prose }>
          {children}
        </div>
      </div>

      <footer className={ styles.articleClose }>
        <p>Knowledge graphs in one sentence</p>
        <h2>Model the things. Preserve the relationships. Make the meaning explicit.</h2>
      </footer>
    </div>
  );
}
