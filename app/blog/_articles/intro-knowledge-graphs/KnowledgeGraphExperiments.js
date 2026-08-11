'use client';

import { useMemo, useState } from 'react';
import { Button, Icon } from '@gaudi/design-system';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import styles from './KnowledgeGraphsArticle.module.css';

const transition = {
  'duration': 0.36,
  'ease': [ 0.16, 1, 0.3, 1 ]
};

const graphNodes = [
  {
    'description': 'A person, company, place, product, event, or concept with a stable identity.',
    'id': 'entity',
    'label': 'Entity',
    'position': { 'left': '50%', 'top': '48%' },
    'type': 'Core node'
  },
  {
    'description': 'Documents and datasets supply evidence about the entity.',
    'id': 'source',
    'label': 'Source',
    'position': { 'left': '17%', 'top': '19%' },
    'type': 'Evidence'
  },
  {
    'description': 'A schema says which kinds of things and relationships are valid.',
    'id': 'schema',
    'label': 'Schema',
    'position': { 'left': '80%', 'top': '18%' },
    'type': 'Meaning'
  },
  {
    'description': 'Search can follow meaning and context instead of matching words alone.',
    'id': 'search',
    'label': 'Search',
    'position': { 'left': '15%', 'top': '78%' },
    'type': 'Application'
  },
  {
    'description': 'Machine learning can use graph context as features, constraints, or explanations.',
    'id': 'ml',
    'label': 'ML',
    'position': { 'left': '82%', 'top': '78%' },
    'type': 'Application'
  }
];

const graphEdges = [
  { 'angle': '40deg', 'left': '19%', 'top': '24%', 'width': '39%' },
  { 'angle': '-40deg', 'left': '50%', 'top': '48%', 'width': '39%' },
  { 'angle': '-35deg', 'left': '17%', 'top': '76%', 'width': '40%' },
  { 'angle': '35deg', 'left': '50%', 'top': '49%', 'width': '41%' }
];

const fitQuestions = [
  {
    'body': 'The questions you care about depend on relationships across several kinds of entities.',
    'id': 'connected',
    'label': 'Are connections central?'
  },
  {
    'body': 'People will traverse, retrieve, and analyze the data more often than they simply append records.',
    'id': 'retrieval',
    'label': 'Is retrieval the priority?'
  },
  {
    'body': 'New entity types and relationships appear often enough that a rigid table design creates friction.',
    'id': 'change',
    'label': 'Does the model evolve?'
  }
];

const graphModels = {
  'directed': {
    'description': 'Nodes are joined by named, directional edges. The relationship is part of the statement, not an implied join.',
    'example': [ 'Ada', 'authored', 'Paper' ],
    'label': 'Directed labelled',
    'note': 'Best mental starting point',
    'traits': [ 'Named edges', 'Cycles allowed', 'Missing facts can be omitted' ]
  },
  'heterogeneous': {
    'description': 'Nodes and edges have explicit types, making it useful when a network contains several kinds of actors and relations.',
    'example': [ 'Person', 'writes', 'Document' ],
    'label': 'Heterogeneous',
    'note': 'Useful for typed networks',
    'traits': [ 'Typed nodes', 'Typed edges', 'ML-friendly partitions' ]
  },
  'property': {
    'description': 'Nodes and edges can carry key-value properties. Implementations are practical and expressive, but historically vendor-specific.',
    'example': [ 'Person {name}', 'works_at {since}', 'Company {sector}' ],
    'label': 'Property graph',
    'note': 'Optimized for traversal',
    'traits': [ 'Properties on edges', 'Local identifiers', 'Cypher or vendor queries' ]
  },
  'rdf': {
    'description': 'Every fact is a subject, predicate, object triple. Global identifiers and W3C standards make graphs portable and composable.',
    'example': [ 'ahmad:person', 'schema:knows', 'mira:person' ],
    'label': 'RDF',
    'note': 'Built for linked data',
    'traits': [ 'Global IRIs', 'Formal semantics', 'SPARQL and standard formats' ]
  }
};

const comparisonLenses = {
  'composition': {
    'property': 'Database-local identifiers and schemas usually require explicit integration work.',
    'rdf': 'Statements with the same global identifier naturally describe the same resource when combined.',
    'summary': 'Choose RDF when independently published datasets need to compose into a larger graph.'
  },
  'portability': {
    'property': 'Implementations, query languages, and exchange formats vary across products.',
    'rdf': 'A W3C data model, query language, and serialization formats support exchange across systems.',
    'summary': 'Choose RDF when durable interchange and shared identifiers are core requirements.'
  },
  'semantics': {
    'property': 'Labels and properties express structure, but the model does not require formal shared meaning.',
    'rdf': 'RDFS, OWL, and shapes can define classes, constraints, and rules alongside the data.',
    'summary': 'Choose formal semantics when software must interpret and reason over meaning consistently.'
  },
  'traversal': {
    'property': 'Properties on nodes and edges make operational traversals and graph analytics direct.',
    'rdf': 'SPARQL supports graph patterns and set-oriented analysis with schema abstraction.',
    'summary': 'Choose the query model that matches the paths and analysis your application performs most.'
  }
};

