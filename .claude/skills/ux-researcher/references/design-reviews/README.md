# Design Review Feedback

Drop exported markdown files from the design review tool here.

## How to generate a review file

1. Open `design-review.html` (in the project root) in your browser
2. Walk through the app screen by screen — open each route alongside the review tool
3. Fill in your feedback: first impressions, heuristic flags, severity, skill routing, detailed notes
4. Click **Export Feedback** — saves a `.md` file named `design-review-{your-name}-{date}.md`
5. Drop that file into this folder

## File naming convention

`design-review-{reviewer-name}-{YYYY-MM-DD}.md`

Examples:
- `design-review-sarah-2026-04-22.md`
- `design-review-marcus-2026-04-23.md`

## What the UX researcher does with these

When you ask the UX researcher to synthesize feedback, it reads all files in this directory and:
- Looks for convergence across reviewers (same heuristic flagged by multiple people = strong signal)
- Cross-references with usability session data and interview transcripts
- Weights severity by reviewer consensus
- Routes findings to the appropriate skill (designer, copywriter, QA, etc.)
