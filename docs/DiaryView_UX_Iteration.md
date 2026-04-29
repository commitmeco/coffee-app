# DiaryView UX Iteration — Presentation Outline

How a UX designer used Claude Code and Figma MCP to go from feature idea to precise implementation — including the wrong turns in between.

---

## Slide 1 — Title

**"Designing with Claude Code: From Idea to Precise Implementation"**

Using the Coffee App diary feature as a case study for how designers can work with Claude Code — when it's fast, where it goes wrong, and how Figma MCP closes the gap.

---

## Slide 2 — Emily's Original Branch

Emily built the diary feature: a clean page with status filter pills (All, Loved, Tried, Want to Try) and a card grid of beans the user had logged. Simple, intentional, functional.

This was the foundation everything else built on.

**Screenshot:** `DiaryView v1 — simple pills, card grid`

---

## Slide 3 — Team Discussion → Feature Request

After reviewing the diary, the team talked about what else they'd want. Two ideas came up clearly:

- A **Map View** to see where your beans come from geographically
- A **Ranking view** to compare them side by side by score

The ask to Claude was direct: add map and ranking views to the diary.

---

## Slide 4 — Claude Implements (Fast)

Claude added the features quickly. A segmented toggle appeared — **Cards / Map / Rank** — and both new views worked. The implementation took minutes.

But there was a problem with where things landed.

**Screenshot:** `DiaryView v2 — Cards/Map/Rank toggle`

---

## Slide 5 — The Wrong Placement

The Ranking option ended up on the **right side** of the controls bar, grouped with the Cards/Map view toggle. This created a confusing interaction: Ranking implied a separate view mode, but it should behave as a filter — and it shouldn't appear at all when you're in Cards or Map view.

**Feedback given:**
> "The ranking pill shouldn't appear when in tabs other than ranking. Ranking should be a pill button, not a separate section."

So Claude was asked to fix it.

---

## Slide 6 — Multiple Iterations Trying to Fix It

This is where it got interesting. The fix wasn't a single clean change:

**Attempt 1:** Moved Ranking into the pill row — but it still toggled incorrectly, showing as active alongside a status filter at the same time.

**Attempt 2:** Tried coordinating the two states — `statusFilter` and `viewMode` were independent variables with no awareness of each other. Selecting Ranking changed `viewMode` but left `statusFilter` still active. Two separate states were fighting over "what's selected."

**Attempt 3:** Discovered the deeper issue — `DiaryRankingView.tsx` had been built as a completely separate component, structurally disconnected from the filter logic in `DiaryView.tsx`. The pill row and the ranking view weren't sharing state; they were parallel systems.

**Root cause in code:**
```tsx
// These two states had no coordination
const [statusFilter, setStatusFilter] = useState<DiaryStatus | "all">("all");
const [viewMode, setViewMode] = useState<ViewMode>("cards");

// Clicking Ranking changed viewMode but not statusFilter —
// so the previous filter pill stayed highlighted
```

Understanding the structure was the unlock. Once it was clear how the components were related (or weren't), the right fix became obvious.

---

## Slide 7 — Bringing Figma Into the Loop

Rather than keep iterating on descriptions, the Figma MCP was brought in. The live diary page was captured into Figma, then edited visually to show exactly the intended layout:

- **Left side:** All / Loved / Tried / Want to Try / Ranking — all as a single pill group
- **Right side:** Cards / Map segmented toggle only

Ranking is a filter-type action. Cards/Map is a view-type action. Grouping them separately made the intent unambiguous.

Claude was then given the Figma node link and asked to implement from it. `get_design_context` returned the authoritative layout spec. One round of implementation. Correct result.

**Figma reference:** `node-id=85:2` — [coffee-app Figma file](https://www.figma.com/design/SKbIVjSm5cGdQTSo0kIrWh/coffee-app?node-id=85-2)

---

## Slide 8 — Final Version

The corrected implementation:

- All pills (status + Ranking) are a single mutually exclusive group on the left
- Selecting any pill deselects the others
- Cards/Map toggle sits on the right as a separate concern
- Ranking view only appears when the Ranking pill is active

**Screenshot:** `DiaryView v4 — Emily's final improvements`

**Fix that made it work:**
```tsx
// Clicking a status filter also resets viewMode
onClick={() => { setStatusFilter(opt.value); setViewMode("cards"); }}

// Active highlight only applies when not in ranking mode
statusFilter === opt.value && viewMode !== "ranking"
  ? opt.activeClass
  : "bg-white text-espresso-light ..."
```

---

## Slide 9 — Reflection

**Claude is fast at turning ideas into working prototypes.**
Map view and ranking were in the app within minutes of asking. That speed is real.

**But Claude does exactly what you ask — including the wrong thing.**
The Ranking pill ended up in the wrong place not because Claude made an error, but because the ask was ambiguous. Precision in the request matters more than you'd think.

**Figma MCP closes the loop between design intent and implementation.**
When words aren't enough, Figma gives Claude something concrete to build from — and gives you something concrete to edit. It's the clearest feedback channel we found.

**Knowing how the code is structured still matters.**
The multi-iteration fix only resolved once the architecture was understood — two independent state variables, a separate component, no shared source of truth. You don't have to write the code yourself, but understanding the structure helps you diagnose faster.

**This could get smoother with standardization.**
Developer-authored skills, clearer component conventions, and shared data patterns (like a single `STATUS_OPTIONS` constant) would reduce the back-and-forth. The building blocks are there — they just need more consistency baked in.

---

## Technical Reference

**Files touched:**
```
src/components/DiaryView.tsx        ← main view, pills, state
src/components/DiaryControls.tsx    ← existing pill pattern to match
src/components/DiaryRankingView.tsx ← ranking drag UI (separate component)
src/lib/diary.ts                    ← DiaryStatus type definitions
src/lib/useLocalStorage.ts          ← persisted rankings storage
```

**Key commits:**
- `bb7dc9d` — v1: simple status pills, card grid
- `a5925a5` — v2: Cards/Map/Rank toggle added
- `fc21d26` — v4: Emily's final UI (icons, correct pill grouping)
