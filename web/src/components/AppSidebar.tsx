import { useEffect, useRef } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { featureAnchor, goToAnchor } from "@/lib/anchors";
import type { Outline } from "@/lib/types";
import { Logo } from "./Logo";

type Props = {
  outline: Outline | undefined;
  activeSection: string | null;
  activeFeature: string | null;
};

/**
 * Section list with the current section's features expanded. On phones the same
 * sidebar is a drawer (shadcn Sidebar switches to a Sheet), closed after a jump.
 */
export function AppSidebar({ outline, activeSection, activeFeature }: Props) {
  const { isMobile, setOpenMobile } = useSidebar();
  const contentRef = useRef<HTMLDivElement>(null);

  // Keep the active entry in view as the page scrolls.
  useEffect(() => {
    contentRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [activeSection, activeFeature]);

  function jump(event: React.MouseEvent, id: string) {
    event.preventDefault();
    if (isMobile) setOpenMobile(false);
    goToAnchor(id);
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-14 flex-row items-center border-b px-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent ref={contentRef}>
        <SidebarGroup>
          <SidebarGroupLabel>Contents</SidebarGroupLabel>
          <SidebarMenu>
            {outline === undefined
              ? Array.from({ length: 10 }, (_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))
              : outline.map((section) => {
                  const open = section.slug === activeSection;
                  return (
                    <SidebarMenuItem key={section._id}>
                      <SidebarMenuButton
                        isActive={open && !activeFeature}
                        render={<a href={`#${section.slug}`} onClick={(e) => jump(e, section.slug)} />}
                      >
                        <span className={open ? "font-medium text-sidebar-foreground" : undefined}>{section.title}</span>
                      </SidebarMenuButton>
                      {open && section.features.length > 0 && (
                        <SidebarMenuSub>
                          {section.features.map((feature) => {
                            const id = featureAnchor(section.slug, feature.slug);
                            return (
                              <SidebarMenuSubItem key={feature._id}>
                                <SidebarMenuSubButton
                                  isActive={id === activeFeature}
                                  render={<a href={`#${id}`} onClick={(e) => jump(e, id)} />}
                                >
                                  {feature.title}
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
