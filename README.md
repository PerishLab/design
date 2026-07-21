# design

The workshop's design system. A monorepo:

- `@perish/react-components` — a React component library, published to jsr as raw
  ts + scss (no pre-build). Each component co-locates its style.
- `@perish/vite-plugin-design` — the vite plugin this system's publish shape
  needs. The library ships stylesheets but never imports them, so the plugin
  injects each component's co-located `X.scss` as it compiles `X.tsx`. It also
  Without it you get the components with no styling. The typeface needs nothing
  from the plugin: the library's scss declares `@font-face` against a pinned
  URL, so the browser fetches Spectral on its own and falls back to Georgia if
  it cannot.
- a self-built docs site at react.design.perish.uk — gallery, interactive
  knobs, and hand-written, drift-guarded prop docs in English and 简体中文.

The system is internal-general house work, reused across the workshop's sites.
Nothing here is pre-built for publish: the library ships source, and the plugin
is how a consumer's vite reads that source.
