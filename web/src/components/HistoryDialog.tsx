import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { HistoryIcon, Loader2Icon, RotateCcwIcon } from "lucide-react";
import { toast } from "sonner";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { errorMessage } from "@/lib/errorMessage";
import { LANGUAGES, type LanguageId } from "@/lib/languages";
import { cn } from "@/lib/utils";
import { CodeView } from "./CodeView";
import { Note } from "./Note";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snippetId: Id<"snippets">;
  featureTitle: string;
  lang: LanguageId;
};

const time = new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" });

export function HistoryDialog({ open, onOpenChange, ...rest }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">{open && <History {...rest} onDone={() => onOpenChange(false)} />}</DialogContent>
    </Dialog>
  );
}

function History({ snippetId, featureTitle, lang, onDone }: Omit<Props, "open" | "onOpenChange"> & { onDone: () => void }) {
  const revisions = useQuery(api.snippets.history, { snippetId });
  const revert = useMutation(api.snippets.revert);
  const [selectedId, setSelectedId] = useState<Id<"revisions"> | null>(null);
  const [reverting, setReverting] = useState(false);
  const selected = revisions?.find((r) => r._id === selectedId) ?? revisions?.[0];

  async function restore() {
    if (!selected) return;
    setReverting(true);
    try {
      await revert({ revisionId: selected._id });
      toast.success("Restored that version.");
      onDone();
    } catch (err) {
      toast.error(errorMessage(err, "Could not restore."));
    } finally {
      setReverting(false);
    }
  }

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <HistoryIcon className="size-4" />
          History: {featureTitle} in {LANGUAGES[lang].name}
        </DialogTitle>
        <DialogDescription>The last 20 saves. Restoring adds a new version, so it can be undone too.</DialogDescription>
      </DialogHeader>

      {revisions === undefined ? (
        <div className="h-64 animate-pulse rounded-md bg-muted" />
      ) : revisions.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No edits yet. This snippet is still the imported original.
        </p>
      ) : (
        <div className="grid min-w-0 gap-4 md:grid-cols-[14rem_minmax(0,1fr)]">
          <ol className="flex max-h-80 flex-col gap-1 overflow-y-auto md:max-h-[26rem]">
            {revisions.map((r, i) => (
              <li key={r._id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(r._id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted",
                    r._id === selected?._id && "bg-accent text-accent-foreground",
                  )}
                >
                  <div className="font-medium">
                    {time.format(r._creationTime)}
                    {i === 0 && <span className="ml-1.5 text-xs text-muted-foreground">(current)</span>}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{r.editedBy ?? "unknown"}</div>
                </button>
              </li>
            ))}
          </ol>
          {selected && (
            <div className="flex min-w-0 flex-col gap-3">
              {selected.na !== undefined && <p className="text-sm text-muted-foreground italic">Not applicable: {selected.na}</p>}
              <div className="max-h-80 min-w-0 overflow-auto rounded-md border bg-code">
                <CodeView code={selected.code} lang={lang} />
              </div>
              {selected.note && <Note text={selected.note} />}
              <div className="flex justify-end">
                <Button onClick={restore} disabled={reverting || selected._id === revisions[0]._id}>
                  {reverting ? <Loader2Icon className="animate-spin" /> : <RotateCcwIcon />}
                  Restore this version
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
