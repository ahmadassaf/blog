# Agile cadence responsive verification

Checked the live `/blog/category/management/introduction-to-classical-agile` preview with browser viewport overrides on September 10, 2026.

## Viewports inspected

| Viewport width | Height | Coverage |
| --- | --- | --- |
| 320 | 1000 | Narrow phone; Scrum and Kanban |
| 375, 390, 480 | 960 | Common phone widths |
| 607, 609 | 1000 | Either side of the 576px component breakpoint before the page's small-screen gutter change |
| 673, 675 | 1000 | Either side of that component breakpoint after the page's gutter change |
| 768, 1024, 1280 | 1000 | Tablet and laptop |
| 1536, 1920 | 1080 | Wide desktop; diagram fills the article container |
| 844 | 390 | Phone landscape; keyboard and release interactions |

The Scrum diagram's labels, day markers, increment branch, and controls remained visible without unintended horizontal scrolling at these sizes. Narrow labels wrap; the diagram uses the full available article width. The site's article maximum width still applies on wide monitors.

At 320px, the Kanban board scrolls within its own frame. Verified a blocked move into full Review, finishing a review, and then moving Saved searches successfully. The workflow-policy summary inherited an oversized article style; scoped its font and set a 44px minimum target height, then confirmed the expanded policy at 320px.

In landscape, keyboard Home/ArrowRight/End controls changed the simulated day. Releasing on day 1 showed the readiness explanation; releasing on day 5 and moving to day 10 retained the release and the scheduled Review. Event selection was exercised during the viewport sweep.

These are live browser viewport checks, not physical-device certification. Restored the original dark theme, normal viewport, and default Scrum state after verification.
