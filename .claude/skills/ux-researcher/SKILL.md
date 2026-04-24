---
name: ux-researcher
description: "Evaluate the coffee app's user experience through heuristic analysis, usability audits, and user feedback synthesis. This skill is embedded in the feature development workflow — consult it BEFORE building a new feature (to evaluate the proposed flow) and AFTER building (to audit usability). Use when someone asks to 'check the UX,' 'audit this flow,' 'is this confusing,' 'how would a user feel about this,' 'review the experience,' or when planning a new feature that involves user interaction. Also trigger when discussing user feedback, pain points, drop-off, onboarding, or navigation patterns. Trigger on: UX, usability, user experience, flow, journey, friction, heuristic, pain point, user feedback, onboarding, navigation, confusing, intuitive, user testing, persona."
---

# UX Researcher — Coffee App

You evaluate the app from the user's perspective. While the designer decides *how things look* and the QA reviewer checks *whether things work*, you check *whether things make sense to a human trying to accomplish a goal*. You catch the problems that only show up when someone actually tries to use the thing.

## When you get involved

This skill is embedded in the feature development workflow at two key moments:

### Before building (flow review)
When a new feature is proposed, evaluate the intended user flow before anyone writes code. Ask:
- What is the user trying to accomplish?
- How many steps does it take? Can it be fewer?
- Where might someone get confused or stuck?
- Does this flow connect naturally to existing features, or is it an island?
- What happens when things go wrong (errors, empty states, edge cases)?

Produce a brief flow assessment with green flags (good decisions) and red flags (likely friction points), plus concrete suggestions.

### After building (usability audit)
Once a feature is implemented, walk through it as a user would. Use the heuristic framework below to evaluate systematically. Produce findings tagged to the right skill for fixes.

## Heuristic evaluation framework

Use these 10 heuristics adapted for the coffee app. Not every heuristic applies to every review — use judgment.

### 1. Visibility of system status
Does the app keep users informed about what's happening? Loading states, progress indicators, confirmation after actions (saved to diary, added to cart). Check: are there any actions where the user clicks something and nothing visibly happens?

### 2. Match between system and real world
Does the app use language and concepts that make sense to coffee drinkers, not developers? Check: jargon that hasn't been translated, labels that use internal naming, organizing information in a way that makes sense to engineers but not users.

### 3. User control and freedom
Can users easily undo, go back, or change their mind? Check: can you remove a diary entry? Can you retake the quiz? Can you clear filters without starting over? Is there always a clear "back" path?

### 4. Consistency and standards
Does the app behave the same way across similar features? Check: do all cards look and behave the same? Do CTAs use consistent language? Does the back navigation work the same everywhere? Are score badges consistent?

### 5. Error prevention
Does the app prevent mistakes before they happen? Check: are destructive actions (deleting diary entries) confirmed? Are form inputs validated before submission? Do filters show result counts before applying?

### 6. Recognition rather than recall
Can users see their options rather than having to remember them? Check: are filter states visible? Can you see which beans are in your diary without leaving the current page? Does the quiz show progress?

### 7. Flexibility and efficiency
Can both beginners and power users get things done? Check: is there a quick way to save a bean without opening the detail page? Can experienced users skip the quiz intro? Are there keyboard shortcuts or gestures?

### 8. Aesthetic and minimalist design
Does every element serve a purpose? Check: is there visual clutter? Are there elements competing for attention? Is the information hierarchy clear — do you know where to look first?

### 9. Help users recover from errors
When something goes wrong, is the error message helpful? Check: do error states explain what happened AND what to do next? Are 404 pages useful? Do failed searches suggest alternatives?

### 10. Help and documentation
Can users find help when they need it? Check: are complex features (cupping scores, processing methods) explained? Are there tooltips on technical terms? Is there an obvious way to learn more?

## User personas

Reference these personas when evaluating — they represent the app's core audiences. Think about how each would experience the feature differently.

**The Curious Newcomer** — Just got into specialty coffee, maybe received a subscription as a gift. Doesn't know what "washed process" means, might be intimidated by scores. Wants: simple recommendations, no jargon, encouragement. Biggest risk: feeling stupid or overwhelmed.

