# Blog-wide review, second pass, 4 November 2026

Scope: the same 45 documents after the first-pass fixes (content commit b75e44d). Automated checks (links, citations, assets, components, internal links, render) were clean; the only link failures are bot-blocked hosts. The editorial pass below has 194 findings (0 high, 20 medium, 174 low). Items marked **R** are regressions introduced by the first-pass fixes.

## Regressions and mediums (fix first)

| File | Line | Issue |
| --- | --- | --- |
| management/improvement-kata.mdx | 47 | **R** "More reminders might help someone who forgot…" has no antecedent since the incident/backup-reviewer sentence was removed. |
| management/improvement-kata.mdx | 49 | **R** "Even a result that meets the target" is impossible with a five-request sample against an eight-of-ten target; the next sentence says so. |
| engineering/nextjs-theme-switcher.mdx | 5, 17, 213 | **R** Body now says the old setup has no visible flash, but summary, FOUC bullet and benefit 3 still present FOUC as the problem solved. |
| engineering/nextjs-theme-switcher.mdx | 212 | **R** "reading the cookie on the server ensures the correct theme is applied on the very first render" repeats the overclaim removed at 182. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 30 | **R** Prose still says proxy to `http://0.0.0.0:4000` while the ProxyPass was corrected to 127.0.0.1. |
| engineering/enabling-continuous-deployment-for-jekyll.mdx | 96 | **R** Second Codeship ssh line still `ssh root@SERVER '…'` with no port flag; line 37 was fixed. |
| projects/booklight.mdx | 23–27 | **R** The two link items now merge with the shortcut list into one loose list. |
| projects/micromanage.mdx | 36 | **R** The `beamery` command is never introduced after the H2 was removed. |
| data/intro-knowledge-graphs.mdx | 95/129 | **R** The 95 fix duplicated the definition now restated verbatim in the callout at 129. |
| data/everything-you-need-to-know-about-rdf.mdx | 114 | Plain/typed literal model is RDF 1.0; line 127 invokes RDF 1.1 where every literal has a datatype and language-tagged strings are `rdf:langString`. |
| data/everything-you-need-to-know-about-rdf.mdx | 567 | Turtle reification pair uses `@prefix : <http://assaf.website/>` so `:triple12345` differs from the RDF/XML (`xml:base …/triples`, `rdf:ID`) and the expansion at 637–646. |
| data/everything-you-need-to-know-about-rdf.mdx | 30 | Prose says XML "can take various forms" and concludes XML led to RDF, but the code-group tabs include Turtle and JSON-LD. |
| engineering/understanding-nextjs-app-dir.mdx | 51 | `generateViewport` arrived in Next.js 14, not 15. |
| engineering/understanding-nextjs-app-dir.mdx | 100–114 | OG route snippet is not the file's code: drops the slug null-check/400, the `if (!post)` fallback, and the category guard. |
| engineering/navigating-nextjs-dynamic-routing.mdx | 76 | "the same helper the sitemap and the OG image route use": the OG route guards drafts inline, it does not call `published`. |
| engineering/navigating-nextjs-dynamic-routing.mdx | 93 | "adding a category is just using it in frontmatter": `generateTaxonomies.mjs` reads the description from `navigationMetadata.categoriesMetadata`. |
| engineering/nextjs-react-link-preview.mdx | 104 | Google favicon fallback and Microlink screenshot synthesis do not exist in `app/api/preview/route.js`. |
| engineering/build-dynamic-og-images.mdx | 38 | Homepage/category default card claim is wrong: `metadataGenerator` defaults to the static `/static/images/og-card.jpg`; the route's no-match branch is unused. |
| engineering/enabling-structured-data-jsonld-nextjs.mdx | 103–127 | `linkedDataGenerator` shown as the full mapping; the real generator also emits description, genre, thumbnailUrl, image @id. |
| engineering/moving-blog-to-nextjs.mdx | 61 | `authors` "populates the about page": `app/about/page.js` imports nothing from `data/authors`. |
| projects/gaudi.mdx | 5 | Summary describes a collection incl. widgets and dotfiles; the page is about one Bash CLI. |
| projects/roomba.mdx | 24 | CKAN "powering … Europe's Public Data" in present tense contradicts 102 (archived). |

