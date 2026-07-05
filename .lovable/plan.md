## Problem
The current hero uses a Spline 3D scene that shows a watermark on free plans. We need a watermark-free replacement.

## Goal
Build a custom interactive 3D element using React Three Fiber that fits the dark, tech-themed portfolio aesthetic and lives cleanly inside the existing square hero container.

## Technical Plan

### 1. Install dependencies
```
bun add three @react-three/fiber @react-three/drei
bun add -D @types/three
```

### 2. Create `src/components/Hero3D.tsx`
- Render a `<Canvas>` from `@react-three/fiber`
- Build a tech-themed composition using R3F primitives:
  - A slowly rotating wireframe icosahedron or torus knot as the centerpiece
  - Glowing cyan/magenta materials matching the site's `--primary` and `--accent` tokens
  - Small floating particles orbiting the main shape
  - A subtle grid floor or ring for depth
- Add mouse interactivity:
  - The shape gently rotates toward the cursor
  - Hover/tap effects using `drei`'s pointer events
- Use `drei`'s `OrbitControls` or custom rotation for limited interactivity (no zoom/pan hijack)
- Match the container sizing: fill the `aspect-square` parent via `w-full h-full`

### 3. Replace Spline in `src/routes/index.tsx`
- Swap `<InteractiveRobotSpline ... />` for the new `<Hero3D />` component
- Keep the same container wrapper (`aspect-square`, border, backdrop-blur)

### 4. Clean up
- Remove the Spline watermark-hiding CSS rules from `src/styles.css`
- Optionally remove `@splinetool/react-spline` and `@splinetool/runtime` from `package.json` to reduce bundle size

## Visual Direction
- Dark background (transparent canvas letting the container backdrop show through)
- Glowing cyan wireframe with magenta accent highlights
- Slow ambient rotation, responsive to mouse position
- Clean, minimal — doesn't compete with the hero text

## Limitations
Without the original `.splinecode` asset, we cannot replicate the exact robot model. The replacement will be an abstract tech-themed geometric composition that fits the portfolio's cyberpunk aesthetic.