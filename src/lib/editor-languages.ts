import type { Extension } from "@codemirror/state";
import type { LanguageId } from "@/lib/languages";

/** CodeMirror language support per snippet language, loaded only when the editor opens. */
export async function editorLanguage(lang: LanguageId): Promise<Extension> {
  switch (lang) {
    case "javascript":
      return (await import("@codemirror/lang-javascript")).javascript();
    case "python":
      return (await import("@codemirror/lang-python")).python();
    case "go":
      return (await import("@codemirror/lang-go")).go();
    case "rust":
      return (await import("@codemirror/lang-rust")).rust();
    case "ruby":
      return legacy((await import("@codemirror/legacy-modes/mode/ruby")).ruby);
    case "kotlin":
      return legacy((await import("@codemirror/legacy-modes/mode/clike")).kotlin);
    case "swift":
      return legacy((await import("@codemirror/legacy-modes/mode/swift")).swift);
  }
}

async function legacy(mode: Parameters<typeof import("@codemirror/language").StreamLanguage.define>[0]) {
  const { StreamLanguage } = await import("@codemirror/language");
  return StreamLanguage.define(mode);
}
