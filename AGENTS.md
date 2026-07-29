# Agents

This repository is the workshop's design system: a monorepo holding one or more
component libraries and a self-built docs site.
`ectropy .` must report no errors before anything lands. Warnings remain
visible but do not fail the repository,
and CI runs the SAME guard the pre-commit hook runs — biome, tsc, vitest, deno,
ectropy — not a weaker subset. It used to run only the checker because the CI
image was assumed to be deno-only; it is not, and a CI weaker than the local
hook means anyone who bypasses the hook lands red.

The guard engine does not verify an Ectropy version. During a prerelease
rollout, CI names the exact beta at its setup boundary so the repository opts
in deliberately; after promotion it returns to the latest stable. Ectropy is
the family's global gate, so a stable release can turn this repo red with no
change of ours. That is the gate doing its job, not an accident, and the fix is
to meet the new law rather than freeze an old stable.

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
- SOURCE IMPORTS CARRY A `.js` EXTENSION even though the files are `.tsx`.
  That is the TypeScript ESM idiom and it is load-bearing: tsc does not add
  extensions on emit, so extensionless re-exports produce a `dist` that vite
  can resolve but plain node cannot. `@perish/react-components@0.1.0-beta.1`
  shipped that way and cannot be imported outside a bundler.
- npm PUBLISH IS NOT npm INSTALLABLE. A new scoped package's version document
  is served immediately while its packument lags by minutes, and `npm install`
  resolves through the packument. The verify step therefore polls the
  PACKUMENT, not the version document — verifying the cheaper endpoint would
  go green while no consumer could install. The npm window is 40 x 15s.
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

## Shipping

The site follows the workshop's delivery law, written down in
`plumb/docs/site.md`. What is below is this repository's vocabulary for it.

`runseal :ship` deploys the docs site as Cloudflare Workers Static Assets, and
`deploy.yml` calls that same wrapper on dispatch — one implementation, two
callers, which is why credentials enter through an env door rather than a file
the lane cannot have:

1. `pnpm --filter react-docs build` — vite build, then an SSR pass that
   prerenders one HTML file per locale. `BUILD_COMMIT` and `BUILD_VERSION` are
   fed in so `/health` names the commit and the documented library version
   instead of `0.0.0`.
2. `pnpm dlx wrangler@<pinned> deploy --domain <DESIGN_SITE_DOMAIN>` from
   `apps/react-docs/`; `--domain` attaches the custom domain and its DNS record
   at deploy time, so DNS is never a separate manual step. `wrangler.jsonc` also
   declares the binding, so the attachment is readable from the repository and
   not only from a flag someone remembered to pass.
3. verify, as three separate findings — see below.

THE SHIPPER READS THE ARTIFACT, NEVER THE SOURCE. Routes come from the
prerendered documents in `dist` — every directory holding an `index.html` is a
route the build actually produced. It used to scrape `path:` out of
`src/lib/routes.tsx`, which couples the lane to a file the app is free to move
or absorb; plumb's copy of this wrapper broke exactly that way when its routes
became a virtual module. If a build stops prerendering, the deep probe
disappears with it, which is the honest outcome.

`not_found_handling` is `404-page`, NOT open-web's `single-page-application`.
The locales are prerendered to real files (`dist/index.html`,
`dist/zh-CN/index.html`); an SPA fallback would serve the English shell for
`/zh-CN/` and silently undo the prerender.

wrangler is NOT a workspace dependency. It is fetched on demand with
`pnpm dlx wrangler@<pinned>` inside `:ship`, because it drags
`@cloudflare/workerd-linux-64` — 122MB, 45% of the whole dependency tree — and
CI never deploys. Carrying it in the lockfile pushed the CI guard from 43s to
287s for a tool no CI step invokes. The version is pinned in `ship.ts`.

Verify asserts the BUILD, not just a heartbeat. It reads the fingerprinted
asset out of the freshly built `dist/index.html` and requires the live page to
reference that exact file, because Cloudflare keeps serving the previous build
for a while after a deploy — a plain 200 check passes on the old site and calls
the deploy done. open-web printed `ship: ok` in exactly that state.

