---
target: our blog
total_score: 29
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 0
timestamp: 2026-08-12T10-28-58Z
slug: app-blog-page-js
---
# Blog index design critique

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3 | Active navigation and live filtering are clear; search lacks a visible result count. |
| 2 | Match System / Real World | 4 | Featured story, metadata, tags, summaries, and chronology follow familiar editorial conventions. |
| 3 | User Control and Freedom | 3 | Links are reversible and native search is clearable; retrieval still begins late in the page. |
| 4 | Consistency and Standards | 3 | Components are cohesive, though the visible hierarchy starts at an h2 while the page h1 is hidden. |
| 5 | Error Prevention | 3 | The page is low-risk and search resets pagination; edge behavior is sensible. |
| 6 | Recognition Rather Than Recall | 4 | Dates, categories, summaries, tags, and explicit article links make choices recognizable. |
| 7 | Flexibility and Efficiency | 3 | Search and site navigation support return visitors, but search follows the full featured block. |
| 8 | Aesthetic and Minimalist Design | 2 | Large type, loose leading, and generous section gaps compound into low scan density. |
| 9 | Error Recovery | 4 | The no-results state names the query and suggests a shorter or different search. |
| 10 | Help and Documentation | n/a | A low-risk editorial index should not require help documentation. |
| **Total** |  | **29/36** | **Good** |

## Design Specificity Verdict

The page feels intentionally editorial, not generic SaaS: featured-story hierarchy, restrained blue metadata, category pills, chronological rows, and the aurora shell form a coherent world. It is still somewhat category-interchangeable because nearly all character comes from scale and spacing rather than a more distinctive editorial device. The strongest missed opportunity is compact, confident curation: the current scale makes the blog feel like a marketing landing page before it feels like an index of writing.

The deterministic scan returned zero findings for `app/blog/page.js`. That is useful but narrow: the route delegates its visible UI to `FeaturedLayout`, `ListLayout`, and design-system components, so a clean page-file scan does not validate the composed typography. Source and live-markup inspection caught the cumulative sizing issue that the detector did not.

No visual overlay was available because the browser runtime reported no available browser backend. Live HTTP returned 200 and exposed the responsive markup, which served as the fallback evidence; screenshots and optical balance remain unverified.

## Overall Impression

The instinct is right, with an important nuance: the base typography is fine. The page feels oversized because the hero, supporting copy, list titles, navigation padding, and section spacing all sit one step above the density expected of a blog index. The biggest opportunity is to compress the vertical rhythm and lower secondary typography while preserving one genuinely prominent featured story.

## What’s Working

- The featured-to-secondary-to-chronological progression gives the page a clear editorial story.
- Metadata is restrained at 14px, tags are visibly grouped, and the article rows use separators rather than heavy card chrome.
- Responsive structure is sound: the featured grid collapses to one column and interactive targets remain comfortably sized.

## Cognitive Load

Moderate: two of eight checklist items fail.

- **Single focus fails:** navigation, the featured CTA, up to four tags, two secondary stories, search, and the main list all compete near the top of the journey.
- **Progressive disclosure fails:** curation and retrieval are presented together instead of letting users choose a mode early.

The featured action row can exceed four visible choices when “Read Full Article” and four tags appear together. This is the clearest working-memory pressure point. Chunking, grouping, visual hierarchy, one-thing-at-a-time behavior, and cross-screen memory demands otherwise remain healthy.

## Emotional Journey

The opening feels polished, calm, and authoritative. The featured story builds confidence, but repeated large typography and generous gaps slow the descent toward browsing. For a returning reader, curiosity can turn into mild impatience before search and the chronological list appear. The ending is reassuring and orderly, though the generous footer adds one more low-density zone.

## Priority Issues

### [P2] Cumulative typography makes every content tier feel promoted

**Why it matters:** A blog index succeeds through rapid scanning. A 48px hero title, 24px/36px summary, 24px secondary titles, and 24px desktop list titles leave too little contrast between editorial tiers and fit fewer choices above the fold.

**Fix:** Keep the hero distinctive but lower the supporting tiers:

- Hero title: 36/40 on mobile and 42/47 on desktop instead of 36 and 48/54.
- Hero summary: 18/28 on mobile and 20/30 on desktop instead of 20 and 24/36.
- Secondary title: 21/27 instead of 24/30.
- Secondary summary: 16/25 mobile and 17/27 desktop instead of 18/32 on desktop.
- List title: 18/24 mobile and 21/27 desktop instead of 20 and 24.

**Suggested command:** `$impeccable typeset`

### [P2] The vertical rhythm is generous at every layer

**Why it matters:** Individual gaps are defensible, but 40–48px navigation padding, 48px featured padding, 48px grid offset, 32px search offset, and 24px list offset accumulate into a page that feels slower and larger than its content warrants.

**Fix:** Reduce navigation to `py-6 lg:py-8`; featured bottom padding to `pb-8 lg:pb-10`; secondary grid offset to `pt-8`; grid gap to 20px; search offset to 24px; list offset to 16px; footer padding to 32/40px. Keep 44px interactive targets.

**Suggested command:** `$impeccable layout`

### [P2] The content shell is wider than the text hierarchy can comfortably fill

**Why it matters:** `xl:max-w-6xl` is appropriate for a two-column grid, but full-width hero copy at that measure makes large type feel even more billboard-like and creates unstable line lengths.

**Fix:** Retain the wide shell for grids and rows, but cap hero copy at 680–720px and summaries near 60–68ch. Use a narrower reading measure inside the wide layout rather than shrinking the entire site container.

**Suggested command:** `$impeccable layout`

### [P2] Retrieval arrives after a long curated preamble

**Why it matters:** Returning readers who came to find an article must pass the hero and secondary stories before the filter. The oversized upper section amplifies this delay.

**Fix:** Put search directly after a restrained visible page title or immediately after the hero, before secondary stories. Add a live result count and keep the existing helpful no-results copy.

**Suggested command:** `$impeccable distill`

## Persona Red Flags

**Jordan, first-time reader:** The editorial structure is understandable, but the hidden “Blog” h1 weakens orientation. Multiple large headings and tags create several apparently equal entry points instead of one obvious “start here” path.

**Sam, accessibility-dependent reader:** Semantic heading order is technically present, but a visually hidden page title paired with a dominant h2 can create a mismatch between visual and screen-reader orientation. The source provides focus-visible styles and labelled search, but keyboard flow and 200% zoom could not be verified without a browser viewport.

**Casey, distracted mobile reader:** The 36px heading and 20px summary are acceptable individually, but long titles can consume most of the first viewport. Stacked CTA and tag choices push search and recent articles further down; touch sizes themselves appear healthy.

## Minor Observations

- Navigation body text is fine at 16px; the 18px desktop increase is unnecessary unless the menu is extremely sparse.
- Metadata at 14/24 can tighten to about 14/20, especially when multiple pills share the row.
- List-row padding at 12px is reasonable; title scale, not row padding, is the bigger density lever.
- A visible restrained “Blog” title would clarify the page hierarchy without adding much height if search sits on the same horizontal band at desktop.
- The clean detector result is not evidence that the scale is correct; it only means no mechanical anti-pattern fired in the thin route file.

## Questions to Consider

- Should the page primarily curate the best writing, or help returning readers find an article quickly?
- On a typical laptop, should the first viewport expose one article choice, three, or five?
- Are four hero tags useful navigation, or metadata competing with the article CTA?
- Would the site feel more authored if its confidence came from tighter editorial composition rather than larger type?
