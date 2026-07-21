const USER_AGENT = "design-release-beta/1.0";
const STABLE = /^(\d+)\.(\d+)\.(\d+)$/;
const TAGGED_BETA = /^v?(\d+\.\d+\.\d+)-beta\.(\d+)$/;

function fail(message: string): never {
  console.error(`[release-beta] ${message}`);
  Deno.exit(1);
}

function tuple(value: string): [number, number, number] {
  const match = STABLE.exec(value);
  if (!match) {
    fail(`expected stable x.y.z base version, got ${value}`);
  }
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function seat(): string {
  const dir = (Deno.args[0] ?? "").trim();
  if (dir === "") {
    fail("usage: beta.ts <package-dir>");
  }
  return dir.replace(/\/+$/, "");
}

type Held = { name: string; version: string; registry: string };

async function manifest(dir: string): Promise<Held> {
  const jsr = await Deno.stat(`${dir}/deno.json`).then(() => true).catch(() =>
    false
  );
  const seat = jsr ? `${dir}/deno.json` : `${dir}/package.json`;
  const registry = jsr ? "jsr" : "npm";
  const doc = JSON.parse(await Deno.readTextFile(seat));
  if (typeof doc.name !== "string" || !doc.name) {
    fail(`missing name in ${seat}`);
  }
  if (typeof doc.version !== "string" || !doc.version) {
    fail(`missing version in ${seat}`);
  }
  tuple(doc.version);
  return { name: doc.name, version: doc.version, registry };
}

async function output(name: string, value: string): Promise<void> {
  const path = Deno.env.get("GITHUB_OUTPUT");
  if (path) {
    await Deno.writeTextFile(path, `${name}=${value}\n`, { append: true });
  }
}

async function fetchVersions(held: Held): Promise<string[] | null> {
  const url = held.registry === "jsr"
    ? `https://jsr.io/${held.name}/meta.json`
    : `https://registry.npmjs.org/${held.name.replace("/", "%2f")}`;
  console.log(`[release-beta] ${held.registry} meta url: ${url}`);
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { "Cache-Control": "no-cache", "User-Agent": USER_AGENT },
    });
  } catch (error) {
    fail(`failed to fetch jsr meta: ${error}`);
  }
  if (response.status === 404) {
    await response.body?.cancel();
    return null;
  }
  if (!response.ok) {
    await response.body?.cancel();
    fail(`${held.registry} meta returned HTTP ${response.status}`);
  }
  const meta = await response.json();
  if (
    typeof meta !== "object" || meta === null ||
    typeof meta.versions !== "object"
  ) {
    fail("jsr meta must be a JSON object with a versions map");
  }
  return Object.keys(meta.versions);
}

function nextNumber(versions: string[], base: string): number {
  let last = 0;
  for (const value of versions) {
    const match = TAGGED_BETA.exec(value);
    if (match && match[1] === base) {
      last = Math.max(last, Number(match[2]));
    }
  }
  return last + 1;
}

async function main(): Promise<void> {
  const dir = seat();
  const held = await manifest(dir);
  const base = held.version;
  const override = (Deno.env.get("BETA_VERSION_OVERRIDE") ?? "").trim();
  const versions = (await fetchVersions(held)) ?? [];
  if (versions.includes(base)) {
    fail(
      `base ${base} is already stable on jsr; bump ${dir}/deno.json before cutting betas`,
    );
  }
  let number: number;
  let already = "false";
  let source: string;
  if (override) {
    const match = TAGGED_BETA.exec(override);
    if (!match) {
      fail(
        `BETA_VERSION_OVERRIDE must look like vX.Y.Z-beta.N, got ${override}`,
      );
    }
    if (match[1] !== base) {
      fail(
        `override base ${
          match[1]
        } does not match ${dir}/deno.json version ${base}`,
      );
    }
    number = Number(match[2]);
    already = versions.includes(`${base}-beta.${number}`) ? "true" : "false";
    source = "workflow override";
  } else {
    number = nextNumber(versions, base);
    source = number === 1
      ? `no prior betas for base ${base}`
      : `jsr prior beta ${base}-beta.${number - 1}`;
  }
  const release = `v${base}-beta.${number}`;
  console.log("[release-beta] channel: beta");
  console.log(`[release-beta] package: ${held.name} on ${held.registry}`);
  console.log(`[release-beta] base version: ${base}`);
  console.log(`[release-beta] beta number: ${number}`);
  console.log(`[release-beta] release version: ${release}`);
  console.log(`[release-beta] already published: ${already}`);
  console.log(`[release-beta] state source: ${source}`);
  await output("package_name", held.name);
  await output("registry", held.registry);
  await output("base_version", base);
  await output("beta_number", String(number));
  await output("release_version", release);
  await output("already_published", already);
  await output("state_source", source);
}

await main();
