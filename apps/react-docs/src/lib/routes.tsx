import type { ReactNode } from "react";
import { Gallery } from "../gallery/Gallery";

export type Locale = "en" | "zh";

export const locales: { locale: Locale; path: string }[] = [
	{ locale: "en", path: "/" },
	{ locale: "zh", path: "/zh-CN/" },
];

export const routes: { path: string; element: ReactNode }[] = [
	{ path: "/", element: <Gallery locale="en" /> },
	{ path: "/zh-CN", element: <Gallery locale="zh" /> },
	{ path: "/zh-CN/", element: <Gallery locale="zh" /> },
];
