# Blog-wide review, third pass, 4 November 2026

Scope: code (app, layouts, lib, scripts, config), all 21 interactive diagrams, and all 45 content documents, after the first two passes.

## Applied

- Content: a final polish on every file (grammar, casing, fences, prefixes, captions, quotes), committed as "polish: third editorial pass".
- Code (blog PR #6): table-of-contents anchors now use github-slugger so they match rehype-slug (dead anchors fixed; new tests); post dates passed as YYYY-MM-DD to avoid a hydration mismatch west of UTC; OG route 404s on unknown slugs and finds projects; categories page uses a real section landmark; sitemap includes / and /blog/tags and drops the trailing slash; robots.js uses siteMetadata.siteUrl; checkout-content redacts the token on failure; RSS has an XML declaration, &#39;, and a correct lastBuildDate; stale JSDoc fixed; stale test expectation fixed.
- Diagrams (blog-posts PR #11): see the commit "fix(visualisations): diagram bugs from the third review".

## Diagram verdicts (closed 5 November 2026)

Decisions: generative routing, growth levels and Ditto stages replaced by their reworks; gaudiBar keeps the original scene with the config panel added beneath it; pipeline and the quality framework keep their originals; RDF triple, RDF blank node and JSON-LD graph left as they are by choice. One version of every diagram remains (blog-posts #13, blog #9).

Original reviewer table, for the record:

| Explorer | Post | Verdict | Why |
| --- | --- | --- | --- |
| ImprovementKataExplorer | improvement-kata | keep | Predict, reveal, choose next; state-driven strip. |
| AgileCadenceExplorer | introduction-to-classical-agile | keep | Release-before-review and WIP-limit interactions have consequences. |
| AgileChartsExplorer (x5) | measuring-agile-teams | keep | Same line, different logs; scope vs completion; reveal unfinished work. |
| DittoStagesExplorer | projects/ditto | improve or drop | Five pills, one paragraph each; only the input/output JSON adds anything. |
| GaudiBarLayout | gaudi-bar-widget | improve, leaning drop | Selecting a region reveals a mock strip the bullets below already describe. |
| GenerativeRoutingExplorer | generative-ui | improve | Real idea; minified one-file blob, no figure/figcaption (reset now added). |
| GenerativeUIBlockBuilder | generative-ui | keep | Note survives reorder/remove/re-add (reset now added). |
| GenerativeUIComparison | generative-ui | keep | Text vs UI from one calculation; best-tested explorer. |
| GrowthLevelsExplorer | performance-management-evolution | improve | The promised "support and experiment" content is collapsed by default; terrace SVG is decoration. |
| JsonLdGraphExplorer | enabling-structured-data-jsonld | improve or drop | Edge labels useful; readout is pseudo-JSON the post then shows for real; not introduced by prose. |
| LinkedDataQualityFramework (x2) | roomba; quality framework | improve | Good static architecture figure; hover readout adds nothing. |
| OlapCubeExplorer | multi-dimensional-dbs | keep | Cells light up per verb; verified correct. |
| PipelineDiagram | jekyll CD | drop or static | Readout was template text (now per-stage sentences); prose barely refers to it. |
| RdfBlankNodeExplorer | rdf guide | static | Selecting a junction only dims the other branch. |
| RdfCollectionExplorer | rdf guide | keep | Walking first/rest to nil is a genuine demonstration. |
| RdfContainerExplorer | rdf guide | keep | Seq/Bag/Alt relayout plus Add member. |
| RdfTripleExplorer | rdf guide | static | Three one-line definitions behind clicks. |
| RdfVsPropertyGraphExplorer | intro-knowledge-graphs | keep | Shows where `since: 2015` lives in each model. |
| SparqlPatternExplorer | sparql guide | keep | Pattern to bindings with per-triple matching; placed before the section that explains chaining. |
| UnifiedProcessorExplorer (x3) | creating-rich-blog-posts | keep unified; improve remark/rehype | The two-node instances restate the paragraph above. |

Cross-cutting (not applied): the SVG role=button props factory is copy-pasted in seven explorers; the scroll-frame, sr-only and readout CSS is duplicated across nine to thirteen modules; three explorers hand-roll tabs the design system's ToggleGroup already provides; the Kata post's step names differ from the explorer's.

## Code decisions (closed 5 November 2026)

All items below were resolved in blog commits 5ebe840 ("close the pass-3 review's code items") and eb6d61a (dead Tailwind config removed; any-host image optimiser kept and documented). Kept for the record:

- Comments never render on posts: `content.comments` is not a declared field, so only projects show Giscus. Enable for posts, or drop the gate.
- `tailwind.config.js` is dead under Tailwind v4 (only ESLint reads it). Delete, or wire it with `@config`.
- `next.config.js` `remotePatterns: hostname '**'` makes `/_next/image` an open proxy; the preview route uses it for favicons. Keep with a comment, or restrict.
- Taxonomy pages' `generateMetadata` return only title and canonical, so `og:url` is the homepage and the RSS alternate is lost. Use `metadataGenerator` there.
- Project-only tags (8 of them) link to 404s: `tags.json` is built from posts only while project pages link their tags. Include projects in tag pages, or stop linking tags on project pages.
- `data/meta/publications.mjs`: the Roomba PROFILES'15 entry links the HDL PDF. Needs the right file path.
- `data/meta/JSON-LD/author.js` publishes a full street address in JSON-LD on every page.
- `remark-img-to-jsx` keeps only the first image in a paragraph (no post affected today).
- Preview route: upstream body read has no deadline after headers arrive.
- 39 low items (dead svgr rules, duplicate alias config, eslint deprecated rules, stale JSDoc) listed in the reviewers' output; none affect behaviour.
