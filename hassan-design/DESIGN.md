# Coffee App — Design Concept

> **Status:** Discovery / DVF validation
> **Branch:** `hassan/hassan-design`
> **Date:** April 2026

---

## What Are We Making?

A curated coffee field guide — a small, well-crafted web app that helps people understand what they're tasting, learn coffee vocabulary through real beans, and explore origins with context that teaches rather than assumes expertise.

Built with Next.js by a team of designers learning to code with Claude Code.

---

## User Profiles

We identified four people this app could serve. Each has a different entry point and a different definition of success.

### Noor — The Curious Home Brewer

Noor has a V60 and buys one bag a month from a local roaster. She just finished a Kenyan that was described as "bright, citrusy" and she liked it — but she couldn't tell you why it was different from the Ethiopian she had before. She reads bag labels but the vocabulary doesn't connect to her experience.

- **Core need:** Go from "I liked that" to "here's what you're actually tasting, and here's what to try next"
- **Job to be done:** Help me understand my own palate
- **Entry point:** Search or browse for a bean similar to what she's drinking
- **Success:** "Oh, THAT'S what I like — I like high-acidity, fruity coffees"

### Dev — The Roaster's Apprentice

Dev works at a small roastery and is learning to cup. His boss says "syrupy body and stone fruit acidity" and Dev nods but is mostly guessing. He can taste something changing when he compares samples, but he can't name it yet.

- **Core need:** Build a shared tasting language with his team
- **Job to be done:** Help me develop professional tasting vocabulary
- **Entry point:** Flavor categories and bean comparisons
- **Success:** Can name what he's tasting using standard vocabulary

### Mika — The Thoughtful Outsider

Mika's partner is "into coffee" and their birthday is next week. Mika doesn't drink coffee. Every roaster's description sounds the same: "notes of stone fruit, caramel, and chocolate with a clean finish." She knows her partner always orders "the Ethiopian one" — that's all she has to go on.

- **Core need:** Navigate coffee without knowing coffee
- **Job to be done:** Help me buy a thoughtful gift without expertise
- **Entry point:** Origin/country pages
- **Success:** Understands enough to choose confidently

### The Team — Five Designers Learning to Ship

Hassan and colleagues, none with traditional dev backgrounds, collaborating in a GitHub repo for the first time. The app is the vehicle — the real product is the learning experience.

- **Core need:** Discrete, completable pieces that produce visible results quickly
- **Job to be done:** Give me a piece I can own, finish, and show
- **Entry point:** The codebase itself
- **Success:** Built a real page, saw it live, learned something about web development

---

## Use Cases

| Use case | Who | What happens |
|---|---|---|
| **Explore a bean** | Noor, Dev | Open a bean detail page → see scores as visual bars with plain-language explanations → read flavor tags → see "beans like this one" |
| **Learn a flavor** | Dev | Browse flavor categories → see which beans match a descriptor → compare two beans to calibrate the difference |
| **Discover an origin** | Mika, Noor | Open a country page → read a short editorial intro → browse beans from that origin |
| **Compare two beans** | Dev, Noor | Select two beans → see their score profiles side by side → understand the contrast |
| **Browse the collection** | Everyone | Scan the curated set as cards → filter by origin or score range → pick one to dive into |

---

## DVF Analysis

### Desirability — What People Actually Want

The strongest signal from user research:

1. **"Show me what I'm tasting"** — No existing app bridges the gap between "I liked this bag" and "here's your taste pattern." Score databases exist. Flavor wheels exist. The connection between them and a person's actual cup is missing.

2. **"Help me learn the vocabulary"** — Cupping training tools are expensive ($200+ courses) or purely analog. A free, visual, example-driven tool fills a real gap.

Both of these require **flavor descriptors tagged to individual beans**. Without that linkage, the data is a score spreadsheet and the flavor taxonomy is an orphaned reference chart.

### Viability — What Can Sustain Itself

- **20 curated beans** is small enough to hand-tag with flavor descriptors and editorial content. Quality over quantity.
- **Plain-language flavor translations** are the highest-value content. "8.75 acidity" means nothing to Noor. "Bright and lively — think lemon zest" means everything.
- **"Beans like this one"** can be computed from score vectors using basic distance math. No ML, no API, no complexity.
- **Origin pages** are editorial — one per country, context that teaches. This is writing work, not code.
- The full dataset (1,338 beans) is Phase 2. It needs data cleaning before it's usable.

### Feasibility — What This Team Can Build

Hard constraints:
- Team is new to coding and Git
- Each person needs an independent, completable piece
- No work session should require understanding another person's code
- Results must be visible immediately (deploy from day one)

What this rules out for Phase 1:
- Interactive data visualizations (D3, charting libraries)
- Shared state or cross-component dependencies
- Complex data pipelines

