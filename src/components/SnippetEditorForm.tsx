import { lazy, Suspense, useEffect, useState, type FormEvent } from "react";
import { useMutation } from "convex/react";
import type { Extension } from "@codemirror/state";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/hooks/use-theme";
import { editorLanguage } from "@/lib/editor-languages";
import { errorMessage } from "@/lib/errorMessage";
import { LANGUAGES } from "@/lib/languages";
import { LanguageIcon } from "./LanguageIcon";
import type { SnippetEditorProps } from "./SnippetEditorDialog";

const CodeMirror = lazy(() => import("@uiw/react-codemirror"));

export default function SnippetEditorForm({ featureId, featureTitle, lang, snippet, onDone }: SnippetEditorProps & { onDone: () => void }) {
  const save = useMutation(api.snippets.save);
  const { theme } = useTheme();
  const [code, setCode] = useState(snippet?.code ?? "");
  const [note, setNote] = useState(snippet?.note ?? "");
  const [notApplicable, setNotApplicable] = useState(snippet?.na !== undefined);
  const [reason, setReason] = useState(snippet?.na ?? "");
  const [extension, setExtension] = useState<Extension | null>(null);
  const [saving, setSaving] = useState(false);
  const [conflict, setConflict] = useState(false);
  // The version this edit is based on; a newer save by someone else is a conflict.
  const [base] = useState(snippet?.updatedAt ?? null);

  useEffect(() => {
    let cancelled = false;
    editorLanguage(lang).then((ext) => !cancelled && setExtension(ext));
    return () => {
      cancelled = true;
    };
  }, [lang]);

  async function submit(event: FormEvent, force = false) {
    event.preventDefault();
    setSaving(true);
    try {
      await save({
        featureId,
        lang,
        code,
        note,
        // An empty reason still marks the snippet n/a.
        na: notApplicable ? reason.trim() || "Not applicable" : undefined,
        baseUpdatedAt: base,
        force,
      });
      toast.success(`Saved ${LANGUAGES[lang].name} · ${featureTitle}`);
      onDone();
    } catch (err) {
      const message = errorMessage(err, "Could not save.");
      if (message === "conflict") setConflict(true);
      else toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={(e) => submit(e)} className="flex min-w-0 flex-col gap-4">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <LanguageIcon lang={lang} />
          {featureTitle} in {LANGUAGES[lang].name}
        </DialogTitle>
        <DialogDescription>{snippet ? "Edit the snippet. The previous version stays in history." : "Add a snippet for this language."}</DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-3">
        <Switch id="na" checked={notApplicable} onCheckedChange={setNotApplicable} />
        <Label htmlFor="na">Not applicable in {LANGUAGES[lang].name}</Label>
      </div>

      {notApplicable && (
        <div className="grid gap-2">
          <Label htmlFor="reason">Why</Label>
          <Input id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. Go has no classes; use structs with methods." />
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="note">Note (optional)</Label>
        <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="One or two lines shown below the code." />
      </div>

      <div className="grid min-w-0 gap-2">
        <Label>Code{notApplicable && " (optional)"}</Label>
        <div className="min-w-0 overflow-hidden rounded-md border text-[13px]">
          <Suspense fallback={<div className="h-72 animate-pulse bg-muted" />}>
            <CodeMirror
              value={code}
              onChange={setCode}
              extensions={extension ? [extension] : []}
              theme={theme}
              height="18rem"
              basicSetup={{ foldGutter: false, highlightActiveLine: false }}
              autoFocus
            />
          </Suspense>
        </div>
      </div>

      {conflict && (
        <div role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm">
          Someone saved this snippet after you opened it. Overwrite their version with yours? Theirs stays in history.
          <div className="mt-2 flex gap-2">
            <Button type="button" size="sm" variant="destructive" disabled={saving} onClick={(e) => submit(e, true)}>
              Overwrite
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={onDone}>
              Discard mine
            </Button>
          </div>
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving || conflict || (!notApplicable && !code.trim())}>
          {saving && <Loader2Icon className="animate-spin" />}
          Save
        </Button>
      </DialogFooter>
    </form>
  );
}
