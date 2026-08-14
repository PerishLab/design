# design

The Perish Svelte design system.

```ts
import { Button, Frame, Note } from "@perish/design";
import { design } from "@perish/design/vite";
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
