const held = await import(Deno.env.get("PACKAGE") ?? "");
const plugin = held.design();
if (plugin.name !== "perish-design" || plugin.enforce !== "pre") {
  throw new Error("plugin identity wrong");
}
const id = plugin.resolveId("virtual:perish-design/font");
if (id !== "\0virtual:perish-design/font") {
  throw new Error("virtual font id not resolved");
}
const code = plugin.load(id);
if (typeof code !== "string" || !/^import ".+";\n$/.test(code)) {
  throw new Error(`font module did not load: ${code}`);
}
if (
  plugin.resolveId("./Card.scss") !== null ||
  plugin.load("./Card.scss") !== null
) {
  throw new Error("plugin claimed a specifier it does not own");
}
if (plugin.transform("const a = 1;", "/nowhere/Absent.tsx") !== null) {
  throw new Error("plugin injected a stylesheet that does not exist");
}
console.log(
  "probe: plugin identity, virtual font module, and transform all sane",
);
