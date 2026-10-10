import { useState } from "react";
import { useMutation } from "convex/react";
import { ArrowDownIcon, ArrowUpIcon, EllipsisIcon, ListPlusIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { errorMessage } from "@/lib/errorMessage";
import type { OutlineFeature, OutlineSection } from "@/lib/types";
import { ConfirmDialog } from "./ConfirmDialog";
import { TitleDialog } from "./TitleDialog";

type Dialog = "rename" | "add" | "addSection" | "delete" | null;

/** Editor menu on a section heading: rename, add feature, move, delete. */
export function SectionActions({ section, isFirst, isLast }: { section: OutlineSection; isFirst: boolean; isLast: boolean }) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const rename = useMutation(api.catalog.renameSection);
  const move = useMutation(api.catalog.moveSection);
  const remove = useMutation(api.catalog.removeSection);
  const addFeature = useMutation(api.catalog.createFeature);
  const addSection = useMutation(api.catalog.createSection);
  const close = (open: boolean) => !open && setDialog(null);

  return (
    <>
      <Menu label={`${section.title} actions`}>
        <DropdownMenuItem onClick={() => setDialog("add")}>
          <PlusIcon /> Add feature
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDialog("addSection")}>
          <ListPlusIcon /> Add section below
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDialog("rename")}>
          <PencilIcon /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isFirst} onClick={() => run(move({ id: section._id, direction: "up" }))}>
          <ArrowUpIcon /> Move up
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isLast} onClick={() => run(move({ id: section._id, direction: "down" }))}>
          <ArrowDownIcon /> Move down
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
          <Trash2Icon /> Delete section
        </DropdownMenuItem>
      </Menu>
      <TitleDialog
        open={dialog === "add"}
        onOpenChange={close}
        heading={`New feature in ${section.title}`}
        submitLabel="Add"
        onSubmit={(title) => addFeature({ sectionId: section._id, title })}
      />
      <TitleDialog
        open={dialog === "addSection"}
        onOpenChange={close}
        heading={`New section after ${section.title}`}
        submitLabel="Add"
        onSubmit={(title) => addSection({ title, after: section._id })}
      />
      <TitleDialog
        open={dialog === "rename"}
        onOpenChange={close}
        heading="Rename section"
        initial={section.title}
        submitLabel="Rename"
        onSubmit={(title) => rename({ id: section._id, title })}
      />
      <ConfirmDialog
        open={dialog === "delete"}
        onOpenChange={close}
        title={`Delete "${section.title}"?`}
        description={`This deletes its ${section.features.length} features and every snippet in them, in all languages. It can't be undone.`}
        confirmLabel="Delete section"
        onConfirm={() => remove({ id: section._id })}
      />
    </>
  );
}

/** Editor menu on a feature heading: rename, move within its section, delete. */
export function FeatureActions({ feature, isFirst, isLast }: { feature: OutlineFeature; isFirst: boolean; isLast: boolean }) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const rename = useMutation(api.catalog.renameFeature);
  const move = useMutation(api.catalog.moveFeature);
  const remove = useMutation(api.catalog.removeFeature);
  const close = (open: boolean) => !open && setDialog(null);

  return (
    <>
      <Menu label={`${feature.title} actions`}>
        <DropdownMenuItem onClick={() => setDialog("rename")}>
          <PencilIcon /> Rename
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isFirst} onClick={() => run(move({ id: feature._id, direction: "up" }))}>
          <ArrowUpIcon /> Move up
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isLast} onClick={() => run(move({ id: feature._id, direction: "down" }))}>
          <ArrowDownIcon /> Move down
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => setDialog("delete")}>
          <Trash2Icon /> Delete feature
        </DropdownMenuItem>
      </Menu>
      <TitleDialog
        open={dialog === "rename"}
        onOpenChange={close}
        heading="Rename feature"
        initial={feature.title}
        submitLabel="Rename"
        onSubmit={(title) => rename({ id: feature._id, title })}
      />
      <ConfirmDialog
        open={dialog === "delete"}
        onOpenChange={close}
        title={`Delete "${feature.title}"?`}
        description="This deletes its snippets in every language, with their history. It can't be undone."
        confirmLabel="Delete feature"
        onConfirm={() => remove({ id: feature._id })}
      />
    </>
  );
}

/** Shown only when there are no sections yet; afterwards each section's menu adds one below it. */
export function AddFirstSectionButton() {
  const [open, setOpen] = useState(false);
  const create = useMutation(api.catalog.createSection);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <PlusIcon /> Add the first section
      </Button>
      <TitleDialog open={open} onOpenChange={setOpen} heading="New section" submitLabel="Add" onSubmit={(title) => create({ title })} />
    </>
  );
}

function Menu({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label={label} />}>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      {/* The shadcn menu is as wide as its trigger (here a small icon), so size it to its items. */}
      <DropdownMenuContent align="end" className="w-auto min-w-44 whitespace-nowrap">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function run(promise: Promise<unknown>) {
  promise.catch((err) => toast.error(errorMessage(err)));
}
