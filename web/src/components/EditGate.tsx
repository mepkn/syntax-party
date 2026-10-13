import type { ReactNode } from "react";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { ShieldXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMe } from "@/hooks/use-catalog";
import { switchRouteHref } from "@/lib/route";
import { SignInPage } from "./SignInPage";

/** /edit: sign-in page, "access denied", or the editing page for allowlisted editors. */
export function EditGate({ children }: { children: ReactNode }) {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const me = useMe();
  const { signOut } = useAuthActions();

  if (isLoading || (isAuthenticated && me === undefined)) {
    return <div className="grid min-h-svh place-items-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!isAuthenticated || !me) return <SignInPage />;
  if (!me.canEdit) {
    return (
      <main className="grid min-h-svh place-items-center px-4">
        <div className="flex max-w-sm flex-col items-center gap-4 text-center">
          <ShieldXIcon className="size-8 text-destructive" />
          <h1 className="text-lg font-semibold">Access denied</h1>
          <p className="text-sm text-muted-foreground">{me.email} is not on the editor allowlist.</p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void signOut()}>
              Sign out
            </Button>
            <Button render={<a href={switchRouteHref(false)} />}>Back to the site</Button>
          </div>
        </div>
      </main>
    );
  }
  return children;
}
