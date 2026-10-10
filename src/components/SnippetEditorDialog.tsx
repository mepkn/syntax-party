import { lazy, Suspense } from "react";
import type { Id } from "../../convex/_generated/dataModel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { LanguageId } from "@/lib/languages";
import type { Snippet } from "@/lib/types";

// The form pulls in CodeMirror, so it's loaded only when an editor first opens one.
const SnippetEditorForm = lazy(() => import("./SnippetEditorForm"));

export type SnippetEditorProps = {
  featureId: Id<"features">;
  featureTitle: string;
  lang: LanguageId;
  /** The snippet being edited, or undefined to create one. */
  snippet: Snippet | undefined;
};

type Props = SnippetEditorProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SnippetEditorDialog({ open, onOpenChange, ...rest }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        {/* Mounted only while open, so each opening starts from the latest saved snippet. */}
        {open && (
          <Suspense fallback={<div className="h-96 animate-pulse rounded-md bg-muted" />}>
            <SnippetEditorForm {...rest} onDone={() => onOpenChange(false)} />
          </Suspense>
        )}
      </DialogContent>
    </Dialog>
  );
}
