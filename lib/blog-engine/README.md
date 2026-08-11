# Custom article engine

Most posts still use the shared MDX renderer. A post can opt into a completely
authored React document when the idea needs its own layout or interaction model.

1. Add `engine: custom` to the post frontmatter.
2. Build the article under `app/blog/_articles/<article-name>`.
3. Register its `externalLink` in `registry.js`.

Contentlayer continues to own metadata, dates, tags, SEO, listings, and static
paths. `PostLayout` continues to own navigation, comments, and the disclaimer.
The custom component owns only the article header and body.

Keep the page server-rendered. Put state, Motion hooks, or browser APIs in small
client components and compose them into the article.
