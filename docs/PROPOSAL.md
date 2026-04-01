# Coffee App — Build Proposal

> **For the team to review.** Read through the three options below and come ready to discuss which direction feels right. There's no wrong answer — each option trades off simplicity vs. flexibility.

## Quick Recap

We're building a coffee discovery web app together. None of us are developers — we're designers and researchers using Claude Code to do the building. The goal is to ship something real while learning how to collaborate in a codebase.

This doc proposes **three ways we could build this**, from simplest to most flexible. Each option includes:
- What we'd build with
- How we'd work together
- How we'd divide the work
- Pros and cons

---

## Option A: The Simple Site

**Philosophy:** Keep it as close to plain HTML/CSS as possible. Minimal tooling, minimal things to learn.

### Stack
| Layer | Choice |
|-------|--------|
| Framework | **Astro** — generates a fast static site, lets you write mostly HTML with sprinkles of interactivity |
| Styling | **Plain CSS** with a shared stylesheet |
| Data | **Markdown files** — one `.md` file per bean, like writing a blog post |
| Deployment | **Netlify** — free, auto-deploys from `main` |

### How we'd work
- Each person owns a section of the site
- Simple branching: `your-name/what-youre-doing`
- Pull Requests for merging, but reviews are optional given the low complexity

### Work breakdown
| Person | Piece |
|--------|-------|
| 1 | Site layout, navigation, homepage |
| 2 | Bean markdown files + data structure |
| 3 | Bean listing page (grid of cards) |
| 4 | Individual bean detail pages |
| 5 | Search/filter functionality |
| 6 | Brewing guides section |

### Pros
- Lowest learning curve — markdown is basically writing a document
- Very fast site (static HTML)
- Fewer things that can break

### Cons
- Limited interactivity (filtering, search feel clunkier)
- Harder to add features like a taste quiz or personal journal later
- Astro is less well-known, so fewer resources if you get stuck

---

## Option B: The Modern Web App

**Philosophy:** Use the most popular tools so Claude Code can help us the most, and so we can add real features over time.

### Stack
| Layer | Choice |
|-------|--------|
| Framework | **Next.js** (React) — the most widely used web framework, Claude Code knows it deeply |
| Styling | **Tailwind CSS** — utility classes that feel like design tokens |
| Data | **JSON files** in the repo — structured data, no database needed yet |
| Deployment | **Vercel** — free tier, built specifically for Next.js, auto-deploys from `main` |

### How we'd work
- Each person owns a feature area
- Branch naming: `your-name/feature-name`
- Pull Requests required — at least one teammate reviews before merging
- A shared `CLAUDE.md` file so Claude Code gives everyone consistent help

### Work breakdown
| Person | Piece |
|--------|-------|
| 1 | Layout & design system — nav, footer, colors, typography (`layout.tsx`, `tailwind.config.ts`) |
| 2 | Bean data model — define the schema + populate initial beans (`src/data/`) |
| 3 | Bean catalog page — the main browsable grid (`src/app/page.tsx`, `BeanCard.tsx`) |
| 4 | Bean detail pages — individual bean view with full info (`src/app/beans/[id]/page.tsx`) |
| 5 | Search & filtering — filter by origin, roast, flavor (`SearchBar.tsx`, `Filters.tsx`) |
| 6 | Brewing guides — method pages linked from beans (stretch goal) |

### Pros
- Best Claude Code support — React/Next.js is what it knows best
- Scales naturally into Phase 2 (personalization) and Phase 3 (community)
- Massive ecosystem — if you Google a problem, you'll find an answer
- Tailwind is designer-friendly

### Cons
- More concepts to wrap your head around (components, props, JSX)
- `npm install` and Node.js tooling can feel intimidating at first
- Slightly more things that can go wrong during setup

---

## Option C: The Lightweight Full-Stack App

**Philosophy:** Use a minimal, all-in-one framework that keeps things simple but gives us a real backend too — so we can add user accounts and saved favorites without bolting on extra services later.

### Stack
| Layer | Choice |
|-------|--------|
| Framework | **SvelteKit** — simpler syntax than React, feels closer to writing HTML. Full-stack (pages + API) in one |
| Styling | **Tailwind CSS** — same designer-friendly utility classes as Option B |
| Data | **SQLite via Turso** — a tiny database that lives in the cloud, free tier, no server to manage |
| Deployment | **Vercel** or **Cloudflare Pages** — free, auto-deploys from `main` |

### How we'd work
- Same Git workflow as Option B — branches, PRs, reviews
- Each person owns a feature area
- Shared `CLAUDE.md` for consistent Claude Code help

