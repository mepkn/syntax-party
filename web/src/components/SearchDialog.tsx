import { useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { featureAnchor, goToAnchor } from "@/lib/anchors";
import type { Outline } from "@/lib/types";

type Props = {
  outline: Outline | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/** ⌘K / Ctrl+K: jump to any feature by name. */
export function SearchDialog({ outline, open, onOpenChange }: Props) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search" description="Jump to a feature">
      <Command>
        <CommandInput placeholder="Search features, e.g. “for loop”" />
        <CommandList>
          <CommandEmpty>Nothing matches.</CommandEmpty>
          {outline?.map((section) => (
            <CommandGroup key={section._id} heading={section.title}>
              {section.features.map((feature) => (
                <CommandItem
                  key={feature._id}
                  value={`${section.title} ${feature.title}`}
                  onSelect={() => {
                    onOpenChange(false);
                    goToAnchor(featureAnchor(section.slug, feature.slug));
                  }}
                >
                  {feature.title}
                  <span className="ml-auto text-xs text-muted-foreground">{section.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
