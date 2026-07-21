# components

The workshop's design system. A monorepo:

- `@perish/react-components` — a React component library, published to jsr as raw
  ts + scss (no pre-build). Each component co-locates its style.
- `@perish/vite-scss` — a small vite plugin so consumers compile the library's
  scss (the unified web build tool stays vite; there is no build step to publish).
- a self-built docs site at react.components.perish.uk — gallery, interactive
  knobs, and hand-written, drift-guarded prop docs in English and 简体中文.

The library is an internal-general house design system, reused across the
workshop's sites.
