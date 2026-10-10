import { useMemo } from "react";
import { useQueries, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import type { LanguageId } from "@/lib/languages";
import type { Snippet } from "@/lib/types";

export type SnippetsByLang = Partial<Record<LanguageId, Map<Id<"features">, Snippet>>>;

/**
 * The outline plus the snippets of each selected language. Each language is its own
 * subscription; a language missing from `snippets` is still loading.
 */
export function useCatalog(selected: readonly LanguageId[]) {
  const outline = useQuery(api.catalog.outline);
  const requests = useMemo(
    () => Object.fromEntries(selected.map((lang) => [lang, { query: api.snippets.forLanguage, args: { lang } }])),
    [selected],
  );
  const results = useQueries(requests);

  const snippets = useMemo(() => {
    const byLang: SnippetsByLang = {};
    for (const lang of selected) {
      const rows = results[lang] as Snippet[] | Error | undefined;
      if (rows instanceof Error) throw rows;
      if (rows) byLang[lang] = new Map(rows.map((s) => [s.featureId, s]));
    }
    return byLang;
  }, [results, selected]);

  return { outline, snippets };
}

/** The signed-in user, null when signed out, undefined while loading. */
export function useMe() {
  return useQuery(api.auth.me);
}
