import { Icon, Link } from '@gaudi/design-system';

import siteMetadata from '@/data/meta/metadata';

import { FitChecker,
  GraphModelExplorer,
  HeroGraph,
  ModelComparison,
  ReadingProgress,
  VendorExplorer } from './KnowledgeGraphExperiments';

import styles from './KnowledgeGraphsArticle.module.css';

const anatomy = [
  {
    'body': 'People, places, products, events, documents, and abstract concepts.',
    'icon': 'Cubes',
    'label': 'Nodes',
    'number': '01'
  },
  {
    'body': 'Named connections that turn isolated records into navigable context.',
    'icon': 'Fork',
    'label': 'Edges',
    'number': '02'
  },
  {
    'body': 'Types, attributes, and rules that make a connection meaningful to machines.',
    'icon': 'Tags',
    'label': 'Semantics',
    'number': '03'
  }
];

const machineLearningUses = [
  {
    'body': 'A graph can expand sparse training data with related entities and useful positive or negative examples.',
    'icon': 'Plus',
    'title': 'More signal from less data'
  },
  {
    'body': 'Explicit domain relationships can complement a model when a situation never appeared in its training set.',
    'icon': 'LightBulbIcon',
    'title': 'A path through zero-shot cases'
  },
  {
    'body': 'Predictions can be mapped back to entities and relationships, giving people an inspectable chain of context.',
    'icon': 'Search',
    'title': 'Explanations with evidence'
  }
];

const sources = [
  {
    'href': 'https://www.ibm.com/topics/knowledge-graph',
    'label': 'IBM, What is a knowledge graph?'
  },
  {
    'href': 'https://ceur-ws.org/Vol-1695/paper4.pdf',
    'label': 'Ehrlinger and Woss, Towards a Definition of Knowledge Graphs'
  },
  {
    'href': 'https://www.w3.org/RDF/',
    'label': 'W3C Resource Description Framework'
  },
  {
    'href': 'https://www.w3.org/TR/sparql11-query/',
    'label': 'W3C SPARQL 1.1 Query Language'
  },
  {
    'href': 'https://www.w3.org/groups/wg/rdf-star/',
    'label': 'W3C RDF-star Working Group'
  },
  {
    'href': 'https://blog.google/products/search/introducing-knowledge-graph-things-not/',
    'label': 'Google, Introducing the Knowledge Graph'
  }
];

const formatDate = (date) => new Intl.DateTimeFormat(siteMetadata.locale, {
  'day': 'numeric',
  'month': 'long',
  'year': 'numeric'
}).format(new Date(date));