DEPLOYED, BOUND, AND REACHABLE ARE THREE FINDINGS, NOT ONE. The upload
succeeding, the platform reporting the domain attached to this worker, and the
edge actually serving this build to a client are independent facts, and the
wrapper prints and enforces each. An unbound domain fails. An unreachable one
fails too, and the only way out is `DESIGN_SITE_BLIND=1`, which declares a
vantage that cannot see the public edge and makes the lane say plainly that it
did not prove the site answers. Collapsing these is how a lane comes to report
success over a domain returning 522 — plumb's did, over a binding whose every
control-plane field matched a healthy sibling. A second, otherwise identical
ship cleared it.

The FIRST deploy of a hostname gets a long verify window — 20 tries at 15s
rather than 3 at 5s — because Cloudflare needs minutes to spread the edge
routing for a new custom domain. Measured at ~240s the first time
react.design.perish.uk went up, against a 15s window, so the lane called a
successful deploy failed. The wide window applies only when the worker domain
is not yet bound, which `:ship` reads from the API before deploying, so a
routine redeploy is unaffected.

Note what that failure was NOT: not certificate issuance (the perish.uk
wildcard predated the deploy by an hour) and not the house's internal DNS. A
hostname the edge does not yet route drops the TLS connection, which surfaces
as `SSL_ERROR_SYSCALL` and reads like a network fault.

Flags: `--dry-run` prints the plan with redacted credentials then runs a
credential-free `wrangler deploy --dry-run`; `--check` probes the token and
whether the worker domain is bound. Both degrade cleanly while secrets are
unfilled.

Shipping happens from CI and from a workstation, so credentials reach `:ship`
through one env door with a file behind it. The lane exports `DESIGN_SITE_*`
directly; locally those are unset and the wrapper falls back to
`.local/secrets/` (gitignored):

- `ship.env` — `DESIGN_SITE_DOMAIN`, the public host with no scheme
- `cloudflare.env` — `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`,
  `CLOUDFLARE_ZONE_NAME`

SECRETS CARRY WHAT MUST NOT BE READ BACK; VARIABLES CARRY WHAT MERELY MUST BE
CORRECT. On the forge the domain and the account identifier are repository
variables and only the key is a secret.

The site now has its OWN token, which reverses an earlier decision under the
condition that decision named. Sharing open-web's credentials was defensible
while shipping was local: Cloudflare's DNS permission is zone level, so a second
token could still edit every record in perish.uk, and both files sat in the same
`.local/secrets/` on the same machine — the compromise that leaks one leaks
both. Separation bought audit attribution and nothing else. A forge secret is a
different trust domain, which is exactly the revisit condition, so
`design-site-deploy` is minted for this purpose alone: Workers Scripts Write on
the account, and Zone Read, DNS Write, and Workers Routes Write on the one zone
that carries the domain. It does not expire, which is only defensible because it
is narrow and revocable on its own.

That token's value exists ONLY in the forge secret — no copy was kept on any
workstation, which is what makes "revocable on its own" mean something. A local
`:ship` still runs under whatever Cloudflare credentials `cloudflare.env` holds;
the separation being bought here is the forge's, not the workstation's.

Widening that token later does NOT require rotating the forge secret: updating
an existing token's policies with `PUT` leaves its value unchanged. plumb's
first deploy failed for want of `Workers Routes Write` and was repaired that
way.
- `:ship --check` verifies the token through `/zones?name=<zone>`, NOT
  `/user/tokens/verify`. That endpoint rejects account-scoped tokens with 401
  Invalid API Token even when they are perfectly valid, which reads as a dead
  credential and sends you chasing the wrong thing.

## Tags

A release tag is `<package-slug>/v<version>`. The name carries no registry, so
when `@perish/react-components` moved from jsr to npm its version numbering
restarted at beta.1 and collided with tags the jsr era had already taken. The
jsr-era library tags were deleted — that registry is abandoned and those
artefacts were falsified — and npm numbering continues unbroken. The plugin's
tags are untouched.

The tag step FAILS on a collision rather than skipping it. It skips only when
the tag already points at this very commit, which is the repair-pass case;
a tag owned by a different commit means two histories are claiming one version
and the lane must not paper over that.
