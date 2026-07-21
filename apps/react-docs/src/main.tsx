import { createRoot } from "react-dom/client";
import { Gallery } from "./gallery/Gallery";

const seat = document.getElementById("root");

if (seat) {
	createRoot(seat).render(<Gallery />);
}
