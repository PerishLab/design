const held = await import(Deno.env.get("PACKAGE") ?? "");
const plugin = held.design();
if (plugin.name !== "perish-design" || plugin.enforce !== "pre") {
  throw new Error("plugin identity wrong");
}
if (plugin.transform("const a = 1;", "/nowhere/Absent.tsx") !== null) {
  throw new Error("plugin injected a stylesheet that does not exist");
}
if (plugin.transform("const a = 1;", "/nowhere/Absent.scss") !== null) {
  throw new Error("plugin claimed a file it does not own");
}
plugin.configResolved({ root: "/nowhere" });
const id = plugin.resolveId("virtual:perish/views");
if (id !== "\0virtual:perish/views") {
  throw new Error("virtual views id wrong");
}
const code = plugin.load(id);
if (code === null || !code.includes("login:true")) {
  throw new Error("virtual views source wrong");
}
let server = "";
plugin.generateBundle.call({
  addWatchFile() {},
  emitFile(file: { fileName?: string; source?: unknown }) {
    if (file.fileName === ".perish/server.mjs") {
      server = String(file.source);
    }
  },
});
if (!server.includes('createServer') || !server.includes('pathname.startsWith("/api/")')) {
  throw new Error("production web runtime missing");
}
console.log("probe: plugin identity, transform, virtual views, and runtime sane");
