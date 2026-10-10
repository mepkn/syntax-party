/**
 * Parsing for the markdown files in content/ (the initial import only; after seeding,
 * Convex is the source of truth). Pure functions, so they're unit-tested.
 *
 *   content/<N>-<section>/<M>-<feature>/<language>.md
 *
 * Each file is optional prose (becomes the note) followed by one fenced code block.
 */

/** "12-async" -> { order: 12, slug: "async" }. */
export function parseOrderedName(name: string): { order: number; slug: string } {
  const m = /^(\d+)-(.+)$/.exec(name);
  if (!m) throw new Error(`Expected "<number>-<slug>", got "${name}"`);
  return { order: Number(m[1]), slug: m[2] };
}

/** "null-undefined" -> "Null Undefined". */
export function titleFromSlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Splits a snippet file into its note (prose before the fence) and code (fence body). */
export function parseSnippet(markdown: string): { code: string; note?: string } {
  const m = /^([\s\S]*?)^(`{3,})[^\n]*\n([\s\S]*?)^\2[ \t]*$/m.exec(markdown);
  if (!m) throw new Error("No fenced code block found");
  const note = m[1].trim();
  return { code: m[3].replace(/\s+$/, ""), ...(note ? { note } : {}) };
}
