# ☕ Coffee App

A community-driven app to help people discover, learn about, and enjoy coffee beans from around the world.

## What is this?

Coffee App helps people:
- **Discover** beans by origin, roast, and flavor profile
- **Learn** brewing methods matched to different beans
- **Track** what they've tried and what they loved
- **Share** recommendations with friends

## Built with Claude Code

This project is an example of **human + AI collaboration** — not siloed roles, but coworking. Designers, researchers, and Claude Code working together in the same repo, iterating in real time.

## Status: Phase 2 — Personalization (in progress)

We went with **Option B (Modern Web App)** from [Hassan's build proposal](docs/PROPOSAL.md) — Next.js + Tailwind + JSON data. Here's what's live:

### Phase 1 — Foundation ✅
- **Bean catalog** — Browse all 1,338 beans in a searchable, filterable grid
- **Search** — Find beans by country, region, variety, farm, or processing method
- **Filters** — Narrow by country, processing method, or minimum cupping score with removable filter pills
- **Sorting** — By score (high/low), country A–Z, or altitude
- **Bean detail pages** — Full info, radar chart, score breakdowns with hover tooltips, similar bean recommendations
- **Design system** — Coffee-inspired palette, responsive layout, clean typography

### Phase 2 — UX & Diary ✅
- **Redesigned homepage** — Hero section with catalog stats, "Start Exploring" CTA, and an About section
- **Editor's Picks** — Horizontally scrollable featured beans carousel from the curated dataset
- **Coffee Diary** — Personal tasting journal at `/diary` to track beans as Tried, Loved, or Want to Try
- **Diary controls on bean pages** — Mark any bean's status and add personal tasting notes
- **Diary badge** — Navbar shows a live count of diary entries
- **Active filter pills** — Removable tags showing which filters are applied, with a "Clear all" option
- **Navbar search** — Expandable search input in the nav bar (desktop + mobile)
- **Mobile navigation** — Hamburger menu with animated open/close transitions
- **Skeleton loading states** — Placeholder UI while diary data hydrates from localStorage

### Why Option B?

Hassan laid out four solid options in the proposal. We picked B because:
1. **Claude Code is strongest with React/Next.js** — and that matters when none of us are developers
2. **It scales into Phase 2 and 3** without needing to rebuild
3. **The work divides cleanly** — 5–6 pieces people can own independently
4. **Massive ecosystem** — easy to Google your way out of problems

See the full breakdown in [docs/PROPOSAL.md](docs/PROPOSAL.md).

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Data | JSON files in `src/data/` — no database needed yet |
| Language | TypeScript |
| Deployment | Vercel (planned) |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ installed

### Run locally
```bash
git clone <repo-url>
cd coffee-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the bean catalog.

### Other commands
```bash
npm run build   # Production build (generates all 1,338+ pages)
npm run lint    # Run the linter
```

## Project Structure

```
coffee-app/
├── CLAUDE.md               # Guidelines for Claude Code (read this first)
├── docs/
│   ├── VISION.md           # Product vision, principles, roadmap
│   ├── PROPOSAL.md         # Hassan's build proposal (4 options)
│   ├── Kickoff_Guide.md    # First team meeting agenda
│   └── First_Run_Guide.md  # How to collaborate with Claude Code
├── src/
│   ├── app/                # Next.js pages (App Router)
│   │   ├── layout.tsx      # Root layout — DiaryProvider + Navbar + Footer
│   │   ├── page.tsx        # Homepage — hero, featured beans, catalog
│   │   ├── beans/[id]/     # Bean detail pages (1,338 routes)
│   │   └── diary/          # Personal coffee diary page
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Sticky nav with search, diary badge, mobile menu
│   │   ├── Footer.tsx
│   │   ├── BeanCard.tsx
│   │   ├── BeanCatalog.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Filters.tsx
│   │   ├── ActiveFilters.tsx   # Removable filter pills
│   │   ├── FeaturedBeans.tsx   # Editor's Picks carousel
│   │   ├── ScoreRadar.tsx
│   │   ├── DiaryProvider.tsx   # React context for diary state
│   │   ├── DiaryControls.tsx   # Tried/Loved/Want to Try buttons + notes
│   │   └── DiaryView.tsx       # Diary page content with status filtering
│   ├── data/               # Bean data and models
│   │   ├── beans.json      # Full dataset (1,338 beans from CQI)
│   │   ├── beans_curated.json  # 20 hand-picked standout beans
│   │   ├── flavor_taxonomy.json # SCA Flavor Wheel vocabulary
│   │   └── schema.md       # Documents the bean data model
│   └── lib/                # Utility functions and types
│       ├── beans.ts        # Bean types, loading, filtering, scoring
│       ├── diary.ts        # Diary types (DiaryEntry, DiaryStatus, DiaryMap)
│       └── useLocalStorage.ts  # SSR-safe localStorage hook with hydration
├── public/                 # Static assets (images, icons)
└── tests/                  # Test files
```

## What's Next

### Phase 2 — Personalization (remaining)
- [ ] Taste profile quiz
- [x] Personal bean journal (tried / loved / want to try)
- [ ] Recommendations based on preferences

### Phase 3 — Community
- [ ] User reviews and ratings
- [ ] Shared lists and recommendations
- [ ] Brewing guides paired with beans

See [docs/VISION.md](docs/VISION.md) for the full roadmap.

## Data

All bean data comes from the [Coffee Quality Institute](https://github.com/jldbc/coffee-quality-database) (MIT License), scored using the SCA cupping protocol. The flavor taxonomy is based on the SCA Flavor Wheel and WCR Sensory Lexicon.

## Contributing

This is a collaborative project. Whether you're a designer, researcher, or just a coffee lover — open an issue, suggest a feature, or pair with Claude Code to build something.

**Before you start:** Read [CLAUDE.md](CLAUDE.md) for project conventions and [docs/First_Run_Guide.md](docs/First_Run_Guide.md) for how we work together.

### Branch naming
```
your-name/feature-name
```

### PR workflow
At least one teammate reviews before merging to `main`.

## License

MIT
