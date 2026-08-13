import * as design from "@perish/design";
import { design as plugin } from "@perish/design/vite";

if (typeof design.Button !== "function" || typeof plugin !== "function") {
	throw new Error("published design surface is incomplete");
}
