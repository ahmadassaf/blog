# Handbook updates

- Keep the public handbook Updates feed empty until the user explicitly asks to publish an update entry.
- Never create handbook update or changelog entries automatically as part of writing, editing, adding chapters, changing methodology, or committing work.
- Keep post-level changelogs empty until explicitly requested too. Omit empty changelog sections and introductory promises of a changelog; show “View changes” only when parsed entries exist.
- When explicitly requested, log only the requested major milestone: a new chapter or part, a substantial section, or a methodology change. Public entries are authored in `data/blog/management/cto-handbook.mdx`; chapter edits must not populate the feed.

# Author's voice across all posts

- The author has not been involved in fundraising. Do not imply personal experience of raising money or present fundraising advice as learned from doing it. Beginnings assumes the funding is already in place.
- The author knowingly signed up for company-building responsibilities beyond engineering and is happy to take them on. Present that work as normal for a founding role. Do not invent reluctance, surprise at the scope, or regret about taking it on; later handovers concern how ownership changes as the company grows.
- Do not invent first-person reflections, regrets, motives or claims about what the author wishes he had done. Ground personal statements in the user’s own account; earlier assistant drafts and editorial checks are not evidence that the user said something. Hypothetical guidance must not become autobiographical hindsight.

# Handbook framing

- Internal documents and private workspace pages are background for drafting, not reader-facing sources. Do not link to them, name them as authorities, or explain that a chapter draws on or adapts them. Write the useful explanation directly and make it self-contained, while preserving the distinction between experience, recommendations and examples. Preserve genuinely public references and citations.
- Keep the handbook independent of named employers or companies. Frame examples around how the author works now, how a practice fits a startup, and how it can change as the company scales. Use labels such as “How I do it now”, “How I approached it at a startup” and “As the company grows”, with proposals identified separately. Preserve the substance and tense of real experiences without naming the company; do not invent scale-up experience or present recommendations as established practice. Keep source citations and named tools intact.
- Organise chapters around the author's startup responsibilities and CTO experience. Develop the handbook's own structure and sections; books may be referenced lightly as sources, but must not supply its chapter structure.
- Prefer sharp, one-word chapter names.
- Do not prepend handbook chapters with boilerplate about belonging to the handbook or being continually edited. Start directly with the chapter content.
- Handbook chapters use the `HandbookChapter` content type. Keep them out of recent-post menus, featured writing and the ordinary RSS feed. Include them in handbook navigation, grouped archives, search, direct routes, previews and the sitemap through the shared blog-document collection. Keep the handbook card on the homepage; blog/category/tag lists use the handbook entry with its chapter dropdown.

# Series in lists

- Series collapsing is opt-in through `series.collapseInLists` on the lowest-order published post. Default to `false`; the handbook index explicitly opts in, while ordinary series stay uncollapsed unless the user asks otherwise.
- Collapsed series use smaller, indented installments with descriptions and aligned dates. Show the category on the parent entry only, not on its children. Resolve grouping before filtering and pagination.

# Handbook card appearance

- Use Gaudi's Soft Aurora (`Borealis` with `variant='soft'`) for the homepage handbook card. The border must match the Mav9 DS ChatInput “Opt-in glow” / Card `glow` effect: the travelling ocean-palette highlight from `border-beam`, not a static conic outline or full-card halo.
- If the user revisits this choice, their other preference is Soft Grainient (Gaudi's `Grainient` with gentle grain and motion). Keep Soft Aurora until they ask to change it.
- Do not show a pause control on the handbook card. Continue respecting reduced-motion preferences automatically.
