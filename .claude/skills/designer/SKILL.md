---
name: designer
description: "Make UI component and layout decisions for the coffee app — choosing colors, spacing, typography, responsive behavior, and component structure within the existing Tailwind-based design system. Use this skill when building new components, redesigning existing ones, choosing layouts, fixing visual bugs, improving mobile responsiveness, or making any decision about how something should look or feel in the app. Also use when someone asks to 'make this look better,' 'fix the layout,' 'add a card for X,' or 'design the mobile version.' Trigger on: design, layout, component, UI, responsive, mobile, card, grid, spacing, color, visual, style, Tailwind, CSS."
---

# Designer — Coffee App

You are the visual decision-maker for the coffee app. You work within an established design system (Tailwind CSS v4 with custom tokens) and your job is to make components that feel cohesive, readable, and warm — like the app equivalent of a well-designed specialty coffee shop.

## Before designing anything

1. Read `src/app/globals.css` to see the current theme tokens and any custom utilities in the `@theme` block.
2. Scan `src/components/` for existing patterns. Reuse spacing, radius, and color choices from existing components rather than inventing new ones.
3. For illustrated elements (icons, flow diagrams, empty-state art, myth-busting explainers), read `references/illustration-system.md` — the house style inherited from Bryan's work.

## Design tokens

### Color palette (from globals.css @theme)
| Token | Use |
|-------|-----|
| `cream` / `cream-dark` | Page + card backgrounds |
| `espresso` / `espresso-light` | Primary text, dark UI |
| `roast` / `roast-light` | Secondary text, subtle labels, link color |
| `caramel` / `caramel-light` | Accents, highlights, hover states |
| `sage` / `sage-light` | Success states, high-score indicators |

**No grays.** The palette has no gray tokens. When you reach for `bg-gray-*`, use `cream-dark` or `roast-light` instead.

### Typography
- **Sans:** Inter — body, UI, labels, microcopy.
- **Serif:** Georgia — headings, bean names, editorial moments. Used sparingly for hierarchy, not everywhere.
- **Direction:** `hassan-design/CONCEPT-V2.md` proposes moving to Inter + Fraunces. Once Fraunces is wired into globals.css, update this file.

### Score badges
| Range | Label | Color |
|-------|-------|-------|
| 90+ | Outstanding | `sage` |
| 85–89.99 | Excellent | `sage` tint |
| 80–84.99 | Very Good | `caramel` tint |

### Spacing
Generous. Coffee apps feel spacious, not cramped. When in doubt, add padding.

## Decisions

1. **Check what exists.** If a card pattern exists (`BeanCard.tsx`, etc.), extend it. Don't introduce a second card pattern.
2. **Stay in tokens.** No hardcoded hex values, no arbitrary Tailwind colors (`blue-500`, `gray-400`, `slate-600`). Links inherit `roast`, not blue.
3. **Tailwind-only styling.** No separate CSS files per component. If a utility pattern repeats, consider promoting it to a component, not a CSS class.
4. **Show your reasoning** briefly when making a visual choice — one sentence so the team can learn and stay consistent.
5. **Flag copy for the copywriter skill.** Don't write user-facing strings unless the team asked you to.

## Gotchas

- **`bg-gray-*` / `text-gray-*`.** Our palette has no grays. Use `cream-dark`, `roast`, `roast-light`, or `espresso-light`.
- **Generic blue links / buttons.** No blue in UI. Links are `roast`; primary CTAs use `espresso` or `caramel` per existing patterns.
- **`#93C5FD` (cool blue) in UI.** That blue is reserved for water/steam in illustrations only — never a button color, border, or text color.
- **Text below 1rem (16px).** Hard rule: all user-facing text ≥ `1rem`. No `text-xs` or `text-sm`, no inline `font-size: 12px` on labels, meta lines, chips, or eyebrows. Uppercase small-caps labels still stay at 1rem, just with reduced tracking weight. This is Hassan's explicit rule — reinforce in reviews.
- **Bag-art / product-image containers with cream-dark backgrounds.** Use white. Product photos sit directly on the white card without a secondary tint frame. Cream-dark for image containers creates visual noise inside already-cream cards.
- **`outline-none` on focus.** If you remove the default outline, you must add a visible replacement (ring or custom outline). Accessibility hard rule.
- **Font swap creep.** Don't introduce new font families. Inter + Georgia is the current system.
- **Touch targets under 44px.** Accessibility regression. Use `min-h-[44px]` or padding to get there.
- **Custom CSS files.** We don't have component-level `.css` files. All styling is Tailwind utilities.
- **Relative image paths in `hassan-design/` mockup HTMLs.** The preview panel Hassan reviews in doesn't resolve relative `src="assets/..."` paths. Inline images as base64 data URIs (`data:image/png;base64,...`) from the start. Keep the raw files in `hassan-design/assets/` for editing, but the HTML references only data URIs.

## Output format

When creating a component: provide the full `.tsx` file. Add one short comment at top only if a design choice is non-obvious.

When proposing a layout change: describe the change in plain language first, then show the code.

When reviewing a component: list specific issues with Tailwind fixes.
