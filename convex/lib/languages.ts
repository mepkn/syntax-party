import { v } from "convex/values";

/** The languages a snippet can be written in. Order here is display order. */
export const LANGUAGE_IDS = ["javascript", "python", "go", "ruby", "rust", "kotlin", "swift"] as const;
export type LanguageId = (typeof LANGUAGE_IDS)[number];

export const vLanguage = v.union(...LANGUAGE_IDS.map((id) => v.literal(id)));

export function isLanguageId(value: string): value is LanguageId {
  return (LANGUAGE_IDS as readonly string[]).includes(value);
}
