export const spell = `pnpm add @perishlab/design @perishlab/token`;

export const wired = `import { design } from "@perishlab/design/vite";

export default { plugins: [design()] };`;

export const shown = `<script>
  import { Hero, Shell } from "@perishlab/design";
</script>

<Shell system="swiss">
  <Hero title="hello" />
</Shell>`;

export const borne = `<Card title="one structure">
  <Text>
    The same generators, dressed by one language.
  </Text>
  <Button label="press" />
</Card>`;
