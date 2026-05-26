# Atomity Frontend Engineering Challenge

**Repository:** https://github.com/M4sayev/atomity/tree/main/atomity-challenge  
**Live demo:** https://atomity-seven.vercel.app/

## Feature Choice

Option B — the vertical bar chart section shown between 0:45–0:55.

The segment showed a performance or cost breakdown across categories rendered as vertical bars. Rather than replicating it literally, I reframed it as a live infrastructure efficiency dashboard: each bar represents a monitored workload cluster, colored by optimization level (high / mid / low / critical), with animated entrance and a mobile-responsive axis flip.

---

## Animation Approach

Animations are scroll-triggered using Framer Motion's `whileInView` with `viewport={{ once: true }}`, so they fire exactly once as the user scrolls down — not on load.

**Stagger:** Each bar delays by `index * 0.08s`, creating a left-to-right cascade rather than everything appearing simultaneously.

**Bar fill:** Uses a `height` animation on desktop (bottom-to-top growth) and a `width` animation on mobile (left-to-right), detected via a `useMediaQuery` hook. The easing curve `[0.22, 1, 0.36, 1]` gives a fast initial movement that decelerates naturally.

**CountUp:** Stat card numbers animate from 0 to their target using `requestAnimationFrame` with ease-out cubic (`1 - (1 - t)³`). Triggered by `useInView` with a `-100px` margin so the animation starts just before the element fully enters the viewport.

**Reduced motion:** All Framer Motion transitions are effectively neutralized by the `prefers-reduced-motion` CSS rule that sets duration to `0.01ms`, applied globally.

---

## Token and Style Architecture

Design tokens are defined as CSS custom properties in `globals.css` and mirrored as TypeScript constants in `tokens/index.ts`. Components reference the TypeScript tokens for inline styles and JavaScript-driven values; CSS classes reference the CSS variables. No raw hex values appear in components.

```
tokens/
  index.ts       — TypeScript token map (references CSS vars)
  badge.ts       — Badge-specific color combinations per variant
  barTokens.ts   — Bar-specific color combinations
globals.css      — CSS custom property definitions + all component styles
```

Badge variants use a dedicated `badgeTokens` map that computes background, text, and border colors per variant, keeping the Badge component logic-free on the styling side.

Light/dark mode is implemented via a `data-theme="light"` attribute on `<html>`, toggled by a fixed ThemeToggle button. The `[data-theme="light"]` block in CSS overrides the relevant custom properties.

---

## Data Fetching and Caching

Data is fetched from the DummyJSON products endpoint (`/products?limit=6`) and transformed into `MetricItem` objects: the first word of the product title becomes the label, price maps to the display value, and the 0–5 rating is scaled to a 0–100 percentage.

TanStack Query (v5) handles all async state:

- `staleTime: 5 minutes` — data is considered fresh for 5 minutes; no refetch on component remount or navigation within that window
- `gcTime: 10 minutes` — cached data is kept in memory for 10 minutes after the last subscriber unmounts
- `retry: 2` — failed requests are retried twice before surfacing an error state

The result: the network tab shows exactly one request on first load and zero on revisit within the cache window. Loading, error, and success states are all handled explicitly in `FeatureSection`.

---

## Libraries Used

| Library              | Version | Reason                                                                   |
| -------------------- | ------- | ------------------------------------------------------------------------ |
| Next.js (App Router) | 15      | Required by the challenge; App Router for layout and metadata            |
| TypeScript           | 5       | Preferred by the challenge; type safety across tokens, hooks, props      |
| Tailwind CSS         | 4       | Utility classes for layout; design tokens handled separately in CSS vars |
| Framer Motion        | 11      | Preferred animation library; `whileInView`, spring physics, `useInView`  |
| TanStack Query       | 5       | Preferred caching strategy; handles stale/fresh lifecycle cleanly        |

All UI components (Badge, StatCard, VerticalBar, CountUp, Skeleton, ThemeToggle) are built from scratch. No MUI, Chakra, shadcn, or similar libraries are used.

---

## Tradeoffs and Decisions

**Data mapping:** DummyJSON products are not cloud metrics. The transformation is intentionally transparent — price becomes a workload value, rating becomes an efficiency score. The goal was demonstrating async state handling, not realistic data.

**SkeletonBar vs inline skeleton:** The chart loading state uses inline `vertical-bar-skeleton` divs rather than the `SkeletonBar` component, which was originally designed for a horizontal bar layout. `SkeletonBar` is defined but not wired to the chart — this is a cleanup item.

**useMediaQuery for animation axis:** Detecting mobile to switch from height to width animation adds a hydration consideration (server renders `false`, client corrects on mount). The flicker is imperceptible at typical load speeds but a more robust solution would use a CSS-only approach or an SSR-safe initial state.

**Single page:** The challenge asked for a single animated section. Rather than building a full marketing page, I added a minimal hero above the section to give it context without scope creep.

---

## What I Would Improve with More Time

- Replace the `useMediaQuery` animation axis switch with a CSS-driven approach to avoid any hydration mismatch
- Add `aria-valuenow` / `aria-valuemin` / `aria-valuemax` to the vertical bars for screen reader support with visually hidden components for live optimistic loading/error states and aria-label substituition (aria-label does not get translated, but a plain text does for sr)
- Introduce a tooltip on bar hover showing the raw value alongside the percentage
- Write unit tests for `useMetrics` transformation logic and the `CountUp` animation hook
