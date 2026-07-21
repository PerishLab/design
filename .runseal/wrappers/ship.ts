import { cli, flags } from "@perish/harness/cli";
import { bin } from "@perish/harness/cmd";
import { env } from "@perish/harness/env";
import { fs } from "@perish/harness/fs";
import { io } from "@perish/harness/io";
import { family, kind, run } from "@perish/shield";

const app = "apps/react-docs";
const tool = "wrangler@4.110.0";
const dist = `${app}/dist`;
const table = `${app}/src/lib/routes.tsx`;

const fault = family("ship", {
  unfilled: kind<{ missing: string[] }>(),
  build: kind<{ path: string }>(),
  unreached: kind<{ domain: string }>(),
});

function usage(): void {
  io.print("Usage: runseal :ship [--dry-run | --check]");
  io.print("");
  io.print("Build the docs site and deploy it as Workers Static Assets on the docs domain.");
  io.print("");
  io.print("  --dry-run   print the plan and run a credential-free wrangler dry run");
  io.print("  --check     probe the token, the zone, and the worker");
  io.print("");
  io.print("Secrets:");
  io.print("  .local/secrets/ship.env        DESIGN_DOCS_DOMAIN");
  io.print("  .local/secrets/cloudflare.env  CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_API_TOKEN");
}

function seat(): string {
  return env.get("RUNSEAL_REPO_SECRETS_DIR", ".local/secrets");
}

