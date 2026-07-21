import { guard } from "@perish/harness/guard";

await guard([
  { label: "biome", runs: [["pnpm", ["biome", "ci", "."]]] },
  { label: "tsc", runs: [["pnpm", ["-r", "exec", "tsc", "--noEmit"]]] },
  { label: "vitest", runs: [["pnpm", ["-r", "test"]]] },
  { label: "deno fmt", runs: [["deno", ["fmt", "--check", ".runseal"]]] },
  {
    label: "deno check",
    runs: [["deno", [
      "check",
      "--config",
      ".runseal/deno.json",
      "--lock",
      ".runseal/deno.lock",
      "--frozen=true",
      ".runseal/wrappers/guard.ts",
      ".runseal/wrappers/init.ts",
      ".runseal/wrappers/land.ts",
      ".runseal/wrappers/release.ts",
    ]]],
  },
  {
    label: "deno check release metadata",
    runs: [["deno", [
      "check",
      ".forgejo/scripts/release/metadata/beta.ts",
      ".forgejo/scripts/release/metadata/stable.ts",
      ".forgejo/scripts/release/jsr/probes/vite-plugin-design.ts",
    ]]],
  },
  {
    label: "shell syntax",
    runs: [
      ["sh", ["-n", ".forgejo/scripts/release/jsr/verify.sh"]],
      ["sh", ["-n", ".forgejo/scripts/release/jsr/smoke.sh"]],
      ["node", ["--check", ".forgejo/scripts/release/jsr/probes/react-components.mjs"]],
    ],
  },
], Deno.args);
