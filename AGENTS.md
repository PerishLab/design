# Agents

This repository owns the Svelte design system and its self-built documentation
site.

## Identity

- `packages/design` publishes one public Forgejo npm package: `@perish/design`.
- Components are exported from the package root. Every component declaration
  and filename is one word.
- The framework-neutral Vite integration is exported from
  `@perish/design/vite`; it owns route discovery, health, local proxy wiring,
  and the optional static server artifact.
- `apps/docs` builds `design.perish.uk`. It consumes the same source package
  contract that is published, through explicit workspace resolution only.

React, TSX, JSR, `useXxx` declarations, the old package names, and the old
`react.design.perish.uk` domain are retired surfaces. Do not restore a
compatibility layer for them.

## Guard

Run `pnpm check`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `plumb doctor .`,
and `ectropy .`. Type checking is a source operation and must not build first.
The package build is required only for packaging, the docs production build,
and clean-consumer smoke.

## Release

Actions owns the exact and stable npm transaction. Product workflows are thin
callers. The registry authority is
`https://git.perish.top/api/packages/PerishLab/npm/`; publication requires the
purpose-scoped `package-release` token, never a break-glass operator token.

The site follows the Plumb site contract. `plumb site plan`, `inspect`, and
`deploy` derive the app and domain from `apps/docs/wrangler.jsonc`.
