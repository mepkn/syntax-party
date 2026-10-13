import { useState, type FormEvent } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { errorMessage } from "@/lib/errorMessage";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  heading: string;
  initial?: string;
  submitLabel: string;
  onSubmit: (title: string) => Promise<unknown>;
};

/** Asks for a single title: used to add or rename sections and features. */
export function TitleDialog({ open, onOpenChange, ...rest }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">{open && <TitleForm {...rest} onDone={() => onOpenChange(false)} />}</DialogContent>
    </Dialog>
  );
}

function TitleForm({ heading, initial = "", submitLabel, onSubmit, onDone }: Omit<Props, "open" | "onOpenChange"> & { onDone: () => void }) {
  const [title, setTitle] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      await onSubmit(title);
      onDone();
    } catch (err) {
      toast.error(errorMessage(err, "Could not save."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <DialogHeader>
        <DialogTitle>{heading}</DialogTitle>
      </DialogHeader>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Title" maxLength={80} autoFocus />
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={busy || !title.trim()}>
          {busy && <Loader2Icon className="animate-spin" />}
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}
