import { useAuthActions } from "@convex-dev/auth/react";
import { EyeIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMe } from "@/hooks/use-catalog";
import { switchRouteHref } from "@/lib/route";

/** Shown on /edit only: who is signed in, a link to the read-only site, sign out. */
export function AccountMenu() {
  const me = useMe();
  const { signOut } = useAuthActions();
  if (!me) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Account" />}>
        <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="truncate">{me.email}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<a href={switchRouteHref(false)} />}>
          <EyeIcon /> View site
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await signOut();
            location.href = switchRouteHref(false);
          }}
        >
          <LogOutIcon /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
