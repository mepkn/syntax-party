import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { isEditRoute } from "@/lib/route";
import type { Outline } from "@/lib/types";
import { AccountMenu } from "./AccountMenu";
import { LanguagePicker } from "./LanguagePicker";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  outline: Outline | undefined;
  activeSection: string | null;
  activeFeature: string | null;
  onSearch: () => void;
};

/**
 * Sticky header. On phones the "where am I" pill (current section › feature) opens the
 * contents drawer, and the language chips get their own scrollable row.
 */
export function Header({ outline, activeSection, activeFeature, onSearch }: Props) {
  const { toggleSidebar } = useSidebar();
  const section = outline?.find((s) => s.slug === activeSection);
  const feature = section?.features.find((f) => `${section.slug}--${f.slug}` === activeFeature);

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-2 px-3 md:px-4">
        <SidebarTrigger className="hidden md:inline-flex" />
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex min-w-0 flex-1 items-center gap-1 rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted md:hidden"
          aria-label="Open contents"
        >
          <span className="truncate font-medium">{section?.title ?? "Contents"}</span>
          {feature && <span className="truncate text-muted-foreground">› {feature.title}</span>}
          <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </button>
        <LanguagePicker className="hidden min-w-0 flex-1 overflow-x-auto md:flex" />
        <Button variant="outline" size="sm" onClick={onSearch} className="hidden gap-2 text-muted-foreground lg:inline-flex">
          <SearchIcon /> Search <Kbd>⌘K</Kbd>
        </Button>
        <Button variant="ghost" size="icon" onClick={onSearch} aria-label="Search" className="lg:hidden">
          <SearchIcon />
        </Button>
        {isEditRoute && (
          <span className="hidden rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary sm:inline">Editing</span>
        )}
        <ThemeToggle />
        {isEditRoute && <AccountMenu />}
      </div>
      <LanguagePicker className="overflow-x-auto px-3 pb-2.5 [scrollbar-width:none] md:hidden" />
    </header>
  );
}