## Data

| File | Line | Severity | Issue |
|---|---|---|---|
| an-objective-assessment-framework…mdx | 21 | low | "The Linked Open Data is a gold mine" — noun missing ("cloud"). |
| an-objective-assessment-framework…mdx | 45 | low | "These issues highly affect detecting quality issue on large scale" — grammar. |
| an-objective-assessment-framework…mdx | 57 | low | "**Quality of the entities** : quality" — space before colon. |
| an-objective-assessment-framework…mdx | 76 | low | "where I can measure" first-person singular in a "we" paper (also "if he indicates" at 111). |
| an-objective-assessment-framework…mdx | 83 | low | "Existence of descriptions about its format." breaks the parallel list. |
| an-objective-assessment-framework…mdx | 91 | low | "dereferencable" ×7 vs "dereferenceable" (RDF post 372). |
| an-objective-assessment-framework…mdx | 141 | low | "and iterate" → "iterates". |
| an-objective-assessment-framework…mdx | 155 | low | "since Sieve main input" → "Sieve's". |
| an-objective-assessment-framework…mdx | 166 | low | "to run out their assessment supported by a semi-automatic quality verification metrics". |
| an-objective-assessment-framework…mdx | 207, 281 | low | "Github" → "GitHub". |
| an-objective-assessment-framework…mdx | 209 | low | "advantages lay in" → "lie". |
| an-objective-assessment-framework…mdx | 255 | low | Stray `\...` outside math; $Q_i$ defined as a set here, used as a score at 259. |
| an-objective-assessment-framework…mdx | 263 | low | Formula still divides by `\mid Q_{i} \mid` with `i` the summation index; denominator should be the indicator count. |
| an-objective-assessment-framework…mdx | 277 | low | "at each of these profiles" → "on". |
| an-objective-assessment-framework…mdx | 285 | low | "datasets resources do not have information about its size" → "their". |
| an-objective-assessment-framework…mdx | 287 | low | "at the time writing" → "at the time of writing". |
| an-objective-assessment-framework…mdx | 289 | low | Missing comma; "attributes [QI.23]" vs "attributions" at 95. |
| everything-you-need-to-know-about-rdf.mdx | 26 | low | Code fence without a language. |
| everything-you-need-to-know-about-rdf.mdx | 97 | low | "RDF graph is a collection" — missing article. |
| everything-you-need-to-know-about-rdf.mdx | 107 | low | URI definition is RDF 1.0; RDF 1.1 uses IRIs, never mentioned. |
| everything-you-need-to-know-about-rdf.mdx | 124 | low | `[!NOTE]` on RDF/XML namespaces interrupts the datatype argument. |
| everything-you-need-to-know-about-rdf.mdx | 157 | low | Lowercase sentence start, no full stop. |
| everything-you-need-to-know-about-rdf.mdx | 165 | low | "sources" → "resources" (twice). |
| everything-you-need-to-know-about-rdf.mdx | 173 | low | No full stop after the Highlight. |
| everything-you-need-to-know-about-rdf.mdx | 210 | low | "a `xml:base` tag" → "an … attribute". |
| everything-you-need-to-know-about-rdf.mdx | 293 | low | `\t`/`\n` are string escapes, not code-point escapes, and not allowed in IRIs. |
| everything-you-need-to-know-about-rdf.mdx | 327, 350 | low | RDF/XML blank-node examples carry `aa:hasName` the Turtle counterparts omit. |
| everything-you-need-to-know-about-rdf.mdx | 384, 449 | low | Containers called "list"/"collection with brackets" while Collections is a different construct. |
| everything-you-need-to-know-about-rdf.mdx | 451 | low | Redundant "unordered … no given order". |
| everything-you-need-to-know-about-rdf.mdx | 460 | low | Missing punctuation before "that is". |
| everything-you-need-to-know-about-rdf.mdx | 491 | low | "form together" → "forms"; paragraph separates Turtle `( )` from its RDF/XML counterpart. |
| everything-you-need-to-know-about-rdf.mdx | 589 | low | RDF/XML block follows the Turtle block with no introductory sentence. |
| everything-you-need-to-know-about-rdf.mdx | 606, 628 | low | `dc:creator` in both XML examples but not in the expansion at 642–647; `dc:` never declared in Turtle. |
| everything-you-need-to-know-about-rdf.mdx | 661 | low | "there are few more" → "a few"; two of three were already covered. |
| intro-knowledge-graphs.mdx | 127 | low | "It is both, a full featured" — stray comma; "full-featured". |
| intro-knowledge-graphs.mdx | 135 | low | `[@HusseinYC18] [@WangJSWYCY19] [@YangXJWHW20]` → `[@a; @b; @c]`. |
| intro-knowledge-graphs.mdx | 158, 161 | low | "Neo4J"/"Neo4j"; "SAP Hana"/"SAP HANA". |
| intro-knowledge-graphs.mdx | 160 | low | "has their own extension … graph query" → "its own … graph queries". |
| intro-knowledge-graphs.mdx | 163 | low | Semicolon for comma. |
| intro-knowledge-graphs.mdx | 194 | low | "No vendor lock in, it's all open source" contradicted by the appendix; 221 means open data. |
| intro-knowledge-graphs.mdx | 237 | low | Statement heading with a question mark. |
| intro-knowledge-graphs.mdx | 264 | low | Dgraph "Apache 2.0" but the link is the enterprise-features page. |
| intro-knowledge-graphs.mdx | 276 | low | "vcPU" → "vCPU". |
| introduction-multi-dimensional-dbs.mdx | 40 | low | Verbs referenced before 42 names them; never defined in prose. |
| introduction-multi-dimensional-dbs.mdx | 42 | low | "a fifth operation families of tools like to add" — missing relative pronoun. |
| introduction-to-semantic-web.mdx | 33 | low | "semantic Web" lowercase. |
| introduction-to-semantic-web.mdx | 41 | low | "in the RDF" → "in RDF". |
| introduction-to-semantic-web.mdx | 43 | low | Singular/plural clash. |
| introduction-to-semantic-web.mdx | 47 | low | Double space. |
| introduction-to-semantic-web.mdx | 68 | low | Sentence fragment. |
| sparql-a-comprehensive-guide.mdx | 20 | low | "and much more" → "many more". |
| sparql-a-comprehensive-guide.mdx | 128 | low | "For example, the query" has no verb. |
| sparql-a-comprehensive-guide.mdx | 137 | low | "the value `aa:owner`" — binding is the full IRI; no `aa:` prefix declared in that query. |
| sparql-a-comprehensive-guide.mdx | 269 | low | ASCII result table misaligned. |
| sparql-a-comprehensive-guide.mdx | 281 | low | Missing commas; chartered 2009, Recommendation 2013. |
| towards-a-harmonized-dataset-model.mdx | 18 | low | "specifies" → "specify". |
| towards-a-harmonized-dataset-model.mdx | 52 | low | Non-parallel verbs. |
| towards-a-harmonized-dataset-model.mdx | 56 | low | "the Europe's", "U.S Government's", present tense for retired portal. |
| towards-a-harmonized-dataset-model.mdx | 84 | low | "Required-if(conditionally required)" missing space. |
| towards-a-harmonized-dataset-model.mdx | 98 | low | "specially … right" → "specifically … rights". |
| towards-a-harmonized-dataset-model.mdx | 117 | low | VoID has no keyword property; row mixes prefixed and bare terms. |
| towards-a-harmonized-dataset-model.mdx | 121–125 | low | Arrow/colon notation explained three times. |
| towards-a-harmonized-dataset-model.mdx | 153 | low | Nested colons make the value list unparseable; "However" contrasts with nothing. |
| towards-a-harmonized-dataset-model.mdx | 155 | low | "We run" → "ran". |
| whatsup-lod-cloud.mdx | 19 | low | Unclear whether 82 billion covers 259 datasets or ~1000. |
| whatsup-lod-cloud.mdx | 33 | low | "metadata type" → "types". |
| whatsup-lod-cloud.mdx | 54 | low | "a … fields"; "where" → "while". |