async function secrets(name: string): Promise<Record<string, string>> {
  const text = await fs.file.readTextIfExists(`${seat()}/${name}`);
  const values: Record<string, string> = {};
  for (const line of text.split("\n")) {
    const entry = line.trim();
    if (entry === "" || entry.startsWith("#") || !entry.includes("=")) {
      continue;
    }
    const at = entry.indexOf("=");
    const value = entry.slice(at + 1).trim();
    values[entry.slice(0, at).trim()] = value.replace(/^["']/, "").replace(/["']$/, "");
  }
  return values;
}

function unfilled(values: Record<string, string>, wanted: string[]): string[] {
  return wanted.filter((key) => {
    const held = values[key];
    return held === undefined || held === "" || held.startsWith("REPLACE_WITH");
  });
}

type Vault = {
  domain: string;
  account: string;
  token: string;
  zone: string;
  empty: string[];
};

async function vault(): Promise<Vault> {
  const site = await secrets("ship.env");
  const cloud = await secrets("cloudflare.env");
  const empty = [
    ...unfilled(site, ["DESIGN_DOCS_DOMAIN"]).map((key) => `ship.env: ${key}`),
    ...unfilled(cloud, ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_API_TOKEN"]).map(
      (key) => `cloudflare.env: ${key}`,
    ),
  ];
  return {
    domain: site.DESIGN_DOCS_DOMAIN ?? "",
    account: cloud.CLOUDFLARE_ACCOUNT_ID ?? "",
    token: cloud.CLOUDFLARE_API_TOKEN ?? "",
    zone: cloud.CLOUDFLARE_ZONE_NAME ?? "",
    empty,
  };
}

async function routes(): Promise<string[]> {
  const text = await Deno.readTextFile(table);
  const paths = [...text.matchAll(/path:\s*"([^"]+)"/g)].map((found) => found[1]);
  if (paths.length === 0) {
    io.fail(`ship: no routes found in ${table}`);
  }
  return paths;
}

function deep(paths: string[]): string | undefined {
  return paths.find((route) => route !== "/");
}

async function knock(url: string): Promise<number | string> {
  try {
    const response = await fetch(url, { headers: { "cache-control": "no-cache" } });
    await response.body?.cancel();
    return response.status;
  } catch (thrown) {
    return thrown instanceof Error ? thrown.message.split(":")[0] : "unreachable";
  }
}

async function probe(url: string): Promise<boolean> {
  for (let turn = 0; turn < 3; turn += 1) {
    const status = await knock(url);
    if (status === 200) {
      io.print(`  200 ${url}`);
      return true;
    }
    io.print(`  retry ${url} (${status})`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  return false;
}

async function plan(): Promise<void> {
  const keys = await vault();
  const domain = keys.domain === "" ? "<DESIGN_DOCS_DOMAIN>" : keys.domain;
  const paths = await routes();
  io.print("==> ship plan (dry run)");
  io.print("");
  io.print("build:");
  io.print("  pnpm --filter react-docs build");
  io.print("");
  io.print("deploy:");
  io.print("  env: CLOUDFLARE_ACCOUNT_ID=<redacted> CLOUDFLARE_API_TOKEN=<redacted>");
  io.print(`  pnpm dlx ${tool} deploy --domain ${domain}  (cwd ${app})`);
  io.print("");
  io.print("verify:");
  for (const route of [...new Set(["/", deep(paths) ?? "/"])]) {
    io.print(`  https://${domain}${route}`);
  }
  if (keys.empty.length > 0) {
    io.print("");
    io.print(`unfilled in ${seat()}: ${keys.empty.join(", ")}`);
  }
  io.print("");
  if (!(await fs.file.exists(`${dist}/index.html`))) {
    io.print(`wrangler dry run: skipped (${dist}/index.html missing; build first)`);
    return;
  }
  io.print("wrangler dry run:");
  await bin("pnpm").run(["dlx", tool, "deploy", "--dry-run"], { cwd: app });
}

async function check(): Promise<void> {
  const keys = await vault();
  io.print("==> check");
  if (keys.empty.length > 0) {
    io.print(`unfilled in ${seat()}: ${keys.empty.join(", ")}`);
    return;
  }
  const base = "https://api.cloudflare.com/client/v4";
  const head = { authorization: `Bearer ${keys.token}` };
  const zones = await fetch(`${base}/zones?name=${keys.zone}`, { headers: head });
  const found = (await zones.json()).result ?? [];
  io.print(`  zone ${keys.zone}: ${found.length > 0 ? "reachable" : "unreachable"}`);
  const domains = await fetch(`${base}/accounts/${keys.account}/workers/domains`, {
    headers: head,
  });
  const body = await domains.json();
  const bound = (body.result ?? []).some(
    (entry: { hostname?: string }) => entry.hostname === keys.domain,
  );
  io.print(`  worker domain ${keys.domain}: ${bound ? "bound" : "not bound yet"}`);
  io.print(`  live: ${await knock(`https://${keys.domain}/`)}`);
}

async function ship(): Promise<void> {
  const keys = await vault();
  if (keys.empty.length > 0) {
    throw fault.unfilled({ missing: keys.empty });
  }
  const paths = await routes();
  io.print("==> build");
  await bin("pnpm").run(["--filter", "react-docs", "build"]);
  if (!(await fs.file.exists(`${dist}/index.html`))) {
    throw fault.build({ path: `${dist}/index.html` });
  }
  io.print("==> deploy");
  await bin("pnpm").run(["dlx", tool, "deploy", "--domain", keys.domain], {
    cwd: app,
    env: { CLOUDFLARE_ACCOUNT_ID: keys.account, CLOUDFLARE_API_TOKEN: keys.token },
  });
  io.print("==> verify");
  let reached = await probe(`https://${keys.domain}/`);
  const route = deep(paths);
  if (reached && route !== undefined) {
    reached = await probe(`https://${keys.domain}${route}`);
  }
  if (!reached) {
    throw fault.unreached({ domain: keys.domain });
  }
  io.print("ship: ok");
}

const args = cli.parse(Deno.args, { boolean: ["help", "h", "dry-run", "check"] });
if (flags(args).help()) {
  flags(args).positionals("ship", { allowHelp: true });
  usage();
  Deno.exit(0);
}
flags(args).positionals("ship");

if (args["dry-run"] === true) {
  await plan();
} else if (args.check === true) {
  await check();
} else {
  await run(ship).catch(fault.consume({
    unfilled: (thrown) => io.fail(`ship: unfilled in ${seat()}: ${thrown.meta.missing.join(", ")}`),
    build: (thrown) => io.fail(`ship: build produced no ${thrown.meta.path}`),
    unreached: (thrown) =>
      io.fail(`ship: ${thrown.meta.domain} did not answer 200; the deploy likely failed`),
  }));
}
