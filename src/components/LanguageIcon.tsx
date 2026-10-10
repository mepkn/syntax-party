import { LANGUAGES, type LanguageId } from "@/lib/languages";
import { cn } from "@/lib/utils";

/** Official logos (Devicon, MIT), from public/icons. */
export function LanguageIcon({ lang, className }: { lang: LanguageId; className?: string }) {
  return <img src={LANGUAGES[lang].icon} alt="" aria-hidden className={cn("size-4 shrink-0", LANGUAGES[lang].iconClass, className)} />;
}