## Engineering

| File | Line | Severity | Issue |
|---|---|---|---|
| auditing-npm-modules-in-microservices.mdx | 52 | low | Subject dropped before "will execute". |
| auditing-npm-modules-in-microservices.mdx | 60 | low | Item 60 breaks the `code: description` pattern; `>>` redirects, not pipes. |
| build-dynamic-og-images.mdx | 38 | medium | See fix-first. |
| creating-rich-blog-posts.mdx | 13, 71 (moving-blog) | low | `remark-code-title.js` only rewrites legacy `lang:filename` fences; titles are rendered by the DS `remarkCode`. |
| creating-rich-blog-posts.mdx | 109–110 | low | Two blank lines before the closing fence. |
| creating-rich-blog-posts.mdx | 115 | low | remark alone cannot emit HTML. |
| creating-rich-blog-posts.mdx | 244 | low | Duplicates the sentence at 242. |
| creating-rich-blog-posts.mdx | 265 | low | "creating table of contents" — missing article. |
| dotfiles-for-the-public.mdx | 34 | low | ".bash_profile" unformatted. |
| dotfiles-for-the-public.mdx | 77 | low | "those aliases are run directly" unclear. |
| dotfiles-for-the-public.mdx | 113 | low | Run-on. |
| dotfiles-for-the-public.mdx | 129/136 | low | `--user` install lands under `~/Library/Python/2.7/…`, not the `rtp` path shown. |
| dotfiles-for-the-public.mdx | 130 | low | "while installation" → "during installation". |
| dotfiles-for-the-public.mdx | 139 | low | No full stop. |
| enabling-continuous-deployment-for-jekyll.mdx | 5, 111 | low | "TravisCI" vs "Travis CI". |
| enabling-continuous-deployment-for-jekyll.mdx | 25 | low | Comma splice. |
| enabling-continuous-deployment-for-jekyll.mdx | 27 | low | Missing "The". |
| enabling-continuous-deployment-for-jekyll.mdx | 30 | medium | See fix-first. |
| enabling-continuous-deployment-for-jekyll.mdx | 40 | low | "Whereas" misused; "github". |
| enabling-continuous-deployment-for-jekyll.mdx | 42 | low | "running using"; doubled "automatically". |
| enabling-continuous-deployment-for-jekyll.mdx | 96 | medium | See fix-first. |
| enabling-continuous-deployment-for-jekyll.mdx | 143 | low | "where you have blog in the server". |
| enabling-continuous-deployment-for-jekyll.mdx | 202 | low | `cd hooks` with no stated cwd. |
| enabling-continuous-deployment-for-jekyll.mdx | 294 | low | "our SSH IP address" — same IP with port. |
| enabling-continuous-deployment-for-jekyll.mdx | 300 | low | nvm is not installed by the script. |
| enabling-continuous-deployment-for-jekyll.mdx | 317–345 | low | Heading code-font inconsistency. |
| enabling-continuous-deployment-for-jekyll.mdx | 343 | low | Quoted flag swallows the `_site` argument. |
| enabling-structured-data-jsonld-nextjs.mdx | 12 | low | Second "lets" breaks the parallel list. |
| enabling-structured-data-jsonld-nextjs.mdx | 52–62 | low | `author` abridged without saying so. |
| enabling-structured-data-jsonld-nextjs.mdx | 103–127 | medium | See fix-first. |
| gaudi-bar-widget.mdx | 15 | low | Tense mix. |
| gaudi-bar-widget.mdx | 23 | low | "adapt" → "adapts". |
| gaudi-bar-widget.mdx | 40 | low | Comma splice. |
| gaudi-bar-widget.mdx | 41–42 | low | Double blank line. |
| gaudi-bar-widget.mdx | 45 | low | Lowercase language names. |
| moving-blog-to-nextjs.mdx | 27/29 | low | "Nextjs" vs "Next.js". |
| moving-blog-to-nextjs.mdx | 33 | low | Tailwind link is the v3 announcement; blog runs v4. |
| moving-blog-to-nextjs.mdx | 51–52 | low | `build.mjs` calls `rss.mjs`; relationship not stated. |
| moving-blog-to-nextjs.mdx | 61 | medium | See fix-first. |
| navigating-nextjs-dynamic-routing.mdx | 5 | low | Filler opener; no full stop. |
| navigating-nextjs-dynamic-routing.mdx | 76 | medium | See fix-first. |
| navigating-nextjs-dynamic-routing.mdx | 84–88 | low | Snippet is a rewrite, not a trim. |
| navigating-nextjs-dynamic-routing.mdx | 93 | medium | See fix-first. |
| understanding-nextjs-app-dir.mdx | 51 | medium | See fix-first. |
| understanding-nextjs-app-dir.mdx | 82 | low | `sitemap()` returns an array. |
| understanding-nextjs-app-dir.mdx | 94 | low | robots.js imports nothing; manifest only siteMetadata. |
| understanding-nextjs-app-dir.mdx | 100–114 | medium | See fix-first. |
| understanding-nextjs-app-dir.mdx | 125–140 | low | Uneven trimming (`tags` used without import; `metadata` export dropped). |
| understanding-nextjs-app-dir.mdx | 168 | low | Comma splice. |
| nextjs-react-link-preview.mdx | 15–25 | low | Mixed apostrophes. |
| nextjs-react-link-preview.mdx | 104 | medium | See fix-first. |
| nextjs-react-link-preview.mdx | 110 | low | "abort-on-unmount" — cleanup only flips `active`. |
| nextjs-react-link-preview.mdx | 117 | low | No framer-motion / reduced-motion handling exists. |
| nextjs-theme-switcher.mdx | 5, 17, 213 | medium | See fix-first. |
| nextjs-theme-switcher.mdx | 23–25 | low | List punctuation. |
| nextjs-theme-switcher.mdx | 212 | medium | See fix-first. |
| power-up-a-hero-blog-with-jekyll.mdx | 24 | low | "10 times as long" no comparator. |
| power-up-a-hero-blog-with-jekyll.mdx | 36–38 | low | "two important things … First" with no "Second". |
| power-up-a-hero-blog-with-jekyll.mdx | 125 | low | Garbled sentence. |
| power-up-a-hero-blog-with-jekyll.mdx | 141–142 | low | Liquid tag split across lines. |
| power-up-a-hero-blog-with-jekyll.mdx | 147 | low | Missing `.html`. |
| power-up-a-hero-blog-with-jekyll.mdx | 204 | low | "Github Gists". |
| power-up-a-hero-blog-with-jekyll.mdx | 230 | low | Ungrammatical. |
| power-up-a-hero-blog-with-jekyll.mdx | 241 | low | No full stop. |
| power-up-a-hero-blog-with-jekyll.mdx | 258 | low | "rouge"/"Rouge". |
| power-up-a-hero-blog-with-jekyll.mdx | 298–300 | low | Gerund/imperative mix. |
| power-up-a-hero-blog-with-jekyll.mdx | 306 | low | "a default optional flag"; lowercase "note". |
| power-up-a-hero-blog-with-jekyll.mdx | 353 | low | `pkg` never defined. |
| power-up-a-hero-blog-with-jekyll.mdx | 399–413 | low | Minification runs twice per task. |
| stepping-up-your-dev-game.mdx | 48, 98 | low | "Github". |
| stepping-up-your-dev-game.mdx | 87 | low | Capital after semicolon. |
| stepping-up-your-dev-game.mdx | 99 | low | Colon inside bold. |
| stepping-up-your-dev-game.mdx | 105 | low | "on the UNIX world"; fragment. |
| stepping-up-your-dev-game.mdx | 109 | low | Stray comma. |
| stepping-up-your-dev-game.mdx | 113 | low | Number agreement. |
| stepping-up-your-dev-game.mdx | 124 | low | `--recursive` unformatted. |
| stepping-up-your-dev-game.mdx | 133 | low | "guide throughout" → "guide you through". |
| stepping-up-your-dev-game.mdx | 166 | low | No full stop. |
| transcribing-audio-with-openai.mdx | 19 | low | OpenAI docs quoted verbatim without attribution. |
| transcribing-audio-with-openai.mdx | 64 | low | Four-dot ellipsis. |
| transcribing-audio-with-openai.mdx | 130 | low | No full stop. |
| transcribing-audio-with-openai.mdx | 145 | low | `mp3_file` not joined to `script_dir`. |
| using-contentLayer-with-nextjs.mdx | 19 | low | "no release date has been announced yet" undated present tense. |
| using-contentLayer-with-nextjs.mdx | 52–57 | low | Caption lacks "(trimmed)". |
| gaudi-my-bash-framework.mdx | — | clean | |

