import { useEffect, useState } from "react";
import { cachedHighlight, highlight } from "@/lib/highlighter";
import type { LanguageId } from "@/lib/languages";

/** Highlighted HTML for `code`, or null until it's ready (render plain code meanwhile). */
export function useHighlighted(code: string, lang: LanguageId): string | null {
  const [result, setResult] = useState<{ key: string; html: string } | null>(null);
  const key = `${lang}\0${code}`;
  const cached = cachedHighlight(code, lang);

  useEffect(() => {
    if (cached !== undefined) return;
    let cancelled = false;
    highlight(code, lang).then(
      (html) => !cancelled && setResult({ key, html }),
      () => {}, // Leave the plain code in place if a grammar fails to load.
    );
    return () => {
      cancelled = true;
    };
  }, [code, lang, key, cached]);

  return cached ?? (result?.key === key ? result.html : null);
}
