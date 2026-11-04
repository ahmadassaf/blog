# Blog-wide review, 4 November 2026

Scope: all 45 MDX documents under `data/blog` (39 posts, 6 project pages). Two passes:

1. Automated: every external URL (458) checked, citation keys against the `.bib` files, local assets, MDX components, internal links, frontmatter, and a fetch of every rendered page on the local dev server.
2. Editorial: four read-throughs covering technical accuracy, broken structure, writing defects and frontmatter.

Totals: 193 editorial findings (5 high, 48 medium, 140 low) plus the automated findings below. Not applied anywhere; this is a report.

## Fix first

| File | Line | Issue |
| --- | --- | --- |
| engineering/gaudi-bar-widget.mdx | 35 | `git clone … $WIDGETS_HOME/…` is unquoted; the path contains "Application Support", so the install command fails. |
| data/everything-you-need-to-know-about-rdf.mdx | 114 | Typed literals "with an optional language tag": typed literals cannot carry a language tag in RDF 1.0 or 1.1. |
| data/everything-you-need-to-know-about-rdf.mdx | 129 | "These four statements say four different things" and line 142 contradict line 127, which says RDF 1.1 treats `"x"` and `"x"^^xsd:string` as the same literal. |
| data/everything-you-need-to-know-about-rdf.mdx | 277 | `:AhmadAssaf` uses the empty prefix with only `@base` declared; `:` must be declared with `@prefix :` and is unrelated to `@base` (same at 394, 409, 419, 463, 482, 523, 561). |
| engineering/navigating-nextjs-dynamic-routing.mdx, engineering/understanding-nextjs-app-dir.mdx | — | Frontmatter-only stubs, `draft: true` since 2023. Write or delete. |
| projects/roomba.mdx | 103 | `**…http://youtu.be/p7Y-mDN_Y2s**` — the closing bold markers are glued to the URL, so the link is `…Y2s**` and breaks. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 37, 102, 162, 279 | Four shell/SSH errors that break the workflow as written: `$SSH-PORT-NUMBER` expands to `$SSH` + literal; `#!/usr/bin/bash` shebang; `ssh-keygen` answer writes the key to cwd not `.ssh`; `Host ip:port` in `~/.ssh/config` never matches. |
| engineering/from-notion-blocks-to-generative-ui.mdx | 57 | `https://demo.thesys.dev/compare` now redirects to openui.com/demos; the "Thesys comparison demo" reference is stale. |

## Automated findings

### Dead links (real)

| URL | In |
| --- | --- |
| https://github.com/ahmadassaf/design-system/blob/main/src/components/mdx/Preview/usePreviewData.js | engineering/nextjs-react-link-preview.mdx (404; file moved to `core/LinkPreview/usePreviewData.js` in `g-udi/design-system`) |
| http://www.uoregon.edu/~koch/texshop/texshop.html | productivity/latex-best-practices.mdx (404) |
| http://overfit.in/ | data/everything-you-need-to-know-about-rdf.mdx (domain gone) |
| http://pencolorado.org | data/towards-a-harmonized-dataset-model.mdx (domain gone) |
| https://reinertsenassociates.com/books/ | management/agile-project-management-evolution.mdx (TLS certificate invalid) |
| https://www.cambridgesemantics.com/anzograph/ | data/intro-knowledge-graphs.mdx (503 on repeat checks) |
| http://twitter.com/mathias | engineering/dotfiles-for-the-public.mdx (520; use x.com or the GitHub profile) |
| http://youtu.be/p7Y-mDN_Y2s** | projects/roomba.mdx (markdown bold bleed, see above) |

Bot-blocked (403/429) and almost certainly fine for humans: Medium, npm, SourceForge, Mendeley, ResearchGate, dl.acm.org, tibco.com, africaopendata.org, actionableagile.com, mbs.works, opengraph.xyz, content-collections.dev, developers.facebook.com/tools/debug (400 without params). `example.org` and `0.0.0.0:4000` URLs are intentional.