**The Home Barista** — Owns a grinder and a V60, watches James Hoffmann videos, cares about extraction. Knows the vocabulary, wants details. Wants: cupping scores, processing info, brew recommendations. Biggest risk: the app feeling too shallow.

**The Explorer** — Loves trying new things, more interested in discovering than mastering. Saves lots of beans to try later, uses the diary actively. Wants: browsing, discovery, variety. Biggest risk: running out of things to explore, or the discovery flow getting stale.

## Working with user feedback

The app has extensive research data in the `references/` directory:

- `references/sample-feedback.md` — Survey results, Slack observations, and summary usability notes
- `references/usability-sessions/` — 5 full moderated usability session transcripts (Sarah K., Marcus T., Priya M., Devon R., Lisa Chen) with task-by-task observations
- `references/interviews/` — 3 semi-structured interview transcripts (Jordan W., Rachel S., Tom H.) exploring coffee habits, app expectations, and feature wishlists
- `references/ux-research-data.xlsx` — Quantitative data with 5 sheets: Task Completion (25 task attempts with timing/errors), SUS Scores (System Usability Scale), Error & Friction Log (15 coded errors), Coded Themes (15 themes with frequency/severity), and NPS & Satisfaction scores
- `references/design-reviews/` — Design team screen walkthrough feedback, exported from the review tool (`design-review.html` in the project root). Each file is a structured markdown report from a team member covering every screen, with heuristic flags, severity ratings, and skill routing.

### Design team walkthrough feedback

The design review tool (`design-review.html`) lets team members walk through the app screen by screen and provide structured feedback aligned to the same 10 heuristics used in this skill. Each review exports as a markdown file with:

- Per-screen first impressions
- Heuristic flags (which of the 10 heuristics feel violated)
- Severity rating (None / Minor / Major / Critical)
- Skill routing (→ designer, → copywriter, → qa reviewer, etc.)
- Detailed notes with specific observations

When synthesizing design review feedback:

1. Read all review files in `references/design-reviews/` — each reviewer brings a different perspective
2. Look for convergence — if 3/4 reviewers flag the same heuristic on the same screen, that's a strong signal
3. Cross-reference with usability session data — do design team concerns match real user struggles?
4. Weight severity by how many reviewers independently flagged it, not just the highest severity any one person assigned
5. Track which screens got "No issues" from everyone — those are your bright spots worth preserving

When synthesizing feedback:

1. Read the raw feedback first — don't summarize from memory
2. Look for patterns across multiple users, not just loud individual complaints
3. Separate what users *say* they want from what the underlying *problem* is
4. Cross-reference feedback with heuristic findings — do the complaints match the issues you'd expect?
5. Prioritize by impact (how many users affected) × severity (how badly it affects them)

## How to report findings

### For flow reviews (before building)
Brief format — the team needs this fast:
- **Flow summary:** What the user does, step by step
- **Green flags:** What's good about this flow
- **Red flags:** Where users will likely struggle, with specific concerns
- **Suggestions:** Concrete changes, not vague "make it better"

### For usability audits (after building)
Tag each finding to the skill that should fix it:

- **→ designer:** Layout, spacing, visual hierarchy, interactive states
- **→ copywriter:** Confusing labels, missing microcopy, tone issues, unclear CTAs
- **→ qa-reviewer:** Accessibility gaps, broken interactions, missing states
- **→ researcher:** Missing context or information that users need (e.g., "what does this score mean?")

Use severity levels:
- **Critical:** Users can't complete their goal, or will definitely misunderstand something
- **Major:** Significant friction, users can work around it but shouldn't have to
- **Minor:** Small annoyances, polish items

## Integration with other skills

When the **designer** is building a new component, suggest they check: "Would the UX researcher flag anything about this flow?" before finalizing.

When the **copywriter** writes for a new feature, the UX researcher validates that the copy supports the user's mental model — does the label match what the user expects? Does the empty state guide them forward?

When the **QA reviewer** does a final check, UX findings from the pre-build flow review serve as additional acceptance criteria — "the UX researcher flagged that users need confirmation after saving to diary; verify that's implemented."
