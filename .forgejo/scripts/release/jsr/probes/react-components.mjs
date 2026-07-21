const held = await import(process.env.PACKAGE);
const names = Object.keys(held).sort();
if (names.length !== 16) {
  throw new Error(`expected 16 components, got ${names.length}`);
}
const wrong = names.filter((name) => typeof held[name] !== "function");
if (wrong.length > 0) {
  throw new Error(`not callable: ${wrong.join(", ")}`);
}
console.log(`probe: ${names.length} components exported and callable from npm`);
