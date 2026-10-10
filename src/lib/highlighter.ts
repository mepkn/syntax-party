import type { HighlighterCore } from "shiki/core";
import type { LanguageId } from "@/lib/languages";

/**
 * Client-side Shiki: the core, the JavaScript regex engine (no WASM), one light and one
 * dark theme, and only the grammars of the languages actually on screen. Everything is
 * loaded lazily, so the first paint shows plain code and colours arrive a moment later.
 */
const grammars: Record<LanguageId, () => Promise<unknown>> = {
  javascript: () => import("@shikijs/langs/javascript"),
  python: () => import("@shikijs/langs/python"),
  go: () => import("@shikijs/langs/go"),
  ruby: () => import("@shikijs/langs/ruby"),
  rust: () => import("@shikijs/langs/rust"),
  kotlin: () => import("@shikijs/langs/kotlin"),
  swift: () => import("@shikijs/langs/swift"),
};

let highlighter: Promise<HighlighterCore> | null = null;
const loadedLangs = new Map<LanguageId, Promise<void>>();
const cache = new Map<string, string>();

function getHighlighter() {
  highlighter ??= (async () => {
    const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
      import("shiki/core"),
      import("shiki/engine/javascript"),
    ]);
    return createHighlighterCore({
      themes: [import("@shikijs/themes/github-light"), import("@shikijs/themes/github-dark")],
      langs: [],
      engine: createJavaScriptRegexEngine(),
    });
  })();
  return highlighter;
}

async function ensureLang(h: HighlighterCore, lang: LanguageId) {
  let loading = loadedLangs.get(lang);
  if (!loading) {
    loading = grammars[lang]().then((mod) => h.loadLanguage((mod as { default: Parameters<HighlighterCore["loadLanguage"]>[0] }).default));
    loadedLangs.set(lang, loading);
  }
  await loading;
}

/** Already-highlighted HTML for this code, if any (synchronous, for the first render). */
export function cachedHighlight(code: string, lang: LanguageId): string | undefined {
  return cache.get(`${lang}\0${code}`);
}

/** Highlighted HTML with both themes as CSS variables (see .shiki rules in index.css). */
export async function highlight(code: string, lang: LanguageId): Promise<string> {
  const key = `${lang}\0${code}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const h = await getHighlighter();
  await ensureLang(h, lang);
  const html = h.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
  cache.set(key, html);
  return html;
}
