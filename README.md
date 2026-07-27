# design

The workshop's design system. A monorepo:

- `@perish/react-components` — a React component library published to npm.
  TypeScript builds each component to JavaScript and declarations while
  preserving its co-located stylesheet in `dist`.
- `@perish/vite-plugin-design` — the vite plugin this system's publish shape
  needs, published to JSR. The library ships stylesheets but never imports
  them, so the plugin injects each component's co-located `X.scss` as Vite
  compiles the emitted module. Without it the components have no styling. The
  typeface needs nothing from the plugin: the library's scss declares
  `@font-face` against a pinned URL, so the browser fetches Spectral on its own
  and falls back to Georgia if it cannot.
- a self-built docs site at react.design.perish.uk — gallery, interactive
  knobs, and hand-written, drift-guarded prop docs in English and 简体中文.

The system is internal-general house work, reused across the workshop's sites.
The library is pre-built for npm; the raw TypeScript plugin stays on JSR and
materializes the library's co-located styles in each Vite consumer.