### Redirects worth updating (link works, destination moved)

| Old | New | In |
| --- | --- | --- |
| https://demo.thesys.dev/compare | https://www.openui.com/demos | engineering/from-notion-blocks-to-generative-ui.mdx |
| https://github.com/ahmadassaf/design-system/… | https://github.com/g-udi/design-system/… | engineering/nextjs-react-link-preview.mdx |
| https://raw.githubusercontent.com/ahmadassaf/gaudi-bash/master/install.sh | g-udi/gaudi-bash | engineering/gaudi-my-bash-framework.mdx |
| https://mths.be/osx | https://github.com/mathiasbynens/dotfiles/blob/main/.macos | engineering/dotfiles-for-the-public.mdx |
| https://scotch.io/tutorials/… | digitalocean.com/community/tutorials/… | engineering/power-up-a-hero-blog-with-jekyll.mdx |
| https://platform.openai.com/docs/api-reference/audio | https://developers.openai.com/api/reference/resources/audio | engineering/transcribing-audio-with-openai.mdx |
| https://www.ontotext.com/products/graphdb/ | https://graphwise.ai/components/graphdb/ | data/intro-knowledge-graphs.mdx |
| https://www.datastax.com/products/datastax-enterprise, …/datastax-astra | ibm.com/products/datastax | data/intro-knowledge-graphs.mdx |
| https://www.marklogic.com/product/marklogic-database-overview/ | https://www.progress.com/marklogic | data/intro-knowledge-graphs.mdx |
| https://explore.graph.sap/ | https://help.sap.com/docs/api-composition | data/intro-knowledge-graphs.mdx |
| http://blog.neo4j.org/2013/01/demining-join-bomb-with-graph-queries.html | https://neo4j.com/blog/developer/demining-the-join-bomb-with-graph-queries/ | data/intro-knowledge-graphs.mdx |
| https://joinup.ec.europa.eu/asset/dcat_application_profile/description | interoperable-europe.ec.europa.eu/… DCAT-AP | data/towards-a-harmonized-dataset-model.mdx |
| https://project-open-data.cio.gov/v1.1/schema/ | https://resources.data.gov/resources/dcat-us/ | data/towards-a-harmonized-dataset-model.mdx |
| http://lucene.apache.org/solr/ | https://solr.apache.org/ | data/towards-a-harmonized-dataset-model.mdx |
| http://docs.getdkan.com/… | https://getdkan.org/ | data/towards-a-harmonized-dataset-model.mdx |
| http://projects.tynsoe.org/en/geektool/, http://brawersoftware.com/products/ubar | tynsoe.org/geektool, ubarapp.com | engineering/stepping-up-your-dev-game.mdx |
| http://vgaidarji.github.io/… | http://vgaidarji.me/… | engineering/power-up-a-hero-blog-with-jekyll.mdx |

### Structure and frontmatter

- All six project pages carry the identical `date: '2018-08-07'`; it reads as a placeholder and drives listing order.
- Two posts are empty drafts (see Fix first).
- All citation keys resolve; all MDX components resolve; all 20 internal links resolve; no missing local assets; every published page renders HTTP 200 with no application errors and no leaked citation or component markup.

## Editorial findings by file

### Data

