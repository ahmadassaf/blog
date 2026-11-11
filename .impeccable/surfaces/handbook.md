# CTO Handbook

Mode: Read. The user approved a distinct editorial landing page, chapter layout and aggregated updates view on 11 November 2026.

## Direction

Extend the existing site identity with a typographic title page and a readable chapter directory. Use the existing Plus Jakarta Sans family and Gaudi palette. Large chapter numerals express reading order; they are not decorative section counts. Keep rows unboxed and without bottom separators. The latest changes sit beside the directory on desktop and follow it on mobile.

## Reading path

Start reading, select a chapter, or inspect updates. The chapter layout has a quiet persistent chapter rail on desktop and a collapsible chapter menu on smaller screens. Updated dates are explicitly labelled, and each chapter links to its authored change history. Mav9 practice sections use a restrained surface treatment.

## Implemented surface

- `/blog/handbook` is the title page and numbered chapter directory. Its latest-changes column shows the three newest authored entries; `/blog/handbook/updates` shows the complete history, newest first. Entries link to the original article's `#changelog`.
- The title and introduction, directory and latest changes, and update-history introduction and entries form two-column layouts from 48rem (768px). Below that width they follow their reading order in one column.
- The chapter layout uses a 13rem sticky navigation rail from 64rem (1024px), with its own vertical scrolling when needed. Smaller screens use a native Chapters disclosure. The article is capped at 72ch, and On this page remains collapsed unless its existing frontmatter explicitly enables it.
- Chapter selection uses the established blue accent and a light token-based surface tint. Practice sections share that restrained tint. Directory and update rows have no separators; the rules above the directory, full history and adjacent-chapter navigation mark section boundaries.
- `HandbookOverview`, `HandbookLayout` and `HandbookChapterNav` own this presentation. `ContentDocument` selects the handbook layout while retaining the original article URLs, MDX renderer, citations and footnotes. Chapter order follows `series.order`; authored changelog dates feed both the combined history and Updated labels.

## Relationship to the site

This surface extends the incumbent blog identity. It inherits Plus Jakarta Sans, Gaudi's `--ds-color-*` and radius tokens, the shared page shell and `post-reading` typography from `app/responsive.css`. The ordinary archive and `PostArticleFrame` remain the reference for the rest of the blog. Keep handbook composition in its scoped modules; no new global palette or visual system was introduced.

## Build and verification

Code-led document surface using real existing content. No generated image or replacement site identity is needed. Inspect both themes, current authored content, keyboard navigation, chapter expansion, update links, and 320–1920px widths around the 768px and 1024px layout changes. Keep old chapter links working. Preserve all original prose and article contents defaults.
