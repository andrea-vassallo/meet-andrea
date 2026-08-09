# Header mark refresh

Replace the current small animated 3D module logo with a clearer static mark that reads crisply at the existing 32px header size.

## Direction

Use a flat, geometric “connection / delivery” symbol aligned to the existing Blueprint / Console system:

- A simple open-frame or linked-module silhouette with deliberate negative space.
- Graphite as the primary stroke/fill and slate blue as one restrained connection detail.
- No tiny spheres, stacked 3D blocks, shadows, bevels, or continuous animation.
- Preserve the current header placement beside “Andrea Vassallo · Portfolio” and the existing fallback behavior.

## Implementation

1. Replace the `Mark3D` header usage with a lightweight static React/SVG mark component, keeping the existing `ModuleMark` fallback structure or extracting the mark into its own focused component if that keeps the route cleaner.
2. Make the SVG geometry optically balanced inside the 32px slot with sufficient inset so no corners or strokes clip.
3. Remove the lazy Three.js import from the header path and remove the unused `Mark3D` component and Three.js dependencies only if they are no longer referenced anywhere else.
4. Preserve semantic color-token usage and the current Blueprint / Console palette; do not introduce hardcoded color utilities.
5. Verify the rendered header at desktop and narrow viewport sizes, checking crispness, alignment, and that the mark remains legible without console errors.

## Acceptance criteria

- The logo is static, minimal, and clearly visible at 24–32px.
- It looks intentional next to the portfolio label rather than like a miniature 3D object.
- No clipping or overlap occurs in the header.
- The rest of the page remains unchanged.
