# design

The workshop's design system. A monorepo:

- `@perish/react-components` — a React component library, published to jsr as raw
  ts + scss (no pre-build). Each component co-locates its style.
- `@perish/vite-plugin-design` — the vite plugin this system's publish shape
  needs: it strips the `with { type: "text" }` attribute off scss imports so
  vite compiles and injects them normally. Without it the styles arrive as text.
- a self-built docs site at react.design.perish.uk — gallery, interactive
  knobs, and hand-written, drift-guarded prop docs in English and 简体中文.

The system is internal-general house work, reused across the workshop's sites.
Nothing here is pre-built for publish: the library ships source, and the plugin
is how a consumer's vite reads that source.
