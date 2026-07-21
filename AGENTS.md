# Agents

This repository is the workshop's design system: a monorepo holding one or more
component libraries and a self-built docs site.
`negentropy --strict .` must print `clean` before anything lands.

## Layout

- `packages/react-components` — the React library, published as
  `jsr:@perish/react-components`. Raw ts + scss; each component co-locates its
  style and imports it with `import "./X.scss" with { type: "text" }`, which is
  jsr-publishable. Vue/svelte flavors join as `packages/*-components` later.
- `packages/vite-plugin-design` — the vite plugin (`jsr:@perish/vite-plugin-design`)
  that strips the `type: "text"` attribute so vite compiles + injects the scss.
  Named for the system it serves, not the syntax it strips: it is framework-
  agnostic, and every flavor and consumer of this system reuses it.
- `apps/react-docs` — the self-built docs site (react.design.perish.uk):
  gallery, interactive knobs, hand-written prop docs (i18n en + zh-CN), guarded
  against drift.

## Boundaries

- vite is the unified web build tool. No pre-build for publish: the library
  ships raw ts + scss to jsr; consumers compile via vite + `@perish/vite-plugin-design`.
- The library is not i18n'd (presentational). Only the docs site is, en + zh-CN.
