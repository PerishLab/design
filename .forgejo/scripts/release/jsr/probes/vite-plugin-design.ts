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
console.log("probe: plugin identity and transform restraint both sane");