const vendors = [
  { 'deployment': 'Cloud', 'href': 'https://aws.amazon.com/neptune/', 'model': 'Property, RDF', 'name': 'Amazon Neptune', 'query': 'Gremlin, SPARQL', 'type': 'native' },
  { 'deployment': 'Hybrid', 'href': 'https://www.cambridgesemantics.com/anzograph/', 'model': 'RDF, RDF-star', 'name': 'AnzoGraph', 'query': 'openCypher, SPARQL', 'type': 'native' },
  { 'deployment': 'Multicloud', 'href': 'https://www.datastax.com/products/datastax-astra', 'model': 'Property', 'name': 'DataStax Astra', 'query': 'Gremlin, GraphQL', 'type': 'multimodel' },
  { 'deployment': 'Cloud, on-premises', 'href': 'https://dgraph.io/', 'model': 'GraphQL, JSON, RDF', 'name': 'Dgraph', 'query': 'DQL, GraphQL', 'type': 'native' },
  { 'deployment': 'Hybrid', 'href': 'https://allegrograph.com/products/allegrograph/', 'model': 'Document, RDF, RDF-star', 'name': 'AllegroGraph', 'query': 'SPARQL, GraphQL', 'type': 'multimodel' },
  { 'deployment': 'Hybrid', 'href': 'https://www.progress.com/marklogic', 'model': 'Document, triples', 'name': 'MarkLogic', 'query': 'SPARQL, XQuery', 'type': 'multimodel' },
  { 'deployment': 'Cloud', 'href': 'https://azure.microsoft.com/products/cosmos-db/', 'model': 'Property', 'name': 'Azure Cosmos DB', 'query': 'Gremlin', 'type': 'multimodel' },
  { 'deployment': 'Hybrid', 'href': 'https://neo4j.com/product/neo4j-graph-database/', 'model': 'Property', 'name': 'Neo4j', 'query': 'Cypher', 'type': 'native' },
  { 'deployment': 'Multicloud, on-premises', 'href': 'https://www.ontotext.com/products/graphdb/', 'model': 'RDF, RDF-star', 'name': 'Ontotext GraphDB', 'query': 'SPARQL, GraphQL', 'type': 'native' },
  { 'deployment': 'Hybrid', 'href': 'https://virtuoso.openlinksw.com/', 'model': 'Relational, RDF', 'name': 'OpenLink Virtuoso', 'query': 'SPARQL, SQL', 'type': 'multimodel' },
  { 'deployment': 'Hybrid', 'href': 'https://www.oracle.com/database/graph/', 'model': 'Property, RDF', 'name': 'Oracle Database Graph', 'query': 'PGQL, SPARQL', 'type': 'multimodel' },
  { 'deployment': 'Hybrid', 'href': 'https://redis.io/docs/latest/develop/data-types/graphs/', 'model': 'Property', 'name': 'Redis Graph', 'query': 'Cypher', 'type': 'multimodel' },
  { 'deployment': 'Cloud, on-premises', 'href': 'https://www.sap.com/products/data-cloud/hana.html', 'model': 'Property', 'name': 'SAP HANA Graph', 'query': 'GraphScript, SQL', 'type': 'multimodel' },
  { 'deployment': 'Hybrid', 'href': 'https://www.stardog.com/platform/', 'model': 'RDF, RDF-star', 'name': 'Stardog', 'query': 'SPARQL, GraphQL', 'type': 'native' },
  { 'deployment': 'Hybrid', 'href': 'https://www.tibco.com/products/tibco-graph-database', 'model': 'Property', 'name': 'TIBCO Graph Database', 'query': 'Gremlin', 'type': 'native' },
  { 'deployment': 'Multicloud, on-premises', 'href': 'https://www.tigergraph.com/', 'model': 'Labelled property', 'name': 'TigerGraph', 'query': 'GSQL', 'type': 'native' }
];

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