## Productivity, management, thoughts, projects

| File | Line | Severity | Issue |
|---|---|---|---|
| productivity/latex-best-practices.mdx | 12, 24 | low | Mendeley discontinuation stated twice. |
| productivity/latex-best-practices.mdx | 66 | low | Comma splice. |
| productivity/latex-best-practices.mdx | 174 | low | Missing article. |
| productivity/latex-best-practices.mdx | 179–211 | low | Thesis FileTree hierarchy contradicts the prose. |
| productivity/latex-best-practices.mdx | 223 | low | "Lyx" → LyX. |
| productivity/latex-best-practices.mdx | 239 | low | No punctuation before the link. |
| productivity/latex-best-practices.mdx | 265 | low | Ungrammatical. |
| productivity/latex-best-practices.mdx | 275 | low | No full stop. |
| management/agile-project-management-evolution.mdx | 31, 39 | low | Title Case H2s among sentence-case siblings. |
| management/agile-project-management-evolution.mdx | 59 | low | `[@Harvey:DORA:26; Forsgren:SPACE:21]` second key lacks `@`. |
| management/improvement-kata.mdx | 31, 73 | low | Same `[@A; B]` form. |
| management/improvement-kata.mdx | 47 | medium | See fix-first. |
| management/improvement-kata.mdx | 49 | low | See fix-first. |
| management/improvement-kata.mdx | 59 | low | "the card" never introduced in this post. |
| management/introduction-to-classical-agile.mdx | 49 | low | All-caps "ONE". |
| management/introduction-to-classical-agile.mdx | 132 | low | "Toyota-born practice" contradicts the Kata post. |
| management/measuring-agile-teams.mdx | 72 | low | Duplicates the flow-metric definitions in introduction-to-classical-agile 106–109. |
| management/measuring-agile-teams.mdx | 82 | low | Duplicates the SLE sentence in introduction-to-classical-agile 111. |
| management/measuring-agile-teams.mdx | 128 | low | Awkward passive. |
| management/measuring-agile-teams.mdx | 132–134 | low | Reading-list style differs from the sibling posts. |
| thoughts/technical-debt.mdx | 13 | low | "never paid back" is not inadvertent debt; two colon clauses in a row. |
| projects/booklight.mdx | 19 | low | Subtitle repeated verbatim as body text. |
| projects/booklight.mdx | 23–27 | low | See fix-first. |
| projects/booklight.mdx | 35–48 | low | "urls" vs "URL". |
| projects/ditto.mdx | 36 | low | Verb agreement in code comment. |
| projects/ditto.mdx | 70 | low | Inner callback parameter shadows the outer argument. |
| projects/gaudi.mdx | 5 | medium | See fix-first. |
| projects/micromanage.mdx | 36 | low | See fix-first. |
| projects/micromanage.mdx | 59 | low | `_execute` called before it is defined. |
| projects/roomba.mdx | 24 | medium | See fix-first. |
| projects/roomba.mdx | 53 | low | "content-header" → Content-Type/Content-Length headers. |
| projects/roomba.mdx | 102, 124 | low | Missing full stops. |
| projects/roomba.mdx | 106 | low | Non-parallel. |
| Clean | | | performance-management-evolution, all seven thoughts posts except technical-debt, codenotes, gaudi-my-bash-framework. |
