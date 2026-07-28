import { cli, flags } from "@perish/sealkit/cli";
import { bin } from "@perish/sealkit/cmd";
import { env } from "@perish/sealkit/env";
import { fs } from "@perish/sealkit/fs";
import { io } from "@perish/sealkit/io";
import { family, kind, run } from "@perish/shield";

const app = "apps/react-docs";
const tool = "wrangler@4.110.0";
const dist = `${app}/dist`;
const config = `${app}/wrangler.jsonc`;
const manifest = `${app}/package.json`;

const fault = family("ship", {
  unfilled: kind<{ missing: string[] }>(),
  build: kind<{ path: string }>(),
  unreached: kind<{ domain: string }>(),
  unbound: kind<{ domain: string }>(),
  unproven: kind<{ domain: string }>(),
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
  io.print("  .local/secrets/ship.env        DESIGN_SITE_DOMAIN (see AGENTS.md)");
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

function door(key: string, filed: string | undefined): string {
  const held = env.get(key, "") || filed || "";
  return held.startsWith("REPLACE_WITH") ? "" : held;
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
  const held = {
    domain: door("DESIGN_SITE_DOMAIN", site.DESIGN_SITE_DOMAIN),
    account: door("DESIGN_SITE_ACCOUNT", cloud.CLOUDFLARE_ACCOUNT_ID),
    token: door("DESIGN_SITE_TOKEN", cloud.CLOUDFLARE_API_TOKEN),
  };
  const empty = (["domain", "account", "token"] as const)
    .filter((name) => held[name] === "")
    .map((name) => `DESIGN_SITE_${name.toUpperCase()}`);
  return { ...held, zone: cloud.CLOUDFLARE_ZONE_NAME ?? "perish.uk", empty };
}

async function worker(): Promise<string> {
  const text = await Deno.readTextFile(config);
  const found = text.match(/"name":\s*"([^"]+)"/);
  if (found === null) {
    return io.fail(`ship: no worker name found in ${config}`);
  }
  return found[1];
}

async function routes(): Promise<string[]> {
  if (!(await fs.file.exists(`${dist}/index.html`))) {
    return [];
  }
  const paths = ["/"];
  for await (const entry of Deno.readDir(dist)) {
    if (entry.isDirectory && await fs.file.exists(`${dist}/${entry.name}/index.html`)) {
      paths.push(`/${entry.name}/`);
    }
  }
  return paths;
}

function deep(paths: string[]): string | undefined {
  return paths.find((route) => route !== "/");
}

async function marks(): Promise<Record<string, string>> {
  const commit = await bin("git").text(["rev-parse", "--short", "HEAD"]);
  const text = await Deno.readTextFile(manifest);
  const found = /"@perish\/react-components":\s*"([^"]+)"/.exec(text);
  return { BUILD_COMMIT: commit, BUILD_VERSION: found?.[1] ?? "" };
}

async function stamp(): Promise<string> {
  const html = await Deno.readTextFile(`${dist}/index.html`);
  const found = /\/assets\/index-[A-Za-z0-9_-]+\.js/.exec(html);
  if (found === null) {
    return io.fail(`ship: no fingerprinted asset in ${dist}/index.html`);
  }
  return found[0];
}

async function knock(url: string): Promise<{ status: number | string; body: string }> {
  try {
    const response = await fetch(url, { headers: { "cache-control": "no-cache" } });
    const body = await response.text();
    return { status: response.status, body };
  } catch (thrown) {
    const status = thrown instanceof Error ? thrown.message.split(":")[0] : "unreachable";
    return { status, body: "" };
  }
}

async function probe(url: string, mark: string, tries: number, wait: number): Promise<boolean> {
  for (let turn = 0; turn < tries; turn += 1) {
    const seen = await knock(url);
    if (seen.status === 200 && seen.body.includes(mark)) {
      io.print(`  200 ${url} serving ${mark}`);
      return true;
    }
    const why = seen.status === 200 ? "stale build" : seen.status;
    io.print(`  retry ${url} (${why})`);
    await new Promise((resolve) => setTimeout(resolve, wait));
  }
  return false;
}

type Bond = "yes" | "no" | "unknown";