### Work breakdown
| Person | Piece |
|--------|-------|
| 1 | Layout & design system — nav, footer, colors, typography |
| 2 | Bean data model — define the database schema + seed initial beans |
| 3 | Bean catalog page — browsable grid with cards |
| 4 | Bean detail pages — individual bean view with full info |
| 5 | Search & filtering — filter by origin, roast, flavor |
| 6 | Brewing guides — method pages linked from beans (stretch goal) |

### Pros
- Svelte syntax is simpler than React — closer to plain HTML/CSS/JS
- Built-in backend means we can add user accounts, favorites, reviews without extra tools
- Real database from the start — better foundation for Phase 2 and 3
- Claude Code has strong Svelte/SvelteKit support

### Cons
- Smaller community than React/Next.js — fewer tutorials and Stack Overflow answers
- Database adds a concept to learn (SQL, migrations), even if it's simple
- Slightly more setup than JSON files
- Team can't as easily Google their way out of problems

---

## Option D: The Two-Part App (Separate Frontend + Backend)

**Philosophy:** Keep the frontend and backend as two distinct, simple pieces. Each part is easy to understand on its own, and the clean separation mirrors how many real-world apps are built.

### Stack
| Layer | Choice |
|-------|--------|
| Frontend | **Vite + React** — Vite is a fast build tool, React handles the UI |
| Backend | **Hono** — a tiny, modern API server (simpler than Express) |
| Styling | **Tailwind CSS** — same as Options B and C |
| Data | **SQLite via better-sqlite3** — a database that's just a file, no cloud service needed |
| Deployment | **Vercel** (frontend) + **Railway or Render** (backend) — both have free tiers |

### How we'd work
- Same Git workflow — branches, PRs, reviews
- The repo has two folders: `frontend/` and `backend/`
- Some people work on the frontend (pages, components), others on the backend (API, data)
- A shared `CLAUDE.md` for consistent Claude Code help

### Work breakdown
| Person | Piece | Side |
|--------|-------|------|
| 1 | Layout & design system — nav, footer, colors, typography | Frontend |
| 2 | Bean API — endpoints to list, search, and get bean details | Backend |
| 3 | Bean catalog page — browsable grid that fetches from the API | Frontend |
| 4 | Bean detail pages — individual bean view | Frontend |
| 5 | Search & filtering — API query support + frontend filter UI | Both |
| 6 | Database setup — schema, seed data, brewing guides data | Backend |

### Pros
- Clear separation — frontend people and backend people don't step on each other
- Each piece is simple and focused (a Vite app is just a Vite app, the API is just an API)
- Mirrors real-world architecture — good learning experience
- React frontend means strong Claude Code support

### Cons
- **Two things to run** during development (`npm run dev` in both folders)
- **Two things to deploy** (frontend and backend hosted separately)
- More setup and wiring — the frontend needs to know where the API lives
- Highest complexity of all four options for a non-dev team
- If something breaks between the two parts, debugging is harder

---

## Comparison at a Glance

| | **A: Simple Site** | **B: Modern Web App** | **C: Lightweight Full-Stack** | **D: Two-Part App** |
|---|---|---|---|---|
| Learning curve | Lowest | Medium | Medium | Highest |
| Claude Code support | Good | Best | Strong | Strong (React side) |
| Design flexibility | Medium | High | High | High |
| Future feature growth | Limited | Strong | Strongest | Strong |
| GitHub collaboration | Light | Full | Full | Full |
| Time to first deploy | ~1 hour | ~1 hour | ~1-2 hours | ~2 hours |
| Team skill building | Some | Strong | Strong | Strongest (frontend + backend + API + database) |
| Things to run/deploy | 1 | 1 | 1 | 2 |

---

## My Recommendation

**Option B (Modern Web App)** is the sweet spot for this team. Here's why:

1. **Claude Code is your superpower** — and it's strongest with React/Next.js. This matters a lot when nobody on the team has a coding background.
2. **You actually want to ship something real** — Next.js grows with you into Phase 2 and 3 without needing to rebuild.
3. **The work divides cleanly** — 5-6 clear pieces that people can own independently.
4. **The Git workflow is worth learning** — branching, PRs, and code review are skills that transfer to any future project.

That said, Option A is totally valid if the team feels intimidated by React, Option C is worth it if the team wants a simpler syntax with built-in backend, and Option D is the most educational but also the most complex to manage.

---

## Next Steps (once we pick a direction)

1. One person does the initial project setup (I can help with this)
2. Connect deployment so we have a live URL from day one
3. Everyone clones the repo and runs it locally
4. Pick your piece and start building on a branch

---

*Proposal drafted by Hassan with Claude Code — April 2026*
