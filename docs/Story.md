# The Story So Far

**How a team of non-developers built a working app in 3 days — without a single meeting.**

---

## The Setup

None of us are developers. We're designers and researchers who wanted to build something real — a coffee discovery app that helps people explore beans from around the world. We had a product idea, a shared repo, and Claude Code.

What we didn't have: a kickoff meeting, a sprint plan, or anyone who could write React from memory.

Here's what happened.

---

## Day 1 — April 1, 2026

### Emily lays the foundation

The repo starts with a skeleton. Emily creates the project structure — empty folders for `src/app/`, `src/components/`, `src/data/`, `public/`, and `tests/`. A README explains the idea. A `VISION.md` lays out the product principles and a three-phase roadmap:

- **Phase 1:** Bean catalog, search, detail pages
- **Phase 2:** Taste profile quiz, personal journal, recommendations
- **Phase 3:** User reviews, shared lists, brewing guides

No code yet. Just clear intent.

### Hassan proposes how to build it

Without waiting for a meeting, Hassan opens a branch and drafts a build proposal with Claude Code. He doesn't just pick a tech stack — he researches four complete options, each with a full breakdown:

| Option | Stack | Learning Curve |
|--------|-------|---------------|
| A: Simple Site | Astro + Plain CSS + Markdown | Lowest |
| B: Modern Web App | Next.js + Tailwind + JSON | Medium |
| C: Lightweight Full-Stack | SvelteKit + Tailwind + SQLite | Medium |
| D: Two-Part App | Vite + React + Hono + SQLite | Highest |

Each option includes a work breakdown showing how 5–6 people could divide the work, pros and cons, and honest trade-offs. He recommends Option B — Next.js — because Claude Code knows it best, it scales into future phases, and the work divides cleanly.

He opens a pull request. The team hasn't met, but now there's a real technical decision on the table with clear reasoning behind it.

---

## Day 2 — April 2, 2026

### Emily brings the data

While the proposal sits in review, Emily doesn't wait. She sources the actual data the app will need:

- **1,338 real coffee beans** from the Coffee Quality Institute's open database — every bean has origin, variety, processing method, altitude, and full SCA cupping scores across 10 dimensions
- **20 hand-picked standout beans** for prototyping and demos — diverse origins, all scoring 86+
- **A flavor taxonomy** based on the SCA Flavor Wheel — 9 categories, 110+ descriptors like "blueberry," "molasses," "jasmine," and "smoky"
- **A data schema** documenting every field, scoring reference, and data source

She also writes the kickoff guide — a structured 45-minute meeting agenda for when the team does finally get together. It covers intros, vision review, deciding what to build first, resolving open questions, and picking first tasks.

The meeting hasn't happened yet. But the agenda is ready, and the data is in the repo.

---

## Day 3 — April 3, 2026

### Emily merges the proposal and builds Option B

Emily reviews Hassan's PR and merges it. Then, working with Claude Code, she takes Option B off the page and makes it real:

**In a single session**, the app goes from empty folders to a working product:

- **Next.js 15 + Tailwind CSS v4 + TypeScript** — the full stack initialized and configured
- **A bean catalog homepage** — all 1,338 beans displayed in a responsive card grid
- **Search** — type to find beans by country, region, variety, farm, or processing method
- **Filters** — dropdown filters for country, processing method, and minimum cupping score
- **Sorting** — by highest score, lowest score, country A–Z, or highest altitude
- **1,338 bean detail pages** — each with full info, an SVG radar chart of cupping scores, bar breakdowns for all 10 SCA dimensions, and defect counts
- **A design system** — coffee-inspired color palette (cream, espresso, caramel, sage), serif headings, score badges that change color by quality tier
- **A `CLAUDE.md`** — so every team member gets consistent help from Claude Code

The production build generates all 1,342 pages. The app runs.

---

## What We Have Now

```
3 days elapsed
2 contributors
0 meetings held
1 working app
1,338 beans browsable
7 components built
4 documentation files written
```

### The App
A fully functional coffee discovery tool. You can search for "Ethiopia," filter to "Washed" processing, sort by score, click into a bean, and see its full cupping profile with a radar chart. It's responsive, fast, and has a cohesive design language.

### The Docs
- A product vision with a phased roadmap
- A technical proposal comparing 4 approaches with a clear recommendation
- A meeting agenda ready for whenever the team syncs
- A collaboration guide for working with Claude Code
- A `CLAUDE.md` that keeps the AI aligned across contributors
- This document

---

## How This Happened

A few things made this possible:

### 1. People moved without waiting for permission

Emily didn't wait for a tech stack decision to source data. Hassan didn't wait for a meeting to write the proposal. Each person did the work they could see needed doing, put it in the repo, and trusted the team to review it.

### 2. Claude Code filled the skills gap

Nobody on the team writes React. But with Claude Code, Emily could take Hassan's proposal — a document — and turn it into a running Next.js application with 7 components, TypeScript types, data utilities, search logic, and SVG visualizations. The AI handled the code; the humans handled the decisions.

### 3. The repo was the meeting room

Every contribution was visible, reviewable, and buildable-upon. Hassan's proposal was a pull request, not a slide deck. Emily's data came with schema docs, not a Confluence page. The work product was the communication.

### 4. Good documentation traveled ahead of the work

The vision doc, the schema, the proposal, the kickoff guide — these weren't afterthoughts. They were written first, so that when someone sat down to build, the context was already there. Claude Code could read `VISION.md` and understand the product. A new contributor could read the README and run the app in two commands.

---

## What's Next

The team still hasn't met. The kickoff guide is sitting in `docs/`, ready for whenever that happens. When it does, the conversation won't be "what should we build?" — it'll be "here's what's already running, where do we take it?"

Phase 2 is on the board: taste profile quiz, personal bean journal, and recommendations. Phase 3 after that: reviews, shared lists, and brewing guides.

But that's for after the first meeting. For now, the story is this: two people and an AI built a real product in three days by working asynchronously, documenting clearly, and trusting each other to move.

---

*Written April 3, 2026 — still haven't had that kickoff meeting.*
