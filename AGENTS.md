# Agents

This repository owns the Svelte design system, the token substrate beneath it,
and its self-built documentation site.

## Identity

- `packages/token` publishes `@perishlab/token`: the atoms, the contract that
  guards them, and every theme. It carries no component and no framework.
- `packages/bone` publishes `@perishlab/bone`: the seam CSS does not have. `Bay`
  reserves space and may move it, `Skin` fills its bay and paints it, and one
  border box could hold neither without the other. The package may not name a
  single atom: `packages/design/tests/bone.test.ts` refuses `var(--` in its
  compiled output, and Biome's `noRestrictedImports` refuses any reach for the
  substrate. It is a dependency of the design package and of nothing else; the
  app layer must never receive a generic box.
- `packages/design` publishes `@perishlab/design` and depends on the substrate.
  Components are exported from the package root. Every component declaration
  and filename is one word.
- Component styles reach the substrate through `pkg:` specifiers. The design
  plugin carries the node package importer that makes them resolve, so a
  consumer configures nothing it was not already configuring.
- The framework-neutral Vite integration is exported from
  `@perishlab/design/vite`; it owns route discovery, health, local proxy wiring,
  the optional static server artifact, and the sass resolution above.
- The package name `@perishlab/design`, the `design(` plugin call and the
  virtual module `virtual:perish/views` are a contract Plumb also judges: its
  web shape matches them by name, so renaming any of them needs a matching
  Plumb release before consumers move.
- `apps/docs` builds `design.perish.uk`. It consumes the same source package
  contract that is published, through explicit workspace resolution only, and
  takes `@perishlab/crest` from the registry like any other consumer. Its Vite
  config loads the design plugin from the built package, so its `dev`, `build`
  and `look` scripts build their workspace dependencies first.

React, TSX, JSR, `useXxx` declarations, the old package names, and the old
`react.design.perish.uk` domain are retired surfaces. Do not restore a
compatibility layer for them.

## Shape

Every generator is filed by what it takes responsibility for, and that axis is
the directory. It is the only axis that carries behaviour: focus means keyboard
and roles and a ring, a layer means the top layer and escape and a trap,
the document means the reset and the scope.

| Room | Takes responsibility for |
|---|---|
| `mark` | rendering its own content |
| `arrange` | receiving a collection and placing its members |
| `enclose` | bounding a region |
| `focus` | owning a focusable element |
| `layer` | owning a layer of its own |
| `document` | owning the document and its scope |

A room may hold ten. When one fills, the question is whether the newcomer is a
generator at all, not whether the shelf can be lengthened. Two have already been
answered that way: `Badge` was `Tag look="quiet"`, and `Spin` was `Meter` with
no value.

The other axes are real and are not directories. Arity, flow, and territory are
projections, and the gallery is where they belong.

A room is an obligation, so two of them state one a machine can hold:
`packages/design/tests/room.test.ts` refuses a `focus` generator that owns no
focusable element, and a `layer` generator that opens with no way to close it
but a pointer. `apps/docs/tests/drift.test.ts` refuses a catalog that files a
component in a room its source does not stand in.

The other four rooms are held by a person, and not for now. `mark`, `arrange`,
`enclose`, and `document` state what a generator means rather than what its
source contains, and checking meaning would need the component to declare its
own role — which is the proposal this repository has already refused twice. A
generator with no stylesheet is outside every one of these, because the laws
that read the tree read the ones that carry a dress.

## App layer

`apps/*` may write no CSS and no native HTML tag. The first is enforced by the
style grant in `ectropy.toml`; the second is not yet enforced anywhere, so it
has to be held by hand.

Together they make the app layer an instrument. A layout it cannot reach is a
gap in the token vocabulary, and a structure it cannot write is a missing
generator. `apps/docs/src/proof/Proof.svelte` is the measurement: it composes
every generator into one plausible product surface and writes no tag of its own.

## Themes

A tone supplies a palette and a system supplies the whole vocabulary. Both are
refused at compile time if they omit an atom or invent one.

The cascade is banded: `tokens, tone.given, tone.chosen, system, base, bone,
component, override`. A system outranks a tone by sitting in a later band, and
an explicit tone outranks the one the operating system offered, without anyone
stacking selectors to win.

Adding an atom is safe. It goes in one list in `tokens.scss`, and the build
stops on every theme that has not answered for it.

## Guard

Run `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `plumb doctor .`,
and `ectropy .`. Verify by exit code. Type checking is a source operation and
must not build first. `plumb configuration install` projects the guard hooks,
and every commit carries the proof Plumb's guard takes over the exact staged
tree.

`ectropy` must run from the repository root or it reads default law and scans
build output. `plumb doctor` wants the build output removed and any deletion
staged, or it reports paths it cannot see.

`@perishlab/crest` and `@perishlab/sidecar` install from GitHub Packages, which
wants a token even for a public package. Locally that is the `GH_TOKEN` Runseal's
`liberte` profile carries, handed to pnpm through a user npmrc that names it.

The theme contract only fires when a consumer compiles, because
`svelte-package` copies `.scss` through untouched. A package build proves
nothing about the themes it ships; `apps/docs` building them is what catches a
missing atom.

## Release

`plumb.toml` declares the product. `@perishlab/bone`, `@perishlab/sign`,
`@perishlab/token` and `@perishlab/design` publish to GitHub Packages in that
order, so each lands after what it depends on, and `.npmrc` maps the scope
there. The packages declare version `0.0.0` and share the product's version.
`apps/docs` is the Cloudflare worker behind `design.perish.uk`; its
`wrangler.jsonc` names the account and the domain.

A release follows Plumb's lifecycle (`plumb release --help`); wharf stamps the
version into the packages, publishes them, and deploys the worker. A stable's
changelog goes to the Depot.

## Look

`pnpm --filter design-docs look` drives `playwright-cli` over the built site and
writes `apps/docs/tests/look.json`: for every system and every part of the proof
screen, the resolved colour, shape, face, weight, shadow, and box. It is a
baseline of how the library looks, held as text rather than as pixels, so a diff
is readable and a change is reviewable beside the commit that caused it.

It is not in the guard chain. It needs the built site, a served port, and a
browser, and none of those belong in a lane that has to be cheap. Run it after
anything that could move an appearance, and commit the baseline in the same
change as the design it records. A diff nobody intended is a regression; a diff
that arrives alone is a regression that got committed.

`LEDGER.md` records what the proof screen and the probe themes found. Entries
are recorded when found and closed when answered, and a correction to an earlier
entry is kept beside it rather than overwritten.