export function HeroGraph() {
  const [ selectedId, setSelectedId ] = useState('entity');
  const reduceMotion = useReducedMotion();
  const selectedNode = graphNodes.find((node) => node.id === selectedId);

  return (
    <div className={ styles.heroGraph }>
      <div className={ styles.graphCanvas } aria-label='An interactive map of a knowledge graph and its uses'>
        {graphEdges.map((edge) => (
          <span
            aria-hidden='true'
            className={ styles.graphEdge }
            key={ `${edge.left}-${edge.top}` }
            style={{ '--edge-angle': edge.angle, '--edge-left': edge.left, '--edge-top': edge.top, '--edge-width': edge.width }}
          />
        ))}
        {graphNodes.map((node) => (
          <button
            aria-pressed={ selectedId === node.id }
            className={ `${styles.graphNode} ${selectedId === node.id ? styles.graphNodeActive : ''}` }
            key={ node.id }
            onClick={ () => setSelectedId(node.id) }
            style={ node.position }
            type='button'
          >
            <span>{node.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode='wait' initial={ false }>
        <motion.div
          animate={{ 'opacity': 1, 'y': 0 }}
          className={ styles.graphDetail }
          exit={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'y': -6 } }
          initial={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'y': 8 } }
          key={ selectedId }
          transition={ transition }
        >
          <span>{selectedNode.type}</span>
          <strong>{selectedNode.label}</strong>
          <p>{selectedNode.description}</p>
        </motion.div>
      </AnimatePresence>
      <p className={ styles.graphHint }><Icon name='Cubes' size='xs' decorative /> Select a node to inspect its role.</p>
    </div>
  );
}

export function FitChecker() {
  const [ answers, setAnswers ] = useState({ 'change': null, 'connected': null, 'retrieval': null });
  const answered = Object.values(answers).filter((answer) => answer !== null).length;
  const yesCount = Object.values(answers).filter(Boolean).length;

  let result = 'Answer the three questions to pressure-test your use case.';
  let resultTitle = 'Start with the problem';

  if (answered === 3 && yesCount === 3) {
    resultTitle = 'A graph is worth prototyping';
    result = 'Your problem is relationship-heavy, read-oriented, and evolving. Test one valuable traversal with representative data.';
  } else if (answered === 3 && yesCount >= 1) {
    resultTitle = 'Consider a hybrid approach';
    result = 'Some parts fit a graph, but the whole system may not need one. Isolate the connected-data workload and compare it with a simpler model.';
  } else if (answered === 3) {
    resultTitle = 'A table may be the clearer tool';
    result = 'Stable, transaction-oriented records with few meaningful traversals are usually easier to operate in a relational model.';
  }

  return (
    <div className={ styles.fitChecker }>
      <div className={ styles.fitQuestions }>
        {fitQuestions.map((question, index) => (
          <div className={ styles.fitQuestion } key={ question.id }>
            <span className={ styles.questionNumber }>{index + 1}</span>
            <div>
              <h3>{question.label}</h3>
              <p>{question.body}</p>
            </div>
            <div className={ styles.binaryControl } aria-label={ question.label }>
              <Button
                aria-pressed={ answers[question.id] === true }
                onClick={ () => setAnswers((current) => {
                  return { ...current, [question.id]: true };
                }) }
                size='xs'
                tone={ answers[question.id] === true ? 'accent' : 'neutral' }
                variant={ answers[question.id] === true ? 'solid' : 'ghost' }
              >Yes</Button>
              <Button
                aria-pressed={ answers[question.id] === false }
                onClick={ () => setAnswers((current) => {
                  return { ...current, [question.id]: false };
                }) }
                size='xs'
                tone='neutral'
                variant={ answers[question.id] === false ? 'soft' : 'ghost' }
              >No</Button>
            </div>
          </div>
        ))}
      </div>
      <div className={ styles.fitResult } aria-live='polite'>
        <span>{answered} of 3 answered</span>
        <h3>{resultTitle}</h3>
        <p>{result}</p>
        {answered > 0 && (
          <Button
            onClick={ () => setAnswers({ 'change': null, 'connected': null, 'retrieval': null }) }
            size='xs'
            tone='neutral'
            variant='ghost'
          >Reset diagnostic</Button>
        )}
      </div>
    </div>
  );
}

export function GraphModelExplorer() {
  const [ model, setModel ] = useState('directed');
  const reduceMotion = useReducedMotion();
  const activeModel = graphModels[model];

  return (
    <div className={ styles.modelExplorer }>
      <div className={ styles.modelTabs } role='tablist' aria-label='Graph data models'>
        {Object.entries(graphModels).map(([ key, item ]) => (
          <button
            aria-controls='graph-model-panel'
            aria-selected={ model === key }
            className={ model === key ? styles.modelTabActive : '' }
            key={ key }
            onClick={ () => setModel(key) }
            role='tab'
            type='button'
          >
            <span>{item.label}</span>
            <small>{item.note}</small>
          </button>
        ))}
      </div>
      <AnimatePresence mode='wait' initial={ false }>
        <motion.div
          animate={{ 'opacity': 1, 'x': 0 }}
          className={ styles.modelPanel }
          exit={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'x': -10 } }
          id='graph-model-panel'
          initial={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'x': 14 } }
          key={ model }
          role='tabpanel'
          transition={ transition }
        >
          <div className={ styles.modelCopy }>
            <span>{activeModel.note}</span>
            <h3>{activeModel.label}</h3>
            <p>{activeModel.description}</p>
            <ul>
              {activeModel.traits.map((trait) => <li key={ trait }><Icon name='Check' size='xs' decorative />{trait}</li>)}
            </ul>
          </div>
          <div className={ styles.tripleCanvas } aria-label={ `${activeModel.label} example` }>
            <span>{activeModel.example[0]}</span>
            <div><i></i><strong>{activeModel.example[1]}</strong></div>
            <span>{activeModel.example[2]}</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function ModelComparison() {
  const [ lens, setLens ] = useState('portability');
  const reduceMotion = useReducedMotion();
  const activeLens = comparisonLenses[lens];

  return (
    <div className={ styles.modelComparison }>
      <div className={ styles.lensControls } role='tablist' aria-label='RDF and property graph comparison lenses'>
        {Object.keys(comparisonLenses).map((key) => (
          <Button
            aria-controls='comparison-panel'
            aria-selected={ lens === key }
            className={ styles.lensButton }
            key={ key }
            onClick={ () => setLens(key) }
            role='tab'
            size='sm'
            tone={ lens === key ? 'accent' : 'neutral' }
            variant={ lens === key ? 'soft' : 'ghost' }
          >{key}</Button>
        ))}
      </div>
      <AnimatePresence mode='wait' initial={ false }>
        <motion.div
          animate={{ 'opacity': 1, 'y': 0 }}
          className={ styles.comparisonPanel }
          exit={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'y': -8 } }
          id='comparison-panel'
          initial={ reduceMotion ? { 'opacity': 0 } : { 'opacity': 0, 'y': 10 } }
          key={ lens }
          role='tabpanel'
          transition={ transition }
        >
          <div className={ styles.rdfSide }>
            <span>RDF</span>
            <p>{activeLens.rdf}</p>
          </div>
          <div className={ styles.propertySide }>
            <span>Property graph</span>
            <p>{activeLens.property}</p>
          </div>
          <p className={ styles.comparisonSummary }><Icon name='LightBulbIcon' size='sm' decorative />{activeLens.summary}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function VendorExplorer() {
  const [ filter, setFilter ] = useState('all');
  const [ query, setQuery ] = useState('');
  const visibleVendors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const matchesFilter = filter === 'all' || vendor.type === filter;
      const matchesQuery = !normalizedQuery || [ vendor.name, vendor.model, vendor.query, vendor.deployment ]
        .some((value) => value.toLowerCase().includes(normalizedQuery));

      return matchesFilter && matchesQuery;
    });
  }, [ filter, query ]);

  return (
    <div className={ styles.vendorExplorer }>
      <div className={ styles.vendorToolbar }>
        <label className={ styles.vendorSearch }>
          <Icon name='Search' size='sm' decorative />
          <span className='sr-only'>Search graph database vendors</span>
          <input
            onChange={ (event) => setQuery(event.target.value) }
            placeholder='Search model, query, or vendor'
            type='search'
            value={ query }
          />
        </label>
        <div className={ styles.vendorFilters } aria-label='Filter vendors'>
          {[
            [ 'all', 'All' ],
            [ 'native', 'Native' ],
            [ 'multimodel', 'Multimodel' ]
          ].map(([ key, label ]) => (
            <Button
              aria-pressed={ filter === key }
              key={ key }
              onClick={ () => setFilter(key) }
              size='xs'
              tone={ filter === key ? 'accent' : 'neutral' }
              variant={ filter === key ? 'solid' : 'ghost' }
            >{label}</Button>
          ))}
        </div>
      </div>
      <div className={ styles.vendorCount } aria-live='polite'>{visibleVendors.length} systems shown</div>
      <div className={ styles.vendorList }>
        {visibleVendors.map((vendor) => (
          <a href={ vendor.href } key={ vendor.name } rel='noopener noreferrer' target='_blank'>
            <div className={ styles.vendorName }>
              <strong>{vendor.name}</strong>
              <span>{vendor.type === 'native' ? 'Native graph' : 'Multimodel'}</span>
            </div>
            <span>{vendor.model}</span>
            <span>{vendor.query}</span>
            <span>{vendor.deployment}</span>
            <Icon name='ArrowRight' size='sm' decorative />
          </a>
        ))}
        {visibleVendors.length === 0 && (
          <div className={ styles.vendorEmpty }>
            <Icon name='Search' size='md' decorative />
            <p>No systems match that combination.</p>
            <Button onClick={ () => {
              setFilter('all'); setQuery('');
            } } size='xs' tone='neutral' variant='ghost'>Clear filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
