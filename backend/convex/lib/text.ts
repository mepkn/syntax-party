import { ConvexError } from "convex/values";
import { MAX_TITLE_LENGTH } from "./limits";

/** Trims a title and rejects empty or overly long ones. */
export function cleanTitle(title: string): string {
  const t = title.trim().replace(/\s+/g, " ");
  if (!t) throw new ConvexError("Title can't be empty.");
  if (t.length > MAX_TITLE_LENGTH) throw new ConvexError(`Title must be at most ${MAX_TITLE_LENGTH} characters.`);
  return t;
}

/** Trims optional text; empty becomes undefined so the field is dropped. */
export function optionalText(text: string | undefined, max: number, label: string): string | undefined {
  const t = text?.trim();
  if (!t) return undefined;
  if (t.length > max) throw new ConvexError(`${label} must be at most ${max} characters.`);
  return t;
}
