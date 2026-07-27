const held = await import(process.env.PACKAGE);
const required = [
  "Badge",
  "Banner",
  "Board",
  "Button",
  "Card",
  "Code",
  "Copy",
  "Field",
  "Footer",
  "Forge",
  "Frame",
  "Grid",
  "Hero",
  "Ledger",
  "Line",
  "Link",
  "List",
  "Nav",
  "Note",
  "Page",
  "Rail",
  "Search",
  "Sheet",
  "Shell",
  "Split",
  "Tag",
];
const missing = required.filter((name) => !(name in held));
if (missing.length > 0) {
  throw new Error(`missing exports: ${missing.join(", ")}`);
}
const wrong = required.filter((name) => typeof held[name] !== "function");
if (wrong.length > 0) {
  throw new Error(`not callable: ${wrong.join(", ")}`);
}
console.log(`probe: ${required.length} required components exported and callable from npm`);