export default function KnowledgeGraphsArticle({ post }) {
  return (
    <div className={ styles.article }>
      <ReadingProgress />

      <header className={ styles.hero }>
        <div className={ styles.heroCopy }>
          <div className={ styles.seriesLine }>
            <Link href={ `/blog/categories/${post.category}` }>{post.category}</Link>
            {post.series && <span>Part {post.series.order} of {post.series.title}</span>}
          </div>
          <h1>{post.title}</h1>
          <p className={ styles.dek }>A visual field guide to data where relationships are first-class.</p>
          <div className={ styles.byline }>
            <time dateTime={ post.date }>{formatDate(post.date)}</time>
            {post.updated && <span>Updated {formatDate(post.updated)}</span>}
            <span>{post.readingTime?.text || 'A comprehensive guide'}</span>
          </div>
        </div>

        <HeroGraph />
      </header>

      <nav className={ styles.articleNav } aria-label='Article sections'>
        <a href='#definition'>Definition</a>
        <a href='#fit'>Fit</a>
        <a href='#models'>Models</a>
        <a href='#comparison'>Compare</a>
        <a href='#applications'>Applications</a>
        <a href='#field-guide'>Field guide</a>
      </nav>

      <div>
        <section className={ styles.definitionSection } id='definition'>
          <div className={ styles.sectionMarker } aria-hidden='true'>01</div>
          <div className={ styles.definitionLead }>
            <p className={ styles.kicker }>Start with the relationship</p>
            <h2>A knowledge graph is a connected model of things and what they mean to each other.</h2>
          </div>
          <div className={ styles.definitionBody }>
            <p>
              Traditional systems are good at storing records. They become less natural when the question depends on a chain of relationships across people, places, events, products, and documents.
            </p>
            <p>
              A knowledge graph represents those real-world entities as nodes and their relationships as named edges. A semantic model describes the types and rules, so the result is readable by people and interpretable by software.
            </p>
            <aside className={ styles.definitionCallout }>
              <Icon name='Info' size='sm' decorative />
              <p>The graph stores connections. The knowledge model gives those connections a shared meaning.</p>
            </aside>
          </div>
        </section>

        <section className={ styles.anatomySection } aria-labelledby='anatomy-title'>
          <div className={ styles.anatomyHeader }>
            <p className={ styles.kicker }>The anatomy</p>
            <h2 id='anatomy-title'>Three ingredients, one connected context.</h2>
          </div>
          <div className={ styles.anatomyRows }>
            {anatomy.map((item) => (
              <div className={ styles.anatomyRow } key={ item.label }>
                <span className={ styles.anatomyNumber }>{item.number}</span>
                <span className={ styles.anatomyIcon }><Icon name={ item.icon } size='md' decorative /></span>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={ styles.pathsSection } aria-labelledby='paths-title'>
          <div className={ styles.pathsCopy }>
            <p className={ styles.kicker }>Under the hood</p>
            <h2 id='paths-title'>Tables work with sets. Graphs work with paths.</h2>
            <p>
              Relational systems reconstruct a path through joins. A graph stores relationships as part of the model, so a traversal follows the connections that already exist.
            </p>
          </div>
          <div className={ styles.pathComparison }>
            <div className={ styles.joinPanel }>
              <span className={ styles.panelLabel }>Relational question</span>
              <code>person JOIN team JOIN project JOIN topic</code>
              <div className={ styles.joinSteps } aria-label='A chain of four joins'>
                <span>person</span><i>join</i><span>team</span><i>join</i><span>project</span><i>join</i><span>topic</span>
              </div>
            </div>
            <div className={ styles.traversalPanel }>
              <span className={ styles.panelLabel }>Graph question</span>
              <code>(person)-[:CONTRIBUTED_TO]-&gt;(topic)</code>
              <div className={ styles.traversalSteps } aria-label='A direct graph traversal'>
                <span>person</span><i>contributed to</i><span>topic</span>
              </div>
            </div>
          </div>
        </section>

        <section className={ styles.fitSection } id='fit'>
          <div className={ styles.sectionMarker } aria-hidden='true'>02</div>
          <div className={ styles.fitIntro }>
            <p className={ styles.kicker }>Choose the model deliberately</p>
            <h2>Do you actually need a graph?</h2>
            <p>
              Graph technology is compelling, but it is not a universal replacement for relational data. Test the shape of your problem first.
            </p>
          </div>
          <FitChecker />
        </section>

        <section className={ styles.modelsSection } id='models'>
          <div className={ styles.sectionMarker } aria-hidden='true'>03</div>
          <div className={ styles.modelsIntro }>
            <p className={ styles.kicker }>Graphs as data models</p>
            <h2>Similar shape, different promises.</h2>
            <p>
              The words graph database and knowledge graph hide several models. Explore what each one makes explicit.
            </p>
          </div>
          <GraphModelExplorer />
        </section>

        <section className={ styles.notGraphSection } aria-labelledby='not-graph-title'>
          <div className={ styles.notGraphStatement }>
            <Icon name='LinkSlashIcon' size='lg' decorative />
            <h2 id='not-graph-title'>A graph shape alone does not create knowledge.</h2>
          </div>
          <div className={ styles.notGraphReasons }>
            <div>
              <span>Not every RDF graph</span>
              <p>A collection of triples may represent data without capturing enough semantic context to form a knowledge graph.</p>
            </div>
            <div>
              <span>Not every knowledge base</span>
              <p>A document library or rule system may contain expertise without interlinked entity descriptions.</p>
            </div>
          </div>
        </section>

        <section className={ styles.comparisonSection } id='comparison'>
          <div className={ styles.sectionMarker } aria-hidden='true'>04</div>
          <div className={ styles.comparisonIntro }>
            <p className={ styles.kicker }>RDF and property graphs</p>
            <h2>Pick the guarantees that matter.</h2>
            <p>
              RDF emphasizes shared identifiers, formal semantics, and standards. Property graphs emphasize pragmatic traversal and properties attached directly to nodes and edges.
            </p>
          </div>
          <ModelComparison />
        </section>

        <section className={ styles.applicationsSection } id='applications'>
          <div className={ styles.sectionMarker } aria-hidden='true'>05</div>
          <div className={ styles.applicationsIntro }>
            <p className={ styles.kicker }>Knowledge graphs and machine learning</p>
            <h2>Make models more informed and more inspectable.</h2>
          </div>
          <div className={ styles.applicationLayout }>
            <div className={ styles.applicationPrimary }>
              <span className={ styles.applicationIcon }><Icon name={ machineLearningUses[0].icon } size='lg' decorative /></span>
              <h3>{machineLearningUses[0].title}</h3>
              <p>{machineLearningUses[0].body}</p>
              <div className={ styles.signalPath } aria-label='A sparse observation enriched with graph context'>
                <span>Sparse observation</span><Icon name='ArrowRight' size='sm' decorative /><span>Related entities</span><Icon name='ArrowRight' size='sm' decorative /><strong>Richer signal</strong>
              </div>
            </div>
            <div className={ styles.applicationSecondary }>
              {machineLearningUses.slice(1).map((item) => (
                <div key={ item.title }>
                  <span className={ styles.applicationIcon }><Icon name={ item.icon } size='md' decorative /></span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={ styles.fieldGuideSection } id='field-guide'>
          <div className={ styles.sectionMarker } aria-hidden='true'>06</div>
          <div className={ styles.fieldGuideIntro }>
            <p className={ styles.kicker }>Technology field guide</p>
            <h2>Explore the original vendor landscape.</h2>
            <p>
              This directory reflects the article's November 2024 research snapshot. Product capabilities change, so use it as an orientation layer and verify current details with each vendor.
            </p>
          </div>
          <VendorExplorer />
        </section>

        <section className={ styles.sourcesSection } aria-labelledby='sources-title'>
          <div>
            <p className={ styles.kicker }>Sources and further reading</p>
            <h2 id='sources-title'>Continue through the standards.</h2>
            <p>
              This visual edition distills the original essay. Its bibliography and long-form vendor research remain attached to the source document.
            </p>
          </div>
          <ol>
            {sources.map((source) => (
              <li key={ source.href }>
                <Link href={ source.href }>{source.label}</Link>
                <Icon name='ArrowRight' size='xs' decorative />
              </li>
            ))}
          </ol>
        </section>

        <footer className={ styles.articleClose }>
          <div className={ styles.closeGraph } aria-hidden='true'>
            <span></span><span></span><span></span><span></span>
          </div>
          <div>
            <p className={ styles.kicker }>The durable idea</p>
            <h2>Store the thing. Model the connection. Preserve the meaning.</h2>
          </div>
        </footer>
      </div>
    </div>
  );
}