| File | Line | Severity | Issue |
|---|---|---|---|
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 8 | medium | `date: '2016-02-22'` with no `updated`, yet the body ends with "# Looking Back from 2026" (line 284) and carries "(now defunct)" asides. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 16 | low | Body uses H1 headings ("# Introduction", "# Related Work", …) under the page title; the other posts use `##`. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 24 | low | "Page Rank" here vs "PageRank" at lines 177 and 179. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 61 | medium | "a condensed framework of 10 objective measures" but only 8 are described; the Licensing and Provenance measures cited in the results (274, 280) have no section. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 98 | low | List flips polarity mid-sentence and "overlapping labels" appears twice. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 102 | low | "indication of permissions, copyrights and attributions" is a licensing indicator (QI.23) but is filed under Freshness. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 177 | medium | `[@Brin:WWW:98][@Chakrabarti:IEEE:99]` (and `[@Gueret:ESWC:12][@Hogan:SSKB:06]` at 179) is markdown reference-link syntax, not two citations; needs `[@a; @b]`. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 177 | low | "more incoming links that other Web documents" → "than". |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 179 | low | "A monitoring module detects events on sources and write them" → "writes". |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 244 | low | `$\textbf{T}=\{T_1,...,t_n\}$` has lowercase `t_n`, and `T` is reused as "total number of instances" at line 248. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 254 | low | Prose says M divides by "the total number of instances in its context" but the formula divides by `\mid Q_i \mid`, the number of indicators. |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 264 | low | "Roomba's aggregation have been evaluated" → "has". |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 272 | medium | "the LOD cloud containing 259 datasets at the time of writing" contradicts line 18 "has grown to nearly 1000 datasets". |
| data/an-objective-assessment-framework-tool-for-linked-data-quality.mdx | 272 | low | "2.6 Ghz" → "GHz". |
| data/everything-you-need-to-know-about-rdf.mdx | 97 | low | "A node in a RDF graph" → "an RDF" (recurs). |
| data/everything-you-need-to-know-about-rdf.mdx | 114 | high | Typed literals cannot carry a language tag in RDF 1.0 or 1.1. |
| data/everything-you-need-to-know-about-rdf.mdx | 122 | medium | The multi-line form is shown with ordinary double quotes; it is the triple-quoted `"""…"""` form, so the distinction being explained is lost. |
| data/everything-you-need-to-know-about-rdf.mdx | 127 | low | Stray example name "Rob Gonzalez" (copied source) in a post whose running example is Ahmad. |
| data/everything-you-need-to-know-about-rdf.mdx | 129 | high | "These four statements say four different things" and line 142 contradict line 127 (RDF 1.1 makes `"x"` and `"x"^^xsd:string` the same literal). |
| data/everything-you-need-to-know-about-rdf.mdx | 149 | low | "a third value of the `rdf:parseType` attribute" before any other parseType value has been introduced (331/497). |
| data/everything-you-need-to-know-about-rdf.mdx | 178 | low | The serialization is named "XML RDF", "RDF/XML", "XML/RDF" and "RDF XML" across lines 178, 209, 233, 237, 426. |
| data/everything-you-need-to-know-about-rdf.mdx | 185 | low | RDF/XML namespace is `http://assaf.website/Personal/` (slash) while the "same example" in Turtle uses `#` (240, 269, 329), so the triples differ. |
| data/everything-you-need-to-know-about-rdf.mdx | 202 | low | `<aa:Name …>` content is split over lines, so the literal includes the surrounding newlines and indentation. |
| data/everything-you-need-to-know-about-rdf.mdx | 237 | low | Section titled "N3 Notation" describes N-Triples (as line 650 itself defines it). |
| data/everything-you-need-to-know-about-rdf.mdx | 277 | high | `:AhmadAssaf` uses the empty prefix with only `@base` declared; `:` must be declared with `@prefix :` (same at 394, 409, 419, 463, 482, 523, 561). |
| data/everything-you-need-to-know-about-rdf.mdx | 350 | medium | "the `nodeID` will follow the default base URI" is wrong: `rdf:nodeID` values are document-scoped blank-node labels. |
| data/everything-you-need-to-know-about-rdf.mdx | 363 | medium | "`_` followed by a colon that denotes the default namespace": `_:` is the reserved blank-node prefix. |
| data/everything-you-need-to-know-about-rdf.mdx | 435 | medium | RDF/XML example uses `rdf:Bag` while the Turtle it mirrors (395) and the prose at 445 use `rdf:Seq`. |
| data/everything-you-need-to-know-about-rdf.mdx | 516 | low | TriG called "the de facto serialization" (and 648); TriG is a W3C Recommendation (2014). |
| data/everything-you-need-to-know-about-rdf.mdx | 518 | low | TriG snippet fenced as ```turtle. |
| data/everything-you-need-to-know-about-rdf.mdx | 590 | medium | `rdf:object rdf:resource="http://assaf.website/ahmadassaf"` does not match the object produced by `rdf:ID="ahmadassaf"` under the `xml:base` (`…/triples#ahmadassaf`, as 622/631 show). |
| data/everything-you-need-to-know-about-rdf.mdx | 597 | low | Says the subject comes from `rdf:ID` but the preceding example (587) uses `rdf:about="#triple12345"`. |
| data/intro-knowledge-graphs.mdx | 29 | low | Body uses H1 headings under the page title (29, 45, 93, 112, 196, 253). |
| data/intro-knowledge-graphs.mdx | 50 | low | Mixed British/American spelling ("de-normalised", "labelled" vs "normalized", "labeled"). |
| data/intro-knowledge-graphs.mdx | 95 | low | 4-tuple with `E ⊆ N × N` and `f: E → L` permits one label per node pair, contradicting `E ⊆ V × L × V` at 129; `E` reused for a single edge. |
| data/intro-knowledge-graphs.mdx | 129 | low | `\text{Con}` used at 129, 139, 154 but never defined. |
| data/intro-knowledge-graphs.mdx | 154 | low | Missing comma: "is a set of edge IDs $L \subseteq \text{Con}$ is a set of labels". |
| data/intro-knowledge-graphs.mdx | 247 | low | Misdescribes zero-shot learning (classes unseen at training time). |
| data/intro-knowledge-graphs.mdx | 261 | medium | Amazon Neptune "License Model: Open source, managed service" — Neptune is proprietary. |
| data/intro-knowledge-graphs.mdx | 267 | medium | Cosmos DB "Open source, Apache 2.0" — proprietary; only the Gremlin API is Apache-licensed TinkerPop. |
| data/introduction-multi-dimensional-dbs.mdx | 42 | low | The "spatial verbs" are never named in prose; "a fourth operation" while four are already listed. |
| data/introduction-to-semantic-web.mdx | 5 | medium | `summary` is cut off mid-sentence. |
| data/introduction-to-semantic-web.mdx | 35 | medium | "Universal Resource Identifiers (URIs)" → Uniform. |
| data/introduction-to-semantic-web.mdx | 45 | low | The same examples list is given twice back to back. |
| data/introduction-to-semantic-web.mdx | 53 | medium | "the new hot topic in NLP, as evidenced by Siri and Watson" stated as current in a 2023-dated post. |
| data/introduction-to-semantic-web.mdx | 88 | low | "these datasets" has no antecedent. |
| data/introduction-to-semantic-web.mdx | 117 | low | "RDFa: A version of RDF designed for embedding in HTML" — a syntax, not a version. |
| data/introduction-to-semantic-web.mdx | 118 | low | "Knowledge Graph" listed under "Structured Data Standards". |
| data/sparql-a-comprehensive-guide.mdx | 66 | medium | Queries at 66, 73, 106, 123, 194, 213 use `foaf:`/`aa:` with no `PREFIX` declarations (invalid as written), while 136 and 232 declare them. |
| data/sparql-a-comprehensive-guide.mdx | 84 | low | Result bindings fenced as ```shell (also 247). |
| data/sparql-a-comprehensive-guide.mdx | 99 | low | "The result will be two triples" — SELECT results are solution rows. |
| data/towards-a-harmonized-dataset-model.mdx | 5 | medium | `summary` names the model "Public Open Data" while the body calls it "Project Open Data (POD)". |
| data/towards-a-harmonized-dataset-model.mdx | 6 | medium | `date: '2015-07-22'` with no `updated`, yet the body references 2020/2024 DCAT versions and a 2016 post. |
| data/towards-a-harmonized-dataset-model.mdx | 35 | low | "## DCAT" … "## Project Open Data" are H2 siblings of the section that introduces them as subsections. |
| data/towards-a-harmonized-dataset-model.mdx | 43 | low | "public section datasets" → "public sector". |
| data/towards-a-harmonized-dataset-model.mdx | 51 | medium | "`void:subset`" listed as a class; it is a property. |
| data/towards-a-harmonized-dataset-model.mdx | 98 | low | "Friend-of-Friend (FOAF)" → "Friend of a Friend". |
| data/towards-a-harmonized-dataset-model.mdx | 99 | low | "creation data, metadata update data" → "date". |
| data/towards-a-harmonized-dataset-model.mdx | 101 | low | `temporal_coverage_to` paired with `temporal_granularity_from`. |
| data/towards-a-harmonized-dataset-model.mdx | 103 | low | Blank line splits the "eight main types" list. |
| data/towards-a-harmonized-dataset-model.mdx | 125 | low | `dataDownload` vs `` ` DataDownload` `` casing and leading spaces. |
| data/whatsup-lod-cloud.mdx | 7 | medium | `date: '2014-08-21'` precedes the ESWC 2015 publication it cites and links to a 2016 post, with no `updated`. |
| data/whatsup-lod-cloud.mdx | 18 | medium | "nearly 1000 datasets … 82 billion triples [@Bizer:IJSWIS:09]" — the 2009 paper cannot source 2014 figures. |
| data/whatsup-lod-cloud.mdx | 26 | low | "version information, version, etc." duplicated. |
| data/whatsup-lod-cloud.mdx | 49 | low | "52 (4.82%)" of 1068 is 4.87%. |

### Engineering

| File | Line | Severity | Issue |
|---|---|---|---|
| engineering/auditing-npm-modules-in-microservices.mdx | 43 | low | `printf` without trailing `\n` (also 47/79/83), so messages run together. |
| engineering/auditing-npm-modules-in-microservices.mdx | 70 | low | "plug that in a similar wrapper" → "into". |
| engineering/build-dynamic-og-images.mdx | 20 | medium | "everything below is lifted from working code" contradicts the real `app/api/og/route.js` (renders `OgCard` from the design system, uses `ogImageSize`, 404s on drafts). |
| engineering/build-dynamic-og-images.mdx | 88 | medium | 1200×600 (and `h-[600px]` at 66) contradicts the 1200×630 the real route and the JSON-LD post use. |
| engineering/build-dynamic-og-images.mdx | 73 | low | `tw='flex flex-row justify-between flex-row-reverse'` sets two conflicting directions. |
| engineering/build-dynamic-og-images.mdx | 112 | low | `generateMetadata` reads `params.slug` synchronously; on Next 15 `params` must be awaited, and a relative OG URL needs `metadataBase`. |
| engineering/creating-rich-blog-posts.mdx | 5 | low | "unifiedJS" in summary vs "Unified.js" in body. |
| engineering/creating-rich-blog-posts.mdx | 15 | low | Double space. |
| engineering/creating-rich-blog-posts.mdx | 46 | low | Stray space before colon. |
| engineering/creating-rich-blog-posts.mdx | 93 | medium | MDAST sample node `{"type": "jsx"}` (also 167) is MDX v1-era; remark-mdx yields `mdxJsxFlowElement`; block labelled "Markdown" but contains JSX. |
| engineering/creating-rich-blog-posts.mdx | 125 | low | HAST expanded as "HTML Abstract Syntax Tree" (also 226); it is "Hypertext". |
| engineering/creating-rich-blog-posts.mdx | 199 | low | HAST sample turns `<Chart/>` into `<div class="chart">`; no step produces that and the caveat doesn't say it is invented. |
| engineering/creating-rich-blog-posts.mdx | 216 | low | Heading ends with a colon. |
| engineering/dotfiles-for-the-public.mdx | 16 | low | "Github" → "GitHub". |
| engineering/dotfiles-for-the-public.mdx | 18 | low | Missing full stops after "`.zshrc`" and "`.ssh`". |
| engineering/dotfiles-for-the-public.mdx | 22 | low | "fork this repository" before any repository is linked (first link at 147). |
| engineering/dotfiles-for-the-public.mdx | 26 | low | Subject–verb agreement; sentence fragment. |
| engineering/dotfiles-for-the-public.mdx | 32 | low | Lists `extra` among loaded dotfiles but `.extra` is never described. |
| engineering/dotfiles-for-the-public.mdx | 54 | low | `export` outside the code span; missing full stop. |
| engineering/dotfiles-for-the-public.mdx | 64 | low | "Before, when I mentioned…" refers to nothing earlier in the post. |
| engineering/dotfiles-for-the-public.mdx | 130 | medium | "The `--user` parameter should be removed if you got an error" refers to a `pip install` command never shown. |
| engineering/dotfiles-for-the-public.mdx | 136 | low | Vimscript fenced as `shell`. |
| engineering/dotfiles-for-the-public.mdx | 204 | low | "define an array" → "defines". |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 5 | low | "discuss" → "discusses"; "Github"/"GitHub", "Digital Ocean"/"DigitalOcean" inconsistent. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 37 | medium | `ssh -p $SSH-PORT-NUMBER` is not a valid variable reference. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 42 | low | "or if you running using tmux". |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 49 | low | Hook builds in `/var/www/blog` while 37 and 67 use `/www/blog`. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 78 | low | `ProxyPass / http://0.0.0.0:4000/` uses a bind address as a destination; should be `127.0.0.1`. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 102 | medium | `#!/usr/bin/bash` shebang; every other script uses `/bin/bash`. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 162 | medium | Answering `deploy-key` to ssh-keygen writes the key into cwd, yet 165 says it lands in `.ssh`. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 189 | low | "the same how we push to Github". |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 206 | low | "`var/www/blog`" missing leading slash. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 279 | medium | `Host <ip>:<port>` in `~/.ssh/config` never matches; `Host` patterns don't carry ports. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 295 | low | "different SSH port number that the default one" → "than". |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 305 | low | `set -x` echoes commands, not their output. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 316 | low | SSH, not Git, looks for `~/.ssh/id_rsa`. |
| engineering/enabling-structured-data-jsonld-nextjs.mdx | 35 | low | Restates line 14 almost verbatim. |
| engineering/gaudi-bar-widget.mdx | 17 | low | Two-dot ellipsis. |
| engineering/gaudi-bar-widget.mdx | 35 | high | Unquoted `$WIDGETS_HOME` with a space in the path breaks `git clone`. |
| engineering/gaudi-bar-widget.mdx | 45 | low | Raw `<sup>` used as an inline aside. |
| engineering/gaudi-bar-widget.mdx | 59 | low | Section promises the layout config but shows only the plugin registry. |
| engineering/gaudi-bar-widget.mdx | 61 | medium | "loaded via `lib/index.js`" — it is `lib/plugins/index.js`. |
| engineering/gaudi-bar-widget.mdx | 66 | medium | Registry sample lists `chunkwm` and `istats`, which don't exist in the repo (`yabai`, `stats`); real module uses lazy loaders. |
| engineering/gaudi-bar-widget.mdx | 77 | low | `keys.secret.js` stated as current; repo README calls it legacy and points to `.env`. |
| engineering/gaudi-my-bash-framework.mdx | 66 | low | Install one-liner points at `ahmadassaf/gaudi-bash` (works via redirect) while 12 and 71 say `g-udi/gaudi-bash`. |
| engineering/moving-blog-to-nextjs.mdx | 19 | low | "Jekyll lacks hot-reloading" — `--livereload` since 3.7 (2018). |
| engineering/moving-blog-to-nextjs.mdx | 23 | low | SSR/SSG links point at Pages Router docs while 47 says App Router only. |
| engineering/moving-blog-to-nextjs.mdx | 29 | low | Tooltip text pasted from Next docs ("please also see the Pages Router documentation"). |
| engineering/moving-blog-to-nextjs.mdx | 51 | medium | `build.mjs` runs before `next build` and writes tag/category JSON, not pages. |
| engineering/moving-blog-to-nextjs.mdx | 55 | low | Missing blank line inside `<Aside>` merges two paragraphs. |
| engineering/moving-blog-to-nextjs.mdx | 73 | low | Design system is a `link:` workspace dependency, not "pinned". |
| engineering/navigating-nextjs-dynamic-routing.mdx | 11 | high | Frontmatter-only stub. |
| engineering/navigating-nextjs-dynamic-routing.mdx | 5 | low | "I ran into few issues". |
| engineering/nextjs-react-link-preview.mdx | 71 | low | Named group `category` captures the literal `category` path segment. |
| engineering/nextjs-react-link-preview.mdx | 113 | low | HTTP 400 is not a "gone" status. |
| engineering/nextjs-theme-switcher.mdx | 8 | medium | Dated 2024-06-11 but references Next.js 15 (Oct 2024) with no `updated`. |
| engineering/nextjs-theme-switcher.mdx | 52 | low | Old-way switcher lacks `'use client'` while the new one has it. |
| engineering/nextjs-theme-switcher.mdx | 79 | low | Caption says `App.js` but the code is `app/layout.js`. |
| engineering/nextjs-theme-switcher.mdx | 97 | medium | "the page flashes when next-themes kicks in" misstates the library (blocking inline script, no flash). |
| engineering/nextjs-theme-switcher.mdx | 142 | medium | "no longer creates any provider of its own" — the old switcher never did. |
| engineering/nextjs-theme-switcher.mdx | 169 | medium | Toggles on `theme === 'dark'` only; with `'system'` the icon and first click are wrong (old code used `resolvedTheme`). |
| engineering/nextjs-theme-switcher.mdx | 182 | medium | "the very first server render already has the correct theme" — class is set client-side on `<html>`; the cookie only seeds `defaultTheme`. |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 5 | medium | "CRM" → "CMS" (also 14); "I thought I need". |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 6 | medium | Subtitle promises CI/CD; body never covers it. |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 72 | low | "Jekyll docs [documentation]". |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 105 | low | "disquss". |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 117 | low | Code fence without language (also 253). |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 139 | low | `{% raw %}`/`{% endraw %}` wrappers render verbatim (also 146, 175, 195, 220, 233, 243, 246, 279, 283). |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 153 | low | `config.yml` / `_config.yml` / `configs.yml` inconsistent. |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 170 | medium | jekyll-archives layouts resolve from `_layouts`, not `_includes`. |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 244 | medium | Gallery sample path contradicts the prose at 249. |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 251 | low | "few CSS classes". |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 272 | low | "later" → "latter". |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 286 | low | "published data" → "date". |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 293 | low | `el(...)` undefined; "lunr.js" vs elasticlunr. |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 400 | low | Grunt snippet unbalanced (no `grunt.initConfig({`). |
| engineering/power-up-a-hero-blog-with-jekyll.mdx | 404 | low | "three main grunt tasks" but four registered. |
| engineering/stepping-up-your-dev-game.mdx | 47 | low | "cask (which I will explain later)" never explained. |
| engineering/stepping-up-your-dev-game.mdx | 53 | low | "discrete" → "discreet". |
| engineering/stepping-up-your-dev-game.mdx | 61 | low | Missing noun after "`flat-icons`". |
| engineering/stepping-up-your-dev-game.mdx | 97 | low | Doubled colon. |
| engineering/stepping-up-your-dev-game.mdx | 148 | low | "LiteIcon did not survive SIP" is doubtful. |
| engineering/transcribing-audio-with-openai.mdx | 5 | medium | Summary says "not supported yet via the UI" as current; body frames it as past. |
| engineering/transcribing-audio-with-openai.mdx | 15 | medium | Cites `gpt-4o-transcribe` (March 2025) but `updated: '2024-11-21'`. |
| engineering/transcribing-audio-with-openai.mdx | 29 | low | Code fence without language. |
| engineering/transcribing-audio-with-openai.mdx | 144 | low | `mp4_file` points at `movie.mov`. |
| engineering/understanding-nextjs-app-dir.mdx | 12 | high | Frontmatter-only stub. |
| engineering/using-contentLayer-with-nextjs.mdx | 3 | low | "ContentLayer" vs "Contentlayer"; lowercase "next.js". |
| engineering/using-contentLayer-with-nextjs.mdx | 17 | low | Callout speaks in an undated present. |
| engineering/using-contentLayer-with-nextjs.mdx | 19 | low | "There are [news]". |

