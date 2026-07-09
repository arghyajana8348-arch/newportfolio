## Goal

Add a compact Spline 3D showcase beside the "Things I've been building" projects grid, so the original robot scene (and future scenes) live on the site alongside the custom Three.js hero.

## Layout

Restructure the Projects section into a two-column grid on `lg` and up:

```text
lg screens
┌───────────────────────────────────────┬──────────────────────┐
│ Projects grid (2 cols)                │ 3D Experiments       │
│ ┌───────────┐  ┌───────────┐          │ ┌──────────────────┐ │
│ │ project 1 │  │ project 2 │          │ │  Spline canvas   │ │
│ └───────────┘  └───────────┘          │ │  (aspect-square) │ │
│                                       │ ├──────────────────┤ │
│                                       │ │ Robot Playground │ │
│                                       │ │ tags · caption   │ │
│                                       │ └──────────────────┘ │
└───────────────────────────────────────┴──────────────────────┘

md and below
Projects grid (existing 1–2 cols) stacked, 3D Experiments card below.
```

Column ratio: `lg:grid-cols-[1fr_320px]`. The showcase column has its own small `SectionHeading`-style label ("// 3d experiments") so it reads as its own mini-section, not a project card.

## Implementation

1. **Reinstall Spline packages** — `@splinetool/react-spline` and `@splinetool/runtime`.
2. **Create `src/components/SplineShowcase.tsx`** — a compact card:
   - Lazy-loads `@splinetool/react-spline` via `React.lazy` + `Suspense` so it never blocks initial paint.
   - Square Spline canvas at the top with a spinner fallback until `onLoad` fires.
   - Title, one-line description, optional tag chips below the canvas, in the same border/backdrop styling as the project cards.
   - Accepts an array of scenes so more can be added later; renders them stacked in the sidebar.
3. **Update `Projects` in `src/routes/index.tsx`** — wrap the existing grid + new showcase in a `lg:grid-cols-[1fr_320px]` container. Grid becomes `md:grid-cols-2` inside the left column so cards stay readable at the narrower width.
4. **Default scene** — reuse the previously integrated URL `https://prod.spline.design/sVeEmN1NRk0vpwDo/scene.splinecode` with title "Robot Playground". Easy to swap or extend later.

## Notes / Limitations

- Spline free-tier watermark will reappear on this embed (the hero stays watermark-free because it uses the custom Three.js scene). If you want it hidden here too, that requires a paid Spline plan.
- No new scenes were provided, so only the original robot scene is wired up. Send more `.splinecode` URLs any time and I'll drop them into the same sidebar list.
