# Review Checklist — Coffee App

Full detail menu. Pull the relevant sections for whatever changed in the PR; don't walk all of it for every review.

## Code conventions
- File is in the correct directory (`src/app/` for pages, `src/components/` for components)
- One component per file
- Client components have `"use client"` at the top
- Imports use `@/` path alias
- TypeScript types are used properly — no `any`, props are typed, data matches `Bean` type from `@/lib/beans`
- Server-side data loading where possible; client-side filtering
- `useLocalStorage` hook used for persisted client state (not raw `localStorage`)
- Diary state accessed through `DiaryProvider` context, not directly

## Design system consistency
- Colors use theme tokens (`cream`, `espresso`, `roast`, `caramel`, `sage`) — no hardcoded hex, no arbitrary Tailwind colors (`blue-500`, `gray-*`)
- Typography follows the system: Inter (body), Georgia (headings)
- **All user-facing text ≥ 1rem (16px).** No `text-xs`, `text-sm`, or sub-16px inline font sizes on labels, chips, meta, or eyebrows.
- Score badges use the correct color treatment (90+ sage, 85+ sage, 80+ caramel)
- Spacing feels consistent with existing components
- No custom CSS files — all styling via Tailwind utilities
- Bag-art and product-image containers use white backgrounds, not `cream-dark` tint boxes
- Illustrations follow `designer/references/illustration-system.md` (warm palette, dashed flow lines, opacity-layered liquids, 120×120 viewBox for icons, water blue `#93C5FD` is illustration-only)

## Accessibility
- Images have meaningful `alt` text (not "image"; empty string for decorative only)
- Interactive elements are keyboard navigable (Tab, Enter/Space)
- Color is not the only way information is conveyed (score badges also have text labels)
- Focus states are visible — `outline-none` requires a replacement ring/outline
- Form inputs have associated labels
- Sufficient color contrast — pay special attention to `roast-light` on `cream`; verify with a contrast tool (4.5:1 minimum for body)
- ARIA attributes used correctly for dynamic content (filters, modals)

## Mobile responsiveness
- Layout works at 320px width
- Touch targets ≥ 44px
- No horizontal scroll on mobile
- Text readable without zooming
- Cards stack properly on narrow screens
- Filters are usable on mobile (drawer/dropdown, not horizontal overflow)

## Copy & tone
- User-facing text matches the brand voice — see `copywriter/references/brand-voice.md`
- Jargon level matches page depth (progressive jargon model)
- Empty states have a suggested action
- Error messages are helpful and blame-free
- No placeholder text left (`Lorem ipsum`, `TODO`, `fix this later`)
- No em-dashes as separators in tasting copy, card subtext, or CTA descriptions (italicized asides `— *like this*` are a specific flag)
- No arrow glyphs after labels (`Why this →`, `Explore →`) — use a colon or drop the glyph; CTA button arrows are fine

## Mockup HTML (hassan-design/)
- Images inlined as base64 data URIs (no relative `src="assets/..."` paths) — the preview panel Hassan reviews doesn't resolve file paths
- Multi-page flows use in-page anchor routing (single file with `<section id="decode">` + JS handler on hash change), not sibling-file `<a href="other.html">` links

## Performance & data
- No unnecessary re-renders (missing `key` props; unstable effect dependencies)
- Large data operations (filtering 1,338 beans) are debounced if triggered by keystrokes
- Images reasonably sized (not full-res photos for thumbnails)
- Loading states exist for async operations (skeleton loaders preferred, per CLAUDE.md)
