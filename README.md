# design

The Perish Svelte design system.

```ts
import { Button, Frame, Note } from "@perish/design";
import { design } from "@perish/design/vite";
```

`packages/design` carries one-word Svelte components plus the framework-neutral
Vite integration. `apps/docs` is the bilingual gallery published at
`design.perish.uk`.

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
