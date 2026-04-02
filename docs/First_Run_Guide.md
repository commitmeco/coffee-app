# Coffee App — First Run: How We Work Together

**A collaboration guide for the team**

---

## Welcome to Coffee App

This document is your guide to collaborating on Coffee App — not just the code, but the way we work. We're building this project as a team alongside Claude, treating AI as a genuine collaborator rather than a tool we occasionally consult.

The goal is simple: ship a great product faster by combining human creativity, domain knowledge, and taste with Claude's ability to research, draft, build, and iterate at speed.

## What We're Building

Coffee App is a community-driven platform that helps people discover, learn about, and enjoy coffee beans from around the world. It's designed to feel like a knowledgeable friend — approachable, personal, and never snobby.

We're in the early skeleton phase. The repo has structure but most directories are empty, which means there's a lot of room to shape things. For full product context, read `docs/VISION.md` in the repo.

## Our Collaboration Model

Think of Claude as a team member who's always available, brings no ego, and is happy to do the unglamorous work. Here's how we divide effort:

### What You Bring

- **Product vision and taste** — what feels right, what the user actually needs
- **Design decisions** — visual direction, UX judgment calls, brand sensibility
- **Domain expertise** — coffee knowledge, community insight, market awareness
- **Final call** — you always have the last word on what ships

### What Claude Brings

- **Rapid prototyping** — turning ideas into working code quickly
- **Research and synthesis** — gathering information, summarizing options, comparing approaches
- **Drafting** — first passes on copy, documentation, specs, and tests
- **Refactoring and cleanup** — restructuring code, improving consistency, catching issues
- **Repetitive tasks** — generating data, writing boilerplate, formatting documents

## The Daily Workflow

Here's the typical rhythm of a working session:

1. **Start with intent** — Tell Claude what you want to accomplish in plain language. Be specific about the outcome you want, but don't worry about specifying every technical detail.
2. **Review the approach** — Claude will often suggest a plan or ask clarifying questions before diving in. Take a moment to confirm the direction — it saves rework.
3. **Iterate together** — Review what Claude produces. Give feedback like you would to any teammate: "this is close but the tone is off" or "can we try a different layout?"
4. **Finalize and commit** — Once you're happy, commit the work. Claude can help write the commit message too.

> **Tip:** You don't need to write perfect prompts. Start with what's in your head, even if it's rough. Claude will ask for what it needs.

## Getting the Best Results

A few patterns that make collaboration smoother:

### Be Specific About What "Done" Looks Like

Instead of "build the bean catalog," try "create a bean catalog page that shows origin, roast level, and flavor notes in a card layout. Each card should link to a detail page." The more concrete your vision, the closer the first draft lands.

### Share Context Generously

Claude doesn't know what happened in your last meeting or what the stakeholder said over lunch. If there's context that matters — a design direction, a constraint, a preference — share it upfront. You can point Claude to files in the repo, paste in notes, or just explain in your own words.

### Give Feedback, Not Just Approvals

When something isn't quite right, say why. "This feels too technical for our audience" is more useful than "try again." Claude gets better at matching your expectations when it understands your reasoning.

### Break Big Work into Sessions

Rather than asking for an entire feature in one go, break it into meaningful chunks: data model first, then the UI, then the tests. Each session builds on the last and gives you natural checkpoints to steer.

> **Tip:** Claude has access to the full repo. You can say "look at how we structured the components folder" and it will understand the patterns already in place.

## What to Delegate (and What Not To)

### Great Tasks for Claude

- Scaffolding new components, pages, or modules from a description
- Writing tests for existing code
- Drafting documentation, READMEs, or inline comments
- Researching library options and summarizing trade-offs
- Refactoring code for clarity or consistency
- Creating data fixtures or mock data
- Generating configuration files or boilerplate

### Keep These Human

- **Final design sign-off** — does it feel right?
- **Product prioritization** — what should we build next?
- **User research interpretation** — what are people really saying?
- **Brand and voice decisions** — what's our personality?

## Example Prompts to Get Started

Here are real prompts you might use on this project:

| Task | Example Prompt |
|------|---------------|
| New feature | "Create a BeanCard component that displays the bean's name, origin, roast level, and a short description. Use the style patterns from our existing components." |
| Research | "What are the best React libraries for filtering and search? Compare 3 options with pros and cons for our use case." |
| Documentation | "Write a CONTRIBUTING.md that explains our folder structure, how to run the app, and our conventions for naming components." |
| Refactor | "Look at the data models in src/data and suggest a cleaner structure. Show me what the refactored version would look like." |
| Testing | "Write unit tests for the BeanCard component. Cover the main rendering states and edge cases like missing data." |
| Copy | "Draft the onboarding text for the taste profile quiz. Keep it friendly, casual, and under 50 words per screen." |

## Repo Quick Reference

Here's where things live so you can point Claude (and each other) to the right place:

| Path | What's There |
|------|-------------|
| `docs/VISION.md` | Product vision, principles, and planned phases |
| `src/app/` | Main application code (empty — ready to build) |
| `src/components/` | Shared UI components |
| `src/data/` | Bean data and models |
| `public/` | Static assets (images, icons) |
| `tests/` | Test files |

## Ground Rules

A few principles to keep our collaboration healthy:

- **Always review before committing.** Claude is fast but not infallible. Read what it produces before it goes into main.
- **Keep Claude in the loop.** If you make manual changes, mention them in your next session so Claude stays current on the state of the code.
- **Experiment freely.** The repo is early-stage. Try things, break things, revert if needed. Claude can help you recover from any mess.
- **Document decisions.** When you and Claude make a significant choice (tech stack, architecture pattern, design direction), capture it in the `docs/` folder so the whole team has context.
- **Share what works.** If you find a prompting pattern or workflow that clicks, share it with the team. We'll evolve this document as we learn.

## Let's Build Something Great

The project is early, the folders are mostly empty, and that's exactly the exciting part. You have a collaborator who's ready to help whenever you are.

Open the repo, pick a task from `VISION.md`, and start a conversation. The first run starts now.
