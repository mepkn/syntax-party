import { useState } from "react";
import { useMutation } from "convex/react";
import { CheckIcon, CopyIcon, HistoryIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LANGUAGES, type LanguageId } from "@/lib/languages";
import type { Snippet } from "@/lib/types";
import { CodeView } from "./CodeView";
import { ConfirmDialog } from "./ConfirmDialog";
import { HistoryDialog } from "./HistoryDialog";
import { LanguageIcon } from "./LanguageIcon";
import { Note } from "./Note";
import { SnippetEditorDialog } from "./SnippetEditorDialog";

type Props = {
  featureId: Id<"features">;
  featureTitle: string;
  lang: LanguageId;
  /** undefined: no snippet for this language; null: still loading. */
  snippet: Snippet | undefined | null;
  canEdit: boolean;
};

export function SnippetCard({ featureId, featureTitle, lang, snippet, canEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const remove = useMutation(api.snippets.remove);

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-lg border bg-card">
      <div className="flex h-10 items-center gap-2 border-b px-3">
        <LanguageIcon lang={lang} />
        <span className="text-sm font-medium">{LANGUAGES[lang].name}</span>
        <div className="ml-auto flex items-center">
          {snippet?.code && <CopyButton code={snippet.code} />}
          {canEdit && snippet !== null && (
            <>
              <IconAction label={snippet ? "Edit" : "Add snippet"} onClick={() => setEditing(true)}>
                {snippet ? <PencilIcon /> : <PlusIcon />}
              </IconAction>
              {snippet && (
                <>
                  <IconAction label="History" onClick={() => setShowHistory(true)}>
                    <HistoryIcon />
                  </IconAction>
                  <IconAction label="Delete snippet" onClick={() => setDeleting(true)}>
                    <Trash2Icon />
                  </IconAction>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col bg-code">
        {snippet === null ? (
          <div className="m-4 h-16 animate-pulse rounded bg-muted" />
        ) : snippet === undefined ? (
          <p className="px-4 py-6 text-sm text-muted-foreground italic">No snippet yet.</p>
        ) : (
          <>
            {snippet.na !== undefined && (
              <p className="px-4 pt-3 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Not applicable.</span> {snippet.na}
              </p>
            )}
            {snippet.code && <CodeView code={snippet.code} lang={lang} />}
            {snippet.note && <Note text={snippet.note} className="mt-auto border-t px-4 py-3" />}
          </>
        )}
      </div>

      {canEdit && snippet !== null && (
        <SnippetEditorDialog
          open={editing}
          onOpenChange={setEditing}
          featureId={featureId}
          featureTitle={featureTitle}
          lang={lang}
          snippet={snippet}
        />
      )}
      {canEdit && snippet && (
        <>
          <HistoryDialog open={showHistory} onOpenChange={setShowHistory} snippetId={snippet._id} featureTitle={featureTitle} lang={lang} />
          <ConfirmDialog
            open={deleting}
            onOpenChange={setDeleting}
            title={`Delete the ${LANGUAGES[lang].name} snippet?`}
            description={`"${featureTitle}" will have no ${LANGUAGES[lang].name} snippet, and its history is deleted too. To say the concept doesn't exist in ${LANGUAGES[lang].name}, edit it and mark it "Not applicable" instead.`}
            confirmLabel="Delete"
            onConfirm={async () => {
              await remove({ snippetId: snippet._id });
              toast.success("Snippet deleted.");
            }}
          />
        </>
      )}
    </div>
  );
}

function IconAction({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="ghost" size="icon-sm" onClick={onClick} aria-label={label} />}>{children}</TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy. Select the code and copy it manually.");
    }
  }
  return (
    <IconAction label={copied ? "Copied" : "Copy code"} onClick={copy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
    </IconAction>
  );
}
