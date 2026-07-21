# Agents

This repository is the workshop's design system: a monorepo holding one or more
component libraries and a self-built docs site.
`negentropy --strict .` must print `clean` before anything lands.

## Layout

- `packages/react-components` — the React library, published as
  `jsr:@perish/react-components`. Raw ts + scss; each component co-locates its
  style and imports it with `import "./X.scss" with { type: "text" }`, which is
  jsr-publishable. Vue/svelte flavors join as `packages/*-components` later.
- `packages/vite-scss` — the vite import-plugin (`jsr:@perish/vite-scss`) that
  strips the `type: "text"` attribute so vite compiles + injects the scss.
  Framework-agnostic; every flavor and consumer reuses it.
- `apps/react-docs` — the self-built docs site (react.components.perish.uk):
  gallery, interactive knobs, hand-written prop docs (i18n en + zh-CN), guarded
  against drift.

## Boundaries

- vite is the unified web build tool. No pre-build for publish: the library
  ships raw ts + scss to jsr; consumers compile via vite + `@perish/vite-scss`.
- The library is not i18n'd (presentational). Only the docs site is, en + zh-CN.
