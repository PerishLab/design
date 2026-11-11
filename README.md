# design

The Perish Svelte design system.

```ts
import { Button, Frame, Note } from "@perishlab/design";
import { design } from "@perishlab/design/vite";
```

`packages/token` carries the atoms, the contract that guards them, and ten
design languages built on them. `packages/design` carries one-word Svelte
components plus the framework-neutral Vite integration. `apps/docs` is the
bilingual gallery published at `design.perish.uk`.

Every generator is filed by what it takes responsibility for: `mark`,
`arrange`, `enclose`, `focus`, `layer`, `document`.

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm typecheck
pnpm test
pnpm build
ectropy .
```

`typecheck` reads workspace source directly; it does not generate package
artifacts. `build` creates the npm payload and prerendered documentation site.

`/proof` renders every component on one screen. Add `?system=` and a language
to dress it: `swiss`, `material`, `terminal`, `cupertino`, `carbon`, `ant`,
`brutal`, `relief`, `glass`, `folio`.

## Workbench and native forms

`/proof/` is an interactive local records fixture under default Base. It supports
search and status filtering, keyboard tabs, record details, editing and required
field errors, a confirmation dialog, pending/success/failure feedback and retry.
Changes stay in the page. Titles are edited in the current language; identity,
owner, status and starred state are shared across the two translations.

Loading and load failure retain current records and edits; empty/reset use the
seeded sample. Cancelled language or scene choices restore their native select
value along with the accepted state.

The language and tone controls keep the same structure. The usage section
exposes loading, empty and failed sample scenes, a save-failure switch, reset,
and all eleven formal systems. Fixed systems keep their own colour scheme.
`?locale=en&tone=dark` selects the English dark Base sample;
`?workbench=1&system=folio` exercises the same fixture under Folio.
The complete generator specimen remains at `?catalog=1&system=base`, and
`?system=base` retains the existing measurement route used by `look`.

`Form` owns a native client-side form, prevents native navigation, calls
`submit`, rejects duplicate submissions while `busy`, and focuses the first
input marked `aria-invalid` after the callback updates its state. Native
constraint validation is enabled by default; `validate={false}` opts into
callback-managed errors. It provides no server action or authentication.

```svelte
<script lang="ts">
  import { Form, Field, Button, Toast } from "@perishlab/design";
  let title = $state("");
  let error = $state("");
  let saved = $state("");
  let notes: string[] = $state([]);
  function save(): void {
    error = title.trim() ? "" : "A title is required";
    if (error) return;
    saved = title.trim();
    notes = [`Saved in this page: ${saved}`];
  }
</script>

<Form label="Edit record" submit={save} validate={false}>
  <Field label="Title" bind:value={title} {error} required />
  <Button label="Save" submit />
</Form>
<Toast {notes} />
```

Field's additive `error`, `required`, `readonly` and `disabled` props use native
semantics and a unique label/error association. Pick, Check and Menu accept
`disabled`; Search accepts a stable `label` (legacy `hint` remains its fallback).
Tabs accept an optional `label` and `children` snippet for the selected panel,
link that panel to the active tab, and support arrows and Home/End. Without
children they retain their control-only shape. Menu focuses an item on open,
uses arrows/Home/End, closes on Tab or Escape and returns focus on selection or
Escape. Board's existing `seat` can be reached and focused as a named region.
Line adds opt-in `flow="fold"` for a record row whose text and actions should
fold by the existing `cell` measure; its default inline shape is unchanged.
Modal keeps Tab/ShiftTab inside its controls and defaults to dismissible;
`dismiss={false}` prevents Escape/backdrop dismissal during a pending action.

These additions need no application CSS or native HTML and no new Vite setup.
The source-aware docs workspace verifies candidate composition; it does not
prove consumption of a new formal npm distribution. That independent package
and online verification remains a release-stage obligation.


The public Vite entry can be imported before Crest's brand contract is
qualified. Requesting `design()` synchronously checks the installed formal
Crest assets entry, its `asset`/`read` functions and media manifest. A missing
entry or manifest, or incomplete API, refuses with `DESIGN_CREST_CONTRACT` and
keeps the native cause; execution errors in a resolved module are preserved.
First-party requirements remain `0` and ordinary consumers resolve the current
stable. That requirement does not promise the brand API exists in every
historical 0.x package. Crest 0.2.0 is an unsupported control, while 0.4.0
provides the currently qualified contract. No historical drawing or fallback
image is substituted. The existing formal-version, schema and per-image digest
checks still apply after qualification.
