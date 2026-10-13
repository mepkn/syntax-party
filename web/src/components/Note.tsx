import { cn } from "@/lib/utils";

/** A snippet note: plain text where `backticks` mark inline code. */
export function Note({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(`[^`\n]+`)/g);
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {parts.map((part, i) =>
        part.startsWith("`") && part.endsWith("`") && part.length > 2 ? (
          <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
            {part.slice(1, -1)}
          </code>
        ) : (
          part
        ),
      )}
    </p>
  );
}
