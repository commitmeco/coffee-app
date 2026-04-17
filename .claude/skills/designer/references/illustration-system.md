# Illustration System — Coffee App

The house style inherited from Bryan's work on brew-method illustrations. Every illustration in the product should feel like it came from the same family — same pens, same ink.

## Palette
Warm earthy only. No neons, no grays.

| Use | Token / Value |
|-----|--------------|
| Base / canvas | `cream` (#FFF8F0), `cream-dark` (#F5EDE3) |
| Dark strokes, espresso | `espresso` (#2C1810), `espresso-light` (#4A3228) |
| Warm structural | `roast` (#6B3A2A), `roast-light` (#8B5E3C) |
| Accent, highlight, honey tones | `caramel` (#C4813D), `caramel-light` (#D4A574), `honey` (#E8B960) |
| Success, plant, leaf | `sage` (#7A8B6F) |
| **Water / steam ONLY** | `water` (#93C5FD) |

**The water blue is illustration-only.** Never use `#93C5FD` for UI — not buttons, not borders, not text.

## Construction

- **ViewBox:** 120×120 for icons and small diagrams. Larger compositions scale up proportionally.
- **Stroke weight:** 1.5–2.5px. No hairline strokes; no thick heavy strokes.
- **Corners:** Rounded. No hard 90° corners on shapes.
- **Geometry:** Built from simple shapes (circles, rounded rects, arcs, curves). Hand-feeling, not vector-perfect.

## Motion & flow

- **Dashed lines** for anything implying motion or flow: water streams, filter channels, vapor paths, process steps. Use a consistent dash array (e.g., `stroke-dasharray="4 4"` or `6 3`).
- **Opacity-layered liquids.** Coffee in glass, water in carafe: fill at 0.3–0.4 opacity to suggest transparency and volume. Layer fills where liquids overlap.
- **Steam:** dashed curves rising from vessel, `water` color, low opacity.

## What not to do

- No photorealism or gradients that try to look real.
- No drop shadows on illustrations (shadows belong on UI cards, not on illustrated shapes).
- No cool grays, no slate, no pure black. Darkest line is `espresso`.
- No sterile geometric perfection — the illustrations should feel drawn by a person.
- No emoji substitutes for illustrations. Illustrated means actually illustrated.

## Use contexts

- **Brew method icons** (pour-over, espresso, French press, etc.) — 120×120 viewBox, consistent visual weight across set.
- **Flow diagrams** for depth moments and onboarding.
- **Myth-busting explainers** — paired with wedge copy; see copywriter skill's `references/brand-voice.md` § Myth-Busting.
- **Empty states** — illustration + invitational copy + CTA.

Reference implementations live in `hassan-design/BrewingCarousel.reference.tsx` and `hassan-design/concept-moments.html`.
