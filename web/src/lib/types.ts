import type { FunctionReturnType } from "convex/server";
import type { api } from "@convex/_generated/api";

export type Outline = FunctionReturnType<typeof api.catalog.outline>;
export type OutlineSection = Outline[number];
export type OutlineFeature = OutlineSection["features"][number];
export type Snippet = FunctionReturnType<typeof api.snippets.forLanguage>[number];
