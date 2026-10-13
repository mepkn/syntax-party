/** Element id of a feature row; also its URL hash. */
export function featureAnchor(sectionSlug: string, featureSlug: string): string {
  return `${sectionSlug}--${featureSlug}`;
}

/** Scrolls to an anchor and records it in the URL without adding history entries. */
export function goToAnchor(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const url = new URL(location.href);
  url.hash = id;
  history.replaceState(history.state, "", url);
}
