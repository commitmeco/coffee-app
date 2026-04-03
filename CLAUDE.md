# Coffee App — Claude Code Guidelines

## Project Overview
A coffee discovery web app built with Next.js 15, Tailwind CSS v4, and TypeScript. We're a team of designers and researchers using Claude Code to build collaboratively.

## Tech Stack (Option B)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 with custom coffee-themed colors
- **Data:** JSON files in `src/data/` — no database yet
- **Language:** TypeScript
- **Deployment:** Vercel (planned)

## Project Structure
```
src/
├── app/              # Next.js pages (App Router)
│   ├── layout.tsx    # Root layout with Navbar + Footer
│   ├── page.tsx      # Homepage / bean catalog
│   └── beans/[id]/   # Bean detail pages
├── components/       # Reusable UI components
├── data/             # JSON data files (beans, flavors)
└── lib/              # Utility functions and types
```

## Key Files
- `src/lib/beans.ts` — Bean type definitions, data loading, filtering logic
- `src/data/beans.json` — Full dataset (1,338 beans from CQI)
- `src/data/beans_curated.json` — 20 hand-picked beans for demos
- `src/data/flavor_taxonomy.json` — SCA Flavor Wheel vocabulary
- `src/data/schema.md` — Documents the bean data model

## Design System
- **Colors:** Coffee-inspired palette defined in `globals.css` via `@theme`
  - `cream` / `cream-dark` — backgrounds
  - `espresso` / `espresso-light` — text and dark UI
  - `roast` / `roast-light` — secondary text
  - `caramel` / `caramel-light` — accents and highlights
  - `sage` / `sage-light` — success / score indicators
- **Typography:** Inter (sans), Georgia (serif for headings)
- **Score badges:** Outstanding (90+) = green, Excellent (85+) = sage, Very Good (80+) = caramel

## Conventions
- Use the App Router (`src/app/`) for all pages
- Components go in `src/components/` — one component per file
- Client components must have `"use client"` at the top
- Use `@/` path alias for imports (e.g., `@/lib/beans`)
- Tailwind utility classes for all styling — no separate CSS files per component
- Bean data is loaded server-side where possible; filtering happens client-side

## Common Tasks
- **Add a new page:** Create `src/app/your-page/page.tsx`
- **Add a component:** Create `src/components/YourComponent.tsx`
- **Modify bean data:** Edit `src/data/beans.json` or `src/data/beans_curated.json`
- **Update the theme:** Edit the `@theme` block in `src/app/globals.css`

## Running Locally
```bash
npm install
npm run dev     # starts on http://localhost:3000
npm run build   # production build
```
