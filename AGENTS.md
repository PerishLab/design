# Agents

This repository is the workshop's design system: a monorepo holding one or more
component libraries and a self-built docs site.
`negentropy --strict .` must print `clean` before anything lands, and CI runs
the SAME guard the pre-commit hook runs — biome, tsc, vitest, deno, negentropy
— not a weaker subset. It used to run only the negentropy check because the CI
image was assumed to be deno-only; it is not, and a CI weaker than the local
hook means anyone who bypasses the hook lands red.

## Layout

- `packages/react-components` — the React library, published as
  `npm:@perish/react-components`. Pre-built: `tsc` emits `.js` + `.d.ts` into
  `dist` and the co-located `.scss` is copied beside them, so a stylesheet is
  always a sibling of the module that needs it. The source contains no scss
  import at all. Vue/svelte flavors join as `packages/*-components` later.
- `packages/vite-plugin-design` — the vite plugin (`jsr:@perish/vite-plugin-design`)
  that makes the published library readable by a consumer's vite. It has no
  dependencies and two jobs, both forced by how jsr publishes raw tsx.
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
- THE LIBRARY GOES TO NPM, THE PLUGIN STAYS ON JSR. Not a compromise — each
  package sits on the registry that fits its shape. jsr does not transpile
  `.tsx`: it left all 16 components raw and rewrote their imports into
  `npm:react@^19.2.7` form, and the generated type entry re-exports straight
  back at those `.tsx` files. A bundler can be rescued by a plugin; a
  type-checker cannot, because tsc reads files from disk and never passes
  through a vite plugin. `paths` mappings do not help — tsc will not resolve an
  `npm:` specifier at all. So a raw-tsx jsr package is unusable from
  TypeScript, full stop. The plugin has no JSX and no dependencies, which is
  exactly what jsr handles well, and it type-checks cleanly from jsr today.
- PRE-BUILDING IS NOT A DEFEAT OF "no pre-build", IT IS WHERE THAT RULE MET
  EVIDENCE. The rule bought co-location and no build step; it cost every
  TypeScript consumer the ability to type-check. Co-location survives anyway,
  because the build copies each `.scss` next to its emitted `.js`.
- THE TYPEFACE IS A CSS CONCERN, NOT A MODULE ONE. `src/type.scss` declares
  `@font-face` with a pinned URL, `font-display: swap`, and fontsource's
  unicode-range subsets; the browser fetches the file and no bundler is
  involved. Earlier attempts routed the font through the JS module graph — an
  npm dependency reached by `import.meta.resolve` from a virtual module — and
  broke at every packaging boundary: jsr prunes a dependency that only ever
  appears as a string, so the published package declared none, nothing was
  installed, and the consumer's build failed outright. A `url()` cannot fail
  that way, and if it does fail the text still renders in Georgia.
- The font URL currently points at jsdelivr, pinned to @fontsource/spectral
  5.2.8. Moving to a self-hosted origin is a URL swap plus a release: upload the
  same bytes (verified identical, 22936B and 20824B) and edit `$host`.
- The design foundation (tokens, themes) reaches an app through scss, not JS:
  `Frame.scss` `@use`s tokens and both themes, so wrapping an app in `Frame`
  installs the foundation. Nothing imports a stylesheet from a `.tsx`.
- A DRY RUN'S WORTH DEPENDS ON THE REGISTRY, so do not carry a verdict from
  one to the other. jsr's `--dry-run` skips server-side validation entirely: it
  accepted the text import attribute and `--set-version`, both of which the
  real publish rejects, so treat it as a syntax check only. npm's caught a
  missing `--tag` before the real publish. Weak evidence in one tool is not
  weak evidence everywhere.
- EVERY npm COMMAND IN CI PASSES `--registry https://registry.npmjs.org`. The
  image points npm at `mirror.perish.lan/npm/`, and `NPM_CONFIG_USERCONFIG`
  does NOT override that — it replaces the user config, not the image's global
  one. Publishing without the flag tries to push to the internal mirror and
  fails on auth; installing without it can read a mirror that lags a release we
  just cut. The jsr lane pins `JSR_URL` for the same reason.
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
