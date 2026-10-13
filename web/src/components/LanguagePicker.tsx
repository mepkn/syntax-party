import { useSelectedLanguages } from "@/hooks/use-selected-languages";
import { LANGUAGE_IDS, LANGUAGES, MAX_SELECTED } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { LanguageIcon } from "./LanguageIcon";

/** Chips for picking which languages to compare (1 to MAX_SELECTED). */
export function LanguagePicker({ className }: { className?: string }) {
  const { selected, toggle, isFull } = useSelectedLanguages();
  return (
    <div role="group" aria-label={`Languages to compare (up to ${MAX_SELECTED})`} className={cn("flex gap-1.5", className)}>
      {LANGUAGE_IDS.map((id) => {
        const on = selected.includes(id);
        return (
          <button
            key={id}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(id)}
            disabled={!on && isFull}
            title={!on && isFull ? `Up to ${MAX_SELECTED} languages. Remove one first.` : undefined}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              on
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
            )}
          >
            <LanguageIcon lang={id} className={cn(!on && "opacity-60 grayscale")} />
            {LANGUAGES[id].name}
          </button>
        );
      })}
    </div>
  );
}
