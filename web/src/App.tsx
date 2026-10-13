import { useEffect, useMemo, useRef, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/AppSidebar";
import { Comparison } from "@/components/Comparison";
import { Header } from "@/components/Header";
import { SearchDialog } from "@/components/SearchDialog";
import { useCatalog, useMe } from "@/hooks/use-catalog";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useSelectedLanguages } from "@/hooks/use-selected-languages";
import { featureAnchor } from "@/lib/anchors";
import { isEditRoute } from "@/lib/route";
import { EditGate } from "@/components/EditGate";

/** Height of the sticky header; the scroll spy reads below it. */
const HEADER_OFFSET = 112;

export default function App() {
  return isEditRoute ? (
    <EditGate>
      <Site canEdit />
    </EditGate>
  ) : (
    <Site canEdit={false} />
  );
}

/** The comparison page. Editing controls only on /edit (EditGate has checked the allowlist). */
function Site({ canEdit }: { canEdit: boolean }) {
  const { selected } = useSelectedLanguages();
  const { outline, snippets } = useCatalog(selected);
  const me = useMe();
  const editing = canEdit && (me?.canEdit ?? false);
  const [searchOpen, setSearchOpen] = useState(false);

  const featureIds = useMemo(
    () => outline?.flatMap((s) => s.features.map((f) => featureAnchor(s.slug, f.slug))) ?? [],
    [outline],
  );
  const activeFeature = useScrollSpy(featureIds, HEADER_OFFSET);
  const activeSection = activeFeature?.split("--")[0] ?? outline?.[0]?.slug ?? null;

  useScrollToHashOnLoad(outline !== undefined);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar outline={outline} activeSection={activeSection} activeFeature={activeFeature} />
        <SidebarInset className="min-w-0">
          <Header outline={outline} activeSection={activeSection} activeFeature={activeFeature} onSearch={() => setSearchOpen(true)} />
          <main className="mx-auto w-full max-w-[96rem] px-4 py-8 md:px-8">
            {outline === undefined ? (
              <LoadingState />
            ) : (
              <Comparison outline={outline} snippets={snippets} selected={selected} canEdit={editing} />
            )}
          </main>
        </SidebarInset>
        <SearchDialog outline={outline} open={searchOpen} onOpenChange={setSearchOpen} />
        <Toaster position="bottom-center" />
      </SidebarProvider>
    </TooltipProvider>
  );
}

/** A shared link like /#loops--for points at content that only exists after loading. */
function useScrollToHashOnLoad(ready: boolean) {
  const done = useRef(false);
  useEffect(() => {
    if (!ready || done.current) return;
    done.current = true;
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, [ready]);
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="grid gap-3 md:grid-cols-2">
          <div className="h-40 animate-pulse rounded-lg bg-muted" />
          <div className="h-40 animate-pulse rounded-lg bg-muted" />
        </div>
      ))}
    </div>
  );
}