What this enables:
- Static pages rendered from JSON — modify data, see results
- CSS-based score bars (colored horizontal bars) instead of chart libraries
- Independent page ownership — each person builds a route
- Vercel deployment on day one

---

## Critical Assumption: The Flavor Gap

The biggest risk in the concept: **the flavor taxonomy and bean data are disconnected.**

`flavor_taxonomy.json` has 110+ descriptors (blueberry, jasmine, caramel...).
`beans_curated.json` has SCA scores (aroma: 8.67, acidity: 8.75...).

No field links bean #1 to "blueberry, jasmine." A flavor wheel that navigates categories but can't surface matching beans is a menu that leads to empty rooms.

**Resolution:** Phase 1 includes a data enrichment task — manually tagging the 20 curated beans with flavor descriptors from the taxonomy. This is the most important non-code contribution and it makes every other feature real.

---

## Design Principles

1. **Teach, don't assume.** Every score, every processing method, every variety name gets a plain-language companion. If Mika can't understand the page, it's not done.

2. **Independent pages, shared data.** Every route works on its own. No page depends on another page being finished. Shared dependency is limited to `lib/beans.ts` (data loader) and `layout.tsx` (shell).

3. **Content before code.** Flavor tags, origin descriptions, and score translations are the foundation. Visualizations are layered on top in later phases.

4. **Ship small, ship often.** One working page on a live URL beats five half-finished features in local dev.

5. **The data is the product.** 20 well-curated, well-described beans are worth more than 1,338 rows of semi-clean data.

---

## Phased Roadmap

### Phase 1 — The Field Guide

Ship a working app with curated content. Every team member contributes a visible piece.

| Piece | Owner | Description |
|---|---|---|
| Layout shell | TBD | Nav, footer, dark theme, typography (`layout.tsx`, `tailwind.config.ts`) |
| Bean detail page | TBD | Score bars, flavor tags, plain-language descriptions (`/beans/[id]`) |
| Bean catalog | TBD | Card grid with basic filtering (`/`) |
| Origin pages | TBD | One page per origin country with editorial intro (`/origins/[country]`) |
| Data enrichment | TBD | Tag 20 curated beans with flavor descriptors + write score translations |
| Deploy + scaffold | TBD | Next.js setup, Vercel deploy, `CLAUDE.md` for the team |

**Exit criteria:** Live URL. Every curated bean has a detail page with flavor tags and plain-language scores. At least 3 origin pages. Catalog page shows all 20 beans.

### Phase 2 — Connections

Add features that connect the data together. Requires Phase 1 data enrichment to be complete.

- Bean comparison view — side-by-side score profiles
- "Beans like this" recommendations on detail pages
- Flavor category pages — browse by descriptor
- Score visualizations (radar charts, upgraded from CSS bars)
- Full dataset import with data cleaning

### Phase 3 — The Wheel

The signature feature, earned after the data and team skills support it.

- Interactive flavor wheel on homepage
- Stylized origin map
- Search with autocomplete
- Potential: personal taste profile ("beans I've liked" → "your flavor fingerprint")

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (App Router) | Best Claude Code support, team already aligned on this |
| Styling | **Tailwind CSS** | Utility classes feel like design tokens, designer-friendly |
| Data | **JSON files** in repo | No database, no API, no deployment complexity |
| Deployment | **Vercel** | Free tier, built for Next.js, auto-deploys from `main` |
| Visualization (Phase 2+) | TBD | CSS-only in Phase 1, evaluate charting options later |

---

## App Structure

```
src/
  app/
    page.tsx                  # Bean catalog — card grid with filters
    beans/
      [id]/page.tsx           # Bean detail — scores, flavors, origin context
    origins/
      page.tsx                # Origins index
      [country]/page.tsx      # Country detail — editorial + beans from here
    compare/
      page.tsx                # (Phase 2) Side-by-side bean comparison
    layout.tsx                # App shell — nav, footer, theme
  components/
    BeanCard.tsx              # Compact bean preview for the grid
    ScoreBar.tsx              # CSS horizontal bar for a single score
    ScorePanel.tsx            # All scores for a bean, with plain-language labels
    FlavorTags.tsx            # Pill-style flavor descriptor tags
  lib/
    beans.ts                  # Load, query, and filter beans from JSON
    taxonomy.ts               # Load and traverse flavor taxonomy
    similarity.ts             # (Phase 2) Euclidean distance for "beans like this"
  data/
    beans.json                # Full dataset (1,338 beans) — Phase 2
    beans_curated.json        # 20 hand-picked beans — Phase 1 foundation
    flavor_taxonomy.json      # SCA flavor wheel categories and descriptors
    schema.md                 # Data model documentation
```

---

*Design concept by Hassan with Claude Code — April 2026*
