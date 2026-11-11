# Startup Handbook

Mode: Read. The user approved a distinct editorial landing page, chapter layout and curated updates view on 11 November 2026.

## Direction

The Startup Handbook draws on the author's experience in two startups: being part of one company's growth from six people to 400 and unicorn status, then building again from scratch at Mav9 as CTO. Keep the first company unnamed in this introduction and do not imply the author was its CTO. The company-wide subjects carry a CTO perspective; distinguish experience, recommendations and current Mav9 practice. Most existing chapters currently describe Mav9.

Extend the existing site identity with a typographic title page and a readable chapter directory. Use the existing Plus Jakarta Sans family and Gaudi palette. Large chapter numerals express reading order; they are not decorative section counts. Keep rows unboxed and without bottom separators. The latest changes sit beside the directory on desktop and follow it on mobile.

## Reading path

Start reading, select a chapter, or inspect updates. The chapter layout has a quiet persistent chapter rail on desktop and a collapsible chapter menu on smaller screens. Updated dates are explicitly labelled, and each chapter links to its authored change history. Mav9 practice sections use a restrained surface treatment.

## Implemented surface

- `/blog/handbook` is the title page and numbered chapter directory. Its latest-changes column shows the three newest curated milestones from the handbook index's changelog; `/blog/handbook/updates` shows that milestone history, newest first. Entries link to the index's `#changelog`.
- The title and introduction, directory and latest changes, and update-history introduction and entries form two-column layouts from 48rem (768px). Below that width they follow their reading order in one column.
- The chapter layout uses a 13rem sticky navigation rail from 64rem (1024px), with its own vertical scrolling when needed. Smaller screens use a native Chapters disclosure. The article is capped at 72ch, and On this page remains collapsed unless its existing frontmatter explicitly enables it.
- Chapter selection uses the established blue accent and a light token-based surface tint. Practice sections share that restrained tint. Directory and update rows have no separators; the rules above the directory, full history and adjacent-chapter navigation mark section boundaries.
- `HandbookOverview`, `HandbookLayout` and `HandbookChapterNav` own this presentation. `ContentDocument` selects the handbook layout while retaining the original article URLs, MDX renderer, citations and footnotes. Chapter order follows `series.order`. Updated labels still consider dates across all published members; chapter edits do not automatically enter the public feed.

## Update policy

Log meaningful milestones: a new chapter or part, a substantial new section, or a change in methodology or recommended practice. Write one handbook-level entry for a coherent addition spanning several chapters. Do not log routine wording, formatting, corrections, extra examples, renamed labels or individual drafting passes. Chapter histories remain local. Curate public milestones in `management/cto-handbook.mdx`; do not infer importance from keywords or automatically promote every chapter entry. This policy was explicitly requested by the user on 11 November 2026.

## Relationship to the site

This surface extends the incumbent blog identity. It inherits Plus Jakarta Sans, Gaudi's `--ds-color-*` and radius tokens, the shared page shell and `post-reading` typography from `app/responsive.css`. The ordinary archive and `PostArticleFrame` remain the reference for the rest of the blog. Keep handbook composition in its scoped modules; no new global palette or visual system was introduced.

## Build and verification

Code-led document surface using real existing content. No generated image or replacement site identity is needed. Inspect both themes, current authored content, keyboard navigation, chapter expansion, update links, and 320–1920px widths around the 768px and 1024px layout changes. Keep old chapter links working. Preserve all original prose and article contents defaults.
