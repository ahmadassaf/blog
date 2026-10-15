# Agile, Kata, and management posts: editorial and illustration review

Reviewed 10 September 2026. This is a review and source-enrichment package; the published post files and illustrations have not been rewritten in this pass.

## My overall view

There is a worthwhile collection here. The strongest material comes from the author's experience: what changed between SAP, early Beamery, the research team, and Mav9; why a useful practice later stopped helping; and why more frequent feedback did not automatically create better development conversations.

The biggest weakness is the gap between that nuanced experience and the certainty of some explanations. The posts warn against process dogma and metric-based judgment, then occasionally prescribe universal rules or infer motives from a chart. Attractive illustrations make those statements especially convincing. Correctness and teaching quality matter more here than a visual redesign.

The collection would become stronger through three changes: give each post one distinct job, carry a concrete example through the explanations, and use sources to test the author's interpretation as well as support it. More references alone will not resolve the contradictions.

## Scope and the reading path

| Post | Approximate body words | Distinct job I would give it |
| --- | ---: | --- |
| [Agile Evolution](http://localhost:3001/blog/category/management/agile-project-management-evolution) | 1,720 | The personal account: why the way of working changed with the context. |
| [Introduction to Classical Agile](http://localhost:3001/blog/category/management/introduction-to-classical-agile) | 1,672 | The foundations: shared goals, inspection, flow, and what Scrum and Kanban actually require. |
| [Measuring Agile Teams](http://localhost:3001/blog/category/management/measuring-agile-teams) | 1,407 | Interpretation: what an observation suggests, what it cannot establish, and what to inspect next. |
| [Improvement Kata](http://localhost:3001/blog/category/management/improvement-kata) | 1,203 | Practice: turn an observation into a prediction, a small experiment, and learning. |
| [Performance Management](http://localhost:3001/blog/category/management/performance-management-evolution) | 3,420 | The management tension: develop people while making consequential judgments about their work. |
| [Learning in Public](http://localhost:3001/blog/category/thoughts/learning-in-public) | Short companion | A related reflection on making learning available for correction. Keep it outside the formal management series. |

The formal Classical Agile series contains three posts in the correct order: introduction, metrics, Kata. Link the personal Agile account as the optional introduction and performance management as a related application. A broader collection title such as “How teams learn and deliver” would accommodate the companions more naturally than making everything a chapter of Classical Agile.

## 1. Improvement Kata

### What works

The contrast between an unfulfilled retrospective action and a practiced habit is useful. Including the Coaching Kata is a strength. The approachable length suits a practical entry point.

### What I would change

1. **Make the target condition precise.** At source lines 29 and 66–68, a target condition becomes a milestone or implementation task. It should describe a desired, observable way the process will operate by a date, including appropriate measures. A review bot is a possible intervention; timely review is a desired condition. Rother's guide distinguishes the desired condition from how to achieve it. [Practice guide](https://public.websites.umich.edu/~jmondisa/TK/Handbook/Practice_Guide.pdf).
2. **Replace “cut corners” with smaller experiments.** Lines 32 and the diagram readout equate speed with accepting roughness. Limit the trial's scope and duration, state the expected observation, and retain what makes the result informative. That is a much better expression of scientific thinking. [Coaching handbook](https://public.websites.umich.edu/~jmondisa/TK/Handbook/Coaching_Kata_2.pdf).
3. **Restore reflection in the coaching sequence.** After establishing the current condition, compare the previous step's prediction with what happened and what was learned. Otherwise the five questions can become another status routine. Coaching and experiments can happen inside a sprint, often daily; the retrospective should not become a gate on learning. [Rother's handbook](https://public.websites.umich.edu/~jmondisa/TK/Handbook/Coaching_Kata_2.pdf), [LEI on coaching practice](https://www.lean.org/the-lean-post/articles/what-too-many-leaders-get-wrong-with-coaching-kata/).
4. **Correct the Lean distinction.** Lines 72–74 reduce Lean to process and Kata to people, then suggest optimizing the pieces optimizes the system. Lean includes people development and experimentation. A local improvement can move the queue downstream. [LEI's definition](https://www.lean.org/explore-lean/what-is-lean/), [Womack on end-to-end thinking](https://www.lean.org/the-lean-post/articles/thinking-end-to-end/).
5. **Clarify the origin and purpose of the routine.** Rother derived the pattern from studying Toyota and developed Starter Kata for learning it. Avoid implying Toyota universally used these exact scripts or that practitioners must never adapt them. [Liker on Toyota Way and Toyota Kata](https://www.lean.org/the-lean-post/articles/the-toyota-way-and-toyota-kata-how-do-they-fit/).

### A concrete enrichment

Use one explicitly fictional example through the whole post. For example:

> We want small changes to reach users predictably. In this sample, only four of the last ten routine pull requests received a first review within one working day. The next target is eight out of ten for two consecutive weeks, while keeping review quality intact. A protected reviewer window is one experiment toward that condition, not the condition itself.
>
> Before trying it, write the prediction. Then compare it with what happened. If urgent support work repeatedly interrupts the reviewer, the useful result is that newly visible obstacle. The next experiment should address it, rather than merely declaring the first attempt a failure.

These are illustrative figures and a proposed teaching example, not results from the author's teams. Define routine requests, business-day boundaries, and the quality check. A small successful trial is not proof of a sustained improvement.

## 2. Introduction to Classical Agile

The accessible explanations and comparison table are worth keeping. The central “two release clocks” framing needs correction before adding references.

**Scrum is an inspection cadence, not a release schedule.** It permits releases during a Sprint, and Sprint Review is not a release gate. Kanban makes flow explicit but does not require every completed card to deploy immediately. The figure currently teaches both simplifications directly. [Scrum Guide](https://scrumguides.org/scrum-guide.html), [Kanban Guide, May 2025](https://kanbanguides.org/the-kanban-guide/2025.5/).

Suggested replacement thesis:

> Scrum gives a team a regular rhythm for setting a goal and inspecting progress. Kanban makes the movement and accumulation of work explicit. Both can support frequent releases, and they can work together.

Other corrections:

- Lines 40–46: use one self-managing Scrum Team with three accountabilities; typically ten or fewer people. The Scrum Master need not personally run every event. Respect organizational Definition of Done requirements.
- Lines 50–66: distinguish the Sprint Goal commitment from the selected work forecast. Scope can be renegotiated as the team learns without endangering the goal. Add the Product Goal and explain the commitments associated with each artifact.
- Lines 79–91: Kanban needs explicit workflow policies, active management and improvement, not simply a board and one limit. Include work-item age and throughput alongside WIP and cycle time.
- A full Review column constrains that stage. Whether it stops new intake depends on the whole system's policies; it is not automatic.
- Rework the selection table around goal cadence, demand, flow and coordination. “Scrum for estimation, Kanban for people allergic to meetings” is memorable but weak advice.

## 3. Measuring Agile Teams

This has perhaps the strongest title and the clearest practical promise. It should consistently deliver on that promise.

The current pattern is often “shape → diagnosis.” Change it to **observation → possible explanations → next check**.

For example, finishing selected work early does not establish under-commitment. Added scope does not establish a Product Owner breaking an agreement. A completion cliff can reflect batching, acceptance policy, reporting delay or large work items. Investigate before assigning a cause. Scrum explicitly permits scope negotiation. [Scrum Guide](https://scrumguides.org/scrum-guide.html).

Specific improvements:

- Pair search adoption with task success or time to a useful result. More use of search could also mean navigation became worse.
- Present “500 points at 50 per sprint” as a rough scenario dependent on scope, capacity, work mix and estimation staying comparable. More old data does not automatically help after the system changes.
- Distinguish a completed-item cycle-time scatterplot from the age of work still in progress. Fast completed items do not prove that nothing is stuck.
- Rename the current “control chart” unless calculated control limits and a statistical interpretation are supplied. Its displayed rolling-average line is currently hardcoded independently of the dots. [NIST on control charts](https://www.itl.nist.gov/div898/handbook/pmc/section3/pmc31.htm).
- A burndown shows remaining selected work; it cannot establish that the Sprint Goal was achieved.
- Broaden the delivery section with current DORA definitions, then add team experience through SPACE and DevEx. DORA's current guide describes five delivery metrics, so distinguish it from the historical four-metric framing and date the update. [DORA](https://dora.dev/guides/dora-metrics/), [SPACE](https://www.microsoft.com/en-us/research/publication/the-space-of-developer-productivity-theres-more-to-it-than-you-think/), [DevEx paper](https://www.michaelagreiler.com/wp-content/uploads/2024/06/DevEx-WhatDrivesProductivity.pdf).

A useful paragraph to add:

> Before changing anything because of a chart, I want to know what changed in the work, what changed in how it was recorded, and what the people doing it can explain. The chart helps me find a question. It rarely supplies the whole answer.

## 4. The Evolution of Agile Project Management

This is the collection's strongest personal account. Preserve the SAP → Beamery → AI team → Mav9 sequence. Cut some repeated conclusions about adapting to context rather than adding a large theoretical section.

- At line 31, criticize how the team was using Scrum rather than claiming the framework assumes a known implementation plan. Scrum explicitly addresses complex work. A credible point remains: keeping a useful shared Sprint Goal may have cost more than it returned in that research setting. [Scrum Guide](https://scrumguides.org/scrum-guide.html).
- Line 23 says early Beamery sprints worked; line 45 dismisses them as a consequence of not understanding ceremonies. Keep the earlier nuance. Different choices can both have been reasonable.
- “No proper planning” at line 43 contradicts the direction, target conditions, prioritization and WIP constraints described later. “Shorter-horizon planning” communicates the actual practice more accurately.
- At line 63, a test-coverage percentage alone is not evidence of improved quality. Connect the condition to a concrete failure or feedback problem.
- Deployment frequency and cycle time describe delivery capability; they are not automatically customer outcomes. Keep both kinds of evidence visible.
- Link Mav9 mentions to https://mav9.com consistently with the author's preference.

The useful external connection is organizational coordination: what happens when the constraint moves between teams rather than within a sprint? [Team Topologies, second edition](https://itrevolution.com/product/team-topologies-second-edition/) fits that passage. [Reinertsen's product-development flow work](https://reinertsenassociates.com/books/) fits the discussion of queues, WIP and uncertainty.

No decorative illustration is necessary. If adding one, use a compact, expandable timeline: context → what helped → what stopped helping → what was retained. The existing personal details are sufficient; do not invent outcomes or retrospective metrics.

## 5. Performance Management

This needs the largest editorial revision. At roughly 3,420 body words it contains two substantial arguments: development through coaching, and selection/compensation through an impact ladder. The transition currently asserts that the second proves the first rather than examining their tension.

### Attribution comes first

The framework around source lines 259–281, including its five rules and the GrowthLevelsExplorer, closely follows [Elliot Graebert's 2023 impact-based level system](https://medium.com/@elliotgraebert/an-impact-based-level-system-for-engineering-organizations-2e0f9bee20e6). Add attribution where the framework begins and in the illustration caption. Explain what was adopted or changed. Attribution identifies the model's origin; it does not validate every recommendation in it.

The earlier compensation/retention language also echoes the [Netflix Culture Memo](https://jobs.netflix.com/culture). Distinguish those influences from the policies the author actually used and from any current company commitments.

### Make the tension the interesting part

The post promises developmental conversations detached from judgment, then describes constant performance selection. Separating meetings can help, but the manager still influences pay, promotion and employment. Explain how the purposes differ, what evidence informs decisions, what support people receive, and how they can question a judgment. [Adobe's account of Check-in](https://www.adobe.com/check-in.html) is a practical comparison: continuous conversations coexist with compensation decisions.

Other changes:

- Start closer to the discovery around line 81: replacing annual reviews with more frequent meetings did not automatically improve the conversations. This is stronger than the generalized history and universal dislike in the opening.
- Remove unsupported claims about assembly-line origins and unspecified millions of hours. A research review can provide context without a sweeping origin story. [Pulakos, Mueller-Hanson and Arad](https://www.annualreviews.org/content/journals/10.1146/annurev-orgpsych-012218-015009).
- Consolidate the repeated development/obstacles/experiments lists into one clearly marked illustrative example, unless the author supplies a real one.
- Let coaching questions supplement direct feedback. Sometimes a person needs information only the manager has, a clear expectation, or a direct answer.
- Remove universal progression deadlines, population percentages and 3×/100× contribution metaphors from the ladder. If any are historical internal policies, label and examine them as such.
- Explain why an experienced IC can remain valuable without climbing to a management-shaped top rung. [Will Larson's staff archetypes](https://staffeng.com/guides/staff-archetypes/) supplies useful alternative perspectives.

Aim for a substantial reduction in repetition, perhaps 25–35%, while preserving the difficult questions. Splitting the ladder into a separately attributed post is an option if both topics need room.

## 6. Learning in Public

Keep this short. It is a useful companion to peer learning and experiment logs, not another management framework chapter.

Soften the absolutes: private learning can accumulate; public work may receive no useful feedback; polished work remains correctable. The advantage is the opportunity for an additional feedback loop, not a guarantee. [Shawn Wang's Learn in Public](https://swyx.io/learn-in-public) and [Learn in Private](https://swyx.io/learn-in-private) make a useful pair of external readings. A natural link from Performance Management's peer-learning section is sufficient.

## Illustration review and proposed interactions

Eight figures were covered across four component families. Preserve their coherent typography, colors and spatial metaphors. Improve what the reader learns through interaction.

| Figure | Current limitation | The interaction I would build |
| --- | --- | --- |
| Kata journey | Selecting elements mostly reveals definitions; the target is described as a change; the linear journey can imply predictable progress. | Follow the fictional review-queue case. Keep challenge/current/target visible. Reveal a prediction, actual observation and next experiment. Include an unsuccessful trial that teaches something useful. |
| Scrum/Kanban | Incorrect release distinction; “The Sprint” appears alongside events it actually contains; Review emits the increment; Kanban cards never move. | Put events inside the Sprint. Show a usable increment and possible release before Review. In Kanban mode, let the reader try moving work into a full Review column, then finish a review and see capacity reopen under explicit policies. |
| Burndown and release charts | Scenario names already decide who is at fault; numbered annotations reinforce a single explanation. | Show the same line with two different underlying work logs. Ask what can be concluded, reveal context, and retain uncertainty. Add a burnup option to separate changing scope from completed work. |
| Velocity/cycle-time/flow charts | Completion history is treated as a full view of the system; trend line is hardcoded; scenario labels overstate causality. | Add aging unfinished work beside completed-item history. Compute lines from the sample. Let a reader inspect an observation, alternative explanations and a next check. Label all sample data and assumptions. |
| Growth ladder | Some numerical claims are unsupported; the highest label privileges management; the readout becomes judgmental. | At a selected scope, compare an IC example with a management example, the observable contribution, support needed and a development experiment. Show staying at a scope as a valid choice. Attribute the source model. |

### Concrete visual and interaction findings

- **Mobile comprehension:** at 390px width, Kata's current condition is visible while the target/direction require horizontal panning. Growth shows only part of the ladder and very small labels. Use a stacked mobile representation or a persistent text summary that retains the relationship among the parts.
- **Teaching density:** large SVG canvases surround small labels and a single readout. Keep enough space for clarity, but use it for the worked example or evidence rather than expanding empty space.
- **Kata keyboard order:** the SVG follows Obstacles → Experiments → Current → Target → Direction. Match the instructional order or supply an ordered set of native controls outside the SVG.
- **Kata pointer target:** in the root browser test, activating the Experiments group through its label's default click position selected the background Obstacles group; keyboard Enter selected Experiments correctly. Disjoint SVG hit areas are a plausible cause. Verify the intended pointer/touch regions and provide an unambiguous control, rather than treating the keyboard result as sufficient.
- **Existing strengths:** reversible selections, immediate readouts, accessible labels, pressed states, keyboard handlers and live announcements are present. The request does not call for replacing the visual identity.
- **Limits of the current teaching:** these are interactive annotated diagrams, not simulations of the underlying process. Say what a proposed demonstration does and does not establish.

## Curated reading shelf

Keep two or three relevant readings on each post, with a sentence about the question each helps answer. Avoid repeating the entire shelf at every ending, and do not imply the author has read or adopted a book unless confirmed.

| Reading | Best fit and purpose |
| --- | --- |
| [The Toyota Kata Practice Guide — Mike Rother](https://www.mheducation.com/highered/mhp/product/toyota-kata-practice-guide.html) | Kata: the practical next step for running learner/coach routines. Pair with the [free coaching handbook](https://public.websites.umich.edu/~jmondisa/TK/Handbook/Coaching_Kata_2.pdf). |
| [Learning to See — Mike Rother and John Shook](https://www.lean.org/store/book/learning-to-see/) | Kata/flow: connect a local improvement to the wider value stream. |
| [Accelerate — Nicole Forsgren, Jez Humble and Gene Kim](https://itrevolution.com/product/accelerate/) | Metrics: the research basis for delivery capability and organizational performance. Use today's DORA guide for current definitions. |
| [Actionable Agile Metrics for Predictability — Daniel Vacanti](https://actionableagile.com/books/) | Metrics: flow, cycle-time distributions and probabilistic forecasting. The author's shelf includes a tenth-anniversary edition. |
| [Team Topologies, second edition — Matthew Skelton and Manuel Pais](https://itrevolution.com/product/team-topologies-second-edition/) | Agile Evolution: coordination, team interactions and cognitive load as the organization grows. Published September 2025. |
| [The Principles of Product Development Flow — Donald Reinertsen](https://reinertsenassociates.com/books/) | Agile Evolution/metrics: queues, batch sizes, WIP and the economics of flow. |
| [Staff Engineer — Will Larson](https://staffeng.com/book/) | Performance: meaningful technical leadership beyond unusually valuable individual code. The archetype chapters are available online. |
| [The Coaching Habit — Michael Bungay Stanier](https://www.mbs.works/books/) | Performance: practical conversational habits; a practitioner resource, not proof that coaching replaces evaluation. |

## Reference integration plan

Use the site's existing numbered citation and bibliography renderer for research and framework definitions. Keep book recommendations as annotated further-reading links. Attribute adapted models in the relevant paragraph and figure caption; an end bibliography alone is easy to miss.

The companion BibTeX file supplies eleven entries covering Kata practice, Scrum, Kanban, current DORA, SPACE, DevEx, Accelerate, the impact-level model, Netflix and Adobe. Additional verified resources and their exact placement are linked above. Keep personal observations in the author's voice; a source should support the specific general claim next to it, not certify the whole anecdote.

For an implementation pass, prioritize:

1. Correct misleading framework/metric claims and add missing attribution in prose and captions together.
2. Make one worked example carry the Kata and metrics explanations.
3. Resolve the performance post's argument and simplify the ladder.
4. Improve mobile diagrams and unambiguous pointer/keyboard controls.
5. Integrate concise citations and reading links, set an accurate updated date, and verify the generated bibliography and both content mirrors.

## Review method and limits

Illustration method: independent Assessment A by internal agent kata_evidence_review, Assessment B by internal agent management_companions_review; editorial cross-check by agile_series_review; root browser verification and synthesis. These were internal agents in this task, not messages to separate user-visible tasks.

Assessment A's Read-mode heuristic score was 21/32: status 3, real-world match 2, control 4, consistency 3, recognition 2, efficiency 2, minimalism 3, help 2. Error prevention and recovery were not applicable to these selection-only illustrations. The score is a qualitative design judgment, not a user-study result.

The detector returned zero findings for the four focused JS components. That does not validate their claims or label legibility. The root browser checks covered representative scenario changes, pointer and keyboard selection, dark desktop views and 390px mobile Kata/ladder views. No browser errors appeared in the checked log. Assessment B could not independently access a browser; its runtime attempt returned an empty browser inventory. Root runtime inspection supplied that evidence. No accessibility conformance or exhaustive scenario test is claimed.

Browser evaluation is read-only, so no detector overlay was injected and no overlay server was started. The temporary viewport override was reset. The reviewed application remained on localhost; nothing was published. The full Rother practice-guide PDF exceeded the web reader's size limit; relevant target-condition passages were available through search-index text, and the smaller coaching handbook was read directly. The performance-management research review was available at abstract level and was not used to establish a detailed historical chronology.

Questions skipped: the user requested an assessment and sources; no further preference is needed to provide this review. Personal examples and descriptions of adopted employment practices should be confirmed before a later rewrite invents any additional autobiographical detail.


## Implementation follow-through — September 10, 2026

The approved changes above are now applied to all six posts. Framework and metric claims were corrected, personal observations kept distinct from general evidence, the performance post shortened by roughly one third, and the examples explicitly identified as fictional or illustrative. Sixteen references were added to the shared bibliography, alongside the annotated book and practitioner reading links. Adapted models are credited in the prose and figure caption.

The four illustration families now provide eight embedded examples: a recorded Kata experiment, a Scrum/Kanban comparison, five metric explorations, and a contribution-scope explorer. Native controls, readable mobile explanations, inspectable values, and persistent predictions replace ambiguous diagram hit areas. Explicit instance IDs avoid the dynamic MDX server/client ID mismatch found during browser verification.

Verification: the content build generated 46 documents; all citations resolve to unique bibliography entries; the 12 focused numerical and citation tests passed; the cadence model passed 144 transitions over 36 reachable states; targeted lint and component compilation passed. The root browser pass exercised desktop and 390px mobile layouts, predictions and branch history, stage-specific WIP limits, releases before Sprint Review, alternative chart explanations, unfinished-work ages, all six contribution scopes, and citation navigation. The final fresh loads of all four component families showed no rendering issue badge. All 23 touched article/component files match their content mirrors.
