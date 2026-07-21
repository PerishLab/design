const USER_AGENT = "design-release-stable/1.0";
const STABLE = /^(\d+)\.(\d+)\.(\d+)$/;
const TAGGED_STABLE = /^v?(\d+\.\d+\.\d+)$/;

function fail(message: string): never {
  console.error(`[release-stable] ${message}`);
  Deno.exit(1);
}

function tuple(value: string): [number, number, number] {
  const match = STABLE.exec(value);
  if (!match) {
    fail(`expected stable x.y.z version, got ${value}`);
  }
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function order(left: string, right: string): number {
  const a = tuple(left);
  const b = tuple(right);
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) {
      return a[i] < b[i] ? -1 : 1;
    }
  }
  return 0;
}

function seat(): string {
  const dir = (Deno.args[0] ?? "").trim();
  if (dir === "") {
    fail("usage: stable.ts <package-dir>");
  }
  return dir.replace(/\/+$/, "");
}

async function manifest(
  dir: string,
): Promise<{ name: string; version: string }> {
  const doc = JSON.parse(await Deno.readTextFile(`${dir}/deno.json`));
  if (typeof doc.name !== "string" || !doc.name) {
    fail(`missing name in ${dir}/deno.json`);
  }
  if (typeof doc.version !== "string" || !doc.version) {
    fail(`missing version in ${dir}/deno.json`);
  }
  tuple(doc.version);
  return { name: doc.name, version: doc.version };
}

function parseStable(value: string, source: string): string {
  const match = TAGGED_STABLE.exec(value);
  if (!match) {
    fail(`${source} must look like vX.Y.Z, got ${value}`);
  }
  return match[1];
}

async function output(name: string, value: string): Promise<void> {
  const path = Deno.env.get("GITHUB_OUTPUT");
  if (path) {
    await Deno.writeTextFile(path, `${name}=${value}\n`, { append: true });
  }
}

async function fetchVersions(name: string): Promise<string[] | null> {
  const url = `https://jsr.io/${name}/meta.json`;
  console.log(`[release-stable] jsr meta url: ${url}`);
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
    fail(`jsr meta returned HTTP ${response.status}`);
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

function priorStable(versions: string[]): string | null {
  const ranked = versions.filter((value) => STABLE.test(value));
  if (ranked.length === 0) {
    return null;
  }
  return ranked.reduce((
    left,
    right,
  ) => (order(left, right) < 0 ? right : left));
}

async function main(): Promise<void> {
  const dir = seat();
  const held = await manifest(dir);
  const version = held.version;
  const override = (Deno.env.get("STABLE_VERSION_OVERRIDE") ?? "").trim();
  if (
    override && parseStable(override, "STABLE_VERSION_OVERRIDE") !== version
  ) {
    fail(
      `override ${override} does not match ${dir}/deno.json version ${version}`,
    );
  }
  const versions = await fetchVersions(held.name);
  let already = "false";
  let source: string;
  if (versions === null) {
    source = "missing jsr meta (first publish)";
  } else if (versions.includes(version)) {
    already = "true";
    source = `jsr already holds v${version} (repair pass)`;
  } else {
    const prior = priorStable(versions);
    if (prior === null) {
      source = "jsr meta holds no stable versions";
    } else {
      const ranked = order(version, prior);
      if (ranked < 0) {
        fail(
          `${dir}/deno.json version ${version} regressed below prior stable ${prior}`,
        );
      }
      if (ranked === 0) {
        fail(
          `${dir}/deno.json version ${version} matches prior stable; bump it before re-running`,
        );
      }
      source = `jsr prior stable v${prior}`;
    }
  }
  console.log("[release-stable] channel: stable");
  console.log(`[release-stable] package: ${held.name}`);
  console.log(`[release-stable] base version: ${version}`);
  console.log(`[release-stable] release version: v${version}`);
  console.log(`[release-stable] already published: ${already}`);
  console.log(`[release-stable] state source: ${source}`);
  await output("package_name", held.name);
  await output("base_version", version);
  await output("release_version", `v${version}`);
  await output("already_published", already);
  await output("state_source", source);
}

await main();
