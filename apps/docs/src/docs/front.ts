export const spell = `pnpm add @perishlab/design @perishlab/token`;

export const wired = `import { design } from "@perishlab/design/vite";

export default { plugins: [design()] };`;

export const shown = `<script>
  import { Hero, Shell } from "@perishlab/design";
</script>

<Shell system="swiss">
  <Hero title="hello" />
</Shell>`;

export const borne = `<Board title={copy.title} line={copy.line}>
  <Grid cols={2} flow="hold">
    <Card title={copy.meaning}>
      <Text>{copy.constant}</Text>
      <Tag text={copy.state} />
    </Card>
    <Card title={copy.language}>
      <Text>{copy.variable}</Text>
      <Button href={copy.href} label={copy.action} />
    </Card>
  </Grid>
</Board>`;
