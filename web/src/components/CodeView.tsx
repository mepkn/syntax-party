import { useHighlighted } from "@/hooks/use-highlighted";
import type { LanguageId } from "@/lib/languages";
import { cn } from "@/lib/utils";

const codeClass = "overflow-x-auto px-4 py-3 font-mono text-[13px] leading-relaxed [&_pre]:font-mono";

/** Code with syntax colours once Shiki is ready; plain monospace until then (same layout). */
export function CodeView({ code, lang, className }: { code: string; lang: LanguageId; className?: string }) {
  const html = useHighlighted(code, lang);
  if (html === null) {
    return (
      <pre className={cn(codeClass, className)}>
        <code>{code}</code>
      </pre>
    );
  }
  // Shiki escapes the code; the HTML contains only its own <pre>/<span> markup.
  return <div className={cn(codeClass, className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