### Productivity, management, thoughts

| File | Line | Severity | Issue |
|---|---|---|---|
| productivity/latex-best-practices.mdx | 14 | low | "either" with three items. |
| productivity/latex-best-practices.mdx | 28 | medium | Prose says journals sit at the root; the FileTree puts them under "Posters". |
| productivity/latex-best-practices.mdx | 66 | low | Listed folders don't match the example tree (`thesis` missing; `Util`/`util`). |
| productivity/latex-best-practices.mdx | 68 | low | "in details after". |
| productivity/latex-best-practices.mdx | 174 | low | "Each directory contain". |
| productivity/latex-best-practices.mdx | 229 | low | Skim displays the PDF; it does not generate it. |
| productivity/latex-best-practices.mdx | 245 | low | Missing full stop. |
| productivity/latex-best-practices.mdx | 251 | low | Bibliography sections nested under "Writing-Style Tips". |
| productivity/latex-best-practices.mdx | 259 | low | "BibTex" vs "BibTeX". |
| management/agile-project-management-evolution.mdx | 41 | low | "improvement kata" casing inconsistent with the tag and companion post. |
| management/improvement-kata.mdx | 47 | low | States the explorer's outcome before the reader runs it. |
| management/improvement-kata.mdx | 55 | low | Repeats the reflection point from agile-project-management-evolution.mdx line 43 (and 59 repeats the "question card" remark). |
| management/measuring-agile-teams.mdx | 40 | low | Near-verbatim duplicate of introduction-to-classical-agile.mdx 60 and agile-project-management-evolution.mdx 35; line 60 duplicates again. |
| management/measuring-agile-teams.mdx | 106 | low | Restates agile-project-management-evolution.mdx 59. |
| management/measuring-agile-teams.mdx | 128 | low | Third copy of the "obstacle, prediction, experiment, compare" formula. |
| thoughts/managing-smart-people.mdx | 13 | low | Mixed pinball metaphor (continues at 19). |
| thoughts/technical-debt.mdx | 13 | low | Non-parallel clause; "above all the inadvertent kind" overstates Fowler. |

