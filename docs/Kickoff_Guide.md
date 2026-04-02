# Coffee App — Kickoff Meeting Guide

**For the first team meeting**

---

## Before the Meeting

Everyone should do these before we meet:

- [ ] Clone the repo
- [ ] Read `docs/VISION.md` — the product direction in 2 minutes
- [ ] Skim `docs/First_Run_Guide.md` — how we collaborate with Claude
- [ ] Think about one thing you're excited to build or explore

That's it. No other prep needed.

## Meeting Agenda

Aim for 45–60 minutes. Keep it conversational.

### 1. Intros and Context (10 min)

Go around and share:
- Your name and what you do
- Your relationship with coffee (casual drinker? home barista? industry?)
- One app or product you think gets the "helpful without being overwhelming" feeling right

This isn't small talk — it sets the tone for what we're building.

### 2. Walk Through the Vision (10 min)

Review `docs/VISION.md` together. Focus on:
- **Do the core principles resonate?** Approachable over exhaustive, personal over generic, community-driven, beautiful and tactile.
- **Does the phased roadmap make sense?** Foundation → Personalization → Community.
- **What's missing?** Any obvious gaps in the plan?

Don't try to solve everything — just flag what feels right and what feels off.

### 3. Decide What We're Building First (15 min)

Phase 1 from the vision:
- Bean catalog with origin, roast, and flavor profiles
- Basic search and filtering
- Bean detail pages

Discuss and decide:
- **Which piece do we start with?** (Recommendation: the bean data model and a simple catalog page — everything else builds on that.)
- **What does "good enough for v1" look like?** How many beans? How detailed? How polished?
- **Who gravitates toward what?** Let people lean into what interests them — design, data, UI, content.

### 4. Resolve the Open Questions (10 min)

From the vision doc — make a call or table each one:

| Question | Options to Discuss |
|----------|-------------------|
| Tech stack? | The vision leans web-first. React/Next.js? Something simpler? Does anyone have strong preferences? |
| Bean sourcing / purchasing? | Do we link to where you can buy beans, or keep it purely informational for now? |
| Brewing guides depth? | Quick tips per bean, or full standalone guides? |

You don't need perfect answers. "Let's start with X and revisit" is a valid decision.

### 5. How We Work Together (5 min)

Quick alignment on workflow:
- **Everyone collaborates with Claude directly.** Not just engineers. Designers, content people, everyone. Read the First Run Guide for how.
- **No siloed roles.** If you have an idea, prototype it — Claude can help regardless of your technical background.
- **Work in the open.** Commit early, share rough work, give feedback in the repo.
- **Decisions go in `docs/`.** If we agree on something important, write it down.

### 6. Pick Your First Task (5 min)

Before the meeting ends, everyone picks one thing they'll do this week:

| Example Tasks | Who It's For |
|--------------|-------------|
| Define the bean data model (what fields does a bean have?) | Anyone who knows coffee |
| Set up the project with the chosen tech stack | Someone comfortable with tooling |
| Design a rough bean card layout (sketch or wireframe) | Anyone with design instincts |
| Curate a starter set of 10–20 beans with real data | The coffee nerd on the team |
| Write a CONTRIBUTING.md so new people can onboard | Anyone who likes docs |

Pick something small enough to finish in a few sessions. The goal is momentum, not perfection.

## After the Meeting

- [ ] Someone captures the decisions made and adds them to `docs/`
- [ ] Everyone starts their first task within 48 hours — don't let the energy fade
- [ ] Share progress in the repo, not in side channels — keep everything visible
- [ ] Schedule a short check-in for next week

## One Last Thing

This project is intentionally early. Empty folders are an invitation, not a problem. The best way to figure out what Coffee App should be is to start building it — together, with Claude, in the open.

Let's go.
