# Agents

This repository is the workshop's design system: a monorepo holding one or more
component libraries and a self-built docs site.
`negentropy --strict .` must print `clean` before anything lands.

## Layout

- `packages/react-components` — the React library, published as
  `jsr:@perish/react-components`. Raw ts + scss; each component co-locates its
  style but DOES NOT import it — the source contains no scss import at all.
  Vue/svelte flavors join as `packages/*-components` later.
- `packages/vite-plugin-design` — the vite plugin (`jsr:@perish/vite-plugin-design`)
  that injects each component's co-located `X.scss` when it transforms `X.tsx`,
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
- `import "./X.scss" with { type: "text" }` IS NOT PUBLISHABLE TO JSR. The
  server rejects it building the module graph: "The import attribute type of
  'text' is unsupported". The phase-1 spike called it verified on the strength
  of a dry run, and a dry run never reaches server-side validation. The library
  therefore imports no scss at all; the scss files still ship, because jsr
  collects files by include/exclude and not by module graph, and the plugin
  injects `import "./X.scss"` when it transforms a sibling `X.tsx`.
- The design foundation (tokens, themes) reaches an app through scss, not JS:
  `Frame.scss` `@use`s tokens and both themes, so wrapping an app in `Frame`
  installs the foundation. Nothing imports a stylesheet from a `.tsx`.
- A dry run proves almost nothing about publishing. `--dry-run` skips
  server-side validation entirely: it accepted the text import attribute, and
  it accepted `--set-version`, both of which the real publish rejects. Treat
  green dry runs as a syntax check, never as evidence the lane works.
- Every `deno publish` here runs with `DENO_NO_PACKAGE_JSON=1`. Without it deno
  finds `pnpm-workspace.yaml`, decides it should migrate the workspace and
  catalog into the root `package.json`, and REWRITES that file. Run local dry
  runs the same way. The packages carry their own type dependencies in
  `deno.json` precisely so nothing needs `node_modules` to type-check —
  `@perish/react-components` declares `@types/react` there, which is also what
  makes it type-check for a deno consumer rather than only inside this
  workspace.
- The lane stamps the release version into the package's own `deno.json`
  before publishing. `deno publish --set-version` does NOT work here: it sets
  the version of the publish request but leaves the manifest inside the
  uploaded tarball alone, and jsr rejects the mismatch. Only the dry run is
  fooled, because it never reaches server-side validation.
- The plugin's `Plugin`/`Loud` shapes stay unexported. The contract a consumer
  should hold is vite's own `Plugin` type; ours is a structural subset of it and
  publishing it would claim a contract we do not own.
