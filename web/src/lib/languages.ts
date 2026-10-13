import { LANGUAGE_IDS, type LanguageId } from "@convex/lib/languages";

export { LANGUAGE_IDS, type LanguageId };

export type Language = {
  id: LanguageId;
  name: string;
  /** Short label for tight spaces (mobile tabs). */
  short: string;
  icon: string;
  /** Extra classes for icons that aren't a plain square colour mark. */
  iconClass?: string;
  docsUrl: string;
};

export const LANGUAGES: Record<LanguageId, Language> = {
  javascript: { id: "javascript", name: "JavaScript", short: "JS", icon: "/icons/javascript.svg", docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  python: { id: "python", name: "Python", short: "Python", icon: "/icons/python.svg", docsUrl: "https://docs.python.org/3/" },
  // The gopher (Go's mascot), not the wide "GO" wordmark, so it's square like the others.
  go: { id: "go", name: "Go", short: "Go", icon: "/icons/go.svg", docsUrl: "https://go.dev/doc/" },
  ruby: { id: "ruby", name: "Ruby", short: "Ruby", icon: "/icons/ruby.svg", docsUrl: "https://docs.ruby-lang.org/en/" },
  // Rust's official logo is black; invert it on dark backgrounds.
  rust: { id: "rust", name: "Rust", short: "Rust", icon: "/icons/rust.svg", iconClass: "dark:invert", docsUrl: "https://doc.rust-lang.org/" },
  kotlin: { id: "kotlin", name: "Kotlin", short: "Kotlin", icon: "/icons/kotlin.svg", docsUrl: "https://kotlinlang.org/docs/" },
  swift: { id: "swift", name: "Swift", short: "Swift", icon: "/icons/swift.svg", docsUrl: "https://www.swift.org/documentation/" },
};

export const MIN_SELECTED = 1;
export const MAX_SELECTED = 4;
export const DEFAULT_SELECTED: LanguageId[] = ["javascript", "python"];

/**
 * Turns a raw list (from the URL or storage) into a valid selection: known ids,
 * no duplicates, in display order, at most MAX_SELECTED. Empty means "use the default".
 */
export function normalizeSelection(raw: readonly string[]): LanguageId[] {
  const wanted = new Set(raw.map((s) => s.trim().toLowerCase()));
  return LANGUAGE_IDS.filter((id) => wanted.has(id)).slice(0, MAX_SELECTED);
}
