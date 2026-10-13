/**
 * The site has two entry points, like class's / and /teacher:
 *   /       read-only, for everyone
 *   /edit   sign-in, then the same page with editing turned on
 */
export const EDIT_PATH = "/edit";
export const isEditRoute = location.pathname.replace(/\/+$/, "") === EDIT_PATH;

/** The same view (languages, anchor) on the other entry point. */
export function switchRouteHref(toEdit: boolean): string {
  return `${toEdit ? EDIT_PATH : "/"}${location.search}${location.hash}`;
}
