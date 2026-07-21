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
  that strips the `type: "text"` attribute so vite compiles + injects the scss,
  and serves the typeface as the virtual module `virtual:perish-design/font`.
  Named for the system it serves, not the syntax it strips: it is framework-
  agnostic, and every flavor and consumer of this system reuses it.
- `apps/react-docs` — the self-built docs site (react.design.perish.uk):
  gallery, interactive knobs, hand-written prop docs (i18n en + zh-CN), guarded
  against drift.

## Boundaries

- vite is the unified web build tool. No pre-build for publish: the library
  ships raw ts + scss to jsr; consumers compile via vite + `@perish/vite-plugin-design`.
- The library is not i18n'd (presentational). Only the docs site is, en + zh-CN.
- THE LIBRARY DECLARES, THE PLUGIN MATERIALIZES. The library names the design
  in source and reaches for nothing: `--serif: "Spectral", Georgia, serif` is a
  token, and the library carries no npm asset dependency of any kind. Anything
  that needs the consumer's build to act belongs to the plugin — stripping the
  import attribute so scss compiles, and owning `@fontsource/spectral` so the
  typeface has a source. A consumer that skips the font module still renders:
  the token falls back to Georgia.
- The plugin strips the attribute off `.scss` specifiers ONLY, and only inside
  `.js/.jsx/.ts/.tsx`. This is deliberate, not incidental: `with { type:
  "text" }` is a real ESM feature, so stripping it anywhere else would hijack a
  legitimate text import.
- Every `deno publish` here runs with `DENO_NO_PACKAGE_JSON=1`. Without it deno
  finds `pnpm-workspace.yaml`, decides it should migrate the workspace and
  catalog into the root `package.json`, and REWRITES that file. Run local dry
  runs the same way. The packages carry their own type dependencies in
  `deno.json` precisely so nothing needs `node_modules` to type-check —
  `@perish/react-components` declares `@types/react` there, which is also what
  makes it type-check for a deno consumer rather than only inside this
  workspace.
- The release lane never edits a tracked file: the version reaches jsr through
  `deno publish --set-version`, not by stamping `deno.json`.
- The plugin's `Plugin`/`Loud` shapes stay unexported. The contract a consumer
  should hold is vite's own `Plugin` type; ours is a structural subset of it and
  publishing it would claim a contract we do not own.