### Projects

| File | Line | Severity | Issue |
|---|---|---|---|
| projects/* | 10 | low | All six pages dated `2018-08-07` (gaudi says last push June 2026; roomba August 2026). |
| projects/booklight.mdx | 14 | low | H2 repeats the title (also codenotes 14, ditto 15, micromanage 14, roomba 14–15); gaudi differs in structure. |
| projects/booklight.mdx | 20 | low | "thousands of folders" vs summary "thousands of bookmarks". |
| projects/booklight.mdx | 28 | low | Two links render as one run-on paragraph. |
| projects/codenotes.mdx | 58 | medium | Code fences without language (58, 66). |
| projects/codenotes.mdx | 66 | medium | Sample output does not correspond to the three sample comments at 59–61. |
| projects/ditto.mdx | 32 | low | Missing article. |
| projects/gaudi.mdx | 32 | low | "dry smoke run". |
| projects/micromanage.mdx | 8 | medium | `github: 'BeameryHQ/micromanage'` points at a repo the Status note says 404s. |
| projects/roomba.mdx | 31 | low | `meta[content*="ckan"]` is case-sensitive; prose says it matches `CKAN`. |
| projects/roomba.mdx | 103 | high | Bold markers glued to the YouTube URL. |
| projects/roomba.mdx | 105 | medium | Recommends `datahub.io` as a working CKAN portal; it is not. |
| projects/roomba.mdx | 117 | low | Circular sentence. |