async function anchored(keys: Vault): Promise<Bond> {
  const base = "https://api.cloudflare.com/client/v4";
  const domains = await fetch(`${base}/accounts/${keys.account}/workers/domains`, {
    headers: { authorization: `Bearer ${keys.token}` },
  });
  const body = await domains.json().catch(() => null);
  if (!domains.ok || body === null || body.success !== true) {
    return "unknown";
  }
  const held = (body.result ?? []).some(
    (entry: { hostname?: string }) => entry.hostname === keys.domain,
  );
  return held ? "yes" : "no";
}

function blind(): boolean {
  return env.get("DESIGN_SITE_BLIND", "") !== "";
}

async function plan(): Promise<void> {
  const keys = await vault();
  const domain = keys.domain === "" ? "<DESIGN_SITE_DOMAIN>" : keys.domain;
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
  io.print(`  worker ${await worker()}`);
  io.print(`  domain ${keys.domain}: bound ${await anchored(keys)}`);
  io.print(`  live: ${(await knock(`https://${keys.domain}/`)).status}`);
}

async function reached(keys: Vault, bond: Bond): Promise<boolean> {
  const wide = bond !== "yes";
  if (wide) {
    io.print("  binding not confirmed: allowing the edge minutes to spread");
  }
  const tries = wide ? 20 : 10;
  const wait = wide ? 15000 : 5000;
  const mark = await stamp();
  let live = await probe(`https://${keys.domain}/`, mark, tries, wait);
  const route = deep(await routes());
  if (live && route !== undefined) {
    live = await probe(`https://${keys.domain}${route}`, mark, tries, wait);
  }
  if (live) {
    return true;
  }
  if (bond === "unknown") {
    throw fault.unproven({ domain: keys.domain });
  }
  if (!blind()) {
    throw fault.unreached({ domain: keys.domain });
  }
  io.print("  vantage declared blind: this lane did not prove the site answers");
  return false;
}

async function ship(): Promise<void> {
  const keys = await vault();
  if (keys.empty.length > 0) {
    throw fault.unfilled({ missing: keys.empty });
  }
  io.print("==> build");
  await bin("pnpm").run(["--filter", "react-docs", "build"], { env: await marks() });
  if (!(await fs.file.exists(`${dist}/index.html`))) {
    throw fault.build({ path: `${dist}/index.html` });
  }
  io.print("==> deploy");
  await bin("pnpm").run(["dlx", tool, "deploy", "--domain", keys.domain], {
    cwd: app,
    env: { CLOUDFLARE_ACCOUNT_ID: keys.account, CLOUDFLARE_API_TOKEN: keys.token },
  });
  io.print("==> verify");
  io.print("  deployed  yes");
  const bond = await anchored(keys);
  io.print(`  bound     ${bond}`);
  if (bond === "no") {
    throw fault.unbound({ domain: keys.domain });
  }
  if (bond === "unknown") {
    io.print("  this credential cannot read workers domains; reachability must carry the proof");
  }
  io.print(`  reachable ${await reached(keys, bond) ? "yes" : "no"}`);
  io.print("ship: ok");
}

const args = cli.parse(Deno.args, { boolean: ["help", "h", "dry-run", "check"] });
flags(args).positionals("ship", { allowHelp: true });
if (flags(args).help()) {
  usage();
  Deno.exit(0);
}
if (flags(args).boolean("check")) {
  await check();
} else if (flags(args).boolean("dry-run")) {
  await plan();
} else {
  await run(ship).catch(fault.consume({
    unfilled: (thrown) => io.fail(`ship: unfilled in ${seat()}: ${thrown.meta.missing.join(", ")}`),
    build: (thrown) => io.fail(`ship: build produced no ${thrown.meta.path}`),
    unreached: (thrown) =>
      io.fail(
        `ship: ${thrown.meta.domain} is attached but did not serve this build; a stuck binding often clears on a second ship, and DESIGN_SITE_BLIND=1 declares a vantage that cannot see the edge`,
      ),
    unbound: (thrown) =>
      io.fail(
        `ship: ${thrown.meta.domain} is not attached to the worker; the deploy did not bind it`,
      ),
    unproven: (thrown) =>
      io.fail(
        `ship: nothing proved ${thrown.meta.domain} is serving this build — this credential cannot read workers domains and the readback did not answer, so DESIGN_SITE_BLIND does not apply`,
      ),
  }));
}
